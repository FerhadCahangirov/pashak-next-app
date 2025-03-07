import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        // Parse the `id` as an integer
        const id = parseInt((await params).id, 10);

        // If the `id` is not a valid number, return a 400 Bad Request response
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const productImage = await prisma.productImage.findFirst({
            where: {
                id: id
            }
        });

        if (!productImage) {
            return NextResponse.json({ error: "Product image not found" }, { status: 404 });
        }

        if (fs.existsSync(path.join(process.cwd(), "public", productImage.src))) {
            fs.unlinkSync(path.join(process.cwd(), "public", productImage.src));
        }

        await prisma.productImage.delete({
            where: {
                id: productImage.id
            }
        });

        return NextResponse.json({
            message: "Product image removed successfully"
        }, { status: 200 });
    }
    catch (error) {
        console.error("Error deleting product image:", error);
        return NextResponse.json(
            { error: "Failed to delete product image" },
            { status: 500 }
        );
    }
}