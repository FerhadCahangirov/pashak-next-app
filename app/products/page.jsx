import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import FilterSidebar from "@/components/shop/FilterSidebar";
import React from "react";

export const metadata = {
    title: "Medicines || PashaK - Best Pharmaceutical Company",
    description: "PashaK - Best Pharmaceutical Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Medicines</div>
                    <p className="text-center text-2 text_black-2 mt_5">
                        Explore our newest range of medicines
                    </p>
                </div>
            </div>
            <FilterSidebar />

            <Footer />
        </>
    );
}
