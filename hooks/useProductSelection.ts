import { useState, useMemo, useEffect } from "react";
import { ShopifyProduct } from "@/types/shopify";
import { colorNameToHex } from "@/lib/color-mapping";
import { findVariantByOptions, shopifyProductToProduct } from "@/lib/product-helpers";

export function useProductSelection(initialProduct: ShopifyProduct | null) {
    const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(initialProduct);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // Update local state when prop changes
    useEffect(() => {
        setShopifyProduct(initialProduct);

        if (initialProduct) {
            // Auto-select logic
            const hasSizeOption = initialProduct.variants.edges.some(edge =>
                edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "size")
            );
            const hasColorOption = initialProduct.variants.edges.some(edge =>
                edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "color")
            );

            if (hasSizeOption || hasColorOption) {
                const firstAvailableVariant = initialProduct.variants.edges.find(
                    edge => edge.node.availableForSale
                ) || initialProduct.variants.edges[0];

                if (firstAvailableVariant) {
                    if (hasSizeOption) {
                        const firstSize = firstAvailableVariant.node.selectedOptions?.find(
                            (opt) => opt.name.toLowerCase() === "size"
                        )?.value;
                        if (firstSize) setSelectedSize(firstSize);
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
    }, [initialProduct]);

    const product = useMemo(
        () => shopifyProductToProduct(shopifyProduct),
        [shopifyProduct]
    );

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
        () => findVariantByOptions(shopifyProduct, selectedSize, selectedColor),
        [shopifyProduct, selectedSize, selectedColor]
    );

    const stockData = useMemo(() => {
        if (!shopifyProduct) return { total: 0, remaining: 0 };
        const variants = shopifyProduct.variants.edges.map(edge => edge.node);
        const totalStock = variants.reduce((sum, variant) => sum + (variant.quantityAvailable || 0), 0);
        const availableStock = variants.filter(v => v.availableForSale).reduce((sum, variant) => sum + (variant.quantityAvailable || 0), 0);
        return {
            total: totalStock || variants.length * 10,
            remaining: availableStock || variants.filter(v => v.availableForSale).length * 10,
        };
    }, [shopifyProduct]);

    return {
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
    };
}
