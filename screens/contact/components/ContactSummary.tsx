import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { LuPhoneCall, LuMail } from "react-icons/lu";
import {
  RiFacebookLine,
  RiTwitterXLine,
  RiLinkedinFill,
  RiInstagramLine,
} from "react-icons/ri";

const ContactSummary = () => (
  <div className="ml-12 h-full bg-black text-white rounded-md p-12 ">
    <h2 className="font-semibold text-3xl md:text-4xl">Contact Information</h2>
    <p>Say something to start a live chat!</p>
    <ul className="my-12 space-y-5">
      {[
        { icon: <LuPhoneCall size={48} />, text: "(+254) 768 133 220", href: "#" },
        { icon: <LuMail size={48} />, text: "devalentineke@gmail.com", href: "#" },
        { 
          icon: <CiLocationOn size={48} />, 
          text: "1234 Elm Street, Suite 567", 
          extra: <p>Nairobi, Kenya</p>, 
          href: "#",
        },
      ].map(({ icon, text, extra, href }, i) => (
        <li key={i}>
          <Link className="flex items-center gap-x-3" href={href}>
            {icon}
            <div>
              <span>{text}</span>
              {extra}
            </div>
          </Link>
        </li>
      ))}
    </ul>
    <div className="flex gap-x-3">
      {[
        { icon: <RiFacebookLine size={24} />, href: "#" },
        { icon: <RiTwitterXLine size={24} />, href: "#" },
        { icon: <RiLinkedinFill size={24} />, href: "#" },
        { icon: <RiInstagramLine size={24} />, href: "#" },
      ].map(({ icon, href }, i) => (
        <Link
          key={i}
          href={href}
          className="p-2 rounded-full border border-gray-400 grid place-content-center"
        >
          {icon}
        </Link>
      ))}
    </div>
  </div>
);

export default ContactSummary;
