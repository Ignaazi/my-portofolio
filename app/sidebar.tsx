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

  // Mengunci warna border soft premium sesuai gambar image_07ea09.png
  // Saat mode terang: menggunakan campuran warna dasar NiceAdmin (#cddfff / #e0e9f7)
  const niceAdminBorder = isDarkMode ? "border-slate-800/80" : "border-[#e0e9f7]";

  return (
    <>
      {/* SIDEBAR CONTAINER - Menggunakan border soft akurat sesuai gambar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 border-r transition-all duration-300 flex flex-col justify-between rounded-none ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } ${
        isDarkMode ? "bg-[#111c30] text-slate-300" : "bg-white text-slate-700"
      } ${niceAdminBorder} ${
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
      }`}>
        
        {/* ==================== BAGIAN ATAS S/D MENU NAVIGASI ==================== */}
        <div className="w-full">
          {/* 1. LOGO AREA - Border bawah soft sesuai image_07ea09.png */}
          <div className={`h-16 flex items-center border-b ${niceAdminBorder} ${
            isSidebarCollapsed ? "justify-center" : "px-6 justify-start"
          }`}>
            <span className={`text-base font-black tracking-tight uppercase ${
              isDarkMode ? "text-white" : "text-[#012970]"
            }`}>
              {isSidebarCollapsed ? "AJ" : <>AJITECH    </>}
            </span>
          </div>

          {/* 2. PROFILE AREA (GRADASI TETAP h-24) */}
          {!isSidebarCollapsed ? (
            <div className="w-full pb-5 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 rounded-b-[40px] shadow-sm" />
              
              {/* Avatar Murni Bulat Polos Tanpa Border */}
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
            /* Mini Avatar area saat Collapsed - Garis putus-putus soft */
            <div className={`w-full py-4 flex justify-center border-b border-dashed ${niceAdminBorder}`}>
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

          {/* GARIS PEMISAH SETELAH PROFILE AREA */}
          <div className={`border-b w-full mb-4 ${niceAdminBorder}`} />

          {/* 3. MENU NAVIGASI DENGAN GARIS OREN GELAP DI POJOK KIRI (HOVER & STAY) */}
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
                  className={`w-full flex items-center transition-all duration-200 border-l-4 ${
                    isSidebarCollapsed 
                      ? "justify-center p-3" 
                      : "gap-4 px-4 py-3 text-sm font-bold tracking-wide"
                  } ${
                    isActive 
                      ? "bg-orange-500/10 text-orange-500 font-extrabold border-orange-600 rounded-r-[12px]"
                      : isDarkMode
                        ? "text-slate-400 border-transparent hover:text-white hover:bg-white/5 hover:border-orange-600 hover:rounded-r-[12px]"
                        : "text-slate-600 border-transparent hover:text-orange-600 hover:bg-orange-500/5 hover:border-orange-600 hover:rounded-r-[12px]"
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

        {/* ==================== 4. FOOTER AREA DENGAN GARIS PEMISAH NICEADMIN ==================== */}
        <div className="w-full">
          {/* Garis pembatas sebelum masuk kotak email */}
          <div className={`border-t w-full mb-3 ${niceAdminBorder}`} />
          
          <div className="p-3">
            {!isSidebarCollapsed ? (
              /* Kotak luar akun email dengan border soft sesuai image_07ea09.png */
              <div className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${niceAdminBorder} ${
                isDarkMode 
                  ? "bg-slate-900" 
                  : "bg-slate-50/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
              }`}>
                {/* Kotak Logo Gmail */}
                <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs border p-1.5 ${niceAdminBorder}`}>
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H16.6667V8.66667L12 12L7.33333 8.66667V4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6.66667V10.6667L12 14.6667L17.3333 10.6667V20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="#EA4335"/>
                    <path d="M22 6V8.66667L17.3333 12.1667V20H20C21.1 20 22 19.1 22 18V6Z" fill="#4285F4"/>
                    <path d="M2 6V18C2 19.1 2.9 20 4 20H6.66667V12.1667L2 8.66667V6Z" fill="#34A853"/>
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V6.5L12 14L22 6.5V6C22 4.9 21.1 4 20 4Z" fill="#FBBC05"/>
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