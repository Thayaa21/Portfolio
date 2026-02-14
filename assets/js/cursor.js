/**
 * Custom cursor — follows mouse, minimal and elegant
 */

(function() {
  function onMouseMove(e) {
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
  document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) onMouseMove(e.touches[0]);
  }, { passive: true });
})();
