"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
});

const DynamicLocationMap = () => {
  return <LocationMap />;
};

export default DynamicLocationMap;
