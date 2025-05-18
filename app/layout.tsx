import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import FooterMain from "@/components/footer/FooterMain";
import NavbarPrimary from "@/components/navbar/NavbarPrimary";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import ProgressProvider from "@/providers/progress-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${grotesk.className} antialiased relative`}>
          <ProgressProvider>
            <QueryProvider>
              <SheetProvider />
              <ModalProvider />
              <NavbarPrimary />
              {children}
              <FooterMain />
              <Toaster richColors/>
            </QueryProvider>
          </ProgressProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
