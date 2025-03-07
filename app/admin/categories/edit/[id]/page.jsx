import DashboardNav from "@/components/admin/DashboardNav";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import React from "react";
import EditCategory from "@/components/admin/EditCategory";

export const metadata = {
  title: "Edit Category || PashaK - The Best Pharmasy Company",
  description: "PashaK - The Best Pharmasy Company",
};

export default function page({ params }) {
  return (
    <>
      <HeaderV3 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center"> Edit Category</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <EditCategory id={params.id} />
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}
