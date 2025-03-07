"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Select from 'react-dropdown-select';
import DropzoneSingleUpload from './DropzoneSingleUpload';

const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

function AddBlog() {

    const [errors, setErrors] = useState({
        title: null,
        file: null,
    });

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');

    const [alertify, setAlertify] = useState(null);

    const [formHandled, setFormHandled] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormHandled(true);

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file.file);
        tags.forEach(tag => formData.append('tags', tag.value));

        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            alertify.success('Blog added successfully');
            clear();
        } catch (error) {
            alertify.error(error.message);
        }
    };

    const validateForm = () => {
        const newErrors = {
            title: title.trim() ? null : "Title is required",
            file: file ? null : "File is required",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if (formHandled) {
            validateForm();
        }
    }, [title, file]);

    const clear = () => {
        setTitle('');
        setContent('');
        setTags([]);
        setFile(null);
        setFormHandled(false);
    }

    return (
        <div className="my-account-content account-edit">
            <div>
                <form onSubmit={handleSubmit} id="form-password-change">
                    <h6 className="mb_20">Blog Info</h6>

                    <div className="mb_15">
                        <DropzoneSingleUpload file={file} setFile={setFile} />
                        {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}
                    </div>

                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            type="text"
                            placeholder=' '
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                    </div>
                    {errors.title && <p style={{ color: "red", marginTop: "-10px" }}>{errors.title}</p>}


                    <div className="field mb_20">
                        <p>Tags</p>
                        <Select
                            options={[]}
                            multi
                            labelField="label"
                            valueField="value"
                            values={tags}
                            onChange={setTags}
                            create={true}
                        />
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

export default AddBlog;
