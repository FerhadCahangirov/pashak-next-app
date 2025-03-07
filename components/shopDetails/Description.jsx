import React from "react";

export default function Description({ content }) {
    return (
        <section className="flat-spacing-10">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-column gap-20">
                            <div>
                                <div className="lg_fs_18 fw-6 line py_15">Additional Information</div>
                                <div className="py_20 lg_py_30">
                                    <div
                                    style={{
                                        display: 'grid',
                                        gap: "10px"
                                    }}
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
