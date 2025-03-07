import { createDefaultAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        createDefaultAdmin();
        return NextResponse.json({message: "Admin created successfully"}, { status: 200 });
    }
    catch (error) {
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
} 