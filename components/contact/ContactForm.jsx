"use client";
import React, { useRef, useState } from "react";
export default function ContactForm() {
    const formRef = useRef();
    const [success, setSuccess] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    const sendMessage = async () => {
        try {
            var response = await fetch("/api/messages/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    content
                })
            });

            if (!response.ok)
                throw new Error(response.message || "Failed to send message");

            setSuccess(true);
            clearForm();
            handleShowMessage();
        }
        catch (error) {
            console.error(error);
            setSuccess(false);
            handleShowMessage();
        }
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setContent("");
    };

    return (
        <section className="bg_grey-7 flat-spacing-9">
            <div className="container">
                <div className="flat-title">
                    <span className="title">Get in Touch</span>
                    <p className="sub-title text_black-2">
                        If you’ve got great products your making or looking to work with us
                        then drop us a line.
                    </p>
                </div>
                <div>
                    <form
                        ref={formRef}
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        className="mw-705 mx-auto text-center form-contact"
                        id="contactform"
                        action="./contact/contact-process.php"
                        method="post"
                    >
                        <div className="d-flex gap-15 mb_15">
                            <fieldset className="w-100">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    placeholder="Name *"
                                />
                            </fieldset>
                            <fieldset className="w-100">
                                <input
                                    type="email"
                                    autoComplete="abc@xyz.com"
                                    name="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    placeholder="Email *"
                                />
                            </fieldset>
                        </div>
                        <div className="mb_15">
                            <textarea
                                placeholder="Message"
                                name="content"
                                id="content"
                                required
                                cols={30}
                                rows={10}
                                value={content}
                                onChange={event => setContent(event.target.value)}
                            />
                        </div>
                        <div className="send-wrap">
                            <div className={`tfSubscribeMsg ${showMessage ? "active" : ""}`}>
                                {success ? (
                                    <p style={{ color: "rgb(52, 168, 83)" }}>
                                        Message has been sent successfully.
                                    </p>
                                ) : (
                                    <p style={{ color: "red" }}>Something went wrong</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
