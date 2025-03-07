import React from "react";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import ShopDetailsContainer from "@/components/shopDetails/ShopDetailsContainer";


export const metadata = {
    title: "Medicines || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};


export default function page({ params }) {
    return (
        <>
            <HeaderV3 />
            <ShopDetailsContainer id={params.id}/>
            <Footer />
        </>
    );
}
