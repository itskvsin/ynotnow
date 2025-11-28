import React from "react";
import { Compare } from "@/components/ui/compare";

export default function Slider() {
  return (
    <div className="p-4 h-screen w-full flex items-center justify-center rounded-3xl dark:bg-neutral-900 dark:border-neutral-800 px-4">
      <div className="flex flex-col justify-start h-screen gap-6 text-start px-20 py-28  items-start">
        <div className="h-6 w-6 rounded-full bg-gray-400 "></div>
        <p className="select-none">
          With bold silhouettes and confident design, we craft apparel for those
          who act before they’re ready. Unapologetically present.
        </p>
      </div>
      <Compare
        firstImage="/images/hoodies/blueHoodie.png"
        secondImage="/images/hoodies/grayHoodie.png"
        firstImageClassName="object-contain object-center"
        secondImageClassname="object-contain object-center"
        className="h-[250px] w-[200px] md:h-[80vh] md:w-[70vw]"
        slideMode="drag"
      />
      <div className="flex flex-col justify-start h-screen gap-6 text-end px-20 py-28 items-end">
        <div className="h-6 w-6 rounded-full bg-gray-400"></div>
        <p className="select-none">

          With bold silhouettes and confident design, we craft apparel for those
          who act before they’re ready. Unapologetically present.
        </p>
      </div>
    </div>
  );
}



// import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// export default function Slider(){
//   return (
//     <ReactCompareSlider className='h-screen'
//       itemOne={<ReactCompareSliderImage src="/images/hoodies/blueHoodie.png"  alt="Image one" />}
//       itemTwo={<ReactCompareSliderImage src="/images/hoodies/grayHoodie.png"  alt="Image two" />}
//     />
//   );
// };