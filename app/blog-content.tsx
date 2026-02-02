"use client";

import { supabase } from "@/lib/supabase";
import {
    Award,
    Clock, Heart,
    Medal,
    MessageCircle,
    Reply,
    Send, Terminal,
    ThumbsUp,
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
  const [replyTo, setReplyTo] = useState<any>(null);

  useEffect(() => {
    fetchInitialData();
    const channel = supabase.channel("editorial_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_comments" }, () => fetchInitialData())
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_likes" }, () => fetchInitialData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchInitialData = async () => {
    // Pengamanan build-time
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase credentials missing");
      return;
    }

    const { data: cData } = await supabase.from("blog_comments").select("*").order("created_at", { ascending: true });
    const { data: lData } = await supabase.from("blog_likes").select("*");
    
    if (cData) setComments(cData);
    if (lData) setLikes(lData || []);

    const scores: Record<string, number> = {};
    cData?.forEach(c => {
      const name = c.user_name || "Anonymous";
      scores[name] = (scores[name] || 0) + (c.parent_id ? 15 : 10);
      scores[name] += (c.likes_count || 0) * 5;
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

  const handleLikePost = async (postId: number) => {
    const { data: existing } = await supabase
      .from('blog_likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_name', userName || "Anonymous")
      .single();

    if (existing) {
        await supabase.from('blog_likes').delete().eq('id', existing.id);
    } else {
        await supabase.from('blog_likes').insert([{ post_id: postId, user_name: userName || "Anonymous" }]);
    }
  };

  const handleLikeComment = async (commentId: number, currentLikes: number) => {
    await supabase.from("blog_comments").update({ likes_count: (currentLikes || 0) + 1 }).eq("id", commentId);
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
        parent_id: replyTo ? replyTo.id : null
    }]);

    if (!error) {
        setCommentInput("");
        setReplyTo(null);
    }
    setLoading(false);
  };

  // --- RENDER BADGE DENGAN PARTIKEL JATUH ---
  const renderBadge = (index: number) => {
    const elementClass = index === 0 ? "elem-fire" : index === 1 ? "elem-ice" : index === 2 ? "elem-water" : "";
    
    return (
      <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden shadow-inner bg-slate-100/50 ${index < 3 ? 'border-2' : ''} ${elementClass}`}>
        {/* Particle Layer (Rank 1-3 Only) */}
        {index < 3 && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="particle-container">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        )}
        
        {/* Ikon Ranking */}
        <div className="relative z-10 drop-shadow-md">
          {index === 0 && <Trophy size={22} className="text-yellow-500" />}
          {index === 1 && <Medal size={22} className="text-blue-300" />}
          {index === 2 && <Award size={22} className="text-blue-500" />}
          {index > 2 && <span className="text-xs font-black opacity-30">0{index + 1}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      <header className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
          Activity <span className="text-orange-500">Log.</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
        
        {/* LEFT: BLOG LIST */}
        <div className="lg:col-span-8 space-y-8">
          {[1, 2, 3].map((post) => (
            <div key={post} className="space-y-4">
              <article className={`flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] border-2 transition-all ${isDarkMode ? "bg-slate-950 border-white/5 shadow-2xl" : "bg-white border-slate-100 shadow-lg"}`}>
                <div className="w-full md:w-40 h-40 shrink-0 overflow-hidden rounded-2xl bg-slate-800">
                  <img src={`https://picsum.photos/seed/rel${post}/400/400`} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-3 text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2">
                        <span className="flex items-center gap-1"><Clock size={12}/> FEB 2026</span>
                        <span className="opacity-30">|</span>
                        <span className="flex items-center gap-1"><Terminal size={12}/> NODE #{post}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black italic uppercase leading-tight mb-2">
                        {post === 1 ? "Supabase Ecosystem" : post === 2 ? "Next.js Speed" : "Tailwind Scale"}
                    </h3>
                  </div>
                  <div className="flex gap-6 pt-4 border-t border-orange-500/10">
                    <button onClick={() => handleLikePost(post)} className="flex items-center gap-2 text-xs font-black transition-all hover:text-orange-500">
                        <Heart size={18} className={likes.some(l => l.post_id === post) ? "fill-orange-500 text-orange-500" : ""} /> 
                        {likes.filter(l => l.post_id === post).length}
                    </button>
                    <button onClick={() => setActivePostId(activePostId === post ? null : post)} className={`flex items-center gap-2 text-xs font-black transition-all ${activePostId === post ? "text-orange-500" : "opacity-40"}`}>
                        <MessageCircle size={18} /> 
                        {comments.filter(c => c.post_id === post).length}
                    </button>
                  </div>
                </div>
              </article>

              {/* DISCUSSION */}
              {activePostId === post && (
                <div className={`p-6 rounded-[2rem] border-2 animate-in slide-in-from-top-4 ${isDarkMode ? "bg-slate-900/50 border-orange-500/20" : "bg-slate-50 border-slate-200"}`}>
                    <div className="mb-8 space-y-4">
                        {replyTo && (
                            <div className="flex items-center justify-between bg-orange-500/10 p-2 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                                <span>Replying to: {replyTo.user_name}</span>
                                <button onClick={() => setReplyTo(null)} className="text-orange-500">CANCEL</button>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="NAME" value={userName} onChange={e => setUserName(e.target.value)} className="bg-transparent border-b border-orange-500/20 py-2 outline-none text-[10px] font-black focus:border-orange-500 uppercase" />
                            <input type="email" placeholder="EMAIL" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="bg-transparent border-b border-orange-500/20 py-2 outline-none text-[10px] font-black focus:border-orange-500 uppercase" />
                        </div>
                        <div className="relative">
                            <input type="text" placeholder={replyTo ? "WRITE REPLY..." : "WRITE COMMENT..."} value={commentInput} onChange={e => setCommentInput(e.target.value)} className="w-full bg-transparent border-b-2 border-orange-500/30 py-3 pr-10 outline-none text-xs font-black focus:border-orange-500 uppercase" />
                            <button onClick={() => handleSendComment(post)} disabled={loading} className="absolute right-0 bottom-2 text-orange-500"><Send size={20}/></button>
                        </div>
                    </div>

                    <div className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                        {comments.filter(c => c.post_id === post && !c.parent_id).map((comment) => (
                            <div key={comment.id} className="space-y-4">
                                <div className="flex gap-4 group">
                                    <img src={comment.avatar_url} className="w-10 h-10 rounded-xl bg-orange-500 p-0.5" alt="" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[10px] font-black text-orange-500 uppercase">{comment.user_name}</p>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleLikeComment(comment.id, comment.likes_count)} className="flex items-center gap-1 text-[9px] font-bold opacity-40 hover:opacity-100 hover:text-orange-500"><ThumbsUp size={12}/> {comment.likes_count || 0}</button>
                                                <button onClick={() => setReplyTo(comment)} className="flex items-center gap-1 text-[9px] font-bold opacity-40 hover:opacity-100 hover:text-orange-500"><Reply size={12}/> REPLY</button>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold leading-relaxed opacity-80">{comment.comment_text}</p>
                                    </div>
                                </div>
                                {comments.filter(r => r.parent_id === comment.id).map(reply => (
                                    <div key={reply.id} className="ml-12 flex gap-3 border-l-2 border-orange-500/10 pl-4 py-1">
                                        <img src={reply.avatar_url} className="w-7 h-7 rounded-lg bg-orange-500/20 p-0.5" alt="" />
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black text-orange-500 uppercase">{reply.user_name} <span className="opacity-30 ml-1">REPLIED</span></p>
                                            <p className="text-[11px] font-bold opacity-80">{reply.comment_text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: LEADERBOARD */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-10 space-y-6">
            <div className={`rounded-[2rem] p-8 border-2 relative overflow-hidden ${isDarkMode ? "bg-slate-950 border-white/5" : "bg-white shadow-xl"}`}>
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                  Leaderboard <TrendingUp size={16} className="text-orange-500" />
               </h3>
               <div className="space-y-4">
                  {leaderboard.length > 0 ? leaderboard.map((user, i) => (
                     <div key={i} className={`flex items-center justify-between p-3 rounded-2xl transition-all border ${i < 3 ? 'border-orange-500/20 bg-orange-500/5' : 'border-transparent'}`}>
                        <div className="flex items-center gap-4">
                           {renderBadge(i)}
                           <span className="text-[11px] font-black uppercase truncate max-w-[100px]">{user.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-orange-500">{user.points} XP</span>
                     </div>
                  )) : (
                    <div className="text-center py-4 opacity-20 text-[10px] font-black">NO ACTIVITY DETECTED</div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CSS FALLING PARTICLES --- */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
        
        .particle-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .particle-container span {
          position: absolute;
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          opacity: 0;
          animation: fall 1.5s infinite linear;
        }

        @keyframes fall {
          0% { transform: translateY(-10px) scale(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(45px) scale(1.5); opacity: 0; }
        }

        .particle-container span:nth-child(1) { left: 15%; animation-delay: 0s; }
        .particle-container span:nth-child(2) { left: 40%; animation-delay: 0.3s; }
        .particle-container span:nth-child(3) { left: 65%; animation-delay: 0.6s; }
        .particle-container span:nth-child(4) { left: 85%; animation-delay: 0.9s; }
        .particle-container span:nth-child(5) { left: 25%; animation-delay: 1.2s; }

        /* API (Rank 1) - Membara */
        .elem-fire { border-color: #ff4500 !important; background: #fff5f0 !important; }
        .elem-fire .particle-container span { 
          background: #ff4500; 
          box-shadow: 0 0 10px #ffae00;
        }

        /* ES (Rank 2) - Kristal */
        .elem-ice { border-color: #00d4ff !important; background: #f0faff !important; }
        .elem-ice .particle-container span { 
          background: #ffffff; 
          border-radius: 0px;
          transform: rotate(45deg);
          box-shadow: 0 0 8px #00d4ff;
        }

        /* AIR (Rank 3) - Tetesan */
        .elem-water { border-color: #3b82f6 !important; background: #eff6ff !important; }
        .elem-water .particle-container span { 
          background: #3b82f6; 
          width: 3px;
          height: 8px;
          border-radius: 4px;
          box-shadow: 0 0 5px #3b82f6;
        }
      `}</style>
    </div>
  );
}