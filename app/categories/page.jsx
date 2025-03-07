import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import ShopCollections from "@/components/shop/ShopCollections";

import React from "react";

export const metadata = {
    title:
        "Medicine Categories || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};
export default function page() {
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
            <ShopCollections />
            <Footer />
        </>
    );
}
