import fs from 'fs';
import path from 'path';
import prisma from "@/lib/prisma";
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { ICategory } from '@/lib/models/ICategory';

const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  file: z.instanceof(Blob).refine((file) => file instanceof Blob, {
    message: "File is required and should be of type Blob",
  }),
});

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const file = formData.get("file");

    if (!name || !file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid data. Name and file (Blob) are required." }, { status: 400 });
    }

    const validation = categorySchema.safeParse({ name, file });
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", issues: validation.error.errors }, { status: 400 });
    }

    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG and PNG are allowed." }, { status: 400 });
    }

    const publicDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const fileExt = file.type === "image/png" ? ".png" : ".jpg";
    const fileName = `${Date.now()}${fileExt}`;
    const filePath = path.join(publicDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const category = await prisma.category.create({
      data: {
        name: name.toString(),
        src: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json({ message: "Category added successfully", category }, { status: 200 });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
};


const querySchema = z.object({
    page: z.string().optional(),
    size: z.string().optional(),
    name: z.string().optional(),
});


export async function GET(req: Request) {
    try {
        // Parse and validate query parameters
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams.entries());
        const validation = querySchema.safeParse(query);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid query parameters", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const { page = '1', size = '10', name = '' } = validation.data;

        // Convert page and size to integers and ensure valid defaults
        const pageNumber = Math.max(parseInt(page, 10), 1);
        const pageSize = Math.max(parseInt(size, 10), 1);

        // Build the filtering conditions
        const whereCondition = name
            ? { name: { contains: name } }
            : undefined;

        // Fetch categories with pagination
        const categories: ICategory[] = await prisma.category.findMany({
            where: whereCondition,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            orderBy: { name: 'asc' },
            select: { name: true, src: true, id: true},
        });

        // Count the total number of categories
        const totalCategories = await prisma.category.count({
            where: whereCondition,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalCategories / pageSize);

        return NextResponse.json({
            categories,
            pagination: {
                currentPage: pageNumber,
                pageSize,
                totalCategories,
                totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}