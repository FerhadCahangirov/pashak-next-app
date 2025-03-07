import prisma from '@/lib/prisma';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const messageSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    content: z.string().min(1, { message: "Content is required" })
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { name, email, content } = await req.json();

        const validation = messageSchema.safeParse({ name, email, content });
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const message = await prisma.message.create({
            data: {
                name: validation.data.name,
                email: validation.data.email,
                content: validation.data.content
            }
        });

        return NextResponse.json(
            {
                message: "Message sent successfully",
                data: message
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}