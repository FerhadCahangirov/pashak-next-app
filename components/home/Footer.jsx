"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import { aboutLinks, footerLinks } from "@/data/footerLinks";
export default function Footer({ bgColor = "background-black" }) {

    useEffect(() => {
        const headings = document.querySelectorAll(".footer-heading-moblie");

        const toggleOpen = (event) => {
            const parent = event.target.closest(".footer-col-block");

            parent.classList.toggle("open");
        };

        headings.forEach((heading) => {
            heading.addEventListener("click", toggleOpen);
        });

        return () => {
            headings.forEach((heading) => {
                heading.removeEventListener("click", toggleOpen);
            });
        };
    }, []);

    const formRef = useRef();
    const [success, setSuccess] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [email, setEmail] = useState("");

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    const subscribe = (e) => {
        setSuccess(true);
        setEmail("");
        handleShowMessage();
    };
    return (
        <footer id="footer" className={`footer ${bgColor}`} style={{ background: '#000' }}>
            <div className="footer-wrap wow fadeIn" data-wow-delay="0s">
                <div className="footer-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-md-6 col-12">
                                <div className="footer-infor">
                                    <div className="footer-logo">
                                        <Link href={`/`}>
                                            <Image
                                                alt="image"
                                                src="/images/logo/logo-pashak-light.png"
                                                width={136}
                                                height={21}
                                            />
                                        </Link>
                                    </div>
                                    <ul>
                                        <li>
                                            <p>
                                                Bakı, Azərbaycan, Xətayi rayonu,  <br />
                                                Zığ Şosesi, Əbilov qəsəbəsi
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Email: <a href="#">office@pasha-k.az</a>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                Phone: (+994 12) 571-00-00
                                            </p>
                                        </li>
                                    </ul>
                                    <Link href={`/contact`} className="tf-btn btn-line">
                                        Contact Us
                                        <i className="icon icon-arrow1-top-left" />
                                    </Link>
                                    <ul className="tf-social-icon d-flex gap-10 style-white">
                                        <li>
                                            <a
                                                href="#"
                                                className="box-icon w_34 round social-facebook social-line"
                                            >
                                                <i className="icon fs-14 icon-fb" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="box-icon w_34 round social-twiter social-line"
                                            >
                                                <i className="icon fs-12 icon-Icon-x" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="box-icon w_34 round social-instagram social-line"
                                            >
                                                <i className="icon fs-14 icon-instagram" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="box-icon w_34 round social-tiktok social-line"
                                            >
                                                <i className="icon fs-14 icon-tiktok" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="box-icon w_34 round social-pinterest social-line"
                                            >
                                                <i className="icon fs-14 icon-pinterest-1" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                                <div className="footer-heading footer-heading-desktop">
                                    <h6>Explore</h6>
                                </div>
                                <div className="footer-heading footer-heading-moblie">
                                    <h6>Explore</h6>
                                </div>
                                <ul className="footer-menu-list tf-collapse-content">
                                    {footerLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.href} className="footer-menu_item">
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                                <div className="footer-heading footer-heading-desktop">
                                    <h6>About us</h6>
                                </div>
                                <div className="footer-heading footer-heading-moblie">
                                    <h6>About us</h6>
                                </div>
                                <ul className="footer-menu-list tf-collapse-content">
                                    {aboutLinks.slice(0, 4).map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.href} className="footer-menu_item">
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-xl-3 col-md-6 col-12">
                                <div className="footer-newsletter footer-col-block">
                                    <div className="footer-heading footer-heading-desktop">
                                        <h6>Sign Up for Email</h6>
                                    </div>
                                    <div className="footer-heading footer-heading-moblie">
                                        <h6>Sign Up for Email</h6>
                                    </div>
                                    <div className="tf-collapse-content">
                                        <div className="footer-menu_item">
                                            Sign up to stay updated on news and latest blogs!
                                        </div>
                                        <div
                                            className={`tfSubscribeMsg ${showMessage ? "active" : ""
                                                }`}
                                        >
                                            {success ? (
                                                <p style={{ color: "rgb(52, 168, 83)" }}>
                                                    You have successfully subscribed.
                                                </p>
                                            ) : (
                                                <p style={{ color: "red" }}>Something went wrong</p>
                                            )}
                                        </div>
                                        <form
                                            ref={formRef}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                subscribe();
                                            }}
                                            className="form-newsletter"
                                            method="post"
                                            acceptCharset="utf-8"
                                            data-mailchimp="true"
                                        >
                                            <div id="subscribe-content">
                                                <fieldset className="email">
                                                    <input
                                                        required
                                                        type="email"
                                                        name="email-form"
                                                        placeholder="Enter your email...."
                                                        tabIndex={0}
                                                        value={email}
                                                        onChange={event => setEmail(event.target.value)}
                                                        aria-required="true"
                                                        autoComplete="abc@xyz.com"
                                                    />
                                                </fieldset>
                                                <div className="button-submit">
                                                    <button
                                                        className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                                                        type="submit"
                                                    >
                                                        Subscribe
                                                        <i className="icon icon-arrow1-top-left" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div id="subscribe-msg" />
                                        </form>
                                        <div className="tf-cur">

                                            <div className="tf-languages">
                                                {/* <LanguageSelect
                                                    parentClassName={
                                                        "image-select center style-default type-languages color-white"
                                                    }
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-bottom-wrap d-flex gap-20 flex-wrap justify-content-between align-items-center">
                                    <div className="footer-menu_item">
                                        © {new Date().getFullYear()} PashaK. All Rights
                                        Reserved
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
