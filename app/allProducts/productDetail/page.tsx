import ProductDetailSection from "@/components/product/ProductDetailSection";
import ProductMetaSection from "@/components/product/ProductMetaSection";
import { Product } from "@/types/product";
import FeaturesGrid from "@/components/commonDetail/FeaturesGrid";
import About from "@/components/commonDetail/About";
import LastBg from "@/components/commonDetail/LastBg";
import Footer from "@/components/layout/Footer";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";
import BreadCrumbNav from "@/components/BreadCrumbNav";

import { PiPackageLight } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { PiTagSimple } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";

import { MdOutlineContentPasteSearch } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import ProductInfo from "@/components/product/ProductInfo";

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
    { id: "4", url: "/images/hoodies/grayHoodie.png" },
    { id: "5", url: "/images/hoodies/grayBgHoodie.jpg" },
    { id: "6", url: "/images/hoodies/blueHoodie.png" },
  ],
};

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pl-4 lg:pl-14">
        <BreadCrumbNav />
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className=" grid grid-cols-1 lg:grid-cols-2 ">
          {/* LEFT — Product Images */}
          <ProductDetailSection product={mockProduct} />
          <div>
            <div className="hidden sm:block">
              <ProductInfo product={mockProduct} />
            </div>
            {/* RIGHT — Product Meta */}
            <ProductMetaSection
              stock={{ total: 50, remaining: 7 }}
              benefits={[
                {
                  id: "1",
                  title: "Sign In for Free Shipping",
                  description:
                    "Log in to check if your order qualifies for free bulk shipping.",
                  icon: <PiPackageLight />,
                },
                {
                  id: "2",
                  title: "Worldwide Delivery",
                  description: "We ship globally with full tracking support.",
                  icon: <TbWorld />,
                },
                {
                  id: "3",
                  title: "White-Label Ready",
                  description:
                    "All products ship without Mikfy branding — perfect for your brand.",
                  icon: <PiTagSimple />,
                },
                {
                  id: "4",
                  title: "Low MOQ, High Flexibility",
                  description:
                    "Start with as few as 50 units per SKU — scale at your pace.",
                  icon: <TbCurrencyDollar />,
                },
              ]}
              accordionItems={[
                {
                  id: "f",
                  title: "FEATURES",
                  icon: <MdOutlineContentPasteSearch />,
                  content: "Product features here",
                },
                {
                  id: "c",
                  title: "COMPOSITION & CARE",
                  icon: <LuLeaf />,
                  content: "Care details",
                },
                {
                  id: "d",
                  title: "DELIVERY",
                  icon: <TbTruckDelivery />,
                  content: "Shipping details",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Rest of page */}
      <ProductShowcaseClone />
      <FeaturesGrid />
      <About />
      <LastBg />
      <Footer />
    </>
  );
}
