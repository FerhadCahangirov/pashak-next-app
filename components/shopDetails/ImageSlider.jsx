"use client";
import Drift from "drift-zoom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageSlider({
    currentImage,
    handleImage = () => { },
    images
}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        const slideIndex = images.indexOf(currentImage);
        if (swiperRef.current && slideIndex >= 0) {
            swiperRef.current.slideTo(slideIndex);
        }
    }, [currentImage]);

    useEffect(() => {
        // Function to initialize Drift
        const imageZoom = () => {
            const driftAll = document.querySelectorAll(".tf-image-zoom");
            const pane = document.querySelector(".tf-zoom-main");

            driftAll.forEach((el) => {
                new Drift(el, {
                    zoomFactor: 2,
                    paneContainer: pane,
                    inlinePane: false,
                    handleTouch: false,
                    hoverBoundingBox: true,
                    containInline: true,
                });
            });
        };

        imageZoom();
        const zoomElements = document.querySelectorAll(".tf-image-zoom");

        const handleMouseOver = (event) => {
            const parent = event.target.closest(".section-image-zoom");
            if (parent) {
                parent.classList.add("zoom-active");
            }
        };

        const handleMouseLeave = (event) => {
            const parent = event.target.closest(".section-image-zoom");
            if (parent) {
                parent.classList.remove("zoom-active");
            }
        };

        zoomElements.forEach((element) => {
            element.addEventListener("mouseover", handleMouseOver);
            element.addEventListener("mouseleave", handleMouseLeave);
        });

        // Cleanup event listeners on component unmount
        return () => {
            zoomElements.forEach((element) => {
                element.removeEventListener("mouseover", handleMouseOver);
                element.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <>
            <Swiper
                dir="ltr"
                direction="vertical"
                spaceBetween={10}
                slidesPerView={6}
                className="tf-product-media-thumbs other-image-zoom"
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                breakpoints={{
                    0: {
                        direction: "horizontal",
                    },
                    1150: {
                        direction: "vertical",
                    },
                }}
            >
                {images.map((slide, index) => (
                    <SwiperSlide key={index} className="stagger-item">
                        <div className="item" style={{background: "#e8e8e8"}}>
                            <Image
                                className="lazyload"
                                data-src={slide.src}
                                alt={""}
                                src={slide.src} // Optional fallback for non-lazy loading
                                width={1100}
                                height={700}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Gallery>
                <Swiper
                    dir="ltr"
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    className="tf-product-media-main"
                    id="gallery-swiper-started"
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Thumbs, Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                        handleImage(swiper.activeIndex);
                    }}
                >
                    {images.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <Item
                                original={slide.src}
                                thumbnail={slide.src}
                                width={1100}
                                height={700}
                            >
                                {({ ref, open }) => (
                                    <a
                                        className="item"
                                        data-pswp-width={1100}
                                        data-pswp-height={700}
                                        onClick={open}
                                        style={{background: "#e8e8e8"}}
                                    >
                                        <Image
                                            className="tf-image-zoom lazyload"
                                            data-zoom={slide.src}
                                            data-src={slide.src}
                                            ref={ref}
                                            alt="image"
                                            width={1100}
                                            height={700}
                                            src={slide.src}
                                        />
                                    </a>
                                )}
                            </Item>
                        </SwiperSlide>
                    ))}

                    {/* Navigation buttons */}
                    <div className="swiper-button-next button-style-arrow thumbs-next"></div>
                    <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
                </Swiper>{" "}
            </Gallery>
        </>
    );
}
