import { redirect } from "next/navigation";

import { faqData } from "@/features/faq/widgets/faqData";
import FaqItem from "@/features/faqSingle/widgets/FaqItem";
const FaqSingle = ({ params }: { params: { faq: string } }) => {
  const faqItem = faqData.find(
    (item) =>
      item.name.toLowerCase().replaceAll(" ", "_") ===
      params.faq.toString().toLowerCase()
  );
  if (!faqItem) {
    redirect("/faq");
  }
  return <FaqItem faqItem={faqItem} />;
};

export default FaqSingle;
