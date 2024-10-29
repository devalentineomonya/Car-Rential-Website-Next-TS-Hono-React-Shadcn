import React from "react";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
const NavbarHeader = () => {
  return (
    <header className="bg-slate-950 text-white h-10 ">
      <MainLayout>
        <div className="w-full flex items-center justify-between">
          <div className="text-sm ">
            <Link href="/faq">FAQ&apos;s</Link>
          </div>
        </div>
      </MainLayout>
    </header>
  );
};

export default NavbarHeader;
