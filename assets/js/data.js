/* =========================
   PROFILE MASTER DATA
   Single source of truth
========================= */

const PROFILE = {
  /* ---------- IDENTITY ---------- */
  name: "Pranab Debnath",
  role: "Data Analyst",
  location: "Bangalore, India",
  tagline:
    "Turning raw business data into clarity, automation, and measurable outcomes.",

  /* ---------- CONTACT ---------- */
  email: "career.pranab@gmail.com",
  github: "alsopranab",
  linkedin: "pranab-dnath",

  social: {
    instagram_data: "the.queryguy",
    instagram_personal: "alsopranab",
    leetcode: "alsopranab",
    hackerrank: "alsopranab"
  },

  /* ---------- CORE SKILLS ---------- */
  skills: {
    sql: [
      "Joins",
      "CTEs",
      "Window Functions",
      "Query Optimization"
    ],
    python: [
      "EDA",
      "Automation",
      "Scripting",
      "Data Cleaning"
    ],
    analytics: [
      "Funnels",
      "KPIs",
      "Reporting",
      "Business Metrics"
    ],
    tools: [
      "Excel",
      "Power BI",
      "Tableau",
      "GitHub"
    ]
  },

  /* ---------- EXPERIENCE ---------- */
  experience: [
    {
      company: "MagicBricks",
      role: "Account Manager",
      period: "2024 – Present",
      impact: [
        "Client & site-visit funnel analytics",
        "Daily operational dashboards",
        "Automation using Excel & scripts"
      ],
      metrics: {
        focus: "Funnel & operational analytics"
      }
    },
    {
      company: "NoBroker",
      role: "Senior Account Manager",
      period: "2023 – 2024",
      impact: [
        "Revenue & conversion analytics",
        "Sales call analysis",
        "Team-level performance tracking"
      ],
      metrics: {
        growth: "15% avg monthly improvement"
      }
    }
  ],

  /* ---------- DASHBOARD METRICS ---------- */
  dashboard: {
    repositories: 12,
    coreDomains: 3,
    sqlProblemsSolved: 100,
    avgImpact: "15%"
  },

  /* ---------- CAREER FUNNEL ---------- */
  funnel: [
    {
      stage: "Experience",
      description: "Real-world business problems",
      points: [
        "Client & site-visit analytics",
        "Revenue & conversion tracking",
        "Operational reporting"
      ]
    },
    {
      stage: "Skills",
      description: "Tools used to solve those problems",
      points: [
        "SQL — joins, CTEs, window functions",
        "Python — EDA & automation",
        "Excel — dashboards & KPI models"
      ]
    },
    {
      stage: "Projects",
      description: "Hands-on implementations",
      points: [
        "SQL practice systems",
        "Automation scripts",
        "Analytics dashboards"
      ]
    },
    {
      stage: "Impact",
      description: "Measurable outcomes",
      points: [
        "Faster reporting",
        "Reduced manual work",
        "Improved conversions"
      ]
    }
  ],

  /* ---------- LEARNINGS ---------- */
  learnings: [
    {
      title: "SQL Joins & CTEs",
      summary:
        "How complex joins and CTEs simplify business logic in real analytics systems."
    },
    {
      title: "Python for Analysis",
      summary:
        "Why Python works best as a glue language, not a hammer."
    },
    {
      title: "Analytics Automation",
      summary:
        "Reducing manual reporting creates real business impact."
    }
  ]
};
