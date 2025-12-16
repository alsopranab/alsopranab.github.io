export function animateCount(el, to, duration = 800) {
  let start = 0;
  const step = Math.ceil(to / (duration / 16));

  const interval = setInterval(() => {
    start += step;
    if (start >= to) {
      el.textContent = to;
      clearInterval(interval);
    } else {
      el.textContent = start;
    }
  }, 16);
}
