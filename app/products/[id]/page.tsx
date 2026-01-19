"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import ProductDetailSection from "@/components/product/ProductDetailSection";
import ProductMetaSection from "@/components/product/ProductMetaSection";
import { Product } from "@/types/product";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";
import BreadCrumbNav from "@/components/BreadCrumbNav";
import ProductInfo from "@/components/product/ProductInfo";
import { useAddToCart } from "@/hooks/useAddToCart";
import type { ShopifyProduct } from "@/types/shopify";

import { PiPackageLight } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { PiTagSimple } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";

// Helper to convert Shopify product to UI Product format
function shopifyProductToProduct(shopifyProduct: ShopifyProduct | null): Product | null {
  if (!shopifyProduct) return null;

  // Extract sizes and colors from variants
  const sizes = new Set<string>();
  const colors = new Set<string>();

  shopifyProduct.variants.edges.forEach(({ node }) => {
    node.selectedOptions?.forEach((option) => {
      if (option.name.toLowerCase() === "size") {
        sizes.add(option.value);
      }
      if (option.name.toLowerCase() === "color") {
        colors.add(option.value);
      }
    });
  });

  // Get images
  const images =
    shopifyProduct.images?.edges.map((edge, index) => ({
      id: `${index}`,
      url: edge.node.url,
      alt: edge.node.altText || undefined,
    })) || [];

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    images,
    sizes: Array.from(sizes),
    colors: Array.from(colors),
    inStock: shopifyProduct.variants.edges.some(
      (edge) => edge.node.availableForSale
    ),
  };
}

// Helper to find variant by size and color
function findVariantByOptions(
  shopifyProduct: ShopifyProduct | null,
  size: string | null,
  color: string | null
): string | null {
  if (!shopifyProduct || !size) return null;

  const variant = shopifyProduct.variants.edges.find(({ node }) => {
    const hasSize = node.selectedOptions?.some(
      (opt) => opt.name.toLowerCase() === "size" && opt.value === size
    );
    const hasColor =
      !color ||
      node.selectedOptions?.some(
        (opt) => opt.name.toLowerCase() === "color" && opt.value === color
      );
    return hasSize && hasColor && node.availableForSale;
  });

  return variant?.node.id || shopifyProduct.variants.edges[0]?.node.id || null;
}

export default function Page() {
  const params = useParams();
  const productHandle = params.id as string;
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading: isAddingToCart, error: addToCartError } =
    useAddToCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const { getProductByHandleAction } = await import("@/lib/actions/products");
        const { product, error } = await getProductByHandleAction(productHandle);
        
        if (error) {
          console.error("Error fetching product:", error);
          return;
        }
        
        if (product) {
          setShopifyProduct(product);
          // Auto-select first available size
          const firstVariant = product.variants.edges[0]?.node;
          const firstSize = firstVariant?.selectedOptions?.find(
            (opt) => opt.name.toLowerCase() === "size"
          )?.value;
          if (firstSize) {
            setSelectedSize(firstSize);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (productHandle) {
      fetchProduct();
    }
  }, [productHandle]);

  const product = useMemo(
    () => shopifyProductToProduct(shopifyProduct),
    [shopifyProduct]
  );

  const selectedVariantId = useMemo(
    () => findVariantByOptions(shopifyProduct, selectedSize, selectedColor),
    [shopifyProduct, selectedSize, selectedColor]
  );

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      alert("Please select a size");
      return;
    }

    try {
      await addItem(selectedVariantId, quantity);
      // Show success message (you can replace with a toast notification)
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(addToCartError || "Failed to add item to cart");
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariantId) {
      alert("Please select a size");
      return;
    }

    try {
      await addItem(selectedVariantId, quantity);
      // Redirect to cart page
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(addToCartError || "Failed to add item to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }

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
          <ProductDetailSection
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />
          <div>
            <div className="hidden sm:block">
              <ProductInfo
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />
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
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isLoading={isAddingToCart}
              disabled={!selectedVariantId}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>
      </section>

      {/* Rest of page */}
      <ProductShowcaseClone />
    </>
  );
}
