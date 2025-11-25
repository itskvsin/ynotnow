"use client"

import Image from "next/image"  

export default function LastBg(){
    return(
        <section>
            <Image 
            src={"/images/lastBg.png"}
            width={1900}
            height={1900}
            alt="YNOTNOW"
            className="w-full"
            />
        </section>
    )
}