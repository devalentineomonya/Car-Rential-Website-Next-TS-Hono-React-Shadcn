"use client";
import React from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarDesktop from "./NavbarDesktop";
import NavbarCenter from "./NavbarCenter";
import NavbarMobile from "./NavbarMobile";
import { noNavbarOrFooter } from "@/utils/constants";
import { usePathname } from "next/navigation";
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
