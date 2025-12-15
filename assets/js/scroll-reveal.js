const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("reveal");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(
  "section, .card, .chart-card, .project-card, .repo-card"
).forEach(el => observer.observe(el));
