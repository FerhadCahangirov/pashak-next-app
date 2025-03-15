"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { globalConfig } from "@/data/globalConfig";
// import { tfLoopItems } from "@/data/products";

export default function SearchModal() {

    const [nameFilter, setNameFilter] = useState("");
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
            if (nameFilter) {
                const response = await fetch(`/api/products?name=${nameFilter}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await response.json();

                setProducts(data.products);
            }
            else {
                setProducts([]);
            }
        }
        catch (error) {
            console.error("Error fetching product:", error);
        }
    }, [nameFilter]);

    useEffect(() => {
        fetchProducts();
    }, [nameFilter]);

    return (
        <div className="offcanvas offcanvas-end canvas-search" id="canvasSearch">
            <div className="canvas-wrapper">
                <header className="tf-search-head">
                    <div className="title fw-5">
                        Search our site
                        <div className="close">
                            <span
                                className="icon-close icon-close-popup"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                    </div>
                    <div className="tf-search-sticky">
                        <div
                            className="tf-mini-search-frm"
                        >
                            <fieldset className="text">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className=""
                                    name="text"
                                    tabIndex={0}
                                    value={nameFilter}
                                    onChange={event => setNameFilter(event.target.value)}
                                />
                            </fieldset>
                            <button className="" type="submit">
                                <i className="icon-search" />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="canvas-body p-0">
                    <div className="tf-search-content">
                        <div className="tf-cart-hide-has-results">
                            <div className="tf-col-quicklink">
                                <div className="tf-search-content-title fw-5">Quick link</div>
                                <ul className="tf-quicklink-list">
                                    <li className="tf-quicklink-item">
                                        <Link href={`/`} className="">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="tf-quicklink-item">
                                        <Link href={`/about-us`} className="">
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="tf-quicklink-item">
                                        <Link href={`/our-story`} className="">
                                            Our Story
                                        </Link>
                                    </li>
                                    <li className="tf-quicklink-item">
                                        <Link href={`/contact`} className="">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="tf-col-content">
                                {
                                    nameFilter === "" ? (
                                        <div className="tf-search-content-title fw-5">
                                            Search some products?
                                        </div>
                                    ) : products.length > 0 ? (
                                        <div className="tf-search-hidden-inner">
                                            {products.map((product, index) => (
                                                <div className="tf-loop-item" key={index}>
                                                    <div className="image">
                                                        <Link href={`/product-detail/${product.id}`}>
                                                            <img
                                                                alt={product.name}
                                                                src={globalConfig.domain + product.images[0].src}
                                                                width={720}
                                                                height={1005}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <Link href={`/product-detail/${product.id}`}>
                                                            {product.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="tf-search-content-title fw-5">
                                            No Products Found!
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
