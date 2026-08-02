// Bupa Plus Hotel JS Kodları

document.addEventListener('DOMContentLoaded', () => {
  initV3Menu();
  initSmoothScroll();
  initTourActivation();
  initErciyesVideoScroll();
});

// Mobil menü işlemleri
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

// Linklere yumuşak kaydırma (smooth scroll)
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

// 360 Sanal tur iframe aktifleştirici
function initTourActivation() {
  const overlay = document.getElementById('tourActivate');
  const iframe = document.getElementById('tour-embeded');
  if (!overlay || !iframe) return;

  overlay.addEventListener('click', () => {
    // Colorize the iframe (remove grayscale)
    iframe.closest('.v3-tour-frame').classList.add('active');
    // Hide the activation overlay
    overlay.classList.add('hidden');
  });
}

// Erciyes videosu kaydirma ile tetikleme
function initErciyesVideoScroll() {
  const video = document.getElementById('erciyes-video');
  if (!video) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (video.paused && !video.ended) {
          video.play().catch(e => console.log('Video autoplay prevented', e));
        }
      }
    });
  }, { threshold: 0.3 });

  const section = document.getElementById('v3-statement');
  if (section) observer.observe(section);
}
