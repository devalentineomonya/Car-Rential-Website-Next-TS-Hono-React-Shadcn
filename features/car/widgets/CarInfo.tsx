import React from "react";
import SpeedBanner from "../components/SpeedBanner";
import PremiumFeatures from "../components/PremiumFeatures";
import CarImageCarousel from "../components/CarImageCarousel";
import GeneralInformation from "../components/GeneralInformation";
import { Separator } from "@/components/ui/separator";
const CarInfo = () => {
  return (
    <>
      <CarImageCarousel />
      <SpeedBanner />
      <GeneralInformation />
      <Separator className="my-6 w-full" />
      <PremiumFeatures />
    </>
  );
};

export default CarInfo;
