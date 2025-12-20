function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" data-name="hero" data-file="components/Hero.js">
            
            {/* Background: Dark Violet Gradient (No Image) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#0f0529] to-[#0a0118] z-0"></div>

            {/* Background: Fake Animated Analytics Dashboard (Parallax/Floating) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
                {/* Floating Card 1: Top Left - Bar Chart */}
                <div className="absolute top-[15%] left-[5%] w-64 h-40 glass-panel border border-white/5 rounded-xl p-4 animate-float transform -rotate-6">
                    <div className="flex justify-between items-end h-full gap-2">
                        <div className="w-full bg-violet-500/30 rounded-t-sm h-[40%]"></div>
                        <div className="w-full bg-cyan-500/30 rounded-t-sm h-[70%]"></div>
                        <div className="w-full bg-violet-500/30 rounded-t-sm h-[50%]"></div>
                        <div className="w-full bg-cyan-500/30 rounded-t-sm h-[85%]"></div>
                        <div className="w-full bg-violet-500/30 rounded-t-sm h-[60%]"></div>
                    </div>
                </div>

                {/* Floating Card 2: Bottom Right - Line Graph */}
                <div className="absolute bottom-[20%] right-[10%] w-72 h-48 glass-panel border border-white/5 rounded-xl p-4 animate-float-delayed transform rotate-3">
                     <div className="w-full h-full border-l border-b border-white/10 relative">
                        <svg className="absolute inset-0 w-full h-full" overflow="visible">
                            <path d="M0 100 Q 50 50 100 80 T 200 40" fill="none" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="3" />
                        </svg>
                        <div className="absolute top-8 right-0 bg-cyan-500/20 px-2 py-1 rounded text-[10px] text-cyan-300">Growth +128%</div>
                     </div>
                </div>

                {/* Floating Card 3: Top Right - Circular Stat */}
                <div className="absolute top-[20%] right-[15%] w-40 h-40 glass-panel border border-white/5 rounded-full flex items-center justify-center animate-float-slow">
                    <div className="w-32 h-32 rounded-full border-4 border-violet-500/20 border-t-violet-500 flex items-center justify-center">
                        <div className="text-violet-300 font-mono text-xl">98%</div>
                    </div>
                </div>

                 {/* Floating Card 4: Bottom Left - Code Snippet */}
                 <div className="absolute bottom-[15%] left-[10%] w-60 h-auto glass-panel border border-white/5 rounded-xl p-3 animate-float transform rotate-2">
                    <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                        <div className="h-2 w-1/2 bg-violet-500/20 rounded"></div>
                        <div className="h-2 w-full bg-white/10 rounded"></div>
                        <div className="h-2 w-2/3 bg-cyan-500/20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                
                {/* Profile Section with Badges */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                    {/* Badge Left */}
                    <div className="hidden md:flex flex-col gap-3 items-end">
                        <div className="bg-violet-900/40 backdrop-blur-md border border-violet-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-fade-in-right">
                            <div className="icon-trophy text-yellow-400 text-sm"></div>
                            <span className="text-sm font-medium text-violet-100">Global #1 SQL</span>
                        </div>
                    </div>

                    {/* Profile Image */}
<div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

    <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 bg-black flex items-center justify-center">
        <img
            src="https://github.com/alsopranab.png"
            alt="Pranab Debnath"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
                e.currentTarget.style.display = "none";
            }}
        />

        {/* Fallback initials */}
        <span className="relative z-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            PD
        </span>
    </div>
</div>

                             {/* Glossy overlay */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Badge Right */}
                    <div className="flex md:hidden flex-row gap-3 mt-4">
                        <div className="bg-violet-900/40 backdrop-blur-md border border-violet-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                            <div className="icon-trophy text-yellow-400 text-sm"></div>
                            <span className="text-sm font-medium text-violet-100">HackerRank Global #1 SQL</span>
                        </div>
                        <div className="bg-cyan-900/40 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                            <div className="icon-code text-cyan-400 text-sm"></div>
                            <span className="text-sm font-medium text-cyan-100">LeetCode Top 50</span>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col gap-3 items-start">
                        <div className="bg-cyan-900/40 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-fade-in-left">
                            <div className="icon-code text-cyan-400 text-sm"></div>
                            <span className="text-sm font-medium text-cyan-100">LeetCode Top 50</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                    Pranab Debnath
                </h1>
                
                <p className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 font-bold mb-8">
                    Data Analyst & Automation Specialist
                </p>

                <p className="mt-2 max-w-2xl mx-auto text-lg text-[var(--text-muted)] mb-10 leading-relaxed">
                    Transforming raw data into actionable business insights with an ownership-driven approach. 
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto z-20">
                    <a href="#projects" className="btn btn-primary justify-center shadow-lg shadow-violet-500/20">
                        View Work <div className="icon-arrow-down-circle text-lg"></div>
                    </a>
                    <a href="#contact" className="btn btn-outline justify-center hover:bg-white/5 border-violet-500/30">
                        Get in Touch <div className="icon-mail text-lg"></div>
                    </a>
                </div>
            </div>
        </section>
    );
}
