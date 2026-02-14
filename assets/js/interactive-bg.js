/**
 * Interactive immersive background — cursor-reactive orbs + ribbons + grid
 * Warm gold sci-fi theme, mesmerizing and immersive
 */

(function() {
  const canvas = document.getElementById('interactive-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetMouseX = 0.5;
  let targetMouseY = 0.5;
  let cursorActive = false;
  let cursorFade = 0;

  const GOLD = [218, 185, 130];
  const BRONZE = [205, 164, 105];
  const SEPIA = [184, 134, 84];

  // Cursor-reactive orbs — flow toward mouse, immersive
  const orbs = [
    { x: 0.2, y: 0.25, vx: 0.0002, vy: 0.00015, radius: 0.32, color: GOLD, phase: 0, pull: 0.0018 },
    { x: 0.75, y: 0.35, vx: -0.00018, vy: 0.0002, radius: 0.28, color: BRONZE, phase: Math.PI / 2, pull: 0.0014 },
    { x: 0.5, y: 0.65, vx: 0.00015, vy: -0.00018, radius: 0.35, color: SEPIA, phase: Math.PI, pull: 0.002 },
    { x: 0.35, y: 0.7, vx: -0.0002, vy: -0.00015, radius: 0.25, color: GOLD, phase: Math.PI * 1.5, pull: 0.0012 },
    { x: 0.68, y: 0.5, vx: 0.00012, vy: 0.00012, radius: 0.28, color: BRONZE, phase: Math.PI / 4, pull: 0.0015 }
  ];

  const ribbons = [
    { y: 0.22, amplitude: 0.03, frequency: 1.1, phase: 0, speed: 0.012, color: GOLD },
    { y: 0.48, amplitude: 0.025, frequency: 0.9, phase: Math.PI * 0.5, speed: -0.01, color: BRONZE },
    { y: 0.72, amplitude: 0.02, frequency: 1.3, phase: Math.PI, speed: 0.011, color: SEPIA },
    { y: 0.38, amplitude: 0.018, frequency: 1, phase: Math.PI * 0.3, speed: -0.008, color: GOLD },
    { y: 0.88, amplitude: 0.022, frequency: 0.8, phase: Math.PI * 1.2, speed: 0.007, color: BRONZE }
  ];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function lerp(a, b, t) {
    return a + (b - a) * Math.min(t, 1);
  }

  function onMouseMove(e) {
    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = e.clientY / window.innerHeight;
    cursorActive = true;
    const dot = document.querySelector('[data-cursor-dot]');
    const outline = document.querySelector('[data-cursor-outline]');
    if (dot && outline) {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      outline.style.left = e.clientX + 'px';
      outline.style.top = e.clientY + 'px';
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', () => { cursorActive = false; });
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length) {
      const t = e.touches[0];
      targetMouseX = t.clientX / window.innerWidth;
      targetMouseY = t.clientY / window.innerHeight;
      cursorActive = true;
      const dot = document.querySelector('[data-cursor-dot]');
      const outline = document.querySelector('[data-cursor-outline]');
      if (dot && outline) {
        dot.style.left = t.clientX + 'px';
        dot.style.top = t.clientY + 'px';
        outline.style.left = t.clientX + 'px';
        outline.style.top = t.clientY + 'px';
      }
    }
  }, { passive: true });
  document.addEventListener('touchend', () => { cursorActive = false; });

  function drawOrb(x, y, radius, color, alpha) {
    const w = canvas.width;
    const h = canvas.height;
    const px = x * w;
    const py = y * h;
    const r = Math.max(w, h) * radius;
    const [r1, g1, b1] = color;
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
    gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${alpha * 0.4})`);
    gradient.addColorStop(0.4, `rgba(${r1}, ${g1}, ${b1}, ${alpha * 0.15})`);
    gradient.addColorStop(0.7, `rgba(${r1}, ${g1}, ${b1}, ${alpha * 0.04})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function drawGrid(w, h, t, mx, my) {
    const spacing = 72;
    const parallax = 12;
    const offsetX = (t * 2 + mx * parallax) % spacing;
    const offsetY = (t * 1.2 + my * parallax) % spacing;
    const [r, g, b] = GOLD;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.05)`;
    ctx.lineWidth = 0.5;

    for (let x = -offsetX; x < w + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = -offsetY; y < h + spacing; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function drawRibbon(ribbon, w, h, t, mx, my) {
    const [r, g, b] = ribbon.color;
    const baseY = ribbon.y * h;
    const phase = t * ribbon.speed + ribbon.phase;
    const points = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const nx = i / steps;
      const x = nx * (w + 200) - 100;
      const wave = Math.sin(nx * Math.PI * ribbon.frequency + phase) * ribbon.amplitude * h;
      const drift = Math.sin(phase * 0.5) * 10;
      const nearX = Math.max(0, 1 - Math.abs(nx - mx) * 2.5);
      const nearY = Math.max(0, 1 - Math.abs(ribbon.y - my) * 4);
      const cursorBend = 15 * nearX * nearY * cursorFade;
      points.push([x, baseY + wave + drift + cursorBend]);
    }

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);

    const alpha = 0.07 + 0.02 * Math.sin(t * 0.18 + ribbon.phase);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  function drawCursorGlow() {
    if (cursorFade < 0.02) return;
    const w = canvas.width;
    const h = canvas.height;
    const px = mouseX * w;
    const py = mouseY * h;
    const r = Math.min(w, h) * 0.25;
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
    gradient.addColorStop(0, `rgba(218, 185, 130, ${cursorFade * 0.06})`);
    gradient.addColorStop(0.4, `rgba(205, 164, 105, ${cursorFade * 0.03})`);
    gradient.addColorStop(0.7, `rgba(184, 134, 84, ${cursorFade * 0.01})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function animate(time) {
    const w = canvas.width;
    const h = canvas.height;
    const t = (time || 0) * 0.001;

    mouseX = lerp(mouseX, targetMouseX, 0.04);
    mouseY = lerp(mouseY, targetMouseY, 0.04);
    cursorFade = lerp(cursorFade, cursorActive ? 1 : 0, 0.05);

    ctx.clearRect(0, 0, w, h);

    orbs.forEach((orb) => {
      const driftX = Math.sin(t * 0.35 + orb.phase) * 0.018;
      const driftY = Math.cos(t * 0.28 + orb.phase * 1.2) * 0.015;

      orb.x += orb.vx + driftX;
      orb.y += orb.vy + driftY * 0.5;

      const dx = mouseX - orb.x;
      const dy = mouseY - orb.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const pull = Math.min(dist * orb.pull * (cursorActive ? 1.5 : 0.4), 0.022);
      orb.x += (dx / dist) * pull;
      orb.y += (dy / dist) * pull;

      if (orb.x < -0.15) orb.x = 1.15;
      if (orb.x > 1.15) orb.x = -0.15;
      if (orb.y < -0.15) orb.y = 1.15;
      if (orb.y > 1.15) orb.y = -0.15;

      const pulse = 0.5 + 0.12 * Math.sin(t * 0.4 + orb.phase * 2);
      drawOrb(orb.x, orb.y, orb.radius, orb.color, Math.min(0.75, pulse));
    });

    drawGrid(w, h, t, mouseX - 0.5, mouseY - 0.5);
    ribbons.forEach((ribbon) => drawRibbon(ribbon, w, h, t, mouseX, mouseY));

    if (cursorFade > 0.02) drawCursorGlow();

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(animate);
})();
