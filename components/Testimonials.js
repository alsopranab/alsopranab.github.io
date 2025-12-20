function Testimonials() {
    return (
        <section className="section-padding bg-slate-900/30" data-name="testimonials" data-file="components/Testimonials.js">
            <div className="max-w-4xl mx-auto">
                <div className="relative glass-panel rounded-2xl p-8 md:p-12 border border-slate-700/50">
                    <div className="absolute top-6 left-8 text-6xl text-slate-700 font-serif opacity-50">"</div>
                    
                    <blockquote className="relative z-10 text-center space-y-6">
                        <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
                            "He has a strong <span className="text-blue-400 font-semibold">analytical mindset</span>, automation skills, and an ownership-driven approach... demonstrated exceptional ability to streamline operations."
                        </p>
                        
                        <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-700/50">
                            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                                <div className="icon-user text-slate-400"></div>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white">Operations Manager</div>
                                <div className="text-xs text-slate-400">Previous Organization</div>
                            </div>
                            <a 
                                href="https://www.linkedin.com/in/alsopranab/details/recommendations/" 
                                target="_blank"
                                className="ml-auto text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 border border-blue-500/30 rounded-full px-3 py-1 hover:bg-blue-500/10 transition-colors"
                            >
                                Read Full <div className="icon-linkedin text-xs"></div>
                            </a>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
