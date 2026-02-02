"use client";

import { supabase } from "@/lib/supabase";
import {
    Award,
    Clock,
    Heart,
    Medal,
    MessageCircle,
    Send,
    Terminal,
    TrendingUp,
    Trophy
} from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<{name: string, points: number}[]>([]);
  
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePostId, setActivePostId] = useState<number | null>(null); 

  useEffect(() => {
    fetchInitialData();
    const channel = supabase.channel("editorial_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_comments" }, () => fetchInitialData())
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_likes" }, () => fetchInitialData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchInitialData = async () => {
    const { data: cData } = await supabase.from("blog_comments").select("*").order("created_at", { ascending: false });
    const { data: lData } = await supabase.from("blog_likes").select("*");
    
    if (cData) setComments(cData);
    if (lData) setLikes(lData || []);

    const scores: Record<string, number> = {};
    cData?.forEach(c => {
      const name = c.user_name || "Anonymous";
      scores[name] = (scores[name] || 0) + 10;
    });
    lData?.forEach(l => {
      if (l.user_name) scores[l.user_name] = (scores[l.user_name] || 0) + 2;
    });

    const sorted = Object.entries(scores)
        .map(([name, points]) => ({ name, points }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
    setLeaderboard(sorted);
  };

  const handleLike = async (postId: number) => {
    await supabase.from('blog_likes').insert([{ 
      post_id: postId, 
      user_name: userName || null 
    }]);
  };

  const handleSendComment = async (postId: number) => {
    if (!commentInput.trim() || !userEmail.trim()) {
        alert("Wajib isi Email dan Pesan!");
        return;
    }
    setLoading(true);
    const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(userEmail.trim().toLowerCase())}`;
    
    const { error } = await supabase.from("blog_comments").insert([{
        post_id: postId,
        user_name: userName.trim() || "Anonymous",
        user_email: userEmail.trim().toLowerCase(),
        comment_text: commentInput.trim(),
        avatar_url: avatarUrl,
    }]);

    if (!error) {
        setCommentInput("");
    } else {
        alert("Error: " + error.message);
    }
    setLoading(false);
  };

  // Helper untuk render lencana peringkat
  const renderBadge = (index: number) => {
    switch(index) {
        case 0: return <Trophy size={16} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />;
        case 1: return <Medal size={16} className="text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" />;
        case 2: return <Award size={16} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />;
        default: return <span className="text-[10px] font-black opacity-20">0{index + 1}</span>;
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto px-4 md:px-10 py-12">
      
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-12 bg-orange-500"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Archive 2026</span>
        </div>
        <h2 className={`text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          Activity <span className="text-orange-500">Log.</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* LEFT COLUMN: BLOG LIST */}
        <div className="lg:col-span-8 space-y-10">
          {[1, 2, 3].map((post) => (
            <div key={post} className="flex flex-col gap-3">
                <article className={`group flex flex-col md:flex-row gap-6 p-6 rounded-3xl border transition-all duration-500 ${isDarkMode ? "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]" : "bg-white border-slate-100 hover:shadow-2xl shadow-slate-200/50"}`}>
                    <div className="w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-2xl relative bg-slate-800">
                        <img src={`https://picsum.photos/seed/rel${post}/500/500`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="" />
                        <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-transparent transition-all"></div>
                    </div>

                    <div className="flex flex-col justify-between py-2 flex-1">
                        <div>
                            <div className="flex items-center gap-4 text-[9px] font-black text-orange-500 uppercase tracking-widest mb-3">
                                <span className="flex items-center gap-1.5"><Clock size={12}/> Feb 01, 2026</span>
                                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 rounded"><Terminal size={12}/> Log #{post}</span>
                            </div>
                            <h3 className={`text-xl md:text-2xl font-black italic uppercase leading-tight mb-3 transition-colors ${isDarkMode ? "text-white group-hover:text-orange-500" : "text-slate-900 group-hover:text-orange-500"}`}>
                                {post === 1 ? "Building a scalable ecosystem with Supabase" : post === 2 ? "Next.js 14 Speed Optimization" : "Tailwind Design Patterns for Scale"}
                            </h3>
                        </div>

                        <div className="flex gap-8 items-center pt-4 border-t border-orange-500/5">
                            <button onClick={() => handleLike(post)} className="flex items-center gap-2 text-xs font-black hover:scale-110 transition-all active:scale-95 group/btn">
                                <Heart size={18} className={likes.some(l => Number(l.post_id) === post || (!l.post_id && post === 1)) ? "fill-orange-500 text-orange-500" : "text-slate-400 group-hover/btn:text-orange-500"} /> 
                                <span className={likes.some(l => Number(l.post_id) === post || (!l.post_id && post === 1)) ? "text-orange-500" : "opacity-40"}>
                                    {likes.filter(l => Number(l.post_id) === post || (!l.post_id && post === 1)).length}
                                </span>
                            </button>
                            <button onClick={() => setActivePostId(activePostId === post ? null : post)} className={`flex items-center gap-2 text-xs font-black transition-all hover:scale-110 ${activePostId === post ? "text-orange-500" : "opacity-40"}`}>
                                <MessageCircle size={18} /> 
                                <span>{comments.filter(c => Number(c.post_id) === post || (!c.post_id && post === 1)).length}</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* INLINE DISCUSSION SECTION */}
                {activePostId === post && (
                <div className={`p-8 rounded-3xl border animate-in slide-in-from-top-4 duration-500 ${isDarkMode ? "bg-black/20 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}>
                    <div className="flex items-center gap-2 mb-6">
                         <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest">Post Log #{post}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input type="text" placeholder="NAME" value={userName} onChange={e => setUserName(e.target.value)} className={`bg-transparent border-b border-orange-500/30 py-2 outline-none text-[10px] font-black focus:border-orange-500 uppercase transition-all ${isDarkMode ? 'placeholder-white/20' : 'placeholder-slate-400'}`} />
                        <input type="email" placeholder="EMAIL" value={userEmail} onChange={e => setUserEmail(e.target.value)} className={`bg-transparent border-b border-orange-500/30 py-2 outline-none text-[10px] font-black focus:border-orange-500 uppercase transition-all ${isDarkMode ? 'placeholder-white/20' : 'placeholder-slate-400'}`} />
                    </div>
                    <div className="relative mb-8">
                        <input type="text" placeholder="ADD TO LOG..." value={commentInput} onChange={e => setCommentInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post)} className="w-full bg-transparent border-b-2 border-orange-500/20 py-3 pr-12 outline-none text-[11px] font-black focus:border-orange-500 uppercase transition-all" />
                        <button onClick={() => handleSendComment(post)} disabled={loading} className="absolute right-0 bottom-2 text-orange-500 hover:scale-125 transition-all disabled:opacity-30">
                            <Send size={20}/>
                        </button>
                    </div>
                    
                    <div className="space-y-6 max-h-80 overflow-y-auto custom-scrollbar pr-4">
                        {comments.filter(c => Number(c.post_id) === post || (!c.post_id && post === 1)).map((comment) => (
                            <div key={comment.id} className="flex gap-4 group animate-in fade-in slide-in-from-left-4">
                                <div className="relative">
                                    <img src={comment.avatar_url} className="w-10 h-10 rounded-xl bg-orange-500/10 p-1 shrink-0 grayscale group-hover:grayscale-0 transition-all border border-orange-500/5" alt="" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                                </div>
                                <div className="border-l-2 border-orange-500/10 pl-4 py-1">
                                    <p className="text-[9px] font-black text-orange-500 uppercase mb-1 tracking-tighter">{comment.user_name}</p>
                                    <p className={`text-[12px] font-bold leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{comment.comment_text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: STICKY LEADERBOARD */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className={`rounded-[2rem] p-8 border overflow-hidden relative ${isDarkMode ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white border-slate-100 shadow-2xl shadow-slate-200"}`}>
               {/* Ornamen Background */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
               
               <div className="relative">
                 <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-8 flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Ranking <TrendingUp size={16} className="text-orange-500" />
                 </h3>
                 
                 <div className="space-y-5">
                    {leaderboard.map((user, i) => (
                       <div key={i} className={`flex items-center justify-between group p-3 rounded-2xl transition-all ${i < 3 ? (isDarkMode ? 'bg-orange-500/5' : 'bg-orange-500/[0.03]') : ''}`}>
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                {renderBadge(i)}
                             </div>
                             <span className={`text-[11px] font-black uppercase flex-1 truncate max-w-[140px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</span>
                          </div>
                          <div className="flex flex-col items-end">
                              <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full">{user.points} XP</span>
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Footer Leaderboard */}
                 <div className="mt-8 pt-6 border-t border-orange-500/10 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30">Contributor Rewards Program v1.0</p>
                 </div>
               </div>
            </div>

            {/* Additional Sticky Widget (Info) */}
            <div className={`rounded-[2rem] p-6 border text-center ${isDarkMode ? "bg-orange-500/5 border-orange-500/20" : "bg-orange-500/[0.02] border-orange-500/10"}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                    Next Log Update in 48h
                </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(249, 115, 22, 0.6); }
      `}</style>
    </div>
  );
}