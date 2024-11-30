import React from "react";

import { FaqData } from "@/features/faq/widgets/faqData";

const FaqDescription = ({ faqItem }: { faqItem: FaqData }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-foreground my-6 ">
        Support Resources for {faqItem.name}
      </h2>
      <p className="text-muted-foreground text-sm my-3">
        {faqItem.shortDescription}
      </p>
      <p className="text-muted-foreground text-sm">{faqItem.fullDescription}</p>
    </div>
  );
};

export default FaqDescription;
