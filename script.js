const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
  const opened = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cards = [...document.querySelectorAll('.testimonial-card')];
const dotsWrap = document.getElementById('dots');
let current = 0;

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ver depoimento ${index + 1}`);
    dot.className = index === current ? 'active' : '';
    dot.addEventListener('click', () => showSlide(index));
    dotsWrap.appendChild(dot);
  });
}

function showSlide(index) {
  cards[current].classList.remove('active');
  current = (index + cards.length) % cards.length;
  cards[current].classList.add('active');
  renderDots();
}

document.querySelector('.next')?.addEventListener('click', () => showSlide(current + 1));
document.querySelector('.prev')?.addEventListener('click', () => showSlide(current - 1));
renderDots();
setInterval(() => showSlide(current + 1), 6000);
