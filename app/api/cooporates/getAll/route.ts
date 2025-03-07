import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";


const querySchema = z.object({
    name: z.string().optional(),
});

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const query = Object.fromEntries(url.searchParams.entries());

        const validation = querySchema.safeParse(query);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid query parameters", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const { name} = validation.data;

        const whereCondition = name
            ? { name: { contains: name } }
            : undefined;

        const cooporates = await prisma.cooporate.findMany({
            where: whereCondition
        });

        return NextResponse.json({
            cooporates
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching cooporates:", error);
        return NextResponse.json({ error: "Failed to fetch cooporates" }, { status: 500 });
    }
}