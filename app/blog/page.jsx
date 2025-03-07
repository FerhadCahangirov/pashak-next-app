import React from "react";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import BlogGrid from "@/components/blog/BlogGrid";
import HeaderV3 from "@/components/headers/HeaderV3";

export const metadata = {
  title: "Blogs and News || PashaK - Best Pharmaceutical Wholesale Company",
  description: "PashaK - Best Pharmaceutical Wholesale Company",
};
export default function page() {
  return (
    <>
      <HeaderV3/>
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Blogs</div>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Blogs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BlogGrid />
      <Footer />
    </>
  );
}
