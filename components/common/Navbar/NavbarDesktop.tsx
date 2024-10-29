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
import Link from "next/link";
const Navbar = () => {
  return (
    <header className="h-11  w-full sticky top-0 shadow-md flex items-center bg-slate-950 text-white">
      <MainLayout>
        <div className=" h-full flex justify-start items-center ">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
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
          </NavigationMenu>
        </div>
      </MainLayout>
    </header>
  );
};

export default Navbar;
