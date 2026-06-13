"use client";

import Image from "next/image";
import { useState } from "react";

interface AboutPageProps {
  isDarkMode: boolean;
}

export default function AboutPage({ isDarkMode }: AboutPageProps) {
  const textTitleColor = isDarkMode ? "text-white" : "text-[#012970]";
  const textBodyColor = isDarkMode ? "text-slate-300" : "text-slate-700";
  
  const niceAdminBorder = isDarkMode ? "border-slate-800/80" : "border-[#e0e9f7]";
  const niceAdminBgCard = isDarkMode ? "bg-[#111c30]/40" : "bg-white";

  // State untuk expand teks di Education
  const [expandEduText, setExpandEduText] = useState(false);
  // State untuk kontrol expand teks SIIX sekaligus memunculkan Amindo Electronics di bawahnya
  const [showMoreExp, setShowMoreExp] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 py-6 animate-fade-in">
      
      {/* ==================== 1. JUDUL UTAMA ==================== */}
      <div className={`flex flex-col items-center justify-center border-b pb-4 ${niceAdminBorder}`}>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight text-center ${textTitleColor}`}>
          About Me
        </h1>
      </div>

      {/* ==================== 2. NARASI UTAMA ==================== */}
      <div className={`flex flex-col gap-4 text-sm md:text-base leading-relaxed font-medium text-left ${textBodyColor}`}>
        <p>
          Saya adalah seorang penyedia jasa layanan pembuatan aplikasi yang saat ini bekerja sebagai Programmer SMT di PT SIIX. Memiliki pengalaman kerja selama 4 tahun di industri, perjalanan karir saya dimulai dari bawah sebagai pengguna sistem operasional perusahaan.
        </p>
        <p>
          Latar belakang tersebut memotivasi saya kuliah di President University jurusan Sistem Informasi dengan konsentrasi ERP. Dari ilmu yang didapatkan, saya mulai melakukan improvisasi langsung di perusahaan tempat saya bekerja untuk mengembangkan skill.
        </p>
        <p>
          Melalui pengamatan pada sistem perusahaan yang sudah canggih, kini misi saya adalah membantu usaha UMKM maupun perusahaan lain yang ingin melakukan upgrade otomatisasi menggunakan sistem digital. Saya berharap aplikasi yang saya bangun dapat mempermudah pekerjaan operasional harian Anda.
        </p>
      </div>

      {/* ==================== PEMBATAS & JUDUL SUB-SECTION (DITENGAH) ==================== */}
      <div className={`flex flex-col items-center justify-center border-t pt-6 mt-4 ${niceAdminBorder}`}>
        <h2 className={`text-2xl md:text-3xl font-black tracking-tight text-center ${textTitleColor}`}>
          Education & Experience
        </h2>
      </div>

      {/* ==================== 3. GRID KOTAK EDUCATION & EXPERIENCE ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left items-start">
        
        {/* ==================== KOTAK KIRI: EDUCATION ==================== */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between min-h-[260px] ${niceAdminBgCard} ${niceAdminBorder}`}>
          <div>
            <h3 className={`text-base font-black tracking-tight mb-5 ${textTitleColor}`}>
              Education
            </h3>
            
            <div className="flex items-start gap-3">
              {/* LOGO PU */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-12 h-12 rounded-xl border bg-white flex items-center justify-center overflow-hidden p-1 ${niceAdminBorder}`}>
                  <Image 
                    src="/assets/pu.png" 
                    alt="President University Logo" 
                    width={40} 
                    height={40} 
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
              </div>

              {/* DETAIL TEKS EDUCATION */}
              <div className="flex flex-col flex-1">
                <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  President University
                </h4>
                <p className="text-xs text-orange-500 font-bold">
                  Systems Information — ERP Concentration
                </p>
                <p className="text-[11px] text-slate-400 font-semibold mb-1">
                  Ags 2022 - Jun 2026
                </p>
                
                <div className={`text-[11px] md:text-xs font-medium leading-relaxed ${textBodyColor}`}>
                  <span className={expandEduText ? "" : "line-clamp-4 inline"}>
                    Mendalami integrasi proses bisnis dan manajemen data perusahaan (Enterprise Resource Planning) yang menjadi landasan kuat untuk improvisasi sistem manufaktur. Fokus pada arsitektur sistem SAP, pemetaan alur suplai logistik, serta analisis basis data relasional tingkat lanjut untuk merancang aplikasi modern berskala industri canggih yang efisien dan terintegrasi penuh.
                    
                    {!expandEduText ? (
                      <button 
                        onClick={() => setExpandEduText(true)}
                        className="font-bold ml-1 text-slate-500 dark:text-slate-400 hover:underline inline text-[11px]"
                      >
                        ...Selengkapnya
                      </button>
                    ) : (
                      <button 
                        onClick={() => setExpandEduText(false)}
                        className="font-bold ml-1 text-slate-400 dark:text-slate-500 hover:underline inline text-[11px]"
                      >
                        ...Sembunyikan
                      </button>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* ==================== KOTAK KANAN: EXPERIENCE ==================== */}
<div className={`p-5 rounded-2xl border flex flex-col justify-between min-h-[260px] ${niceAdminBgCard} ${niceAdminBorder}`}>
  <div>
    <h3 className={`text-base font-black tracking-tight mb-5 ${textTitleColor}`}>
      Experience
    </h3>
    
    <div className="flex items-stretch gap-3 w-full relative">
      
      {/* KOLOM KIRI: KHUSUS LOGO & LINIMASA */}
      <div className="flex flex-col items-center shrink-0 pt-[2px]">
        {/* Logo 1: PT SIIX */}
        <div className={`w-12 h-12 rounded-xl border bg-white flex items-center justify-center overflow-hidden p-1 z-10 ${niceAdminBorder}`}>
          <Image 
            src="/assets/siix.png" 
            alt="PT SIIX Logo" 
            width={40} 
            height={40} 
            className="object-contain w-full h-full"
            unoptimized
          />
        </div>

        {/* Garis Penghubung Dinamis */}
        {showMoreExp ? (
          <div className="flex-1 flex flex-col items-center justify-between w-full my-1 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
            <div className="flex-1 w-[2px] bg-slate-300 dark:bg-slate-600" />
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
          </div>
        ) : (
          <div className="flex-1 min-h-[16px]" />
        )}

        {/* Logo 2: Samindo Electronics */}
        {showMoreExp && (
          <div className={`w-12 h-12 rounded-xl border bg-white flex items-center justify-center overflow-hidden p-1 z-10 animate-fade-in ${niceAdminBorder}`}>
            <Image 
              src="/assets/smd.png" 
              alt="Samindo Electronics Logo" 
              width={40} 
              height={40} 
              className="object-contain w-full h-full"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* KOLOM KANAN: KONTEN TEKS DESKRIPSI */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        
        {/* KONTEN PT SIIX */}
        <div className="flex flex-col">
          <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>
            PT. SIIX ELECTRONICS INDONESIA
          </h4>
          <p className="text-xs text-orange-500 font-bold">SMT PROGRAMMER</p>
          <p className="text-[11px] text-slate-400 font-semibold mb-1">Sep 2024 - Present · 1 yr 10 mos</p>
          
          <div className={`text-[11px] md:text-xs font-medium leading-relaxed ${textBodyColor}`}>
            <span className={showMoreExp ? "" : "line-clamp-3 inline"}>
              - Create program pick and place machine mounter and printing machine
              - Prepare and monitoring for pre-production (new model, range, line, ECR) based on BOM list and engineering drawing
              - Create report setup parameter machine, take data from trial, support audit customer
              - Create program and operations for PANASONIC (CM, NPM, SP60, SP70, SPG), FUJI, ANDA, KEYENCE, ASYS, YAMAHA
              
              {!showMoreExp && (
                <button 
                  onClick={() => setShowMoreExp(true)}
                  className="font-bold ml-1 text-slate-500 dark:text-slate-400 hover:underline inline text-[11px]"
                >
                  ...Selengkapnya
                </button>
              )}
            </span>
          </div>
        </div>

        {/* KONTEN SAMINDO & MATERIALS CONTROL */}
        {showMoreExp && (
          <div className="flex flex-col animate-fade-in pt-1 pb-[2px]">
            <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Samindo Electronics
            </h4>
            <p className="text-xs text-orange-500 font-bold">SMT PROGRAMMER</p>
            <p className="text-[11px] text-slate-400 font-semibold mb-1">Dec 2022 - Jun 2024 · 1 yr 7 mos</p>
            <div className={`text-[11px] md:text-xs font-medium leading-relaxed ${textBodyColor} mb-3`}>
              - Document preparation (BOM, GERBER, CAD DATA, FEEDER, LOADING LIST), coordinate with R&D, and monitoring production line (CPH, LOB, CA)
              - ERP/SAP operation, inventory control, and electronics repair using soldering
            </div>

            <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              MATERIALS CONTROL (Self-employed)
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold mb-1">Jun 2022 - Dec 2022 · 7 mos</p>
            <div className={`text-[11px] md:text-xs font-medium leading-relaxed ${textBodyColor}`}>
              - Processing materials data, planning, and update planning for materials needs
              - Materials management, FIFO control, inventory control, and forklift/warehouse tool operation
              <button 
                onClick={() => setShowMoreExp(false)}
                className="font-bold ml-1 text-slate-400 dark:text-slate-500 hover:underline inline text-[11px]"
              >
                ...Sembunyikan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

      </div>

    </div>
  );
}