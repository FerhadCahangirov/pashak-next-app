"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import DropzoneUpload from "./DropzoneUpload";
import dynamic from 'next/dynamic'
const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false })
import Select from "react-dropdown-select"

export default function AddProduct() {
    const [errors, setErrors] = useState({
        files: null,
        description: null,
        category: null,
        productName: null,
        compositions: null
    });

    // Upload Product Information Start
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [productName, setProductName] = useState("");
    const [compositions, setCompositions] = useState([]);

    // Upload Product Information End
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formHandled, setFormHandled] = useState(false);

    const memoizedCategories = useMemo(() => categories, [categories]);
    const memoizedOptions = useMemo(() => options, [options]);

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

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
            (data) => setOptions(data.compositions.map(({ name }) => ({ label: name, value: name }))),
            (error) => console.error("Compositions fetch failed", error)
        );

        return () => controller.abort();
    }, []);

    const validateForm = () => {
        const newErrors = {
            productName: productName.trim() ? null : "Product name is required",
            description: description.trim() ? null : "Description is required",
            category: categoryId ? null : "Category is required",
            files: files.length > 0 ? null : "At least one file must be uploaded",
            compositions: compositions.length > 0 ? null : "At least one composition is required"
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if(formHandled)
        {
            validateForm();
        }
    }, [files, categoryId, productName, compositions, description]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setFormHandled(true);

            if (!validateForm()) return;

            try {
                const formData = new FormData();
                formData.append("name", productName);
                formData.append("content", content);
                formData.append("categoryId", categoryId);
                formData.append("description", description);
                compositions.forEach((composition) => formData.append("compositions", composition.value));
                files.forEach((file) => formData.append("files", file.file));

                const response = await fetch("/api/products", { method: "POST", body: formData });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to submit product");
                }

                alertify.success("Product submitted successfully!");
                clearFormState();
                fetchData("/api/compositions",
                    (data) => setOptions(data.compositions.map(({ name }) => ({ label: name, value: name }))),
                    (error) => console.error("Compositions fetch failed", error)
                );
            } catch (error) {
                console.error("Error submitting product:", error);
                alertify.error(error.message || "Failed to submit the product. Please try again.");
            }
        },
        [content, files, categoryId, productName, compositions, description]
    );

    const clearFormState = useCallback(() => {
        setProductName("");
        setContent("");
        setCategoryId(null);
        setFiles([]);
        setDescription("");
        setCompositions([]);
        setFormHandled(false);
    }, []);

    return (
        <div className="my-account-content account-edit">
            <div>
                <form onSubmit={handleSubmit} id="form-password-change">
                    <h6 className="mb_20">Product Info</h6>

                    <div className="mb_15">
                        <DropzoneUpload files={files} setFiles={setFiles} />
                        {errors.files && <p style={{ color: "red" }}>{errors.files}</p>}
                    </div>

                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            type="text"
                            id="productName"
                            placeholder=""
                            value={productName}
                            onChange={(event) => setProductName(event.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="productName"
                        >
                            Name
                        </label>
                        {errors.productName && <p style={{ color: "red" }}>{errors.productName}</p>}

                    </div>

                    <div className="tf-field style-1 mb_15">
                        <textarea
                            className="tf-field-input tf-input"
                            type="text"
                            id="productDesc"
                            wrap='hard'
                            style={{ height: '140px' }}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="productDesc"
                        >
                            Description
                        </label>
                        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
                    </div>

                    <div className="field mb_20">
                        <p>Composition</p>
                        <Select
                            name="select"
                            options={memoizedOptions}
                            multi
                            labelField="label"
                            valueField="value"
                            values={compositions}
                            onChange={value => setCompositions(value)}
                            create={true}
                        />
                        {errors.compositions && <p style={{ color: "red" }}>{errors.compositions}</p>}

                    </div>

                    <div className="field mb_20">
                        <p>Category</p>
                        <select
                            className="tf-select w-100"
                            id="productCategory"
                            value={categoryId || ""}
                            onChange={(event) => setCategoryId(Number(event.target.value))}
                        >
                            <option value="" disabled>
                                Not selected
                            </option>
                            {
                                memoizedCategories && memoizedCategories.length > 0 && memoizedCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                    </div>

                    <div className="mb_40">
                        <TextEditor html={content} setHtml={setContent} />
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
        </div>
    );
}
