import { CheckIcon, XIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { FeatureTypes, PerkTypes, PlanTypes } from "../widgets/pricingData";

const FakeCardBackground: React.FC<{ featured?: boolean }> = ({ featured }) => (
  <div
    aria-hidden="true"
    className="hidden absolute inset-0 pointer-events-none sm:block"
  >
    <div
      className={cn(
        featured ? "shadow-md" : "shadow",
        "absolute right-0 w-1/2 h-full bg-white rounded-lg"
      )}
    />
  </div>
);

const FakeCardBorder: React.FC<{ featured?: boolean }> = ({ featured }) => (
  <div
    aria-hidden="true"
    className="hidden absolute inset-0 pointer-events-none sm:block"
  >
    <div
      className={cn(
        featured
          ? "ring-2 ring-gray-600"
          : "ring-1 ring-black ring-opacity-5",
        "absolute right-0 w-1/2 h-full rounded-lg"
      )}
    />
  </div>
);

const CheckmarkCell: React.FC<{ value: boolean }> = ({ value }) => (
  <>
    {value ? (
      <CheckIcon
        className="mx-auto h-5 w-5 text-gray-600"
        aria-hidden="true"
      />
    ) : (
      <XIcon
        className="mx-auto h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    )}
    <span className="sr-only">{value ? "Yes" : "No"}</span>
  </>
);

const PricingSection: React.FC<{
  title: string;
  items: Array<FeatureTypes | PerkTypes>;
  planIndex: number;
  featured?: boolean;
  isFeature?: boolean;
}> = ({ title, items, planIndex, featured, isFeature }) => (
  <>
    <h4 className="mt-10 text-sm font-bold text-gray-900">{title}</h4>
    <div className="mt-6 relative">
      <FakeCardBackground featured={featured} />
      <div
        className={cn(
          featured
            ? "ring-2 ring-gray-600 shadow-md"
            : "ring-1 ring-black ring-opacity-5 shadow",
          "relative py-3 px-4 bg-white rounded-lg sm:p-0 sm:bg-transparent sm:rounded-none sm:ring-0 sm:shadow-none"
        )}
      >
        <dl className="divide-y divide-gray-200">
          {items.map((item) => (
            <div
              key={item.title}
              className="py-3 flex items-center justify-between sm:grid sm:grid-cols-2"
            >
              <dt className="pr-4 text-sm font-medium text-gray-600">
                {item.title}
              </dt>
              <dd className="flex items-center justify-end sm:px-4 sm:justify-center">
                {isFeature && typeof item.tiers[planIndex].value === "string" ? (
                  <span
                    className={cn(
                      item.tiers[planIndex].featured
                        ? "text-gray-600"
                        : "text-gray-900",
                      "text-sm font-medium"
                    )}
                  >
                    {item.tiers[planIndex].value}
                  </span>
                ) : (
                  <CheckmarkCell value={item.tiers[planIndex].value === true} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <FakeCardBorder featured={featured} />
    </div>
  </>
);

const MobilePricing: React.FC<{
  plans: PlanTypes[];
  features: FeatureTypes[];
  perks: PerkTypes[];
}> = ({ plans, features, perks }) => {
  return (
    <section
      aria-labelledby="mobile-comparison-heading"
      className="lg:hidden relative mt-16 pb-24 max-lg:px-2"
    >
      {plans.map((plan, planIndex) => (
        <div key={plan.title} className="border-t border-gray-200">
          <div
            className={cn(
              plan.featured ? "border-gray-600" : "border-transparent",
              "-mt-px pt-6 border-t-2 sm:w-1/2"
            )}
          >
            <h3
              className={cn(
                plan.featured ? "text-gray-600" : "text-gray-900",
                "text-sm font-bold"
              )}
            >
              {plan.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
          </div>

          <PricingSection
            title="Catered for business"
            items={features}
            planIndex={planIndex}
            featured={plan.featured}
            isFeature={true}
          />

          <PricingSection
            title="Other perks"
            items={perks}
            planIndex={planIndex}
            featured={plan.featured}
          />
        </div>
      ))}
    </section>
  );
};

export default MobilePricing;