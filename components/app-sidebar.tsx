"use client";
import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserSidebarType } from "@/utils/sidebarData";
import { CompanyInfo } from "./company-info";
export function AppSidebar({
  data,
  ...props
}: React.ComponentProps<typeof Sidebar> & { data: UserSidebarType }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyInfo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
