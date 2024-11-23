import React from "react";
import HeaderBanner from "@/components/common/shared/HeaderBanner";
import MainLayout from "@/components/common/layouts/MainLayout";
import Summary from "@/features/car/components/Summary";
import CarInfo from "@/features/car/widgets/CarInfo";

const page = () => {
  return (
    <>
      <HeaderBanner />
      <MainLayout>
        <div className="flex gap-4 py-24">
          <div className="w-80 shrink-0 sticky top-20">
            <div className="sticky top-20">
              <Summary />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 pl-5">
            <CarInfo />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default page;
