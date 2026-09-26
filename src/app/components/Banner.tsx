import React from "react";
import Link from "next/link";
import BannerLogo from "../assets/banner.png";
import Image from "next/image";


const Banner = () => {
    return (
        <section className="relative overflow-hidden rounded-xl border border-[#292c32] bg-[#15171c]">

      <div className="flex min-h-[275px] items-center px-8 py-8 sm:px-10 lg:px-12">
        {/* Left Content */}
        <div className="relative z-10 max-w-[500px]">
          <p className="mb-4 text-[10px] font-extrabold tracking-[0.08em] text-[#c8ff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-[480px] text-4xl font-black uppercase leading-[0.94] tracking-[-0.025em] text-white sm:text-5xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-4 max-w-[450px] text-[12px] leading-[1.6] text-[#9da1aa]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            type="button"
            className="mt-5 rounded-md bg-[#c8ff00] px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-[#d8ff45] active:scale-95"
          >
            Browse Workouts
          </button>
        </div>

        {/* Right Image */}
        <div className="absolute right-5 bottom-0 h-[245px] w-[250px] sm:right-8 sm:h-[265px] sm:w-[285px] lg:right-12 lg:w-[300px]">
          <Image
            src={BannerLogo}
            alt="Workout illustration"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
    );
};

export default Banner;