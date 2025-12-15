function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(
    "section, .card, .chart-card, .project-card, .repo-card"
  ).forEach(el => observer.observe(el));
}

// expose globally (NON-module safe)
window.initScrollReveal = initScrollReveal;
