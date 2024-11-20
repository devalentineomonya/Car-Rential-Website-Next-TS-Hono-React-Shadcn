import HeaderBanner from "@/components/common/shared/HeaderBanner";
import Map from "@/features/about/widgets/Map";
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
      <Map/>
    </>
  );
};

export default About;
