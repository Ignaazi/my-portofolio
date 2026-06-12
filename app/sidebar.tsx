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
    { label: "Home", tab: "Home", icon: <Home size={18} /> },
    { label: "About Me", tab: "About", icon: <User size={18} /> },
    { label: "Projects", tab: "Project", icon: <Briefcase size={18} /> },
    { label: "Blog", tab: "Blog", icon: <BookOpen size={18} /> },
    { label: "Contact", tab: "Contact", icon: <Mail size={18} /> }
  ];

  return (
    <>
      {/* SIDEBAR CONTAINER */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 border-r transition-all duration-300 flex flex-col justify-between ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } ${
        isDarkMode ? "bg-[#111c30] border-white/10" : "bg-white border-slate-200"
      } ${
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
      }`}>
        
        <div>
          {/* LOGO AREA */}
          <div className={`h-16 flex items-center border-b ${
            isDarkMode ? "border-white/10" : "border-slate-200"
          } ${isSidebarCollapsed ? "justify-center" : "px-6 justify-start"}`}>
            <span className={`text-base font-black tracking-tight uppercase ${
              isDarkMode ? "text-white" : "text-[#012970]"
            }`}>
              {isSidebarCollapsed ? "AJ" : <>AJITECH <span className="text-orange-500">®</span></>}
            </span>
          </div>

          {/* MENU NAVIGASI */}
          <div className="p-3 space-y-1.5">
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
                  className={`w-full flex items-center rounded-none transition-all ${
                    isSidebarCollapsed ? "justify-center p-3" : "gap-4 px-4 py-3"
                  } ${
                    isActive 
                      ? "text-orange-500 font-bold bg-orange-500/10 border-l-4 border-orange-500"
                      : isDarkMode
                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                        : "text-[#012970] hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <div className={isActive ? "text-orange-500" : ""}>
                    {item.icon}
                  </div>
                  
                  {!isSidebarCollapsed && (
                    <span className="font-bold uppercase tracking-wide text-xs truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROFIL BAWAH (MINIMALIS) */}
        <div className={`p-4 border-t ${
          isDarkMode ? "border-white/10 bg-[#0b1425]/30" : "border-slate-200 bg-slate-50/50"
        }`}>
          <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-8 h-8 rounded-full border border-orange-500 overflow-hidden shrink-0">
              <Image 
                src="/assets/aji.jpg" 
                alt="Profile" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden">
                <h4 className={`text-xs font-black uppercase truncate ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  M. Ignazi
                </h4>
                <p className="text-[9px] opacity-50 font-bold uppercase tracking-wider truncate">Developer</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </>
  );
}