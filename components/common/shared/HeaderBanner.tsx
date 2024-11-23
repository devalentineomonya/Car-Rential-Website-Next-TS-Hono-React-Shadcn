"use client";
import React from "react";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import headerBanner from "@/public/images/banner-header.png";
const HeaderBanner = () => {
  const pathname = usePathname();
  const paths = pathname.replace(/[^a-zA-Z0-9\s/]/g, " ").split("/");
  return (
    <div className="h-[18dvh] sm:h-[20dvh] lg:h-[30dvh] relative isolate">
      <Image
        fill
        className="object-cover absolute -z-10"
        src={headerBanner}
        alt="Header Banner "
      />
      <div className=" absolute h-full w-full top-0 left-0 bg-black/40 backdrop-blur-sm -z-10"></div>
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full ">
          <h1 className="text-4xl font-bold text-center text-background capitalize">
            {paths[paths.length - 1]}
          </h1>
          <div className=" flex items-center gap-x-2 text-muted mt-2">
            <Link href="/">Home </Link>
            {paths.map((path, index) => {
              if (path) {
                return (
                  <p className=" flex items-center gap-x-2 capitalize" key={index}>
                    <span>
                      <ChevronRight />
                    </span>
                    <Link href={`${paths.slice(0, index + 1).join("/")}`}>
                      {path}
                    </Link>
                  </p>
                );
              }
            })}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HeaderBanner;
