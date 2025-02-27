import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import vision from "@/public/images/vision.png";
const Vision = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full py-12 max-xl:px-3">
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Deval ride&apos;s Vision
          </h2>
          <Image
            priority
            src={vision}
            alt="Vision section Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval ride&apos;s Vision
          </h2>
          <p className="text-muted-foreground">
            At Deval Ride, our vision is to create a seamless and enjoyable car
            rental experience for our customers. We believe in providing
            top-notch service, a wide range of vehicles, and the convenience of
            easy booking and returns.
          </p>
          <p className="text-muted-foreground mt-4">
            We are committed to sustainability and innovation, constantly
            seeking ways to reduce our environmental impact and improve our
            services.
          </p>
          <p className="text-muted-foreground mt-4">
            Our goal is to be the leading car rental company, known for our
            reliability, customer satisfaction, and forward-thinking approach.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Vision;
