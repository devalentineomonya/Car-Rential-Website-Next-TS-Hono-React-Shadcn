import { AiOutlineDashboard } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiCarKey } from "react-icons/gi";
import { TbCreditCardPay } from "react-icons/tb";

export const userSidebar = {
  user: {
    name: "Valentine Omonya",
    email: "valentine@example.com",
    avatar: "/avatars/valentine.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: <AiOutlineDashboard />,
      isActive: true,
      items: [],
    },

    {
      title: "My Rides",
      url: "#",
      icon: <IoCarSportOutline />,
      isActive: false,
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
      url: "#",
      icon: <IoCarSportOutline />,
      isActive: false,
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
      url: "#",
      icon: <GiCarKey />,
      isActive: false,
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
      url: "#",
      icon: <TbCreditCardPay />,
      isActive: false,
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
      isActive: false,
      items: [],
    },
    {
      title: "Support",
      url: "/user/support",
      icon: <TfiHeadphoneAlt />,
      isActive: false,
      items: [],
    },
  ],
};

export type UserSidebarType = typeof userSidebar;
