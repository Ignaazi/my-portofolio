"use client";

import { useEffect, useState } from "react";
import { Activity, GitHubCalendar } from "react-github-calendar";

interface About2PageProps {
  isDarkMode: boolean;
}

interface TooltipState {
  text: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function About2Page({ isDarkMode }: About2PageProps) {
  // Menyamakan warna border luar agar persis seperti warna garis navbar
  const navbarBorderColor = isDarkMode ? "border-slate-800/80" : "border-[#e0e9f7]";
  const textTitleColor = isDarkMode ? "text-white" : "text-[#012970]";

  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [apiData, setApiData] = useState<Activity[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);

  // State Tooltip Fixed Viewport
  const [tooltip, setTooltip] = useState<TooltipState>({
    text: "",
    x: 0,
    y: 0,
    visible: false,
  });
  
  const availableYears = [2026, 2025, 2024, 2023];

  useEffect(() => {
    if (apiData.length > 0) {
      const total = apiData.reduce((sum, day) => sum + day.count, 0);
      setTotalContributions(total);
    } else {
      setTotalContributions(0);
    }
  }, [apiData, selectedYear]);

  // Warna kotak kecil kontribusi (Index 0 kembali ke abu-abu standar agar estetik di atas background putih)
  const githubTheme = {
    light: ["#ebedf0", "#44c06b", "#22c55e", "#10b981", "#34d399"],
    dark: ["#161b22", "#064e3b", "#059669", "#10b981", "#34d399"],
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6 animate-fade-in text-left">
      
      {/* ==================== 1. JUDUL UTAMA ==================== */}
      <div className={`flex flex-col items-center justify-center border-t pt-4 ${navbarBorderColor}`}>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight text-center ${textTitleColor}`}>
          Github Activity
        </h1>
      </div>

      {/* ==================== 2. SEKSI LAYOUT GITHUB PROFILE ==================== */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* KOLOM KIRI (lg:col-span-10) - Area Kalender */}
        <div className="lg:col-span-10 flex flex-col gap-4 w-full">
          
          {/* Header Atas Kalender: Logo GitHub + Teks Kiri, Total Kanan */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            {/* Logo dan Tulisan Github Activity */}
            <div className={`flex items-center gap-2 font-bold text-lg tracking-tight ${textTitleColor}`}>
              <svg 
                height="22" 
                viewBox="0 0 16 16" 
                version="1.1" 
                width="22" 
                aria-hidden="true"
                className="fill-current"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span>GitHub Activity</span>
            </div>

            {/* Teks Total Kontribusi */}
            <h3 className={`text-base font-semibold tracking-tight ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              {totalContributions} contributions in {selectedYear}
            </h3>
          </div>

          {/* Box Pembungkus Kalender Grafik Kontribusi */}
          {/* SEKARANG SUDAH FIX PUTIH BERSIH (bg-white) di Light Mode & Gelap Menyesuaikan di Dark Mode */}
          <div className={`p-5 rounded-xl border bg-white dark:bg-slate-900/40 ${navbarBorderColor} w-full overflow-x-auto scrollbar-thin select-none [&_p]:text-slate-850 dark:[&_p]:text-slate-400 [&_p]:font-medium`}>
            <div className="min-w-190 flex justify-center dark:text-white bg-transparent py-2 relative">
              <GitHubCalendar 
                username="ignaazi" 
                year={selectedYear}
                blockSize={13}     
                blockMargin={3}    
                fontSize={12}
                theme={githubTheme}
                colorScheme={isDarkMode ? "dark" : "light"}
                transformData={(data) => {
                  setTimeout(() => setApiData(data), 0);
                  return data;
                }}
                renderBlock={(block, activity) => {
                  return (
                    <rect
                      {...block.props}
                      style={{
                        ...block.props.style,
                        cursor: "pointer",
                      }}
                      className="transition-all duration-100 hover:stroke-slate-400 hover:stroke-[1px]"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          text: `${activity.count} contributions on ${activity.date}`,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10,
                          visible: true,
                        });
                      }}
                      onMouseLeave={() => {
                        setTooltip((prev) => ({ ...prev, visible: false }));
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (lg:col-span-2) - Daftar Navigasi Filter Tahun Menurun */}
        <div className="lg:col-span-2 flex flex-col gap-1 w-full pt-0 lg:pt-11">
          {availableYears.map((year) => {
            const isCurrent = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setApiData([]);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-bold rounded-lg transition-all duration-150 ${
                  isCurrent
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-orange-500"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>

      </div>

      {/* ==================== 3. FIXED VIEWPORT CUSTOM TOOLTIP ==================== */}
      {tooltip.visible && (
        <div
          style={{
            top: `${tooltip.y}px`,
            left: `${tooltip.x}px`,
            transform: "translate(-50%, -100%)",
          }}
          className="fixed pointer-events-none z-[99999] bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1.5 rounded shadow-2xl text-center whitespace-nowrap border border-slate-700/60 transition-opacity duration-100 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-900"
        >
          {tooltip.text}
        </div>
      )}

    </div>
  );
}