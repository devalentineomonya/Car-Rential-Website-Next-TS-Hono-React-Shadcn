"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const CarImageCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return (
    <div className="bg-muted-foreground min-h-[495px] relative rounded-xl overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full max-lg:px-4 aspect-video"
      >
        <CarouselContent className="h-full">
          <CarouselItem className="w-full aspect-video">
            <Image
              priority
              src="/images/car-1.png"
              alt="car"
              fill
              className="object-cover"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className=" absolute  w-full flex items-center justify-center bottom-5">
        <Button
          variant="ghost"
          size="sm"
          className={`w-2 h-2 rounded-full mx-1 p-0 ${
            selectedIndex === 1 ? "bg-foreground" : "bg-foreground/20"
          }`}
          onClick={() => api && api.scrollTo(1)}
          aria-label={`Go to slide`}
          title={`Go to slide`}
        />
      </div>
    </div>
  );
};

export default CarImageCarousel;
