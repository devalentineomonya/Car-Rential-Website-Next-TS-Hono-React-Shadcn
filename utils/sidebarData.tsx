import { Car } from "lucide-react";
import { GiCarKey, GiCarSeat } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { TbCreditCardPay, TbReportAnalytics } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoCarSportOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import React from "react";
export const userSidebar = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: <AiOutlineDashboard />,
      isActive: true,
    },

    {
      title: "My Rides",
      icon: <IoCarSportOutline />,
      items: [
        {
          title: "Current Bookings",
          url: "/user/bookings/current",
        },
        {
          title: "Booking History",
          url: "/user/bookings/history",
        },
      ],
    },
    {
      title: "My Deliveries",
      icon: <IoCarSportOutline />,
      items: [
        {
          title: "Current Bookings",
          url: "/user/bookings/current",
        },
        {
          title: "Booking History",
          url: "/user/bookings/history",
        },
      ],
    },
    {
      title: "My Hires",
      icon: <GiCarKey />,
      items: [
        {
          title: "Current Bookings",
          url: "/user/bookings/current",
        },
        {
          title: "Booking History",
          url: "/user/bookings/history",
        },
      ],
    },
    {
      title: "Payments",
      icon: <TbCreditCardPay />,
      items: [
        {
          title: "Payment Methods",
          url: "/user/payments/methods",
        },
        {
          title: "Payment History",
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
      title: "Car Management",
      icon: <Car />,
      items: [
        { title: "View Cars", url: "/admin/cars" },
        { title: "Pending Approvals", url: "/admin/cars/pending" },
        { title: "Add New Car", url: "/admin/cars/add" },
      ],
    },
    {
      title: "User Management",
      icon: <PiUsersThree />,
      items: [
        { title: "View Users", url: "/admin/users" },
        { title: "Add New User", url: "/admin/users/add" },
      ],
    },
    {
      title: "Drivers Management",
      icon: <Car />,
      items: [
        { title: "View Drivers", url: "/admin/drivers" },
        { title: "Pending Approvals", url: "/admin/drivers/pending" },
        { title: "Add New Driver", url: "/admin/drivers/add" },
      ],
    },
    {
      title: "Rides",
      icon: <GiCarSeat />,
      items: [
        { title: "All Rides", url: "/admin/rides" },
        { title: "Pending Approvals", url: "/admin/rides/pending" },
      ],
    },
    {
      title: "Rentals",
      icon: <GiCarKey />,
      items: [
        { title: "All Rentals", url: "/admin/rentals" },
        { title: "Pending Approvals", url: "/admin/rentals/pending" },
      ],
    },
    {
      title: "Deliveries",
      icon: <IoCarSportOutline />,
      items: [
        { title: "All Deliveries", url: "/admin/deliveries" },
        { title: "Pending Approvals", url: "/admin/deliveries/pending" },
      ],
    },

    {
      title: "Payments",
      icon: <TbCreditCardPay />,
      items: [{ title: "Sales Reports", url: "/admin/payments" }],
    },

    {
      title: "Reports",
      icon: <TbReportAnalytics />,
      items: [
        { title: "Cars Reports", url: "/admin/reports/cars" },
        { title: "Bookings Reports", url: "/admin/reports/bookings" },
        { title: "Deliveries Reports", url: "/admin/reports/deliveries" },
        { title: "Rentals Reports", url: "/admin/reports/rentals" },
        { title: "User Analytics", url: "/admin/reports/analytics" },
      ],
    },
  ],
};
export type AdminSidebarType = typeof adminSidebar;
export type UserSidebarType = typeof userSidebar;
