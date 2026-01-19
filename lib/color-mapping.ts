/**
 * Color name to hex code mapping
 * This helps convert Shopify color option values to hex codes for display
 */
export const COLOR_MAP: Record<string, string> = {
  // Common colors
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
  yellow: "#FFFF00",
  orange: "#FFA500",
  purple: "#800080",
  pink: "#FFC0CB",
  brown: "#A52A2A",
  gray: "#808080",
  grey: "#808080",
  navy: "#000080",
  beige: "#F5F5DC",
  tan: "#D2B48C",
  khaki: "#C3B091",
  olive: "#808000",
  maroon: "#800000",
  teal: "#008080",
  cyan: "#00FFFF",
  magenta: "#FF00FF",
  lime: "#00FF00",
  gold: "#FFD700",
  silver: "#C0C0C0",
  
  // Extended colors
  "light blue": "#ADD8E6",
  "dark blue": "#00008B",
  "light gray": "#D3D3D3",
  "dark gray": "#A9A9A9",
  "light grey": "#D3D3D3",
  "dark grey": "#A9A9A9",
  
  // Specific brand colors
  "d6c5b8": "#D6C5B8",
  "0a1a4f": "#0A1A4F",
};

/**
 * Convert color name to hex code
 * Falls back to the input if no mapping found (in case it's already a hex code)
 */
export function colorNameToHex(colorName: string): string {
  const normalized = colorName.toLowerCase().trim();
  return COLOR_MAP[normalized] || (normalized.startsWith("#") ? normalized : `#${normalized}`);
}

/**
 * Extract unique colors from product variants
 */
export function extractColorsFromVariants(
  variants: Array<{ selectedOptions?: Array<{ name: string; value: string }> }>
): string[] {
  const colorSet = new Set<string>();
  
  variants.forEach((variant) => {
    variant.selectedOptions?.forEach((option) => {
      if (option.name.toLowerCase() === "color") {
        const hexColor = colorNameToHex(option.value);
        colorSet.add(hexColor);
      }
    });
  });
  
  return Array.from(colorSet);
}

