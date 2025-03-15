import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from 'zod';

const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(req: Request) {
    try {

        const { email } = await req.json();

        const validation = emailSchema.safeParse({ email });
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst();

        const newUser = await prisma.user.update({
            where: { id: user?.id },
            data: {
                email: validation.data.email
            }
        });

        return NextResponse.json(
            {
                message: "Message sent successfully",
                email: newUser.email
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error changing email:", error);
        return NextResponse.json({ error: "Failed to change email" }, { status: 500 });
    }
}