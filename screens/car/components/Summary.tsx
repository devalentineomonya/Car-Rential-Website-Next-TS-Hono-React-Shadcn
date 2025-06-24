import React from "react";
import { BsFuelPump, BsWhatsapp } from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor, GiGearStick } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";
import { PiFanLight } from "react-icons/pi";
import {Cog } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const iconsMap = [
  {
    label:"bodyType",

    icon: IoCarSportOutline,
  },
  {
label:"transmission",
icon: GiGearStickPattern,
  },
  {
    label:"fuelType",
    icon: BsFuelPump,

  },
  {
    label:"driveType",
    icon: GiGearStick,

  },
  {
    label:"doors",
    icon: GiCarDoor,

  },
  {
label:"engineSize",
icon:Cog
  }
]
interface FeatureItem {
  label:string;
  value:string;

}
interface CarSummaryProps {
  carFeatures:FeatureItem[];
  price:string;
  isForRent:boolean

}
const Summary:React.FC<CarSummaryProps>= ({carFeatures, price, isForRent}) => {

  return (
    <Card className="max-h-fit">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-x-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Kes {price}/{isForRent ? "day":"Km"}
            </h1>
            <span className="text-sm text-muted-foreground">/per hour</span>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col gap-3">
          <ul className="flex flex-col gap-3">
            {carFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-4 text-base font-medium text-muted-foreground"
              >
                <label className="flex items-center gap-x-2">

                  {React.createElement(
                    iconsMap.find((iconItem) => iconItem.label === feature.label)?.icon || "div",
                    { size: 28, className: "text-foreground" }
                  )}

                  <span>{feature.label}</span>
                </label>
                <div>{feature.value}</div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="py-4 justify-between gap-x-2 max-w-80">
        <Button>Book Now</Button>
        <Button variant="outline">Car Demo</Button>
        <Button variant="outline" size="icon">
          <BsWhatsapp />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Summary;
