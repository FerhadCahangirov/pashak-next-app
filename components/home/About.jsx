"use client"

import React from "react";
import Link from "next/link";

export default function About() {
    return (
        <section className="flat-spacing-24">
            <div className="container">
                <div className="tf-grid-layout md-col-2 tf-img-with-text img-text-3">
                    <div className="tf-image wow fadeInUp" data-wow-delay="0s">
                        <div className="grid-img-group">
                            <div className="box-img item-1 hover-img tf-image-wrap">
                                <div className="img-style">
                                    <img
                                        className="lazyload"
                                        alt="img-slider"
                                        src="/images/collections/IMG_0881.jpg"
                                        width="272"
                                        height="325"
                                    />
                                </div>
                            </div>
                            <div className="box-img item-2 hover-img tf-image-wrap">
                                <div className="img-style">
                                    <img
                                        className="lazyload"
                                        alt="img-slider"
                                        src="/images/collections/IMG_0890.jpg"
                                        width="400"
                                        height="539"
                                    />
                                </div>
                            </div>
                            <div className="box-img item-3 hover-img tf-image-wrap">
                                <div className="img-style">
                                    <img
                                        className="lazyload"
                                        alt="img-slider"
                                        src="/images/collections/IMG_0900.jpg"
                                        width="217"
                                        height="219"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-content-wrap wow fadeInUp" data-wow-delay="0s">
                        <h2 className="heading fade-item fade-item-1">
                            We Are The Best <br className="d-none d-xl-block" />
                            Medical Company
                        </h2>
                        <p className="desc fade-item fade-item-2">
                            We connect healthcare providers with top-quality medicines, ensuring seamless access to essential treatments for better patient care.
                        </p>
                        <Link
                            href={`/about-us`}
                            className="tf-btn btn-line letter-spacing-1 fw-6"
                        >
                            READ MORE
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
