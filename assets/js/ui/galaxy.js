/* =====================================================
   GALAXY / NEURAL BACKGROUND
   Premium • Subtle • Performance-safe
===================================================== */

(function () {
  const canvas = document.getElementById("galaxy-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width, height, dpr;
  let nodes = [];
  let animationId;

  /* -----------------------------------------------------
     CONFIG (TUNED FOR PREMIUM FEEL)
  ----------------------------------------------------- */

  const CONFIG = {
    nodeCount: 90,
    maxDistance: 140,
    speed: 0.15,

    nodeColor: getCss("--galaxy-node-color"),
    nodeSoft: getCss("--galaxy-node-soft"),
    lineColor: getCss("--galaxy-line-color"),

    nodeSize: parseFloat(getCss("--galaxy-node-size")) || 1.4,
  };

  /* -----------------------------------------------------
     UTIL
  ----------------------------------------------------- */

  function getCss(varName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* -----------------------------------------------------
     NODE CLASS
  ----------------------------------------------------- */

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, CONFIG.nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.nodeColor;
      ctx.shadowBlur = 6;
      ctx.shadowColor = CONFIG.nodeSoft;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /* -----------------------------------------------------
     INIT
  ----------------------------------------------------- */

  function init() {
    resize();
    nodes = [];

    const count =
      window.innerWidth < 768
        ? Math.floor(CONFIG.nodeCount * 0.6)
        : CONFIG.nodeCount;

    for (let i = 0; i < count; i++) {
      nodes.push(new Node());
    }

    animate();
  }

  /* -----------------------------------------------------
     DRAW CONNECTIONS
  ----------------------------------------------------- */

  function drawLines() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDistance) {
          const opacity = 1 - dist / CONFIG.maxDistance;
          ctx.strokeStyle = CONFIG.lineColor.replace(
            /[\d.]+\)$/g,
            `${opacity * 0.6})`
          );
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
  }

  /* -----------------------------------------------------
     ANIMATION LOOP
  ----------------------------------------------------- */

  function animate() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((n) => {
      n.move();
      n.draw();
    });

    drawLines();

    animationId = requestAnimationFrame(animate);
  }

  /* -----------------------------------------------------
     EVENTS
  ----------------------------------------------------- */

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationId);
    init();
  });

  /* -----------------------------------------------------
     START
  ----------------------------------------------------- */

  init();
})();
