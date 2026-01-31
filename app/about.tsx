"use client";

import { Award, Briefcase, GraduationCap } from "lucide-react";
import Script from "next/script";
import { GitHubCalendar } from "react-github-calendar";

export default function AboutContent({ isDarkMode }: { isDarkMode: boolean }) {
  const certificates = [
    { title: "Alibaba Certified Developer", issuer: "Alibaba Cloud", img: "/assets/salibaba.png" },
    { title: "Certifie Programming Coating Machine", issuer: "PT TAMURA", img: "/assets/scoating.png" },
    { title: "Certified Leadership", issuer: "PT SIIX EMS KARAWANG", img: "/assets/sleadership.png" },
  ];

  const githubUsername = "ignaazi"; 
  const tiktokUsername = "ignaazi";

  return (
    <div className={`transition-colors duration-500 animate-in fade-in slide-in-from-bottom-8 ease-out ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

      {/* Header Section */}
      <section className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4">About Me</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Journey, Education & Professional Experience</p>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
      </section>

      {/* Narrative Section */}
      <section className={`p-2 md:p-4 mb-10 leading-relaxed italic transition-colors duration-500 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
        <div className="space-y-6 text-sm md:text-base font-medium text-center md:text-left">
          <p className="animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
            Hi! I am <span className="font-bold not-italic text-orange-500">Muhammad Ignazi</span>, an experienced Junior Frontend Web Developer with a deep passion for creating elegant and efficient solutions through code. Saat ini berdomisili di Karawang, Indonesia 🇮🇩.
          </p>
        </div>
      </section>

      {/* WORK & EDUCATION SECTION (LINKEDIN STYLE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
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
            <div className="space-y-1">
              <h4 className="text-lg font-black leading-tight uppercase tracking-tight">President University</h4>
              <p className="text-sm font-bold text-orange-500">Bachelor of Information Systems</p>
              <p className="text-[11px] text-slate-500 font-medium">2020 - 2024 (Expected)</p>
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
              <div className="space-y-1">
                <h4 className="text-lg font-black leading-tight uppercase tracking-tight">PT SIIX EMS KARAWANG</h4>
                <p className="text-sm font-bold text-orange-500">SMT Programmer</p>
                <p className="text-[11px] text-slate-500 font-medium">2025 - Present </p>
              </div>
            </div>

            {/* PT 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-700/20 bg-white p-1 z-10">
                <img src="/assets/smd.png" alt="PT Samindo" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black leading-tight uppercase tracking-tight">PT SAMINDO ELECTRONICS</h4>
                <p className="text-sm font-bold text-orange-500">SMT Programmer</p>
                <p className="text-[11px] text-slate-500 font-medium">2022 - 2024 · 2 years</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CERTIFICATES SECTION */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6 px-2">
          <Award className="text-orange-500" size={24} />
          <h2 className="font-black uppercase tracking-tighter text-xl italic">Certificates</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className={`group relative aspect-4/3 rounded-2xl overflow-hidden border transition-all duration-500 ${isDarkMode ? "border-white/5 bg-[#161d2f]" : "border-slate-200 bg-white"}`}>
              <div className="w-full h-full relative">
                {/* Image background yang muncul otomatis */}
                <img 
                  src={cert.img} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Overlay gelap agar teks terbaca saat hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h4 className="text-white font-black text-sm uppercase tracking-tight leading-tight">{cert.title}</h4>
                  <p className="text-orange-500 text-[10px] font-bold uppercase mt-1">{cert.issuer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GITHUB SECTION */}
      <section className={`border p-8 mb-12 rounded-3xl transition-all duration-500 flex flex-col items-center ${isDarkMode ? "bg-[#161d2f] border-white/5" : "bg-white border-slate-200 shadow-xl"}`}>
        <h3 className={`text-[10px] font-black uppercase tracking-widest mb-8 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>GitHub Contributions</h3>
        <div className="w-full flex justify-center">
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
      </section>

      {/* TIKTOK SECTION */}
      <section className={`border p-4 md:p-8 rounded-3xl transition-all duration-500 ${isDarkMode ? "bg-[#161d2f] border-white/5" : "bg-white border-slate-200 shadow-xl"}`}>
        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Social Media</span>
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
                LOADING...
              </a>
            </section>
          </blockquote>
        </div>
      </section>
    </div>
  );
}