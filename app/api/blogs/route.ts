import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: "File is required and must be a Blob" }, { status: 400 });
        }

        const fileExt = ".bin"; 
        const finalFileName = `${Date.now()}${fileExt}`;
        const filePath = `/upload/${finalFileName}`;

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public/upload"); 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, finalFileName), fileBuffer);

        const parsedData = {
            title: formData.get("title"),
            content: formData.get("content"),
            tags: formData.getAll("tags"),
        };

        const validation = blogSchema.safeParse(parsedData);
        if (!validation.success) {
            return NextResponse.json({ error: "Validation failed", issues: validation.error.errors }, { status: 400 });
        }

        const blog = await prisma.blog.create({
            data: {
                title: validation.data.title,
                content: validation.data.content,
                src: filePath,
                tags: validation.data.tags ? { create: validation.data.tags.map(tag => ({ name: tag })) } : undefined,
            },
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: `Failed to create blog: ${error.message}` }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const { title } = Object.fromEntries(url.searchParams.entries());

        let blogs: ({
            tags: {
                name: string;
                id: number;
                blogId: number;
            }[];
        } & {
            title: string;
            content: string;
            src: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        })[];

        if (!title || title.trim() === "") {
            blogs = await prisma.blog.findMany({
                include: { tags: true },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }
        else {
            blogs = await prisma.blog.findMany({
                where: {
                    title: {
                        contains: title
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: { tags: true },
            });
        }

        return NextResponse.json({
            blogs
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: `Failed to fetch blogs: ${error.message}` }, { status: 500 });
    }
}

