"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../common/Pagination";
import { globalConfig } from "@/data/globalConfig";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const fetchProducts = async (currentPage, filterName) => {
        try {
            const response = await fetch(
                `/api/products?page=${currentPage}&size=${pageSize}&name=${filterName || ""}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch products");
            }

            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
            alertify.error("An error occurred while fetching products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page, nameFilter);
    }, [page, nameFilter]);

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value);
        setPage(1);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleRemove = (id) => {
        alertify.confirm('Confirm', 'Are you sure to delete product.',
            async function () {
                try {

                    var response = await fetch(`/api/products/${id}`, { method: "DELETE" });

                    if (!response.ok)
                        throw new Error("Failed to delete product");

                    alertify.success(response.message || "Product deleted successfully");
                    fetchProducts(page, nameFilter);
                } catch (error) {
                    console.error(error);
                    alertify.error('Failed to delete product');
                }
            },
            function () { });
    };

    return (
        <div className="my-account-content account-order">
            <div className="row">
                <div className="col-md-9 col-6">
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="text"
                            id="productName"
                            required
                            name="productName"
                            value={nameFilter}
                            onChange={handleFilterChange}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="productName"
                        >
                            Product name
                        </label>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">

                        <Link
                            href={`/admin/products/add`}
                            className="tf-btn btn-fill btn-xl animate-hover-btn rounded-0 justify-content-center"
                            style={{ height: "50px" }}
                        >
                            <span>Add</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wrap-account-order">
                <table>
                    <thead>
                        <tr>
                            <th className="fw-6">Product</th>
                            <th className="fw-6">Name</th>
                            <th className="fw-6">Category</th>
                            <th className="fw-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr> : products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr className="tf-order-item" key={index}>
                                        <td>
                                            <Image
                                                className="lazyload img-product"
                                                src={globalConfig.domain + product.images[0].src}
                                                alt={product.name}
                                                width={78}
                                                height={42}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category.name}</td>
                                        <td>

                                            <Link
                                                href={`/admin/products/edit/${product.id}`}
                                                className="tf-btn btn-fill btn-color-1 animate-hover-btn rounded-0 justify-content-center"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <span>Edit</span>
                                            </Link>
                                            <Link
                                                href={`/admin/products/upload/${product.id}`}
                                                className="tf-btn btn-fill btn-color-5 animate-hover-btn rounded-0 justify-content-center"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <span>Upload</span>
                                            </Link>
                                            <button
                                                onClick={() => handleRemove(product.id)}
                                                className="tf-btn btn-fill btn-color-6 animate-hover-btn rounded-0 justify-content-center"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No products found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination
                    activePage={page}
                    totalPages={totalPages}
                    onPageClick={handlePageClick}
                />
            </ul>
        </div>
    );
}
