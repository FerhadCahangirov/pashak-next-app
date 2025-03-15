"use client"

import React, { useEffect, useState } from 'react'

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [passwordError, setPasswordError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('alertifyjs').then((mod) => {
                setAlertify(mod.default);
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setPasswordError("password is required");
            return;
        }
        else {
            setPasswordError(null);
        }

        if (!passwordConfirm) {
            setPasswordConfirmError("password confirm is required");
            return;
        }
        else if (password !== passwordConfirm) {
            setPasswordConfirmError("password confirm does not match with password");
            return;
        }
        else {
            setPasswordConfirmError(null);
        }

        try {
            const response = await fetch("/api/account/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Failed to reset password.");
            }

            alertify.success(data.message || "Acccount password reset successfully");
            setPasswordError(null);
            setPasswordConfirmError(null);
        } catch (err) {
            console.error(err);
            alertify.error("Failed to reset account password.");
        }
    }

    return (
        <>
            <h6 className="mb_20">Reset Passord</h6>

            <form
                onSubmit={handleSubmit}
                id="form-reset-password"
            >
                <div className="tf-field style-1 mb_30">
                    <input
                        className="tf-field-input tf-input"
                        placeholder=" "
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                    />
                    <label
                        className="tf-field-label fw-4 text_black-2"
                        htmlFor="password"
                    >
                        Password *
                    </label>
                </div>
                {passwordError && <p className="error-message text-danger" style={{ marginTop: "-25px", marginBottom: "30px" }}>{passwordError}</p>}


                <div className="tf-field style-1 mb_30">
                    <input
                        className="tf-field-input tf-input"
                        placeholder=" "
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        id="passwordConfirm"
                        name="passwordConfirm"
                    />
                    <label
                        className="tf-field-label fw-4 text_black-2"
                        htmlFor="passwordConfirm"
                    >
                        Password Confirm*
                    </label>
                </div>

                {passwordConfirmError && <p className="error-message text-danger" style={{ marginTop: "-25px", marginBottom: "30px" }}>{passwordConfirmError}</p>}


                <div className="mb_20 mt_20">
                    <button
                        type="submit"
                        className="tf-btn w-20 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                        Reset
                    </button>
                </div>

            </form>
        </>
    )
}

export default ResetPassword