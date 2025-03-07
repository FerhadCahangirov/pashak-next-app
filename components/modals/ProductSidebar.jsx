"use client"

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductSidebar({
    setCategoryId,
    categoryId,
    nameFilter,
    setNameFilter,
    compositions,
    setCompositions }) {
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);

    const memoizedCategories = useMemo(() => categories, [categories]);
    const memoizedOptions = useMemo(() => options, [options]);

    const fetchData = async (url, onSuccess, onError) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
            const data = await response.json();
            onSuccess(data);
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            onError?.(error);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        fetchData("/api/categories/getAll",
            (data) => setCategories(data.categories),
            (error) => console.error("Categories fetch failed", error)
        );

        fetchData("/api/compositions",
            (data) => setOptions(data.compositions),
            (error) => console.error("Compositions fetch failed", error)
        );

        return () => controller.abort();
    }, []);

    const clearFilter = () => {
        setCategoryId(null);
        setCompositions([]);
        setNameFilter("");
    };
    return (
        <div
            className="offcanvas offcanvas-start canvas-filter canvas-sidebar"
            id="sidebarmobile"
        >
            <div className="canvas-wrapper">
                <header className="canvas-header">
                    <span className="title">SIDEBAR MEDICINE</span>
                    <span
                        className="icon-close icon-close-popup"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </header>
                <div className="canvas-body">
                    <aside className="tf-shop-sidebar wrap-sidebar-mobile sidebar-mobile-open">
                        <div className="widget-facet wd-categories">
                            <div
                                className="facet-title"
                                data-bs-target="#nameFilter"
                                data-bs-toggle="collapse"
                                aria-expanded="true"
                                aria-controls="categories"
                            >
                                <span>Search with name</span>
                                <span className="icon icon-arrow-up" />
                            </div>
                            <div id="nameFilter" className="collapse show">
                                <div className="tf-search-sticky">
                                    <div className="tf-mini-search-frm">
                                        <fieldset className="text">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className=""
                                                name="text"
                                                tabIndex={0}
                                                value={nameFilter}
                                                onChange={event => setNameFilter(event.target.value)}
                                            />
                                        </fieldset>
                                        <button className="" type="submit">
                                            <i className="icon-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            memoizedCategories.length > 0 && (
                                <div className="widget-facet wd-categories">
                                    <div
                                        className="facet-title"
                                        data-bs-target="#categories"
                                        data-bs-toggle="collapse"
                                        aria-expanded="true"
                                        aria-controls="categories"
                                    >
                                        <span>Categories</span>
                                        <span className="icon icon-arrow-up" />
                                    </div>
                                    <div id="categories" className="collapse show">
                                        <ul className="list-categoris current-scrollbar mb_36">
                                            {memoizedCategories.map((category) => (
                                                <li
                                                    key={category.id}
                                                    className={`cate-item ${category.id === categoryId && 'ps-lg-2'}`}
                                                    style={{
                                                        transition: "all .6s ease"
                                                    }}
                                                >
                                                    <a onClick={() => setCategoryId(prev => category.id === prev ? -1 : category.id)}
                                                        className={`${category.id === categoryId && 'text_primary'}`}>
                                                        <span>{category.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }

                        {
                            memoizedOptions.length > 0 && (
                                <div className="widget-facet wd-categories">
                                    <div
                                        className="facet-title"
                                        data-bs-target="#compositions"
                                        data-bs-toggle="collapse"
                                        aria-expanded="true"
                                        aria-controls="categories"
                                    >
                                        <span>Compositions</span>
                                        <span className="icon icon-arrow-up" />
                                    </div>
                                    <div id="compositions" className="collapse show">
                                        <ul className="list-categoris current-scrollbar mb_36">
                                            {memoizedOptions.map((composition) => (
                                                <li
                                                    key={composition.id}
                                                    className={`cate-item ${compositions.some(c => c.id === composition.id) ? 'ps-lg-2' : ''}`}
                                                    style={{
                                                        transition: "all .6s ease"
                                                    }}
                                                >
                                                    <a
                                                        onClick={() =>
                                                            setCompositions(prev =>
                                                                prev.includes(composition)
                                                                    ? prev.filter(c => c.id !== composition.id)
                                                                    : [...prev, composition]
                                                            )
                                                        }
                                                        className={`${compositions.some(c => c.id === composition.id) ? 'text_primary' : ''}`}
                                                    >
                                                        <span>{composition.name}</span>
                                                    </a>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                            )
                        }

                        <div className="mt-5"></div>

                        <a
                            className="tf-btn style-2 btn-fill rounded animate-hover-btn"
                            onClick={clearFilter}
                        >
                            Clear Filter
                        </a>
                    </aside>
                </div>
            </div>
        </div>
    );
}
