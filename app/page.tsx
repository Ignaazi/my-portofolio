"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  
  // State sinkronisasi pembagian layout dua komponen
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b1425] text-[#a6b5cc]" : "bg-[#f6f9ff] text-[#012970]"
      }`}
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      
      {/* COMPONENT 1: TOP NAVBAR */}
      <Navbar 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* COMPONENT 2: LEFT SIDEBAR */}
      <Sidebar 
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* MAIN CONTAINER WORKSPACE */}
      <div className={`transition-all duration-300 pt-16 ${
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      }`}>
        <main className="p-6 md:p-8 max-w-[1600px] mx-auto">
          
          {/* HEADER */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#012970]"}`}>
              Executive Portfolio Dashboard
            </h1>
            <p className="text-xs opacity-60 mt-1 font-medium">
              Welcome back, Ignazi. Modul aktif saat ini: <span className="text-orange-500 font-bold">{activeTab}</span>
            </p>
          </div>

          {/* CANVAS WORKSPACE */}
          <div className={`p-8 rounded-none border-2 border-dashed text-center min-h-[400px] flex flex-col justify-center items-center transition-colors duration-300 ${
            isDarkMode ? "border-white/10 bg-[#111c30]/40" : "border-slate-200 bg-white"
          }`}>
            <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">Workspace Canvas</span>
            <h2 className={`text-lg font-bold mt-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>Ready to Import `{activeTab}` Module</h2>
            <p className="text-xs opacity-50 max-w-sm mt-1">Pembagian 2 file komponen terpisah (Navbar & Sidebar) sukses dikonfigurasi secara bersih dari nol.</p>
          </div>

        </main>
      </div>

    </div>
  );
}