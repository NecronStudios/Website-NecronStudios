const progress = document.querySelector('.scroll-progress');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
if (header && toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  let mx=-100,my=-100,cx=-100,cy=-100;
  window.addEventListener('mousemove', e => {mx=e.clientX; my=e.clientY; cursor.classList.add('is-active')},{passive:true});
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('is-hover'));
  });
  const tick=()=>{cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cursor.style.left=`${cx}px`;cursor.style.top=`${cy}px`;requestAnimationFrame(tick)};tick();
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Allow timeline cards to be opened from hash links and focus them for navigation clarity.
window.addEventListener('load', () => {
  const target = location.hash ? document.querySelector(location.hash) : null;
  if (target) setTimeout(() => target.scrollIntoView({behavior:'smooth', block:'center'}), 120);
});
