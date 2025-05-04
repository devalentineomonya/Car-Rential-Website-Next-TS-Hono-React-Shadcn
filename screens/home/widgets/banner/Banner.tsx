import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCarSide } from "react-icons/fa6";

import MainLayout from "@/components/common/layouts/MainLayout";
import bannerLarge from "@/public/images/banner-large.png";
import bannerSmall from "@/public/images/car9.png";

const Banner = () => {
  return (
    <section className="relative max-md:py-24 h-fit min-h-[50dvh] w-full isolate">
      <Image
        quality={100}
        src={bannerLarge}
        alt="Banner"
        fill
        className="absolute object-cover h-full w-full -z-10"
      />
      <div className="bg-black/30 absolute top-0 left-0 h-full w-full -z-10"></div>
      <MainLayout>
        <div className="h-fit min-h-[50dvh] flex max-md:flex-col items-center text-white">
          <div className="flex-1 max-md:flex flex-col justify-center  max-md:px-4 max-w-none md:max-w-[32rem]">
            <h2 className="font-semibold text-5xl ">Got the skills?</h2>
            <h2 className="font-semibold text-3xl my-3">
              We&apos;ve got the opportunities!
            </h2>
            <p>
              Join our team of dedicated drivers, provide valuable services to
              our clients, and earn competitive pay.
            </p>
            <div className="max-w-fit">
              <Link
                className="group bg-white text-slate-950 py-2 rounded-md flex px-4 mt-3 items-center gap-x-2  "
                href="/become-a-driver"
                title="Become a Driver"
                aria-label="Become a Driver"
                
              >
                <span>Become a Driver</span>
                <FaCarSide className="group-hover:translate-x-2  transition-all ease-in-out duration-300" />
              </Link>
            </div>
          </div>
          <div className="w-full h-full flex-1 max-md:mt-12">
            <Image
              src={bannerSmall}
              alt="Banner image"
              className="object-contain w-full"
              quality={100}
            />
          </div>
        </div>
      </MainLayout>
    </section>
  );
};

export default Banner;
