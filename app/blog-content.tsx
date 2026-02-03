"use client";

import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import {
    Award,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy,
    Heart,
    Medal,
    MessageCircle,
    Search,
    Send,
    Terminal,
    TrendingUp,
    Trophy,
    UserCircle,
    Wallet
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function BlogContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<{name: string, points: number}[]>([]);
  const [userName, setUserName] = useState("");
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [replyTarget, setReplyTarget] = useState<any>(null);

  // State Search & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Mock Data Blog
  const allPosts = [
    { id: 1, title: "Supabase Ecosystem", module: "NODE #1", date: "FEB 2026" },
    { id: 2, title: "Next.js Speed", module: "NODE #2", date: "FEB 2026" },
    { id: 3, title: "Tailwind Scale", module: "NODE #3", date: "FEB 2026" },
    { id: 4, title: "Advanced React", module: "NODE #4", date: "MAR 2026" },
    { id: 5, title: "Framer Motion 101", module: "NODE #5", date: "MAR 2026" },
  ];

  // Logic Filter & Pagination
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => {
    fetchInitialData();
    const channel = supabase.channel("editorial_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_comments" }, () => fetchInitialData())
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_likes" }, () => fetchInitialData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchInitialData = async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
    const { data: cData } = await supabase.from("blog_comments").select("*").order("created_at", { ascending: true });
    const { data: lData } = await supabase.from("blog_likes").select("*");
    
    if (cData) setComments(cData);
    if (lData) setLikes(lData);

    const scores: Record<string, number> = {};
    cData?.forEach(c => {
      const name = c.user_name || "Anonymous";
      scores[name] = (scores[name] || 0) + (c.parent_id ? 15 : 10);
      scores[name] += (c.likes_count || 0) * 5;
    });
    lData?.forEach(l => { if (l.user_name) scores[l.user_name] = (scores[l.user_name] || 0) + 2; });

    const sorted = Object.entries(scores)
        .map(([name, points]) => ({ name, points }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
    setLeaderboard(sorted);
  };

  const handleLikePost = async (postId: number) => {
    const currentName = userName.trim() || "Anonymous_Liker";
    const existingLike = likes.find(l => Number(l.post_id) === postId && l.user_name === currentName);
    if (existingLike) { 
        await supabase.from('blog_likes').delete().eq('id', existingLike.id); 
    } else { 
        await supabase.from('blog_likes').insert([{ post_id: postId, user_name: currentName }]); 
    }
  };

  const handleSendComment = async (postId: number) => {
    if (!commentInput.trim()) return;
    const finalName = userName.trim() || "Anonymous";
    const payload = {
        post_id: postId,
        user_name: finalName,
        content: commentInput,
        parent_id: replyTarget ? replyTarget.id : null,
        likes_count: 0
    };
    await supabase.from("blog_comments").insert([payload]);
    setCommentInput("");
    setReplyTarget(null);
  };

  const handleLikeComment = async (comment: any) => {
    await supabase.from("blog_comments")
      .update({ likes_count: (comment.likes_count || 0) + 1 })
      .eq("id", comment.id);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 transition-all duration-500 ${isDarkMode ? 'bg-[#020617] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>
      
      <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
          Activity <span className="text-orange-600">Log.</span>
        </motion.h2>

        {/* SEARCH BAR */}
        <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 z-10" size={18} />
            <input 
                type="text"
                placeholder="Search node..."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 transition-all outline-none font-bold italic text-sm ${
                    isDarkMode ? "bg-slate-900 border-white/10 focus:border-orange-600" : "bg-white border-slate-200 focus:border-orange-600 shadow-sm"
                }`}
            />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: BLOG LIST */}
        <div className="lg:col-span-8 space-y-8" style={{ perspective: "1000px" }}>
          {currentPosts.map((post) => (
            <motion.div key={post.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ translateZ: 10 }}>
              <article className={`flex flex-col md:flex-row gap-6 p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
                isDarkMode 
                ? "bg-slate-900/80 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
                : "bg-white border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              }`}>
                <div className="w-full md:w-40 h-40 shrink-0 overflow-hidden rounded-3xl bg-slate-800 shadow-xl">
                  <img src={`https://picsum.photos/seed/rel${post.id}/400/400`} className="w-full h-full object-cover opacity-90" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">
                        <span className="flex items-center gap-1"><Clock size={12}/> {post.date}</span>
                        <span className="opacity-30">|</span>
                        <span className="flex items-center gap-1"><Terminal size={12}/> {post.module}</span>
                    </div>
                    <h3 className={`text-2xl font-black italic uppercase leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {post.title}
                    </h3>
                  </div>
                  <div className="flex gap-6 pt-4 border-t border-orange-500/20">
                    <button onClick={() => handleLikePost(post.id)} className="flex items-center gap-2 text-xs font-black transition-all hover:text-orange-600 group">
                        <Heart 
                          size={18} 
                          className={likes.some(l => Number(l.post_id) === post.id && l.user_name === (userName || "Anonymous_Liker")) 
                            ? "fill-orange-600 text-orange-600" : "text-slate-400 group-hover:text-orange-600"} 
                        /> 
                        <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>{likes.filter(l => Number(l.post_id) === post.id).length}</span>
                    </button>
                    <button onClick={() => setActivePostId(activePostId === post.id ? null : post.id)} className={`flex items-center gap-2 text-xs font-black transition-all ${activePostId === post.id ? "text-orange-600" : "text-slate-400 hover:text-orange-600"}`}>
                        <MessageCircle size={18} /> 
                        <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>{comments.filter(c => Number(c.post_id) === post.id).length}</span>
                    </button>
                  </div>
                </div>
              </article>

              <AnimatePresence>
                {activePostId === post.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-6 px-4 py-2 overflow-hidden">
                    <div className="max-h-80 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                      {comments.filter(c => Number(c.post_id) === post.id && !c.parent_id).map(comm => (
                        <div key={comm.id} className="space-y-3">
                          <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-orange-600/10 shrink-0 overflow-hidden border border-orange-600/30">
                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${comm.user_name}`} alt="avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div className="bg-slate-500/5 p-3 rounded-2xl rounded-tl-none border border-slate-500/10 w-full max-w-[90%]">
                                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-tighter mb-1">{comm.user_name}</p>
                                        <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{comm.content}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 ml-3">
                                        <button onClick={() => handleLikeComment(comm)} className="flex items-center gap-1 text-[10px] font-bold text-orange-600"><Heart size={10} className="fill-current"/> {comm.likes_count || 0}</button>
                                        <button onClick={() => setReplyTarget(comm)} className="text-[10px] font-bold opacity-50 hover:opacity-100 uppercase">Reply</button>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-3">
                                    {comments.filter(r => r.parent_id === comm.id).map(rep => (
                                        <div key={rep.id} className="flex gap-3 items-start border-l-2 border-orange-600/20 pl-4">
                                            <div className="w-7 h-7 rounded-full bg-slate-500/20 shrink-0 overflow-hidden border border-slate-500/30">
                                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rep.user_name}`} alt="avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="bg-slate-500/5 p-2 rounded-xl rounded-tl-none border border-slate-500/5 w-full">
                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter mb-1">{rep.user_name}</p>
                                                <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{rep.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`p-6 rounded-[2rem] border-2 ${isDarkMode ? 'bg-slate-900/80 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'}`}>
                      <div className="flex flex-col gap-4">
                        {replyTarget && (
                            <div className="text-[9px] font-black text-orange-600 uppercase flex justify-between px-1">
                                <span>Replying to {replyTarget.user_name}</span>
                                <button onClick={() => setReplyTarget(null)} className="text-red-500">Cancel</button>
                            </div>
                        )}
                        <div className="flex items-center gap-2 border-b-2 border-orange-600/20 pb-2">
                           <UserCircle size={16} className="text-orange-600" />
                           <input 
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Your Name..."
                              className={`bg-transparent text-xs font-black uppercase tracking-widest outline-none w-full placeholder:opacity-30 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                           />
                        </div>
                        <div className="relative">
                          <input 
                              value={commentInput} 
                              onChange={(e) => setCommentInput(e.target.value)}
                              placeholder={replyTarget ? "Type your reply..." : "Type your message..."}
                              className={`w-full bg-transparent border-b-2 border-orange-600/10 py-3 pr-10 text-sm focus:border-orange-600 transition-all outline-none italic font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                          />
                          <button onClick={() => handleSendComment(post.id)} className="absolute right-0 bottom-3 text-orange-600 hover:scale-125 transition-transform">
                            <Send size={20}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-10">
                <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="p-3 rounded-xl border-2 border-orange-600/20 hover:border-orange-600 disabled:opacity-20 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-orange-600/10 opacity-40 hover:opacity-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="p-3 rounded-xl border-2 border-orange-600/20 hover:border-orange-600 disabled:opacity-20 transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
          )}
        </div>

        {/* RIGHT: LEADERBOARD & DONATION */}
        <div className="lg:col-span-4 space-y-8">
          <div className="lg:sticky lg:top-10 space-y-8">
            <div className={`rounded-[2.5rem] p-6 border-2 transition-all duration-500 ${
              isDarkMode ? "bg-slate-900 border-white/10 shadow-2xl" : "bg-white border-slate-200 shadow-xl"
            }`}>
               <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center justify-between opacity-80 ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
                  Ranking System <TrendingUp size={16} className="text-orange-600 animate-pulse" />
               </h3>
               <div className="space-y-4" style={{ perspective: "1500px" }}>
                  <AnimatePresence mode="popLayout">
                    {leaderboard.map((user, i) => {
                       const isRank1 = i === 0;
                       const isRank2 = i === 1;
                       const isRank3 = i === 2;
                       const isRank4 = i === 3;
                       let cardStyle = "";
                       let zHeight = 0;
                       if (isRank1) { cardStyle = "bg-gradient-to-br from-yellow-300 via-orange-500 to-orange-700 border-yellow-200/50 shadow-[0_20px_40px_-10px_rgba(234,179,8,0.5)]"; zHeight = 45; } 
                       else if (isRank2) { cardStyle = "bg-gradient-to-br from-slate-100 via-slate-400 to-slate-500 border-slate-200/50 shadow-[0_15px_30px_-10px_rgba(148,163,184,0.4)]"; zHeight = 30; } 
                       else if (isRank3) { cardStyle = "bg-gradient-to-br from-orange-400 via-red-500 to-red-700 border-orange-300/50 shadow-[0_12px_25px_-10px_rgba(249,115,22,0.4)]"; zHeight = 20; } 
                       else if (isRank4) { cardStyle = isDarkMode ? "bg-slate-800 border-white/10" : "bg-white border-slate-200 shadow-md"; zHeight = 10; } 
                       else { cardStyle = isDarkMode ? "bg-slate-800/50 border-white/5 opacity-80" : "bg-white/80 border-slate-100 shadow-sm opacity-80"; zHeight = 5; }
                       return (
                        <motion.div key={user.name} layout initial={{ opacity: 0, x: 20, rotateX: -15 }} animate={{ opacity: 1, x: 0, rotateX: 0, translateZ: `${zHeight}px` }} whileHover={{ scale: 1.05, translateZ: "60px", rotateY: 8, transition: { duration: 0.2 } }} className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-default ${cardStyle}`} style={{ transformStyle: "preserve-3d" }}>
                           {i < 3 && ( <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"> <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[35deg]" /> </div> )}
                           <div className="flex items-center gap-4 relative z-10" style={{ transform: "translateZ(25px)" }}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${i < 3 ? "bg-black/20 border-white/30" : (isDarkMode ? "bg-black/40 border-white/5" : "bg-slate-100 border-slate-200")}`}>
                                 {isRank1 && <Trophy size={20} className="text-yellow-100 drop-shadow-lg" />}
                                 {isRank2 && <Medal size={20} className="text-slate-100 drop-shadow-lg" />}
                                 {isRank3 && <Award size={20} className="text-orange-100 drop-shadow-lg" />}
                                 {i > 2 && <span className={`text-[10px] font-black ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>0{i + 1}</span>}
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-[11px] font-black uppercase tracking-tight ${i < 3 ? 'text-white' : (isDarkMode ? 'text-slate-200' : 'text-slate-700')}`}>{user.name}</span>
                                <span className={`text-[7px] font-bold tracking-widest uppercase ${i < 3 ? 'text-white/60' : 'opacity-40'}`}>
                                  {isRank1 ? "Supreme" : isRank2 ? "Legend" : isRank3 ? "Master" : isRank4 ? "Expert" : "Challenger"}
                                </span>
                              </div>
                           </div>
                           <div className="text-right relative z-10" style={{ transform: "translateZ(30px)" }}>
                               <span className={`text-sm font-black italic block ${i < 3 ? 'text-white' : 'text-orange-700'}`}>{user.points}</span>
                               <span className={`text-[7px] font-bold uppercase ${i < 3 ? 'text-white/50' : 'opacity-30'}`}>Power</span>
                           </div>
                        </motion.div>
                       )
                    })}
                  </AnimatePresence>
               </div>
            </div>

{/* DONATION BOX - ELEMENTAL FLOW 3D COMPACT */}
<motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`rounded-[2rem] p-4 border-2 transition-all duration-500 mt-6 relative overflow-hidden ${
        isDarkMode ? "bg-slate-950 border-white/10 shadow-2xl" : "bg-white border-slate-200 shadow-xl"
      }`}
    >
       <h3 className={`text-[9px] font-black uppercase tracking-[0.4em] mb-4 flex items-center justify-between opacity-80 ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
          Support Node <Wallet size={14} className="text-orange-600 animate-bounce" />
       </h3>
       
       <div className="space-y-3" style={{ perspective: "1000px" }}>
          {[
            { name: "DANA", account: "08123456789", theme: "ice", color: "from-cyan-400 to-blue-600", flow: "conic-gradient(from 0deg, transparent, #22d3ee, #3b82f6, transparent)" },
            { name: "OVO", account: "08123456789", theme: "magic", color: "from-purple-500 to-fuchsia-600", flow: "conic-gradient(from 0deg, transparent, #a855f7, #e879f9, transparent)" },
            { name: "BNI", account: "1234567890", theme: "fire", color: "from-orange-500 to-red-700", flow: "conic-gradient(from 0deg, transparent, #f97316, #ef4444, transparent)" }
          ].map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02, rotateX: 10, rotateY: -5, translateZ: 25 }}
              onClick={() => {
                navigator.clipboard.writeText(item.account);
                alert(`${item.name} copied!`);
              }}
              className="relative w-full p-[1.5px] rounded-xl overflow-hidden group transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* BORDER ANIMATION (The "Spilling" Effect) */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-[-100%] z-0"
                style={{ background: item.flow }}
              />

              {/* MAIN CONTENT BOX */}
              <div className={`relative z-10 w-full flex items-center justify-between p-3.5 rounded-xl ${
                isDarkMode ? 'bg-slate-900/95' : 'bg-white'
              } transition-colors group-hover:bg-opacity-90`}>
                
                <div className="flex items-center gap-4" style={{ transform: "translateZ(15px)" }}>
                  {/* 3D ICON WITH ELEMENTAL GLOW */}
                  <div className={`w-11 h-7 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-white/20 transform -rotate-6 group-hover:rotate-0 transition-all duration-500`}>
                     <span className="text-[9px] font-black text-white italic drop-shadow-md">{item.name}</span>
                  </div>
                  
                  <div className="text-left">
                     <p className={`text-[10px] font-black italic tracking-wider leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name} </p>
                     <div className="flex items-center gap-1 mt-1">
                        <span className={`w-1 h-1 rounded-full animate-ping ${item.theme === 'fire' ? 'bg-orange-500' : 'bg-cyan-400'}`} />
                        <p className="text-[6px] font-bold uppercase opacity-40 tracking-[0.1em]">Active</p>
                     </div>
                  </div>
                </div>

                {/* CLICK TO COPY BUTTON */}
                <div className="relative" style={{ transform: "translateZ(30px)" }}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-dashed border-orange-600/30 group-hover:border-solid group-hover:bg-orange-600 transition-all duration-300`}>
                      <Copy size={12} className="text-orange-600 group-hover:text-white" />
                   </div>
                </div>
              </div>
            </motion.button>
          ))}
       </div>

       {/* BOTTOM DECORATION */}
       <div className="mt-1 pt-3 border-t border-white/5 text-center">
          <p className="text-[7px] font-black  uppercase tracking-[0.2em] ">
            setiap dukungan untuk pembangunan website
          </p>
       </div>
    </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}