import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import delivery from "@/public/images/deliver.png";
import rent from "@/public/images/rent.png";
import ride from "@/public/images/ride.png";

import FeaturedCard from "../../components/FeaturedCard";
const Featured = () => {
  const features = [
    {
      name: "Ride",
      description:
        "Experience a fast, comfortable, and reliable ride service tailored to your needs.",
      image: ride,
      link: "Cars?category=ride",
    },
    {
      name: "Delivery",
      description:
        "Enjoy seamless and efficient package delivery with real-time tracking.",
      image: delivery,
      link: "Cars?category=delivery",
    },
    {
      name: "Rent",
      description:
        "Indulge in luxurious car rentals that offer flexibility and convenience at your pace.",
      image: rent,
      link: "Cars?category=rent",
    },
  ];
  return (
    <MainLayout>
      <div className="pt-12 w-full flex items-start">
        <h1 className="text-3xl font-semibold text-center">
          Featured Services
        </h1>
      </div>
      <div className="grid max-lg:gap-y-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12">
        {features.map((feature) => (
          <div key={feature.name} className="max-md:px-2 md:pr-4">
            <FeaturedCard
              name={feature.name}
              image={feature.image}
              description={feature.description}
              link={feature.link}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Featured;
