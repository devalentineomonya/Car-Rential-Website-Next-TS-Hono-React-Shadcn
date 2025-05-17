
import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import driver from "@/public/images/driver.png";

const Driver = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full pt-12 max-xl:px-3">
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Driver&apos;s Driver
          </h2>
          <Image height={300} src={driver} alt="Driver section Image" />
        </div>
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval Driver&apos;s Driver
          </h2>
          <p className="text-muted-foreground mb-4">
            At Deval Driver, we connect you with professional, reliable, and background-checked drivers for every occasion—whether it’s a scheduled trip, a last-minute commute, or a long-distance journey.
          </p>
          <p className="text-muted-foreground mb-4">
            Our platform makes it easy to hire trusted drivers who prioritize your comfort, safety, and punctuality. Whether you’re traveling for business, running errands, or just need someone to take the wheel, Deval Driver has you covered.
          </p>
          <p className="text-muted-foreground">
            With flexible booking, real-time tracking, and a commitment to excellence, Deval Driver is redefining how personal transportation should feel. Sit back, relax, and enjoy the ride—our drivers will take it from here.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Driver;
