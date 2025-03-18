"use client";

import { useContextElement } from "@/context/Context";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import { globalConfig } from "@/data/globalConfig";

export default function QuickView() {
    const {
        quickViewItem,
    } = useContextElement();

    const openModalSizeChoice = () => {
        const bootstrap = require("bootstrap"); // dynamically import bootstrap
        var myModal = new bootstrap.Modal(document.getElementById("find_size"), {
            keyboard: false,
        });

        myModal.show();
        document
            .getElementById("find_size")
            .addEventListener("hidden.bs.modal", () => {
                myModal.hide();
            });
        const backdrops = document.querySelectorAll(".modal-backdrop");
        if (backdrops.length > 1) {
            // Apply z-index to the last backdrop
            const lastBackdrop = backdrops[backdrops.length - 1];
            lastBackdrop.style.zIndex = "1057";
        }
    };

    return (
        <div className="modal fade modalDemo" id="quick_view">
            <div className="modal-dialog modal-dialog-centered">
                {
                    quickViewItem &&
                    <div className="modal-content">
                        <div className="header">
                            <span
                                className="icon-close icon-close-popup"
                                data-bs-dismiss="modal"
                            />
                        </div>
                        <div className="wrap">
                            <div className="tf-product-media-wrap">
                                {quickViewItem && (
                                    <Swiper
                                        dir="ltr"
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: ".snbqvp",
                                            nextEl: ".snbqvn",
                                        }}
                                        className="swiper tf-single-slide"
                                    >
                                        {quickViewItem.images.map((image, index) => (
                                            <SwiperSlide className="swiper-slide" key={index}>
                                                <div className="item">
                                                    <img
                                                        alt={""}
                                                        src={globalConfig.domain + image.src}
                                                        width={720}
                                                        height={1045}
                                                        style={{ objectFit: "contain" }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}

                                        <div className="swiper-button-prev button-style-arrow single-slide-prev snbqvp" />
                                        <div className="swiper-button-next button-style-arrow single-slide-next snbqvn" />
                                    </Swiper>
                                )}
                            </div>
                            <div className="tf-product-info-wrap position-relative">
                                <div className="tf-product-info-list">
                                    <div className="tf-product-info-title">
                                        <h5>
                                            <a
                                                className="link"
                                                href={`/product-detail/${quickViewItem.id}`}
                                            >
                                                {quickViewItem.name}
                                            </a>
                                        </h5>
                                    </div>
                                    <div className="tf-product-info-badges">
                                        <div className="badges text-uppercase">{quickViewItem.category.name}</div>
                                    </div>
                                    <div className="tf-product-description">
                                        <p>
                                        {quickViewItem.description}
                                        </p>
                                    </div>

                                    <div>
                                        <a
                                            href={`/product-detail/${quickViewItem.id}`}
                                            className="tf-btn fw-6 btn-line"
                                        >
                                            View full details
                                            <i className="icon icon-arrow1-top-left" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
