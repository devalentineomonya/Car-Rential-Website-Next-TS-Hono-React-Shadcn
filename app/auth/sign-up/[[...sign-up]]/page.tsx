import dynamic from "next/dynamic";
const ClerkLoaded = dynamic(() => import("@clerk/nextjs").then(mod => mod.ClerkLoaded), { ssr: false });
const ClerkLoading = dynamic(() => import("@clerk/nextjs").then(mod => mod.ClerkLoading), { ssr: false });
const SignUp = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignUp), { ssr: false });
import Image from "next/image";
import { RiLoader5Line } from "react-icons/ri";
import Logo from "@/public/images/logo.png";
export default function Page() {
  return (
      <div className="min-h-screen grid grid-cols-12">
        <div className="col-span-7 h-full bg-blue-700 dark:bg-blue-900 hidden lg:flex items-center justify-center">
          <Image src={Logo} alt="Car Rental" className="w-96" />
        </div>
        <div className="col-span-12 lg:col-span-5 h-full lg:flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-4 pt-16">
            <h1 className="font-bold text-3xl text-foreground">
              Welcome to Deval Ride
            </h1>
            <p className="text-base text-muted-foreground">
              Login or create account to get back to your dashboard!
            </p>
          </div>
          <div className="flex items-center justify-center mt-8 bg-background">
            <ClerkLoaded>
              <SignUp path="/auth/sign-up" />
            </ClerkLoaded>
            <ClerkLoading>
              <RiLoader5Line
                size={28}
                className="animate-spin text-muted-foreground"
              />
            </ClerkLoading>
          </div>
        </div>
      </div>
  );
}
