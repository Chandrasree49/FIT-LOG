"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "./PlanContext";
import Logo from "../assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  const workoutsActive = pathname === "/";
  const planActive = pathname === "/my-plan";

  return (
    <nav className="border-b border-[#1f2228] bg-[#0b0d10]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="FitLog logo" width={24} height={24} />

          <span className="text-[20px] font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-[12px] font-bold transition ${
              workoutsActive
                ? "bg-[#17220c] text-[#c8ff00]"
                : "text-[#a5a8ae] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-[12px] font-medium transition ${
              planActive ? "text-white" : "text-[#a5a8ae] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
        <div className="flex items-center gap-7">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[12px] text-[#d1d3d7] transition hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c8ff00] text-[10px] font-black text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-[12px] text-[#a5a8ae] transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#454950] text-[10px] text-[#d1d3d7]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
