"use client";
import { useEffect, useState } from "react";
import { useContextElement } from "@/context/Context";
import { globalConfig } from "@/data/globalConfig";

export const ProductCard = ({ product, index }) => {
    const [currentImage, setCurrentImage] = useState(product.imgSrc);
    useEffect(() => {
        setCurrentImage(product.imgSrc);
    }, [product]);

    const getColorFromIndex = (index) => {
        let colors = [
            "#e5dddb",
            "#ececec",
            "#919386",
            "#bab9b7",
            "#a2816a"
        ]

        return colors[index % colors.length];
    }

    const { setQuickViewItem } = useContextElement();

    return (
        <div className="card-product fl-item" key={product.id}>
            <div className="card-product-wrapper">
                <a href={`/product-detail/${product.id}`} className="product-img" style={{ background: "#e5dddb" }}>
                    <img
                        className="lazyload img-product"
                        src={globalConfig.domain + product.images[0].src}
                        alt="image-product"
                        width={720}
                        height={1005}
                    />
                    <img
                        className="lazyload img-hover"
                        src={globalConfig.domain + (product.images.length > 1 ? product.images[1].src : product.images[0].src)}
                        alt="image-product"
                        width={720}
                        height={1005}
                    />
                </a>
                <div className="list-product-btn">
                    <a
                        href="#quick_view"
                        onClick={() => setQuickViewItem(product)}
                        data-bs-toggle="modal"
                        className="box-icon bg_white quickview tf-btn-loading"
                    >
                        <span className="icon icon-view" />
                        <span className="tooltip">Quick View</span>
                    </a>
                    <a
                        href={`/product-detail/${product.id}`}
                        className="box-icon bg_white quickview tf-btn-loading"
                    >
                        <span className="icon icon-compare" />
                        <span className="tooltip">Go To Page</span>
                    </a>
                </div>
                <div className="size-list">
                    <span >{product.category.name}</span>
                </div>
            </div>
            <div className="card-product-info">
                <a href={`/product-detail/${product.id}`} className="title link">
                    {product.name}
                </a>
            </div>
        </div>
    );
};
