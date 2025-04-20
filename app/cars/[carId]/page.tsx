import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import HeaderBanner from "@/components/common/shared/HeaderBanner";
import Summary from "@/screens/car/components/Summary";
import CarInfo from "@/screens/car/widgets/CarInfo";

const page = () => {
  return (
    <>
      <HeaderBanner />
      <MainLayout>
        <div className="lg:flex gap-4 max-xl:px-2 py-24">
          <div className="w-full  lg:w-80 shrink-0 lg:sticky lg:top-20 mb-10 lg:mb-0">
            <div className="sticky top-20">
              <Summary />
            </div>
          </div>

          <div className="flex-1 lg:pl-5">
            <CarInfo />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default page;
