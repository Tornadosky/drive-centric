const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const drawer = document.querySelector('[data-mobile-drawer]');

const updateHeader = () => {
  if (window.scrollY > 16) header?.classList.add('scrolled');
  else header?.classList.remove('scrolled');
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  drawer?.classList.toggle('open', !isOpen);
  drawer?.setAttribute('aria-hidden', String(isOpen));
});

drawer?.addEventListener('click', (event) => {
  if (event.target === drawer || event.target.tagName === 'A') {
    toggle?.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
});

const animateCount = (node) => {
  const target = Number(node.dataset.count || node.textContent.replace(/\D/g, ''));
  if (!Number.isFinite(target) || node.dataset.counted === 'true') return;
  node.dataset.counted = 'true';
  const duration = 900;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else node.textContent = target.toLocaleString();
  };
  requestAnimationFrame(tick);
};

const reveals = Array.from(document.querySelectorAll('.reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll?.('[data-count]').forEach(animateCount);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

const standaloneCounters = Array.from(document.querySelectorAll('[data-count]'));
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });
standaloneCounters.forEach(el => counterObserver.observe(el));

const shell = document.querySelector('[data-testimonials]');
if (shell) {
  const cards = Array.from(shell.querySelectorAll('.testimonial-card'));
  const dots = Array.from(shell.querySelectorAll('.carousel-dots span'));
  let index = 0;
  const show = (next) => {
    index = (next + cards.length) % cards.length;
    cards.forEach((card, i) => card.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };
  shell.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
  shell.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
  let timer = window.setInterval(() => show(index + 1), 6500);
  shell.addEventListener('mouseenter', () => window.clearInterval(timer));
  shell.addEventListener('mouseleave', () => { timer = window.setInterval(() => show(index + 1), 6500); });
}
