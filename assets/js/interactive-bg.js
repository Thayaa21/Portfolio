/**
 * Interactive Elegant Background
 * Warm, subtle flowing forms — refined and immersive, not flashy
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

  // Warm, muted tones: gold, bronze, sepia — soft internal luminescence
  const blobs = [
    { x: 0.2, y: 0.25, vx: 0.00015, vy: 0.0001, radius: 0.38, color: [218, 185, 130], phase: 0, influence: 0.0003 },
    { x: 0.75, y: 0.35, vx: -0.00012, vy: 0.00015, radius: 0.32, color: [205, 164, 105], phase: Math.PI / 2, influence: 0.00025 },
    { x: 0.5, y: 0.65, vx: 0.0001, vy: -0.00012, radius: 0.4, color: [210, 180, 140], phase: Math.PI, influence: 0.00035 },
    { x: 0.35, y: 0.7, vx: -0.00018, vy: -0.0001, radius: 0.28, color: [184, 134, 84], phase: Math.PI * 1.5, influence: 0.0002 },
    { x: 0.68, y: 0.55, vx: 0.00008, vy: 0.00008, radius: 0.32, color: [218, 185, 130], phase: Math.PI / 4, influence: 0.00028 }
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

  document.addEventListener('mouseleave', () => {
    cursorActive = false;
  });

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

  function drawBlob(x, y, radius, color, alpha) {
    const w = canvas.width;
    const h = canvas.height;
    const px = x * w;
    const py = y * h;
    const r = Math.max(w, h) * radius;

    const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.35})`);
    gradient.addColorStop(0.4, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.12})`);
    gradient.addColorStop(0.7, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.03})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function drawCursorGlow() {
    if (cursorFade < 0.02) return;
    const w = canvas.width;
    const h = canvas.height;
    const px = mouseX * w;
    const py = mouseY * h;

    // Very subtle warm glow — soft, not flashy
    const r = Math.min(w, h) * 0.2;
    const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
    gradient.addColorStop(0, `rgba(218, 185, 130, ${cursorFade * 0.03})`);
    gradient.addColorStop(0.5, `rgba(205, 164, 105, ${cursorFade * 0.015})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function animate(time) {
    const w = canvas.width;
    const h = canvas.height;

    mouseX = lerp(mouseX, targetMouseX, 0.03);
    mouseY = lerp(mouseY, targetMouseY, 0.03);
    cursorFade = lerp(cursorFade, cursorActive ? 1 : 0, 0.04);

    ctx.clearRect(0, 0, w, h);

    const t = (time || 0) * 0.001;

    blobs.forEach((blob) => {
      const driftX = Math.sin(t * 0.25 + blob.phase) * 0.015;
      const driftY = Math.cos(t * 0.2 + blob.phase * 1.2) * 0.012;

      blob.x += blob.vx + driftX;
      blob.y += blob.vy + driftY * 0.5;

      // Gentle cursor drift — subtle, elegant response
      const dx = mouseX - blob.x;
      const dy = mouseY - blob.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const pull = Math.min(dist * blob.influence, 0.008);
      blob.x += (dx / dist) * pull;
      blob.y += (dy / dist) * pull;

      if (blob.x < -0.15) blob.x = 1.15;
      if (blob.x > 1.15) blob.x = -0.15;
      if (blob.y < -0.15) blob.y = 1.15;
      if (blob.y > 1.15) blob.y = -0.15;

      // Soft, minimal pulse — internal luminescence, no siren effect
      const basePulse = 0.55 + 0.08 * Math.sin(t * 0.35 + blob.phase * 2);
      const alpha = Math.min(0.7, basePulse);

      drawBlob(blob.x, blob.y, blob.radius, blob.color, alpha);
    });

    if (cursorFade > 0.02) drawCursorGlow();

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(animate);
})();
