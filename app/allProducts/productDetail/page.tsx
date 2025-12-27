import ProductDetailSection from "@/components/product/ProductDetailSection";
import ProductMetaSection from "@/components/product/ProductMetaSection";
import { Product } from "@/types/product";
import FeaturesGrid from "@/components/commonDetail/FeaturesGrid";
import About from "@/components/commonDetail/About";
import LastBg from "@/components/commonDetail/LastBg";
import Footer from "@/components/layout/Footer";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";

const mockProduct: Product = {
  id: "1",
  title: "Ynotnow Origin Hoodie",
  description:
    "Crafted with care for you and the planet, every Miky formula is made in Korea and certified organic and natural by Ecocert",
  price: 2299,
  inStock: true,
  sizes: ["XXL", "XL", "L", "S"],
  colors: ["#000000", "#FFFFFF", "#D6C5B8", "#0A1A4F"],
  images: [
    { id: "1", url: "/images/hoodies/grayHoodie.png" },
    { id: "2", url: "/images/hoodies/grayBgHoodie.jpg" },
    { id: "3", url: "/images/hoodies/blueHoodie.png" },
  ],
};

export default function Page() {
  return (
    <>
      <ProductDetailSection product={mockProduct} />
      <ProductMetaSection
        inStock={true}
        benefits={[
          {
            id: "1",
            title: "Sign In for Free Shipping",
            description: "Log in to check your order qualifies",
            icon: "📦",
          },
          {
            id: "2",
            title: "Worldwide Delivery",
            description: "We ship globally with tracking",
            icon: "🌍",
          },
          {
            id: "3",
            title: "White-Label Ready",
            description: "Perfect for your brand",
            icon: "🏷️",
          },
          {
            id: "4",
            title: "Low MOQ, High Flexibility",
            description: "Start with as few as 50 units",
            icon: "💲",
          },
        ]}
        accordionItems={[
          { id: "f", title: "FEATURES", content: "Product features here" },
          { id: "c", title: "COMPOSITION & CARE", content: "Care details" },
          { id: "d", title: "DELIVERY", content: "Shipping details" },
        ]}
      />

      <div>
        {" "}
        <ProductShowcaseClone />
        <FeaturesGrid />
        <About />
        <LastBg />
        <Footer />
      </div>
    </>
  );
}
