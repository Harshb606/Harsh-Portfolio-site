/* ================================================================
   HARSH BHAVSAR PORTFOLIO — script.js
================================================================ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
}, { passive: true });

/* ── Active nav link on scroll ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* Close menu on nav link click */
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Scroll Reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Portfolio filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    /* Update active button */
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        /* Trigger re-reveal animation */
        item.style.animation = 'none';
        item.offsetHeight; // reflow
        item.style.animation = '';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

<script>
const video = document.getElementById("myVideo");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide"); // hide button
});

// jab video pause ho → button wapas dikhe
video.addEventListener("pause", () => {
  playBtn.classList.remove("hide");
});

// jab video end ho → button wapas dikhe
video.addEventListener("ended", () => {
  playBtn.classList.remove("hide");
});
</script>

/* ── Smooth anchor scrolling (fallback for older browsers) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Cursor glow trail (desktop only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const trail = document.createElement('div');
  trail.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:300px; height:300px; border-radius:50%;
    background:radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:left 0.6s ease, top 0.6s ease;
    top:0; left:0;
  `;
  document.body.appendChild(trail);

  document.addEventListener('mousemove', e => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ── Typing animation for hero tagline ── */
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.opacity = '1';

  let i = 0;
  const typeInterval = setInterval(() => {
    tagline.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typeInterval);
  }, 55);

  /* Start only when hero is visible */
  setTimeout(() => {}, 800);
}

/* ── Stagger children on initial load ── */
window.addEventListener('load', () => {
  const heroReveal = document.querySelectorAll('.hero .reveal-up');
  heroReveal.forEach(el => el.classList.add('visible'));
  updateActiveNav();
});

/* ── Parallax orbs on mouse move ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const orbs = document.querySelectorAll('.hero-orb');
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
}

console.log('%c✦ Harsh Bhavsar Portfolio', 'background:#7c3aed;color:#fff;padding:6px 12px;border-radius:4px;font-weight:700;');
console.log('%cVideo Editor & 2D Animator', 'color:#a855f7;font-size:12px;');
