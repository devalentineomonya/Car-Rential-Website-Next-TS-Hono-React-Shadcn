import MainLayout from "@/components/common/layouts/MainLayout";
import React from "react";
import LearnMoreCard from "../../components/LearnMoreCard";

const LearnMore = () => {
  return (
    <MainLayout>
      <div className="py-12 ">
        <h2 className="text-3xl font-semibold text-foreground mb-8 text-center lg:text-left">
          Welcome to our motor services
        </h2>

        <div className="grid grid-cols-3 gap-x-3">
          <LearnMoreCard />
          <LearnMoreCard />
          <LearnMoreCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default LearnMore;
