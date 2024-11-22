import { useRouter } from "next/router";
import React from "react";
import { faqData } from "@/features/faq/widgets/faqData";
const Faq = () => {
  const router = useRouter();
  const { faq } = router.query;
  const faqItem = faqData.find((item) => item.name === faq);
  if (!faqItem) {
    router.push("/faqs");
  }

  return (
 <
  );
};

export default Faq;
