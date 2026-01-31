"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function ProjectsContent({ isDarkMode }: { isDarkMode: boolean }) {
  const allProjects = [
    {
      title: "SMT Production Monitor",
      desc: "Sistem monitoring real-time untuk lini produksi SMT di PT SIIX EMS Karawang.",
      tech: ["Next.js", "TypeScript", "Node.js"],
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
      link: "#",
      github: "#"
    },
    {
      title: "Portfolio v2",
      desc: "Personal branding website dengan tema dark mode dan animasi transisi halus.",
      tech: ["React", "Tailwind CSS", "Lucide"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
      link: "#",
      github: "#"
    },
    {
      title: "Inventory System",
      desc: "Aplikasi manajemen stok barang elektronik berbasis web dengan Laravel.",
      tech: ["PHP", "Laravel", "MySQL"],
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600",
      link: "#",
      github: "#"
    },
    {
      title: "AI Chat Bot",
      desc: "Integrasi OpenAI API untuk asisten pintar dalam membantu tugas coding.",
      tech: ["Next.js", "OpenAI API"],
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600",
      link: "#",
      github: "#"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Page Title - Matching Home Style */}
      <div className="mb-12">
        <h2 className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          My <span className="text-orange-500 underline decoration-white/10">Projects</span>
        </h2>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">A collection of my work and experiments</p>
      </div>

      {/* Grid - Identical to Home "Selected Projects" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {allProjects.map((project, i) => (
          <div 
            key={i} 
            className={`border p-4 rounded-none group hover:border-orange-500 transition-all duration-500 shadow-2xl ${
              isDarkMode ? "bg-[#161d2f] border-white/5 shadow-black/30" : "bg-white border-slate-200 shadow-lg"
            }`}
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[16/9] rounded-none overflow-hidden bg-slate-800 mb-6 shadow-xl">
              <Image 
                src={project.img} 
                alt={project.title} 
                fill 
                className="object-cover opacity-50 group-hover:opacity-100 transition duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="bg-orange-600 text-[8px] font-black px-2 py-1 uppercase text-white shadow-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <h3 className={`text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors uppercase tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 italic h-12 overflow-hidden">
              {project.desc}
            </p>

            {/* Buttons - Same as Home */}
            <div className="flex gap-3">
              <button className={`flex-1 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                isDarkMode 
                ? "bg-white/5 border-white/10 hover:bg-orange-600 text-white" 
                : "bg-slate-50 border-slate-200 hover:bg-orange-600 hover:text-white text-slate-600"
              }`}>
                View Demo <ExternalLink size={14} />
              </button>
              <button className={`px-6 py-4 border rounded-2xl transition-all duration-300 flex items-center justify-center ${
                isDarkMode 
                ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" 
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
              }`}>
                <Github size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}