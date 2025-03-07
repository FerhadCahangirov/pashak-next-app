"use client";
import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import { useState, useCallback, useEffect } from "react";
import Sorting from "./Sorting";
import Pagination from "../common/Pagination";

export default function ShopDefault({ categoryId }) {
    const [gridItems, setGridItems] = useState(4);
    const [products, setProducts] = useState([]);
    const [finalSorted, setFinalSorted] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(
                `/api/products?page=${page}&size=${pageSize}&categoryId=${categoryId}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch products");
            }

            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.pagination.totalPages);
            setTotalProducts(data.pagination.totalProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <>
            <section className="flat-spacing-2">
                <div className="container">
                    <div className="tf-shop-control grid-3 align-items-center">
                        <ul className="tf-control-layout d-flex justify-content-center">
                            {layouts.map((layout, index) => (
                                <li
                                    key={index}
                                    className={`tf-view-layout-switch ${layout.className} ${gridItems == layout.dataValueGrid ? "active" : ""
                                        }`}
                                    onClick={() => setGridItems(layout.dataValueGrid)}
                                >
                                    <div className="item">
                                        <span className={`icon ${layout.iconClass}`} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="tf-control-sorting d-flex justify-content-end">
                            <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                                <Sorting setFinalSorted={setFinalSorted} products={products} />
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-control-shop">
                        <div className="meta-filter-shop" />
                        <ProductGrid allproducts={finalSorted} gridItems={gridItems} totalProducts={totalProducts} />
                        {/* pagination */}
                        {finalSorted.length ? (
                            <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                                <Pagination
                                    activePage={page}
                                    totalPages={totalPages}
                                    onPageClick={handlePageClick}
                                />
                            </ul>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
