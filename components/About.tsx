import Image from "next/image";
import { RiInstagramFill } from "react-icons/ri";

export default function About() {
  return (
    <section className="lg:h-screen w-screen lg:flex lg:items-center lg:justify-between">
      <div className="flex flex-col-reverse lg:flex-col lg:justify-around lg:items-center lg:h-full lg:w-2/4">
        <div className="flex gap-4 flex-col p-4 lg:w-2/4">
          <h1 className="font-bold text-xl">About</h1>
          <p>A question. A mindset. A movement. </p>{" "}
          <p>
            YNOTNOW was born from the idea that there’s never a perfect time but
            only now
          </p>
          <p>
            With bold silhouettes and confident design, we craft apparel for
            those who act before they’re ready. Unapologetically present.
          </p>
        </div>

        <div className="mt-4 lg:mt-0 flex items-center justify-center">
          <Image
            src={"/images/signature.png"}
            width={400}
            height={400}
            alt="image"
          />
        </div>
      </div>

      <div className="lg:w-1/4 lg:pr-20 lg:mt-30">
        <div className="flex flex-col lg:text-end lg:items-end p-4  gap-4">
          <h1 className="font-bold">Join the YNOTNOW Tribe</h1>
          <p>
            Stay in the loop.Email us for updates and get notified the minute
            our first drop goes live.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border placeholder-black text-lg border-black px-6 py-3  focus:ring-1 focus:ring-black"
              aria-label="Enter your email"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white text-sm  hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex items-center lg:justify-end px-4 gap-4 my-4">
          <p className="font-bold">Follow Us</p>
          <RiInstagramFill className="text-5xl  border-gray-400 border rounded-full p-2" />
        </div>
      </div>
    </section>
  );
}


// import Image from "next/image";
// import { RiInstagramFill } from "react-icons/ri";

// export default function About() {
//   return (
//     <section className=" bg-white flex items-start justify-center py-8 px-4">
//       <div className="w-fullpx-6 py-8">
//         {/* Logo / signature centered */}
//         <div className="flex justify-center mb-6">
//           <Image
//             src="/images/signature.png"
//             width={220}
//             height={220}
//             alt="y not now signature"
//             className="object-contain"
//             priority
//           />
//         </div>

//         {/* About */}
//         <h2 className="font-bold text-base mb-2">About</h2>
//         <p className="text-sm text-gray-600 mb-3">
//           YNOTNOW was born from the idea that there’s never a perfect time, only now.
//         </p>
//         <p className="text-sm text-gray-600 mb-6">
//           With bold silhouettes and confident design, we craft apparel for those who act before they’re ready. Unapologetically present.
//         </p>

//         {/* Contact */}
//         <h3 className="font-bold text-sm mb-2">Contact Us</h3>
//         <p className="text-sm text-gray-600 mb-6">info@email.com</p>

//         {/* Join / Newsletter */}
//         <h3 className="font-bold text-sm mb-2">Join the Ynotnow Tribe</h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Stay in the loop. Email us for updates and get notified the minute our first drop goes live.
//         </p>

//         {/* Subscribe form: button on left, input on right */}
//         <form className="flex items-center gap-3 mb-6">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
//             aria-label="Subscribe"
//           >
//             Subscribe
//           </button>

//           <input
//             type="email"
//             placeholder="Enter your email"
//             aria-label="Enter your email"
//             className="flex-1 border border-black placeholder-black text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
//           />
//         </form>

//         {/* Follow */}
//         <div className="flex items-center gap-3">
//           <div className="flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full p-2">
//             <RiInstagramFill className="text-xl" />
//           </div>
//           <p className="font-bold text-sm">Follow Us</p>
//         </div>
//       </div>
//     </section>
//   );
// }
