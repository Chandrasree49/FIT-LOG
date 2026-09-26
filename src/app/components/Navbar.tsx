import React from "react";
import Link from "next/link";
import Logo from "../assets/logo.png";
import Image from "next/image";

const Navbar = () => {
    return (
        <header className="h-[51px] w-full border-b border-white/[0.03] bg-[#0c0d10]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Fitlog Home"
        >
          {/* Dumbbell / fitness icon */}
          <Image
  src={Logo}
  alt="FITLOG"
  className="h-6 w-auto"
/>
          <span className="text-[13px] font-extrabold tracking-[-0.02em] text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
          <Link
            href="/workouts"
            className="rounded-full bg-[#1a2312] px-4 py-[6px] text-[10px] font-medium text-[#c2f800] transition hover:bg-[#202c15]"
          >
            Workouts
          </Link>

          <Link
            href="/plan"
            className="rounded-full px-4 py-[6px] text-[10px] font-medium text-[#9a9ca2] transition hover:text-white"
          >
            My Plan
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          
          {/* Plan */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#d1d2d4]">
              Plan
            </span>

            <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#c2f800] px-1 text-[9px] font-bold text-black">
              0
            </span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#d1d2d4]">
              Saved
            </span>

            <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full border border-[#35373d] px-1 text-[9px] font-medium text-[#aaa]">
              0
            </span>
          </div>

        </div>
      </div>
    </header>
    );
};

export default Navbar;