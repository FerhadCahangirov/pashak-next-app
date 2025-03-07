"use client";

import React, { useState, useEffect } from "react";
import DropzoneSingleUpload from "./DropzoneSingleUpload";

export default function AddCategory() {
    const [errors, setErrors] = useState({
        name: null,
        file: null,
    });

    const [file, setFile] = useState(null);
    const [name, setName] = useState("");

    const [alertify, setAlertify] = useState(null);

    const [formHandled, setFormHandled] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const validateForm = () => {
        const newErrors = {
            name: name.trim() ? null : "Category name is required",
            file: file ? null : "File is required",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if(formHandled)
        {
            validateForm();
        }
    }, [name, file]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormHandled(true);

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file.file);

        try {
            const response = await fetch("/api/categories", {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alertify.error(`Failed to upload: ${errorData.error || "Unknown error"}`)
                return;
            }

            const result = await response.json();
            initializeData();
            alertify.success("Category added successfully!");
        } catch (error) {
            console.error("Error uploading category:", error);
            alertify.error("An error occurred while uploading the category.");
        }
    };

    const initializeData = () => {
        setFile(null);
        setName("");
        setFormHandled(false);
    }

    return (
        <div className="my-account-content account-edit">
            <div className="">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    id="form-add-category"
                >
                    <h6 className="mb_20">Category Info</h6>

                    <div className="mb_15">
                        <DropzoneSingleUpload file={file} setFile={setFile} />
                        {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}
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
                            htmlFor="property1"
                        >
                            Name
                        </label>
                    </div>
                    {errors.name && <p style={{ color: "red", marginTop: "-10px" }}>{errors.name}</p>}


                    <div className="mb_20 mt_20">
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
