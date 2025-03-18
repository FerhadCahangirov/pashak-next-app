"use client"

import React, { useEffect, useState } from "react";
import { globalConfig } from "@/data/globalConfig";
import Image from "next/image";

export default function blogs() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titleFilter, setTitleFilter] = useState("");

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);


    const fetchblogs = async () => {
        try {
            const response = await fetch(
                `/api/blogs?title=${titleFilter || ""}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch blogs");
            }

            const data = await response.json();
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            alertify.error("An error occurred while fetching blogs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchblogs();
    }, [titleFilter]);

    const handleFilterChange = (event) => {
        setTitleFilter(event.target.value);
    };

    const handleRemove = (id) => {
        alertify.confirm('Confirm', 'Are you sure to delete blog.',
            async function () {
                try {

                    var response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });

                    if (!response.ok)
                        throw new Error("Failed to delete blog");

                    alertify.success(response.message || "blog deleted successfully");
                    fetchblogs();
                } catch (error) {
                    console.error(error);
                    alertify.error('Failed to delete blog');
                }
            },
            function () { });
    };

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="my-account-content account-order">
            <div className="row">
                <div className="col-md-9 col-6">
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="text"
                            id="blogName"
                            name="blogName"
                            value={titleFilter}
                            onChange={handleFilterChange}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="blogName"
                        >
                            Blog name
                        </label>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">

                        <a
                            href={`/admin/blogs/add`}
                            className="tf-btn btn-fill btn-xl animate-hover-btn rounded-0 justify-content-center"
                            style={{ height: "50px" }}
                        >
                            <span>Add</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="wrap-account-order">
                <table>
                    <thead>
                        <tr>
                            <th className="fw-6">Blog</th>
                            <th className="fw-6">Title</th>
                            <th className="fw-6">Created At</th>
                            <th className="fw-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr> : blogs.length > 0 ? (
                                blogs.map((blog, index) => (
                                    <tr className="tf-order-item">
                                        <td>
                                            <Image
                                                className="lazyload img-blog"
                                                data-src={globalConfig.domain + blog.src}
                                                src={globalConfig.domain + blog.src}
                                                alt={blog.title}
                                                width={78}
                                                height={42}
                                            />
                                        </td>
                                        <td>{blog.title}</td>
                                        <td>{new Date(blog.createdAt).toLocaleDateString("en-US", options)}</td>
                                        <td>

                                            <a
                                                href={`/admin/blogs/edit/${blog.id}`}
                                                className="tf-btn btn-fill btn-color-1 animate-hover-btn rounded-0 justify-content-center"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <span>Edit</span>
                                            </a>
                                            <a
                                                href={`javascript:void(0)`}
                                                onClick={() => handleRemove(blog.id)}
                                                className="tf-btn btn-fill btn-color-6 animate-hover-btn rounded-0 justify-content-center"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <span>Delete</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No blogs found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
