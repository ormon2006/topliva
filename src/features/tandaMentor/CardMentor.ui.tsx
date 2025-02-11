// features/CardMentor/ui/CardMentor/CardMentor.tsx
import { FC, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Mentor } from "./model/types/mentorTypes";
import { mentors } from "./model/data/mentorData";
import MentorCard from "./MentorCard.ui";

import "swiper/css";
import "swiper/css/navigation";

export const CardMentor: FC = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className=" px-4 mb-[24px] ">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Наши Менторы</h2>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[ A11y, Autoplay]}
          spaceBetween={5}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {mentors.map((mentor, index) => (
            <SwiperSlide key={index}>
              <div className="px-2 py-4 h-[550px]">
                <MentorCard mentor={mentor} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
