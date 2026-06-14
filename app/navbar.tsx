"use client";

import { Bell, ChevronDown, Mail, Menu, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  // Ditambahkan properti googleCode agar klop dengan skrip Google Translate di layout
  const languages = [
    { code: "ID", name: "Indonesia", flag: "https://flagcdn.com/w40/id.png", googleCode: "id" },
    { code: "EN", name: "English", flag: "https://flagcdn.com/w40/us.png", googleCode: "en" },
    { code: "JP", name: "Japan", flag: "https://flagcdn.com/w40/jp.png", googleCode: "ja" }
  ];

  // Efek untuk membaca bahasa aktif dari Cookie Google saat web pertama kali dibuka
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const googTrans = getCookie('googtrans');
    if (googTrans) {
      const langTarget = googTrans.split('/').pop()?.toUpperCase();
      const matchedLang = languages.find(l => l.code === langTarget);
      if (matchedLang) {
        handleLangChange({ code: matchedLang.code, name: matchedLang.name, flag: matchedLang.flag });
      }
    }
  }, []);

  // FUNGSI AUTO-TRANSLATE GLOBAL (Sistem Paksa Cookie + DOM Trigger)
  const triggerGoogleTranslate = (langCode: string) => {
    // 1. Atur Cookie Google Translate secara manual agar Next.js membacanya secara permanen
    const domain = window.location.hostname === "localhost" ? "" : `; domain=.${window.location.hostname}`;
    document.cookie = `googtrans=/id/${langCode}; path=/${domain}`;
    document.cookie = `googtrans=/id/${langCode}; path=/`;

    // 2. Cari elemen dropdown tersembunyi milik Google dan jalankan event change
    let attempts = 0;
    const runTranslate = () => {
      const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event("change"));
        
        // Sengaja di-reload kilat agar Next.js me-render ulang seluruh teks statis/dinamis dari server-side ke bahasa baru
        setTimeout(() => {
          window.location.reload();
        }, 150);
      } else if (attempts < 10) {
        attempts++;
        setTimeout(runTranslate, 200);
      } else {
        // Jika element drop-down terhambat, reload paksa agar cookie baru langsung bekerja mandiri
        window.location.reload();
      }
    };

    runTranslate();
  };

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

  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]";

  return (
    <nav className={`fixed top-0 right-0 h-16 z-40 flex items-center justify-between px-6 border-b transition-all duration-300 ${
      isDarkMode ? "bg-[#111c30] shadow-lg" : "bg-white shadow-xs"
    } ${niceAdminBorder} ${
      isSidebarCollapsed ? "left-0 md:left-20" : "left-0 md:left-64"
    }`}>
      
      {/* ==================== SISI KIRI: HAMBURGER & SEARCH KOTAK ==================== */}
      <div className="flex items-center gap-4 flex-1 mr-4">
        {/* Desktop Hamburger */}
        <button 
          type="button"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden md:block p-2 rounded-none border transition-all active:scale-95 shrink-0 ${
            isDarkMode ? "text-slate-200 bg-slate-900 hover:border-orange-500" : "text-slate-800 bg-white hover:border-orange-500"
          } ${niceAdminBorder}`}
        >
          <Menu size={16} className="stroke-[2.5]" />
        </button>

        {/* Mobile Hamburger */}
        <button 
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`block md:hidden p-2 rounded-none border transition-all active:scale-95 shrink-0 ${
            isDarkMode ? "text-slate-200 bg-slate-900 hover:border-orange-500" : "text-slate-800 bg-white hover:border-orange-500"
          } ${niceAdminBorder}`}
        >
          <Menu size={16} className="stroke-[2.5]" />
        </button>

        {/* SEARCH BAR KOTAK SERPAGAM */}
        <div className="relative max-w-xs w-full hidden sm:block">
          <input 
            type="text" 
            placeholder={searchPlaceholders[activeLang.code] || searchPlaceholders.ID}
            className={`w-full py-2 pl-3 pr-9 rounded-none border text-xs font-bold outline-none transition-all ${
              isDarkMode ? "bg-slate-900 text-white focus:border-orange-500" : "bg-white text-slate-800 focus:border-orange-500"
            } ${niceAdminBorder}`}
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
            className={`flex items-center gap-2 p-1.5 px-2.5 h-9 rounded-none border text-xs font-bold uppercase tracking-wider transition-all ${
              isDarkMode ? "bg-slate-900 text-white hover:border-orange-500" : "bg-white text-slate-800 hover:border-orange-500"
            } ${niceAdminBorder}`}
          >
            <img 
              src={activeLang.flag} 
              alt={activeLang.name} 
              className={`w-4 h-auto object-cover border ${niceAdminBorder}`}
            />
            <span>{activeLang.code}</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          {isLangOpen && (
            <div className={`absolute right-0 mt-1 w-36 rounded-none border shadow-xl z-50 ${
              isDarkMode ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"
            } ${niceAdminBorder}`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    handleLangChange({ code: lang.code, name: lang.name, flag: lang.flag }); 
                    triggerGoogleTranslate(lang.googleCode); 
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs font-bold transition-colors ${
                    isDarkMode ? "hover:bg-white/5" : "hover:bg-slate-50 hover:text-orange-500"
                  }`}
                >
                  <img src={lang.flag} alt={lang.name} className={`w-4 h-auto border ${niceAdminBorder}`} />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. ICON LONCENG (NOTIFIKASI) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsLangOpen(false); setIsMessageOpen(false); }}
            className={`p-2 h-9 w-9 flex items-center justify-center rounded-none border transition-all ${
              isDarkMode ? "bg-slate-900 text-slate-200 hover:border-orange-500" : "text-slate-800 bg-white hover:border-orange-500"
            } ${niceAdminBorder}`}
          >
            <Bell size={16} className="stroke-[2.5]" />
          </button>
          <span className="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[9px] font-sans font-black w-4 h-4 flex items-center justify-center rounded-full border border-white dark:border-[#111c30]">
            3
          </span>

          {isNotifOpen && (
            <div className={`absolute right-0 mt-1 w-64 rounded-none border shadow-xl z-50 p-2 text-xs font-sans ${
              isDarkMode ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"
            } ${niceAdminBorder}`}>
              <div className={`p-1.5 font-black uppercase tracking-wider border-b border-dashed text-orange-500 ${niceAdminBorder}`}>
                Notifications
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`p-2 border-b last:border-0 opacity-80 hover:opacity-100 ${isDarkMode ? "border-white/5" : "border-[#e0e9f7]/50"}`}>
                  {n.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. ICON PESAN (MAIL) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setIsMessageOpen(!isMessageOpen); setIsLangOpen(false); setIsNotifOpen(false); }}
            className={`p-2 h-9 w-9 flex items-center justify-center rounded-none border transition-all ${
              isDarkMode ? "bg-slate-900 text-slate-200 hover:border-orange-500" : "text-slate-800 bg-white hover:border-orange-500"
            } ${niceAdminBorder}`}
          >
            <Mail size={16} className="stroke-[2.5]" />
          </button>
          <span className="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[9px] font-sans font-black w-4 h-4 flex items-center justify-center rounded-full border border-white dark:border-[#111c30]">
            2
          </span>

          {isMessageOpen && (
            <div className={`absolute right-0 mt-1 w-64 rounded-none border shadow-xl z-50 p-2 text-xs font-sans ${
              isDarkMode ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"
            } ${niceAdminBorder}`}>
              <div className={`p-1.5 font-black uppercase tracking-wider border-b border-dashed text-orange-500 ${niceAdminBorder}`}>
                Messages
              </div>
              {messages.map((m) => (
                <div key={m.id} className={`p-2 border-b last:border-0 ${isDarkMode ? "border-white/5" : "border-[#e0e9f7]/50"}`}>
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
          className={`p-2 h-9 w-9 flex items-center justify-center rounded-none border transition-all active:scale-95 ${
            isDarkMode ? "bg-slate-900 text-yellow-400 hover:border-orange-500" : "bg-white text-slate-800 hover:border-orange-500"
          } ${niceAdminBorder}`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* 5. AVATAR FOTO PROFIL */}
        <div className="flex items-center pl-1 shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-orange-500 overflow-hidden relative shadow-xs">
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