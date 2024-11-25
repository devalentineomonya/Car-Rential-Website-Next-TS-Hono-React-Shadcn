import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaqData } from "../widgets/faqData";
import Link from "next/link";
interface FaqCardProps {
  faqItem: FaqData;
}
const FaqCard: React.FC<FaqCardProps> = ({ faqItem }) => {
  return (
    <Link href={`/faq/${faqItem.name.toLowerCase().replaceAll(" ", "_")}`}>
      <Card className="aspect-square rounded-md">
        <CardContent className="p-4 flex flex-col items-center justify-center ">
          {faqItem.icon}
          <h1 className="font-medium text-lg text-foreground text-center my-2">
            {faqItem.name}
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            {faqItem.shortDescription}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FaqCard;
