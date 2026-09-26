"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../assets/logo.png";
import { usePlan } from "./PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const workoutsActive =
    pathname === "/" || pathname.startsWith("/Workouts");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="h-[51px] w-full border-b border-white/[0.03] bg-[#0c0d10]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="FitLog Home"
        >
          <Image
            src={Logo}
            alt="FITLOG"
            className="h-6 w-auto"
          />

          <span className="text-[13px] font-extrabold tracking-[-0.02em] text-white">
            FITLOG
          </span>
        </Link>

        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
          <Link
            href="/"
            className={[
              "rounded-full px-4 py-[6px] text-[10px] font-medium transition",
              workoutsActive
                ? "bg-[#1a2312] text-[#c2f800]"
                : "text-[#9a9ca2] hover:text-white",
            ].join(" ")}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={[
              "rounded-full px-4 py-[6px] text-[10px] font-medium transition",
              planActive
                ? "bg-[#1a2312] text-[#c2f800]"
                : "text-[#9a9ca2] hover:text-white",
            ].join(" ")}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2"
          >
            <span className="text-[10px] text-[#d1d2d4]">
              Plan
            </span>

            <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#c2f800] px-1 text-[9px] font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2"
          >
            <span className="text-[10px] text-[#d1d2d4]">
              Saved
            </span>

            <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full border border-[#35373d] px-1 text-[9px] font-medium text-[#aaa]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}