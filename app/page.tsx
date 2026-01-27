import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Download,
  Github,
  Home as HomeIcon,
  Instagram,
  Linkedin,
  Mail,
  Star,
  Sun,
  User
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const menus = [
    { name: 'Home', icon: <HomeIcon size={18} />, active: true },
    { name: 'About', icon: <User size={18} /> },
    { name: 'Project', icon: <Briefcase size={18} /> },
    { name: 'Blog', icon: <BookOpen size={18} /> },
    { name: 'Contact', icon: <Mail size={18} /> },
  ];

  const skills = ["Vite.js", "React", "Tailwind CSS", "Node.js", "MongoDB", "JavaScript", "PHP"];

  const projects = [
    { title: "BeMaRu", desc: "LMS interaktif belajar matematika yang asik." },
    { title: "Money Tracking", desc: "Aplikasi manajemen keuangan pribadi." },
    { title: "AnakBisnis", desc: "Platform edukasi mentoring bisnis pemula." },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a] font-sans text-white selection:bg-orange-500/30">
      
      {/* --- SIDEBAR (ORANGE THEME) --- */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/5 bg-[#161d2f] p-6 md:flex z-50">
        <div className="relative mb-10 flex flex-col items-center pt-4">
          <div className="absolute right-0 top-0 rounded-full bg-slate-800 p-2 border border-white/10">
            <Sun size={14} className="text-white" />
          </div>
          <div className="mb-4 h-20 w-20 rounded-full border-2 border-orange-500 p-1 ring-4 ring-orange-500/10">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-800">
              <Image 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Profile" fill className="object-cover"
              />
            </div>
          </div>
          <h2 className="flex items-center gap-1.5 text-lg font-bold">
            AJDEV <CheckCircle size={14} className="text-orange-500 shadow-sm" />
          </h2>
          <p className="text-[10px] font-medium text-slate-500">@mhmmdignazi</p>
        </div>

        <nav className="flex-1 space-y-1">
          {menus.map((menu) => (
            <div 
              key={menu.name} 
              className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                menu.active ? 'bg-orange-600 text-white font-bold shadow-lg shadow-orange-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-orange-400'
              }`}
            >
              {menu.icon} 
              <span className="text-sm font-medium">{menu.name}</span>
            </div>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-white/5 p-4 border border-white/5 group hover:border-orange-500/30 transition">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-500/20 p-2 text-orange-500">
              <Mail size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-[10px] text-slate-500 font-mono">mhmmdignazi@gmail.com</p>
              <p className="font-bold text-xs uppercase tracking-tighter">Gmail</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:ml-64 lg:p-12">
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Hi There ✌️, I'm <span className="text-orange-500">Aji</span> 👋
            </h1>
            <div className="flex gap-3">
               <Linkedin size={20} className="text-slate-400 hover:text-orange-500 cursor-pointer" />
               <Github size={20} className="text-slate-400 hover:text-orange-500 cursor-pointer" />
               <Instagram size={20} className="text-slate-400 hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
          <p className="text-slate-400 mb-6 font-medium">Frontend Developer • Based in Indonesia</p>
          <p className="max-w-3xl text-slate-300 leading-relaxed text-sm mb-8">
            I am a <span className="text-orange-500 font-bold">Frontend Web Developer</span> who has a passion for Web Development. One of my life mottos is "Rush the process, trust the creator, ensure that great things take time."
          </p>
          <button className="flex items-center gap-2 bg-orange-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-500 transition shadow-lg shadow-orange-900/20">
            <Download size={16} /> Download CV
          </button>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Star size={20} className="text-orange-500 fill-orange-500" /> Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <div key={skill} className="px-5 py-2.5 bg-[#161d2f] border border-white/5 rounded-xl text-sm font-medium hover:border-orange-500/50 transition cursor-default">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Preview Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8 italic">Projects Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="bg-[#161d2f] border border-white/5 p-2 rounded-3xl group hover:border-orange-500/50 transition-all duration-500">
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-slate-800 mb-4">
                  <Image 
                    src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400`} 
                    alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition">{project.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{project.desc}</p>
                  <button className="w-full py-3 bg-orange-600/10 text-orange-500 border border-orange-500/20 rounded-xl text-xs font-bold hover:bg-orange-600 hover:text-white transition-all">
                    Launch Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pt-12 border-t border-white/5 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm italic">© 2026 Crafted with ❤️ by <span className="text-orange-500 font-bold">Alqorni Bayo</span></p>
          <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="hover:text-orange-500 cursor-pointer">Privacy</span>
            <span className="hover:text-orange-500 cursor-pointer">Terms</span>
            <span className="hover:text-orange-500 cursor-pointer">Work with me</span>
          </div>
        </footer>

      </main>
    </div>
  );
}