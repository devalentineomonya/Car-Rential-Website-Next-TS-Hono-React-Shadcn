"use client";
import * as React from "react";

import { NavMain } from "@/components/common/sidebar/NavMenu";
import { NavUser } from "@/components/common/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserSidebarType, AdminSidebarType } from "@/utils/sidebarData";

import { CompanyInfo } from "./CompanyInfo";
const AppSidebar = ({
  data,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  data: AdminSidebarType | UserSidebarType;
}) => {
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
};

export default AppSidebar;
