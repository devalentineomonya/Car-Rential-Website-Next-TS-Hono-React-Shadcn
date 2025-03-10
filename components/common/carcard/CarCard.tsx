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
import { Car } from "@/types/car";
interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Link href={car.link || ""}>
      <Card className="rounded-md w-full hover:scale-105 transition-all ease-in-out duration-300 max-h-fit">
        <CardHeader className="p-2 flex-row items-center justify-between">
          <div className="flex items-center gap-x-2 cursor-default">
            <Badge
              variant="outline"
              className="rounded-md px-1 flex items-center gap-x-1"
            >
              <FaStar className="text-yellow-400 mr-1" size={18} />
              <p className="text-sm flex items-center gap-x-1">
                {car.rating.toFixed(1)}{" "}
                <span className="font-medium text-xs">
                  &#40; {car.reviews} &#41;
                </span>
              </p>
            </Badge>
            <Badge
              variant="outline"
              className="rounded-md py-1 px-1 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800"
            >
              {car.availability}
            </Badge>
          </div>
          <FaRegHeart
            className="hover:fill-pink-700 cursor-pointer"
            size={24}
          />
        </CardHeader>
        <CardContent className="justify-center p-3 overflow-hidden bg-background group/image">
          <Image
            src={car.image}
            alt={car.name}
            width={500}
            height={500}
            priority
            className="bg-background mix-blend-multiply group-hover/image:translate-x-2 transition-all ease-in-out duration-300 group-hover/image:scale-105"
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
                Ks {car.pricePerHour}
                <span className="text-sm font-normal text-muted-foreground">
                  /hour
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
              <span>{car.gears}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CarCard;
