import MainLayout from "@/components/common/layouts/MainLayout";

import DesktopPricing from "../components/DesktopPricing";
import MobilePricing from "../components/MobilePricing";
import PricingCard from "../components/PricingCard";

import { plans, features, perks } from "./pricingData";

export default function Example() {
  return (
    <MainLayout>
      <div className="relative mt-12 px-2">
        <div
          aria-hidden="true"
          className="hidden absolute top-4 bottom-6 left-0 right-0 inset-0 bg-gray-700 rounded-tl-lg rounded-tr-lg lg:block"
        />

        <div className="relative max-lg:space-y-6 lg:grid lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </div>
      <MobilePricing plans={plans} features={features} perks={perks} />
      <DesktopPricing plans={plans} features={features} perks={perks} />
    </MainLayout>
  );
}
