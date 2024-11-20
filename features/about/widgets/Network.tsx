import React from "react";
import Image from "next/image";
import network from "@/public/images/network.png";
import MainLayout from "@/components/common/layouts/MainLayout";

const Network = () => {
  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full gap-5 py-12 max-xl:px-3">
        <div className="flex-1 pl-2 max-lg:mt-6">
          <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8">
            Deval ride&apos;s Network
          </h2>
          <Image src={network} alt="Network section Image" />
        </div>
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8">
            Deval ride&apos;s Network
          </h2>
          <p className="text-muted-foreground">
            Deval Ride&apos;s network spans a wide and growing range of
            locations, providing customers with access to car rentals wherever
            they need them. We pride ourselves on connecting people to reliable
            vehicles and services that make travel easy and efficient.
          </p>
          <p className="text-muted-foreground mt-4">
            Our network is built on strong partnerships with local businesses
            and service providers, ensuring a seamless experience for our users.
            From urban centers to remote areas, we strive to expand our reach,
            giving more customers access to safe and affordable transportation
            options.
          </p>
          <p className="text-muted-foreground mt-4">
            We utilize cutting-edge technology to manage our network, ensuring
            real-time updates on vehicle availability, streamlined booking
            systems, and responsive customer support. Our goal is to foster a
            connected community that values accessibility, sustainability, and
            exceptional service.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Network;
