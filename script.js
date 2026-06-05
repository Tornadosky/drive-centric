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

const reveals = Array.from(document.querySelectorAll('.reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

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
