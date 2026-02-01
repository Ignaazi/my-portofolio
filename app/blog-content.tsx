"use client";

import { supabase } from "@/lib/supabase";
import {
    Clock,
    Heart,
    MessageCircle,
    Send,
    Terminal,
    TrendingUp
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto px-4 md:px-10 py-12">
      
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-12 bg-orange-500"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Archive 2026</span>
        </div>
        <h2 className={`text-5xl md:text-7xl font-black italic uppercase leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          Activity <span className="text-orange-500">Log.</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {[1, 2, 3].map((post) => (
            <div key={post} className="flex flex-col gap-2">
                <article className={`group flex flex-col md:flex-row gap-6 p-6 rounded-3xl border transition-all duration-500 ${isDarkMode ? "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]" : "bg-white border-slate-100 hover:shadow-2xl shadow-slate-200/50"}`}>
                <div className="w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-2xl relative bg-slate-800">
                    <img src={`https://picsum.photos/seed/rel${post}/500/500`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                </div>

                <div className="flex flex-col justify-between py-2 flex-1">
                    <div>
                    <div className="flex items-center gap-4 text-[9px] font-black text-orange-500 uppercase tracking-widest mb-3">
                        <span className="flex items-center gap-1"><Clock size={12}/> Feb 01, 2026</span>
                        <span className="flex items-center gap-1"><Terminal size={12}/> Log #{post}</span>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-black italic uppercase leading-tight mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {post === 1 ? "Building a scalable ecosystem with Supabase" : post === 2 ? "Next.js 14 Speed Optimization" : "Tailwind Design Patterns for Scale"}
                    </h3>
                    </div>

                    <div className="flex gap-6 items-center">
                    <button onClick={() => handleLike(post)} className="flex items-center gap-2 text-xs font-black hover:text-orange-500 transition-all">
                        <Heart size={16} className={likes.some(l => Number(l.post_id) === post) ? "fill-orange-500 text-orange-500" : "text-slate-400"} /> 
                        {/* Fix: Pastikan filter like juga menangani null untuk post 1 */}
                        {likes.filter(l => Number(l.post_id) === post || (!l.post_id && post === 1)).length}
                    </button>
                    <button onClick={() => setActivePostId(activePostId === post ? null : post)} className={`flex items-center gap-2 text-xs font-black transition-all ${activePostId === post ? "text-orange-500" : "opacity-40"}`}>
                        <MessageCircle size={16} /> 
                        {comments.filter(c => Number(c.post_id) === post || (!c.post_id && post === 1)).length}
                    </button>
                    </div>
                </div>
                </article>

                {/* INLINE DISCUSSION SECTION */}
                {activePostId === post && (
                <div className={`p-6 rounded-3xl border animate-in slide-in-from-top-4 duration-500 ${isDarkMode ? "bg-black/20 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input type="text" placeholder="NAME" value={userName} onChange={e => setUserName(e.target.value)} className="bg-transparent border-b border-orange-500/30 py-2 outline-none text-[10px] font-black focus:border-orange-500 uppercase" />
                        <input type="email" placeholder="EMAIL" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="bg-transparent border-b border-orange-500/30 py-2 outline-none text-[10px] font-black focus:border-orange-500 uppercase" />
                    </div>
                    <div className="relative mb-6">
                        <input type="text" placeholder="WRITE LOG..." value={commentInput} onChange={e => setCommentInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post)} className="w-full bg-transparent border-b-2 border-orange-500/20 py-3 pr-10 outline-none text-[11px] font-black focus:border-orange-500 uppercase" />
                        <button onClick={() => handleSendComment(post)} disabled={loading} className="absolute right-0 bottom-2 text-orange-500 hover:scale-110 disabled:opacity-30">
                            <Send size={18}/>
                        </button>
                    </div>
                    <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                        {comments.filter(c => Number(c.post_id) === post || (!c.post_id && post === 1)).map((comment) => (
                            <div key={comment.id} className="flex gap-3 group">
                                <img src={comment.avatar_url} className="w-8 h-8 rounded-lg bg-orange-500/10 p-1 shrink-0 grayscale" alt="" />
                                <div className="border-l border-orange-500/10 pl-3">
                                    <p className="text-[9px] font-black text-orange-500 uppercase">{comment.user_name}</p>
                                    <p className="text-[11px] font-bold opacity-80">{comment.comment_text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN - LEADERBOARD ONLY */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
          <div className={`rounded-3xl p-6 border ${isDarkMode ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white border-slate-100 shadow-lg"}`}>
             <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center justify-between">
                Ranking <TrendingUp size={14} className="text-orange-500" />
             </h3>
             <div className="space-y-4">
                {leaderboard.map((user, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <span className="text-[10px] font-black opacity-20">0{i+1}</span>
                      <span className={`text-[10px] font-black uppercase flex-1 ml-4 truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</span>
                      <span className="text-[9px] font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">{user.points} XP</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.4); border-radius: 10px; }
      `}</style>
    </div>
  );
}