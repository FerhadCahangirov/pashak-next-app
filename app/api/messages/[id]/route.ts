import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid message ID" }, { status: 400 });
        }

        const message = await prisma.message.findFirst({
            where: { id }
        });

        if (!message) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({
            message
        }, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid message ID" }, { status: 400 });
        }

        const message = await prisma.message.findFirst({
            where: { id }
        });

        if (!message) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        await prisma.message.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                message: "Message deleted successfully",
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
}