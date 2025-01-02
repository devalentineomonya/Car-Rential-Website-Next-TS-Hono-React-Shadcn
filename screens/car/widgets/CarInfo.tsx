import React from "react";

import { Separator } from "@/components/ui/separator";

import CarImageCarousel from "../components/CarImageCarousel";
import GeneralInformation from "../components/GeneralInformation";
import PremiumFeatures from "../components/PremiumFeatures";
import SpeedBanner from "../components/SpeedBanner";

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
