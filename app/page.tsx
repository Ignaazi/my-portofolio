"use client";

import { useState } from "react";
import HomePage from "./components/home-page/page";
import Footer from "./footer";
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
      <div className={`transition-all duration-300 pt-16 flex flex-col min-h-screen ${
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      }`}>
        {/* Konten Utama Workspace */}
        <main className="p-6 md:p-8 max-w-[1600px] mx-auto w-full flex-1 flex flex-col gap-6">
          
          {/* KONDISIONAL RENDER MODULE (LANGSUNG MODUL TANPA HEADER) */}
          {activeTab === "Home" ? (
            /* Jika tab aktif adalah Home, langsung render Profile & Skills */
            <HomePage isDarkMode={isDarkMode} />
          ) : (
            /* Jika tab aktif selain Home (About, Project, Blog, Contact) */
            <div className={`p-8 rounded-2xl border-2 border-dashed text-center min-h-[400px] flex flex-col justify-center items-center transition-colors duration-300 flex-1 ${
              isDarkMode ? "border-white/10 bg-[#111c30]/40" : "border-slate-200 bg-white"
            }`}>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">Workspace Canvas</span>
              <h2 className={`text-lg font-bold mt-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                Ready to Import `{activeTab}` Module
              </h2>
              <p className="text-xs opacity-50 max-w-sm mt-1">
                Komponen untuk halaman {activeTab} siap diintegrasikan di sini.
              </p>
            </div>
          )}

        </main>

        {/* COMPONENT 3: BOTTOM FOOTER */}
        <Footer isDarkMode={isDarkMode} />
      </div>

    </div>
  );
}