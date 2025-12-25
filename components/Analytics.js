function Analytics() {
    const [stats, setStats] = React.useState({
        totalStars: 0,
        totalForks: 0,
        topLanguage: "Loading...",
        commitStreak: 0,
    });
    const [chartData, setChartData] = React.useState(null);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        const fetchGithubStats = async () => {
            try {
                // 1. Fetch Repos for general stats using Proxy
                const repoRes = await fetch('https://proxy-api.trickle-app.host/?url=https://api.github.com/users/alsopranab/repos?per_page=100');
                if (repoRes.ok) {
                    const repos = await repoRes.json();
                    const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                    const forks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
                    
                    const languages = {};
                    repos.forEach(repo => {
                        if (repo.language) {
                            languages[repo.language] = (languages[repo.language] || 0) + 1;
                        }
                    });
                    const topLang = Object.entries(languages).sort((a,b) => b[1] - a[1])[0];

                    setStats(prev => ({
                        ...prev,
                        totalStars: stars,
                        totalForks: forks,
                        topLanguage: topLang ? topLang[0] : "SQL"
                    }));
                }

                // 2. Fetch Commits for Real Commit Trends (Last 30 days)
                const dailyCommits = {};
                for (let i = 29; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    dailyCommits[dateStr] = 0;
                }

                const reposForCommitsRes = await fetch('https://proxy-api.trickle-app.host/?url=https://api.github.com/users/alsopranab/repos?per_page=100');
                if (reposForCommitsRes.ok) {
                    const reposForCommits = await reposForCommitsRes.json();

                    for (const repo of reposForCommits) {
                        const commitsRes = await fetch(
                            `https://proxy-api.trickle-app.host/?url=https://api.github.com/repos/alsopranab/${repo.name}/commits?per_page=100`
                        );
                        if (!commitsRes.ok) continue;

                        const commits = await commitsRes.json();
                        commits.forEach(c => {
                            const dateStr = new Date(c.commit.author.date)
                                .toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            if (dailyCommits.hasOwnProperty(dateStr)) {
                                dailyCommits[dateStr] += 1;
                            }
                        });
                    }
                }

                setChartData({
                    labels: Object.keys(dailyCommits),
                    data: Object.values(dailyCommits)
                });

                let currentStreak = 0;
                const values = Object.values(dailyCommits).reverse();
                for (let val of values) {
                    if (val > 0) currentStreak++;
                    else break;
                }
                setStats(prev => ({ ...prev, commitStreak: currentStreak }));

            } catch (e) {
                console.error("Failed to fetch GitHub stats", e);
                setStats({ totalStars: 17, totalForks: 6, topLanguage: "SQL", commitStreak: 15 });
                setChartData({
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [12, 19, 3, 5, 2, 3]
                });
            }
        };
        fetchGithubStats();
    }, []);

    React.useEffect(() => {
        if (chartRef.current && chartData) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            const ChartJS = window.ChartJS;

            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(74, 222, 128, 0.2)');
            gradient.addColorStop(1, 'rgba(74, 222, 128, 0.0)');

            chartInstance.current = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Contributions',
                        data: chartData.data,
                        backgroundColor: gradient,
                        borderColor: '#4ade80',
                        borderWidth: 2,
                        pointBackgroundColor: '#111827',
                        pointBorderColor: '#4ade80',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#4ade80',
                        pointHoverBorderColor: '#fff',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#1f2937',
                            titleColor: '#f3f4f6',
                            bodyColor: '#fff',
                            borderColor: '#374151',
                            borderWidth: 1,
                            padding: 10,
                            displayColors: false,
                            intersect: false,
                            mode: 'index',
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y} commits`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false, borderDash: [5, 5] },
                            ticks: { color: '#4ade80', font: { family: "'Courier New', monospace", size: 10 }, stepSize: 1 }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false, borderDash: [5, 5] },
                            ticks: { color: '#4ade80', font: { family: "'Courier New', monospace", size: 10 }, maxTicksLimit: 10 }
                        }
                    },
                    interaction: { mode: 'nearest', axis: 'x', intersect: false },
                    animation: { duration: 1500, easing: 'easeOutQuart' }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    const StatCard = ({ icon, value, label, colorClass, bgClass }) => (
        <div className={`p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${bgClass}`}></div>
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${bgClass} blur-xl group-hover:scale-150 transition-transform duration-700`}></div>
            <div className={`mb-4 relative`}>
                <div className={`absolute inset-0 ${bgClass} blur-lg opacity-20 rounded-full animate-pulse-glow`}></div>
                <div className={`${colorClass} relative z-10 transform group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`${icon} w-10 h-10`}></div>
                </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{value}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
        </div>
    );

    return (
        <div className="space-y-10" data-name="Analytics" data-file="components/Analytics.js">
            <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                <div className="icon-chart-line text-[var(--primary-color)] w-8 h-8 opacity-90"></div>
                GitHub Analytics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard icon="icon-star" value={stats.totalStars} label="Total Stars" colorClass="text-yellow-500" bgClass="bg-yellow-400" />
                <StatCard icon="icon-git-branch" value={stats.totalForks} label="Total Forks" colorClass="text-blue-500" bgClass="bg-blue-400" />
                <StatCard icon="icon-flame" value={`${stats.commitStreak} Days`} label="Active Streak" colorClass="text-orange-500" bgClass="bg-orange-400" />
                <StatCard icon="icon-code" value={stats.topLanguage} label="Top Language" colorClass="text-emerald-500" bgClass="bg-emerald-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card relative overflow-hidden group border border-gray-800 bg-gray-100 p-0 shadow-xl">
                    <div className="p-6 pb-2 relative z-10 flex items-center justify-between border-b border-gray-800/50">
                        <div>
                            <h3 className="font-bold text-xl text-gray-100">Contribution Activity</h3>
                            <p className="text-xs text-gray-500 mt-1 font-mono">Commits (Last 30 Days)</p>
                        </div>
                        <div className="p-2 bg-gray-800 rounded-lg text-green-400 border border-gray-700">
                            <div className="icon-chart-bar w-5 h-5"></div>
                        </div>
                    </div>
                    <div className="relative h-72 w-full z-10 p-4">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}
