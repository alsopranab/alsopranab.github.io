/* =====================================================
   PROFILE MASTER DATA
   Single Source of Truth (SSOT)
   SPA-SAFE • NULL-SAFE • FUTURE-PROOF
===================================================== */

const PROFILE = {
  /* =====================
     IDENTITY
  ====================== */
  identity: {
    name: "Pranab Debnath",
    role: "Data Analyst",
    location: "Bangalore, India",
    tagline:
      "Turning raw business data into clarity, automation, and measurable outcomes."
  },

  /* =====================
     CONTACT & SOCIAL (SAFE)
  ====================== */
  contact: {
    email: "career.pranab@gmail.com",
    github: "alsopranab",
    linkedin: "pranab-dnath",

    social: {
      instagram_data: "the.queryguy",
      instagram_personal: "alsopranab",
      leetcode: "alsopranab",
      hackerrank: "alsopranab"
    }
  },

  /* =====================
     SKILLS (SCALABLE)
  ====================== */
  skills: {
    primary: [
      {
        id: "sql",
        name: "SQL",
        focus: ["Joins", "CTEs", "Window Functions", "Query Optimization"],
        proficiency: 90
      },
      {
        id: "python",
        name: "Python",
        focus: ["EDA", "Automation", "Scripting", "Data Cleaning"],
        proficiency: 80
      },
      {
        id: "excel",
        name: "Excel",
        focus: ["Dashboards", "KPI Models", "Reporting"],
        proficiency: 75
      },
      {
        id: "analytics",
        name: "Business Analytics",
        focus: ["Funnels", "Metrics", "Reporting"],
        proficiency: 85
      }
    ],

    tools: [
      "Excel",
      "Power BI",
      "Tableau",
      "GitHub"
    ]
  },

  /* =====================
     EXPERIENCE (ORDERED)
  ====================== */
  experience: [
    {
      company: "MagicBricks",
      role: "Operations Data Analyst",
      period: "2025 – Present",
      highlights: [
        "Automated reporting pipelines using SQL & Python",
        "EDA on lead quality, schedules, and funnel drop-offs",
        "Built KPI dashboards for leadership",
        "Unified CRM & dialer data models"
      ],
      metrics: {
        impact: "Improved reporting accuracy & speed"
      }
    },
    {
      company: "MagicBricks",
      role: "Account Manager",
      period: "2024 – 2025",
      highlights: [
        "Analyzed lead flow & conversion bottlenecks",
        "Exceeded site-visit targets",
        "Delivered actionable insights to management"
      ],
      metrics: {
        performance: "Consistent over-achievement"
      }
    },
    {
      company: "NoBroker",
      role: "Senior Account Manager",
      period: "2023 – 2024",
      highlights: [
        "Revenue & conversion analytics",
        "Sales call analysis",
        "~15% MoM conversion growth"
      ],
      metrics: {
        growth: "15% average monthly improvement"
      }
    }
  ],

  /* =====================
     DASHBOARD (CHART SAFE)
  ====================== */
  dashboard: {
    kpis: [
      { key: "repos", label: "GitHub Repositories", value: "12+" },
      { key: "domains", label: "Core Domains", value: "3" },
      { key: "sql", label: "SQL Problems Solved", value: "100+" },
      { key: "impact", label: "Avg Business Impact", value: "15%" }
    ],

    growthTimeline: {
      years: ["2022", "2023", "2024", "2025"],
      values: [20, 40, 70, 90]
    },

    skillDistribution: {
      labels: ["SQL", "Python", "Excel", "Automation", "Analytics"],
      values: [30, 25, 15, 15, 15]
    }
  },

  /* =====================
     CAREER FUNNEL
  ====================== */
  funnel: [
    {
      stage: "Experience",
      description: "Real-world problems",
      points: [
        "Client & site-visit analytics",
        "Revenue & conversion tracking",
        "Operational reporting"
      ]
    },
    {
      stage: "Skills",
      description: "Tools applied",
      points: [
        "SQL — joins, CTEs, windows",
        "Python — EDA & automation",
        "Excel — KPI dashboards"
      ]
    },
    {
      stage: "Proj
