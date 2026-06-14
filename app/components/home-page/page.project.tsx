"use client";

import { FolderGit2, Star, X } from "lucide-react";
import { useState } from "react";

interface ProjectPageProps {
  isDarkMode: boolean;
}

export default function BestProjectPage({ isDarkMode }: ProjectPageProps) {
  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]";
  const niceAdminShadow = isDarkMode
    ? "shadow-[0px_20px_40px_rgba(0,0,0,0.45)] bg-[#111c30]"
    : "shadow-[0px_22px_30px_rgba(1,41,112,0.08)] bg-white";

  // State untuk mengontrol teks ekspansi deskripsi (berdasarkan indeks proyek)
  const [expandedProjects, setExpandedProjects] = useState<{ [key: number]: boolean }>({});
  
  // State untuk mengontrol penampilan gambar pop-up/modal gambar proyek 2 & 3
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);

  const myRealProjects = [
    {
      title: "Readymixnh.com",
      description: "Platform website landing page untuk jasa pengecoran beton dan penyewaan alat jasa pompa cor se jabodetabek by nahuldi ",
      image: "assets/project1.png",
      previewLink: "https://readymixnh.com/",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"
      ]
    },
    {
      title: "System Sparepart Management",
      description: "Website local server system sparepart management perusahaan manufacture dalam menjaga proses penyimpanan dan memonitoring proses in/out sparepart",
      image: "assets/project2.png",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/alpinejs/alpinejs-original.svg",
        "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"
      ]
    },
    {
      title: "PT.SIIX Inventory Sparepart",
      description: "System inventory sparepart control use consept ERP 3 Module Warehouse, Production, Costing and implement MRP, FIFO, Tracebility data, Analytz data For monitoring and maintaine sparepart machine ",
      image: "assets/project3.png",
      previewLink: "https://readymixnh.com/",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"
      ]
    }
  ];

  // Fungsi toggle buka tutup deskripsi proyek
  const toggleExpand = (index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Header Judul Section */}
      <div className="space-y-1">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${
          isDarkMode ? "text-white" : "text-[#012970]"
        }`}>
          <FolderGit2 size={20} className="text-orange-500" /> Best Projects
        </h2>
      </div>

      {/* Grid Utama Maksimal 3 Kolom */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRealProjects.map((project, index) => {
          const isExpanded = !!expandedProjects[index];
          // Menentukan apakah proyek ini adalah proyek ke-2 atau ke-3 (index 1 dan index 2)
          const isPopupProject = index === 1 || index === 2;

          return (
            <div
              key={index}
              className={`w-full rounded-xl overflow-hidden border flex flex-col pb-8 transition-all duration-300 ${niceAdminBorder} ${niceAdminShadow}`}
            >
              {/* Area Gambar Full */}
              <div 
                onClick={() => isPopupProject && setActivePreviewImage(project.image)}
                className={`w-full overflow-hidden relative border-b border-black/5 bg-slate-50 dark:bg-slate-900/40 ${
                  isPopupProject ? "cursor-pointer" : ""
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>

              {/* Bagian Konten Bawah */}
              <div className="px-5 pt-6 flex flex-col flex-1 justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-base font-extrabold tracking-tight line-clamp-1 ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}>
                      {project.title}
                    </h3>
                    
                    {/* Badge Star */}
                    <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm text-[10px] font-bold tracking-wide shrink-0 ${
                      isDarkMode ? "bg-white/5 text-amber-400 border border-white/10" : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}>
                      <Star size={10} fill="currentColor" className="text-amber-500" /> Best
                    </div>
                  </div>

                  {/* Deskripsi Teks dengan Fitur Pembatasan 3 Baris Otomatis */}
                  <p className={`text-xs leading-relaxed transition-all duration-200 ${
                    isDarkMode ? "text-slate-300" : "text-slate-500"
                  } ${!isExpanded ? "line-clamp-3" : ""}`}>
                    {project.description}
                  </p>

                  {/* Tombol Interaktif Selengkapnya/Sembunyikan (Bukan Link Anchor) */}
                  <div className="pt-0.5">
                    <button 
                      type="button"
                      onClick={() => toggleExpand(index)}
                      className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors duration-150 inline-block bg-transparent border-none p-0 cursor-pointer"
                    >
                      {isExpanded ? "Sembunyikan" : "Selengkapnya"}
                    </button>
                  </div>
                </div>

                {/* Bagian Footer Bahasa & Tombol Preview */}
                <div className="space-y-5 pt-1">
                  {/* Logo bahasa pemrograman */}
                  <div className="flex flex-wrap gap-2">
                    {project.techIcons.map((iconUrl, idx) => (
                      <div
                        key={idx}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center p-1.5 shadow-xs ${
                          isDarkMode ? "bg-white/5 border-white/5" : "bg-[#f8fafc] border-[#e2e8f0]"
                        }`}
                      >
                        <img src={iconUrl} alt="tech icon" className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>

                  {/* Tombol Preview Berdasarkan Aturan Proyek */}
                  <div className="pt-1">
                    {isPopupProject ? (
                      // Project 2 & 3: Hanya memicu Pop-Up Gambar lokal di halaman tanpa membuka tab baru/tautan eksternal
                      <button
                        type="button"
                        onClick={() => setActivePreviewImage(project.image)}
                        className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2 rounded shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        Preview
                      </button>
                    ) : (
                      // Project 1 (Readymixnh): Tetap mempertahankan fungsi link tautan luar bawaan Anda
                      <a
                        href={project.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2 rounded shadow-md transition-all duration-200 active:scale-95"
                      >
                        Preview
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ==================== LAYAR POPUP MODAL GAMBAR DIGITAL (UNTUK PROYEK 2 & 3) ==================== */}
      {activePreviewImage && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setActivePreviewImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#111c30] p-2 rounded-xl border border-white/10 shadow-2xl flex flex-col gap-2 transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Silang/Tutup */}
            <button
              type="button"
              onClick={() => setActivePreviewImage(null)}
              className="absolute -top-3 -right-3 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-transform duration-150 active:scale-90"
            >
              <X size={18} />
            </button>
            
            {/* Gambar Render Skala Penuh */}
            <img 
              src={activePreviewImage} 
              alt="Project Preview" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}