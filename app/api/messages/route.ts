import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { IMessage } from '@/lib/models/IMessage';

const querySchema = z.object({
    page: z.string().optional(),
    size: z.string().optional(),
    search: z.string().optional(),
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

        const { page = '1', size = '10', search } = validation.data;

        // Convert page and size to integers and ensure valid defaults
        const pageNumber = Math.max(parseInt(page, 10), 1);
        const pageSize = Math.max(parseInt(size, 10), 1);

        // Build the filtering conditions
        const whereCondition = search
            ? {
                name: { contains: search },
                email: { contains: search }
            }
            : undefined;

        const messages : IMessage[] = await prisma.message.findMany({
            where: whereCondition,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize
        });

        const totalMessages = await prisma.message.count({
            where: whereCondition,
        });

        const totalPages = Math.ceil(totalMessages / pageSize);

        return NextResponse.json({
            messages,
            pagination: {
                currentPage: pageNumber,
                pageSize,
                totalMessages,
                totalPages,
            },
        });
    }
    catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}