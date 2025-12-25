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
                const repoRes = await fetch(
                    'https://proxy-api.trickle-app.host/?url=https://api.github.com/users/alsopranab/repos?per_page=100'
                );

                if (repoRes.ok) {
                    const repos = await repoRes.json();

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

                {/* Real GitHub contribution data */}
                const contribRes = await fetch(
                    'https://github-contributions-api.jogruber.de/v4/alsopranab?y=last'
                );

                if (contribRes.ok) {
                    const data = await contribRes.json();
                    const last30 = data.contributions.slice(-30);

                    const dailyCommits = {};
                    last30.forEach(d => {
                        const key = new Date(d.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        });
                        dailyCommits[key] = d.count;
                    });

                    setChartData({
                        labels: Object.keys(dailyCommits),
                        data: Object.values(dailyCommits)
                    });

                    let streak = 0;
                    const values = Object.values(dailyCommits).reverse();
                    for (let v of values) {
                        if (v > 0) streak++;
                        else break;
                    }

                    setStats(prev => ({ ...prev, commitStreak: streak }));
                }
            } catch (e) {
                console.error("Failed to fetch GitHub stats", e);
                setStats({
                    totalStars: 17,
                    totalForks: 6,
                    topLanguage: "SQL",
                    commitStreak: 15
                });
                setChartData({
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [12, 19, 3, 5, 2, 3]
                });
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
        gradient.addColorStop(0, 'rgba(74, 222, 128, 0.25)');
        gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');

        chartInstance.current = new ChartJS(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.data,
                    borderColor: '#4ade80',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#374151',
                    pointBorderColor: '#4ade80'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#4ade80', stepSize: 1 },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        ticks: { color: '#4ade80', maxTicksLimit: 10 },
                        grid: { color: 'rgba(0,0,0,0.04)' }
                    }
                },
                animation: { duration: 1500, easing: 'easeOutQuart' }
            }
        });

        return () => chartInstance.current?.destroy();
    }, [chartData]);

    return (
        <div className="space-y-10" data-name="Analytics" data-file="components/Analytics.js">
            <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                <div className="icon-chart-line text-[var(--primary-color)] w-8 h-8 opacity-90"></div>
                GitHub Analytics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* StatCards unchanged */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card relative overflow-hidden group border border-gray-200 bg-gray-100 p-0 shadow-xl">
                    <div className="p-6 pb-2 flex items-center justify-between border-b border-gray-200">
                        <div>
                            <h3 className="font-bold text-xl text-gray-800">
                                Contribution Activity
                            </h3>
                            <p className="text-xs text-gray-500 font-mono">
                                GitHub Contributions (Last 30 Days)
                            </p>
                        </div>
                        <div className="p-2 bg-gray-200 rounded-lg text-green-500">
                            <div className="icon-chart-bar w-5 h-5"></div>
                        </div>
                    </div>

                    <div className="relative h-72 w-full p-4">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>

                {/* Tech Stack section unchanged */}
            </div>
        </div>
    );
}
