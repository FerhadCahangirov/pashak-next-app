import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import React from "react";
import BrandsCollection from "@/components/cooporates/BrandsCollection";

export const metadata = {
    title: "Medicines || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Our Coorporates</div>
                    <p className="text-center text-2 text_black-2 mt_5">
                        Our Pharmatical and Medical devices coorporates
                    </p>
                </div>
            </div>

            <BrandsCollection/>

            <Footer />
        </>
    );
}
