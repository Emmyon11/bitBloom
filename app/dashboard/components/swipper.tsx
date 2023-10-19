'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import testimonybg from '@/public/images/testimony.jpeg';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { use, useEffect, useRef } from 'react';
import { data } from '@/app/controller/testimonies';
import Image from 'next/image';

export default function Swipper() {
  const testimonies = useRef<Customer[] | null>(null);
  testimonies.current = data;
  return (
    <div className="">
      <Swiper
        effect={'fade'}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        centeredSlides={true}
        modules={[Autoplay]}
        className=""
      >
        {testimonies?.current?.map((testimony, i) => {
          return (
            <SwiperSlide key={i} className="w-full  grid items-center  ">
              <div className=" grid items-center justify-center gap-5 p-6 md:p-8 ">
                <h1 className="text-xl font-bold">{testimony.testimony}</h1>
                <p className="font-pacifito">{testimony.date}</p>

                <p className="font-pacifito text-green-400">{testimony.name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
