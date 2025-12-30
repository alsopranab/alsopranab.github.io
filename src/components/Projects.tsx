"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchRepos, GithubRepo, fetchRepoReadme } from "@/lib/github";
import { Github, ExternalLink, Star, Code, X, Search, BookOpen, ChevronRight, LayoutGrid } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

export function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [readme, setReadme] = useState<string>("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

    const categories = useMemo(() => {
      const counts: Record<string, number> = { all: repos.length };
      repos.forEach(repo => {
        const topics = repo.topics || [];
        const content = `${repo.name} ${repo.description || ""}`.toLowerCase();
        
        // Count for explicit topics
        topics.forEach(topic => {
          counts[topic] = (counts[topic] || 0) + 1;
        });

        // Search-based counts for main categories to be more inclusive
        ['python', 'sql', 'automation', 'eda', 'case-study'].forEach(cat => {
          const keyword = cat.replace('-', ' ');
          if (content.includes(keyword) && !topics.includes(cat)) {
            counts[cat] = (counts[cat] || 0) + 1;
          }
        });
      });

      const mainCategories = ['all', 'python', 'sql', 'automation', 'eda', 'case-study'];
      return mainCategories.map(cat => ({
        id: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
        count: counts[cat] || 0
      })).filter(cat => cat.id === 'all' || cat.count > 0);
    }, [repos]);

    const openRepo = async (repo: GithubRepo) => {
      setSelectedRepo(repo);
      setReadme("Loading README...");
      const content = await fetchRepoReadme(repo.name);
      setReadme(content);
    };

      const filteredRepos = repos.filter(repo => {
        const searchTerm = search.toLowerCase();
        const matchesSearch = 
          repo.name.toLowerCase().includes(searchTerm) || 
          (repo.description && repo.description.toLowerCase().includes(searchTerm)) ||
          (repo.topics && repo.topics.some(t => t.toLowerCase().includes(searchTerm))) ||
          (repo.language && repo.language.toLowerCase().includes(searchTerm));
        
        const tabKeyword = activeTab.toLowerCase().replace('-', ' ');
        const content = `${repo.name} ${repo.description || ""}`.toLowerCase();
        const matchesTab = activeTab === "all" || 
          (repo.topics && repo.topics.includes(activeTab)) ||
          content.includes(tabKeyword);

        return matchesSearch && matchesTab;
      });

  return (
    <section id="projects" className="section-container relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-12">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">
            <div className="w-8 h-[1px] bg-accent/30" /> The Laboratory
          </div>
            <h2 className="section-title mb-0">
              Data solutions <br /> 
              <span className="opacity-[var(--muted-opacity)]">for the insight-driven.</span>
            </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full lg:max-w-2xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="FILTER..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-5 bg-card-bg/40 border border-card-border/40 rounded-full focus:outline-none focus:ring-4 focus:ring-accent/5 focus:bg-card-bg transition-all font-black text-[10px] text-text-primary placeholder:text-text-secondary/40 uppercase tracking-widest"
            />
          </div>
          <div className="flex overflow-x-auto pb-2 md:pb-0 no-scrollbar gap-2 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`whitespace-nowrap px-6 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                  activeTab === cat.id 
                    ? "bg-accent text-white glow-md" 
                    : "bg-card-bg/40 text-text-secondary hover:bg-accent/10 hover:text-accent border border-card-border/40"

                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 apple-card animate-pulse opacity-40 rounded-[2.5rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} onClick={() => openRepo(repo)} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedRepo && (
          <ProjectModal 
            repo={selectedRepo} 
            readme={readme} 
            onClose={() => setSelectedRepo(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ repo, onClick }: { repo: GithubRepo; onClick: () => void }) {
  return (
    <div
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="apple-card p-6 md:p-8 h-full flex flex-col justify-between glow-md border-card-border/40 bg-card-bg/60 backdrop-blur-xl transition-all duration-300 transform-gpu will-change-transform">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 rounded-2xl bg-card-bg/40 backdrop-blur-md border border-card-border/50 text-accent">
              <Code size={18} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg/40 backdrop-blur-md border border-card-border/40 text-text-secondary text-[8px] font-black tracking-widest uppercase">
              <Star size={8} className="text-accent fill-accent" />
              {repo.stargazers_count}
            </div>
          </div>
          
          <h3 className="text-lg font-black tracking-tighter text-text-primary mb-3 uppercase">
            {repo.name.replace(/-/g, ' ')}
          </h3>

          <p className="text-text-secondary text-[11px] leading-relaxed font-semibold line-clamp-3 opacity-80">
            {repo.description || "Architecting high-performance data systems designed for enterprise-level scale and precision."}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-card-border/30">
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics?.slice(0, 3).map(topic => (
              <span key={topic} className="px-3 py-1.5 rounded-full bg-accent/5 text-accent text-[7px] font-black uppercase tracking-widest border border-accent/10">
                {topic}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-accent font-black text-[8px] uppercase tracking-[0.4em]">
            Explore Prototype <ChevronRight size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ repo, readme, onClose }: { repo: GithubRepo; readme: string; onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl max-h-[85vh] bg-bg border border-card-border rounded-[2.5rem] overflow-hidden flex flex-col glow-xl relative"
      >
        <div className="p-6 border-b border-card-border flex justify-between items-center bg-card-bg/50 backdrop-blur-xl z-20 relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-accent text-white">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-primary tracking-tighter uppercase">{repo.name}</h2>
              <div className="flex gap-4 text-[8px] font-black uppercase tracking-[0.25em] text-text-secondary mt-1">
                <span className="flex items-center gap-2"><Star size={8} className="fill-accent text-accent" /> {repo.stargazers_count} stars</span>
                <span className="opacity-20">•</span>
                <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card-bg border border-card-border hover:bg-accent hover:text-white text-text-secondary transition-all"
            >
              <Github size={20} />
            </a>
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-card-bg border border-card-border hover:bg-red-500 hover:text-white text-text-secondary transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-bg custom-scrollbar relative z-10">
          <article className="prose prose-slate dark:prose-invert max-w-none 
            prose-headings:text-text-primary prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
            prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg
            prose-p:text-text-secondary prose-p:text-[13px] prose-p:leading-relaxed prose-p:font-medium
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-code:text-accent prose-code:bg-accent/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-code:text-[11px] prose-code:font-black
            prose-pre:bg-card-bg/50 prose-pre:rounded-2xl prose-pre:border prose-pre:border-card-border/40
            prose-img:rounded-2xl prose-img:cursor-zoom-in">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img 
                    {...props} 
                    onClick={() => setSelectedImage({ src: props.src || "", alt: props.alt || "" })}
                    className="rounded-2xl cursor-zoom-in hover:opacity-90 transition-opacity"
                  />
                )
              }}
            >
              {readme}
            </ReactMarkdown>
          </article>
        </div>
        
        <div className="p-6 border-t border-card-border bg-card-bg/50 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-center gap-6 z-20 relative">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {repo.topics?.map(topic => (
              <span key={topic} className="px-3 py-1.5 rounded-full bg-bg text-[8px] font-black uppercase tracking-widest text-text-secondary border border-card-border">
                {topic}
              </span>
            ))}
          </div>
          <a 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-accent text-white font-black rounded-full text-[9px] tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
          >
            SOURCE CODE <ExternalLink size={14} />
          </a>
        </div>

        <ImageLightbox 
          src={selectedImage?.src || null} 
          alt={selectedImage?.alt} 
          onClose={() => setSelectedImage(null)} 
        />
      </motion.div>
    </motion.div>
  );
}
