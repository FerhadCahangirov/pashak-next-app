"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to log in.");
            }

            router.push("/admin");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="flat-spacing-10">
            <div className="container">
                <div className="form-register-wrap">
                    <div className="flat-title align-items-start gap-0 mb_30 px-0">
                        <h5 className="mb_18">Login</h5>
                        <p className="text_black-2">
                            Sign up for early Sale access plus tailored new arrivals, trends
                            and promotions. To opt out, click unsubscribe in our emails.
                        </p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="" id="login-form">
                            <div className="tf-field style-1 mb_15">
                                <input
                                    className="tf-field-input tf-input"
                                    placeholder=" "
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    id="property3"
                                    name="email"
                                    required
                                />
                                <label
                                    className="tf-field-label fw-4 text_black-2"
                                    htmlFor="property3"
                                >
                                    Email *
                                </label>
                            </div>
                            <div className="tf-field style-1 mb_30">
                                <input
                                    className="tf-field-input tf-input"
                                    placeholder=" "
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="property4"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                />
                                <label
                                    className="tf-field-label fw-4 text_black-2"
                                    htmlFor="property4"
                                >
                                    Password *
                                </label>
                            </div>
                            {error && <p className="error-message text-danger">{error}</p>}
                            <div className="mb_20">
                                <a href="#recover" className="tf-btn btn-line">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
