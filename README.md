```
alsopranab.github.io/
├── index.html                 ← SPA entry (Intro + Dashboard routing)
│
├── assets/
│   ├── css/
│   │   ├── reset.css          ← CSS reset (clean slate)
│   │   ├── variables.css      ← colors, fonts, spacing, z-index
│   │   ├── base.css           ← typography, body rules
│   │   ├── layout.css         ← grids, sections, containers
│   │   ├── components.css    ← cards, badges, buttons
│   │   ├── navbar.css        ← navbar + name/designation
│   │   ├── animations.css    ← scroll reveal, glow, transitions
│   │   ├── dashboard.css     ← dashboard-specific styles
│   │   ├── projects.css      ← projects + code viewer
│   │   ├── learnings.css     ← learnings knowledge base
│   │   └── code.css          ← code viewer (monospace, highlight)
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── router.js      ← SPA router (Intro → Dashboard → pages)
│   │   │   ├── store.js       ← global state + caching
│   │   │   └── config.js      ← usernames, constants
│   │   │
│   │   ├── services/
│   │   │   ├── github.js      ← repos, stats, project types
│   │   │   ├── githubCode.js  ← full code fetching & rendering
│   │   │   ├── leetcode.js    ← live LeetCode stats (GraphQL)
│   │   │   ├── hackerrank.js  ← live HackerRank stats (proxy-ready)
│   │   │   └── contributions.js ← GitHub contribution heatmap
│   │   │
│   │   ├── ui/
│   │   │   ├── navbar.js      ← animated navbar
│   │   │   ├── reveal.js      ← scroll-based reveal system
│   │   │   ├── glow.js        ← icon glow + pulse
│   │   │   ├── cards.js       ← stat cards
│   │   │   ├── charts.js      ← Chart.js dashboards
│   │   │   └── codeViewer.js  ← VSCode-like viewer
│   │   │
│   │   └── views/
│   │       ├── intro.js       ← cinematic intro (first load only)
│   │       ├── dashboard.js   ← flagship live dashboard
│   │       ├── projects.js    ← auto-updated projects list
│   │       ├── project.js     ← single project + full code
│   │       ├── learnings.js   ← SQL / Python / Excel / DAX / Stats
│   │       ├── analytics.js   ← trends, charts, growth
│   │       └── profiles.js    ← GitHub, LeetCode, HR, LinkedIn
│   │
│   ├── data/
│   │   ├── knowledge/         ← your OWN GeeksForGeeks
│   │   │   ├── sql.json
│   │   │   ├── python.json
│   │   │   ├── excel.json
│   │   │   ├── dax.json
│   │   │   ├── statistics.json
│   │   │   └── ab_testing.json
│   │   │
│   │   └── project_media.json ← optional images mapping (later)
│   │
│   ├── fonts/
│   │   ├── display/           ← hero fonts (creative)
│   │   ├── heading/           ← section headings
│   │   └── body/              ← readable analytics text
│   │
│   └── images/
│       ├── icons/             ← glowing tech icons
│       └── projects/          ← project screenshots (optional)
│
└── resume/
    └── Pranab_Debnath_Resume.pdf
