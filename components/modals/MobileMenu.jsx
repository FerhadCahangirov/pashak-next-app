"use client";
import React from "react";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import { menuItems } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
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
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            {menuItems.map((item, i) => (
              <li key={i} className="nav-mb-item">
                <a
                  href={`${item.href}`}
                  className={`mb-menu-link ${
                    isMenuActive(item) ? "activeMenu" : ""
                  }`}
                >
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mb-other-content mt-5">
            <div className="mb-notice">
              <Link href={`/contact`} className="text-need">
                Need help ?
              </Link>
            </div>
            <ul className="mb-info">
              <li>
              Bakı, Azərbaycan, Xətayi rayonu, Zığ Şosesi, Əbilov qəsəbəsi
              </li>
              <li>
                Email: <b>office@pasha-k.az</b>
              </li>
              <li>
                Phone: <b>(+994 12) 571-00-00</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
