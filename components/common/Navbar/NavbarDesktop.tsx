import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import MainLayout from "../layouts/MainLayout";
import { navigationLinks } from "./navigationLinks";
import { IoLogInOutline } from "react-icons/io5";

import { RiUserAddLine } from "react-icons/ri";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className="h-11  w-full sticky top-0  bg-slate-950 text-white hover:text-gray-100 max-md:hidden">
      <MainLayout>
        <div className=" h-full flex justify-start items-center w-full min-w-6xl">
          <NavigationMenu className=" w-full h-full flex justify-between items-center  max-w-full">
            <NavigationMenuList>
              <NavigationMenuItem className="text-xs">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.link}
                    href={link.link}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/auth/login" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`flex items-center gap-x-1 ${navigationMenuTriggerStyle()}`}
                  >
                    <span>Login</span>
                    <IoLogInOutline />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/auth/register" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`flex items-center gap-x-1  ${navigationMenuTriggerStyle()}`}
                  >
                    <span>Register</span>
                    <RiUserAddLine />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </MainLayout>
    </header>
  );
};

export default Navbar;
