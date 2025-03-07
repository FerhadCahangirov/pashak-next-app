import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        var compositions = await prisma.composition.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return NextResponse.json(
            { compositions},
            { status: 200 });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}