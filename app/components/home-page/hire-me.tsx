"use client";

import { Heart } from "lucide-react";

interface HireMePageProps {
  isDarkMode: boolean;
}

export default function HireMePage({ isDarkMode }: HireMePageProps) {
  // Menyamakan border dan shadow dengan section lainnya
  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]";

  const niceAdminShadow = isDarkMode
    ? "shadow-[0px_20px_40px_rgba(0,0,0,0.45)] bg-[#111c30] text-white"
    : "shadow-[0px_22px_30px_rgba(1,41,112,0.08)] bg-white text-slate-800";

  return (
    <section 
      className={`w-full rounded-2xl p-6 md:p-8 relative overflow-hidden border transition-colors duration-300 ${niceAdminBorder} ${niceAdminShadow}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Kiri: Teks Konten & Tombol Aksi */}
        <div className="flex-1 space-y-5 max-w-2xl">
          {/* Judul Besar Utama — Tulisan Next Project sekarang warna ORANGE */}
          <h2 className={`text-2xl md:text-4xl font-extrabold tracking-tight leading-tight ${
            isDarkMode ? "text-white" : "text-slate-800"
          }`}>
            I'm Ready To Be Hired For Your <span className="text-orange-500">Next Project.</span>
          </h2>

          {/* Deskripsi */}
          <p className={`text-xs md:text-sm font-medium leading-relaxed ${
            isDarkMode ? "text-slate-300" : "text-slate-500"
          }`}>
            I am an expert in Front End Development and Fullstack Web Developer, let's work together so that your project has good quality and good results.
          </p>

          {/* Statistik Project */}
          <div className="space-y-0.5">
            <div className={`text-2xl md:text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              100+
            </div>
            <div className={`text-xs md:text-sm font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Projects Completed
            </div>
          </div>

          {/* Grup Tombol (Hire Me & Trakteer) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Tombol Hire Me dengan Bayangan Tebal */}
            <a
              href="mailto:emailkamu@gmail.com"
              className={`inline-flex items-center gap-2 font-extrabold text-xs px-6 py-3 rounded-xl border border-slate-800 transition-all duration-200 active:scale-95 ${
                isDarkMode 
                  ? "bg-white text-slate-900 shadow-[0px_4px_0px_#475569]" 
                  : "bg-white text-slate-800 shadow-[0px_5px_0px_rgba(0,0,0,0.8)]"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              Hire Me!
            </a>

            {/* Tombol Trakteer Merah */}
            <a
              href="https://trakteer.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ca2229] hover:bg-[#b01c22] active:scale-95 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-sm transition-all duration-200"
            >
              <Heart size={14} fill="currentColor" />
              Trakteer
            </a>
          </div>
        </div>

        {/* Kanan: Menggunakan File Lokal public/assets/backgorund.png */}
        <div className="w-full lg:w-[35%] max-w-[320px] mx-auto lg:mx-0 shrink-0 flex justify-center items-center">
          <img 
            src="/assets/background.png" 
            alt="Hired Illustration" 
            className="w-full h-auto object-contain select-none filter drop-shadow-md"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}