import Image from "next/image";
import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import car from "@/public/images/car1.png";

interface TestimonialCardProps {
  description: string;
  image: string;
  name: string;
  userType: string;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  description,
  userType,
  image,
}) => {
  return (
    <Card className="w-full p-3 rounded-sm">
      <CardContent className="p-0 text-sm text-muted-foreground">
        <p className="leading-relaxed text-start">{description}</p>
      </CardContent>
      <CardFooter className="p-0 mt-5">
        <div className="flex items-center gap-x-5 ">
          <Image
            className="w-24 min-h-[4.5rem] aspect-video rounded-md mt-2"
            src={image}
            alt={name}
            width={100}
            height={100}
            quality={100}
          />
          <div>
            <h5 className="text-foreground">{name}e</h5>
            <p className="text-muted-foreground text-sm">{userType}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
