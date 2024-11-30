import React from "react";

import HeaderBanner from "@/components/common/shared/HeaderBanner";
import CarList from "@/features/cars/widgets/CarList";

const Cars = () => {
  return (
    <>
      <HeaderBanner />
      <CarList/>
    </>
  );
};

export default Cars;
