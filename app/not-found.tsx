import Image from "next/image";
import Link from "next/link";
import React from "react";

import notFoundImage from "@/public/images/notFound.png";

const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pr-2 mt-24 max-lg:px-2 min-h-[60dvh]">
      <h1 className="text-2xl font-bold">Are you Lost?</h1>
      <Image
        src={notFoundImage}
        alt="404"
        width={500}
        height={500}
        priority
        className="my-4"
      />
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block py-2 bg-primary text-white px-4 rounded-md mt-4"
      >
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFound;
