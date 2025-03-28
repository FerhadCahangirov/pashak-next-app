"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useCallback, useEffect, useState } from "react";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await fetch('/api/blogs');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch blogs");
            }

            const data = await response.json();
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return blogs.length > 0 && (
        <section className="flat-spacing-14">
            <div className="container">
                <div className="flat-title wow fadeInUp" data-wow-delay="0s">
                    <span className="title">Blog posts</span>
                </div>
                <div className="hover-sw-nav view-default hover-sw-3">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-sw-product-sell"
                        slidesPerView={3}
                        spaceBetween={30}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            0: { slidesPerView: 1 },
                        }}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            prevEl: ".snbp157",
                            nextEl: ".snbn157",
                        }}
                        pagination={{ clickable: true, el: ".spd157" }}
                    >
                        {blogs.map((article, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="blog-article-item wow fadeInUp"
                                    data-wow-delay={index / 10}
                                >
                                    <div className="article-thumb h-460 rounded-0">
                                        <a href={`/blog-detail/${article.id}`}>
                                            <Image
                                                className="lazyload"
                                                data-src={article.src}
                                                alt={article.title}
                                                src={article.src}
                                                width={550}
                                                height={354}
                                            />
                                        </a>
                                        <div className="article-label">
                                            <a
                                                href={`/blog-grid`}
                                                className="tf-btn btn-sm animate-hover-btn"
                                            >
                                               {article.tags[0].name}   
                                            </a>
                                        </div>
                                    </div>
                                    <div className="article-content">
                                        <div className="article-title">
                                            <a href={`/blog-detail/${article.id}`}>
                                                {article.title}
                                            </a>
                                        </div>
                                        <div className="article-btn">
                                            <a
                                                href={`/blog-detail/${article.id}`}
                                                className="tf-btn btn-line fw-6"
                                            >
                                                Read more
                                                <i className="icon icon-arrow1-top-left" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round snbp157">
                        <span className="icon icon-arrow-left" />
                    </div>
                    <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round snbn157">
                        <span className="icon icon-arrow-right" />
                    </div>
                    <div className="sw-dots style-2 sw-pagination-product justify-content-center spd157" />
                </div>
            </div>
        </section>
    );
}
