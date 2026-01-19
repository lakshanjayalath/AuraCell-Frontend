import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const slides = [
    {
        title: "Premium Quality",
        subtitle: "Designed for modern lifestyles",
        image:
            "/4k-monitor.jpg",
    },
    {
        title: "New Arrivals",
        subtitle: "Discover the latest trends",
        image:
            "/smart-watch.jpg",
    },
    {
        title: "Exclusive Deals",
        subtitle: "Limited offers available now",
        image:
            "/earbuds.jpg",
    },
];

export default function HeroSlider() {
    return (
        <section className="w-full h-[90vh] bg-black">
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-secondary/50" />

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="max-w-7xl mx-auto px-6">
                                    <div className="max-w-xl text-white">
                                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-xl mb-6 text-gray-200">
                                            {slide.subtitle}
                                        </p>
                                        <Link to="/products" className="px-6 py-3 bg-white text-secondary font-semibold rounded-full hover:bg-gray-200 transition">
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
