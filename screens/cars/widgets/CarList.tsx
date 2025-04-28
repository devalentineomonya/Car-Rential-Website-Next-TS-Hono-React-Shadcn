"use client";
import React, { useState } from "react";

import CarCard from "@/components/common/carcard/CarCard";
import CarCardSkeleton from "@/components/common/carcard/CarCardSkeleton";
import MainLayout from "@/components/common/layouts/MainLayout";

import CarFilter from "../components/CarFilter";
import CarPagination from "../components/CarPagination";
import OrientationController from "../components/OrientationController";
import ItemsPerPageController from "../components/ItemsPerPageController";
import SortByController from "../components/SortByController";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListCarsParams, useListCars } from "@/features/cars/api/use-list-cars";

const CarList = () => {
  const [filters, setFilters] = useState<ListCarsParams>({});
  const { data, isPending } = useListCars(filters);
  return (
    <MainLayout>
      <div className="flex-1 pr-2 mt-24 mb-12 max-lg:px-2"></div>
      <div className="max-lg:px-2 flex gap-4 pb-8">
        <div className="w-60 shrink-0 max-sm:hidden">
          <div className="sticky top-20">
            <CarFilter onFilterChange={setFilters} />
          </div>
        </div>
        <div>
          <div className="w-full flex items-center justify-between my-4">
            <div className="flex items-center gap-x-3">
              <Button variant="outline" size="icon">
                <ListFilter className="h-5 w-5" />
              </Button>
              <SortByController />
            </div>
            <div className="flex items-center gap-x-3">
              <ItemsPerPageController />
              <OrientationController />
            </div>
          </div>
          <div className="flex-1 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-fit">
            {isPending
              ? Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <CarCardSkeleton key={`skeleton-${index}`} />
                  ))
              : data?.map((car) => <CarCard car={car as any} key={car.id} />)}
          </div>
          <CarPagination />
        </div>
      </div>
    </MainLayout>
  );
};

export default CarList;
