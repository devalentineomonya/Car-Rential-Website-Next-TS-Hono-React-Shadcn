import MainLayout from "@/components/common/layouts/MainLayout";
import DesktopPricing from "../components/DesktopPricing";
import MobilePricing from "../components/MobilePricing";
import PricingCard from "../components/PricingCard";
import { rentalPlans, rentalFeatures, rentalPerks } from "./pricingData";

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="relative mt-12 px-2">
        {/* <div
          aria-hidden="true"
          className="hidden absolute top-4 bottom-6 left-0 right-0 inset-0 bg-gray-700 rounded-tl-lg rounded-tr-lg lg:block"
        /> */}

        {/* Pricing Cards Section */}
        <div className="relative max-lg:space-y-6 lg:grid lg:grid-cols-3 lg:gap-8">
          {rentalPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              plan={{
                ...plan,
                priceLabel: `/day`,
                periodLabel: "Weekly discount",
                pricePeriod: plan.priceWeekly,
              }}
            />
          ))}
        </div>

        {/* Pricing Comparison Tables */}
        <div className="mt-16">
          <MobilePricing
            plans={rentalPlans}
            features={rentalFeatures}
            perks={rentalPerks}
          />

          <DesktopPricing
            plans={rentalPlans}
            features={rentalFeatures}
            perks={rentalPerks}
          />
        </div>
      </div>
    </MainLayout>
  );
}
