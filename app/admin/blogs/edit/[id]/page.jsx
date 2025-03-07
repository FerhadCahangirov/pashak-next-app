import DashboardNav from "@/components/admin/DashboardNav";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import React from "react";
import EditBlog from "@/components/admin/EditBlog";

export const metadata = {
  title: "My Account Orders || PashaK - Best Pharmaceutical Wholesale Company",
  description: "PashaK - Best Pharmaceutical Wholesale Company",
};

export default function page({ params }) {
  return (
    <>
      <HeaderV3 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center"> Edit Blog</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <EditBlog id={params.id} />
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}
