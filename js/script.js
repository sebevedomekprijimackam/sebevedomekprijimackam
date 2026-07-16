const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Testimonial carousel
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let activeIndex = 0;
let rotateTimer;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  activeIndex = index;
}

function startRotation() {
  clearInterval(rotateTimer);
  rotateTimer = setInterval(() => {
    showSlide((activeIndex + 1) % slides.length);
  }, 5000);
}

if (slides.length) {
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startRotation();
    });
  });
  startRotation();
}

// Feature cards with expandable detail panel
const featureCards = document.querySelectorAll('.feature-card');
const featureDetails = document.getElementById('feature-details');
let activeFeatureCard = null;

featureCards.forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.dataset.detail;
    const isActive = card.classList.contains('active');

    featureCards.forEach((c) => {
      c.classList.remove('active');
      c.setAttribute('aria-expanded', 'false');
    });
    featureDetails.querySelectorAll('.feature-detail-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === key);
    });

    if (isActive) {
      featureDetails.hidden = true;
      activeFeatureCard = null;
    } else {
      card.classList.add('active');
      card.setAttribute('aria-expanded', 'true');
      featureDetails.hidden = false;
      activeFeatureCard = card;
      scrollWithHeaderOffset(featureDetails);
    }
  });
});

function scrollWithHeaderOffset(el) {
  const header = document.querySelector('.site-header');
  const headerH = header ? header.offsetHeight : 0;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

const featureBack = document.getElementById('feature-back');
if (featureBack) {
  featureBack.addEventListener('click', () => {
    const targetCard = activeFeatureCard || document.querySelector('.feature-grid');
    featureCards.forEach((c) => {
      c.classList.remove('active');
      c.setAttribute('aria-expanded', 'false');
    });
    featureDetails.hidden = true;
    activeFeatureCard = null;
    if (targetCard) scrollWithHeaderOffset(targetCard);
  });
}

// Deep link into a feature detail panel, e.g. index.html#priprava-cesky
if (featureCards.length) {
  window.addEventListener('load', () => {
    const key = window.location.hash.replace('#priprava-', '');
    if (!key) return;
    const targetCard = Array.from(featureCards).find((c) => c.dataset.detail === key);
    if (targetCard) targetCard.click();
  });
}

// Cookie / privacy notice banner
(function () {
  const STORAGE_KEY = 'cookie-notice-dismissed';
  if (localStorage.getItem(STORAGE_KEY)) return;

  const logoLink = document.querySelector('.logo');
  const basePath = logoLink ? logoLink.getAttribute('href').replace('index.html', '') : '';
  const policyHref = basePath + 'ochrana-osobnich-udaju.html';

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML =
    '<p>Web ukládá jen technicky nutná data, žádné marketingové ani analytické cookies. Více v <a href="' +
    policyHref +
    '">zásadách ochrany osobních údajů</a>.</p>' +
    '<button type="button">Rozumím</button>';

  document.body.appendChild(banner);

  banner.querySelector('button').addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, '1');
    banner.remove();
  });
})();

// Signup form submission via Web3Forms
const signupForm = document.getElementById('signup-form');
const signupStatus = document.getElementById('signup-status');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = signupForm.querySelector('.signup-submit');
    submitBtn.disabled = true;
    signupStatus.textContent = 'Odesílám…';
    signupStatus.className = 'signup-status';

    try {
      const formData = new FormData(signupForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        signupStatus.textContent = 'Děkujeme! Přihláška byla odeslána, brzy se ozveme.';
        signupStatus.classList.add('success');
        signupForm.reset();
      } else {
        signupStatus.textContent = 'Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište na e-mail.';
        signupStatus.classList.add('error');
      }
    } catch (err) {
      signupStatus.textContent = 'Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište na e-mail.';
      signupStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}
