import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqData } from "@/features/faq/widgets/faqData";
const FaqAccordion = ({ faqItem }: { faqItem: FaqData }) => {
  return (
    <div className="mt-12">
      {faqItem.faqItems.map((item) => (
        <Accordion type="multiple" key={item.question}>
          <AccordionItem value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqAccordion;
