import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFuelPump } from "react-icons/bs";
import { FaStar, FaRegHeart } from "react-icons/fa6";
import { GiGearStickPattern, GiGearStick } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CarType } from "@/db/schema";

interface CarCardProps {
  car: CarType & { rating: number; reviews: number };
  orientation?: "grid" | "list";
}

const CarCard: React.FC<CarCardProps> = ({ car, orientation = "grid" }) => {
  return (
    <Link href={`cars/${car.id}`}>
      <Card
        className={`rounded-md w-full hover:scale-105 transition-all ease-in-out duration-300 max-h-fit ${
          orientation === "list" ? "flex" : ""
        }`}
      >
        <CardHeader className="p-2 flex-row items-center justify-between">
          <div className="flex items-center gap-x-2 cursor-default">
            <Badge
              variant="outline"
              className="rounded-md px-1 flex items-center gap-x-1"
            >
              <FaStar className="text-yellow-400 mr-1" size={18} />
              <p className="text-sm flex items-center gap-x-1">
                {car.rating}
                {/*.toFixed(1)}{" "}*/}
                <span className="font-medium text-xs">
                  &#40; {car.reviews} &#41;
                </span>
              </p>
            </Badge>
            {car.isAvailable ? (
              <Badge
                variant="outline"
                className="rounded-md py-1 px-1 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800"
              >
                Available Now
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="rounded-md py-1 px-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800"
              >
                Already Taken
              </Badge>
            )}
          </div>
          <FaRegHeart
            className="hover:fill-pink-700 cursor-pointer"
            size={24}
          />
        </CardHeader>
        <CardContent
          className={`justify-center p-3 overflow-hidden bg-background group/image ${
            orientation === "list" ? "w-1/3" : ""
          }`}
        >
          <Image
            src={
              Array.isArray(car.images) && car.images[0]
                ? String(car.images[0])
                : ""
            }
            alt={car.name}
            width={500}
            height={500}
            priority
            className="bg-background mix-blend-multiply transition-all ease-in-out duration-300 rounded-md"
          />
        </CardContent>
        <CardFooter className="p-3 flex-col item-start justify-center">
          <div className="w-full">
            <h2 className="uppercase text-muted-foreground font-normal text-base">
              {car.name}
            </h2>
            <div className="w-full flex items-center justify-between font-medium text-foreground text-lg">
              <h1>{car.bodyType}</h1>
              <p>
                Kes {car.isForDelivery ? car.pricePerKm : car.pricePerDay}
                <span className="text-sm font-normal text-muted-foreground">
                  /day
                </span>
              </p>
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex w-full items-center justify-between flex-wrap py-3 gap-y-2">
            <div className="flex-shrink-0 flex items-center gap-x-1 text-sm text-muted-foreground">
              <IoCarSportOutline size={20} className="text-foreground" />
              <span>{car.bodyType}</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-x-1 text-sm text-muted-foreground">
              <GiGearStickPattern size={20} className="text-foreground" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-x-1 text-sm text-muted-foreground">
              <BsFuelPump size={20} className="text-foreground" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-x-1 text-sm text-muted-foreground">
              <GiGearStick size={20} className="text-foreground" />
              <span>{car.condition}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CarCard;
