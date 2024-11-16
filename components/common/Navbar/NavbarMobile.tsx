import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { IoLogInOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import Link from "next/link";
const NavbarMobile = () => {
  return (
    <Sheet>
      <header className="w-full flex items-center justify-center bg-background h-10 md:hidden px-2 sticky top-0">
        <SheetTrigger asChild className="w-full max-w-6xl ">
          <div className="w-full flex items-center justify-between text-foreground hover:text-gray-100 hover:border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              className=" h-8 aspect-square rounded-md "
            >
              <HiOutlineMenuAlt4 size={28} />
            </Button>
            <NavigationMenu>
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
        </SheetTrigger>
      </header>
      <SheetContent
        side="left"
        className="bg-background border-r-transparent shadow-md text-foreground"
      >
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
