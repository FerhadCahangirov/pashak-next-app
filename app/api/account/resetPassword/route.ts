import { resetPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();

        await resetPassword(password);

        return NextResponse.json({ message: "Password reset successfull" }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}