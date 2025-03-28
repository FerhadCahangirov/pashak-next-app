"use client"

import { globalConfig } from "@/data/globalConfig";
import React, { useCallback, useEffect, useState } from "react";

export default function BlogGrid() {

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await fetch('/api/blogs');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch blogs");
            }

            const data = await response.json();
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }   
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (
        <div className="blog-grid-main">
            <div className="container">
                <div className="row">
                    {blogs.map((post, index) => (
                        <div className="col-xl-4 col-md-6 col-12" key={index}>
                            <div className="blog-article-item">
                                <div className="article-thumb">
                                    <a href={`/blog-detail/${post.id}`}>
                                        <img
                                            className="lazyload"
                                            alt={post.title}
                                            src={globalConfig.domain + post.src}
                                            width={550}
                                            height={354}
                                            style={{
                                                width: '550px',
                                                height: '354px'
                                            }}
                                        />
                                    </a>
                                    <div className="article-label">
                                        <a
                                            href={`/blog-detail/${post.id}`}
                                            className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn"
                                        >
                                            {post.tags[0].name}
                                        </a>
                                    </div>
                                </div>
                                <div className="article-content">
                                    <div className="article-title">
                                        <a href={`/blog-detail/${post.id}`}>{post.title}</a>
                                    </div>
                                    <div className="article-btn">
                                        <a
                                            href={`/blog-detail/${post.id}`}
                                            className="tf-btn btn-line fw-6"
                                        >
                                            Read more
                                            <i className="icon icon-arrow1-top-left" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
