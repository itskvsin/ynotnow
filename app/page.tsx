import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LastBg from "@/components/LastBg";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <Navbar />
    <Hero />
    <About />
    <LastBg />
    <Footer />
  </div>);
}
