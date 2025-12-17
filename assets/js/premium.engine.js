/**
 * ============================================================
 * PREMIUM INTERACTION ENGINE
 * ============================================================
 * Author: You (Architected properly)
 * Purpose: Apple-level motion & interaction
 * No libraries. No gimmicks. No compromise.
 * ============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     ENVIRONMENT
  ============================================================ */
  const ENV = {
    hasPointer: window.matchMedia("(pointer: fine)").matches,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    dpr: Math.min(window.devicePixelRatio || 1, 2)
  };

  if (ENV.reduceMotion) return;

  /* ============================================================
     RAF ENGINE
  ============================================================ */
  let rafId = null;
  const rafTasks = new Set();

  function rafLoop(time) {
    rafTasks.forEach(fn => fn(time));
    rafId = requestAnimationFrame(rafLoop);
  }

  function startRAF() {
    if (!rafId) rafId = requestAnimationFrame(rafLoop);
  }

  function stopRAF() {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopRAF() : startRAF();
  });

  startRAF();

  /* ============================================================
     CURSOR SYSTEM (MAGNETIC + GLOW)
  ============================================================ */
  if (ENV.hasPointer) {
    const cursor = document.createElement("div");
    cursor.className = "cursor-glow";
    document.body.appendChild(cursor);

    Object.assign(cursor.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 9999,
      background:
        "radial-gradient(circle, rgba(167,139,250,0.8), rgba(167,139,250,0.15), transparent)",
      transform: "translate(-50%, -50%)",
      transition: "opacity 0.3s ease"
    });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { ...mouse };
    let velocity = { x: 0, y: 0 };

    document.addEventListener("mousemove", e => {
      velocity.x = e.clientX - mouse.x;
      velocity.y = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    rafTasks.add(() => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;

      const speed = Math.min(
        Math.hypot(velocity.x, velocity.y) * 0.15,
        18
      );

      cursor.style.transform =
        `translate(${pos.x}px, ${pos.y}px) scale(${1 + speed / 20})`;
    });

    /* Magnetic elements */
    document.querySelectorAll("a, button, .project-card, .featured-item")
      .forEach(el => {
        el.addEventListener("mouseenter", () => {
          cursor.style.opacity = "0.6";
        });
        el.addEventListener("mouseleave", () => {
          cursor.style.opacity = "1";
        });
      });
  }

  /* ============================================================
     SCROLL REVEAL (SMOOTH)
  ============================================================ */
  const revealItems = document.querySelectorAll(
    "section, .project-card, .featured-item, .education-item"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition =
          "transform 1s cubic-bezier(0.22,1,0.36,1), opacity 1s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    observer.observe(el);
  });

  /* ============================================================
     3D TILT (CARDS)
  ============================================================ */
  if (ENV.hasPointer) {
    document.querySelectorAll(".project-card, .featured-item")
      .forEach(card => {
        let bounds;

        card.addEventListener("mouseenter", () => {
          bounds = card.getBoundingClientRect();
        });

        card.addEventListener("mousemove", e => {
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;
          const rx = ((y / bounds.height) - 0.5) * -8;
          const ry = ((x / bounds.width) - 0.5) * 8;

          card.style.transform =
            `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
  }

  /* ============================================================
     LOGO FLOAT (SUBTLE)
  ============================================================ */
  document.querySelectorAll("img")
    .forEach((img, i) => {
      const base = Math.random() * 2 + 1;
      rafTasks.add(t => {
        img.style.transform =
          `translateY(${Math.sin(t / 2000 + i) * base}px)`;
      });
    });

  /* ============================================================
     NAV LINK HIGHLIGHT (FOCUS)
  ============================================================ */
  document.querySelectorAll(".header-nav a")
    .forEach(link => {
      link.addEventListener("mouseenter", () => {
        link.style.textShadow =
          "0 0 12px rgba(167,139,250,0.8)";
      });
      link.addEventListener("mouseleave", () => {
        link.style.textShadow = "";
      });
    });

})();
