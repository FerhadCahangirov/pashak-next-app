"use client";

import React from "react";

export default function Pagination({ activePage, totalPages, onPageClick }) {
    if (totalPages <= 1) return null;

    return (
        <>
            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                    <li
                        key={pageNumber}
                        className={activePage === pageNumber ? "active" : ""}
                    >
                        <a
                            className="pagination-link"
                            onClick={() => onPageClick(pageNumber)}
                        >
                            {pageNumber}
                        </a>
                    </li>
                );
            })}
            {activePage < totalPages && (
                <li>
                    <a
                        onClick={() => onPageClick(activePage + 1)}
                        className="pagination-link animate-hover-btn"
                    >
                        <span className="icon icon-arrow-right" />
                    </a>
                </li>
            )}
        </>
    );
}
