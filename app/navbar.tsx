"use client";

import { Bell, ChevronDown, Mail, Menu, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
  currentLang?: { code: string; name: string; flag: string };
  setCurrentLang?: (lang: { code: string; name: string; flag: string }) => void;
}

export default function Navbar({ 
  isDarkMode, 
  setIsDarkMode, 
  isSidebarCollapsed, 
  setIsSidebarCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  currentLang,
  setCurrentLang
}: NavbarProps) {
  
  // State cadangan lokal jika di parent belum didefinisikan
  const [localLang, setLocalLang] = useState({
    code: "ID",
    name: "Indonesia",
    flag: "https://flagcdn.com/w40/id.png"
  });

  const activeLang = currentLang || localLang;
  const handleLangChange = setCurrentLang || setLocalLang;

  // State untuk mengontrol dropdown utilitas
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const languages = [
    { code: "ID", name: "Indonesia", flag: "https://flagcdn.com/w40/id.png" },
    { code: "EN", name: "English", flag: "https://flagcdn.com/w40/us.png" },
    { code: "JP", name: "Japan", flag: "https://flagcdn.com/w40/jp.png" }
  ];

  // Dummy data untuk popup
  const notifications = [
    { id: 1, text: "Alex Thompson completed purchase workflow." },
    { id: 2, text: "System deployment v3.2.1 passed checks." },
    { id: 3, text: "Storage usage crossed 80% on media bucket." }
  ];

  const messages = [
    { id: 1, from: "Sarah Wilson", text: "Submitted dashboard UX revisions." },
    { id: 2, from: "Admin Team", text: "Billing retry required for invoice #INV-8043." }
  ];

  const searchPlaceholders: Record<string, string> = {
    ID: "Cari proyek, riwayat, pengguna...",
    EN: "Search projects, history, users...",
    JP: "プロジェクト、履歴、ユーザーを検索..."
  };

  return (
    <nav className={`fixed top-0 right-0 h-16 z-40 flex items-center justify-between px-6 border-b transition-all duration-300 ${
      isDarkMode ? "bg-[#111c30] border-white/10 shadow-lg" : "bg-white border-slate-200 shadow-xs"
    } ${
      isSidebarCollapsed ? "left-0 md:left-20" : "left-0 md:left-64"
    }`}>
      
      {/* ==================== SISI KIRI: HAMBURGER & SEARCH KOTAK ==================== */}
      <div className="flex items-center gap-4 flex-1 mr-4">
        {/* Desktop Hamburger */}
        <button 
          type="button"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden md:block p-2 rounded-none border-[1px] transition-all active:scale-95 shrink-0 ${
            isDarkMode 
              ? "text-slate-200 border-white/10 bg-slate-900 hover:border-orange-500" 
              : "text-slate-800 border-slate-200 bg-white hover:border-orange-500"
          }`}
        >
          <Menu size={16} className="stroke-[2.5]" />
        </button>

        {/* Mobile Hamburger */}
        <button 
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`block md:hidden p-2 rounded-none border-[1px] transition-all active:scale-95 shrink-0 ${
            isDarkMode 
              ? "text-slate-200 border-white/10 bg-slate-900 hover:border-orange-500" 
              : "text-slate-800 border-slate-200 bg-white hover:border-orange-500"
          }`}
        >
          <Menu size={16} className="stroke-[2.5]" />
        </button>

        {/* SEARCH BAR KOTAK SERPAGAM */}
        <div className="relative max-w-xs w-full hidden sm:block">
          <input 
            type="text" 
            placeholder={searchPlaceholders[activeLang.code] || searchPlaceholders.ID}
            className={`w-full py-2 pl-3 pr-9 rounded-none border-[1px] text-xs font-bold outline-none transition-all ${
              isDarkMode 
                ? "bg-slate-900 border-white/10 text-white focus:border-orange-500" 
                : "bg-white border-slate-200 text-slate-800 focus:border-orange-500"
            }`}
          />
          <Search size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 stroke-[2.5] ${isDarkMode ? "text-slate-400" : "text-slate-800"}`} />
        </div>
      </div>

      {/* ==================== SISI KANAN: UTILITIES KOTAK SERAGAM & PROFIL ==================== */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* 1. TRANSLATE BAHASA DROPDOWN */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsLangOpen(!isLangOpen);
              setIsNotifOpen(false);
              setIsMessageOpen(false);
            }}
            className={`flex items-center gap-2 p-1.5 px-2.5 h-9 rounded-none border-[1px] text-xs font-bold uppercase tracking-wider transition-all ${
              isDarkMode 
                ? "bg-slate-900 border-white/10 text-white hover:border-orange-500" 
                : "bg-white border-slate-200 text-slate-800 hover:border-orange-500"
            }`}
          >
            <img 
              src={activeLang.flag} 
              alt={activeLang.name} 
              className="w-4 h-auto object-cover border border-slate-200/40"
            />
            <span>{activeLang.code}</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          {isLangOpen && (
            <div className={`absolute right-0 mt-1 w-36 rounded-none border-[1px] shadow-xl z-50 ${
              isDarkMode ? "bg-slate-900 border-white/10 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    handleLangChange(lang);
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs font-bold transition-colors ${
                    isDarkMode ? "hover:bg-white/5" : "hover:bg-slate-50 hover:text-orange-500"
                  }`}
                >
                  <img src={lang.flag} alt={lang.name} className="w-4 h-auto border border-slate-200/50" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. ICON LONCENG (NOTIFIKASI) - BULAT CERAH & POPUP */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsLangOpen(false);
              setIsMessageOpen(false);
            }}
            className={`p-2 h-9 w-9 flex items-center justify-center rounded-none border-[1px] transition-all ${
              isDarkMode 
                ? "bg-slate-900 border-white/10 text-slate-200 hover:border-orange-500" 
                : "text-slate-800 border-slate-200 bg-white hover:border-orange-500"
            }`}
          >
            <Bell size={16} className="stroke-[2.5]" />
          </button>
          {/* Lencana Bulat (rounded-full) Warna Merah Pink Cerah, Font Putih Nunito */}
          <span className="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[9px] font-sans font-black w-4 h-4 flex items-center justify-center rounded-full border-[1px] border-white dark:border-[#111c30]">
            3
          </span>

          {/* Popup List Notifikasi */}
          {isNotifOpen && (
            <div className={`absolute right-0 mt-1 w-64 rounded-none border-[1px] shadow-xl z-50 p-2 text-xs font-sans ${
              isDarkMode ? "bg-slate-900 border-white/10 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}>
              <div className="p-1.5 font-black uppercase tracking-wider border-b border-dashed border-slate-200 dark:border-white/10 text-orange-500">
                Notifications
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="p-2 border-b last:border-0 border-slate-100 dark:border-white/5 opacity-80 hover:opacity-100">
                  {n.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. ICON PESAN (MAIL) - BULAT CERAH & POPUP */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsMessageOpen(!isMessageOpen);
              setIsLangOpen(false);
              setIsNotifOpen(false);
            }}
            className={`p-2 h-9 w-9 flex items-center justify-center rounded-none border-[1px] transition-all ${
              isDarkMode 
                ? "bg-slate-900 border-white/10 text-slate-200 hover:border-orange-500" 
                : "text-slate-800 border-slate-200 bg-white hover:border-orange-500"
            }`}
          >
            <Mail size={16} className="stroke-[2.5]" />
          </button>
          {/* Lencana Bulat (rounded-full) Warna Merah Pink Cerah, Font Putih Nunito */}
          <span className="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[9px] font-sans font-black w-4 h-4 flex items-center justify-center rounded-full border-[1px] border-white dark:border-[#111c30]">
            2
          </span>

          {/* Popup List Pesan */}
          {isMessageOpen && (
            <div className={`absolute right-0 mt-1 w-64 rounded-none border-[1px] shadow-xl z-50 p-2 text-xs font-sans ${
              isDarkMode ? "bg-slate-900 border-white/10 text-slate-200" : "bg-white border-slate-200 text-slate-800"
            }`}>
              <div className="p-1.5 font-black uppercase tracking-wider border-b border-dashed border-slate-200 dark:border-white/10 text-orange-500">
                Messages
              </div>
              {messages.map((m) => (
                <div key={m.id} className="p-2 border-b last:border-0 border-slate-100 dark:border-white/5">
                  <div className="font-bold text-blue-500">{m.from}</div>
                  <div className="opacity-80 text-[11px]">{m.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. MODE GELAP / TERANG BUTTON */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 h-9 w-9 flex items-center justify-center rounded-none border-[1px] transition-all active:scale-95 ${
            isDarkMode 
              ? "bg-slate-900 border-white/10 text-yellow-400 hover:border-orange-500" 
              : "bg-white border-slate-200 text-slate-800 hover:border-orange-500"
          }`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* ==================== 5. AVATAR FOTO PROFIL (TULISAN APUS) ==================== */}
        <div className="flex items-center pl-1 shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 border-[1px] border-orange-500 overflow-hidden relative shadow-xs">
            <Image
              src="/assets/aji.jpg"
              alt="M. Ignazi"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

      </div>

    </nav>
  );
}