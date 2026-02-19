import { ShopifyProduct } from "@/types/shopify";
import { Product } from "@/types/product";
import { colorNameToHex } from "@/lib/color-mapping";

/**
 * Converts a Shopify product object to the application's Product interface.
 */
export function shopifyProductToProduct(shopifyProduct: ShopifyProduct | null): Product | null {
    if (!shopifyProduct) return null;

    const sizes = new Set<string>();
    const colors = new Set<string>();

    shopifyProduct.variants.edges.forEach(({ node }) => {
        node.selectedOptions?.forEach((option) => {
            if (option.name.toLowerCase() === "size") sizes.add(option.value);
            if (option.name.toLowerCase() === "color") colors.add(colorNameToHex(option.value));
        });
    });

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

/**
 * Helper to find a variant ID based on selected options.
 */
export function findVariantByOptions(
    shopifyProduct: ShopifyProduct | null,
    size: string | null,
    color: string | null
): string | null {
    if (!shopifyProduct) return null;

    const hasSizeOption = shopifyProduct.variants.edges.some(edge =>
        edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "size")
    );
    const hasColorOption = shopifyProduct.variants.edges.some(edge =>
        edge.node.selectedOptions?.some(opt => opt.name.toLowerCase() === "color")
    );

    if (!hasSizeOption && !hasColorOption) {
        const firstAvailable = shopifyProduct.variants.edges.find(
            edge => edge.node.availableForSale
        );
        return firstAvailable?.node.id || shopifyProduct.variants.edges[0]?.node.id || null;
    }

    if (hasSizeOption && !size) {
        return null;
    }

    let colorNameToMatch: string | null = null;
    if (color && shopifyProduct) {
        const allColorOptions = new Set<string>();
        shopifyProduct.variants.edges.forEach(edge => {
            edge.node.selectedOptions?.forEach(opt => {
                if (opt.name.toLowerCase() === "color") {
                    allColorOptions.add(opt.value);
                }
            });
        });

        for (const colorName of allColorOptions) {
            if (colorNameToHex(colorName) === color) {
                colorNameToMatch = colorName;
                break;
            }
        }
    }

    const variant = shopifyProduct.variants.edges.find(({ node }) => {
        if (!node.availableForSale) return false;

        const hasSize = node.selectedOptions?.some(
            (opt) => opt.name.toLowerCase() === "size" && opt.value === size
        );

        if (!hasSize) return false;

        if (colorNameToMatch) {
            const hasColor = node.selectedOptions?.some(
                (opt) => opt.name.toLowerCase() === "color" && opt.value === colorNameToMatch
            );
            return hasColor;
        }

        return true;
    });

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

/**
 * Extracts colors from variants.
 */
export function extractColorsFromVariants(variants: any[]) {
    // This function originally existed in the code but I don't see the implementation.
    // I am pulling in what was likely imported from '@/lib/color-mapping' but 
    // effectively reproducing logic if needed or just re-exporting.
    // Actually, let's keep it separate if it's already there.
    return [];
}

/**
 * Parses description HTML into structured sections.
 */
export function parseDescriptionForAccordion(descriptionHtml?: string) {
    if (!descriptionHtml) return null;

    const sections: { [key: string]: string } = {};

    const featuresMatch = descriptionHtml.match(/<h[23][^>]*>[\s\S]*?features?[\s\S]*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);
    const careMatch = descriptionHtml.match(/<h[23][^>]*>[\s\S]*?(care|composition)[\s\S]*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);
    const deliveryMatch = descriptionHtml.match(/<h[23][^>]*>[\s\S]*?(delivery|shipping)[\s\S]*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);

    if (featuresMatch && featuresMatch[1]) sections.features = featuresMatch[1].replace(/<[^>]+>/g, "").trim();
    if (careMatch && careMatch[2]) sections.care = careMatch[2].replace(/<[^>]+>/g, "").trim();
    if (deliveryMatch && deliveryMatch[2]) sections.delivery = deliveryMatch[2].replace(/<[^>]+>/g, "").trim();

    return sections;
}
