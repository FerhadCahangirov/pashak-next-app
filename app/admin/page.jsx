import DashboardNav from "@/components/admin/DashboardNav";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: "Admin Panel || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Dashboard</div>
                </div>
            </div>
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <DashboardNav />
                        </div>
                        <div className="col-lg-9">
                            <div className="my-account-content account-dashboard">
                                <div className="mb_60">
                                    <h5 className="fw-5 mb_20">Hello PashaK</h5>
                                    <p>
                                        From your account dashboard, you can{" "}
                                        <Link className="text_primary" href={`/admin/products`}>
                                            manage medicines
                                        </Link>
                                        , organize{" "}
                                        <Link className="text_primary" href={`/admin/categories`}>
                                            categories
                                        </Link>
                                        , and update{" "}
                                        <Link className="text_primary" href={`/admin/blogs`}>
                                            blog content
                                        </Link>
                                        . You can also{" "}
                                        <Link className="text_primary" href={`/admin/settings`}>
                                            modify account settings
                                        </Link>
                                        , including password and personal details.
                                    </p>
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
