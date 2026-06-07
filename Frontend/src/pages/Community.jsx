import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, ThumbsUp, MessageCircle, Share2, TrendingUp, ImageIcon } from "lucide-react";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/community");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.posts) {
        setPosts(data.posts);
      }
    };
    return () => wsRef.current?.close();
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: "new_post", content: newPost }));
      setNewPost("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Users className="text-orange-400" size={40} />
          <div>
            <h1 className="text-3xl font-bold">KhetiAI Community</h1>
            <p className="text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span> Live Feed Connected
            </p>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-8">
          <textarea 
            className="w-full bg-transparent border-none outline-none resize-none text-white placeholder:text-slate-500 mb-4"
            rows="3"
            placeholder="Share an update, ask a question, or post a tip..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center border-t border-white/10 pt-3">
            <button className="p-2 text-slate-400 hover:text-orange-400 transition bg-white/5 rounded-lg"><ImageIcon size={18}/></button>
            <button 
              onClick={handlePost}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-xl transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
          <button className="flex items-center gap-2 text-orange-400 font-bold border-b-2 border-orange-400 pb-2"><TrendingUp size={18}/> Live Feed</button>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              layout
              className="bg-black/20 border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${post.author === 'You' ? 'bg-orange-500 text-black' : 'bg-gradient-to-tr from-slate-600 to-slate-400'}`}>
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{post.author}</h4>
                    <p className="text-xs text-slate-400">{post.role} • {post.time}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{post.content}</p>
              
              <div className="flex gap-6 border-t border-white/5 pt-4">
                <button className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition text-sm font-bold">
                  <ThumbsUp size={16} /> {post.upvotes}
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-bold">
                  <MessageCircle size={16} /> {post.replies} Replies
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-bold ml-auto">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-8 text-slate-500">Loading feed...</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Community;
