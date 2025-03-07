import DashboardNav from "@/components/admin/DashboardNav";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";
import React from "react";
import Blogs from "@/components/admin/Blogs";

export const metadata = {
    title: "My Account Orders || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Blogs</div>
                </div>
            </div>
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <DashboardNav />
                        </div>
                        <div className="col-lg-9">
                            <Blogs />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
