import About from "@/components/about/About";
import Features from "@/components/about/Features";
import FlatTitle from "@/components/about/FlatTitle";
import Hero from "@/components/about/Hero";
import HeaderV2 from "@/components/headers/HeaderV2";
import Footer from "@/components/home/Footer";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";
import React from "react";

export const metadata = {
    title: "About Us || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};

export default function page() {
    return (
        <>
            <HeaderV2 />
            <Hero />
            <FlatTitle />
            <div className="container">
                <div className="line"></div>
            </div>
            <About />
            <Features />
            <div className="container">
                <div className="line"></div>
            </div>
            <Footer />
        </>
    );
}
