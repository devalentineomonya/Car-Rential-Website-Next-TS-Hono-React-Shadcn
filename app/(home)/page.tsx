import Services from "@/features/home/widgets/testimonials/Testimonials";
import About from "@/features/home/widgets/about/About";
import Banner from "@/features/home/widgets/banner/Banner";
import Featured from "@/features/home/widgets/featured/Featured";
import Hero from "@/features/home/widgets/hero/Hero";
import TopCars from "@/features/home/widgets/topcars/TopCars";
import LearnMore from "@/features/home/widgets/learnmore/LearnMore";
export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <About/>
      <TopCars/>
      <Banner/>
      <Services/>
      <LearnMore/>

    </>
  );
}
