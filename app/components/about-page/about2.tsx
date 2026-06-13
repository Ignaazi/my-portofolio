"use client";

import { FaExternalLinkAlt, FaGithub, FaPlay, FaTiktok } from "react-icons/fa";

interface About2PageProps {
  isDarkMode: boolean;
}

export default function About2Page({ isDarkMode }: About2PageProps) {
  const textTitleColor = isDarkMode ? "text-white" : "text-[#012970]";
  const textBodyColor = isDarkMode ? "text-slate-300" : "text-slate-700";
  
  const niceAdminBorder = isDarkMode ? "border-slate-800/80" : "border-[#e0e9f7]";
  const niceAdminBgCard = isDarkMode ? "bg-[#111c30]/40" : "bg-white";

  // Data Mockup Kontribusi GitHub
  const githubWeeks = Array.from({ length: 26 }, () => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );

  const getContributionColor = (level: number) => {
    if (isDarkMode) {
      switch (level) {
        case 1: return "bg-green-950";
        case 2: return "bg-green-800";
        case 3: return "bg-green-600";
        case 4: return "bg-green-400";
        default: return "bg-slate-800";
      }
    } else {
      switch (level) {
        case 1: return "bg-[#9be9a8]";
        case 2: return "bg-[#40c463]";
        case 3: return "bg-[#30a14e]";
        case 4: return "bg-[#216e39]";
        default: return "bg-[#ebedf0]";
      }
    }
  };

  const tiktokVideos = [
    { id: 1, views: "9870", thumbnail: "/assets/tt-1.png", title: "Jasa Pembuatan Website" },
    { id: 2, views: "166.2K", thumbnail: "/assets/tt-2.png", title: "Black Friday Project" },
    { id: 3, views: "300.3K", thumbnail: "/assets/tt-3.png", title: "Gua Belajar Coding" },
    { id: 4, views: "2870", thumbnail: "/assets/tt-4.png", title: "Website Klien Jangan Asal Upload" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 py-6 animate-fade-in text-left">
      
      {/* ==================== 1. JUDUL UTAMA ==================== */}
      <div className={`flex flex-col items-center justify-center border-b pb-4 ${niceAdminBorder}`}>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight text-center ${textTitleColor}`}>
          Social & Activity
        </h1>
      </div>

      {/* ==================== 2. SEKSI GITHUB CONTRIBUTIONS ==================== */}
      <div className={`p-5 rounded-2xl border flex flex-col gap-4 ${niceAdminBgCard} ${niceAdminBorder}`}>
        <div className="flex items-center justify-between border-b pb-3 border-dashed border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <FaGithub className={`text-xl ${textTitleColor}`} />
            <h3 className={`text-base font-black tracking-tight ${textTitleColor}`}>
              GitHub Contributions
            </h3>
          </div>
          <a 
            href="https://github.com/ignaazi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"
          >
            @ignaazi <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>

        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <div className="min-w-[660px] flex flex-col gap-1 p-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-6 mb-1">
              <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
            
            <div className="flex gap-1">
              <div className="flex flex-col justify-between text-[10px] text-slate-400 font-medium h-[82px] pr-2 w-6 text-right">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="flex-1 flex gap-[3px]">
                {githubWeeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((dayLevel, dIdx) => (
                      <div 
                        key={dIdx} 
                        className={`w-[9px] h-[9px] rounded-[1.5px] transition-colors duration-200 ${getContributionColor(dayLevel)}`}
                        title={`Level kontribusi: ${dayLevel}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-1">
          <span>335 contributions in the last half year</span>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-slate-200 dark:bg-slate-800" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-300 dark:bg-green-950" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-400 dark:bg-green-800" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-600 dark:bg-green-600" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-800 dark:bg-green-400" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ==================== 3. SEKSI TIKTOK PROFILE EMBED ==================== */}
      <div className={`p-5 rounded-2xl border flex flex-col gap-4 ${niceAdminBgCard} ${niceAdminBorder}`}>
        <div className="flex items-center justify-between border-b pb-3 border-dashed border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <FaTiktok className="text-xl text-pink-500" />
            <h3 className={`text-base font-black tracking-tight ${textTitleColor}`}>
              TIKTOK PROFILE
            </h3>
          </div>
          <span className="text-sm font-black tracking-wider text-slate-400 dark:text-slate-500">
            @antheraazi
          </span>
        </div>

        <div className="w-full max-w-2xl mx-auto border rounded-2xl p-6 bg-white dark:bg-slate-900/60 shadow-sm border-slate-200 dark:border-slate-800 flex flex-col gap-5">
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-24 h-24 rounded-full border-2 border-slate-200 dark:border-slate-700 p-1 bg-gradient-to-tr from-pink-500 to-cyan-400 shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-2xl tracking-tighter">
                AA_
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-2 flex-1">
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                antheraazi
              </h2>
              
              <div className="flex items-center gap-6 text-center sm:text-left">
                <div>
                  <div className="text-base font-black text-slate-800 dark:text-white">167</div>
                  <div className="text-[11px] text-slate-400 font-medium">Mengikuti</div>
                </div>
                <div className="border-r h-6 border-slate-200 dark:border-slate-800" />
                <div>
                  <div className="text-base font-black text-slate-800 dark:text-white">6165</div>
                  <div className="text-[11px] text-slate-400 font-medium">Pengikut</div>
                </div>
                <div className="border-r h-6 border-slate-200 dark:border-slate-800" />
                <div>
                  <div className="text-base font-black text-slate-800 dark:text-white">255.1K</div>
                  <div className="text-[11px] text-slate-400 font-medium">Suka</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs md:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 text-center sm:text-left border-t border-b py-3 border-slate-100 dark:border-slate-800/60">
            <p>2,5 years Fullstack Web Developer 👩‍💻☕</p>
            <p>Open Jasa Pembuatan Website... <span className="font-bold cursor-pointer text-slate-800 dark:text-white hover:underline">Lihat lainnya</span></p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            {tiktokVideos.map((video) => (
              <div 
                key={video.id} 
                className="group relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-700/80 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                
                <div className="absolute inset-0 flex flex-col justify-between p-3 z-20">
                  <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <FaTiktok className="text-[10px] text-cyan-300" />
                  </div>

                  <div className="flex items-center gap-1 text-white text-[11px] font-black tracking-tight drop-shadow-md">
                    <FaPlay className="text-[9px]" />
                    <span>{video.views}</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3 text-center z-30">
                  <p className="text-white text-[11px] font-bold leading-snug">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end mt-2">
            <a 
              href="https://www.tiktok.com/@antheraazi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#fe2c55] text-white font-black text-xs md:text-sm tracking-wide shadow-md hover:bg-[#e12246] transition-colors flex items-center gap-2"
            >
              <FaTiktok className="text-sm" /> Buka TikTok
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}