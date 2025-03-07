import React from "react";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import Login from "@/components/login/Login";

export const metadata = {
    title: "Login || PashaK -  Best Pharmaceutical Wholesale Company",
    description: "PashaK -  Best Pharmaceutical Wholesale Company",
};
export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title style-2">
                <div className="container-full">
                    <div className="heading text-center">Login</div>
                </div>
            </div>

            <Login />
            <Footer />
        </>
    );
}
