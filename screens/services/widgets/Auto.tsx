import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import auto from "@/public/images/auto.png";

const Auto = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full pt-12 max-xl:px-3">
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Auto&apos;s Auto
          </h2>
          <p className="text-muted-foreground mb-4">
            At Deval Auto, we’re reimagining how people move goods and
            passengers with smart, dependable, and affordable automotive
            solutions. Whether you're looking for a delivery vehicle, a
            passenger shuttle, or a small utility ride, Deval Auto has something
            to meet your needs.
          </p>
          <p className="text-muted-foreground mb-4">
            Our platform offers a range of auto services that prioritize
            convenience and efficiency. From local deliveries to scheduled
            pickups, we enable individuals and businesses to get things moving
            quickly and securely.
          </p>
          <p className="text-muted-foreground">
            With technology-driven tracking, verified drivers, and an easy
            booking process, Deval Auto is committed to keeping Kenya on the
            move. Let us help you automate your mobility needs—fast, flexible,
            and fuss-free.
          </p>
        </div>
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Auto&apos;s Auto
          </h2>
          <Image height={300} src={auto} alt="Auto section Image" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Auto;
