export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  sizes: string[];
  colors: string[]; // hex values
  inStock: boolean;
}
