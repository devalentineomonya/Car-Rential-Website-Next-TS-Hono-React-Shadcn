"use client";
import Link from "next/link";
import React from "react";
import {FaCarSide} from "react-icons/fa6";

import CarCard from "@/components/common/carcard/CarCard";
import CarCardSkeleton from "@/components/common/carcard/CarCardSkeleton";
import MainLayout from "@/components/common/layouts/MainLayout";
import NoCarsFound from "@/components/common/error/NoCarsFound";
import {useListCars} from "@/features/cars/api/use-list-cars";
const TopCars = () => {
    const {data, isPending} = useListCars({limit: 8});
    return (
        <MainLayout>
            <div className="flex-1 pr-2 max-lg:mt-6 flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-foreground x">
                    Our Top Cars
                </h2>

                <Link
                    href="/cars"
                    className="border bg-card text-card-foreground shadow group font-medium flex items-center gap-x-2 py-2 rounded-md px-4"
                >
                    <span>View More</span>
                    <FaCarSide className="group-hover:translate-x-2  transition-all ease-in-out duration-300" />
                </Link>
            </div>
            <div className="flex-1 sm:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-fit w-full">
                {isPending ? (
                    Array(9)
                        .fill(0)
                        .map((_, index) => (
                            <CarCardSkeleton key={`skeleton-${index}`} />
                        ))
                ) : data?.length ? (
                    data.map((car) => <CarCard car={car as any} key={car.id} />)
                ) : (
                    <div className="col-span-full">
                        <NoCarsFound />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TopCars;
