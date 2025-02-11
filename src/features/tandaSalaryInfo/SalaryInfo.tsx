import { FC, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  A11y,
  Autoplay,
  Pagination,
  Keyboard,
} from "swiper/modules";
import { Button } from "@mui/material";
import { professionData } from "./model/data/salaryInfoData";
import { SalaryInfoCard } from "./SalaryInfoCard.ui";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SalaryInfo: FC = () => {
  const swiperRef = useRef<any>(null);
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(true);

  const toggleAutoplay = () => {
    if (swiperRef.current?.autoplay.running) {
      swiperRef.current.autoplay.stop();
      setIsAutoplayRunning(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsAutoplayRunning(true);
    }
  };

  return (
    <section className=" px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Каталог направлений
        </h2>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, A11y, Autoplay, Pagination, Keyboard]}
          spaceBetween={5}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {professionData.map((profession, index) => (
            <SwiperSlide key={index}>
              <div className="px-2 py-4">
                <SalaryInfoCard profession={profession} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
