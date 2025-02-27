import Image from "next/image";
import Link from "next/link";
import React from "react";
const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pr-2 mt-24 max-lg:px-2 min-h-screen">
      <h1 className="text-2xl font-bold">Are you Lost?</h1>
      <Image src="/images/notFound.png" alt="404" width={500} height={500} />
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-500">
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFound;
