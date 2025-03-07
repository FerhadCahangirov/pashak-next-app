import { socialLinksWithBorder } from "@/data/socials";
import React from "react";

export default function Map() {
    return (
        <section className="flat-spacing-9">
            <div className="container">
                <div className="tf-grid-layout gap-0 lg-col-2">
                    <div className="w-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d10226.777887892977!2d49.95117703523888!3d40.354783605316925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2saz!4v1739529738239!5m2!1sen!2saz"
                            width="100%"
                            height={894}
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        
                    </div>
                    <div className="tf-content-left has-mt">
                        <div className="sticky-top">
                            <h5 className="mb_20">Visit Our Store</h5>
                            <div className="mb_20">
                                <p className="mb_15">
                                    <strong>Address</strong>
                                </p>
                                <p>Bakı, Azərbaycan, Xətayi rayonu, Zığ Şosesi, Əbilov qəsəbəsi</p>
                            </div>
                            <div className="mb_20">
                                <p className="mb_15">
                                    <strong>Phone</strong>
                                </p>
                                <p>(+994 12) 571-00-00 <br />571-06-33 <br /> 571-32-25 | (+994 12) 571-00-00</p>
                            </div>
                            <div className="mb_20">
                                <p className="mb_15">
                                    <strong>Email</strong>
                                </p>
                                <p>office@pasha-k.az</p>
                            </div>
                            <div className="mb_36">
                                <p className="mb_15">
                                    <strong>Open Time</strong>
                                </p>
                                <p className="mb_15">Our store has re-opened for shopping,</p>
                                <p>exchange Every day 11am to 7pm</p>
                            </div>
                            <div>
                                <ul className="tf-social-icon d-flex gap-20 style-default">
                                    {socialLinksWithBorder.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className={`box-icon link round ${link.className} ${link.borderClass}`}
                                            >
                                                <i
                                                    className={`icon ${link.iconSize} ${link.iconClass}`}
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
