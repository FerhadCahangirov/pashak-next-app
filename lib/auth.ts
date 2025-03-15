import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const getSecretKey = (): Uint8Array<ArrayBufferLike> => {
    const secretKey = process.env.JWT_SECRET;
    return new TextEncoder().encode(secretKey);
}

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10h") // 10 hours from now
        .sign(getSecretKey());
}

export async function decrypt(input: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(input, getSecretKey(), {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function isAuthenticated(): Promise<boolean> {
    try {
        // Get the session cookie
        const session = cookies().get("session")?.value;

        if (!session) {
            return false; // No session found
        }

        // Decrypt and validate the session
        const payload = await decrypt(session);

        // Check for expiration
        const isExpired = payload.exp && Date.now() >= payload.exp * 1000;
        if (isExpired) {
            return false; // Session expired
        }

        return true; // User is authenticated
    } catch (error) {
        console.error("Error verifying authentication:", error);
        return false; // Invalid or corrupted session
    }
}


export async function login(email?: string, password?: string) {

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    // Fetch the user from Prisma based on the email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("User not found.");
    }

    // Check if the password matches (assuming the password is hashed in the database)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password.");
    }

    // Create the session with user data and an expiration date
    const expires = new Date(Date.now() + 10 * 60 * 60 * 1000);  // 10 hours
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    return { message: "Login successful", user };
}


export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.exp = Math.floor(Date.now() / 1000) + 10; // Set expiration to 10 seconds from now
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: new Date(parsed.exp * 1000), // Convert UNIX timestamp back to a Date object
    });
    return res;
}

export async function resetPassword(password: string)
{
    const user = await prisma.user.findFirst();
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: {id: user?.id},
        data: {
            password: passwordHash
        }
    });
}

const prisma = new PrismaClient();

export async function createDefaultAdmin() {
    // Check if any user exists
    const existingUser = await prisma.user.findFirst();

    if (!existingUser) {
        console.log(process.env.ADMIN_PASSWORD!, process.env.ADMIN_SALT!, process.env.ADMIN_NAME!, process.env.ADMIN_SURNAME!, process.env.ADMIN_EMAIL!)

        // Hash the default password
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

        // Create the admin user
        await prisma.user.create({
            data: {
                name: process.env.ADMIN_NAME!,
                surname: process.env.ADMIN_SURNAME!,
                email: process.env.ADMIN_EMAIL!,
                password: passwordHash,
            },
        });

        console.log("Default admin user created.");
    } else {
        console.log("Admin user already exists. No changes made.");
    }
}
