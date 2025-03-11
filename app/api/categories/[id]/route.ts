import { ICategory } from "@/lib/models/ICategory";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from 'fs';
import { z } from 'zod';
import path from 'path';


const categorySchema = z.object({
    name: z.string().nonempty("Category name is required"),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
        }

        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const formData = await req.formData();
        const name = formData.get("name");
        const file = formData.get("file");

        if (!name) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const validation = categorySchema.safeParse({ name, file });
        if (!validation.success) {
            return NextResponse.json({ error: "Validation failed", issues: validation.error.errors }, { status: 400 });
        }

        const category_exists = await prisma.category.findFirst({
            where: {
                id: { not: category.id },
                name: validation.data.name
            }
        });

        if (category_exists) {
            return NextResponse.json({ error: "Category name already exists!" }, { status: 400 })
        }

        let filePath = category.src;

        if (file && file instanceof Blob) {
            if (category.src && fs.existsSync(path.join(process.cwd(), "public", category.src))) {
                fs.unlinkSync(path.join(process.cwd(), "public", category.src));
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
            filePath = `/uploads/${fileName}`;

            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(path.join(publicDir, fileName), buffer);
        }

        await prisma.category.update({
            where: { id },
            data: {
                name: name.toString(),
                src: filePath,
            },
        });

        return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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
            return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
        }

        // Find the existing category
        const category = await prisma.category.findFirst({
            where: {
                id: id,
            },
        });

        // If the category doesn't exist, return a 404 response
        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(
            { category },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { error: "Failed to fetch category" },
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
            return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
        }

        // Find the existing category
        const category = await prisma.category.findFirst({
            where: {
                id: id,
            },
            include: { products: true }
        });

        // If the category doesn't exist, return a 404 response
        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (category.products.length > 0) {
            return NextResponse.json({ error: "Failed to delete category" }, { status: 400 });
        }

        if (fs.existsSync(path.join(process.cwd(), "public", category.src))) {
            fs.unlinkSync(path.join(process.cwd(), "public", category.src));
        }

        await prisma.category.delete({
            where: {
                id: category.id
            }
        });

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
}