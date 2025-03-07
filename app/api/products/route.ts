import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { ICategory } from '@/lib/models/ICategory';
import { IProduct } from '@/lib/models/IProduct';

const productSchema = z.object({
    content: z.string().min(1, "Content is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    compositions: z.array(z.string().min(1)).min(1, "Compositions are required"),
    categoryId: z.preprocess((val) => parseInt(val as string, 10), z.number().int().positive("Category ID must be a positive integer")),
    files: z.array(z.instanceof(Blob)).min(1, "Images are required")
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const parsedData = {
            content: formData.get("content"),
            name: formData.get("name"),
            description: formData.get("description"),
            categoryId: formData.get("categoryId"),
            compositions: formData.getAll("compositions"),
            files: formData.getAll("files").filter((f) => f instanceof Blob) as Blob[],
        };

        const validation = productSchema.safeParse(parsedData);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const { content, name, description, categoryId, compositions, files } = validation.data;

        // Check if the category exists
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Create the product
        const product = await prisma.product.create({
            data: { name, categoryId, content, description },
        });

        // Ensure upload directory exists
        const publicDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // Save files to the public/uploads directory
        const productImagesData = await Promise.all(
            files.map(async (file) => {
                const fileExt = file.type === "image/png" ? ".png" : ".jpg"; // Determine file extension
                const fileName = `${Date.now()}${fileExt}`;
                const filePath = path.join(publicDir, fileName);
                const buffer = Buffer.from(await file.arrayBuffer());
                fs.writeFileSync(filePath, buffer);
                return { productId: product.id, src: `/uploads/${fileName}` };
            })
        );

        // Save images in the database
        if (productImagesData.length) {
            await prisma.productImage.createMany({ data: productImagesData });
        }

        // Handle compositions
        for (const compositionName of compositions.map((c) => c.toLowerCase())) {
            let composition = await prisma.composition.findFirst({ where: { name: compositionName } });
            if (!composition) {
                composition = await prisma.composition.create({ data: { name: compositionName } });
            }
            await prisma.productComposition.create({
                data: { productId: product.id, compositionId: composition.id },
            });
        }

        return NextResponse.json(
            { message: "Product added successfully", product },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}

const querySchema = z.object({
    page: z.string().optional(),
    size: z.string().optional(),
    name: z.string().optional(),
    categoryId: z.string().optional(),
    compositions: z.string().optional()
});

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams.entries());

        // Validate the query parameters
        const validation = querySchema.safeParse(query);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid query parameters", issues: validation.error.errors },
                { status: 400 }
            );
        }

        // Extract values with defaults
        const {
            page = '1',
            size = '10',
            name = '',
            categoryId: categoryIdString = '-1',
            compositions = ''
        } = validation.data;

        // Convert strings to appropriate types
        const pageNumber = Math.max(parseInt(page, 10) || 1, 1); // Ensure at least 1
        const pageSize = Math.max(parseInt(size, 10) || 10, 1); // Ensure at least 1
        const categoryId = parseInt(categoryIdString, 10) || -1; // Default to -1 if not valid
        const compositionNames = compositions ? compositions.split("<->") : [];

        // If categoryId is greater than 0, validate its existence in the database
        if (categoryId > 0) {
            const category = await prisma.category.findFirst({
                where: { id: categoryId },
            });

            if (!category) {
                return NextResponse.json(
                    { error: "Category not found" },
                    { status: 404 }
                );
            }
        }

        // Build the `where` condition for querying products
        const whereCondition: { name?: object; categoryId?: number; productCompositions?: object } = {};

        if (name) {
            whereCondition.name = { contains: name };
        }

        if (categoryId > 0) {
            whereCondition.categoryId = categoryId;
        }

        if (compositionNames && compositionNames.length > 0) {
            whereCondition.productCompositions = {
                some: {
                    composition: {
                        name: { in: compositionNames }
                    }
                }
            };
        }

        // Fetch products with pagination
        const products = await prisma.product.findMany({
            where: whereCondition,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                name: true,
                content: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                images: {
                    select: {
                        src: true,
                        id: true,
                    },
                },
                description: true,
                productCompositions: {
                    select: {
                        composition: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
        });

        // Map results to match the IProduct interface
        const mappedProducts: IProduct[] = products.map((product) => ({
            id: product.id,
            name: product.name,
            content: product.content,
            category: product.category as ICategory,
            images: product.images.map((image) => ({
                src: image.src,
                id: image.id,
            })),
            description: product.description,
            compositions: product.productCompositions.map(productComposition => {
                return {
                    id: productComposition.composition.id,
                    name: productComposition.composition.name
                }
            })
        }));

        // Get total product count for pagination
        const totalProducts = await prisma.product.count({
            where: whereCondition,
        });

        const totalPages = Math.ceil(totalProducts / pageSize);

        return NextResponse.json({
            products: mappedProducts,
            pagination: {
                currentPage: pageNumber,
                pageSize,
                totalProducts,
                totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
