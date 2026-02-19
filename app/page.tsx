import Hero from "@/components/Hero";
import RecentlyViewed from "@/components/products/RecentlyViewed";
import Reveal from "@/components/effects/Reveal";

export default function Home() {
  return (
    <Reveal>
      {/* <Navbar /> */}
      <Hero />
      <RecentlyViewed />
    </Reveal>
  );
}
