"use client";

import { Award, Briefcase, ChevronDown, ChevronUp, Eye, Github, GraduationCap, Share2, X } from "lucide-react";
import Script from "next/script";
import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function AboutContent({ isDarkMode }: { isDarkMode: boolean }) {
  // State untuk fitur Read More
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // State untuk Modal Preview Sertifikat
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const certificates = [
    { title: "Alibaba Certified Developer", issuer: "Alibaba Cloud", img: "/assets/salibaba.png" },
    { title: "Certifie Programming Coating Machine", issuer: "PT TAMURA", img: "/assets/scoating.png" },
    { title: "Certified Leadership", issuer: "PT SIIX EMS KARAWANG", img: "/assets/sleadership.png" },
  ];

  const githubUsername = "ignaazi"; 
  const tiktokUsername = "ignaazi";

  // Fungsi toggle Read More
  const toggleReadMore = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`transition-colors duration-500 animate-in fade-in slide-in-from-bottom-8 ease-out ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

      {/* MODAL PREVIEW */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImg} 
            alt="Certificate Preview" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
          />
        </div>
      )}

      {/* Header Section */}
      <section className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4">About Me</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Journey, Education & Professional Experience</p>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
      </section>

      {/* Narrative Section */}
      <section className={`p-2 md:p-4 mb-16 leading-relaxed italic transition-colors duration-500 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
        <div className="space-y-6 text-sm md:text-base font-medium text-center md:text-left">
          <p className="animate-in fade-in slide-in-from-left-4 duration-700 delay-150 border-l-4 border-orange-500 pl-4">
            Hi! I am <span className="font-bold not-italic text-orange-500">Muhammad Ignazi</span>. I have a professional background as an SMT Programmer and extensive experience as a Fullstack Web Developer, specializing in system optimization (Kaizen). My work focuses on re-engineering legacy systems into modern, efficient solutions to help companies achieve maximum productivity. 
            <br /><br />
            Currently, I am pursuing my degree in Information Systems at President University, majoring in Enterprise Resource Planning (ERP). My mission is to bridge the gap between technology and practical utility, creating digital tools that simplify workflows and provide meaningful benefits. I am committed to continuous learning and strive to deliver a positive, useful impact for both the community and growing enterprises through innovative system development.
          </p>
        </div>
      </section>

      {/* WORK & EDUCATION SECTION (LINKEDIN STYLE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* Education Card */}
        <div className={`p-8 rounded-3xl border transition-all duration-500 ${isDarkMode ? "bg-[#161d2f] border-white/5 shadow-2xl" : "bg-white border-slate-200 shadow-xl"}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/20 text-blue-600"}`}>
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter">Education</h3>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Academic Background</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-700/20 bg-white p-1">
              <img src="/assets/pu.png" alt="President University" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-lg font-black leading-tight uppercase tracking-tight">President University</h4>
              <p className="text-sm font-bold text-orange-500">Bachelor of Information Systems</p>
              <p className="text-[11px] text-slate-500 font-medium mb-2">2023 - 2026 </p>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Fokus pada pengembangan sistem informasi, manajemen database, dan rekayasa perangkat lunak. Terlibat aktif dalam berbagai proyek riset teknologi.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Card */}
        <div className={`p-8 rounded-3xl border transition-all duration-500 ${isDarkMode ? "bg-[#161d2f] border-white/5 shadow-2xl" : "bg-white border-slate-200 shadow-xl"}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-3 rounded-2xl ${isDarkMode ? "bg-orange-500/10 text-orange-400" : "bg-orange-500/20 text-orange-600"}`}>
              <Briefcase size={28} />
            </div>
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter">Experience</h3>
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Professional Career</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* PT 1 */}
            <div className="flex gap-4 items-start relative">
              <div className="absolute left-7 top-14 bottom-[-32px] w-[2px] bg-slate-700/20"></div>
              <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-700/20 bg-white p-1 z-10">
                <img src="/assets/siix.png" alt="PT SIIX EMS" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="text-lg font-black leading-tight uppercase tracking-tight">PT SIIX EMS KARAWANG</h4>
                <p className="text-sm font-bold text-orange-500">SMT Programmer</p>
                <p className="text-[11px] text-slate-500 font-medium mb-2">2025 - Present </p>
                
                <div className="relative">
                  <p className={`text-xs leading-relaxed transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"} ${expandedId === 'siix' ? "" : "line-clamp-2"}`}>
                    Bertanggung jawab dalam pembuatan program mesin SMT (Surface Mount Technology), optimasi lini produksi, serta memastikan efisiensi penempatan komponen elektronik pada PCB dengan standar kualitas tinggi.
                  </p>
                  <button onClick={() => toggleReadMore('siix')} className="text-orange-500 text-[10px] font-bold uppercase mt-1 flex items-center gap-1 hover:underline">
                    {expandedId === 'siix' ? <>Sembunyikan <ChevronUp size={12}/></> : <>Selengkapnya <ChevronDown size={12}/></>}
                  </button>
                </div>
              </div>
            </div>

            {/* PT 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-700/20 bg-white p-1 z-10">
                <img src="/assets/smd.png" alt="PT Samindo" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="text-lg font-black leading-tight uppercase tracking-tight">PT SAMINDO ELECTRONICS</h4>
                <p className="text-sm font-bold text-orange-500">SMT Programmer</p>
                <p className="text-[11px] text-slate-500 font-medium mb-2">2022 - 2024 · 2 years</p>
                
                <div className="relative">
                  <p className={`text-xs leading-relaxed transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"} ${expandedId === 'samindo' ? "" : "line-clamp-2"}`}>
                    Mengelola pemrograman mesin produksi, melakukan troubleshooting pada proses SMT, dan bekerja sama dengan tim engineering untuk mencapai target produksi harian tanpa cacat produk.
                  </p>
                  <button onClick={() => toggleReadMore('samindo')} className="text-orange-500 text-[10px] font-bold uppercase mt-1 flex items-center gap-1 hover:underline">
                    {expandedId === 'samindo' ? <>Sembunyikan <ChevronUp size={12}/></> : <>Selengkapnya <ChevronDown size={12}/></>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CERTIFICATES SECTION */}
      <section className="mb-20">
        <h2 className={`text-2xl font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2 px-2 transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          <Award className="text-orange-500" size={28} /> Certificates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div key={index} className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${isDarkMode ? "border-white/5 bg-[#161d2f]" : "border-slate-200 bg-white shadow-lg"}`}>
              <div className="aspect-[4/3] overflow-hidden bg-slate-800">
                <img 
                  src={cert.img} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              {/* Box Info */}
              <div className={`p-5 relative transition-colors duration-500 ${isDarkMode ? "bg-white/5" : "bg-slate-50"}`}>
                <h4 className="font-black text-sm uppercase tracking-tight leading-tight mb-1 pr-20">{cert.title}</h4>
                <p className="text-orange-500 text-[10px] font-bold uppercase">{cert.issuer}</p>
                
                {/* BUTTON PREVIEW */}
                <button 
                  onClick={() => setSelectedImg(cert.img)}
                  className="absolute right-4 bottom-4 flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all shadow-lg shadow-orange-900/20 active:scale-95"
                >
                  <Eye size={14} /> Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GITHUB SECTION */}
      <section className="mb-20">
        <h2 className={`text-2xl font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2 px-2 transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          <Github className="text-orange-500" size={28} /> GitHub Contributions
        </h2>
        <div className={`border p-8 rounded-3xl transition-all duration-500 flex flex-col items-center overflow-x-auto ${isDarkMode ? "bg-[#161d2f] border-white/5" : "bg-white border-slate-200 shadow-xl"}`}>
          <div className="min-w-[700px] md:min-w-full flex justify-center">
            <GitHubCalendar 
              username={githubUsername}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#1e293b', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              colorScheme={isDarkMode ? 'dark' : 'light'}
            />
          </div>
        </div>
      </section>

      {/* TIKTOK SECTION */}
      <section className="mb-20">
        <h2 className={`text-2xl font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2 px-2 transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          <Share2 className="text-orange-500" size={28} /> Social Media
        </h2>
        <div className={`border p-4 md:p-8 rounded-3xl transition-all duration-500 ${isDarkMode ? "bg-[#161d2f] border-white/5" : "bg-white border-slate-200 shadow-xl"}`}>
          <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Tiktok Feed</span>
            <span className="text-[10px] font-bold text-slate-500 italic">@{tiktokUsername}</span>
          </div>
          <div className="flex justify-center w-full min-h-[580px] rounded-2xl overflow-hidden bg-transparent">
            <blockquote 
              className="tiktok-embed" 
              cite={`https://www.tiktok.com/@${tiktokUsername}`}
              data-unique-id={tiktokUsername} 
              data-embed-type="creator" 
              style={{ width: '100%', maxWidth: '780px' }}
            >
              <section className="p-10 text-center">
                <a target="_blank" className="font-black text-orange-500" href={`https://www.tiktok.com/@${tiktokUsername}`}>
                  LOADING TIKTOK...
                </a>
              </section>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}