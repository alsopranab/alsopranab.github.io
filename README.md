```
alsopranab.github.io/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── core/
│   │   │   └── bootstrap.js
│   │   │
│   │   ├── services/
│   │   │   └── data.service.js
│   │   │
│   │   ├── layout/
│   │   │   ├── header.js
│   │   │   └── footer.js
│   │   │
│   │   ├── pages/
│   │   │   └── home.js
│   │   │
│   │   ├── renderers/
│   │   │   └── app.renderer.js
│   │   │
│   │   ├── interactions/
│   │   │   └── ui.motion.js
│   │   │
│   │   └── omniverse.godmode.js
│   │
│   └── data/
│       ├── profile.json
│       ├── experience.json
│       ├── projects.json
│       ├── featured.json
│       ├── education.json
│       ├── licenses.json
│       ├── contact.json
│       └── socials.json
│
├── favicon.ico   (optional)
└── .gitignore
```
# Project Structure & Responsibilities

## index.html
- **Static shell only** — minimal structure, no hardcoded content.  
- **Sections injected via JS** dynamically once the app initializes.  
- **Header/Footer** also injected (not pre-rendered).  

---

## assets/css/style.css
> **Single Source of Truth**  
Controls all **spacing**, **typography**, **layout**, and **animations**.

- Header = **NAV ONLY**.  
- All links use **UPPERCASE** text.  
- **Empty sections auto-collapse** visually (handled by pure CSS).  

---

## assets/js/core/bootstrap.js
- Manages **app lifecycle** initialization.  
- Emits `app:ready` event when core setup completes.  

---

## assets/js/services/data.service.js
- Handles **safe JSON loading** of content from `/assets/data/*.json`.  
- No direct DOM manipulation or rendering.  
- Provides clean data objects for other modules.  

---

## assets/js/layout/header.js
- **Renders navigation only**.  
- No name, title, or role injected here.  
- Does not alter layout structure beyond its own container.  

---

## assets/js/layout/footer.js
- Handles **social links** and **copyright**.  
- Ensures **no duplication** and **no overflow** in layout.  

---

## assets/js/pages/home.js
- **Fetches data** via `data.service.js`.  
- Triggers `home:ready` event when data prep completes.  

---

## assets/js/renderers/app.renderer.js
- Injects dynamic page sections using **canonical IDs** only:
  - Hero  
  - Experience  
  - Projects  
  - Featured  
  - Education  
  - Contact  

---

## assets/js/interactions/ui.motion.js
- Handles:
  - Header hide/show behavior.  
  - Section reveal animations.  
- Uses **GPU-only transformations** — no layout shifts.  

---

## assets/js/omniverse.godmode.js
- **Ambient canvas** for background visuals.  
- **Particle motion** and **cursor orb** (desktop only).  
- Includes **safe FPS governor** for performance control.  
- **Zero DOM mutation** — renders purely on canvas context.  

---

## assets/data/*.json
- Contains **pure content only**.  
- No formatting or layout logic.  
- Driven by a **JSON schema** for consistency.  
