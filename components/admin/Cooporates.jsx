"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { globalConfig } from "@/data/globalConfig";
import Image from "next/image";

export default function Cooporates() {
    const [cooporates, setCooporates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const fetchCooporates = useCallback(async () => {
        try {
            const response = await fetch(
                `/api/cooporates/getAll?name=${nameFilter}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch cooporates");
            }

            const data = await response.json();
            setCooporates(data.cooporates);
        } catch (error) {
            console.error("Error fetching cooporates:", error);
            alertify.error("An error occurred while fetching cooporates.");
        } finally {
            setLoading(false);
        }
    }, [nameFilter]);

    useEffect(() => {
        fetchCooporates();
    }, [fetchCooporates]);

    const handleRemove = (id) => {
        alertify.confirm('Confirm', 'Are you sure to delete cooporate.',
            async function () {
                try {

                    var response = await fetch(`/api/cooporates/${id}`, { method: "DELETE" });

                    if (!response.ok)
                        throw new Error("Failed to delete cooporate");

                    alertify.success(response.message || "Cooporate deleted successfully");
                    fetchCooporates();
                } catch (error) {
                    console.error(error);
                    alertify.error('Failed to delete cooporate');
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
                            id="cooporateName"
                            required
                            name="cooporateName"
                            value={nameFilter}
                            onChange={(event) => setNameFilter(event.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="cooporateName"
                        >
                            Cooporate name
                        </label>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex">
                        <Link
                            href={`/admin/cooporates/add`}
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
                            <th className="fw-6">Cooporate</th>
                            <th className="fw-6">Name</th>
                            <th className="fw-6">Type</th>
                            <th className="fw-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr>
                            <td colSpan={3}>Loading...</td>
                        </tr> : cooporates.length > 0 ? (
                            cooporates.map((cooporate, index) => (
                                <tr className="tf-order-item" key={index}>
                                    <td>
                                        <Image
                                            className="lazyload img-product"
                                            src={globalConfig.domain + cooporate.src}
                                            alt="image-product"
                                            width={78}
                                            height={42}
                                        />
                                    </td>
                                    <td>{cooporate.name}</td>
                                    <td className="fw-8">{cooporate.type}</td>
                                    <td>
                                        <Link
                                            href={`/admin/cooporates/edit/${cooporate.id}`}
                                            className="tf-btn btn-fill btn-color-5 animate-hover-btn rounded-0 justify-content-center"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                        <Link
                                            href="javascript:void(0);"
                                            onClick={() => handleRemove(cooporate.id)}
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
                                <td colSpan={3}>No cooporates found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
