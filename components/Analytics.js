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
            const username = "alsopranab";

            try {
                // 1. Fetch repos
                const repoRes = await fetch(
                    `https://api.github.com/users/${username}/repos?per_page=100`
                );

                if (!repoRes.ok) throw new Error("Repo fetch failed");

                const repos = await repoRes.json();

                const stars = repos.reduce(
                    (acc, r) => acc + (r.stargazers_count || 0),
                    0
                );
                const forks = repos.reduce(
                    (acc, r) => acc + (r.forks_count || 0),
                    0
                );

                const languages = {};
                repos.forEach(r => {
                    if (r.language) {
                        languages[r.language] =
                            (languages[r.language] || 0) + 1;
                    }
                });

                const topLang = Object.entries(languages).sort(
                    (a, b) => b[1] - a[1]
                )[0];

                setStats(prev => ({
                    ...prev,
                    totalStars: stars,
                    totalForks: forks,
                    topLanguage: topLang ? topLang[0] : "SQL",
                }));

                // 2. Commit trend (repo-by-repo)
                const dailyCommits = {};

                for (let i = 29; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    dailyCommits[d.toISOString().split("T")[0]] = 0;
                }

                for (const repo of repos) {
                    const commitsRes = await fetch(
                        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`
                    );

                    if (!commitsRes.ok) continue;

                    let commits = [];
                    try {
                        commits = await commitsRes.json();
                    } catch {
                        continue;
                    }

                    commits.forEach(c => {
                        const date =
                            c?.commit?.author?.date?.split("T")[0];
                        if (date && dailyCommits[date] !== undefined) {
                            dailyCommits[date]++;
                        }
                    });
                }

                const labels = [];
                const data = [];

                Object.keys(dailyCommits).forEach(d => {
                    labels.push(
                        new Date(d).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                    );
                    data.push(dailyCommits[d]);
                });

                setChartData({ labels, data });

                let streak = 0;
                for (let i = data.length - 1; i >= 0; i--) {
                    if (data[i] > 0) streak++;
                    else break;
                }

                setStats(prev => ({ ...prev, commitStreak: streak }));
            } catch (e) {
                console.error("GitHub API failed", e);
                setStats({
                    totalStars: 17,
                    totalForks: 6,
                    topLanguage: "SQL",
                    commitStreak: 15,
                });
                setChartData({
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    data: [12, 19, 3, 5, 2, 3],
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

            const ctx = chartRef.current.getContext("2d");
            const ChartJS = window.ChartJS;
            if (!ChartJS) return;

            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(74, 222, 128, 0.15)");
            gradient.addColorStop(1, "rgba(74, 222, 128, 0)");

            chartInstance.current = new ChartJS(ctx, {
                type: "line",
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Contributions",
                            data: chartData.data,
                            backgroundColor: gradient,
                            borderColor: "#22c55e",
                            borderWidth: 2,
                            pointBackgroundColor: "#ffffff",
                            pointBorderColor: "#22c55e",
                            pointBorderWidth: 2,
                            pointHoverBackgroundColor: "#22c55e",
                            pointHoverBorderColor: "#ffffff",
                            fill: true,
                            tension: 0.4,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        y: { beginAtZero: true },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    const StatCard = ({ icon, value, label, colorClass, bgClass }) => (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${bgClass}`}></div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard value={stats.totalStars} label="Total Stars" />
                <StatCard value={stats.totalForks} label="Total Forks" />
                <StatCard value={`${stats.commitStreak} Days`} label="Active Streak" />
                <StatCard value={stats.topLanguage} label="Top Language" />
            </div>

            <div className="relative h-72 w-full">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}
