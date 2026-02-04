"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function ProjectsContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const allProjects = [
    {
      title: "Reservasi Cucian Mobil",
      desc: "Website yang memudahkan customers untuk reservasi cucian mobil secara online dengan sistem jadwal yang terintegrasi real-time.",
      techIcons: [
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
      ],
      img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=600",
      link: "#",
    },
    {
      title: "BeMaRu",
      desc: "LMS interaktif untuk belajar matematika dengan cara yang seru dan menyenangkan menggunakan gamifikasi untuk siswa sekolah dasar.",
      techIcons: [
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      ],
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600",
      link: "#",
    },
    {
      title: "Sistem Iuran Warga",
      desc: "Sebuah sistem untuk warga membayar iuran yang sudah terintegrasi otomatis dengan laporan keuangan transparan bagi pengurus RT/RW.",
      techIcons: [
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      ],
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600",
      link: "#",
    }
    // Tambahkan data project lainnya di sini sampai lebih dari 9 untuk test pagination
  ];

  // Filter Search
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Search */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            My <span className="text-orange-500 underline decoration-white/10">Projects</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">Daftar karya dan proyek yang telah diselesaikan</p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 z-10" size={18} />
          <input 
            type="text"
            placeholder="Cari project..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 transition-all outline-none font-bold text-sm ${
              isDarkMode ? "bg-slate-900 border-white/10 focus:border-orange-500 text-white" : "bg-white border-slate-200 focus:border-orange-500 shadow-sm text-slate-900"
            }`}
          />
        </div>
      </div>

      {/* Grid Proyek */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentProjects.map((project, i) => (
          <div 
            key={i} 
            className={`flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl border ${
              isDarkMode ? "bg-[#111827] border-white/5 shadow-black/20" : "bg-white border-slate-100 shadow-slate-200"
            }`}
          >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full p-3 pb-0">
               <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image 
                    src={project.img} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition duration-700 hover:scale-110" 
                  />
               </div>
            </div>

            {/* Content Section */}
            <div className="p-7 flex flex-col flex-1">
              <h3 className={`text-2xl font-bold mb-3 tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {project.title}
              </h3>
              
              {/* Deskripsi 2 Baris Otomatis */}
              <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {project.desc}
              </p>

              <button className="text-orange-500 text-xs font-black uppercase tracking-wider flex items-center gap-1 mt-2 mb-6 hover:gap-2 transition-all">
                Selengkapnya &rarr;
              </button>

              {/* Tech Icons */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {project.techIcons.map((icon, idx) => (
                  <div key={idx} className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 border shadow-sm transition-transform hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                    <img src={icon} alt="tech" className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                  </div>
                ))}
              </div>

              {/* Preview Button - Orange Theme */}
              <button className={`mt-auto w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 active:scale-95`}>
                Preview Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pb-10">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-3 rounded-xl border-2 transition-all ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:border-orange-500 text-orange-500"}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border-2 ${
                  currentPage === i + 1 
                  ? "bg-orange-500 border-orange-500 text-white" 
                  : "border-transparent hover:border-orange-500 text-slate-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-xl border-2 transition-all ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:border-orange-500 text-orange-500"}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-bold italic">Oops! Project tidak ditemukan...</p>
        </div>
      )}
    </div>
  );
}