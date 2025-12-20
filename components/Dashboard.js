function Dashboard() {
    const chartRef1 = React.useRef(null);
    const chartRef2 = React.useRef(null);
    const [chartInstance1, setChartInstance1] = React.useState(null);
    const [chartInstance2, setChartInstance2] = React.useState(null);

    React.useEffect(() => {
        // Initialize Charts
        if (chartRef1.current) {
            const ctx1 = chartRef1.current.getContext('2d');
            if (chartInstance1) chartInstance1.destroy();
            
            const newChart1 = new window.ChartJS(ctx1, {
                type: 'doughnut',
                data: {
                    labels: ['Python', 'SQL', 'Excel', 'BI Tools'],
                    datasets: [{
                        data: [20, 30, 40, 10],
                        backgroundColor: ['#06b6d4', '#8b5cf6', '#3b82f6', '#cbd5e1'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8' } }
                    }
                }
            });
            setChartInstance1(newChart1);
        }

        if (chartRef2.current) {
            const ctx2 = chartRef2.current.getContext('2d');
            if (chartInstance2) chartInstance2.destroy();

            const newChart2 = new window.ChartJS(ctx2, {
                type: 'bar',
                data: {
                    labels: ['Sales Ops', 'Funnel Analysis', 'KPI Reports', 'RCA'],
                    datasets: [{
                        label: 'Projects Completed',
                        data: [15, 22, 29, 38],
                        backgroundColor: '#06b6d4',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { 
                            beginAtZero: true, 
                            grid: { color: '#334155' },
                            ticks: { color: '#94a3b8' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#94a3b8' }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
            setChartInstance2(newChart2);
        }

        return () => {
            if (chartInstance1) chartInstance1.destroy();
            if (chartInstance2) chartInstance2.destroy();
        };
    }, []);

    return (
        <section id="analytics" className="section-padding" data-name="dashboard" data-file="components/Dashboard.js">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="text-[var(--primary)]">04.</span> Professional Analytics
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Metric Cards */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card border-l-4 border-l-[var(--primary)]">
                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Total Experience</div>
                        <div className="text-3xl font-bold text-white">
  {(((new Date() - new Date("2023-12-08")) / (1000 * 60 * 60 * 24 * 365.25))).toFixed(1)}+ Years
</div>

                    </div>
                    <div className="card border-l-4 border-l-[var(--accent)]">
                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Automated Workflows</div>
                        <div className="text-3xl font-bold text-white">100+ TB</div>
                    </div>
                    <div className="card border-l-4 border-l-blue-500">
                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Dashboards Built</div>
                        <div className="text-3xl font-bold text-white">50+</div>
                    </div>
                </div>

                {/* Charts */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                    <div className="card min-h-[300px] flex flex-col">
                        <h3 className="text-lg font-semibold mb-4 text-center">Skill Distribution</h3>
                        <div className="flex-grow relative">
                             <canvas ref={chartRef1}></canvas>
                        </div>
                    </div>
                    <div className="card min-h-[300px] flex flex-col">
                        <h3 className="text-lg font-semibold mb-4 text-center">Analysis Lifecycle</h3>
                        <div className="flex-grow relative">
                             <canvas ref={chartRef2}></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg text-center text-sm text-blue-200">
                <div className="inline-block icon-info mr-2 align-middle"></div>
                This section demonstrates my ability to embed interactive visualizations directly into web applications.
            </div>
        </section>
    );
}
