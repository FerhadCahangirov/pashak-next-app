import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

const uploadsDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const blogUpdateSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
        }

        const formData = await req.formData();
        const file = formData.get("file");

        if (file && !(file instanceof Blob)) {
            return NextResponse.json({ error: "File must be a Blob" }, { status: 400 });
        }

        const parsedData = {
            title: formData.get("title"),
            content: formData.get("content"),
            tags: formData.getAll("tags"),
            file: file as Blob | null,
        };

        const validatedData = blogUpdateSchema.parse(parsedData);
        const blog = await prisma.blog.findUnique({ where: { id }, include: { tags: true } });
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        let filePath = blog.src;
        if (parsedData.file) {
            if (filePath) fs.unlinkSync(path.join(process.cwd(), "public", filePath));

            const fileExt = ".bin";
            const fileName = `${Date.now()}${fileExt}`;
            filePath = `/uploads/${fileName}`;

            const fileBuffer = Buffer.from(await parsedData.file.arrayBuffer());
            const uploadDir = path.join(process.cwd(), "public/uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer);
        }

        const updated_blog = await prisma.blog.update({
            where: { id },
            data: {
                title: validatedData.title ?? blog.title,
                content: validatedData.content ?? blog.content,
                src: filePath,
                tags: { deleteMany: {}, create: validatedData.tags?.map(tag => ({ name: tag })) || [] },
            },
            include: { tags: true },
        });

        return NextResponse.json({ message: "Blog updated successfully", blog: updated_blog });
    } catch (error: any) {
        return NextResponse.json({ error: `Failed to update blog: ${error.message}` }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
        }

        const blog = await prisma.blog.findUnique({ where: { id } });
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        await prisma.tag.deleteMany({
            where: {
                blogId: blog.id
            }
        });

        if (fs.existsSync(path.join(process.cwd(), "public", blog.src))) {
            fs.unlinkSync(path.join(process.cwd(), "public", blog.src));
        }

        await prisma.blog.delete({ where: { id } });

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: `Failed to delete blog: ${error.message}` }, { status: 400 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
        }

        let blog = await prisma.blog.findUnique({
            where: { id },
            include: { tags: true }
        });

        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        return NextResponse.json({
            blog
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: `Failed to fetch blog: ${error.message}` }, { status: 500 });
    }
}