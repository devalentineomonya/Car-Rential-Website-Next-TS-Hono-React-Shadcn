import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import car from "@/public/images/car1.png";
const TestimonialCard = () => {
  return (
    <Card className="w-full p-3 rounded-sm">
      <CardContent className="p-0 text-sm text-muted-foreground">
        <p className="leading-relaxed text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni
          explicabo molestias recusandae repudiandae, dolor, sapiente placeat
          ab, animi eum minima nulla facere aliquam aut vitae quo pariatur
          voluptate odit?
        </p>
      </CardContent>
      <CardFooter className="p-0 mt-5">
        <div className="flex items-center gap-x-5 ">
          <Image
            className="w-24 min-h-[4.5rem] aspect-video rounded-md mt-2"
            src={car}
            alt="User"
          />
          <div>
            <h5 className="text-foreground">Jane Doe</h5>
            <p className="text-muted-foreground text-sm">Customer</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
