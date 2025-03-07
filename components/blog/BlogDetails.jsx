import React from "react";
import Image from "next/image";

export default function BlogDetails({ blog, prev, next }) {
    return (
        <>
            <div className="blog-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="blog-detail-main">
                                <div className="blog-detail-main-heading">
                                    <ul className="tags-lists justify-content-center">
                                        {
                                            blog.tags.map((tag, index) => (
                                                <li key={index}>
                                                    <a className="tags-item">
                                                        {tag.name}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="title">{blog.title}</div>
                                    <div className="meta">
                                        by <span>admin</span> on <span>Oct 02</span>
                                    </div>
                                    <div className="image">
                                        <Image
                                            className="lazyload"
                                            data-src={blog.src}
                                            alt="image"
                                            src={blog.src}
                                            width={1100}
                                            height={707}
                                        />
                                    </div>
                                </div>
                                <div className="desc" dangerouslySetInnerHTML={{ __html: blog.content }}>
                                </div>
                                <div className="bot d-flex justify-content-between flex-wrap align-items-center">
                                    <ul className="tags-lists">
                                        {
                                            blog.tags.map((tag, index) => (
                                                <li key={index}>
                                                    <a className="tags-item">
                                                        {tag.name}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="d-flex align-items-center gap-20">
                                        <p>Share:</p>
                                        <ul className="tf-social-icon d-flex style-default">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="box-icon round social-facebook border-line-black"
                                                >
                                                    <i className="icon fs-14 icon-fb" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="box-icon round social-twiter border-line-black"
                                                >
                                                    <i className="icon fs-12 icon-Icon-x" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="box-icon round social-instagram border-line-black"
                                                >
                                                    <i className="icon fs-14 icon-instagram" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="box-icon round social-tiktok border-line-black"
                                                >
                                                    <i className="icon fs-14 icon-tiktok" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="box-icon round social-pinterest border-line-black"
                                                >
                                                    <i className="icon fs-14 icon-pinterest-1" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tf-article-navigation">

                                    <div className="item position-relative d-flex w-100 prev">
                                        {
                                            prev && (
                                                <>
                                                    <a href={`/blog-detail/${prev.id}`} className="icon">
                                                        <i className="icon-arrow-left" />
                                                    </a>
                                                    <div className="inner">
                                                        <a href={`/blog-detail/${prev.id}`}>PREVIOUS</a>
                                                        <h6>
                                                            <a href={`/blog-detail/${prev.id}`}>
                                                                {prev.title}
                                                            </a>
                                                        </h6>
                                                    </div>
                                                </>
                                            )
                                        }

                                    </div>
                                    <div className="item position-relative d-flex w-100 justify-content-end next">
                                        {
                                            next && (
                                                <>
                                                    <div className="inner text-end">
                                                        <a href={`/blog-detail/${next.id}`}>NEXT</a>
                                                        <h6>
                                                            <a href={`/blog-detail/${next.id}`}>
                                                                {next.title}
                                                            </a>
                                                        </h6>
                                                    </div>
                                                    <a href={`/blog-detail/${next.id}`} className="icon">
                                                        <i className="icon-arrow-right" />
                                                    </a>
                                                </>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
