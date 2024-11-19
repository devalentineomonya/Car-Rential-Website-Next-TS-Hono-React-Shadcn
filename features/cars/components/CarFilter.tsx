import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiPlus } from "react-icons/fi";
const CarFilter = () => {
  return (
    <div className="sm:col-span-3">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="[&[data-state=open]>.chevronPlus]:rotate-45" icon={<FiPlus className="chevronPlus" />}>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CarFilter;
