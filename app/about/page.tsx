import React from "react";
import dynamic from "next/dynamic";
import DynamicLocationMap from "@/components/common/shared/DynamicLocationMap";
import HeaderBanner from "@/components/common/shared/HeaderBanner";
import Mission from "@/screens/about/widgets/Mission";
import Network from "@/screens/about/widgets/Network";
import Vision from "@/screens/about/widgets/Vision";

const About = () => {
  return (
    <>
      <HeaderBanner />
      <Mission />
      <Vision />
      <Network />
      <DynamicLocationMap />
    </>
  );
};

export default About;
