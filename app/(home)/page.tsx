import About from "@/features/home/widgets/about/About";
import Featured from "@/features/home/widgets/featured/Featured";
import Hero from "@/features/home/widgets/hero/Hero";
import TopCars from "@/features/home/widgets/topcars/TopCars";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <About/>
      <TopCars/>
    </>
  );
}
