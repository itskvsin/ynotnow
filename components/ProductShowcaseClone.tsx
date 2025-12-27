"use client";

import Image from "next/image";
import products from "@/data/ProductData";

export default function ProductShowcaseClone() {
  return (
    <section className="px-4 py-6">
      <div className="p-3">
        {/* Grid */}
        <div className="grid grid-cols-2 place-items-center lg:grid-cols-4 gap-x-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`pb-6 ${
                index < products.length - 2 ? "" : ""
              }`}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function ProductCard({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: string;
}) {
  return (
    <div>
        {" "}
        <Image
          src={image}
          alt={title}
          width={5000}
          height={6000}
          className="w-full h-60 lg:h-96 object-fill rounded-lg"
        />

      <h3 className="text-sm mt-2">{title}</h3>

      <div className="text-sm font-medium mt-1">{price}</div>
    </div>
  );
}
