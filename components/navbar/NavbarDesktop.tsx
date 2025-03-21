import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { IoLogInOutline } from "react-icons/io5";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import MainLayout from "../common/layouts/MainLayout";

import { navigationLinks } from "./navigationLinks";
const Navbar = () => {
  const { user, isSignedIn } = useUser();
  return (
    <header className="h-11 px-2 w-full sticky top-0 z-40 shadow-card dark:shadow-none bg-background text-foreground max-md:hidden shadow-sm border-b border-b-border">
      <MainLayout>
        <div className=" h-full flex justify-start items-center w-full max-w-7xl">
          <NavigationMenu className=" w-full h-full flex justify-between items-center  max-w-full">
            <NavigationMenuList className="space-x-4">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.link} className="text-base">
                  <Link href={link.link}>{link.label}</Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <NavigationMenuList>
              {!isSignedIn ? (
                <>
                  <NavigationMenuItem>
                    <Link
                      href="/auth/sign-in"
                      className={`flex items-center gap-x-1`}
                    >
                      <IoLogInOutline />
                      <span>Login</span>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      href="/auth/sign-up"
                      className={`flex items-center gap-x-1`}
                    >
                      <RiUserAddLine />
                      <span>Register</span>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <NavigationMenuItem>
                  <Link
                    className={`flex items-center gap-x-1`}
                    href="/user/dashboard"
                  >
                    <RiUserSharedLine />
                    <span>{user.firstName}</span>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </MainLayout>
    </header>
  );
};

export default Navbar;
