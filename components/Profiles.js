function Profiles() {
    const profiles = [
        {
            name: "HackerRank",
            url: "https://www.hackerrank.com/profile/alsopranab",
            stat: "HackerRank Global Rank #1",
            subtext: "in SQL (Dec 3)",
            icon: "code",
            color: "text-green-400",
            bg: "bg-green-400/10",
            border: "border-green-400/20"
        },
        {
            name: "LeetCode",
            url: "https://leetcode.com/u/alsopranab/",
            stat: "Top SQL 50",
            subtext: "Badge Earned",
            icon: "terminal",
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            border: "border-yellow-400/20"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/alsopranab/",
            stat: "Professional",
            subtext: "Network",
            icon: "linkedin",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            name: "GitHub",
            url: "https://github.com/alsopranab",
            stat: "Open Source",
            subtext: "Contributor",
            icon: "github",
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20"
        }
    ];

    return (
        <section className="py-10 px-4 max-w-7xl mx-auto" data-name="profiles" data-file="components/Profiles.js">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profiles.map((profile, idx) => (
                    <a 
                        key={idx} 
                        href={profile.url} 
                        target="_blank"
                        className={`group block p-4 rounded-xl border ${profile.border} ${profile.bg} hover:bg-opacity-20 transition-all duration-300 hover:-translate-y-1`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className={`icon-${profile.icon} ${profile.color} text-xl`}></div>
                            <div className="icon-external-link text-xs text-slate-500 group-hover:text-white transition-colors"></div>
                        </div>
                        <div className={`font-bold text-lg ${profile.color}`}>{profile.stat}</div>
                        <div className="text-xs text-slate-400">{profile.subtext}</div>
                        <div className="text-xs text-slate-500 mt-2 font-medium opacity-60 uppercase tracking-wider">{profile.name}</div>
                    </a>
                ))}
            </div>
        </section>
    );
}
