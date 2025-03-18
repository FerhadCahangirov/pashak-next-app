"use client";

import React, { useEffect, useState } from "react";
import DropzoneSingleUpload from "./DropzoneSingleUpload";
import { globalConfig } from "@/data/globalConfig";
import alertify from 'alertifyjs';
import SaveChangesButton from "../common/SaveChangesButton";

export default function EditCategory({ id }) {

    const [errors, setErrors] = useState({
        name: null,
    });

    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [src, setSrc] = useState(null);
    const [formHandled, setFormHandled] = useState(false);

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {
            name: name.trim() ? null : "Category name is required",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if (formHandled) {
            validateForm();
        }
    }, [name]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormHandled(true);

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("name", name);

        if (file) {
            formData.append("file", file.file);
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alertify.error(`Failed to updating: ${errorData.error || "Unknown error"}`)
                return;
            }

            const result = await response.json();
            initializeData();
            fetchCategory();
            setFormHandled(false);
            alertify.success("Category updated successfully!");
        } catch (error) {
            console.error("Error updating category:", error);
            alertify.error("An error occurred while updating the category.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategory = async () => {
        const response = await fetch(`/api/categories/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            alertify.error(`Failed to fetch: ${errorData.error || "Unknown error"}`)
            return;
        }

        const data = await response.json();

        setName(data.category.name);
        setSrc(globalConfig.domain + data.category.src);
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    const initializeData = () => {
        setFile(null);
        setName("");
    }

    return (
        <div className="my-account-content account-edit">
            <div className="">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    id="form-edit-category"
                >
                    <h6 className="mb_20">Category Info</h6>

                    <div className="mb_15">
                        <DropzoneSingleUpload file={file} setFile={setFile} src={src} />
                    </div>

                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                    </div>
                    {errors.name && <p style={{ color: "red", marginTop: "-10px" }}>{errors.name}</p>}

                    <div className="mb_20 mt_20">
                        <SaveChangesButton loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
}
