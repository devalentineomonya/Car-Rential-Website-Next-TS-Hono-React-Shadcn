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
            Deval Ride&apos;s Ride
          </h2>
          <Image height={300} src={self} alt="Ride section Image" />
        </div>
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Ride&apos;s Ride
          </h2>
          <p className="text-muted-foreground mb-4">
            At Deval Ride, our mission is to create a seamless and enjoyable car
            rental experience for our customers. Whether you need a vehicle for
            a quick trip across town, a weekend getaway, or a long-term
            solution, we’ve got you covered.
          </p>
          <p className="text-muted-foreground mb-4">
            We believe that renting a car should be as easy and reliable as
            ordering a cup of coffee. That’s why we’ve streamlined our booking
            process, expanded our fleet of clean, fuel-efficient vehicles, and
            built a responsive support system ready to assist you 24/7.
          </p>
          <p className="text-muted-foreground">
            From convenient pickups and real-time tracking to flexible pricing
            options, Deval Ride is redefining what it means to move freely and
            affordably. Your journey is our priority—let us drive you there.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Ride;
