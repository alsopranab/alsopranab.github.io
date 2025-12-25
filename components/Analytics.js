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
          "https://api.github.com/users/alsopranab/repos?per_page=100"
        );

        if (!repoRes.ok) throw new Error("Repo fetch failed");

        const repos = await repoRes.json();

        // ----- STATS -----
        const stars = repos.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0
        );
        const forks = repos.reduce(
          (acc, repo) => acc + repo.forks_count,
          0
        );

        const languages = {};
        repos.forEach(repo => {
          if (repo.language) {
            languages[repo.language] =
              (languages[repo.language] || 0) + 1;
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

        // ----- COMMITS (LAST 30 DAYS) -----
        const dailyCommits = {};

        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          dailyCommits[d.toISOString().split("T")[0]] = 0;
        }

        for (const repo of repos) {
          let commitsRes;
          try {
            commitsRes = await fetch(
              `https://api.github.com/repos/alsopranab/${repo.name}/commits?per_page=100`
            );
          } catch {
            continue;
          }

          if (!commitsRes.ok) continue;

          let commits = [];
          try {
            commits = await commitsRes.json();
          } catch {
            continue;
          }

          commits.forEach(c => {
            const date = c?.commit?.author?.date?.split("T")[0];
            if (dailyCommits[date] !== undefined) {
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

        // ----- STREAK -----
        let streak = 0;
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i] > 0) streak++;
          else break;
        }

        setStats(prev => ({ ...prev, commitStreak: streak }));
      } catch (e) {
        console.error("Failed to fetch GitHub stats", e);
      }
    };

    fetchGithubStats();
  }, []);

  // ----- CHART INIT -----
  React.useEffect(() => {
    if (!chartRef.current || !chartData) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const ChartJS = window.ChartJS;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(74,222,128,0.2)");
    gradient.addColorStop(1, "rgba(74,222,128,0)");

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: gradient,
            borderColor: "#4ade80",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="space-y-10">
      {/* UI UNCHANGED */}
      <canvas ref={chartRef} />
    </div>
  );
}
