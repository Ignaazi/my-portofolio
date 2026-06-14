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

  // Menyamakan warna grid putih kontribusi agar serasi dengan bagian experience
  const githubTheme = {
    light: ["#f8fafc", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#0f172a", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6 animate-fade-in text-left">
      
      {/* ==================== 1. JUDUL UTAMA ==================== */}
      <div className={`flex flex-col items-center justify-center border-t pt-4 ${navbarBorderColor}`}>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight text-center ${textTitleColor}`}>
          Social & Activity
        </h1>
      </div>

      {/* ==================== 2. SEKSI LAYOUT GITHUB PROFILE ==================== */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* KOLOM KIRI (lg:col-span-10) - Area Kalender */}
        <div className="lg:col-span-10 flex flex-col gap-4 w-full">
          
          {/* Teks Total Kontribusi atas Kiri */}
          <div className="flex items-center justify-between px-1">
            <h3 className={`text-lg font-semibold tracking-tight ${textTitleColor}`}>
              {totalContributions} contributions in {selectedYear}
            </h3>
          </div>

          {/* Box Pembungkus Kalender Grafik Kontribusi */}
          <div className={`p-5 rounded-xl border bg-transparent ${navbarBorderColor} w-full overflow-x-auto scrollbar-thin select-none [&_p]:hidden`}>
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
                      // Strategi Koordinat Berbasis Viewport Kursor/Layar Utama
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          text: `${activity.count} contributions on ${activity.date}`,
                          // Menggunakan koordinat relatif viewport Client browser (Aman dari scroll/overflow parent)
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
      {/* Menggunakan class 'fixed' dan z-[99999] agar dipaksa melayang di atas segalanya tanpa terhalang div lain */}
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