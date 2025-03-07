import { ICategory } from "@/lib/models/ICategory";
import { IProduct } from "@/lib/models/IProduct";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import { z } from 'zod';
import fs from 'fs';

const productSchema = z.object({
    content: z.string().min(1, "Content is required"), // Must be a non-empty string
    name: z.string().min(1, "Name is required"), // Must be a non-empty string
    categoryId: z.preprocess((val) => parseInt(val as string, 10), z.number().int().positive("Category ID must be a positive integer")),
    description: z.string().min(1, "Description is required"),
    compositions: z.array(z.string().min(1)).min(1, "Compositions are required"),
});

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        // Parse the `id` as an integer
        const id = parseInt((await params).id, 10);

        // If the `id` is not a valid number, return a 400 Bad Request response
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const formData = await req.formData();

        const parsedData = {
            content: formData.get("content"),
            name: formData.get("name"),
            description: formData.get("description"),
            categoryId: formData.get("categoryId"),
            compositions: formData.getAll("compositions"),
        };

        const validation = productSchema.safeParse(parsedData);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const { content, name, description, categoryId, compositions } = validation.data;

        const product = await prisma.product.findFirst({
            where: {
                id: id,
            }
        });

        // If the product doesn't exist, return a 404 response
        if (!product) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        // Check if the category exists
        const category: ICategory | null = await prisma.category.findFirst({
            where: {
                id: categoryId,
            },
        });

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        await prisma.productComposition.deleteMany({
            where: {
                productId: product.id
            }
        });

        for (const compositionName of compositions.map((c) => c.toLowerCase())) {
            let composition = await prisma.composition.findFirst({ where: { name: compositionName } });
            if (!composition) {
                composition = await prisma.composition.create({ data: { name: compositionName } });
            }
            await prisma.productComposition.create({
                data: { productId: product.id, compositionId: composition.id },
            });
        }

        await prisma.composition.deleteMany({
            where: {
                productCompositions: {
                    none: {}
                }
            }
        });

        const newProduct = await prisma.product.update({
            where: {
                id: product.id
            },
            data: {
                name,
                categoryId: category.id,
                content,
                description,
            },
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
                description: true,
                images: {
                    select: {
                        id: true,
                        src: true,
                    },
                },
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
            }
        });

        const mappedProduct: IProduct = {
            id: newProduct.id,
            name: newProduct.name,
            content: newProduct.content,
            category: newProduct.category as ICategory,
            images: newProduct.images.map((image) => ({
                src: image.src,
                id: image.id,
            })),
            description: newProduct.description,
            compositions: newProduct.productCompositions.map(productComposition => {
                return {
                    id: productComposition.composition.id,
                    name: productComposition.composition.name
                }
            })
        }

        return NextResponse.json(
            {
                message: "Product updated successfully",
                product: mappedProduct
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        // Parse the `id` as an integer
        const id = parseInt((await params).id, 10);

        // If the `id` is not a valid number, return a 400 Bad Request response
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        // Find the existing product
        const product = await prisma.product.findFirst({
            where: {
                id: id,
            },
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
                description: true,
                images: {
                    select: {
                        id: true,
                        src: true,
                    },
                },
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

        // If the product doesn't exist, return a 404 response
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const mappedProduct: IProduct = {
            id: product.id,
            name: product.name,
            content: product.content,
            category: product.category as ICategory,
            images: product.images.map(image => {
                return {
                    src: image.src,
                    id: image.id
                }
            }),
            description: product.description,
            compositions: product.productCompositions.map(productComposition => {
                return {
                    id: productComposition.composition.id,
                    name: productComposition.composition.name
                }
            })
        };

        return NextResponse.json(
            { product: mappedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        // Parse the `id` as an integer
        const id = parseInt((await params).id, 10);

        // If the `id` is not a valid number, return a 400 Bad Request response
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        // Find the existing product
        const product = await prisma.product.findFirst({ where: { id: id } });

        // If the product doesn't exist, return a 404 response
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        var productImages = await prisma.productImage.findMany({ where: { productId: product.id } });

        for (let index = 0; index < productImages.length; index++) {
            const productImage = productImages[index];

            if (fs.existsSync(path.join(process.cwd(), "public", productImage.src))) {
                fs.unlinkSync(path.join(process.cwd(), "public", productImage.src));
            }

            await prisma.productImage.delete({
                where: {
                    id: productImage.id
                }
            });
        }

        await prisma.productComposition.deleteMany({
            where: {
                productId: product.id
            }
        });

        await prisma.composition.deleteMany({
            where: {
                productCompositions: {
                    none: {}
                }
            }
        });

        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                message: "Product deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );
    }
}