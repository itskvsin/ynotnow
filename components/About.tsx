import Image from "next/image";
import { RiInstagramFill } from "react-icons/ri";

export default function About() {
  return (
    <section className="h-screen w-screen flex items-center justify-between">
      <div className="flex flex-col justify-around items-center h-full w-2/4">
        <div className="flex gap-4 flex-col w-2/4">
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

        <div>
          <Image
            src={"/images/signature.png"}
            width={400}
            height={400}
            alt="image"
          />
        </div>
      </div>

      <div className="w-1/4 pr-20">
        <div className="flex flex-col text-end items-end  gap-4">
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
        <div className="flex items-center justify-end gap-4 my-4">
          <p className="font-bold">Follow Us</p>
          <RiInstagramFill className="text-5xl  border-gray-400 border rounded-full p-2" />
        </div>
      </div>
    </section>
  );
}
