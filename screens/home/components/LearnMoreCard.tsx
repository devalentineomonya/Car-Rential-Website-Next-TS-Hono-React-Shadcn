import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface LearnMoreCardProps {
  image: string;
  link: string;
  description: string;
}

const LearnMoreCard: React.FC<LearnMoreCardProps> = ({
  image,
  description,
  link,
}) => {
  return (
    <Card className="rounded-md overflow-hidden">
      <CardContent className="p-0">
        <Image
          src={image}
          width={100}
          height={100}
          quality={100}
          alt={description}
          className="w-full aspect-video"
        />
      </CardContent>
      <CardFooter className="p-5 flex-col items-start">
        <h5 className="font-semibold text-xl ">The best way to drive cars</h5>
        <p className="leading-relaxed text-start text-sm my-4">{description}</p>
        <Link href={link} className="text-base font-semibold hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LearnMoreCard;
