✅ CORE IDEA (READ THIS FIRST)

You are building:

A Vanilla JavaScript SPA (Single Page Application)
hosted on GitHub Pages, using hash-based routing
with one HTML file and multiple JS “views”

There is NO framework (React, Vue, etc.)
Everything is:

predictable

debuggable

copy-paste safe

📁 FINAL PROJECT STRUCTURE (THIS IS THE SOURCE OF TRUTH)
alsopranab.github.io/
│
├── index.html                ← ONLY HTML FILE (SPA entry)
│
├── assets/
│   ├── css/
│   │   └── style.css         ← All styling (themes, animations)
│   │
│   └── js/
│       ├── data.js           ← Static data (profile, skills, links)
│       ├── spa.js            ← Router (MOST IMPORTANT FILE)
│       ├── motion.js         ← Animations & interactions
│       ├── charts.js         ← Chart.js rendering
│       │
│       └── views/            ← EACH PAGE = ONE FILE
│           ├── home.js
│           ├── dashboard.js
│           ├── funnels.js
│           ├── projects.js
│           ├── project.js
│           ├── learnings.js
│           └── contacts.js
│
└── resume/
    └── Pranab_Debnath_Resume.pdf


If this structure exists → everything can be rebuilt safely.

🧠 HOW EACH PART WORKS (MENTAL MODEL)
1️⃣ index.html — NEVER changes logic

Purpose

Loads CSS

Loads JS in correct order

Contains <main id="app"></main>

Rule

No content here

No logic here

Never delete #app

If something is blank → it’s NOT index.html

2️⃣ spa.js — THE BRAIN (Router)

Purpose

Reads URL hash (#/projects)

Decides which function to run

Injects content into #app

Mental model

URL changes → spa.js → renderX() → HTML injected


Golden rules

spa.js is loaded LAST

It NEVER contains HTML

It NEVER contains CSS

It NEVER imports anything

If SPA breaks → this is the first file to check

3️⃣ views/*.js — ONE PAGE = ONE FILE

Each file:

function renderX() {
  document.getElementById("app").innerHTML = `...`;
}

Examples
File	URL	Function
home.js	#/	renderHome()
dashboard.js	#/dashboard	renderDashboard()
funnels.js	#/funnels	renderFunnels()
projects.js	#/projects	renderProjects()
project.js	#/project?repo=name	renderProject(query)
learnings.js	#/learnings	renderLearnings()
contacts.js	#/contacts	renderContacts()

Rules

NO export

NO import

Functions must be global

Each file is isolated

If one page breaks → only that file is wrong.

4️⃣ data.js — CONTENT, NOT UI

Purpose

Central source of truth

Profile data

Skills

Links

Experience

Example:

const PROFILE = {
  name: "Pranab Debnath",
  role: "Data Analyst",
  email: "career.pranab@gmail.com",
  github: "alsopranab"
};


Why this matters:

You change data once

UI updates everywhere

Easy SEO, resume sync, embeds

5️⃣ motion.js — OPTIONAL BUT POWERFUL

Purpose

Smooth scroll

Card press feedback

Button locking

Page transitions

Called after every render:

runMotionEnhancements();


This keeps animations decoupled from views.

6️⃣ charts.js — VISUALS ONLY

Purpose

Chart.js rendering

Only runs if canvas exists

Rule:

if (document.getElementById("skillChart")) {
  renderCharts();
}


Never assume DOM exists.

7️⃣ style.css — GLOBAL DESIGN SYSTEM

Contains:

Theme variables

Light/Dark toggle support

Layout

Animations

Responsive rules

Rule

JS never styles things directly

CSS owns appearance

JS only toggles classes

🔁 HOW TO RESUME WORK IN A NEW CHAT (IMPORTANT)

If later you paste any one of these, I can instantly continue:

Option A (Best)

Paste the folder structure exactly as above

Option B

Paste spa.js + one broken renderX() file

Option C

Say:

“Vanilla JS SPA, hash router, views in /assets/js/views, one index.html”

That alone is enough context.

🧩 WHY THIS STRUCTURE IS BULLETPROOF

No framework lock-in

GitHub Pages compatible

SEO friendly

Easy debugging

No silent failures

Easy future upgrades:

Light/Dark toggle

Instagram embed

Resume viewer

LeetCode stats

SEO meta injection

NEXT (WHEN YOU COME BACK)

When you’re ready, we’ll improve one page at a time:

Home (background + gradient + motion)

Funnel (landscape path + animation)

Projects (code viewer fix + spacing)

Contacts (email form + embeds)

Theme system (light/dark)

SEO pass
