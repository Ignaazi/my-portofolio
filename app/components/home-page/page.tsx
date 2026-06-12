"use client";

import { Download } from "lucide-react";

interface HomePageProps {
  isDarkMode: boolean;
}

export default function HomePage({ isDarkMode }: HomePageProps) {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* ==================== HERO SECTION CONTAINER (SEKARANG PUTIH) ==================== */}
      <section 
        className={`w-full rounded-xl p-6 md:p-8 relative overflow-hidden transition-colors duration-300 border ${
          isDarkMode 
            ? "bg-[#111c30] border-white/5 text-white" 
            : "bg-white border-slate-200 text-slate-800 shadow-xs"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Kiri: Teks Salam & Intro */}
          <div className="space-y-2 max-w-2xl">
            <h1 className={`text-2xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2 flex-wrap ${
              isDarkMode ? "text-white" : "text-[#012970]"
            }`}>
              Hi There 👋, I'm <span>M ignazi</span> 🤝
            </h1>
            <p className={`text-sm md:text-base font-bold flex items-center gap-1.5 ${
              isDarkMode ? "text-slate-300" : "text-slate-500"
            }`}>
              Fullstack Web Developer <span className="opacity-40">•</span> Based in Indonesia
            </p>
          </div>

          {/* Kanan: Ikon Sosial Media SVG Resmi */}
          <div className="flex items-center gap-3 shrink-0">
            {/* LinkedIn */}
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0077B5] flex items-center justify-center text-white hover:scale-110 transition-transform" title="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            {/* GitHub */}
            <a href="#" className="w-8 h-8 rounded-lg bg-[#24292E] flex items-center justify-center text-white hover:scale-110 transition-transform" title="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FFB200] via-[#D52685] to-[#4F5BD5] flex items-center justify-center text-white hover:scale-110 transition-transform" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* TikTok */}
            <a href="#" className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white hover:scale-110 transition-transform" title="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31.01 2.61.17 3.86.48v3.56c-.72-.18-1.46-.26-2.2-.26v3.29c1.94 0 3.75.7 5.16 1.98.05.05.1.1.15.15v3.42c-.93-.68-2.02-1.07-3.17-1.12v6.86c0 3.16-2.56 5.72-5.72 5.72s-5.72-2.56-5.72-5.72 2.56-5.72 5.72-5.72c.46 0 .9.05 1.33.16V3.53C9.44 1.54 10.74.22 12.525.02z"/></svg>
            </a>
          </div>
        </div>

        {/* Paragraf Utama Deskripsi */}
        <p className={`mt-4 text-xs md:text-sm font-medium leading-relaxed max-w-4xl ${
          isDarkMode ? "text-slate-300" : "text-slate-600"
        }`}>
          I am a <span className="text-orange-500 font-bold">Fullstack Web Developer</span> who has a passion for Web Development. One of my life mottos is "Don't rush the process, trust that great things take time."
        </p>

        {/* Tombol Download CV Solid Orange */}
        <div className="mt-5">
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all duration-200">
            <Download size={14} strokeWidth={3} />
            Download CV
          </button>
        </div>
      </section>
    </div>
  );
}