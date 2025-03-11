import React from 'react'
import Image from "next/image";
import Link from "next/link";

function Collection() {
    return (
        <section className="flat-spacing-19 pt_0 pb_10">
            <div className="container">
                <div className="tf-grid-layout gap-0 rounded-0 md-col-2 tf-img-with-text style-3">
                    <div className="tf-content-wrap">
                        <div>
                            <div className="heading fs-42 wow fadeInUp" data-wow-delay="0s">
                                High-Quality Medicines for Healthcare Providers
                            </div>
                            <p
                                className="description text_black-2 wow fadeInUp"
                                data-wow-delay="0s"
                            >
                                Pasha-K supplies a wide range of trusted, high-quality medicines
                                to hospitals, clinics, and healthcare professionals to ensure
                                optimal patient care.
                            </p>
                            <Link href={"/products"} className="tf-btn btn-line">
                                Explore Our Medicines
                                <i className="icon icon-arrow1-top-left" />
                            </Link>
                        </div>
                    </div>
                    <div className="tf-image-wrap">
                        <Image
                            className="lazyload"
                            data-src="/images/collections/medicine_img1.jpg"
                            alt="medicine-img"
                            src="/images/collections/medicine_img1.jpg"
                            width={800}
                            height={598}
                        />
                    </div>
                </div>
                <div className="tf-grid-layout gap-0 rounded-0 md-col-2 tf-img-with-text style-3 bg-f5fbfd">
                    <div className="tf-image-wrap">
                        <Image
                            className="lazyload"
                            data-src="/images/collections/medicine_img2.jpg"
                            alt="medicine-img"
                            src="/images/collections/medicine_img2.jpg"
                            width={800}
                            height={598}
                        />
                    </div>
                    <div className="tf-content-wrap">
                        <div>
                            <div className="heading fs-42 wow fadeInUp" data-wow-delay="0s">
                                Supply Solutions for Healthcare Facilities
                            </div>
                            <p
                                className="description text_black-2 wow fadeInUp"
                                data-wow-delay="0s"
                            >
                                We provide comprehensive medicine supply solutions to meet the
                                needs of hospitals, doctors, and clinics. Trust Pasha-K for
                                reliable, timely deliveries.
                            </p>
                            <Link href={"/our-story"} className="tf-btn btn-line">
                                Discover Our Story
                                <i className="icon icon-arrow1-top-left" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Collection
