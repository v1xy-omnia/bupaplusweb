/* ========================================
   BÜPA PLUS HOTEL — Main JavaScript
   V3 Final (Single Theme)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initV3Menu();
  initSmoothScroll();
});

/* --- V3 Menu Overlay --- */
function initV3Menu() {
  const trigger = document.getElementById('v3Trigger');
  const overlay = document.getElementById('v3MenuOverlay');

  if (!trigger || !overlay) return;

  trigger.addEventListener('click', () => {
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  const links = overlay.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
