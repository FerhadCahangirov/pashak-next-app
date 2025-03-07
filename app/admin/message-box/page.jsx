import DashboardNav from "@/components/admin/DashboardNav";
import MessageBox from "@/components/admin/MessageBox";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import React from "react";

export const metadata = {
    title: "Message Box || PashaK - The Best Pharmasy Company",
    description: "PashaK - The Best Pharmasy Company",
};

export default function page() {
    return (
        <>
            <HeaderV3 />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Message Box</div>
                </div>
            </div>
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <DashboardNav />
                        </div>
                        <div className="col-lg-9">
                            <MessageBox />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
