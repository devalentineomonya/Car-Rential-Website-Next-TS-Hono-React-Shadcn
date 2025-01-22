import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import self from "@/public/images/self.png";
const Ride = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full pt-12 max-xl:px-3">
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Deval ride&apos;s Ride
          </h2>
          <Image height={300} src={self} alt="Ride section Image" />
        </div>
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval ride&apos;s Ride
          </h2>
          <p className="text-muted-foreground">
            At Deval Ride, our Ride is to create a seamless and enjoyable car
            rental experience for our customers.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Ride;
