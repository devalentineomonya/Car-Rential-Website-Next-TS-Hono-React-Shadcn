import { Car } from "lucide-react";
import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiCarKey, GiCarSeat } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { TbCreditCardPay, TbReportAnalytics } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
export const userSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: <AiOutlineDashboard />,
      isActive: true,
    },

    {
      title: "Rides",
      icon: <IoCarSportOutline />,
      items: [
        {
          title: "Current",
          url: "/user/bookings/current",
        },
        {
          title: "History",
          url: "/user/bookings/history",
        },
      ],
    },
    {
      title: "Deliveries",
      icon: <IoCarSportOutline />,
      items: [
        {
          title: "Current",
          url: "/user/bookings/current",
        },
        {
          title: "History",
          url: "/user/bookings/history",
        },
      ],
    },
    {
      title: "Hires",
      icon: <GiCarKey />,
      items: [
        {
          title: "Current",
          url: "/user/bookings/current",
        },
        {
          title: "History",
          url: "/user/bookings/history",
        },
      ],
    },
    {
      title: "Payments",
      icon: <TbCreditCardPay />,
      items: [
        {
          title: "Methods",
          url: "/user/payments/methods",
        },
        {
          title: "History",
          url: "/user/payments/history",
        },
      ],
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: <BsPerson />,
    },
    {
      title: "Support",
      url: "/user/support",
      icon: <TfiHeadphoneAlt />,
    },
  ],
};

export const adminSidebar = {
  navMain: [
    {
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      url: "/admin/dashboard",
      isActive: true,
    },
    {
      title: "Cars",
      icon: <Car />,
      items: [{ title: "View", url: "/admin/cars" }],
    },
    {
      title: "Users",
      icon: <PiUsersThree />,
      items: [{ title: "View", url: "/admin/users" }],
    },
    {
      title: "Drivers",
      icon: <Car />,
      items: [
        { title: "View", url: "/admin/drivers" },
        { title: "Approvals", url: "/admin/drivers/pending" },
      ],
    },
    {
      title: "Rides",
      icon: <GiCarSeat />,
      items: [
        { title: "View", url: "/admin/rides" },
        { title: "Approvals", url: "/admin/rides/pending" },
      ],
    },
    {
      title: "Rentals",
      icon: <GiCarKey />,
      items: [
        { title: "View", url: "/admin/rentals" },
        { title: "Approvals", url: "/admin/rentals/pending" },
      ],
    },
    {
      title: "Deliveries",
      icon: <IoCarSportOutline />,
      items: [
        { title: "Views", url: "/admin/deliveries" },
        { title: "Approvals", url: "/admin/deliveries/pending" },
      ],
    },

    {
      title: "Payments",
      icon: <TbCreditCardPay />,
      items: [{ title: "Sales", url: "/admin/payments" }],
    },

    {
      title: "Reports",
      icon: <TbReportAnalytics />,
      items: [
        { title: "Cars", url: "/admin/reports/cars" },
        { title: "Bookings", url: "/admin/reports/bookings" },
        { title: "Deliveries", url: "/admin/reports/deliveries" },
        { title: "Rentals", url: "/admin/reports/rentals" },
        { title: "Users", url: "/admin/reports/analytics" },
      ],
    },
  ],
};
export type AdminSidebarType = typeof adminSidebar;
export type UserSidebarType = typeof userSidebar;
