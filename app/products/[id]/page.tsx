import { getProductByHandleAction } from "@/lib/actions/products";
import ProductPageClient from "@/components/product/ProductPageClient";
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getProductByHandleAction(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.featuredImage?.url || ''],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const { product, error } = await getProductByHandleAction(id);

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <ProductPageClient
      initialProduct={product}
      productHandle={id}
    />
  );
}
