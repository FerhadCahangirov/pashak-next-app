import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import { z } from "zod";
import fs from "fs";

const uploadSchema = z.object({
    files:  z.array(z.instanceof(Blob)).min(1, "Images are required")
}); 

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }) {
    try {
        // Parse the `id` as an integer
        const id = parseInt((await params).id, 10);

        // If the `id` is not a valid number, return a 400 Bad Request response
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const formData = await req.formData();
        const files: Blob[] = formData.getAll("files").filter((f) => f instanceof Blob) as Blob[];

        // Validate the input using zod schema
        const validation = uploadSchema.safeParse({ files });

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: validation.error.errors },
                { status: 400 }
            );
        }

        const product = await prisma.product.findFirst({
            where: {
                id: id,
            }
        });

        // If the product doesn't exist, return a 404 response
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

       // Ensure upload directory exists
       const publicDir = path.join(process.cwd(), "public", "uploads");
       if (!fs.existsSync(publicDir)) {
           fs.mkdirSync(publicDir, { recursive: true });
       }

       // Save files to the public/uploads directory
       const productImagesData = await Promise.all(
           files.map(async (file) => {
               const fileExt = file.type === "image/png" ? ".png" : ".jpg"; // Determine file extension
               const fileName = `${Date.now()}${fileExt}`;
               const filePath = path.join(publicDir, fileName);
               const buffer = Buffer.from(await file.arrayBuffer());
               fs.writeFileSync(filePath, buffer);
               return { productId: product.id, src: `/uploads/${fileName}` };
           })
       );
       
        // Save product images in the database
        const productImages = await prisma.productImage.createMany({
            data: productImagesData,
        });

        return NextResponse.json(
            {
                message: "Product images uploaded successfully",
                productImages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error uploading product images:", error);
        return NextResponse.json(
            { error: "Failed to upload product images" },
            { status: 500 }
        );
    }
}