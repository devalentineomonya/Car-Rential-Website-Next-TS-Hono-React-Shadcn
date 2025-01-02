import { Car } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiCarKey } from "react-icons/gi";
import { IoCarSportOutline, IoBusinessOutline } from "react-icons/io5";
import { PiFireTruckLight } from "react-icons/pi";

import businessImage from "@/public/images/business-faq.png";
import deliveryImage from "@/public/images/delivery-faq.png";
import driverImage from "@/public/images/driver-faq.png";
import rentImage from "@/public/images/rent-faq.png";
import rideImage from "@/public/images/ride-faq.png";
import wideLoadImage from "@/public/images/wide-load-faq.png";
export const faqData = [
  {
    name: "Ride",
    shortDescription: "Get help with your ride",
    fullDescription:
      "Get comprehensive support and answers about requesting rides, payments, scheduling, lost items, fare splitting, cancellations, driver communication, and our policies to ensure a smooth riding experience.",
    icon: <IoCarSportOutline size={28} className="text-muted-foreground" />,
    image: rideImage,
    faqItems: [
      {
        question: "How do I request a ride?",
        answer:
          "Open the app, enter your destination, select your ride type, and tap 'Request Ride'. You'll be matched with a nearby driver.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept credit/debit cards, PayPal, and digital wallets like Apple Pay and Google Pay. Cash payments are not accepted.",
      },
      {
        question: "How is the fare calculated?",
        answer:
          "Fares are calculated based on distance, time, base fare, and current demand. You'll see the estimated fare before confirming your ride.",
      },
      {
        question: "Can I schedule a ride in advance?",
        answer:
          "Yes, you can schedule rides up to 7 days in advance. Select the 'Schedule' option when booking your ride.",
      },
      {
        question: "What if I left something in the car?",
        answer:
          "Contact our support team immediately through the app's 'Lost & Found' section or report the lost item in your ride history.",
      },
      {
        question: "How do I split the fare with friends?",
        answer:
          "Before the ride ends, tap 'Split Fare' in the app and select the contacts you want to split with. They'll receive a notification to approve.",
      },
      {
        question: "What's the cancellation policy?",
        answer:
          "Free cancellation within 2 minutes of requesting. After that, a small fee may apply. Cancellation fees vary by region.",
      },
      {
        question: "How do I contact my driver?",
        answer:
          "Once matched, use the in-app chat or call feature to contact your driver. Your phone number remains private.",
      },
      {
        question: "Can I request a specific driver?",
        answer:
          "No, our matching system automatically assigns the nearest available driver to ensure fastest pickup times.",
      },
      {
        question: "What's your pet policy?",
        answer:
          "Service animals are always welcome. For other pets, use Deval option where available. Regular rides accept pets at driver's discretion.",
      },
    ],
  },
  {
    name: "Rent",
    shortDescription: "Get help with your rent",
    fullDescription:
      "Get comprehensive support and answers about renting cars, payments, scheduling, lost items, fare splitting, cancellations, driver communication, and our policies to ensure a smooth renting experience.",
    icon: <GiCarKey size={28} className="text-muted-foreground" />,
    image: rentImage,
    faqItems: [
      {
        question: "How do I rent a car?",
        answer:
          "Select 'Rent' in the app, choose your preferred vehicle, rental duration, and pickup location. Complete the booking with your payment method.",
      },
      {
        question: "What documents do I need to rent?",
        answer:
          "You'll need a valid driver's license, proof of insurance, credit card in your name, and must be at least 21 years old (25 for luxury vehicles).",
      },
      {
        question: "Can I extend my rental period?",
        answer:
          "Yes, you can extend through the app up to 24 hours before your scheduled return time, subject to vehicle availability.",
      },
      {
        question: "What's included in the rental price?",
        answer:
          "Basic insurance, maintenance, 24/7 roadside assistance, and a set number of miles per day. Additional insurance and unlimited miles are available.",
      },
      {
        question: "How does the fuel policy work?",
        answer:
          "Return the car with the same fuel level as pickup. We'll charge a service fee plus fuel costs if returned with less fuel.",
      },
      {
        question: "What happens if I return the car late?",
        answer:
          "Late returns incur an hourly fee for the first 2 hours, then a full day's rate. Please notify us if you'll be late.",
      },
      {
        question: "Is there a mileage limit?",
        answer:
          "Yes, standard rentals include 200 miles per day. Additional miles are charged at $0.35 per mile unless you opt for unlimited mileage.",
      },
      {
        question: "Can I pick up and return at different locations?",
        answer:
          "Yes, one-way rentals are available for an additional fee. Select different pickup and drop-off locations during booking.",
      },
      {
        question: "What's your damage policy?",
        answer:
          "Document any existing damage before departure. You're responsible for new damage during your rental period. Premium insurance can cover most incidents.",
      },
      {
        question: "How do I report issues during rental?",
        answer:
          "Use the 24/7 support feature in the app or call our emergency hotline. For mechanical issues, we'll arrange immediate assistance or replacement vehicle.",
      },
    ],
  },
  {
    name: "DevalRide for Business",
    shortDescription: "Get help with your business",
    fullDescription:
      "Get comprehensive support and answers about setting up a business account, managing employees, billing, safety features, travel policies, reporting, and other business-specific needs to ensure a smooth business travel experience.",
    icon: <IoBusinessOutline size={28} className="text-muted-foreground" />,
    image: businessImage,
    faqItems: [
      {
        question: "How do I set up a business account?",
        answer:
          "Visit our business portal, click 'Register', and provide your company details. Our team will verify your information within 24 hours and set up your corporate account.",
      },
      {
        question: "What are the benefits of a business account?",
        answer:
          "Benefits include consolidated billing, employee ride tracking, customizable travel policies, dedicated account manager, and special corporate rates.",
      },
      {
        question: "Can I manage multiple employees?",
        answer:
          "Yes, you can add unlimited employees, set individual ride policies, spending limits, and generate detailed reports for each user or department.",
      },
      {
        question: "How does billing work for business accounts?",
        answer:
          "Choose between monthly consolidated invoicing or immediate payment per ride. We provide detailed expense reports and integrate with major expense management systems.",
      },
      {
        question: "What safety features are available for employees?",
        answer:
          "We offer priority support, driver verification, ride monitoring, emergency assistance, and real-time trip sharing for all business rides.",
      },
      {
        question: "Can I customize travel policies?",
        answer:
          "Yes, set specific rules for ride types, maximum fares, service areas, and time restrictions. You can create different policies for various employee groups.",
      },
      {
        question: "How do I get detailed reports?",
        answer:
          "Access comprehensive analytics through our business dashboard, including usage patterns, spending trends, and sustainability metrics. Export reports in multiple formats.",
      },
      {
        question: "Is there a minimum company size requirement?",
        answer:
          "We serve businesses of all sizes, from startups to enterprises. Different plans are available based on your company's needs and usage volume.",
      },
      {
        question: "Can we use DevalRide internationally?",
        answer:
          "Yes, business accounts work across all our operating countries. Manage international travel with consistent policies and centralized billing.",
      },
      {
        question: "What support is available for business accounts?",
        answer:
          "24/7 priority support, dedicated account manager, onboarding assistance, and regular business reviews to optimize your account.",
      },
    ],
  },
  {
    name: "Delivery",
    shortDescription: "Get help with your delivery",
    fullDescription:
      "Get comprehensive support and answers about scheduling deliveries, package types, pricing, tracking, insurance, recurring deliveries, same-day deliveries, package preparation, and other delivery-specific needs to ensure a smooth delivery experience.",
    icon: <CiDeliveryTruck size={28} className="text-muted-foreground" />,
    image: deliveryImage,
    faqItems: [
      {
        question: "How do I schedule a delivery?",
        answer:
          "Open the app, select 'Delivery', enter pickup and drop-off locations, package details, and preferred delivery time. You'll be matched with a nearby driver.",
      },
      {
        question: "What types of items can I send?",
        answer:
          "We accept most packages under 50kg that fit in our vehicles. Prohibited items include dangerous goods, illegal items, and perishables. Check our terms for full details.",
      },
      {
        question: "How is the delivery price calculated?",
        answer:
          "Pricing is based on distance, package size/weight, delivery urgency, and current demand. You'll see the total cost before confirming your delivery.",
      },
      {
        question: "Can I track my delivery?",
        answer:
          "Yes, track your package in real-time through the app. You'll receive notifications for pickup, transit updates, and successful delivery.",
      },
      {
        question: "What's the maximum package size?",
        answer:
          "Standard deliveries accept packages up to 100x100x100cm and 50kg. For larger items, use our 'Wide Load' service.",
      },
      {
        question: "Is insurance included?",
        answer:
          "Basic coverage up to $100 is included. Additional insurance can be purchased for valuable items. Declare item value during booking.",
      },
      {
        question: "What if my package is damaged?",
        answer:
          "Report damage immediately through the app with photos. Our support team will investigate and process claims within 48 hours.",
      },
      {
        question: "Can I schedule recurring deliveries?",
        answer:
          "Yes, set up daily, weekly, or monthly recurring deliveries through our business portal. Ideal for regular shipments.",
      },
      {
        question: "Do you offer same-day delivery?",
        answer:
          "Yes, same-day delivery is available for orders placed before 2 PM within the same city. Express delivery options are also available.",
      },
      {
        question: "How do I prepare my package?",
        answer:
          "Ensure proper packaging with adequate protection. Label clearly with delivery details. Our driver will verify package condition at pickup.",
      },
    ],
  },
  {
    name: "Wide Load",
    shortDescription: "Get help with your wide load",
    fullDescription:
      "Get comprehensive support and answers about what qualifies as a wide load, special permits, booking requirements, escort vehicles, safety measures, pricing, route planning, cargo insurance, and tracking to ensure a smooth wide load transportation experience.",
    icon: <PiFireTruckLight size={28} className="text-muted-foreground" />,
    image: wideLoadImage,
    faqItems: [
      {
        question: "What qualifies as a wide load?",
        answer:
          "Any load exceeding standard vehicle dimensions: width over 2.5m, height over 4.3m, or length over 12m. This includes machinery, construction equipment, and oversized cargo.",
      },
      {
        question: "Do I need special permits?",
        answer:
          "Yes, we handle all necessary permits for wide load transportation. We'll secure required documentation based on your cargo dimensions and route.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "Book at least 5 business days ahead to allow time for route planning, permit acquisition, and escort arrangement. Rush service available for urgent requests.",
      },
      {
        question: "Are escort vehicles provided?",
        answer:
          "Yes, we provide pilot vehicles when required by regulations. The number of escorts depends on load size and route requirements.",
      },
      {
        question: "What safety measures are in place?",
        answer:
          "We use warning flags, lights, and signage as required. Our drivers are specially certified for wide load transport and follow strict safety protocols.",
      },
      {
        question: "How is pricing determined?",
        answer:
          "Pricing depends on load dimensions, weight, distance, permits required, escort vehicles needed, and route complexity. We provide detailed quotes after assessment.",
      },
      {
        question: "What routes can wide loads take?",
        answer:
          "Routes are carefully planned considering bridge heights, road widths, and local regulations. We conduct thorough route surveys for challenging loads.",
      },
      {
        question: "Is my cargo insured?",
        answer:
          "Yes, comprehensive insurance is included. Coverage limits depend on cargo value. Additional coverage available for high-value items.",
      },
      {
        question: "What time can wide loads travel?",
        answer:
          "Most wide load movements are restricted to daylight hours and may have additional time restrictions in urban areas or during peak traffic.",
      },
      {
        question: "How do I track my wide load?",
        answer:
          "Real-time GPS tracking is provided through our app. Get updates on location, estimated arrival time, and any route adjustments.",
      },
    ],
  },
  {
    name: "Become a Driver",
    shortDescription: "Get help with becoming a driver",
    fullDescription:
      "Get comprehensive support and answers about the requirements to become a driver, applying, earning potential, vehicle requirements, insurance, payment methods, schedule flexibility, training, and support to ensure a smooth driver experience.",
    icon: <Car size={28} className="text-muted-foreground" />,
    image: driverImage,
    faqItems: [
      {
        question: "What are the requirements to become a driver?",
        answer:
          "Must be at least 21 years old, have a valid driver's license, clean driving record, pass background check, and own or have access to an eligible vehicle.",
      },
      {
        question: "How do I apply?",
        answer:
          "Complete the online application form, upload required documents (license, insurance, vehicle registration), and schedule an orientation session. We'll guide you through the process.",
      },
      {
        question: "How much can I earn?",
        answer:
          "Earnings vary based on hours worked, location, and service type. Drivers typically earn $15-30 per hour before expenses. Bonuses available for peak hours and high ratings.",
      },
      {
        question: "What vehicle requirements are there?",
        answer:
          "Vehicle must be less than 10 years old, pass safety inspection, have 4 doors, working AC, and meet our comfort standards. Different services may have additional requirements.",
      },
      {
        question: "Do you provide insurance?",
        answer:
          "We provide commercial insurance coverage while you're actively driving for DevalRide. Personal auto insurance is required when offline.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Earnings are deposited weekly to your linked bank account. Instant payouts available for a small fee. Track earnings real-time in the driver app.",
      },
      {
        question: "Can I choose my own schedule?",
        answer:
          "Yes, work whenever you want with complete flexibility. Set your own hours and choose which ride requests to accept.",
      },
      {
        question: "What training is provided?",
        answer:
          "Comprehensive online training covering app usage, safety protocols, customer service, and local regulations. In-person orientation available in major cities.",
      },
      {
        question: "What support is available for drivers?",
        answer:
          "24/7 driver support, emergency assistance, dedicated driver success team, and access to driver community forums and resources.",
      },
      {
        question: "Can I drive for multiple services?",
        answer:
          "Yes, you can drive for other platforms. However, priority may be given to drivers who maintain high activity levels with DevalRide.",
      },
    ],
  },
];

export type FaqData = (typeof faqData)[0];
