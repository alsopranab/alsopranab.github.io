function GitHubStats() {
    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadData() {
            // Using the utility function we defined in utils/github.js (assumed loaded globally or in scope)
            // Since we don't have modules, we rely on the script order. 
            // We will make sure utils/github.js is loaded before this file.
            if (typeof fetchGitHubData === 'function') {
                const data = await fetchGitHubData('alsopranab');
                setUserData(data);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    return (
        <section id="github" className="section-padding bg-slate-900/20" data-name="github-stats" data-file="components/GitHubStats.js">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
                GitHub <span className="text-[var(--accent)]">Activity</span>
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Real Data Stats Card */}
                <div className="card glass-panel col-span-1 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                            {userData?.avatar_url ? (
                                <img src={userData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <div className="icon-user"></div>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">{userData?.name || 'Pranab Debnath'}</h3>
                            <a href="https://github.com/alsopranab" target="_blank" className="text-sm text-slate-400 hover:text-[var(--primary)]">@alsopranab</a>
                        </div>
                    </div>

                    <div className="space-y-4 flex-grow">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm text-slate-400">Public Repos</span>
                            <span className="text-xl font-bold text-white">{loading ? '...' : userData?.public_repos || 25}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm text-slate-400">Followers</span>
                            <span className="text-xl font-bold text-[var(--primary)]">{loading ? '...' : userData?.followers || 10}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm text-slate-400">Following</span>
                            <span className="text-xl font-bold text-[var(--accent)]">{loading ? '...' : userData?.following || 5}</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/10 text-sm text-slate-500 italic">
                        "{userData?.bio || 'Building data solutions...'}"
                    </div>
                </div>

                {/* Contribution Graph - Visual Mockup */}
                <div className="card glass-panel col-span-1 lg:col-span-2 overflow-hidden relative group min-h-[300px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                            <div className="icon-git-commit text-[var(--primary)]"></div>
                            Contribution Map
                        </h3>
                         <div className="text-xs text-slate-500">Last 30 Days</div>
                    </div>
                    
                    {/* Visual Mockup of a GitHub Graph using flex */}
                    <div className="flex-grow flex items-end justify-between gap-1 w-full px-2 pb-4">
                        {[...Array(40)].map((_, i) => {
                            // Pseudo-random heights for visual effect
                            const height = Math.max(10, Math.floor(Math.sin(i * 0.5) * 50 + 40)); 
                            const intensity = height > 60 ? 'bg-[var(--primary)]' : (height > 30 ? 'bg-blue-600/60' : 'bg-slate-700/50');
                            return (
                                <div 
                                    key={i} 
                                    className={`w-full rounded-sm ${intensity} hover:bg-white transition-all duration-300 hover:scale-110`}
                                    style={{ height: `${height}%` }}
                                    title={`${height} contributions`}
                                ></div>
                            );
                        })}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent pointer-events-none opacity-50"></div>
                </div>
            </div>
        </section>
    );
}