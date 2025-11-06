"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-x-hidden">
      <div className="absolute flex z-0 items-center justify-center inset-0 h-full w-full">
        <Image
        src={"/images/heroBgImage.png"}
        width={2000}
        height={3000}
        alt="image"
        className="pt-60"
      /></div>
      
      {/* Text */}
      <div className="relative flex flex-col items-center justify-center h-screen z-10">
        <h1 className="text-7xl font-bold">WISH COME TRUE</h1>
        <p className="text-4xl">Coming Soon!</p>
      </div>

      <div className="absolute z-20 -bottom-74 right-10">
        <Image
        src={"/images/fragileTag.png"}
        width={150}
        height={200}
        alt="image"
      /></div>
      

    </section>
  );
}

// <section className="relative h-[128vh] w-full overflow-x-hidden">
//   {/* Background Image */}
//   <div
//     className="absolute inset-0 bg-[url('/images/heroBgImage.png')] bg-cover bg-center z-0"
//   ></div>

//   {/* Centered Content */}
//   <div className="absolute inset-0 flex items-center -top-40 justify-center flex-col text-center text-black z-20">
//     <h1 className="text-5xl md:text-6xl font-bold mb-4">
//       WISH COME TRUE
//     </h1>
//     <p
//       className={`text-xl md:text-2xl text-white transition-all duration-1000 ${
//         loaded ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-4"
//       }`}
//     >
//       Coming Soon!
//     </p>
//   </div>
// </section>