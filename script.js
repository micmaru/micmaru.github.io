// ============================================================
// NAV — scroll shadow + active link highlight + mobile toggle
// ============================================================
const navWrapper = document.querySelector('.nav-wrapper');
const navToggle  = document.querySelector('.nav-toggle');
const navLinks   = document.querySelector('.nav-links');
const navItems   = document.querySelectorAll('.nav-links a');

// Scroll shadow on nav
window.addEventListener('scroll', () => {
  navWrapper.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveSection();
}, { passive: true });

// Mobile hamburger toggle
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Active link highlight based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ============================================================
// SCROLL REVEAL — animate elements into view
// ============================================================
const revealElements = document.querySelectorAll(
  '.about-grid, .project-card, .skill-card, .contact-card, .about-stats'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});

// Staggered cards inside grids
document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
  el.classList.add('reveal');
  if (i === 1) el.classList.add('reveal-delay-1');
  if (i === 2) el.classList.add('reveal-delay-2');
});

document.querySelectorAll('.skills-grid .skill-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.07}s`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================================
// FOOTER — dynamic year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// INITIAL ACTIVE LINK
// ============================================================
highlightActiveSection();
