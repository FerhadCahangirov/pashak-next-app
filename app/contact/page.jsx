import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Header from "@/components/headers/Header";
import HeaderV2 from "@/components/headers/HeaderV2";
import HeaderV3 from "@/components/headers/HeaderV3";
import Footer from "@/components/home/Footer";
import React from "react";

export const metadata = {
  title: "Contact || PashaK -  Best Pharmaceutical Wholesale Company",
  description: "PashaK -  Best Pharmaceutical Wholesale Company",
};
export default function page() {
  return (
    <>
      <HeaderV3 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Contact Us</div>
        </div>
      </div>
      <Map/>
      <ContactForm />
      <Footer />
    </>
  );
}
