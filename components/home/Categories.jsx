"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { globalConfig } from "@/data/globalConfig";
export default function Categories() {

    const [categories, setCategories] = useState([]);
    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(
                '/api/categories/getAll'
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch categories");
            }

            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    return categories.length > 0 && (
        <section className="flat-spacing-4 flat-categorie">
            <div className="container-full">
                <div className="flat-title-v2">
                    <div className="box-sw-navigation">
                        <div className="nav-sw nav-next-slider snbp1 nav-next-collection snbp107">
                            <span className="icon icon-arrow-left" />
                        </div>
                        <div className="nav-sw nav-prev-slider snbn1 nav-prev-collection snbn107">
                            <span className="icon icon-arrow-right" />
                        </div>
                    </div>
                    <span
                        className="text-3 fw-7 text-uppercase title wow fadeInUp"
                        data-wow-delay="0s"
                    >
                        SEARCH BY CATEGORIES
                    </span>
                </div>
                <div className="row">
                    <div className="col-xl-9 col-lg-8 col-md-8">
                        <Swiper
                            dir="ltr"
                            className="swiper tf-sw-collection"
                            spaceBetween={15}
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".snbp107",
                                nextEl: ".snbn107",
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            {categories.map((item, index) => (
                                <SwiperSlide className="swiper-slide" key={index}>
                                    <div className="collection-item style-left hover-img">
                                        <div className="collection-inner">
                                            <a
                                                href={`/categories/${item.id}`}
                                                className="collection-image img-style"
                                            >
                                                <Image
                                                    className="lazyload"
                                                    alt={item.name}
                                                    src={globalConfig.domain + item.src}
                                                    width="600"
                                                    height="721"
                                                    style={{
                                                        height:"320px"
                                                    }}
                                                />
                                            </a>
                                            <div className="collection-content">
                                                <a
                                                    href={`/categories/${item.id}`}
                                                    className="tf-btn collection-title hover-icon fs-15"
                                                >
                                                    <span>{item.name}</span>
                                                    <i className="icon icon-arrow1-top-left" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="discovery-new-item">
                            <h5>Discovery all categories</h5>
                            <a href={`/categories`}>
                                <i className="icon-arrow1-top-left" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
