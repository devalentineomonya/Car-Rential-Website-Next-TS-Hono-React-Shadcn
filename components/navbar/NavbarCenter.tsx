import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCar } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

import { Button } from "@/components/ui/button";
import Nairobi from "@/public/images/nairobi.png";

import MainLayout from "../common/layouts/MainLayout";
const NavbarCenter = () => {
  return (
    <header className="bg-gray-100 dark:bg-white text-slate-950 h-20 px-2">
      <MainLayout>
        <div className=" w-full flex items-center justify-between h-full">
          <div className="flex gap-x-3 items-center">
            <div className="h-full flex items-center gap-x-3 w-full  text-slate-950">
              <FaCar size={52} />
              <h1 className="text-2xl font-semibold  h-fit">DevalRide</h1>
            </div>
            <div className="flex gap-x-2 items-center max-md:hidden">
              <LuAlarmClock size={32} />
              <div className="w-fit">
                <p className="text-lg text-slate-900 whitespace-nowrap">
                  Monday to Friday
                </p>
                <p className="text-sm text-slate-800 whitespace-nowrap">
                  7:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              variant="secondary"
              asChild
              size="sm"
              className="px-3 ml-3 bg-background rounded-md text-foreground shadow-md"
            >
              <div className="flex gap-x-1 items-center">
                <MdOutlineMarkEmailUnread />
                <Link href="mailto:testingDevalEmal@gmail.com">
                  Book a Ride
                </Link>
              </div>
            </Button>
            <Image
              src={Nairobi}
              alt="Nairobi"
              className="w-24 aspect-video max-md:hidden"
            />
            <div className="max-md:hidden">
              <h5 className="font-semibold text-slate-800 text-lg whitespace-nowrap">
                Location
              </h5>
              <p className="text-slate-700 text-sm whitespace-nowrap">
                CBD, Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </header>
  );
};

export default NavbarCenter;
