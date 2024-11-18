import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FaStar, FaRegHeart } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";
import { GiGearStickPattern, GiGearStick } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
// import Link from "next/link";
import { Car } from "@/types/car";
interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card className="rounded-md w-full">
      <CardHeader className="p-2 flex-row items-center justify-between">
        <div className="flex items-center gap-x-2 cursor-default">
          <Badge variant="outline" className="rounded-md px-1 flex items-center gap-x-1">
            <FaStar className="text-yellow-400 mr-1" size={18} />
            <p className="text-sm flex items-center gap-x-1">
              {car.rating.toFixed(1)} <span className="font-medium text-xs">&#40; {car.reviews} &#41;</span>
            </p>
          </Badge>
          <Badge
            variant="outline"
            className="rounded-md py-1 px-1 bg-green-300 dark:bg-green-200 hover:bg-green-500 text-green-600 hover:text-green-800"
          >
            {car.availability}
          </Badge>
        </div>
        <FaRegHeart className="hover:fill-pink-700 cursor-pointer" size={24} />
      </CardHeader>
      <CardContent className="p-3 overflow-hidden bg-background group/image">
        <Image
          src={car.image}
          alt={car.name}
          className="bg-background mix-blend-multiply group-hover/image:translate-x-2 transition-all ease-in-out duration-300 group-hover/image:scale-105"
          width={300}
          height={200}
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
        <div className="flex w-full items-center justify-between py-3">
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <IoCarSportOutline size={20} className="text-foreground" />
            <span>{car.bodyType}</span>
          </div>
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <GiGearStickPattern size={20} className="text-foreground" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <BsFuelPump size={20} className="text-foreground" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <GiGearStick size={20} className="text-foreground" />
            <span>{car.gears}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
