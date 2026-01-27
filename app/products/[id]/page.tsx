"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import ProductDetailSection from "@/components/product/ProductDetailSection";
import ProductMetaSection from "@/components/product/ProductMetaSection";
import { Product } from "@/types/product";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";
import BreadCrumbNav from "@/components/BreadCrumbNav";
import ProductInfo from "@/components/product/ProductInfo";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import type { ShopifyProduct } from "@/types/shopify";

import { PiPackageLight } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";
import { PiTagSimple } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { extractColorsFromVariants, colorNameToHex } from "@/lib/color-mapping";

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
        // Convert color name to hex code
        const hexColor = colorNameToHex(option.value);
        colors.add(hexColor);
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
  color: string | null // This is a hex code from the UI
): string | null {
  if (!shopifyProduct) return null;

  // Check if product has size and color options
  const hasSizeOption = shopifyProduct.variants.edges.some(edge =>
    edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "size")
  );
  const hasColorOption = shopifyProduct.variants.edges.some(edge =>
    edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "color")
  );

  // If product has no size or color options (testing scenario), return first available variant
  // In production, all products will have variants, but we still need to allow add to cart
  if (!hasSizeOption && !hasColorOption) {
    const firstAvailable = shopifyProduct.variants.edges.find(
      edge => edge.node.availableForSale
    );
    return firstAvailable?.node.id || shopifyProduct.variants.edges[0]?.node.id || null;
  }

  // If product has size options but no size is selected, return null
  if (hasSizeOption && !size) {
    return null;
  }

  // If color is provided, we need to find the original color name from Shopify
  // that matches this hex code
  let colorNameToMatch: string | null = null;
  if (color && shopifyProduct) {
    // Find the color option value that maps to this hex code
    // Check all variants to find which color name corresponds to this hex
    const allColorOptions = new Set<string>();
    shopifyProduct.variants.edges.forEach(edge => {
      edge.node.selectedOptions?.forEach(opt => {
        if (opt.name.toLowerCase() === "color") {
          allColorOptions.add(opt.value);
        }
      });
    });

    // Find the color name that maps to this hex code
    for (const colorName of allColorOptions) {
      if (colorNameToHex(colorName) === color) {
        colorNameToMatch = colorName;
        break;
      }
    }
  }

  // Find variant matching size and optionally color
  const variant = shopifyProduct.variants.edges.find(({ node }) => {
    if (!node.availableForSale) return false;

    const hasSize = node.selectedOptions?.some(
      (opt) => opt.name.toLowerCase() === "size" && opt.value === size
    );

    if (!hasSize) return false;

    // If color is selected, match it; otherwise any color is fine
    if (colorNameToMatch) {
      const hasColor = node.selectedOptions?.some(
        (opt) => opt.name.toLowerCase() === "color" && opt.value === colorNameToMatch
      );
      return hasColor;
    }

    return true; // Size matches and no color requirement
  });

  // If no exact match found but we have a size, try to find any variant with that size
  if (!variant && size) {
    const fallbackVariant = shopifyProduct.variants.edges.find(({ node }) => {
      return node.availableForSale && node.selectedOptions?.some(
        (opt) => opt.name.toLowerCase() === "size" && opt.value === size
      );
    });
    return fallbackVariant?.node.id || null;
  }

  return variant?.node.id || null;
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

          // Check if product has size and color options
          const hasSizeOption = product.variants.edges.some(edge =>
            edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "size")
          );
          const hasColorOption = product.variants.edges.some(edge =>
            edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "color")
          );

          // Only auto-select if options exist (for testing - in production all products have variants)
          if (hasSizeOption || hasColorOption) {
            const firstAvailableVariant = product.variants.edges.find(
              edge => edge.node.availableForSale
            ) || product.variants.edges[0];

            if (firstAvailableVariant) {
              if (hasSizeOption) {
                const firstSize = firstAvailableVariant.node.selectedOptions?.find(
                  (opt) => opt.name.toLowerCase() === "size"
                )?.value;
                if (firstSize) {
                  setSelectedSize(firstSize);
                }
              }

              if (hasColorOption) {
                const firstColor = firstAvailableVariant.node.selectedOptions?.find(
                  (opt) => opt.name.toLowerCase() === "color"
                )?.value;
                if (firstColor) {
                  const hexColor = colorNameToHex(firstColor);
                  setSelectedColor(hexColor);
                }
              }
            }
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

  // Track recently viewed
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    if (shopifyProduct && productHandle) {
      const price = shopifyProduct.priceRange.minVariantPrice.amount;
      const currencyCode = shopifyProduct.priceRange.minVariantPrice.currencyCode;
      const currencySymbols: { [key: string]: string } = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        INR: "₹",
      };
      const symbol = currencySymbols[currencyCode] || currencyCode;
      const formattedPrice = `${symbol}${parseFloat(price).toFixed(2)}`;

      addProduct({
        id: shopifyProduct.id,
        handle: productHandle,
        title: shopifyProduct.title,
        image: shopifyProduct.featuredImage?.url || "",
        price: formattedPrice,
      });
    }
  }, [shopifyProduct, productHandle, addProduct]);

  const product = useMemo(
    () => shopifyProductToProduct(shopifyProduct),
    [shopifyProduct]
  );

  // Check if product has size and color options (must be defined before selectedVariantId)
  const hasSizeOption = useMemo(() => {
    if (!shopifyProduct) return false;
    return shopifyProduct.variants.edges.some(edge =>
      edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "size")
    );
  }, [shopifyProduct]);

  const hasColorOption = useMemo(() => {
    if (!shopifyProduct) return false;
    return shopifyProduct.variants.edges.some(edge =>
      edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "color")
    );
  }, [shopifyProduct]);

  const selectedVariantId = useMemo(
    () => {
      const variantId = findVariantByOptions(shopifyProduct, selectedSize, selectedColor);
      // Debug logging - always log to help debug
      console.log('Variant Selection Debug:', {
        selectedSize,
        selectedColor,
        variantId,
        hasProduct: !!shopifyProduct,
        variantCount: shopifyProduct?.variants.edges.length || 0,
        hasSizeOption,
        hasColorOption,
      });
      return variantId;
    },
    [shopifyProduct, selectedSize, selectedColor, hasSizeOption, hasColorOption]
  );

  // Calculate stock from variants
  const stockData = useMemo(() => {
    if (!shopifyProduct) return { total: 0, remaining: 0 };

    const variants = shopifyProduct.variants.edges.map(edge => edge.node);
    const totalStock = variants.reduce((sum, variant) => {
      return sum + (variant.quantityAvailable || 0);
    }, 0);

    const availableStock = variants
      .filter(v => v.availableForSale)
      .reduce((sum, variant) => {
        return sum + (variant.quantityAvailable || 0);
      }, 0);

    return {
      total: totalStock || variants.length * 10, // Fallback estimate if quantity not available
      remaining: availableStock || variants.filter(v => v.availableForSale).length * 10,
    };
  }, [shopifyProduct]);

  // Extract colors from variants
  const productColors = useMemo(() => {
    if (!shopifyProduct) return [];
    const variants = shopifyProduct.variants.edges.map(edge => edge.node);
    return extractColorsFromVariants(variants);
  }, [shopifyProduct]);

  // Parse description HTML for accordion content
  const parseDescriptionForAccordion = (descriptionHtml?: string) => {
    if (!descriptionHtml) return null;

    // Try to extract sections from HTML
    // This is a simple parser - you might want to enhance this based on your HTML structure
    const sections: { [key: string]: string } = {};

    // Look for common section patterns (using [\s\S] instead of . with s flag)
    const featuresMatch = descriptionHtml.match(/<h[23][^>]*>[\s\S]*?features?[\s\S]*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);
    const careMatch = descriptionHtml.match(/<h[23][^>]*>[\s\S]*?(care|composition)[\s\S]*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);
    const deliveryMatch = descriptionHtml.match(/<h[23][^>]*>[\s\S]*?(delivery|shipping)[\s\S]*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);

    if (featuresMatch && featuresMatch[1]) sections.features = featuresMatch[1].replace(/<[^>]+>/g, "").trim();
    if (careMatch && careMatch[2]) sections.care = careMatch[2].replace(/<[^>]+>/g, "").trim();
    if (deliveryMatch && deliveryMatch[2]) sections.delivery = deliveryMatch[2].replace(/<[^>]+>/g, "").trim();

    return sections;
  };

  const descriptionSections = useMemo(() => {
    return parseDescriptionForAccordion(shopifyProduct?.descriptionHtml);
  }, [shopifyProduct]);

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      console.error("Cannot add to cart - no variant selected", {
        selectedSize,
        selectedColor,
        shopifyProduct: !!shopifyProduct,
        variantCount: shopifyProduct?.variants.edges.length || 0,
        hasSizeOption,
        hasColorOption,
      });
      toast.error("Please select a size to add to cart");
      return;
    }

    console.log("Adding to cart:", { selectedVariantId, quantity });

    try {
      await addItem(selectedVariantId, quantity);
      // Show success message (you can replace with a toast notification)
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage = addToCartError || (error instanceof Error ? error.message : "Failed to add item to cart");
      toast.error(errorMessage);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariantId) {
      console.error("Cannot buy now - no variant selected", {
        selectedSize,
        selectedColor,
        shopifyProduct: !!shopifyProduct,
      });
      toast.error("Please select a size to buy now");
      return;
    }

    console.log("Buy now:", { selectedVariantId, quantity });

    try {
      await addItem(selectedVariantId, quantity);
      // Small delay to ensure cart is updated
      await new Promise(resolve => setTimeout(resolve, 500));
      // Redirect to cart page
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage = addToCartError || (error instanceof Error ? error.message : "Failed to add item to cart");
      toast.error(errorMessage);
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
            hasSizeOption={hasSizeOption}
            hasColorOption={hasColorOption}
          />
          <div>
            <div className="hidden sm:block">
              <ProductInfo
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
                hasSizeOption={hasSizeOption}
                hasColorOption={hasColorOption}
              />
            </div>
            {/* RIGHT — Product Meta */}
            <ProductMetaSection
              stock={stockData}
              benefits={[
                {
                  id: "1",
                  title: "Free Shipping",
                  description:
                    "Free delivery on orders over ₹4999.",
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
                  title: "Secure Packaging",
                  description:
                    "Carefully packed to keep your products safe.",
                  icon: <PiTagSimple />,
                },
                {
                  id: "4",
                  title: "Easy Returns",
                  description:
                    "7-day easy returns. Love it or return it.",
                  icon: <TbCurrencyDollar />,
                },
              ]}
              accordionItems={[
                {
                  id: "f",
                  title: "FEATURES",
                  icon: <MdOutlineContentPasteSearch />,
                  content: descriptionSections?.features || shopifyProduct?.description || "Product features and details.",
                },
                {
                  id: "c",
                  title: "COMPOSITION & CARE",
                  icon: <LuLeaf />,
                  content: descriptionSections?.care || "Care instructions and composition details.",
                },
                {
                  id: "d",
                  title: "DELIVERY",
                  icon: <TbTruckDelivery />,
                  content: descriptionSections?.delivery || "Shipping and delivery information.",
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
