const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

function go(id, push = true) {
  // Hide all sections
  sections.forEach(section => section.classList.remove('active'));

  // Show target section
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // Update active nav links
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks.forEach(link => {
    if (link.textContent.toLowerCase() === id) {
      link.classList.add('active');
    }
  });

  // Update URL hash
  if (push) {
    history.pushState(null, '', `#${id}`);
  }
}

// Handle direct URL access and browser navigation
function handleHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    go(hash, false);
  } else {
    go('home', false);
  }
}

// Initial load
window.addEventListener('load', handleHash);

// Back / forward buttons
window.addEventListener('popstate', handleHash);
