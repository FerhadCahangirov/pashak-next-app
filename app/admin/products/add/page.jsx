import AddProduct from "@/components/admin/AddProduct";
import DashboardNav from "@/components/admin/DashboardNav";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import React from "react";

export const metadata = {
    title: "Add Product || PashaK - The Best Pharmasy Company",
    description: "PashaK - The Best Pharmasy Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center"> Add Product</div>
                </div>
            </div>
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <DashboardNav />
                        </div>
                        <div className="col-lg-9">
                            <AddProduct />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
