"use client"

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";
import { globalConfig } from "@/data/globalConfig";

export default function ShopCollections() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(
                `/api/categories?page=${page}&size=${pageSize}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch categories");
            }

            const data = await response.json();
            setCategories(data.categories);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, [page]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <section className="flat-spacing-1">
            <div className="container">
                <div className="tf-grid-layout lg-col-3 tf-col-2">
                    {categories.map((item, index) => (
                        <div className="collection-item hover-img" key={index}>
                            <div className="collection-inner">
                                <a
                                    href={`/categories/${item.id}`}
                                    className="collection-image img-style"
                                >
                                    <Image
                                        className="lazyload"
                                        alt={item.name}
                                        src={globalConfig.domain + item.src}
                                        width={460}
                                        height={460}
                                        style={{
                                            width: "460px",
                                            height: "300px"
                                        }}
                                    />
                                </a>
                                <div className="collection-content">
                                    <a
                                        href={`/categories/${item.id}`}
                                        className="tf-btn collection-title hover-icon"
                                    >
                                        <span>{item.name}</span>
                                        <i className="icon icon-arrow1-top-left" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* pagination */}
                <ul className="tf-pagination-wrap tf-pagination-list">
                    <Pagination
                        activePage={page}
                        totalPages={totalPages}
                        onPageClick={handlePageClick}
                    />
                </ul>
            </div>
        </section>
    );
}
