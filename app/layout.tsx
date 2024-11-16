import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
// import {  ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import NavbarMain from "@/components/common/Navbar/NavbarMain";
import Footer from "@/components/common/Footer/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
const grotesk = Space_Grotesk({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deval Ride App | Book Instant Rides to Your Destination",
  description:
    "Experience the convenience of booking instant rides with Deval Ride App. Get to your destination quickly and safely with our reliable ride-booking service. Join us today and enjoy seamless travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>

    <html lang="en">
      <body className={`${grotesk.className} antialiased relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarMain />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}
