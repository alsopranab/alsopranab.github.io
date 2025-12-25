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
                // 1. Fetch repos
                const repoRes = await fetch(
                    'https://proxy-api.trickle-app.host/?url=https://api.github.com/users/alsopranab/repos?per_page=100'
                );

                let repos = [];

                if (repoRes.ok) {
                    repos = await repoRes.json();

                    const stars = repos.reduce((a, r) => a + r.stargazers_count, 0);
                    const forks = repos.reduce((a, r) => a + r.forks_count, 0);

                    const languages = {};
                    repos.forEach(repo => {
                        if (repo.language) {
                            languages[repo.language] =
                                (languages[repo.language] || 0) + 1;
                        }
                    });

                    const topLang =
                        Object.entries(languages).sort((a, b) => b[1] - a[1])[0];

                    setStats(prev => ({
                        ...prev,
                        totalStars: stars,
                        totalForks: forks,
                        topLanguage: topLang ? topLang[0] : "SQL"
                    }));
                }

                // 2. Build last 30 days map
                const dailyCommits = {};
                for (let i = 29; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    dailyCommits[d.toISOString().split('T')[0]] = 0;
                }

                // 3. Fetch real commits from GitHub (per repo)
                for (const repo of repos) {
                    const commitsRes = await fetch(
                        `https://proxy-api.trickle-app.host/?url=https://api.github.com/repos/alsopranab/${repo.name}/commits?per_page=100`
                    );
                    if (!commitsRes.ok) continue;

                    const commits = await commitsRes.json();
                    commits.forEach(c => {
                        const date = c?.commit?.author?.date?.split('T')[0];
                        if (date && dailyCommits.hasOwnProperty(date)) {
                            dailyCommits[date]++;
                        }
                    });
                }

                // 4. Convert to chart format
                const labels = [];
                const data = [];

                Object.keys(dailyCommits).forEach(key => {
                    const d = new Date(key);
                    labels.push(
                        d.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })
                    );
                    data.push(dailyCommits[key]);
                });

                setChartData({ labels, data });

                // 5. Active streak
                let currentStreak = 0;
                for (let i = data.length - 1; i >= 0; i--) {
                    if (data[i] > 0) currentStreak++;
                    else break;
                }

                setStats(prev => ({ ...prev, commitStreak: currentStreak }));
            } catch (e) {
                console.error("Failed to fetch GitHub stats", e);
            }
        };

        fetchGithubStats();
    }, []);

    React.useEffect(() => {
        if (!chartRef.current || !chartData) return;

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
                    pointBackgroundColor: '#374151',
                    pointBorderColor: '#4ade80',
                    pointBorderWidth: 2,
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
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { color: '#4ade80', stepSize: 1 }
                    },
                    x: {
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { color: '#4ade80', maxTicksLimit: 10 }
                    }
                }
            }
        });

        return () => chartInstance.current?.destroy();
    }, [chartData]);

    const StatCard = ({ icon, value, label, colorClass, bgClass }) => (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${bgClass}`}></div>
            <div className={`${colorClass} mb-3`}>
                <div className={`${icon} w-10 h-10`}></div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">{label}</div>
        </div>
    );

    return (
        <div className="space-y-10" data-name="Analytics">
            <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                <div className="icon-chart-line w-8 h-8"></div>
                GitHub Analytics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard icon="icon-star" value={stats.totalStars} label="Total Stars" colorClass="text-yellow-500" bgClass="bg-yellow-400" />
                <StatCard icon="icon-git-branch" value={stats.totalForks} label="Total Forks" colorClass="text-blue-500" bgClass="bg-blue-400" />
                <StatCard icon="icon-flame" value={`${stats.commitStreak} Days`} label="Active Streak" colorClass="text-orange-500" bgClass="bg-orange-400" />
                <StatCard icon="icon-code" value={stats.topLanguage} label="Top Language" colorClass="text-emerald-500" bgClass="bg-emerald-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card border border-gray-200 bg-gray-100 shadow-xl">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-bold text-xl text-gray-800">Contribution Activity</h3>
                        <p className="text-xs text-gray-500 font-mono">Last 30 Days</p>
                    </div>
                    <div className="relative h-72 p-4">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>

                {/* Tech stack section unchanged */}
            </div>
        </div>
    );
}
