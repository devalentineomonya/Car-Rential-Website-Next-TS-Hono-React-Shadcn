import FaqItem from "@/features/faqSingle/widgets/FaqItem";
import { faqData } from "@/features/faq/widgets/faqData";
import { redirect } from "next/navigation";
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
