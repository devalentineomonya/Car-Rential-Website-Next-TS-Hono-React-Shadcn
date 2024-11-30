"use client";
import { usePathname } from "next/navigation";
import React from "react";

import { noNavbarOrFooter } from "@/utils/constants";

import NavbarCenter from "./NavbarCenter";
import NavbarDesktop from "./NavbarDesktop";
import NavbarHeader from "./NavbarHeader";
import NavbarMobile from "./NavbarMobile";

const NavbarMain = () => {
  const pathname = usePathname();
  const hideNavbarOrFooter = noNavbarOrFooter.some((route) =>
    pathname.includes(route)
  );

  return (
    <>
      {!hideNavbarOrFooter && (
        <>
          <NavbarHeader />
          <NavbarCenter />
          <NavbarDesktop />
          <NavbarMobile />
        </>
      )}
    </>
  );
};

export default NavbarMain;
