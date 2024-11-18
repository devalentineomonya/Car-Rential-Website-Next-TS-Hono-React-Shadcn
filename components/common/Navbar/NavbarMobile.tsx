import React from "react";
import {
  Sheet,
  SheetContent,
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
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { IoLogInOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { navigationLinks } from "./navigationLinks";
const NavbarMobile = () => {
  return (
    <Sheet>
      {/* Navbar Header */}
      <header className="w-full flex items-center justify-center bg-background h-10 md:hidden px-2 sticky top-0">
        <SheetTrigger asChild className="w-full max-w-6xl">
          <div className="w-full flex items-center justify-between text-foreground hover:text-gray-100 hover:border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              className=" h-8 aspect-square rounded-md"
            >
              <HiOutlineMenuAlt4 size={28} />
            </Button>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/auth/sign-in"
                    className={`flex items-center gap-x-1`}
                  >
                    <span>Login</span>
                    <IoLogInOutline />
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/auth/sign-up"
                    className={`flex items-center gap-x-1`}
                  >
                    <span>Register</span>
                    <RiUserAddLine />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </SheetTrigger>
      </header>

      {/* Drawer Content */}
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
