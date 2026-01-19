import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

import ProductCard from "./ProductCard";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        const sorted = [...res.data]
          .sort((a, b) => (a._id < b._id ? 1 : -1))
          .slice(0, 5);
        setProducts(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full py-14 h-[100vh]">
      <div className="w-[90%] mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl text-center md:text-3xl font-bold text-secondary">
            New Arrivals
          </h2>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView="auto"
          spaceBetween={24}
          grabCursor
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.productID}
              className="!w-[300px]"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
