import { createDefaultAdmin, login, logout } from "@/lib/auth"; // Assuming createDefaultAdmin and login are in lib/auth
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await logout();
        return NextResponse.json({ message: "Logout successful" });
    } catch (error: any) {
        console.error("Login error:", error);

        let errorMessage = "An unexpected error occurred.";
        let statusCode = 500;

        return NextResponse.json({ message: errorMessage }, { status: statusCode });
    }
}
