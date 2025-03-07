"use client";
import React, { useState } from "react";
import { useContextElement } from "@/context/Context";
import ImageSlider from "./ImageSlider";
import Image from "next/image";

export default function Details({ product }) {

    const [currentImage, setCurrentImage] = useState(product.images[0]);

    const handleImage = (index) => {
        const updatedImage = product.images[index];
        if (updatedImage) {
            setCurrentImage(updatedImage);
        }
    };

    return (
        <section
            className="flat-spacing-4 pt_0"
            style={{ maxWidth: "100vw", overflow: "clip" }}
        >
            <div className="tf-main-product section-image-zoom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tf-product-media-wrap sticky-top">
                                <div className="thumbs-slider">
                                    <ImageSlider
                                        handleImage={handleImage}
                                        currentImage={currentImage}
                                        images={product.images}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tf-product-info-wrap position-relative">
                                <div className="tf-zoom-main" />
                                <div className="tf-product-info-list other-image-zoom">
                                    <div className="tf-product-info-title">
                                        <h5>
                                            {product.name}
                                        </h5>
                                    </div>
                                    <div className="tf-product-info-liveview">
                                        <div className="liveview-count px_15">{product.category.name}</div>
                                    </div>

                                    <div className="tf-product-info-variant-picker">
                                        <div className="variant-picker-item">
                                            <div className="variant-picker-label">
                                                Description:
                                            </div>
                                            <div className="variant-picker-values">
                                                {product.description}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tf-product-info-variant-picker">
                                        <div className="variant-picker-item">
                                            <div className="variant-picker-label">
                                                Compositions:
                                            </div>
                                            <div className="variant-picker-values">
                                                {product.compositions.map(composition => composition.name).join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>{" "}
            {/* <StickyItem /> */}
        </section>
    );
}