import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoLogInOutline } from "react-icons/io5";
import { RiUserAddLine, RiUserSharedLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navigationLinks } from "./navigationLinks";
const NavbarMobile = () => {
  const { user, isSignedIn } = useUser();
  return (
    <Sheet>
      <header className="w-full flex items-center justify-center bg-background h-10 md:hidden px-2 sticky top-0 z-40 shadow-sm border-b border-b-border">
        <SheetTrigger asChild className="w-full max-w-6xl">
          <div className="w-full flex items-center justify-between text-foreground hover:text-secondary-foreground ">
            <Button
              variant="ghost"
              size="icon"
              className=" h-8 aspect-square rounded-md"
            >
              <HiOutlineMenuAlt4 size={28} />
            </Button>
            <NavigationMenu>
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
        </SheetTrigger>
      </header>

      <SheetContent
        side="left"
        className="bg-background border-r-transparent shadow-md text-foreground px-2"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 space-y-2">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="block px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
