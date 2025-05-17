import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
export const footerLinks = {
  vehicles: [
    { name: "Rent a Car", href: "/cars?category=rent" },
    { name: "Hire a Driver", href: "/cars?category=ride" },
    { name: "Send a Delivery", href: "/cars?category=delivery" },
  ],
  support: [
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ's", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: BsFacebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: BsInstagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: BsTwitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: BsGithub,
    },
    {
      name: "Dribbble",
      href: "#",
      icon: BsDribbble,
    },
  ],
};
