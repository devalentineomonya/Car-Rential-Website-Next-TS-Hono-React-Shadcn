import HeaderBanner from "@/components/common/shared/HeaderBanner";
import CarList from "@/features/cars/widgets/CarList";
import React from "react";

const Cars = () => {
  return (
    <>
      <HeaderBanner />
      <CarList/>
    </>
  );
};

export default Cars;
