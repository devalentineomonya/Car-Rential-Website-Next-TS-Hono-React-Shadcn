"use client";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import React, { useState } from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "@/components/ui/carousel";
import carSeventeen from "@/public/images/car17.jpg";
import carEighteen from "@/public/images/car18.jpg";
import carNineteen from "@/public/images/car19.jpg";
import carTwenty from "@/public/images/car20.jpg";
import carSix from "@/public/images/car6.jpg";
import carSeven from "@/public/images/car7.jpg";
import carEight from "@/public/images/car8.jpg";

import HeroForm from "../../components/HeroForm";

const messages: { [key: string]: { message: string } } = {
  ride: {
    message: "Arrive to your destination in style",
  },
  deliver: {
    message: "Send and receive packages",
  },
  rent: {
    message: "Reserve a  self car ride for later",
  },
};
const Hero = () => {
  const images = [
    carSeventeen,
    carEighteen,
    carNineteen,
    carTwenty,
    carSix,
    carSeven,
    carEight,
  ];
  const [ride, setRide] = useState("ride");
  return (
    <section className="transition-all ease-in-out duration-300 relative isolate h-fit min-h-[calc(55dvh-3rem)] xl:min-h-[calc(70dvh-3rem)] px-4 pb-12">
      <div className="absolute top-0 left-0 w-full h-full -z-[8] bg-background/70"></div>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Carousel
          className="h-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
            Fade(),
          ]}
        >
          <CarouselContent className="h-full">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="w-full transition-all ease-in-out duration-300  h-full relative"
              >
                <Image
                  priority
                  quality={100}
                  src={image}
                  alt={`Hero Car ${index + 1}`}
                  fill
                  className="absolute object-cover h-full w-full mix-blend-screen"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <MainLayout>
        <div className="flex pt-12 animate-in fade-in-50 slide-in-from-bottom-7 animate-out fade-out-20 slide-out-to-bottom-4">
          <Card className="flex-1 max-md:min-h-4/5 max-md:h-fit max-w-full md:max-w-[450px] bg-background/50 backdrop-blur-md rounded-md">
            <CardHeader>
              <CardTitle className="text-foreground text-4xl font-semibold">
                {messages[ride].message}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HeroForm setRide={setRide} />
            </CardContent>
          </Card>
          <div className="flex-1 max-md:hidden"></div>
        </div>
      </MainLayout>
    </section>
  );
};

export default Hero;
