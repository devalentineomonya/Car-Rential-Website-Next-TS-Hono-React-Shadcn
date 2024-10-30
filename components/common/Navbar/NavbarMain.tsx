import React from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarDesktop from "./NavbarDesktop";
import NavbarCenter from "./NavbarCenter";
import NavbarMobile from "./NavbarMobile";

const NavbarMain = () => {
  return (
    <>
      <NavbarHeader />
      <NavbarCenter />
      <NavbarDesktop />
      <NavbarMobile />
    </>
  );
};

export default NavbarMain;
