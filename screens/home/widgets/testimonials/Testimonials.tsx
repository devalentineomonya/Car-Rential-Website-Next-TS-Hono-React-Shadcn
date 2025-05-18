"use client";

import Autoplay from "embla-carousel-autoplay";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import TestimonialCard from "../../components/TestimonialCard";
import { testimonials } from "./testimonialsData";

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
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
    <MainLayout>
      <div className="py-12">
        <h2 className="text-3xl font-semibold text-foreground mb-8 text-center lg:text-left">
          Welcome to our motor services
        </h2>
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
          className="w-full max-lg:px-4"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="w-full md:basis-1/2 lg:basis-1/2"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-10">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 rounded-full mx-1 p-0 ${
                selectedIndex === index ? "bg-foreground" : "bg-foreground/20"
              }`}
              onClick={() => api && api.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
