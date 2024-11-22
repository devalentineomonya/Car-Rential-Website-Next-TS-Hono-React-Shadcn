"use client";
import FaqItem from "@/features/faqSingle/widgets/FaqItem";
import { useParams, useRouter } from "next/navigation";
import { faqData } from "@/features/faq/widgets/faqData";
const FaqSingle = () => {
  const router = useRouter();
  const params = useParams();
  const faq = params?.faq;
  console.log(faq);
  const faqItem = faqData.find(
    (item) =>
      item.name.toLowerCase().replaceAll(" ", "_") ===
      faq?.toString().toLowerCase()
  );
  if (!faqItem) {
    return router.push("/faq");
    
  }
  return <FaqItem faqItem={faqItem} />;
};

export default FaqSingle;
