// ── Nav: scroll state ──────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    updateActiveLink();
}, { passive: true });

// ── Nav: mobile toggle ─────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
    });
});

// Close on outside click
document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
    }
});

// ── Nav: active link on scroll ─────────────────────────────
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');
    let current    = '';

    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.id;
        }
    });

    links.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + current
        );
    });
}

// ── Smooth scroll ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});

// ── Intersection Observer: reveal ─────────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Scroll to top ──────────────────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Keyboard: escape closes mobile nav ────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
    }
});
