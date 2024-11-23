import MainLayout from "@/components/common/layouts/MainLayout";
import React from "react";
import ContactForm from "../components/ContactForm";
import ContactMap from "../components/ContactMap";
const ContactWidget = () => {
  return (
    <MainLayout>
         <div className="flex-1 pr-2 mt-24 max-lg:px-2 ">
        <h2 className="text-3xl font-semibold text-foreground mb-8 ">
          Connect with Us
        </h2>
      </div>

      <div className="flex mb-24 px-2">
        <ContactForm />
        <ContactMap />
      </div>
    </MainLayout>
  );
};

export default ContactWidget;
