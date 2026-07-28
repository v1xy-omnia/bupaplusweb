/* ========================================
   BÜPA PLUS HOTEL — Main JavaScript
   Includes Theme Toggle (V1 / V2)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initV3Menu();
  initScrollReveal();
  initCounterAnimation();
  initSmoothScroll();
  initHeroParallax();
});

/* --- Theme Toggle Engine --- */
function initThemeToggle() {
  const btnV1 = document.getElementById('btnV1');
  const btnV2 = document.getElementById('btnV2');
  const btnV3 = document.getElementById('btnV3');
  if (!btnV1) return;

  const savedTheme = localStorage.getItem('bupa_theme') || 'v1';
  document.body.setAttribute('data-theme', savedTheme);

  const buttons = [btnV1, btnV2, btnV3].filter(Boolean);

  function setActive(themeStr, activeBtn) {
    document.body.setAttribute('data-theme', themeStr);
    localStorage.setItem('bupa_theme', themeStr);
    buttons.forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  if (savedTheme === 'v2' && btnV2) {
    setActive('v2', btnV2);
  } else if (savedTheme === 'v3' && btnV3) {
    setActive('v3', btnV3);
  } else {
    setActive('v1', btnV1);
  }

  btnV1.addEventListener('click', () => setActive('v1', btnV1));
  if (btnV2) btnV2.addEventListener('click', () => setActive('v2', btnV2));
  if (btnV3) btnV3.addEventListener('click', () => setActive('v3', btnV3));
}

/* --- V3 Menu Overlay --- */
function initV3Menu() {
  const trigger = document.getElementById('v3Trigger');
  const overlay = document.getElementById('v3MenuOverlay');

  if (!trigger || !overlay) return;

  trigger.addEventListener('click', () => {
    overlay.classList.toggle('active');
    // Lock scroll when menu is open
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

/* --- Navbar Scroll Effect (Supports Both V1 & V2) --- */
function initNavbar() {
  const navbarV1 = document.getElementById('navbar');
  const navbarV2 = document.getElementById('v2Navbar');

  window.addEventListener('scroll', () => {
    const scrollTrigger = 50;
    if (window.scrollY > scrollTrigger) {
      if (navbarV1) navbarV1.classList.add('scrolled');
      if (navbarV2) navbarV2.classList.add('scrolled');
    } else {
      if (navbarV1) navbarV1.classList.remove('scrolled');
      if (navbarV2) navbarV2.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- Mobile Menu (Supports Both V1 & V2) --- */
function initMobileMenu() {
  // V1 Mobile Menu
  setupMenu('navHamburger', 'navLinks', 'navOverlay', '.nav-links a:not(.btn-reserve)');
  // V2 Mobile Menu
  setupMenu('v2Hamburger', 'v2NavLinks', 'v2NavOverlay', '.v2-nav-links a:not(.v2-btn-reserve)');

  function setupMenu(btnId, linksId, overlayId, linkSelector) {
    const hamburger = document.getElementById(btnId);
    const navLinks = document.getElementById(linksId);
    const overlay = document.getElementById(overlayId);

    if (!hamburger || !navLinks) return;

    function toggleMenu() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    document.querySelectorAll(linkSelector).forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}

/* --- Scroll Reveal — staggered, varied --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-fade, .v2-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Counter Animation --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number, .v2-stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetAttr = counter.getAttribute('data-target');
        const target = targetAttr ? parseInt(targetAttr) : parseInt(counter.textContent);
        if (target) {
          animateCounter(counter, target);
        }
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    // Store original value in data-target if it doesn't exist
    if (!counter.getAttribute('data-target')) {
      counter.setAttribute('data-target', counter.textContent);
      counter.textContent = "0";
    }
    observer.observe(counter);
  });
}

function animateCounter(element, target) {
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
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
        // Checking which theme is active to get correct navbar height
        const isV2 = document.body.getAttribute('data-theme') === 'v2';
        const nav = isV2 ? document.getElementById('v2Navbar') : document.getElementById('navbar');
        const navHeight = nav ? nav.offsetHeight : 0;

        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- Hero Parallax --- */
function initHeroParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY < heroHeight) {
          const ratio = scrollY / heroHeight;
          const isV2 = document.body.getAttribute('data-theme') === 'v2';

          // Select elements to apply parallax based on theme
          const heroVideo = document.querySelector(isV2 ? '.v2-hero-video video' : '#heroVideo');
          const heroContent = document.querySelector(isV2 ? '.v2-hero-content' : '.hero-content');

          if (heroVideo) {
            heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
          }

          if (heroContent) {
            heroContent.style.opacity = Math.max(0, 1 - ratio * 1.5);
            heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
