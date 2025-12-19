document.addEventListener("DOMContentLoaded", () => {
  console.log("[Bootstrap] DOM ready");

  window.dispatchEvent(new Event("app:ready"));
  window.dispatchEvent(new Event("home:ready"));
  window.dispatchEvent(new Event("header:ready"));

  console.log("[Bootstrap] Events dispatched");
});
