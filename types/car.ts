import { StaticImageData } from "next/image";

export interface Car {
  name: string;
  rating: number;
  reviews: number;
  availability: string;
  image: string | StaticImageData;
  pricePerHour: number;
  bodyType: string;
  transmission: string;
  fuelType: string;
  gears: number;
  link?: string;
}
