import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";

import FaqCard from "../components/FaqCard";

import { faqData } from "./faqData";

const FaqCards = () => {
  return (
    <MainLayout>
      <div className="py-24 flex flex-col items-center">
        <div className="flex flex-col w-full items-center justify-center max-w-3xl">
          <h2 className="font-medium font-foreground text-4xl text-center">
            Welcome to DevalRide Support
          </h2>
          <p className="text-sm text-center my-6 max-w-xl">
            We&apos;re here to help. Looking for customer service contact
            information? Explore support resources for the relevant products
            below to find the best way to reach out about your issue.
          </p>
        </div>
        <div className="w-full grid grid-cols-6 gap-x-4">
          {faqData.map((faqItem) => (
            <FaqCard key={faqItem.name} faqItem={faqItem} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default FaqCards;
