import { FC } from "react";
import { professionData } from "./model/data/salaryInfoData";
import { SalaryInfoCard } from "./SalaryInfoCard.ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~app/components/ui/carousel";
import { Button } from "~app/components/ui/button";

export const SalaryInfo: FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-[#2C2C2C] font-bold text-center mb-8">
          Каталог направлений
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full pb-12 relative max-[640px]:max-w-[400px] max-[640px]:mx-auto max-[430px]:max-w-[300px] max-[380px]:max-w-[250px]"
        >
          <CarouselContent className="-ml-4">
            {professionData.map((profession, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="py-4 h-full">
                  <SalaryInfoCard profession={profession} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Навигационные кнопки */}
          <div className="hidden md:block">
            <CarouselPrevious
              className="absolute top-1/2 -translate-y-1/2 left-4"
              variant="ghost"
              size="lg"
            />
            <CarouselNext
              className="absolute top-1/2 -translate-y-1/2 right-4"
              variant="ghost"
              size="lg"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
