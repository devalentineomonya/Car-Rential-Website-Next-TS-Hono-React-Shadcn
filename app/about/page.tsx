import React from "react";
import dynamic from "next/dynamic";
const LocationMap = dynamic(() => import("@/components/common/shared/LocationMap"), {
  ssr: false,
});

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
      <LocationMap />
    </>
  );
};

export default About;
