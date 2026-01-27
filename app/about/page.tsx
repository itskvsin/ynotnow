import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about YNOTNOW - where premium streetwear meets the philosophy that there's never a perfect time but only now.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-black text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About YNOTNOW</h1>
                    <p className="text-xl text-gray-300">
                        Born from the idea that there's never a perfect time but only now
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-gray-700 mb-6">
                        YNOTNOW was founded on a simple yet powerful philosophy: stop waiting for the perfect moment
                        and seize the now. In a world where people constantly postpone their dreams, we believe in
                        taking action today.
                    </p>
                    <p className="text-gray-700 mb-6">
                        Our brand represents more than just clothing—it's a lifestyle, a mindset, and a movement.
                        Every piece we create is designed to empower you to express yourself authentically and
                        confidently, without hesitation.
                    </p>

                    <h2 className="text-3xl font-bold mb-6 mt-12">Our Mission</h2>
                    <p className="text-gray-700 mb-6">
                        To create premium streetwear that inspires people to live in the moment and pursue their
                        passions without delay. We combine cutting-edge design with exceptional quality to deliver
                        products that make you feel unstoppable.
                    </p>

                    <h2 className="text-3xl font-bold mb-6 mt-12">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                            <p className="text-gray-600">
                                We never compromise on quality. Every product is crafted with premium materials and
                                meticulous attention to detail.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                            <p className="text-gray-600">
                                We stay true to our vision and values, creating designs that reflect genuine creativity
                                and passion.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Community</h3>
                            <p className="text-gray-600">
                                We're building a community of like-minded individuals who believe in living boldly and
                                authentically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
                    <p className="text-gray-600 mb-8">
                        Be part of a community that believes in seizing the moment
                    </p>
                    <a
                        href="/products"
                        className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
}
