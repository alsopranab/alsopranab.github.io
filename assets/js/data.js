/* =====================================================
   PROFILE MASTER DATA
   Single Source of Truth (SSOT)
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
     CONTACT & SOCIAL
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
     SKILLS (CAN SCALE)
  ====================== */
  skills: {
    primary: [
      {
        name: "SQL",
        focus: ["Joins", "CTEs", "Window Functions", "Query Optimization"],
        proficiency: 90
      },
      {
        name: "Python",
        focus: ["EDA", "Automation", "Scripting", "Data Cleaning"],
        proficiency: 80
      },
      {
        name: "Excel",
        focus: ["Dashboards", "KPI Models", "Reporting"],
        proficiency: 75
      },
      {
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
        "Automated reporting pipelines using SQL, Python, and scripts",
        "EDA on lead quality, schedule rate, and funnel drop-offs",
        "Built KPI dashboards for leadership decision-making",
        "Unified CRM and dialer data into structured models"
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
        "Analyzed lead flow and conversion bottlenecks",
        "Exceeded site-visit targets consistently",
        "Provided actionable insights to management"
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
        "Led revenue & conversion analytics",
        "Performed sales call analysis for coaching",
        "Drove ~15% MoM conversion growth"
      ],
      metrics: {
        growth: "15% average monthly improvement"
      }
    }
  ],

  /* =====================
     DASHBOARD KPIs
  ====================== */
  dashboard: {
    kpis: [
      { label: "GitHub Repositories", value: "12+" },
      { label: "Core Domains", value: "3" },
      { label: "SQL Problems Solved", value: "100+" },
      { label: "Avg Business Impact", value: "15%" }
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
      description: "Real-world problems faced in production environments",
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
      description: "Measurable business outcomes",
      points: [
        "Reduced manual reporting",
        "Improved conversion visibility",
        "Faster decision-making"
      ]
    }
  ],

  /* =====================
     LEARNINGS
  ====================== */
  learnings: [
    {
      title: "CTEs & Readable SQL",
      summary:
        "Readable SQL scales better than clever SQL in production systems."
    },
    {
      title: "Python as a Glue",
      summary:
        "Python works best when connecting systems, not over-engineering logic."
    },
    {
      title: "Automate the Boring",
      summary:
        "Automation creates more impact than micro-optimizations."
    }
  ]
};

/* =====================================================
   EXPORT SAFETY (SPA)
===================================================== */
window.PROFILE = PROFILE;
