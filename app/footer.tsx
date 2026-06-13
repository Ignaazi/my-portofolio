"use client";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  // Mengunci warna border soft premium NiceAdmin sesuai gambar image_07ea09.png
  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]";

  return (
    <footer className={`w-full py-6 text-center border-t transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0b1425] text-slate-400" 
        : "bg-white text-slate-900"
    } ${niceAdminBorder}`}>
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          © 2026 Copyright By <span className="font-black uppercase">M. Ignazi</span>
        </p>
      </div>
    </footer>
  );
}