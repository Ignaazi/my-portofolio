"use client";

import { BookOpen, Briefcase, Home, Mail, User } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isSidebarCollapsed: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export default function Sidebar({
  isDarkMode,
  activeTab,
  setActiveTab,
  isSidebarCollapsed,
  isMobileOpen,
  setIsMobileOpen
}: SidebarProps) {
  
  const menuItems = [
    { label: "Home", tab: "Home", icon: <Home size={20} /> },
    { label: "About", tab: "About", icon: <User size={20} /> },
    { label: "Project", tab: "Project", icon: <Briefcase size={20} /> },
    { label: "Blog", tab: "Blog", icon: <BookOpen size={20} /> },
    { label: "Contact", tab: "Contact", icon: <Mail size={20} /> }
  ];

  return (
    <>
      {/* SIDEBAR CONTAINER */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 border-r transition-all duration-300 flex flex-col justify-between rounded-none ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } ${
        isDarkMode ? "bg-[#111c30] border-white/10 text-slate-300" : "bg-white border-slate-200 text-slate-700"
      } ${
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
      }`}>
        
        <div className="w-full">
          {/* ==================== 1. LOGO AREA (PERBATASAN ATAS) ==================== */}
          <div className={`h-16 flex items-center border-b ${
            isDarkMode ? "border-white/10" : "border-slate-200"
          } ${isSidebarCollapsed ? "justify-center" : "px-6 justify-start"}`}>
            <span className={`text-base font-black tracking-tight uppercase ${
              isDarkMode ? "text-white" : "text-[#012970]"
            }`}>
              {isSidebarCollapsed ? "AJ" : <>AJITECH    </>}
            </span>
          </div>

          {/* ==================== 2. PROFILE AREA DENGAN LENGKUNGAN ORANYE GRADASI ACCENT ==================== */}
          {!isSidebarCollapsed ? (
            <div className="w-full pb-5 text-center relative">
              {/* Efek Garis Melengkung Dengan Oranye Gradasi Keren */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-500 via-orange-400 to-amber-500 rounded-b-[40px] shadow-xs" />
              
              {/* Avatar Murni Bulat Polos Tanpa Border Hitam Sesuai Request */}
              <div className="relative pt-8 z-10">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-md">
                  <Image 
                    src="/assets/aji.jpg" 
                    alt="M. Ignazi" 
                    width={80} 
                    height={80} 
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Nama & Username */}
              <div className="relative z-10 mt-2">
                <h3 className={`text-sm font-black uppercase tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  M. Ignazi
                </h3>
                <p className="text-[10px] font-bold text-orange-500 tracking-wide mt-0.5">@mhmmdignazi</p>
              </div>
            </div>
          ) : (
            /* Mini Avatar area saat Collapsed */
            <div className="w-full py-4 flex justify-center border-b border-dashed border-slate-200 dark:border-white/10">
              <div className="w-9 h-9 rounded-full overflow-hidden relative">
                <Image 
                  src="/assets/aji.jpg" 
                  alt="Aji" 
                  width={36} 
                  height={36} 
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          {/* SEPARATOR LINE */}
          <div className="border-b border-slate-100 dark:border-white/5 w-full mb-4" />

          {/* ==================== 3. MENU NAVIGASI (HOVER & ACTIVE ORANYE SAMAR) ==================== */}
          <div className="px-3 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setIsMobileOpen(false);
                  }}
                  title={item.label}
                  className={`w-full flex items-center transition-all duration-200 rounded-[12px] ${
                    isSidebarCollapsed 
                      ? "justify-center p-3" 
                      : "gap-4 px-4 py-3 text-sm font-bold tracking-wide"
                  } ${
                    isActive 
                      ? "bg-orange-500/10 text-orange-500 font-extrabold"
                      : isDarkMode
                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-orange-500 hover:bg-orange-500/5"
                  }`}
                >
                  <div className={isActive ? "text-orange-500" : "text-inherit"}>
                    {item.icon}
                  </div>
                  
                  {!isSidebarCollapsed && (
                    <span className="text-xs truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================== 4. FOOTER: KOTAK EMAIL PUTIH OVAL (GMAIL LOGO ASLI) ==================== */}
        <div className="p-3">
          {!isSidebarCollapsed ? (
            <div className={`p-3 rounded-[32px] border flex items-center gap-3 transition-colors ${
              isDarkMode 
                ? "bg-slate-900 border-white/10" 
                : "bg-slate-50/60 border-slate-200/80 shadow-xs"
            }`}>
              {/* Logo Gmail Berwarna Asli Google */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs border border-slate-100">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 5.5V18.5C22 19.3284 21.3284 20 20.5 20H18V8.5L12 13L6 8.5V20H3.5C2.67157 20 2 19.3284 2 18.5V5.5C2 4.41438 3.20455 3.84437 4.02426 4.55913L12 11.5L19.9757 4.55913C20.7955 3.84437 22 4.41438 22 5.5Z" fill="#EA4335"/>
                  <path d="M18 8.5V20H20.5C21.3284 20 22 19.3284 22 18.5V5.5L18 8.5Z" fill="#4285F4"/>
                  <path d="M6 8.5L2 5.5V18.5C2 19.3284 2.67157 20 3.5 20H6V8.5Z" fill="#34A853"/>
                  <path d="M19.9757 4.55913L12 11.5L4.02426 4.55913C3.20455 3.84437 2 4.41438 2 5.5V6L12 14.5L22 6V5.5C22 4.41438 20.7955 3.84437 19.9757 4.55913Z" fill="#FBBC05"/>
                </svg>
              </div>
              <div className="overflow-hidden">
                <p className={`text-[10px] font-black truncate ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>
                  mhmmdignazi@gmail.com
                </p>
                <h5 className={`text-[10px] font-black opacity-60 uppercase tracking-wider ${isDarkMode ? "text-white" : "text-slate-500"}`}>
                  Gmail Account
                </h5>
              </div>
            </div>
          ) : (
            /* Mini Mail Icon saat Collapsed */
            <div className="w-full flex justify-center p-2 text-orange-500">
              <Mail size={18} />
            </div>
          )}
        </div>

      </aside>

      {/* OVERLAY GLASS MOBILE */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </>
  );
}