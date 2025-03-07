import Link from "next/link";
import React from "react";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import BlogDetailsContainer from "@/components/blog/BlogDetailsContainer";

export const metadata = {
    title: "Blog Details || PashaK - Best Pharmaceutical Wholesale Company",
    description: "PashaK - Best Pharmaceutical Wholesale Company",
};
export default function page({ params }) {
    return (
        <>
            <HeaderV3 />
            <BlogDetailsContainer id={params.id}/>
            <Footer />
        </>
    );
}
