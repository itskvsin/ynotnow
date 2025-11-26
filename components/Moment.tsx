"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function Moment() {
  return (
    <section className="p-20 relative bg-[url('/images/momentImg.png')] bg-center bg-cover min-h-screen mx-16">
      {/* <Image 
            src={"/images/momentImg.png"}
            width={20000}
            height={20000}
            alt="YNOTNOW"
            className="w-full"
            /> */}
      <div className="text-white text-5xl absolute bottom-0 left-0 font-thin font-geist space-y-10 pb-50 px-50">
        <div>
          <p>Don’t wait for the right </p>
          <p>moment. Create it.</p>
        </div>
          <Link href="#">
            <button className="relative overflow-hidden px-10 py-3 border border-white rounded-full text-lg transition-all duration-300 group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Show Now
              </span>

              <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></span>
            </button>
          </Link>
      </div>
    </section>
  );
}

//
