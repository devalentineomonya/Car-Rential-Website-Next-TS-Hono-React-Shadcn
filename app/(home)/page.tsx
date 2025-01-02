import About from "@/screens/home/widgets/about/About";
import Banner from "@/screens/home/widgets/banner/Banner";
import Featured from "@/screens/home/widgets/featured/Featured";
import Hero from "@/screens/home/widgets/hero/Hero";
import LearnMore from "@/screens/home/widgets/learnmore/LearnMore";
import Services from "@/screens/home/widgets/testimonials/Testimonials";
import TopCars from "@/screens/home/widgets/topcars/TopCars";
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
