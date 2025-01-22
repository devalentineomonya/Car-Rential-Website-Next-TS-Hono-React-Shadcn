import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import blog from "@/public/images/blog1.png";

const LearnMoreCard = () => {
  return (
    <Card className="rounded-md overflow-hidden">
      <CardContent className="p-0">
        <Image src={blog} alt="Blog Image" className="w-full aspect-video" />
      </CardContent>
      <CardFooter className="p-5 flex-col items-start">
        <h5 className="font-semibold text-xl ">The best way to drive cars</h5>
        <p className="leading-relaxed text-start text-sm my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni
          explicabo molestias recusandae repudiandae, dolor.
        </p>
        <Link
          className="text-base font-semibold hover:underline"
          href="blogs/console"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LearnMoreCard;
