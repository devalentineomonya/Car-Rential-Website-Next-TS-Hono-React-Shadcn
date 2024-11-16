import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MainLayout from "../layouts/MainLayout";
import { navigationLinks } from "./navigationLinks";
import { IoLogInOutline } from "react-icons/io5";

import { RiUserAddLine } from "react-icons/ri";
const Navbar = () => {
  return (
    <header className="h-11  w-full sticky top-0 z-30 bg-background text-foreground hover:text-gray-100 max-md:hidden">
      <MainLayout>
        <div className=" h-full flex justify-start items-center w-full max-w-7xl">
          <NavigationMenu className=" w-full h-full flex justify-between items-center  max-w-full">
            <NavigationMenuList className="space-x-4">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.link} className="text-base">
                  <NavigationMenuLink href={link.link}>
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/auth/login"
                  className={`flex items-center gap-x-1`}
                >
                  <IoLogInOutline />
                  <span>Login</span>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/auth/register"
                
                  className={`flex items-center gap-x-1`}
                >
                  <RiUserAddLine />
                  <span>Register</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </MainLayout>
    </header>
  );
};

export default Navbar;
