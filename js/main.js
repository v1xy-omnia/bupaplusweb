/* ========================================
   BÜPA PLUS HOTEL — Main JavaScript
   Clean interactions, no gimmicks.
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounterAnimation();
  initSmoothScroll();
  initHeroParallax();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  if (!hamburger || !navLinks) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a:not(.btn-reserve)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --- Scroll Reveal — staggered, varied --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-fade');

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
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
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
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- Hero Parallax — subtle depth on scroll --- */
function initHeroParallax() {
  const heroVideo = document.getElementById('heroVideo');
  const heroContent = document.querySelector('.hero-content');

  if (!heroVideo && !heroContent) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY < heroHeight) {
          const ratio = scrollY / heroHeight;

          if (heroVideo) {
            heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
          }

          if (heroContent) {
            heroContent.style.opacity = 1 - ratio * 1.2;
            heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
