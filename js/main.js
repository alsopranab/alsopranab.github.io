const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
  if (window.location.href.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});
