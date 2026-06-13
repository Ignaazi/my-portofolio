"use client";

import { Code2 } from "lucide-react";

interface SkillsPageProps {
  isDarkMode: boolean;
}

export default function SkillsPage({ isDarkMode }: SkillsPageProps) {
  // Data list skill disesuaikan dengan gambar image_fd62d5.png
  const skillItemsRow1 = [
    { name: "typescript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "nextJs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "viteJs", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" },
    { name: "react", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "tailwind", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" },
  ];

  const skillItemsRow2 = [
    { name: "nodeJs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "javascript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "html", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    // Ditambah sedikit biar baris bawah seimbang panjangnya
    { name: "css", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  ];

  // Duplikasi array agar looping jalannya mulus tanpa putus
  const doubleRow1 = [...skillItemsRow1, ...skillItemsRow1, ...skillItemsRow1];
  const doubleRow2 = [...skillItemsRow2, ...skillItemsRow2, ...skillItemsRow2];

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden">
      {/* Header Judul */}
      <div className="space-y-1">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${
          isDarkMode ? "text-white" : "text-[#012970]"
        }`}>
          <Code2 size={20} className="text-orange-500" /> Skills
        </h2>
      </div>

      {/* Container Slider Utama (Membungkus 2 Baris) */}
      <div className="relative w-full overflow-hidden py-2 select-none mask-gradient-marquee flex flex-col gap-4">
        
        {/* ================= BARIS 1: JALAN KE KIRI ================= */}
        <div className="flex w-max gap-4 animate-marquee-ke-kiri">
          {doubleRow1.map((skill, index) => (
            <div
              key={`row1-${index}`}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border font-semibold text-sm transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#111c30] text-slate-200 border-white/5 shadow-[0px_8px_20px_rgba(0,0,0,0.3)]"
                  : "bg-white text-slate-800 border-[#e5e7eb] shadow-[0px_10px_20px_rgba(22,28,45,0.04)]"
              }`}
            >
              <div className={`w-7 h-7 flex items-center justify-center rounded-md shrink-0 overflow-hidden ${
                isDarkMode ? "bg-white/5" : "bg-slate-50"
              }`}>
                <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" loading="lazy" />
              </div>
              <span className="tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* ================= BARIS 2: JALAN KE KANAN ================= */}
        <div className="flex w-max gap-4 animate-marquee-ke-kanan">
          {doubleRow2.map((skill, index) => (
            <div
              key={`row2-${index}`}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border font-semibold text-sm transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#111c30] text-slate-200 border-white/5 shadow-[0px_8px_20px_rgba(0,0,0,0.3)]"
                  : "bg-white text-slate-800 border-[#e5e7eb] shadow-[0px_10px_20px_rgba(22,28,45,0.04)]"
              }`}
            >
              <div className={`w-7 h-7 flex items-center justify-center rounded-md shrink-0 overflow-hidden ${
                isDarkMode ? "bg-white/5" : "bg-slate-50"
              }`}>
                <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" loading="lazy" />
              </div>
              <span className="tracking-wide">{skill.name}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Injection CSS Custom untuk Arah Pergerakan Masing-Masing Baris */}
      <style>{`
        .mask-gradient-marquee {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
        
        /* Baris Atas ke Kiri */
        .animate-marquee-ke-kiri {
          display: flex;
          width: max-content;
          animation: jalanKeKiri 28s linear infinite;
        }

        /* Baris Bawah ke Kanan */
        .animate-marquee-ke-kanan {
          display: flex;
          width: max-content;
          animation: jalanKeKanan 28s linear infinite;
        }

        /* Efek Pause Saat Hover */
        .animate-marquee-ke-kiri:hover,
        .animate-marquee-ke-kanan:hover {
          animation-play-state: paused;
        }

        /* Keyframes Gerak Kiri */
        @keyframes jalanKeKiri {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* Keyframes Gerak Kanan */
        @keyframes jalanKeKanan {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}