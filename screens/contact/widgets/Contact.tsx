import React from "react";

import MainLayout from "@/components/common/layouts/MainLayout";
import LocationMap from "@/components/common/shared/LocationMap";

import ContactForm from "../components/ContactForm";
import ContactSummary from "../components/ContactSummary";
const ContactWidget = () => {
  return (
    <MainLayout>
      <div className="flex-1 pr-2 mt-24 max-lg:px-2 ">
        <h2 className="text-3xl font-semibold text-foreground mb-8 ">
          Connect with Us
        </h2>
      </div>

      <div className="h-full flex  mb-24 px-2">
        <ContactForm />
        <ContactSummary />
      </div>
      <LocationMap />
    </MainLayout>
  );
};

export default ContactWidget;
