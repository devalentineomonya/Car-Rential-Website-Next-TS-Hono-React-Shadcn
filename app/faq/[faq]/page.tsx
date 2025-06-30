import {redirect} from "next/navigation";

import {faqData} from "@/screens/faq/widgets/faqData";
import FaqItem from "@/screens/faqSingle/widgets/FaqItem";
const FaqSingle = async ({params}: {params: Promise<{faq: string}>}) => {
    const {faq} = await params;
    const faqItem = faqData.find(
        (item) =>
            item.name.toLowerCase().replaceAll(" ", "_") ===
            faq.toString().toLowerCase(),
    );
    if (!faqItem) {
        redirect("/faq");
    }
    return <FaqItem faqItem={faqItem} />;
};

export default FaqSingle;
