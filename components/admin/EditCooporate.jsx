"use client";

import React, { useCallback, useEffect, useState } from "react";
import DropzoneSingleUpload from "./DropzoneSingleUpload";
import { globalConfig } from "@/data/globalConfig";
import alertify from 'alertifyjs';
import SaveChangesButton from "../common/SaveChangesButton";

export default function EditCooporate({ id }) {
    const types = ["pharmacy", "medicalDevice"];

    const [errors, setErrors] = useState({
        name: null,
    });

    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [src, setSrc] = useState(null);
    const [type, setType] = useState(types[0]);
    const [formHandled, setFormHandled] = useState(false);

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {
            name: name.trim() ? null : "Cooporate name is required",
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
        formData.append("type", type);

        if (file) {
            formData.append("file", file.file);
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/cooporates/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alertify.error(`Failed to updating: ${errorData.error || "Unknown error"}`)
                return;
            }

            const data = await response.json();

            initializeData(
                data.cooporate.src,
                data.cooporate.name,
                data.cooporate.type);

            setFormHandled(false);
            alertify.success("Cooporate updated successfully!");
        } catch (error) {
            console.error("Error updating cooporate:", error);
            alertify.error("An error occurred while updating the cooporate.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCooporate = useCallback(async () => {
        const response = await fetch(`/api/cooporates/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            alertify.error(`Failed to fetch: ${errorData.error || "Unknown error"}`)
            return;
        }

        const data = await response.json();

        setName(data.name);
        setSrc(globalConfig.domain + data.src);
        setType(types.find(x => x === data.type));
    }, []);

    useEffect(() => {
        fetchCooporate();
    }, [fetchCooporate]);

    const initializeData = (src, name, type) => {
        setFile(null);
        setSrc(globalConfig.domain + src)
        setName(name);
        setType(type);
    }

    return (
        <div className="my-account-content account-edit">
            <div className="">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    id="form-edit-cooporate"
                >
                    <h6 className="mb_20">Cooporate Info</h6>

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
                            htmlFor="property1"
                        >
                            Name
                        </label>
                    </div>
                    {errors.name && <p style={{ color: "red", marginTop: "-10px" }}>{errors.name}</p>}

                    <div className="field mb_20">
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
