import React from "react";
import { PiFanLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { IoCarSportOutline } from "react-icons/io5";
import { BsFuelPump, BsWhatsapp } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { GiGearStickPattern, GiCarDoor, GiGearStick } from "react-icons/gi";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const Summary = () => {
  const carFeatures = [
    {
      icon: IoCarSportOutline,
      label: "Hatchback",
      value: "123"
    },
    {
      icon: GiGearStickPattern,
      label: "Transmission",
      value: "123"
    },
    {
      icon: BsFuelPump,
      label: "Fuel Type",
      value: "123"
    },
    {
      icon: GiGearStick,
      label: "Gears",
      value: "123"
    },
    {
      icon: GiCarDoor,
      label: "Doors",
      value: "123"
    },
    {
      icon: PiFanLight,
      label: "Air Condition",
      value: "123"
    }
  ];

  return (
    <Card className="max-h-fit">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-x-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Ke 2300
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
                  <feature.icon size={28} className="text-foreground" />
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
          <BsWhatsapp/>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Summary;
