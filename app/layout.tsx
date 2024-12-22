import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Footer from "@/components/common/footer/Footer";
import NavbarMain from "@/components/common/navbar/NavbarMain";
import { Toaster } from "@/components/ui/sonner";
import ProgressProvider from "@/providers/progress-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
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
    <html lang="en">
      <body className={`${grotesk.className} antialiased relative`}>
        <ClerkProvider>
          <ProgressProvider>
            <QueryProvider>

              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SheetProvider/>
                <ModalProvider/>
                <NavbarMain />
                {children}
                <Footer />
                <Toaster />
              </ThemeProvider>
            </QueryProvider>
          </ProgressProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
