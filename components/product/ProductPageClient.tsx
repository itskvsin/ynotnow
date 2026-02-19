"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
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
import { useLenis } from "lenis/react";

/* 
  Helpers from page.tsx 
*/

import { parseDescriptionForAccordion } from "@/lib/product-helpers";
import { useProductSelection } from "@/hooks/useProductSelection";

interface ProductPageClientProps {
    initialProduct: ShopifyProduct | null;
    productHandle: string;
}

export default function ProductPageClient({ initialProduct, productHandle }: ProductPageClientProps) {
    const {
        shopifyProduct,
        product,
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        hasSizeOption,
        hasColorOption,
        selectedVariantId,
        stockData,
    } = useProductSelection(initialProduct);

    const [quantity, setQuantity] = useState(1);
    const { addItem, isLoading: isAddingToCart, error: addToCartError } = useAddToCart();

    // Scroll to top animation on component mount
    const lenis = useLenis();
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, {
                immediate: false,
                duration: 1.5,
                lock: true,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    }, [lenis]);

    // Track recently viewed
    const { addProduct } = useRecentlyViewed();
    useEffect(() => {
        if (shopifyProduct && productHandle) {
            const price = shopifyProduct.priceRange.minVariantPrice.amount;
            const currencyCode = shopifyProduct.priceRange.minVariantPrice.currencyCode;
            const currencySymbols: { [key: string]: string } = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };
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

    // Parse description
    const descriptionSections = useMemo(() => {
        return parseDescriptionForAccordion(shopifyProduct?.descriptionHtml);
    }, [shopifyProduct]);

    const handleAddToCart = async () => {
        if (!selectedVariantId) {
            toast.error("Please select a size to add to cart");
            return;
        }
        try {
            await addItem(selectedVariantId, quantity);
            toast.success("Item added to cart!");
        } catch (error) {
            const errorMessage = addToCartError || (error instanceof Error ? error.message : "Failed to add item to cart");
            toast.error(errorMessage);
        }
    };

    const handleBuyNow = async () => {
        if (!selectedVariantId) {
            toast.error("Please select a size to buy now");
            return;
        }
        try {
            await addItem(selectedVariantId, quantity);
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = "/cart";
        } catch (error) {
            const errorMessage = addToCartError || (error instanceof Error ? error.message : "Failed to add item to cart");
            toast.error(errorMessage);
        }
    };

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <>
            <div className="pl-4 lg:pl-14">
                <BreadCrumbNav />
            </div>

            <section className="max-w-7xl mx-auto px-4 mt-6">
                <div className=" grid grid-cols-1 lg:grid-cols-2 ">
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
                        <div className="hidden md:block">
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
                        <ProductMetaSection
                            stock={stockData}
                            benefits={[
                                { id: "1", title: "Free Shipping", description: "Free delivery on orders over ₹4999.", icon: <PiPackageLight /> },
                                { id: "2", title: "Worldwide Delivery", description: "We ship globally with full tracking support.", icon: <TbWorld /> },
                                { id: "3", title: "Secure Packaging", description: "Carefully packed to keep your products safe.", icon: <PiTagSimple /> },
                                { id: "4", title: "Easy Returns", description: "7-day easy returns. Love it or return it.", icon: <TbCurrencyDollar /> },
                            ]}
                            accordionItems={[
                                { id: "f", title: "FEATURES", icon: <MdOutlineContentPasteSearch />, content: descriptionSections?.features || shopifyProduct?.description || "Product features and details." },
                                { id: "c", title: "COMPOSITION & CARE", icon: <LuLeaf />, content: descriptionSections?.care || "Care instructions and composition details." },
                                { id: "d", title: "DELIVERY", icon: <TbTruckDelivery />, content: descriptionSections?.delivery || "Shipping and delivery information." },
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
            <ProductShowcaseClone />
        </>
    );
}
