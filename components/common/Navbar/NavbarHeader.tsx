import Link from "next/link";
import React from "react";
import { CgFacebook , CgInstagram } from "react-icons/cg";
import { HiMiniPhoneArrowUpRight } from "react-icons/hi2";
import { PiXLogoBold, PiYoutubeLogoFill } from "react-icons/pi";

import MainLayout from "../layouts/MainLayout";
const NavbarHeader = () => {
  return (
    <header className="bg-background text-foreground h-10 px-2 ">
      <MainLayout>
        <div className="w-full h-full flex items-center justify-between">
          <div className="text-xs flex items-center justify-between">
            <Link href="/faq">FAQ&apos;s</Link>
            <div className="mx-2 h-5 bg-white text-slate-950 rounded-full flex items-center justify-center aspect-square">
              <HiMiniPhoneArrowUpRight size={12} />
            </div>
            <Link href="tel:+254768133220">(254) 768 133 220</Link>
          </div>
          <div className="text-xs flex items-center justify-between">
            <span className="max-sm:hidden">React out to us: </span>
            <Link href="https://facebook.com" target="blank">
              <CgFacebook size={16} className="mx-1" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <CgInstagram size={16} className="mx-1" />
            </Link>
            <Link href="https://x.com" target="_blank">
              <PiXLogoBold size={16} className="mx-1" />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <PiYoutubeLogoFill size={16} className="mx-1" />
            </Link>
          </div>
        </div>
      </MainLayout>
    </header>
  );
};

export default NavbarHeader;
