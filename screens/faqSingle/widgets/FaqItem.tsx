"use client";
import Image from "next/image";
import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import { FaqData } from "@/screens/faq/widgets/faqData";

import FaqAccordion from "../components/FaqAccordion";
import FaqDescription from "../components/FaqDescription";
import LoginBanner from "../components/LoginBanner";
const FaqItem = ({ faqItem }: { faqItem: FaqData }) => {
  return (
    <MainLayout>
      <div className="grid grid-cols-12 pb-24 pt-1 max-xl:px-4">
        <div className="col-span-12 lg:col-span-8">
          <LoginBanner />
          <FaqDescription faqItem={faqItem} />
          <FaqAccordion faqItem={faqItem} />
        </div>
        <div className="col-span-4 pl-6 hidden lg:block">
          <Image
            priority
            src={faqItem.image}
            alt={faqItem.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default FaqItem;
