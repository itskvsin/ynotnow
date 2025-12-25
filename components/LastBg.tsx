"use client";

import Image from "next/image";

export default function LastBg() {
  return (
    <section className="relative w-full h-[28vh] lg:h-[90vh] overflow-hidden">
      {/* <video
        className="absolute inset-0 w-full h-full object-cover lg:object-cover"
        src="/videos/Firefly_Slow_subtle_animation_Mystery_vibe.webm"
        autoPlay
        loop
        muted
        playsInline
        // preload="auto"
      /> */}
      {/* <div className="h-full w-full bg-[url('/images/lastBg.png')] bg-bottom bg-contain bg-no-repeat" /> */}
      <Image
        src="/images/lastBg.png"
        width={2000}
        height={2000}
        className="w-full h-full object-contain object-bottom"
        alt="last background"
      />
      {/* Optional Overlay (if needed later) */}
      {/* <div className="absolute inset-0 bg-black/20" /> */}
    </section>
  );
}

// import Image from "next/image";

// export default function LastBg() {
//   return (
//     <section>
//       {/* <Image
//             src={"/images/lastBg.png"}
//             width={1900}
//             height={1900}
//             alt="YNOTNOW"
//             className="w-full"
//             /> */}
//       <video width="320" height="240" autoPlay preload="none" playsInline>
//         <source src="/videos/Firefly_Slow_subtle_animation_Mystery_vibe.mp4"  />
//         {/* Your browser does not support the video tag. */}
//       </video>
//     </section>
//   );
// }
