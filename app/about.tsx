"use client";


export default function AboutContent({ isDarkMode }: { isDarkMode: boolean }) {
  // Simulasi data kontribusi yang lebih akurat (7 baris x 52 minggu)
  const contributionGrid = Array.from({ length: 371 }, () => Math.floor(Math.random() * 5));
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
  const days = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Narrative Section (Sesuai Screenshot) */}
      <section className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">About Me</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Short story about me.</p>
        <div className="w-full h-[1px] bg-slate-500/30 mt-10"></div>
      </section>

      <section className={`p-2 md:p-4 mb-10 leading-relaxed italic ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
        <div className="space-y-6 text-sm md:text-base">
          <p>
            Hi! I am <span className="font-bold not-italic">Hervinsa Al Qorni</span>, an experienced Junior Frontend Web Developer with a deep passion for creating elegant and efficient solutions through code. With a solid foundation in JavaScript and TypeScript, as well as a comprehensive understanding of various frontend libraries and frameworks.
          </p>
          <p>
            As a fast learner and adaptive thinker, I thrive in a dynamic environment where innovation is the driving force. My collaborative nature allows me to integrate seamlessly with the team, contributing not only to my technical prowess but also a humble attitude.
          </p>
        </div>
        <div className="w-full h-[1px] bg-slate-500/30 mt-10"></div>
      </section>

      {/* GITHUB CONTRIBUTION GRAPH (DIBUAT MIRIP ASLI) */}
      <section className={`border p-6 mb-12 shadow-xl rounded-xl ${isDarkMode ? "bg-[#161d2f] border-white/5" : "bg-white border-slate-200"}`}>
        <div className="flex flex-col space-y-4">
          {/* Header Bulan */}
          <div className="flex justify-between text-[10px] text-slate-500 font-medium ml-8 pr-4">
            {months.map((m, i) => <span key={i}>{m}</span>)}
          </div>

          <div className="flex gap-2">
            {/* Label Hari */}
            <div className="flex flex-col justify-between text-[10px] text-slate-500 font-medium pb-4">
              {days.map((d, i) => <span key={i} className="h-3">{d}</span>)}
            </div>

            {/* Grid Kotak-kotak */}
            <div className="flex-1 overflow-x-auto">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[750px]">
                {contributionGrid.map((level, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-[2px] transition-colors ${
                      level === 0 ? (isDarkMode ? 'bg-[#1e293b]' : 'bg-[#ebedf0]') : 
                      level === 1 ? 'bg-[#0e4429]' : 
                      level === 2 ? 'bg-[#006d32]' : 
                      level === 3 ? 'bg-[#26a641]' : 'bg-[#39d353]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Legenda Warna */}
          <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 pt-2">
            <span>Less</span>
            <div className="flex gap-[3px]">
               <div className={`w-3 h-3 rounded-[2px] ${isDarkMode ? 'bg-[#1e293b]' : 'bg-[#ebedf0]'}`}></div>
               <div className="w-3 h-3 rounded-[2px] bg-[#0e4429]"></div>
               <div className="w-3 h-3 rounded-[2px] bg-[#006d32]"></div>
               <div className="w-3 h-3 rounded-[2px] bg-[#26a641]"></div>
               <div className="w-3 h-3 rounded-[2px] bg-[#39d353]"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </section>

      {/* TIKTOK PROFILE SECTION (SESUAI SCREENSHOT) */}
      <section className={`border p-6 md:p-8 shadow-xl rounded-xl relative ${isDarkMode ? "bg-[#161d2f] border-white/5" : "bg-white border-slate-200"}`}>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
             <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Tiktok Profile</span>
             <span className="text-sm font-bold text-slate-400 italic">@bayodev_</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-slate-700 overflow-hidden">
                <img src="/assets/aji.jpg" className="w-full h-full object-cover" alt="TikTok" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
                <h2 className="text-xl font-bold">bayodev_</h2>
              </div>
              
              <div className="flex justify-center md:justify-start gap-6 mb-6">
                <div><span className="font-bold">166</span> <span className="text-slate-500 text-xs">Following</span></div>
                <div><span className="font-bold">6332</span> <span className="text-slate-500 text-xs">Followers</span></div>
                <div><span className="font-bold">251.7K</span> <span className="text-slate-500 text-xs">Likes</span></div>
              </div>

              <div className="text-sm text-slate-400 mb-6">
                <p>Web Developer 💻 ☕</p>
                <p>Jasa Pembuatan website... <span className="font-bold text-slate-200 cursor-pointer">See more</span></p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                 <button className="bg-[#ff3b5c] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    Open TikTok
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}