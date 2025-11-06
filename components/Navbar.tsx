"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <section>
            <div className="border-b border-white flex items-center bg-black/60 justify-between absolute z-50 w-screen px-30">
      
      <div><h1 className="font-bold text-3xl text-white">YNOTNOW</h1></div>

      <div>
        <Image src={"/images/logo.png"} width={100} height={100} alt="image" />
      </div>

      <div className="w-1/10"></div>
    </div>
    </section>

  );
}
