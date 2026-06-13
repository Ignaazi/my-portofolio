"use client";

import { useState } from "react";
import AboutPage from "./components/about-page/about"; // 1. PASTIKAN DIIMPORT DI SINI JI
import HomePage from "./components/home-page/page";
import Footer from "./footer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  
  // State sinkronisasi layout
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Mengunci warna border soft premium NiceAdmin
  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]"

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b1425] text-[#a6b5cc]" : "bg-[#f6f9ff] text-[#012970]"
      }`}
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      
      {/* 1. TOP NAVBAR */}
      <Navbar 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 2. LEFT SIDEBAR */}
      <Sidebar 
        isDarkMode={isDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab} // Sidebar kamu bakal nge-trigger state ini
        isSidebarCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* MAIN CONTAINER WORKSPACE */}
      <div className={`transition-all duration-300 pt-16 flex flex-col flex-1 ${
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      }`}>
        
        {/* Konten Utama Workspace */}
        <main className="w-full flex-1 flex flex-col p-6 md:p-8">
          <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col gap-6">
            
            {/* ==================== 2. KONDISIONAL RENDER UTAMA ==================== */}
            {activeTab === "Home" ? (
              /* Jika tab aktif adalah Home, render Landing Page utama (Hero, Skills, dll) */
              <HomePage isDarkMode={isDarkMode} />
            ) : activeTab === "About" ? (
              /* JIKA DIKLIK ABOUT, STRUKTUR LEPAS DARI LANDING PAGE DAN TAMPIL MANDIRI */
              <AboutPage isDarkMode={isDarkMode} />
            ) : (
              /* Jika tab aktif selain Home dan About (Project, Blog, Contact) sementara masuk kesini */
              <div className={`p-8 rounded-2xl border-2 border-dashed text-center min-h-[400px] flex flex-col justify-center items-center transition-colors duration-300 flex-1 ${
                isDarkMode ? "bg-[#111c30]/40" : "bg-white"
              } ${niceAdminBorder}`}>
                <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">Workspace Canvas</span>
                <h2 className={`text-lg font-bold mt-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Ready to Import `{activeTab}` Module
                </h2>
                <p className="text-xs opacity-50 max-w-sm mt-1">
                  Komponen untuk halaman {activeTab} siap diintegrasikan di sini.
                </p>
              </div>
            )}

          </div>
        </main>

        {/* 3. BOTTOM FOOTER */}
        <Footer isDarkMode={isDarkMode} />
      </div>

    </div>
  );
}