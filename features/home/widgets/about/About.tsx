import MainLayout from "@/components/common/layouts/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import React from "react";
import about from "@/public/images/about.png";

const About = () => {
  const services = [
    {
      title: "Car Hiring Services",
      content:
        "We offer a wide range of vehicles for hire, from compact cars to luxury sedans, ensuring you have the perfect ride for any occasion.",
    },
    {
      title: "Car Rental Services",
      content:
        "Our rental services provide flexible options for both short-term and long-term needs, with competitive pricing and excellent customer support.",
    },
    {
      title: "Ride Booking",
      content:
        "Book a ride with ease using our user-friendly platform. Our professional drivers ensure a safe and comfortable journey every time.",
    },
    {
      title: "Package Delivery",
      content:
        "We offer reliable package delivery services, ensuring your parcels reach their destination on time and in perfect condition.",
    },
  ];

  return (
    <MainLayout>
      <div className="flex max-lg:flex-col-reverse w-full py-12 max-xl:px-3">
        <div className="flex-1 pr-2 max-lg:mt-6">
          <h2 className="max-lg:hidden text-3xl font-semibold text-foreground my-8 ">
            Welcome to our motor services
          </h2>
          <p>
            We are dedicated to providing the best motor services in the
            industry. Our team of experienced professionals is here to ensure
            your vehicle is always in top condition. Whether you need routine
            maintenance or emergency repairs, we have you covered.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5 mt-2">
            {services.map((service, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem
                  value={`item-${index + 1}`}
                  className="border-none"
                >
                  <AccordionTrigger>{service.title}</AccordionTrigger>
                  <AccordionContent>{service.content}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
        <div className="flex-1 pl-2 max-lg:mt-6">
        <h2 className="max-lg:block hidden text-3xl font-semibold text-foreground my-8 ">
            Welcome to our motor services
          </h2>
            <Image src={about} alt="About section Image" /></div>
      </div>
    </MainLayout>
  );
};
export default About;
