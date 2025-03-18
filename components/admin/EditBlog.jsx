"use client"

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { globalConfig } from "@/data/globalConfig";
import Select from 'react-dropdown-select';
import DropzoneSingleUpload from './DropzoneSingleUpload';
import SaveChangesButton from '../common/SaveChangesButton';


const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });

function EditBlog({ id }) {
    const [errors, setErrors] = useState({
        title: null,
    });

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');
    const [src, setSrc] = useState(null);
    const [formHandled, setFormHandled] = useState(false);

    const [loading, setLoading] = useState(false);

    const [alertify, setAlertify] = useState(null);
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
        if (file) {
            formData.append('file', file.file);
        }
        tags.forEach(tag => formData.append('tags', tag.value));

        setLoading(true);
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            alertify.success(data.message || 'Blog edited successfully');
            refresh(data.blog.title, data.blog.content, data.blog.src, data.blog.tags.map(tag => {
                return { label: tag.name, value: tag.name }
            }));
        } catch (error) {
            alertify.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {
            title: title.trim() ? null : "Title is required",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === null);
    };

    useEffect(() => {
        if (formHandled) {
            validateForm();
        }
    }, [title, file]);

    const fetchBlog = useCallback(async () => {
        const response = await fetch(`/api/blogs/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            alertify.error(`Failed to fetch: ${errorData.error || "Unknown error"}`)
            return;
        }

        const data = await response.json();

        setTitle(data.blog.title);
        setSrc(globalConfig.domain + data.blog.src);
        setContent(data.blog.content);
        setTags(data.blog.tags.map(tag => {
            return { label: tag.name, value: tag.name }
        }));

    }, [id]);

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    const refresh = (title, content, src, tags) => {
        setTitle(title);
        setContent(content);
        setTags(tags);
        setSrc(globalConfig.domain + src);
        setFile(null);
        setFormHandled(false);
    }

    return (
        <div className="my-account-content account-edit">
            <div>
                <form onSubmit={handleSubmit} id="form-password-change">
                    <h6 className="mb_20">Blog Info</h6>

                    <div className="mb_15">
                        <DropzoneSingleUpload file={file} setFile={setFile} src={src} setSrc={setSrc} />
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
                        <SaveChangesButton loading={loading} />

                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBlog;
