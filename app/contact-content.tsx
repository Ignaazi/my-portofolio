"use client";

import { Clock, MapPin, MessageSquare, Send, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "Web Development",
    budget: "",
    message: ""
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const myNumber = "6282124256797"; 
    const text = `*NEW PROJECT INQUIRY - AZDEV*%0A` +
                 `==========================%0A` +
                 `👤 *Client Name* : ${formData.name}%0A` +
                 `✉️ *Email* : ${formData.email}%0A` +
                 `📱 *WhatsApp* : ${formData.whatsapp}%0A` +
                 `📌 *Service* : ${formData.subject}%0A` +
                 `💰 *Budget* : ${formData.budget}%0A` +
                 `==========================%0A` +
                 `💬 *Message*:%0A${formData.message}%0A` +
                 `==========================%0A` +
                 `_Sent via ignazi-portfolio.vercel.app_`;

    window.open(`https://wa.me/${myNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="relative animate-in fade-in zoom-in-95 duration-1000 min-h-screen pb-20">
      
      {/* --- BACKGROUND --- */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] blur-[140px] -z-10 rounded-full transition-colors duration-1000 ${isDarkMode ? "bg-orange-500/10" : "bg-orange-500/5"}`}></div>

      {/* --- HEADER --- */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-16 relative pt-12 px-4">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-none border mb-6 backdrop-blur-xl transition-all duration-500 ${isDarkMode ? "bg-white/5 border-white/10 text-orange-500" : "bg-orange-500/10 border-orange-500/20 text-orange-600"}`}>
          <Sparkles size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Strategic Partnership</span>
        </div>
        
        <h2 className={`text-2xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight mb-2 transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          Elevate Your Digital <span className="text-orange-500">Presence.</span>
        </h2>

        <p className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
          Send a message if you want to use my services
        </p>
        
        <div className={`flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-orange-500" />
            <span>{formatDay(time)}, {formatDate(time)}</span>
          </div>
          <span className="hidden md:block opacity-30">|</span>
          <span className="text-orange-500">{formatTime(time)} WIB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- LEFT SIDE: INFO CARDS --- */}
        <div className="lg:col-span-4 space-y-4 w-full">
          
          {/* EMAIL CARD */}
          <div className={`group p-6 rounded-none border transition-all duration-500 ${isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
            <div className="flex items-center gap-4">
              {/* KOTAK ICON EMAIL YG DIUBAH */}
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-white border rounded-none flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 shrink-0 ${isDarkMode ? "border-orange-500" : "border-black"}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-6 h-6 object-contain" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-[9px] font-black uppercase text-orange-500 tracking-widest">Email</h4>
                <p className={`text-sm font-bold truncate transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>mhmmdignazi@gmail.com</p>
              </div>
            </div>
          </div>

          {/* OTHER INFO CARDS */}
          {[
            { label: "Instant Chat", value: "+62 821 2425 6797", icon: <MessageSquare size={22} />, color: "bg-green-500" },
            { label: "Based In", value: "Jawa Barat, Indonesia", icon: <MapPin size={22} />, color: "bg-blue-500" }
          ].map((item, idx) => (
            <div key={idx} className={`group p-6 rounded-none border transition-all duration-500 ${isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${item.color} rounded-none flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 shrink-0`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-[9px] font-black uppercase text-orange-500 tracking-widest">{item.label}</h4>
                  <p className={`text-sm font-bold truncate transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>{item.value}</p>
                </div>
              </div>
            </div>
          ))}

          {/* SOCIAL MEDIA SECTION */}
          <div className={`grid grid-cols-4 gap-2 p-2 rounded-none border transition-all duration-500 ${isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-slate-50 border-slate-200"}`}>
            {[
              { icon: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", link: "https://linkedin.com/in/muhammad-ignazi", name: "Linkedin", needsInvert: false },
              { icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", link: "https://github.com/ignaazi", name: "Github", needsInvert: true },
              { icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", link: "https://instagram.com/ignaazi", name: "Instagram", needsInvert: false },
              { icon: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg", link: "https://tiktok.com/@ignaazi", name: "TikTok", needsInvert: true }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                title={social.name}
                className={`flex items-center justify-center p-4 rounded-none transition-all duration-300 group ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"} hover:scale-105`}
              >
                <img 
                  src={social.icon} 
                  alt={social.name} 
                  className={`w-7 h-7 object-contain transition-all ${social.needsInvert && isDarkMode ? "invert brightness-100" : ""}`} 
                />
              </a>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className={`lg:col-span-8 border rounded-none p-6 md:p-12 relative shadow-2xl transition-all duration-500 backdrop-blur-md ${isDarkMode ? "bg-white/[0.02] border-white/10 shadow-black/40" : "bg-white border-slate-200 shadow-slate-200/50"}`}>
          <div className="mb-10 flex justify-between items-end">
             <div>
                <h3 className={`text-2xl font-black uppercase italic tracking-tighter transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Project <span className="text-orange-500">Brief.</span></h3>
                <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest italic">Response time: ± 24 Hours</p>
             </div>
             <div className="hidden md:block w-16 h-[1px] bg-orange-500/40 mb-3"></div>
          </div>

          <form onSubmit={handleSendWA} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            <div className="group relative">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-3 block">Identity</label>
              <input required className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all font-bold text-base md:text-lg ${isDarkMode ? "border-white/10 focus:border-orange-500 text-white" : "border-slate-200 focus:border-orange-500 text-slate-900"}`} placeholder="Your Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
            </div>

            <div className="group relative">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-3 block">Direct Email</label>
              <input required type="email" className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all font-bold text-base md:text-lg ${isDarkMode ? "border-white/10 focus:border-orange-500 text-white" : "border-slate-200 focus:border-orange-500 text-slate-900"}`} placeholder="email@address.com" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
            </div>

            <div className="group relative">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-3 block">WhatsApp</label>
              <input required className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all font-bold text-base md:text-lg ${isDarkMode ? "border-white/10 focus:border-orange-500 text-white" : "border-slate-200 focus:border-orange-500 text-slate-900"}`} placeholder="628..." onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}/>
            </div>

            <div className="group relative">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-3 block">Budget Range</label>
              <select className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all font-bold text-base md:text-lg appearance-none cursor-pointer ${isDarkMode ? "border-white/10 focus:border-orange-500 text-white" : "border-slate-200 focus:border-orange-500 text-slate-900"}`} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                <option value="" className={isDarkMode ? "bg-[#0f172a]" : "bg-white"}>Select Budget</option>
                <option value="< 2jt" className={isDarkMode ? "bg-[#0f172a]" : "bg-white"}>Under Rp 2M</option>
                <option value="2jt - 5jt" className={isDarkMode ? "bg-[#0f172a]" : "bg-white"}>Rp 2M - 5M</option>
                <option value="5jt+" className={isDarkMode ? "bg-[#0f172a]" : "bg-white"}>Rp 5M++</option>
              </select>
            </div>

            <div className="md:col-span-2 group relative">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-3 block">Project Summary</label>
              <textarea required rows={2} className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all font-bold text-base md:text-lg resize-none ${isDarkMode ? "border-white/10 focus:border-orange-500 text-white" : "border-slate-200 focus:border-orange-500 text-slate-900"}`} placeholder="Tell me about your project goals..." onChange={(e) => setFormData({...formData, message: e.target.value})}/>
            </div>

            <div className="md:col-span-2 pt-6">
              <button type="submit" className="group relative w-full overflow-hidden bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.5em] text-[12px] py-6 rounded-none transition-all shadow-lg flex items-center justify-center gap-4 active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-3">
                  Submit Inquiry <Send size={18} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}