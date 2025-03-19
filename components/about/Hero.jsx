import React from "react";

export default function Hero() {
    return (
        <section
            className="tf-slideshow about-us-page position-relative"
        >
            <div
                className="banner-wrapper"
                style={{
                    backgroundImage: "url('/images/collections/IMG_0868.JPG')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    width: "100%",
                    height: "0",
                    paddingBottom: "63%", // Maintains the aspect ratio (1262 / 2000 * 100)
                }}
            >
                <div
                    style={{
                        backgroundColor: "rgba(0, 0, 0, .3)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                    }}
                ></div>
                <div className="box-content text-center" style={{zIndex: 2}} >
                    <div className="container">
                        <div className="text text-white">
                            The best pharmasy <br className="d-xl-block d-none" />
                            company offers the best quality
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
