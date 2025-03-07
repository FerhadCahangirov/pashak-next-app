"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ProductCard } from "../cards/ProductCard";

export default function Products() {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [allproducts, setAllproducts] = useState([]);
    const [products, setProducts] = useState([]);

    const handleLoad = () => {
        setLoading(true);

        setTimeout(() => {
            setProducts((pre) => [...pre, ...allproducts.slice(6, 15)]);
            setLoading(false);
            setLoaded(true);
        }, 1000);
    };

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch('/api/products/getHomeProducts');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch products");
            }
            const data = await response.json();
            setAllproducts(data.products);
            setProducts(data.products.slice(0, 6));
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }

    }, []);

    useEffect(() => {
        fetchProducts();
    }, [])

    return products.length > 0 && (
        <section className="flat-spacing-5 pt_0 flat-seller">
            <div className="container">
                <div className="flat-title">
                    <span className="title wow fadeInUp" data-wow-delay="0s">
                        Products
                    </span>
                    <p className="sub-title wow fadeInUp" data-wow-delay="0s">
                        View the Latest Products: Explore our newest arrivals
                    </p>
                </div>
                <div
                    className="grid-layout wow fadeInUp"
                    data-wow-delay="0s"
                    data-grid="grid-4"
                >
                    {products.map((product, i) => (
                        <ProductCard product={product} index={i} key={i} />
                    ))}
                </div>
                {allproducts.length > 6 && !loaded && (
                    <div className="tf-pagination-wrap view-more-button text-center">
                        <button
                            className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${loading ? "loading" : ""
                                } `}
                            onClick={() => handleLoad()}
                        >
                            <span className="text">Load more</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
