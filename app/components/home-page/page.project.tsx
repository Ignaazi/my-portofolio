"use client";

import { FolderGit2, Star } from "lucide-react";

interface ProjectPageProps {
  isDarkMode: boolean;
}

export default function BestProjectPage({ isDarkMode }: ProjectPageProps) {
  // Mengubah rounded card menjadi rounded-xl (lebih kotak tapi tetap ada lengkungan halus)
  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]";
  const niceAdminShadow = isDarkMode
    ? "shadow-[0px_20px_40px_rgba(0,0,0,0.45)] bg-[#111c30]"
    : "shadow-[0px_22px_30px_rgba(1,41,112,0.08)] bg-white";

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
      image: "assets/project3.png", // Silakan ganti link/path foto ketiga disini jika diperlukan
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

  return (
    <div className="w-full flex flex-col gap-6">
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
        {myRealProjects.map((project, index) => (
          <div
            key={index}
            className={`w-full rounded-xl overflow-hidden border flex flex-col pb-8 transition-all duration-300 ${niceAdminBorder} ${niceAdminShadow}`}
          >
            {/* Area Gambar Full */}
            <div className="w-full overflow-hidden relative border-b border-black/5 bg-slate-50 dark:bg-slate-900/40">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>

            {/* Bagian Konten Bawah (Semua dicopas sama persis sesuai Readymixnh) */}
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

                <p className={`text-xs leading-relaxed line-clamp-3 ${
                  isDarkMode ? "text-slate-300" : "text-slate-500"
                }`}>
                  {project.description}
                </p>

                <div className="pt-0.5">
                  <a 
                    href={project.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors duration-150 inline-block"
                  >
                    Selengkapnya
                  </a>
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

                {/* Tombol Preview */}
                <div className="pt-1">
                  <a
                    href={project.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2 rounded shadow-md transition-all duration-200 active:scale-95"
                  >
                    Preview
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}