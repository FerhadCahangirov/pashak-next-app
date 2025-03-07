"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/common/Pagination";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10); // Default items per page
    const [totalPages, setTotalPages] = useState(1);

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(
                `/api/categories?page=${page}&size=${pageSize}&name=${nameFilter || ""}`
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
            alertify.error("An error occurred while fetching categories.");
        } finally {
            setLoading(false);
        }
    }, [page, nameFilter]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value);
        setPage(1); // Reset to first page when filtering
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleRemove = (id) => {
        alertify.confirm('Confirm', 'Are you sure to delete category.',
            async function () {
                try {

                    var response = await fetch(`/api/categories/${id}`, { method: "DELETE" });

                    if (!response.ok)
                        throw new Error("Failed to delete category");

                    alertify.success(response.message || "Category deleted successfully");
                    fetchCategories();
                } catch (error) {
                    console.error(error);
                    alertify.error('Failed to delete category');
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
                            id="categoryName"
                            required
                            name="categoryName"
                            value={nameFilter}
                            onChange={handleFilterChange}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="categoryName"
                        >
                            Category name
                        </label>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">
                        <Link
                            href={`/admin/categories/add`}
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
                            <th className="fw-6">Category</th>
                            <th className="fw-6">Name</th>
                            <th className="fw-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr>
                            <td colSpan={3}>Loading...</td>
                        </tr> : categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr className="tf-order-item" key={index}>
                                    <td>
                                        <Image
                                            className="lazyload img-product"
                                            src={category.src}
                                            alt="image-product"
                                            width={78}
                                            height={42}
                                        />
                                    </td>
                                    <td>{category.name}</td>
                                    <td>
                                        <Link
                                            href={`/admin/categories/edit/${category.id}`}
                                            className="tf-btn btn-fill btn-color-5 animate-hover-btn rounded-0 justify-content-center"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                        <Link
                                            href="javascript:void(0);"
                                            onClick={() => handleRemove(category.id)}
                                            className="tf-btn btn-fill btn-color-3 animate-hover-btn rounded-0 justify-content-center"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            <span>Delete</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No categories found</td>
                            </tr>
                        )}
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
