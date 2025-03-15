"use client"

import React, { useCallback, useEffect, useState } from 'react'

function ChangeEmail() {

    const [email, setEmail] = useState("");

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const fetchEmail = useCallback(async () => {
        try {
            const response = await fetch(
                `/api/account`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch email");
            }

            const data = await response.json();
            setEmail(data.email);
        } catch (error) {
            console.error("Error fetching email:", error);
            alertify.error("An error occurred while fetching email.");
        }
    }, []);

    useEffect(() => {
        fetchEmail();
    }, [fetchEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/account/changeEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Failed to change email.");
            }

            alertify.success(data.message || "Acccount email changed successfully");
            setEmail(data.email);
        } catch (err) {
            console.error(err);
            alertify.error("Failed to change account email.");
        }
    };

    return (
        <>
            <h6 className="mb_20">Change Email</h6>

            <form
                onSubmit={handleSubmit}
                id="form-change-email"
            >
                <div className="tf-field style-1 mb_15">
                    <input
                        className="tf-field-input tf-input"
                        placeholder=" "
                        type='email'
                        id="email"
                        required
                        name="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <label
                        className="tf-field-label fw-4 text_black-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                </div>

                <div className="mb_40 mt_20">
                    <button
                        type="submit"
                        className="tf-btn w-20 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                        Save Changes
                    </button>
                </div>

            </form></>
    )
}

export default ChangeEmail