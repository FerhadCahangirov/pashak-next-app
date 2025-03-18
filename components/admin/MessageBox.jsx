"use client"

import React, { useCallback, useState, useEffect } from 'react'
import Pagination from "../common/Pagination"

function MessageBox() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchFilter, setSearchFilter] = useState("");
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

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(
                `/api/messages?page=${page}&size=${pageSize}&search=${searchFilter || ""}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch messages");
            }

            const data = await response.json();
            setMessages(data.messages);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            alertify.error("An error occurred while fetching messages.");
        } finally {
            setLoading(false);
        }
    }, [searchFilter])

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleFilterChange = (event) => {
        setSearchFilter(event.target.value);
        setPage(1);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleRemove = (id) => {
        alertify.confirm('Confirm', 'Are you sure to delete message.',
            async function () {
                try {
                    var response = await fetch(`/api/messages/${id}`, { method: "DELETE" });

                    if (!response.ok)
                        throw new Error("Failed to delete message");

                    alertify.success(response.message || "Message deleted successfully");
                    fetchMessages();
                } catch (error) {
                    console.error(error);
                    alertify.error('Failed to delete message');
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
                            id="messageName"
                            required
                            name="messageName"
                            value={searchFilter}
                            onChange={handleFilterChange}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="messageName"
                        >
                            Message name
                        </label>
                    </div>
                </div>
            </div>

            <div className="wrap-account-order">
                <table>
                    <thead>
                        <tr>
                            <th className="fw-6">Name</th>
                            <th className="fw-6">Email</th>
                            <th className="fw-6">Content</th>
                            <th className="fw-6">Sent At</th>
                            <th className="fw-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr> : messages.length > 0 ? (
                                messages.map((message, index) => (
                                    <tr className="tf-order-item" key={index}>
                                        <td>{message.name}</td>
                                        <td>{message.email}</td>
                                        <td>{message.content.length > 20 ? message.content.slice(0, 20) + "..." : message.content}</td>
                                        <td>{new Date(message.createdAt).toLocaleDateString("en-US", options)}</td>
                                        <td>

                                            <a
                                                href={`/admin/message-box/${message.id}`}
                                                className="tf-btn btn-fill btn-color-1 animate-hover-btn rounded-0 justify-content-center"
                                                style={{ marginLeft: "5px" }}
                                            >
                                                <span>View</span>
                                            </a>
                                            <button
                                                onClick={() => handleRemove(message.id)}
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
                                    <td colSpan={3}>No messages found</td>
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
    )
}

export default MessageBox