import { MetadataRoute } from 'next';
import { getProductsAction } from '@/lib/actions/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ynotnow.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cart`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    // Dynamic product pages
    try {
        const { products } = await getProductsAction(100);
        const productPages: MetadataRoute.Sitemap = products.map((product) => ({
            url: `${baseUrl}/products/${product.handle}`,
            lastModified: new Date(product.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...staticPages, ...productPages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticPages;
    }
}
