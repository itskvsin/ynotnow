"use client"

import Image from "next/image"  

export default function LastBg(){
    return(
        <section>
            <Image 
            src={"/images/lastBg.png"}
            width={1600}
            height={1600}
            alt="YNOTNOW"
            />
        </section>
    )
}