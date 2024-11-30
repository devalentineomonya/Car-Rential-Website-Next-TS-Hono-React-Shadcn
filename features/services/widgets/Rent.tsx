import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import rent from "@/public/images/trip.png";
const Rent = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full pt-12 max-xl:px-3">
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Rent&apos;s Rent
          </h2>
          <p className="text-muted-foreground">
            At Deval Rent, our Rent is to create a seamless and enjoyable car
            rental experience for our customers.
          </p>
        </div>
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Rent&apos;s Rent
          </h2>
          <Image src={rent} alt="Rent section Image" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Rent;
