import React from "react";
import Footer from "@/components/home/Footer";
import HeaderV3 from "@/components/headers/HeaderV3";
import HeaderV2 from "@/components/headers/HeaderV2";
import Header from "@/components/headers/Header";

export const metadata = {
    title: "Our Story || PashaK -  Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};

export default function page() {
    return (
        <>
            <Header />
            <section className="flat-spacing-12">
                <div className="container">
                    <div className="tf-timeline-wrap position-relative">
                        <div className="tf-timeline-line" />
                        <div className="tf-timeline-item z-2 position-relative">
                            <div className="tf-timeline-inner d-flex align-items-center justify-content-between tf-timeline-content-end">
                                <span className="tf-timeline-time">1996</span>
                                <div className="tf-timeline-content">
                                    <div className="tf-timeline-label fw-7">PHASE 1</div>
                                    <h4 className="tf-timeline-title">
                                        The Establishment Of Pasha-K
                                    </h4>
                                    <div className="tf-timeline-description">
                                        The company “Pasha-K” was established as a legal entity on February 8, 1996, and was registered with the Ministry of Justice. The company has been engaged in the wholesale and retail sale of pharmaceutical products for 29 years.
                                    </div>
                                </div>
                                <div className="tf-timeline-image">
                                    <img
                                        alt="image"
                                        src="/images/collections/IMG_0875.JPG"
                                        width={800}
                                        height={593}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tf-timeline-item z-2 position-relative">
                            <div className="tf-timeline-inner d-flex align-items-center justify-content-between">
                                <span className="tf-timeline-time">2015</span>
                                <div className="tf-timeline-content">
                                    <div className="tf-timeline-label fw-7">PHASE 2</div>
                                    <h4 className="tf-timeline-title">
                                        Operations and Licensing of “Pasha-K” Company
                                    </h4>
                                    <div className="tf-timeline-description">
                                        The company obtained license number 086503 from the Ministry of Health on October 20, 2015, for the purpose of wholesale distribution of pharmaceutical and medical products.
                                        “Pasha-K” currently operates 21 pharmacies across Azerbaijan.
                                        At the same time, the company collaborates with other firms and companies operating within the country that are engaged in the wholesale and retail sale of pharmaceutical products.
                                    </div>
                                </div>
                                <div className="tf-timeline-image">
                                    <img
                                        alt="image"
                                        src="/images/collections/IMG_0929.JPG"
                                        width={800}
                                        height={593}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
