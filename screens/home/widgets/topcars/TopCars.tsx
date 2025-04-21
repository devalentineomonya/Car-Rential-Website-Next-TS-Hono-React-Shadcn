"use client";
import Link from "next/link";
import React from "react";
import { FaCarSide } from "react-icons/fa6";

import CarCard from "@/components/common/carcard/CarCard";
import CarCardSkeleton from "@/components/common/carcard/CarCardSkeleton";
import MainLayout from "@/components/common/layouts/MainLayout";

import { useListCars } from "@/features/cars/api/use-list-cars";
const TopCars = () => {
  const { data: cars, isPending } = useListCars({ limit: 8 });
  return (
    <MainLayout>
      <div className="flex-1 pr-2 max-lg:mt-6">
        <h2 className="text-3xl font-semibold text-foreground my-8 ">
          Our Top Cars
        </h2>
      </div>
      <div className="w-full flex items-center justify-end max-xl:pr-3">
        <Link
          href="/cars"
          className="border bg-card text-card-foreground shadow group font-medium flex items-center gap-x-2 py-2 rounded-md px-4"
        >
          <span>View More</span>
          <FaCarSide className="group-hover:translate-x-2  transition-all ease-in-out duration-300" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 pb-12 max-xl:px-3">
        {isPending
          ? Array(8)
              .fill(0)
              .map((_, index) => <CarCardSkeleton key={`skeleton-${index}`} />)
          : cars
              ?.slice(0, 8)
              .map((car) => <CarCard key={car.id} car={car as any} />)}
      </div>
    </MainLayout>
  );
};

export default TopCars;
