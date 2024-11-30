import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import mission from "@/public/images/mission.png";
const Mission = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full py-12 max-xl:px-3">
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Deval ride&apos;s Mission
          </h2>
          <p className="text-muted-foreground">
            Our mission is to revolutionize the car rental industry by providing
            exceptional service, unparalleled convenience, and a diverse fleet
            of high-quality vehicles.
          </p>
          <p className="text-muted-foreground mt-4">
            We strive to make every journey memorable, ensuring our customers
            experience the freedom and joy of driving without the hassles of
            ownership.
          </p>
          <p className="text-muted-foreground mt-4">
            With a commitment to innovation, sustainability, and customer
            satisfaction, we aim to be the preferred choice for car rentals
            worldwide.
          </p>
        </div>
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Deval ride&apos;s Mission
          </h2>
          <Image src={mission} alt="Mission section Image" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Mission;
