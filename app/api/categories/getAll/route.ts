import { ICategory } from "@/lib/models/ICategory";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    try {
        let count: number = await prisma.category.count();

        // Fetch categories all
        const categories: ICategory[] = await prisma.category.findMany({
            where: undefined,
            skip: 0,
            take: count,
            orderBy: { name: 'asc' },
            select: { name: true, src: true, id: true },
        });

        return NextResponse.json({
            categories: categories
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}