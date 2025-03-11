"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
                <Link href={`/product-detail/${product.id}`} className="product-img" style={{ background: "#e5dddb" }}>
                    <Image
                        className="lazyload img-product"
                        data-src={globalConfig.domain + product.images[0].src}
                        src={globalConfig.domain + product.images[0].src}
                        alt="image-product"
                        width={720}
                        height={1005}
                    />
                    <Image
                        className="lazyload img-hover"
                        data-src={
                            globalConfig.domain + (product.images.length > 1 ? product.images[1].src : product.images[0].src)
                        }
                        src={globalConfig.domain + (product.images.length > 1 ? product.images[1].src : product.images[0].src)}
                        alt="image-product"
                        width={720}
                        height={1005}
                    />
                </Link>
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
                <Link href={`/product-detail/${product.id}`} className="title link">
                    {product.name}
                </Link>
            </div>
        </div>
    );
};
