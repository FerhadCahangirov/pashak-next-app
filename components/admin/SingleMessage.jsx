"use client"
import React, { useCallback, useEffect, useState } from 'react'

function SingleMessage({ id }) {

    const [message, setMessage] = useState(null);

    const fetchMessage = useCallback(async () => {
        const response = await fetch(`/api/messages/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            alertify.error(`Failed to fetch: ${errorData.error || "Unknown error"}`)
            return;
        }

        const data = await response.json();
        setMessage(data.message);
    }, [id]);

    useEffect(() => {
        fetchMessage();
    }, [fetchMessage])

    return !message ? <div>Loading...</div> : (
        <div className="wd-form-order">
            <div className="tf-grid-layout md-col-2 gap-15">
                <div className="item">
                    <div className="text-2 text_black-2">Name</div>
                    <div className="text-2 mt_4 fw-6">{message.name}</div>
                </div>
                <div className="item">
                    <div className="text-2 text_black-2">Email</div>
                    <div className="text-2 mt_4 fw-6">{message.email}</div>
                </div>
                <div className="item">
                    <div className="text-2 text_black-2">Sent At</div>
                    <div className="text-2 mt_4 fw-6">{new Date(message.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }).replace(',', ' - ')}</div>
                </div>

            </div>
            <div className="widget-tabs style-has-border widget-order-tab">
                <div className="widget-content-tab">
                    <div className="widget-content-inner active">
                        <p>
                            {message.content}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SingleMessage