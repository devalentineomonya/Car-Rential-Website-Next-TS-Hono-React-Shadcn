import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

import { CardContent, Card } from "@/components/ui/card";
interface FeaturedCardProps {
  name: string;
  link: string;
  image: StaticImageData;
  description: string;
}
const FeaturedCard: React.FC<FeaturedCardProps> = ({
  name,
  image,
  description,
  link,
}) => {
  return (
    <Card className="aspect-video overflow-hidden max-h-48 w-full ">
      <CardContent className="justify-center h-fit p-3 px-4">
        <div className="grid grid-cols-12 justify-center items-start h-fit ">
          <div className="col-span-7 flex flex-col h-full justify-between">
            <div>
              <h2>{name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
            <Link
              className="p-1.5 px-4 mt-1 bg-muted-foreground text-background inline-block rounded-md max-w-24 items-center"
              href={link}
            >
              Details
            </Link>
          </div>
          <div className="col-span-5 flex items-center max-h-36  relative">
            <Image src={image} alt={name} className="object-contain" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedCard;
