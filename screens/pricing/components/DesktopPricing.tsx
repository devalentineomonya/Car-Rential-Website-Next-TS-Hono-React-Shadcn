import { CheckIcon, XIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { PlanTypes, FeatureTypes, PerkTypes } from "../widgets/pricingData";

const FakeCardBackgrounds: React.FC<{ plans: PlanTypes[] }> = ({ plans }) => (
  <div
    className="absolute inset-0 flex items-stretch pointer-events-none"
    aria-hidden="true"
  >
    <div className="w-1/4 pr-4" />
    {plans.map((plan, index) => (
      <div
        key={plan.title}
        className={cn(index === plans.length - 1 ? "pl-4" : "px-4", "w-1/4")}
      >
        <div
          className={cn(
            "w-full h-full bg-white rounded-lg",
            plan.featured ? "shadow-md" : "shadow",
          )}
        />
      </div>
    ))}
  </div>
);

const FakeCardBorders: React.FC<{ plans: PlanTypes[] }> = ({ plans }) => (
  <div
    className="absolute inset-0 flex items-stretch pointer-events-none"
    aria-hidden="true"
  >
    <div className="w-1/4 pr-4" />
    {plans.map((plan, index) => (
      <div
        key={plan.title}
        className={cn(index === plans.length - 1 ? "pl-4" : "px-4", "w-1/4")}
      >
        <div
          className={cn(
            "w-full h-full rounded-lg",
            plan.featured
              ? "ring-2 ring-gray-600 ring-opacity-100"
              : "ring-1 ring-black ring-opacity-5",
          )}
        />
      </div>
    ))}
  </div>
);

const RenderCell: React.FC<{
  value: string | boolean;
  featured?: boolean;
}> = ({ value, featured }) => {
  if (typeof value === "string") {
    return (
      <span
        className={cn(
          featured ? "text-gray-600" : "text-gray-900",
          "text-sm font-medium",
        )}
      >
        {value}
      </span>
    );
  }

  return (
    <>
      {value === true ? (
        <CheckIcon
          className="mx-auto h-5 w-5 text-gray-600"
          aria-hidden="true"
        />
      ) : (
        <XIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />
      )}
      <span className="sr-only">{value === true ? "Yes" : "No"}</span>
    </>
  );
};

const ComparisonTable: React.FC<{
  items: Array<FeatureTypes | PerkTypes>;
  plans: PlanTypes[];
  isFeature?: boolean;
}> = ({ items, plans, isFeature }) => (
  <div className="mt-6 relative">
    <FakeCardBackgrounds plans={plans} />

    <table className="relative w-full">
      <caption className="sr-only">
        {isFeature ? "Business feature" : "Perk"} comparison
      </caption>
      <thead>
        <tr className="text-left">
          <th scope="col">
            <span className="sr-only">{isFeature ? "Feature" : "Perk"}</span>
          </th>
          {plans.map((plan) => (
            <th key={plan.title} scope="col">
              <span className="sr-only">{plan.title} plan</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {items.map((item) => (
          <tr key={item.title}>
            <th
              scope="row"
              className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-600"
            >
              {item.title}
            </th>
            {item.tiers.map((tier, index) => (
              <td
                key={tier.title}
                className={cn(
                  index === item.tiers.length - 1 ? "pl-4" : "px-4",
                  "relative w-1/4 py-0 text-center",
                )}
              >
                <span className="relative w-full h-full py-3">
                  <RenderCell
                    value={tier.value}
                    featured={tier.featured && isFeature}
                  />
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <FakeCardBorders plans={plans} />
  </div>
);

const DesktopPricing: React.FC<{
  plans: PlanTypes[];
  features: FeatureTypes[];
  perks: PerkTypes[];
}> = ({ plans, features, perks }) => {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="hidden lg:block pb-24"
    >
      <h2 id="comparison-heading" className="sr-only">
        Feature comparison
      </h2>

      <div className="mt-24">
        <div className="w-full border-t border-gray-200 flex items-stretch">
          <div className="-mt-px w-1/4 py-6 pr-4 flex items-end">
            <h3 className="mt-auto text-sm font-bold text-gray-900">
              Catered for business
            </h3>
          </div>
          {plans.map((plan, index) => (
            <div
              key={plan.title}
              aria-hidden="true"
              className={cn(
                index === plans.length - 1 ? "" : "pr-4",
                "-mt-px pl-4 w-1/4",
              )}
            >
              <div
                className={cn(
                  plan.featured ? "border-gray-600" : "border-transparent",
                  "py-6 border-t-2",
                )}
              >
                <p
                  className={cn(
                    plan.featured ? "text-gray-600" : "text-gray-900",
                    "text-sm font-bold",
                  )}
                >
                  {plan.title}
                </p>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
            </div>
          ))}
        </div>

        <ComparisonTable items={features} plans={plans} isFeature={true} />

        <h3 className="mt-10 text-sm font-bold text-gray-900">Other perks</h3>
        <ComparisonTable items={perks} plans={plans} />
      </div>
    </section>
  );
};

export default DesktopPricing;
