import React from "react";
import Image from "next/image";
export default function About() {
    return (
        <>
            <section className="flat-spacing-23 flat-image-text-section">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 tf-img-with-text style-4">
                        <div className="tf-image-wrap">
                            <img
                                className="lazyload w-100"
                                alt="collection-img"
                                src="/images/collections/IMG_0884.jpg"
                                width={600}
                                height={499}
                            />
                        </div>
                        <div className="tf-content-wrap px-0 d-flex justify-content-center w-100">
                            <div>
                                <div className="heading">Established - 1996</div> 
                                <div className="text">
                                    The “Paşa-K” company was established as a legal entity on February 8, 1996, <br className="d-xl-block d-none" />
                                    and was officially registered with the Ministry of Justice. For 20 years, <br className="d-xl-block d-none" />
                                    the company has been engaged in the wholesale and retail trade of pharmaceutical <br className="d-xl-block d-none" />
                                    products. <br className="d-xl-block d-none" />

                                    To facilitate the wholesale distribution of pharmaceutical preparations and <br className="d-xl-block d-none" />
                                    other medical products, the company obtained License No. 086503 from the <br className="d-xl-block d-none" />
                                    Ministry of Health on October 20, 2015. Based on this license, “Paşa-K” conducts <br className="d-xl-block d-none" />
                                    retail sales in the cities of Baku, Sumgayit, Mingachevir, Khirdalan, Lankaran, <br className="d-xl-block d-none" />
                                    Masalli, Jalilabad, Bilasuvar, Gabala, and Astara.

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flat-spacing-15">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 tf-img-with-text style-4">
                        <div className="tf-content-wrap px-0 d-flex justify-content-center w-100">
                            <div>
                                <div className="heading">Our mission</div>
                                <div className="text">
                                    The main goal of "Paşa-K" is to provide essential, high-quality medicines to institutions <br className="d-xl-block d-none" />
                                    within the healthcare system of our country and citizens, while earning customer <br className="d-xl-block d-none" />
                                    satisfaction through exemplary service. The company's valuable asset is its diligent staff, <br className="d-xl-block d-none" />
                                    who spare no effort, knowledge, and skill in achieving this goal.

                                </div>
                            </div>
                        </div>
                        <div className="grid-img-group">
                            <div className="tf-image-wrap box-img item-1">
                                <div className="img-style">
                                    <img
                                        className="lazyload"
                                        src="/images/collections/IMG_0894.jpg"
                                        data-=""
                                        alt="img-slider"
                                        width={337}
                                        height={388}
                                    />
                                </div>
                            </div>
                            <div className="tf-image-wrap box-img item-2">
                                <div className="img-style">
                                    <img
                                        className="lazyload"
                                        src="/images/collections/IMG_0916.jpg"
                                        data-=""
                                        alt="img-slider"
                                        width={400}
                                        height={438}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
