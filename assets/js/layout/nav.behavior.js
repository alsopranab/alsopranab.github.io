let lastScroll = 0;
const header = document.getElementById("site-header");

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if (current > lastScroll && current > 120) {
    header.style.transform = "translateY(-120%)";
    header.style.opacity = "0";
  } else {
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";
  }

  lastScroll = current;
});
