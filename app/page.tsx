"use client";

import {
  BookOpen,
  Briefcase,
  Coffee,
  Download,
  Github,
  Home as HomeIcon,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  User,
  X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menus = [
    { name: 'Home', icon: <HomeIcon size={18} />, active: true },
    { name: 'About', icon: <User size={18} /> },
    { name: 'Project', icon: <Briefcase size={18} /> },
    { name: 'Blog', icon: <BookOpen size={18} /> },
    { name: 'Contact', icon: <Mail size={18} /> },
  ];

  const skills = [
    { name: "viteJs", slug: "vite" },
    { name: "react", slug: "react" },
    { name: "tailwind", slug: "tailwindcss" },
    { name: "nodeJs", slug: "nodedotjs" },
    { name: "javascript", slug: "javascript" },
    { name: "bootstrap", slug: "bootstrap" },
    { name: "html", slug: "html5" },
    { name: "css", slug: "css" }, 
    { name: "php", slug: "php" },
    { name: "laravel", slug: "laravel" },
    { name: "mysql", slug: "mysql" },
    { name: "nextJs", slug: "nextdotjs" }, 
    { name: "typescript", slug: "typescript" },
    { name: "vuejs", slug: "vuedotjs" },
    { name: "postgresql", slug: "postgresql" },
    { name: "prisma", slug: "prisma" },
  ];

  const projects = [
    { title: "NONE", desc: "Under Develop." },
    { title: "NONE", desc: "Under Develop." },
    { title: "NONE", desc: "Under Develop." },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${isDarkMode ? "bg-[#020617] text-white" : "bg-[#f8fafc] text-slate-900"}`}>
      
      {/* --- STICKY NAVBAR --- */}
      <header className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-md border-b flex items-center justify-between px-4 md:px-8 z-[100] shadow-2xl transition-colors duration-500 ${isDarkMode ? "bg-[#161d2f]/90 border-white/5" : "bg-white/80 border-slate-200"}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className={`p-2 rounded-lg transition-colors border ${isDarkMode ? "hover:bg-white/5 border-white/10" : "hover:bg-slate-100 border-slate-200"}`}
          >
            <Menu size={24} className="text-orange-500" />
          </button>
          
          <div className="flex flex-col leading-none">
            <span className={`text-sm font-black tracking-tighter uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>AZDEV ®</span>
            <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px] md:max-w-none uppercase">
              mhmmdignazi@gmail.com 
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 transition-colors rounded-full ${isDarkMode ? "text-slate-400 hover:text-orange-500 hover:bg-white/5" : "text-slate-500 hover:text-orange-600 hover:bg-slate-100"}`}
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="h-9 w-9 rounded-full bg-orange-600/20 border border-orange-500/50 hidden md:flex items-center justify-center overflow-hidden">
             <img src="/assets/aji.jpg" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* --- OVERLAY & SIDEBAR --- */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={() => setIsOpen(false)} 
      />
      
      <aside className={`fixed left-0 top-0 h-screen w-72 p-6 z-[120] transition-transform duration-500 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"} ${isDarkMode ? "bg-[#161d2f]" : "bg-white shadow-2xl"}`}>
        <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-bold text-orange-500 tracking-[0.3em] uppercase italic">← Hide Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-orange-500"><X size={20}/></button>
        </div>
        <div className={`flex flex-col items-center mb-10 pb-6 border-b ${isDarkMode ? "border-white/5" : "border-slate-100"}`}>
          <div className="mb-4 h-20 w-20 rounded-full border-2 border-orange-500 p-1">
            <div className={`relative h-full w-full overflow-hidden rounded-full ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
              <img src="/assets/aji.jpg" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>
          <h3 className={`text-sm font-bold text-center leading-tight uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>MUHAMMAD IGNAZI <br/></h3>
        </div>
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {menus.map((menu) => (
            <div key={menu.name} className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${menu.active ? 'bg-orange-600 text-white font-bold shadow-lg shadow-orange-600/20' : isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50'}`}>
              {menu.icon} <span className="text-sm">{menu.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20">
        
        {/* Hero Card - POJOK LANCIP */}
        <section className={`border p-8 md:p-12 mb-16 relative overflow-hidden group shadow-2xl transition-all duration-500 ${isDarkMode ? "bg-[#161d2f] border-white/5 shadow-black/50" : "bg-white border-slate-200"}`}>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h1 className={`text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4 transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Hi There 👋, <br />I'm <span className="text-orange-500 italic uppercase">AZI</span> 
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Frontend Developer • Based in Indonesia</p>
              <p className={`max-w-2xl leading-relaxed text-sm md:text-base mb-10 italic border-l-2 border-orange-500 pl-6 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                "I am a <span className={`font-bold not-italic underline decoration-orange-500 underline-offset-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Frontend Web Developer</span> who has a passion for Web Development."
              </p>
              <button className="flex items-center gap-3 bg-orange-600 px-8 py-4 rounded-2xl text-sm font-bold text-white hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/40">
                <Download size={18} /> Download CV
              </button>
            </div>
            
            <div className={`flex gap-4 p-3 border rounded-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
               <Linkedin size={20} className="hover:text-orange-500 cursor-pointer transition-colors text-slate-400" />
               <Github size={20} className="hover:text-orange-500 cursor-pointer transition-colors text-slate-400" />
               <Instagram size={20} className="hover:text-orange-500 cursor-pointer transition-colors text-slate-400" />
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION - TETAP TUMPUL --- */}
        <section className="mb-20 overflow-hidden">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2 px-2">
            <span className="text-orange-500">{"</>"}</span> Skills
          </h2>
          <div className="space-y-6">
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee flex gap-4 whitespace-nowrap py-2">
                {skills.concat(skills).map((skill, i) => (
                  <div key={i} className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl min-w-max transition-all border ${isDarkMode ? "bg-white border-transparent" : "bg-white border-slate-100"}`}>
                    <img src={`https://cdn.simpleicons.org/${skill.slug}`} alt={skill.name} className="w-6 h-6 object-contain" />
                    <span className="text-slate-900 text-sm font-black tracking-tight">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee-reverse flex gap-4 whitespace-nowrap py-2">
                {[...skills].reverse().concat([...skills].reverse()).map((skill, i) => (
                  <div key={i} className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl min-w-max transition-all border ${isDarkMode ? "bg-white border-transparent" : "bg-white border-slate-100"}`}>
                    <img src={`https://cdn.simpleicons.org/${skill.slug}`} alt={skill.name} className="w-6 h-6 object-contain" />
                    <span className="text-slate-900 text-sm font-black tracking-tight">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- HIRE ME SECTION - LANCIP --- */}
        <section className={`border p-8 md:p-12 mb-16 relative overflow-hidden group shadow-2xl transition-all duration-500 ${isDarkMode ? "bg-[#161d2f] border-white/5 shadow-black/50" : "bg-white border-slate-200"}`}>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <h2 className={`text-3xl md:text-5xl font-black tracking-tighter leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                I'm Ready To Be Hired For Your <span className="text-orange-500">Next Project.</span>
              </h2>
              <p className={`max-w-xl leading-relaxed text-sm md:text-base italic ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                I am an expert in Front End Development and Fullstack Web Developer, let's work together so that your project has good quality and good results.
              </p>
              
              <div className="flex flex-col items-center lg:items-start py-2">
                  <span className={`text-4xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>100+</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Projects Completed</span>
              </div>

              <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <button className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-black transition-all shadow-xl border ${isDarkMode ? "bg-white text-slate-900 border-transparent" : "bg-white text-slate-900 border-slate-200"}`}>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div> Hire Me!
                </button>
                <button className="flex items-center gap-2 bg-[#c32e2e] text-white px-6 py-4 rounded-2xl text-xs font-black hover:bg-[#a62525] transition-all shadow-xl">
                  <Coffee size={16} /> Trakteer
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-[320px] lg:max-w-[380px] aspect-square flex items-center justify-center mt-4 lg:mt-0">
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-2912011-2426090.png" 
                alt="Working Illustration" 
                className="w-full h-auto object-contain relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Selected Projects - LANCIP */}
        <section>
          <h2 className={`text-4xl font-black mb-12 italic tracking-tighter uppercase transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className={`border p-4 rounded-2xl group hover:border-orange-500 transition-all duration-500 shadow-2xl ${isDarkMode ? "bg-[#161d2f] border-white/5 shadow-black/30" : "bg-white border-slate-200 shadow-lg"}`}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-800 mb-6 shadow-xl">
                  <Image src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600`} alt={project.title} fill className="object-cover opacity-50 group-hover:opacity-100 transition duration-700 group-hover:scale-110" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors uppercase tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}>{project.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 italic">{project.desc}</p>
                <button className={`w-full py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-orange-600 text-white" : "bg-slate-50 border-slate-200 hover:bg-orange-600 hover:text-white text-slate-600"}`}>
                  View Project
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className={`mt-32 pt-16 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest italic text-center ${isDarkMode ? "border-white/5 text-slate-500" : "border-slate-200 text-slate-400"}`}>
          <p>© 2026 Crafted by <span className="text-orange-500 font-bold not-italic uppercase">Aji Ignatius</span></p>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }
        .group:hover .animate-marquee, .group:hover .animate-marquee-reverse { animation-play-state: paused; }
      `}</style>
    </div>
  );
}