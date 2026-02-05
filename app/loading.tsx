"use client";

import { Loader2 } from "lucide-react";

/**
 * Komponen Loading Global
 * Next.js akan otomatis menampilkan ini saat transisi antar rute (page)
 */
const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Glow Effect di belakang spinner */}
        <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
        
        {/* Spinner Utama */}
        <Loader2 
          className="w-16 h-16 text-orange-500 animate-spin relative z-10" 
          strokeWidth={3} 
        />
        
        {/* Teks Animasi */}
        <div className="mt-6 flex flex-col items-center gap-2 relative z-10">
          <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
            Loading Data
          </span>
          
          {/* Progress bar kecil dekoratif */}
          <div className="h-[2px] w-24 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 animate-[loading-bar_1.5s_infinite]" />
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation Style */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Loading;