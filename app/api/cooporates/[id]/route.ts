import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import path from "path";
import fs from 'fs';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid Cooporate ID" }, { status: 400 });
        }

        const cooporate = await prisma.cooporate.findUnique({
            where: { id }
        });

        if (!cooporate) {
            return NextResponse.json({ error: "Cooporate not found" }, { status: 404 });
        }

        return NextResponse.json(cooporate, { status: 200 });

    } catch (error) {
        console.error("Error fetching cooporate:", error);
        return NextResponse.json({ error: "Failed to fetch cooporate" }, { status: 500 });
    }
}

const cooporateSchema = z.object({
    name: z.string().nonempty("Name is required"),
    type: z.enum(["pharmacy", "medicalDevice"]),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid Cooporate ID" }, { status: 400 });
        }

        const cooporate = await prisma.cooporate.findUnique({ where: { id } });
        if (!cooporate) {
            return NextResponse.json({ error: "Cooporate not found" }, { status: 404 });
        }

        const formData = await req.formData();
        const name = formData.get("name");
        const type = formData.get("type");
        const file = formData.get("file");

        const validation = cooporateSchema.safeParse({ name, type, file });
        if (!validation.success) {
            return NextResponse.json({ error: "Validation failed", issues: validation.error.errors }, { status: 400 });
        }

        let filePath = cooporate.src;

        if (file && file instanceof Blob) {
            if (cooporate.src) {
                fs.unlinkSync(path.join(process.cwd(), "public", cooporate.src));
            }

            const allowedMimeTypes = ["image/jpeg", "image/png"];
            if (!allowedMimeTypes.includes(file.type)) {
                return NextResponse.json({ error: "Invalid file type. Only JPEG and PNG are allowed." }, { status: 400 });
            }

            const publicDir = path.join(process.cwd(), "public", "uploads");
            if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
            }

            const fileExt = file.type === "image/png" ? ".png" : ".jpg";
            const fileName = `${Date.now()}${fileExt}`;
            filePath = `/uploads/${fileName}`;

            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(path.join(publicDir, fileName), buffer);
        }

        const new_cooporate = await prisma.cooporate.update({
            where: { id },
            data: {
                name: validation.data.name,
                type: validation.data.type,
                src: filePath,
            },
        });

        return NextResponse.json({ message: "Cooporate updated successfully", cooporate: new_cooporate }, { status: 200 });
    } catch (error) {
        console.error("Error updating cooporate:", error);
        return NextResponse.json({ error: "Failed to update cooporate" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid Cooporate ID" }, { status: 400 });
        }

        const cooporate = await prisma.cooporate.findUnique({ where: { id } });
        if (!cooporate) {
            return NextResponse.json({ error: "Cooporate not found" }, { status: 404 });
        }

        if (cooporate.src) {
            const filePath = path.join(process.cwd(), "public", cooporate.src);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await prisma.cooporate.delete({ where: { id } });

        return NextResponse.json({ message: "Cooporate deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting cooporate:", error);
        return NextResponse.json({ error: "Failed to delete cooporate" }, { status: 500 });
    }
}
