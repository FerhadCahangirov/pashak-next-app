"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const accountLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/cooporates", label: "Cooporates" },
    { href: "/admin/message-box", label: "Message Box" },
    { href: "/admin/account", label: "Settings" },
];

export default function DashboardNav() {
    const pathname = usePathname();
    const router = useRouter();


    const logout = async () => {

        try {
            const response = await fetch("/api/logout", {
                method: "POST"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to log out.");
            }

            router.push("/login");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <ul className="my-account-nav">
            {accountLinks.map((link, index) => (
                <li key={index}>
                    <Link
                        href={link.href}
                        className={`my-account-nav-item ${pathname == link.href ? "active" : ""
                            }`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
            <li>
                <button onClick={() => logout()} className="my-account-nav-item">
                    Logout
                </button>
            </li>
        </ul>
    );
}
