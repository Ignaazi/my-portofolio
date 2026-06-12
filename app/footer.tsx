"use client";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`w-full py-6 text-center border-t transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0b1425] border-white/10 text-slate-400" 
        : "bg-white border-slate-200 text-slate-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          © 2026 Copyright By <span className="font-black uppercase">M. Ignazi</span>
        </p>
      </div>
    </footer>
  );
}