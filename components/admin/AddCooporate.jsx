"use client";

import React, { useState, useEffect } from "react";
import DropzoneSingleUpload from "./DropzoneSingleUpload";
import SaveChangesButton from "../common/SaveChangesButton";

export default function AddCooporate() {
    const types = ["pharmacy", "medicalDevice"];

    const [errors, setErrors] = useState({
        name: null,
        file: null,
    });

    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [type, setType] = useState(types[0]);

    const [alertify, setAlertify] = useState(null);

    const [formHandled, setFormHandled] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const validateForm = () => {
        const newErrors = {
            name: name.trim() ? null : "Cooporate name is required",
            file: file ? null : "File is required",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if (formHandled) {
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
        formData.append("type", type);

        setLoading(true);
        try {
            const response = await fetch("/api/cooporates", {
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
            alertify.success("Cooporate added successfully!");
        } catch (error) {
            console.error("Error uploading cooporate:", error);
            alertify.error("An error occurred while uploading the cooporate.");
        } finally {
            setLoading(false);
        }
    };

    const initializeData = () => {
        setFile(null);
        setName("");
        setType(type[0]);
        setFormHandled(false);
    }

    return (
        <div className="my-account-content account-edit">
            <div className="">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    id="form-add-cooporate"
                >
                    <h6 className="mb_20">Cooporate Info</h6>

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

                    <div className="field mb_20 mt_20">
                        <p>Cooporate Type</p>
                        <select
                            className="tf-select w-100"
                            id="cooporateType"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        >
                            {
                                types.map((val) => (
                                    <option key={val} value={val}>
                                        {val}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb_20 mt_20">
                        <SaveChangesButton loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    );
}
