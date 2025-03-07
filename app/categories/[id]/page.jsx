import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";

export const metadata = {
    title: "Medicines || PashaK -  Best Pharmaceutical Wholesale Company",
    description: "PashaK -  Best Pharmaceutical Wholesale Company",
};

export default function page({ params }) {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Categories</div>
                    <p className="text-center text-2 text_black-2 mt_5">
                        Explore our latest healthcare supplies.
                    </p>
                </div>
            </div>
            <ShopDefault categoryId={params.id} />
            <Footer />
        </>
    );
}