import { createDefaultAdmin, login } from "@/lib/auth"; // Assuming createDefaultAdmin and login are in lib/auth
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // 1. Parse the JSON body to get the email and password
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        // 2. Ensure the default admin user is created if it doesn't already exist
        await createDefaultAdmin();

        // 3. Try to login
        await login(email, password);

        return NextResponse.json({ message: "Login successful" });
    } catch (error: any) {

        // Handle different error scenarios
        console.error("Login error:", error);

        let errorMessage = "An unexpected error occurred.";
        let statusCode = 500;

        // Customize error messages based on the error thrown
        if (error.message === "Email and password are required.") {
            errorMessage = error.message;
            statusCode = 400; // Bad request
        } else if (error.message === "User not found.") {
            errorMessage = error.message;
            statusCode = 404; // Not found
        } else if (error.message === "Invalid password.") {
            errorMessage = error.message;
            statusCode = 401; // Unauthorized
        }

        return NextResponse.json({ message: errorMessage }, { status: statusCode });
    }
}
