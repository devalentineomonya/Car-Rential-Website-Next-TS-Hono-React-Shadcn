import CarCard from "@/components/common/carcard/CarCard";
import MainLayout from "@/components/common/layouts/MainLayout";
import car2 from "@/public/images/car2.png"
import React from "react";
import CarFilter from "../components/CarFilter";
import CarPagination from "../components/CarPagination";

const CarList = () => {
  const carData = {
    name: "Ford Focus",
    rating: 4.7,
    reviews: 126,
    availability: "Available Now",
    image: car2,
    pricePerHour: 500,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Diesel",
    gears: 5,
    link: "/cars/ford-focus",
  };
  return (
    <MainLayout>
      <div className="flex-1 pr-2 mt-24 max-lg:px-2">
        <h2 className="text-3xl font-semibold text-foreground mb-8 ">
          Our Top Cars
        </h2>
      </div>
      <div className="max-lg:px-2 grid grid-cols-12 gap-x-4">
       <CarFilter/>
        <div className=" col-span-12 sm:col-span-9 grid  md:grid-cols-2 lg:grid-cols-3  gap-3">
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
          <CarCard car={carData} />
        </div>
      </div>
      <CarPagination/>
    </MainLayout>
  );
};

export default CarList;
