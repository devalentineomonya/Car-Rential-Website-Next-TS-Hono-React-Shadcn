import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  Shield,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/common/layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <header className="sticky top-0 z-50 w-full border-b bg-white">
          <div className="container flex h-10 items-center justify-between mx-auto">
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-6">
                <Link
                  href="#benefits"
                  className="text-sm font-medium hover:text-black/70"
                >
                  Benefits
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:text-black/70"
                >
                  How it works
                </Link>
                <Link
                  href="#requirements"
                  className="text-sm font-medium hover:text-black/70"
                >
                  Requirements
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium hover:text-black/70"
                >
                  FAQ
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/become-a-driver/register">Sign up to drive</Link>
              </Button>
            </div>
          </div>
        </header>
      </MainLayout>

      <main className="flex-1">
        <div className="relative h-[600px] isolate">
          <div className=" absolute h-full w-full top-0 left-0 bg-black/40 backdrop-blur-sm -z-10" />
          <Image
            src="/images/become-a-driver-banner.png"
            alt="Driver on the road"
            fill
            className="object-cover"
            priority
          />
          <MainLayout className="relative">
            <div className="relative h-[600px]"></div>
            <div className="container absolute inset-0 z-20 flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Drive and earn on your schedule
                </h1>
                <p className="mt-6 text-lg">
                  Join thousands of drivers making money with DevalRide. Flexible
                  hours, weekly payouts, and support when you need it.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="default" asChild>
                    <Link href="/become-a-driver/register">
                      Sign up to drive
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </MainLayout>
        </div>
        <MainLayout>
          <div>
            <section id="benefits" className="py-16 bg-white">
              <div className="container">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Why drive with DevalRide?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center p-6 rounded-lg border">
                    <DollarSign className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Earn more</h3>
                    <p className="text-gray-600">
                      Competitive rates and low commission fees mean more money
                      in your pocket.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 rounded-lg border">
                    <Clock className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Flexible hours
                    </h3>
                    <p className="text-gray-600">
                      Drive whenever you want. No minimum hours or schedules.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 rounded-lg border">
                    <CreditCard className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Weekly payouts
                    </h3>
                    <p className="text-gray-600">
                      Get paid weekly directly to your bank account.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="how-it-works" className="py-16 bg-gray-50">
              <div className="container">
                <h2 className="text-3xl font-bold text-center mb-12">
                  How it works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Sign up</h3>
                    <p className="text-gray-600">
                      Complete our simple online application with your details
                      and documents.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Get approved</h3>
                    <p className="text-gray-600">
                      Our team will review your application and get you on the
                      road quickly.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Start driving
                    </h3>
                    <p className="text-gray-600">
                      Download the driver app, go online, and start earning.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="requirements" className="py-16 bg-white">
              <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">
                      Requirements to drive
                    </h2>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold">
                            Valid driver's license
                          </h4>
                          <p className="text-gray-600">
                            You must have a valid driver's license for at least
                            1 year
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Car className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold">Eligible vehicle</h4>
                          <p className="text-gray-600">
                            Your car must be less than 10 years old and in good
                            condition
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Smartphone className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold">Smartphone</h4>
                          <p className="text-gray-600">
                            You'll need a smartphone with iOS 13+ or Android
                            7.0+
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold">City eligibility</h4>
                          <p className="text-gray-600">
                            You must be eligible to work in the city where you
                            want to drive
                          </p>
                        </div>
                      </li>
                    </ul>
                    <Button
                      className="mt-8 bg-gray-500 hover:bg-gray-600"
                      asChild
                    >
                      <Link href="/become-a-driver/register">
                        Check your eligibility
                      </Link>
                    </Button>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Driver using the app"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 bg-gray-500 text-white">
              <div className="container text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Ready to start earning?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Join thousands of drivers who are already making money on
                  their own schedule.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-gray-500 hover:bg-white/90"
                  asChild
                >
                  <Link href="/become-a-driver/register">
                    Sign up to drive
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>

            <section id="faq" className="py-16 bg-gray-50">
              <div className="container">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Frequently asked questions
                </h2>
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      How much can I earn?
                    </h3>
                    <p className="text-gray-600">
                      Earnings vary depending on your location, hours, and the
                      number of trips you complete. Many drivers earn between
                      $15-25 per hour before expenses.
                    </p>
                  </div>
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      How do I get paid?
                    </h3>
                    <p className="text-gray-600">
                      You'll receive weekly payments directly to your bank
                      account for all trips completed.
                    </p>
                  </div>
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Do I need my own car?
                    </h3>
                    <p className="text-gray-600">
                      Yes, you'll need to have access to an eligible vehicle
                      that meets our requirements. In some cities, we offer
                      vehicle rental options.
                    </p>
                  </div>
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      How long does approval take?
                    </h3>
                    <p className="text-gray-600">
                      Most applications are processed within 3-5 business days,
                      depending on document verification and background checks.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </MainLayout>
      </main>
    </>
  );
}
