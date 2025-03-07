import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, updateSession } from "@/lib/auth";

// Define protected and public routes
const protectedRoute = "admin";
const publicRoute = "login";
const unprotectedPostRoutes = ["/api/messages/send"];
const protectedGetRoutes = ["/api/messages"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const method = req.method;
    const isProtectedRoute = path.includes(protectedRoute);
    const isPublicRoute = path.includes(publicRoute);
    const isProtectedGetAPI = protectedGetRoutes.some(route => path.startsWith(route)) && method === "GET";
    const isProtectedAPI = path.startsWith("/api/") && method !== "GET" && !unprotectedPostRoutes.includes(path);

    // Check if the user is authenticated
    const authenticated = await isAuthenticated();

    // Handle unauthorized access
    if ((isProtectedRoute || isProtectedGetAPI || isProtectedAPI) && !authenticated) {
        if (path.startsWith("/api/")) {
            return NextResponse.json({ error: "Not authorized" }, { status: 403 });
        } else {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
    }

    // Redirect to /admin if accessing public routes while authenticated
    if (isPublicRoute && authenticated) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }

    // Update the session to extend its expiration time
    await updateSession(req);

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
