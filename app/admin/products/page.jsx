import DashboardNav from "@/components/admin/DashboardNav";
import Products from "@/components/admin/Products";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";
import React from "react";

export const metadata = {
    title: "My Account Orders || PashaK - The Best Pharmasy Company",
    description: "PashaK - The Best Pharmasy Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Products</div>
                </div>
            </div>
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <DashboardNav />
                        </div>
                        <div className="col-lg-9">
                            <Products />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
