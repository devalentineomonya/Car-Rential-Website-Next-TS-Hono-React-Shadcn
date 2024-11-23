import HeaderBanner from "@/components/common/shared/HeaderBanner";
import LocationMap from "@/components/common/shared/LocationMap";
import Mission from "@/features/about/widgets/Mission";
import Network from "@/features/about/widgets/Network";
import Vision from "@/features/about/widgets/Vision";
import React from "react";

const About = () => {
  return (
    <>
      <HeaderBanner />
      <Mission />
      <Vision />
      <Network />
      <LocationMap/>
    </>
  );
};

export default About;
