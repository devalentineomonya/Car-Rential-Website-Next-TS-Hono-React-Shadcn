import React from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarDesktop from "./NavbarDesktop";
import NavbarCenter from "./NavbarCenter";

const NavbarMain = () => {
  return (
    <>
      <NavbarHeader />
      <NavbarCenter />
      <NavbarDesktop />
    </>
  );
};

export default NavbarMain;
