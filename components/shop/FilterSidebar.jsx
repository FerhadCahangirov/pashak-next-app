"use client";

import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import { useCallback, useEffect, useState } from "react";
import ProductSidebar from "../modals/ProductSidebar"
import SidebarFilter from "./SidebarFilter";
import Pagination from "../common/Pagination";
import Sorting from "./Sorting";

export default function FilterSidebar() {
    const [gridItems, setGridItems] = useState(3);
    const [products, setProducts] = useState([]);
    const [finalSorted, setFinalSorted] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [nameFilter, setNameFilter] = useState("");
    const [categoryId, setCategoryId] = useState(-1);
    const [compositions, setCompositions] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
            const compositionNames = compositions.map(c => c.name).join("<->");

            const response = await fetch(
                `/api/products?page=${page}&size=${pageSize}&name=${nameFilter || ""}&categoryId=${categoryId}&compositions=${encodeURIComponent(compositionNames)}`
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
    }, [page, nameFilter, categoryId, compositions]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value);
        setPage(1);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <>
            <section className="flat-spacing-1">
                <div className="container">
                    <div className="tf-shop-control grid-3 align-items-center">
                        <div />
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
                    <div className="tf-row-flex">
                        <SidebarFilter
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                            nameFilter={nameFilter}
                            setNameFilter={setNameFilter}
                            compositions={compositions}
                            setCompositions={setCompositions}
                        />
                        <div className="tf-shop-content wrapper-control-shop">
                            <div className="meta-filter-shop" />
                            <ProductGrid allproducts={finalSorted} gridItems={gridItems} totalProducts={totalProducts} loading={loading} />
                            {/* pagination */}{" "}
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
                </div>
            </section>
            <div className="btn-sidebar-mobile start-0">
                <a
                    href="#sidebarmobile"
                    data-bs-toggle="offcanvas"
                    aria-controls="offcanvasLeft"
                >
                    <button className="type-hover">
                        <i className="icon-open" />
                        <span className="fw-5">Open sidebar</span>
                    </button>
                </a>
            </div>
            <ProductSidebar
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                compositions={compositions}
                setCompositions={setCompositions} />
        </>
    );
}
