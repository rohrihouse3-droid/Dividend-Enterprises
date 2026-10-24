const header = document.querySelector('.site-header');
const progress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function onScroll(){
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  backTop.classList.toggle('show', y > 600);
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
