"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import dynamic from 'next/dynamic'
const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false })
import Select from "react-dropdown-select"
import SaveChangesButton from "../common/SaveChangesButton";

export default function EditProduct({ id }) {
    const [errors, setErrors] = useState({
        description: null,
        category: null,
        productName: null,
        compositions: null
    });

    const [alertify, setAlertify] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [productName, setProductName] = useState("");
    const [compositions, setCompositions] = useState([]);
    const [description, setDescription] = useState("");
    const [formHandled, setFormHandled] = useState(false);

    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);

    const memoizedCategories = useMemo(() => categories, [categories]);
    const memoizedOptions = useMemo(() => options, [options]);

    const [loading, setLoading] = useState(false);

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

        fetchData(`/api/products/${id}`,
            (data) => {
                setProductName(data.product.name);
                setCategoryId(Number(data.product.category.id));
                setContent(data.product.content);
                setCompositions(data.product.compositions.map(({ name }) => ({ label: name, value: name })));
                setDescription(data.product.description);
            },
            (error) => console.error("Compositions fetch failed", error)
        );

        return () => controller.abort();
    }, []);

    const validateForm = () => {
        const newErrors = {
            productName: productName.trim() ? null : "Product name is required",
            description: description.trim() ? null : "Description is required",
            category: categoryId ? null : "Category is required",
            compositions: compositions.length > 0 ? null : "At least one composition is required"
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if (formHandled) {
            validateForm();
        }
    }, [categoryId, productName, compositions, description]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setFormHandled(true);

            if (!validateForm()) return;

            setLoading(true);
            try {
                const formData = new FormData();

                formData.append("name", productName);
                formData.append("content", content);
                formData.append("categoryId", categoryId);
                formData.append("description", description);
                compositions.forEach((composition) => formData.append("compositions", composition.value));

                // Send POST request
                const response = await fetch(`/api/products/${id}`, {
                    method: "PUT",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to submit product");
                }

                const data = await response.json();
                alertify.success("Product submitted successfully!");
                clearFormState(
                    data.product.name,
                    data.product.category.id,
                    data.product.content,
                    data.product.compositions,
                    data.product.description
                );
                console.log("Product submitted successfully:", data);
            } catch (error) {
                console.error("Error submitting product:", error);
                alertify.error(error.message || "Failed to submit the product. Please try again.");
            } finally {
                setLoading(false);
            }
        },
        [content, categoryId, productName, description, compositions] // Memoize the function to prevent re-creating it on every render
    );

    // Method to clear the form state
    const clearFormState = useCallback(
        (name, categoryId, content, compositions, description) => {
            setProductName(name);
            setContent(content);
            setCategoryId(Number(categoryId));
            setDescription(description);
            setCompositions(compositions.map(({ name }) => ({ label: name, value: name })));
            setFormHandled(false);
        }, []);

    return (
        <div className="my-account-content account-edit">
            <div>
                <form onSubmit={handleSubmit} id="product-edit-form">
                    <h6 className="mb_20">Product Info</h6>

                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            type="text"
                            placeholder=""
                            id="productName"
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
                        <SaveChangesButton loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
}
