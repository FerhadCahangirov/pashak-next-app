import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

        let blogs = await prisma.blog.findMany({
            orderBy: { createdAt: 'asc' },
            select: { id: true, title: true }
        });

        let index = blogs.findIndex(b => b.id === blog.id);

        let blogNode = {
            prev: blogs[index - 1] ? { 
                id: blogs[index - 1].id, 
                title: blogs[index - 1].title 
            } : null,
            next: blogs[index + 1] ? { 
                id: blogs[index + 1].id, 
                title: blogs[index + 1].title 
            } : null
        };

        let relatedBlogs = await prisma.blog.findMany({
            where: { id: { not: blog.id } },
            include: { tags: true }
        });

        const blogTagNames = blog.tags.map(tag => tag.name);

        relatedBlogs.sort((a, b) => {
            const aMatches = a.tags.filter(tag => blogTagNames.includes(tag.name)).length;
            const bMatches = b.tags.filter(tag => blogTagNames.includes(tag.name)).length;
            return bMatches - aMatches;
        });

        return NextResponse.json({
            blog,
            relatedBlogs,
            next: blogNode.next,
            prev: blogNode.prev
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: `Failed to fetch blog: ${error.message}` }, { status: 500 });
    }
}