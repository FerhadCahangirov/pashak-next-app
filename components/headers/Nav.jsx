"use client";
import React from "react";
import { menuItems } from '@/data/menu'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav({ textColor = "", Linkfs = "" }) {
    const pathname = usePathname();
    const isMenuActive = (menuItem) => {
        let active = false;
        if (menuItem.href?.includes("/")) {
            if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
                active = true;
            }
        }
        return active;
    };
    return (
        <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
            {menuItems.map((menuItem, index) => {
                return (
                    <li className="menu-item" key={index}>
                        <Link
                            href={menuItem.href}
                            className={`item-link ${isMenuActive(menuItem) && "activeMenu"} `}
                        >
                            {menuItem.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}
