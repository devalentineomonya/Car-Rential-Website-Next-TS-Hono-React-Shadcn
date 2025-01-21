import React from "react";

import HeaderBanner from "@/components/common/shared/HeaderBanner";
import LocationMap from "@/components/common/shared/LocationMap";
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
