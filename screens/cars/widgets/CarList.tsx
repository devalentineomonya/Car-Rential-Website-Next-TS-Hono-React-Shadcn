"use client";
import React from "react";

import CarCard from "@/components/common/carcard/CarCard";
import MainLayout from "@/components/common/layouts/MainLayout";

import CarFilter from "../components/CarFilter";
import CarPagination from "../components/CarPagination";
import OrientationController from "../components/OrientationController";
import ItemsPerPageController from "../components/ItemsPerPageController";
import SortByController from "../components/SortByController";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListCars } from "@/features/cars/api/use-list-cars";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const SkeletonCarCard = () => (
  <Card className="rounded-md w-full max-h-fit">
    <CardHeader className="p-2 flex-row items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </CardHeader>
    <CardContent className="p-3">
      <Skeleton className="h-48 w-full rounded-lg" />
    </CardContent>
    <CardFooter className="p-3 flex-col item-start justify-center space-y-4">
      <div className="w-full space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Separator className="my-1" />
      <div className="w-full flex flex-wrap gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-5 w-20" />
          ))}
      </div>
    </CardFooter>
  </Card>
);

const CarList = () => {
  const { data, isPending } = useListCars();

  return (
    <MainLayout>
      <div className="flex-1 pr-2 mt-24 mb-12 max-lg:px-2"></div>
      <div className="max-lg:px-2 flex gap-4 pb-8">
        <div className="w-60 shrink-0 max-sm:hidden">
          <div className="sticky top-20">
            <CarFilter />
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
          <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-fit">
            {isPending
              ? Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <SkeletonCarCard key={`skeleton-${index}`} />
                  ))
              : data?.map((car) => <CarCard car={car} key={car.id} />)}
          </div>
          <CarPagination />
        </div>
      </div>
    </MainLayout>
  );
};

export default CarList;
