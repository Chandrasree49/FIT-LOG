import Image from "next/image";
import Logo from '../assets/logo.png'
export default function Footer() {
    return (
      <footer className="border-t border-[#1f2228] bg-[#0b0d10]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
  
          {/* LEFT - LOGO */}
          <div className="flex items-center gap-2">
            
          <Image
            src={Logo}
            alt="FitLog logo"
            width={18}
            height={18}
          />
            <span className="text-[10px] font-black tracking-wide text-white">
              FITLOG
            </span>
          </div>
  
          {/* RIGHT - COPYRIGHT */}
          <p className="text-right text-[9px] text-[#6f737b]">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
  
        </div>
      </footer>
    );
  }