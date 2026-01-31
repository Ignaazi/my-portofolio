"use client";

import { Github, Instagram, Linkedin, Mail, Phone, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ContactContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "Web Development",
    budget: "",
    message: ""
  });

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const myNumber = "6282124256797"; 
    
    // Format Pesan Profesional (Invoice Style)
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
    <div className="relative animate-in fade-in zoom-in-95 duration-1000">
      
      {/* Background Decor */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
          <Sparkles size={14} className="text-orange-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Available for Projects</span>
        </div>
        <h2 className={`text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          Get In <span className="text-orange-500">Touch.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT SIDE - CONTACT INFO (3D Floating) */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`group p-8 border rounded-3xl transition-all duration-500 hover:-rotate-2 hover:scale-[1.02] shadow-2xl ${isDarkMode ? "bg-[#161d2f]/80 border-white/5 shadow-black/40" : "bg-white border-slate-200 shadow-slate-200"}`}>
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-600/40 rotate-3 group-hover:rotate-12 transition-transform">
              <Mail className="text-white" size={24} />
            </div>
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Drop an Email</h4>
            <p className="text-sm font-bold break-all">mhmmdignazi@gmail.com</p>
          </div>

          <div className={`group p-8 border rounded-3xl transition-all duration-500 hover:rotate-2 hover:scale-[1.02] shadow-2xl ${isDarkMode ? "bg-[#161d2f]/80 border-white/5 shadow-black/40" : "bg-white border-slate-200 shadow-slate-200"}`}>
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-600/40 -rotate-3 group-hover:-rotate-12 transition-transform">
              <Phone className="text-white" size={24} />
            </div>
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Call / WhatsApp</h4>
            <p className="text-sm font-bold">+62 821-2425-6797</p>
          </div>

          <div className={`flex justify-center gap-4 p-6 border rounded-3xl ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
            {[<Github key="gh" size={20}/>, <Linkedin key="li" size={20}/>, <Instagram key="ig" size={20}/>].map((icon, i) => (
              <button key={i} className="p-3 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 text-slate-400">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - FORM (Premium Glassmorphism) */}
        <div className={`lg:col-span-8 border rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 ${isDarkMode ? "bg-[#161d2f]/40 border-white/10 backdrop-blur-3xl" : "bg-white/80 border-slate-200"}`}>
          
          <form onSubmit={handleSendWA} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">Full Name</label>
              <input 
                required
                className={`w-full px-6 py-4 rounded-2xl border-2 bg-transparent outline-none transition-all font-bold text-sm ${isDarkMode ? "border-white/5 focus:border-orange-500 focus:bg-white/5" : "border-slate-100 focus:border-orange-500"}`}
                placeholder="Ex: Alexander Pierce"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">Email Address</label>
              <input 
                required
                type="email"
                className={`w-full px-6 py-4 rounded-2xl border-2 bg-transparent outline-none transition-all font-bold text-sm ${isDarkMode ? "border-white/5 focus:border-orange-500 focus:bg-white/5" : "border-slate-100 focus:border-orange-500"}`}
                placeholder="alex@company.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">WhatsApp Number</label>
              <input 
                required
                className={`w-full px-6 py-4 rounded-2xl border-2 bg-transparent outline-none transition-all font-bold text-sm ${isDarkMode ? "border-white/5 focus:border-orange-500 focus:bg-white/5" : "border-slate-100 focus:border-orange-500"}`}
                placeholder="0821..."
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">Est. Budget</label>
              <select 
                className={`w-full px-6 py-4 rounded-2xl border-2 bg-transparent outline-none transition-all font-bold text-sm appearance-none ${isDarkMode ? "border-white/5 focus:border-orange-500 focus:bg-[#161d2f]" : "border-slate-100 focus:border-orange-500"}`}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              >
                <option value="">Select Budget</option>
                <option value="< 2jt">{"<"} Rp 2.000.000</option>
                <option value="2jt - 5jt">Rp 2.000.000 - Rp 5.000.000</option>
                <option value="5jt+">Rp 5.000.000++</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">Project Details</label>
              <textarea 
                required
                rows={4}
                className={`w-full px-6 py-4 rounded-2xl border-2 bg-transparent outline-none transition-all font-bold text-sm resize-none ${isDarkMode ? "border-white/5 focus:border-orange-500 focus:bg-white/5" : "border-slate-100 focus:border-orange-500"}`}
                placeholder="Describe your vision..."
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit"
                className="group w-full md:w-auto bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] text-[11px] px-12 py-5 rounded-2xl transition-all shadow-xl shadow-orange-900/40 flex items-center justify-center gap-4 active:scale-95"
              >
                Start Conversation
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}