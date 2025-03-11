"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import DropzoneUpload from "./DropzoneUpload";
import alertify from "alertifyjs"
import Image from "next/image";
import { globalConfig } from "@/data/globalConfig";

export default function ProductUploads({ id }) {
    const [files, setFiles] = useState([]);
    const [productImages, setProductImages] = useState([]);

    const fetchProductImages = useCallback(async () => {
        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }
            const data = await response.json();
            setProductImages(data.product.images);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }, []);

    useEffect(() => {
        fetchProductImages();
    }, [fetchProductImages]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            try {
                const formData = new FormData();

                // Append files
                files.forEach((file) => {
                    formData.append("files", file.file);
                });

                // Send POST request
                const response = await fetch(`/api/products/uploadFiles/${id}`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to upload product images");
                }

                const data = await response.json();
                alertify.success("Images uploaded successfully!");
                clearFormState();
                fetchProductImages();
            } catch (error) {
                console.error("Error uploading product images:", error);
                alertify.error(error.message || "Failed to upload product images. Please try again.");
            }
        },
        [files] // Memoize the function to prevent re-creating it on every render
    );

    // Method to clear the form state
    const clearFormState = useCallback(() => {
        setFiles([]);
    }, []);

    const removeFile = async (id) => {
        try {
            // Send POST request
            const response = await fetch(`/api/products/removeFile/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete product image");
            }

            alertify.success("Image deleted successfully!");
            fetchProductImages();
        } catch (error) {
            console.error("Error deleting product image:", error);
            alertify.error(error.message || "Failed to delete product image. Please try again.");
        }
    }

    return (
        <div className="my-account-content account-edit">
            <div className="mb_15">
                <form onSubmit={handleSubmit} id="product-upload-form">
                    <h6 className="mb_20">Product Info</h6>

                    <div className="mb_15">
                        <DropzoneUpload files={files} setFiles={setFiles} />
                    </div>

                    <div className="mb_20">
                        <button
                            type="submit"
                            className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div>
                {productImages.length > 0 ? productImages.map((file, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            position: "relative"
                        }}
                    >
                        <Image
                            src={globalConfig.domain + file.src}
                            alt="Product Image"
                            style={{ width: "78px", height: "42px", objectFit: "cover" }}
                            width={78}
                            height={42}
                        />
                        <p>{file.src.split('/')[file.src.split('/').length - 1]}</p>
                        <button
                            className="tf-btn btn-fill btn-color-6 animate-hover-btn rounded-0 justify-content-center"
                            style={{ marginLeft: "5px" }}
                            type="button"
                            onClick={() => removeFile(file.id)} // Remove the file on button click
                        >
                            <span>Remove</span>
                        </button>

                        <div
                            style={{
                                height: "2px",
                                width: `${file.progress}%`,
                                backgroundColor: "#000",
                                borderRadius: "5px",
                                transition: "width 1.2s ease-in-out",
                                position: "absolute",
                                left: 0,
                                bottom: 0
                            }}
                        ></div>
                    </div>
                )) : (
                    <div>No product images found!</div>
                )}
            </div>
        </div>
    );
}
