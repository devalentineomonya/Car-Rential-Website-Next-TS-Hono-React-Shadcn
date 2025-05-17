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
          <p className="text-muted-foreground mb-4">
            At Deval Rent, we believe that mobility should be accessible,
            convenient, and affordable for everyone. Whether you're heading to a
            business meeting, planning a weekend getaway, or need a temporary
            vehicle, we've got you covered with our wide selection of reliable
            rental cars.
          </p>
          <p className="text-muted-foreground mb-4">
            Our platform is designed with simplicity and efficiency in mind. You
            can easily browse, compare, and book a car that fits your needs—all
            in just a few clicks. With transparent pricing, flexible rental
            durations, and excellent customer support, your satisfaction is our
            top priority.
          </p>
          <p className="text-muted-foreground">
            Join thousands of happy customers who trust Deval Rent to get them
            where they need to be. Your journey begins here—rent smart, rent
            fast, rent with Deval.
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
