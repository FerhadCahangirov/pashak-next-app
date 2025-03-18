"use client"

import React, { useCallback, useEffect, useState } from 'react'
import BlogDetails from './BlogDetails'
import RelatedBlogs from './RelatedBlogs'

function BlogDetailsContainer({ id }) {
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    const fetchBlogDetails = useCallback(async () => {
        try {
            const response = await fetch(`/api/blogs/details/${id}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch blogs");
            }

            const data = await response.json();
            setBlogs(data.relatedBlogs);
            setBlog(data.blog);
            setPrev(data.prev);
            setNext(data.next);
        }
        catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchBlogDetails();
    }, [fetchBlogDetails])

    return blog && (
        <>
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading text-center">Blog Detail</div>
                            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                                <li>
                                    <a href={`/blog`}>Blogs</a>
                                </li>
                                <li>
                                    <i className="icon-arrow-right" />
                                </li>
                                <li>{blog.title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <BlogDetails blog={blog} prev={prev} next={next} />
            <RelatedBlogs blogs={blogs} />
        </>
    )
}

export default BlogDetailsContainer