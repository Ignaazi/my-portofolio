"use client";

import { FolderGit2, Star } from "lucide-react";

interface ProjectPageProps {
  isDarkMode: boolean;
}

export default function BestProjectPage({ isDarkMode }: ProjectPageProps) {
  const niceAdminBorder = isDarkMode ? "border-white/10" : "border-[#e0e9f7]";
  const niceAdminShadow = isDarkMode
    ? "shadow-[0px_20px_40px_rgba(0,0,0,0.45)] bg-[#111c30]"
    : "shadow-[0px_22px_30px_rgba(1,41,112,0.08)] bg-white";

  const myRealProjects = [
    {
      title: "Readymixnh",
      description: "Platform jasa pengecoran beton",
      image: "/assets/project1.png",
      moreLink: "https://www.readymixnh.com/",
      previewLink: "https://www.readymixnh.com/",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${
          isDarkMode ? "text-white" : "text-[#012970]"
        }`}>
          <FolderGit2 size={20} className="text-orange-500" /> Best Projects
        </h2>
      </div>

      {/* Rampingkan dengan max-w-[340px] */}
      <div className="w-full max-w-[340px] grid grid-cols-1 gap-6">
        {myRealProjects.map((project, index) => (
          <div
            key={index}
            className={`w-full rounded-3xl overflow-hidden border flex flex-col pb-6 transition-all duration-300 ${niceAdminBorder} ${niceAdminShadow}`}
          >
            <div className={`w-full h-7 px-4 flex items-center gap-1.5 shrink-0 border-b ${
              isDarkMode ? "bg-slate-800/50 border-white/5" : "bg-[#f1f5f9] border-[#e2e8f0]"
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#ef4444] opacity-80" />
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] opacity-80" />
              <span className="w-2 h-2 rounded-full bg-[#10b981] opacity-80" />
            </div>

            {/* Area gambar diperpanjang ke h-64 */}
            <div className="w-full h-64 overflow-hidden relative bg-slate-100 dark:bg-slate-800 border-b border-black/5">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="px-5 pt-4 flex flex-col flex-1 justify-between gap-5">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-base font-extrabold tracking-tight line-clamp-1 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}>
                    {project.title}
                  </h3>
                  
                  <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide shrink-0 ${
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
                    href={project.moreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors duration-150 inline-block"
                  >
                    Selengkapnya
                  </a>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap gap-2">
                  {project.techIcons.map((iconUrl, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center p-1.5 shadow-xs ${
                        isDarkMode ? "bg-white/5 border-white/5" : "bg-[#f8fafc] border-[#e2e8f0]"
                      }`}
                    >
                      <img src={iconUrl} alt="tech icon" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>

                <div className="pt-1">
                  <a
                    href={project.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2 rounded-xl shadow-md transition-all duration-200 active:scale-95"
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