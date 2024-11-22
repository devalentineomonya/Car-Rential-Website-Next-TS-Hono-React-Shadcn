import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaqData } from "../widgets/faqData";
interface FaqCardProps {
  faqItem: FaqData;
}
const FaqCard: React.FC<FaqCardProps> = ({ faqItem }) => {
  return (
    <Card className="aspect-square rounded-md">
      <CardContent className="p-4 flex flex-col items-center justify-center ">
        {<faqItem.icon size={28} className="text-muted-foreground" />}
        <h1 className="font-medium text-lg text-foreground text-center my-2">{faqItem.name}</h1>
        <p className="text-sm text-muted-foreground text-center">{faqItem.shortDescription}</p>
      </CardContent>
    </Card>
  );
};

export default FaqCard;
