import { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { mentors } from "./model/data/mentorData";
import MentorCard from "./MentorCard.ui";

import "swiper/css";
import "swiper/css/navigation";

export const CardMentor: FC = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className="mb-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Наши Менторы</h2>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[A11y]}
          spaceBetween={10} // Увеличьте пространство между слайдами
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-12"
        >
          {mentors.map((mentor, index) => (
            <SwiperSlide key={index}>
              <div className="py-4 max-[640px]:w-[300px]">
                <MentorCard mentor={mentor} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
