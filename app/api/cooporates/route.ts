import fs from 'fs';
import path from 'path';
import prisma from "@/lib/prisma";
import { z } from 'zod';
import { NextResponse } from 'next/server';

const cooporateSchema = z.object({
    name: z.string().nonempty("Name is required"),
    type: z.enum(["pharmacy", "medicalDevice"]),
    file: z.instanceof(Blob).refine((file) => file instanceof Blob, {
        message: "File is required and should be of type Blob",
    }),
});

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const file = formData.get("file");
        const type = formData.get("type");

        const validation = cooporateSchema.safeParse({ name, file, type });
        if (!validation.success) {
            return NextResponse.json({ error: "Validation failed", issues: validation.error.errors }, { status: 400 });
        }

        const allowedMimeTypes = ["image/jpeg", "image/png"];
        if (!allowedMimeTypes.includes(validation.data.file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only JPEG and PNG are allowed." }, { status: 400 });
        }

        const publicDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        const fileExt = validation.data.file.type === "image/png" ? ".png" : ".jpg";
        const fileName = `${Date.now()}${fileExt}`;
        const filePath = path.join(publicDir, fileName);

        const buffer = Buffer.from(await validation.data.file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        const cooporate = await prisma.cooporate.create({
            data: {
                name: validation.data.name,
                type: validation.data.type,
                src: `/uploads/${fileName}`,
            },
        });

        return NextResponse.json({ message: "Cooporate added successfully", cooporate }, { status: 200 });
    } catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        const cooporates = await prisma.cooporate.findMany();

        const pharmaticalCooporates = cooporates.filter(c => c.type === "pharmacy");
        const medicalDeviceCooporates = cooporates.filter(c => c.type === "medicalDevice");

        return NextResponse.json({
            pharmaticalCooporates,
            medicalDeviceCooporates
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching cooporates:", error);
        return NextResponse.json({ error: "Failed to fetch cooporates" }, { status: 500 });
    }
};
