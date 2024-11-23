import React from "react";
import { PiFanLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { IoCarSportOutline } from "react-icons/io5";
import { BsFuelPump, BsWhatsapp } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { GiGearStickPattern, GiCarDoor, GiGearStick } from "react-icons/gi";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
const Summary = () => {
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
      <CardContent >
        <div className="flex flex-col gap-3">
          <ul className="flex flex-col gap-3">
            <li className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-7  text-base font-medium text-muted-foreground">
              <label className="flex items-center gap-x-2">
                <IoCarSportOutline size={28} className="text-foreground" />
                <span>Hatchback</span>
              </label>
              <div>123</div>
            </li>
            <li className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-7  text-base font-medium text-muted-foreground">
              <label className="flex items-center justify-center gap-x-2">
                <GiGearStickPattern size={28} className="text-foreground" />
                <span>Transmission</span>
              </label>
              <div>123</div>
            </li>
            <li className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-7  text-base font-medium text-muted-foreground">
              <label className="flex items-center justify-center gap-x-2">
                <BsFuelPump size={28} className="text-foreground" />
                <span>Fuel Type</span>
              </label>
              <div>123</div>
            </li>
            <li className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-7  text-base font-medium text-muted-foreground">
              <label className="flex items-center justify-center gap-x-2">
                <GiGearStick size={28} className="text-foreground" />
                <span>Gears</span>
              </label>
              <div>123</div>
            </li>
            <li className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-7  text-base font-medium text-muted-foreground">
              <label className="flex items-center gap-x-2">
                <GiCarDoor size={28} className="text-foreground" />
                <span>Doors</span>
              </label>
              <div>123</div>
            </li>
            <li className="flex-shrink-0 flex items-center justify-between gap-x-1 space-y-7  text-base font-medium text-muted-foreground">
              <label className="flex items-center gap-x-2">
                <PiFanLight size={28} className="text-foreground" />
                <span>Air Condition</span>
              </label>
              <div>123</div>
            </li>
          </ul>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="py-4 justify-between gap-x-2">
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
