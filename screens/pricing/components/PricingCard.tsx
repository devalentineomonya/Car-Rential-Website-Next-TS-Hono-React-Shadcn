import { CheckIcon } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { PlanTypes } from "../widgets/pricingData";

interface PricingCardProps {
  plan: PlanTypes;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <Card
      className={cn(
        plan.featured
          ? "bg-white ring-2 ring-gray-700 shadow-md"
          : "bg-gray-700 lg:bg-transparent shadow-none border-none",
        "rounded-lg lg:px-2 lg:pt-4"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle
            className={cn(
              plan.featured ? "text-gray-600" : "text-white",
              "text-sm font-semibold uppercase tracking-wide"
            )}
          >
            {plan.title}
            {plan.featured && (
              <Badge variant="outline" className="ml-2">
                Popular
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
          <div className="mt-3 flex items-center">
            <p
              className={cn(
                plan.featured ? "text-gray-600" : "text-white",
                "text-4xl font-extrabold tracking-tight"
              )}
            >
              ${plan.priceMonthly}
            </p>
            <div className="ml-4">
              <p
                className={cn(
                  plan.featured ? "text-gray-700" : "text-white",
                  "text-sm"
                )}
              >
                USD / mo
              </p>
              <p
                className={cn(
                  plan.featured ? "text-gray-500" : "text-gray-200",
                  "text-sm"
                )}
              >
                Billed yearly (${plan.priceYearly})
              </p>
            </div>
          </div>

          <Button
            className={cn(
              plan.featured
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-white text-gray-600 hover:bg-gray-50",
              "mt-6 w-full sm:mt-0 sm:w-auto lg:mt-6 lg:w-full"
            )}
          >
            Buy {plan.title}
          </Button>
        </div>

        <h4 className="sr-only">Features</h4>
        <ul
          role="list"
          className={cn(
            plan.featured
              ? "border-gray-200 divide-gray-200"
              : "border-gray-500 divide-gray-500 divide-opacity-75",
            "mt-7 border-t divide-y lg:border-t-0"
          )}
        >
          {plan.mainFeatures.map((mainFeature) => (
            <li key={mainFeature.id} className="py-3 flex items-center">
              <CheckIcon
                className={cn(
                  plan.featured ? "text-gray-500" : "text-gray-200",
                  "w-5 h-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  plan.featured ? "text-gray-600" : "text-white",
                  "ml-4 text-sm font-medium"
                )}
              >
                {mainFeature.value}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PricingCard;