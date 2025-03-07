import React from "react";
import Image from "next/image";
export default function Location() {
  return (
    <section className="mb_20">
      <div className="container">
        <div className="flat-location">
          <div className="banner-map">
            <Image
              className="lazyload"
              data-src="/images/country/map-1.jpg"
              alt="map"
              src="/images/country/map-1.jpg"
              width={1600}
              height={747}
            />
          </div>
          <div className="content">
            <h3 className="heading wow fadeInUp" data-wow-delay="0s">
              Pashak
            </h3>
            <p className="subtext wow fadeInUp" data-wow-delay="0s">
            Bakı, Azərbaycan, Xətayi rayonu, Zığ Şosesi, Əbilov qəsəbəsi
              <br />
              office@pasha-k.az
              <br />
              (+994 12) 571-00-00
            </p>
            <p className="subtext wow fadeInUp" data-wow-delay="0s">
              Mon - Fri, 8:30am - 10:30pm
              <br />
              Saturday, 8:30am - 10:30pm
              <br />
              Sunday Closed
            </p>
            <a
              href="https://www.google.com/maps/place//@40.3547836,49.951177,15.25z/data=!4m6!1m5!3m4!2zNDDCsDIxJzE3LjUiTiA0OcKwNTcnMTQuNSJF!8m2!3d40.3548611!4d49.9540278?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
              target="_self"
              className="tf-btn btn-line collection-other-link fw-6 wow fadeInUp"
              data-wow-delay="0s"
            >
              Get Directions
              <i className="icon icon-arrow1-top-left" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
