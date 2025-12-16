export function isMobile() {
  return window.innerWidth < 768;
}

export function onResize(callback) {
  window.addEventListener("resize", () => {
    callback(isMobile());
  });
}
