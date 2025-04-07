// components/CarouselCamion.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image"; // ou juste <img> si tu n'es pas sous Next.js

export default function CarouselTruck({
  images,
  limit,
  design,
  arrows = false,
}) {
  const backendUrl = process.env.NEXT_PUBLIC_LOCALHOST;
  const displayedImages = limit ? images.slice(0, limit) : images;

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      style={{ overflow: "hidden" }}
      className={design}
      // className="rounded-t-xl hover:cursor-pointer hover:scale-[105%] transition"
    >
      {displayedImages.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={`${backendUrl}/${img}`}
            alt={`Image ${index + 1}`}
            width={500}
            height={300}
            className={`w-full h-full  object-cover`}
          />
        </SwiperSlide>
      ))}
      {arrows && (
        <>
          <div className="swiper-button-prev !w-10 !h-10 !bg-gray-200 !rounded-full !flex !items-center !justify-center !text-black !text-xs hover:!bg-gray-300 transition" />
          <div className="swiper-button-next !w-10 !h-10 !bg-gray-200 !rounded-full !flex !items-center !justify-center !text-black !text-xs hover:!bg-gray-300 transition" />
        </>
      )}
    </Swiper>
  );
}
