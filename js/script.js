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

function openFeatureCard(card, smooth) {
  const key = card.dataset.detail;
  featureCards.forEach((c) => {
    c.classList.remove('active');
    c.setAttribute('aria-expanded', 'false');
  });
  featureDetails.querySelectorAll('.feature-detail-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === key);
  });
  card.classList.add('active');
  card.setAttribute('aria-expanded', 'true');
  featureDetails.hidden = false;
  activeFeatureCard = card;
  scrollWithHeaderOffset(featureDetails, smooth);
}

featureCards.forEach((card) => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');
    if (isActive) {
      featureCards.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-expanded', 'false');
      });
      featureDetails.hidden = true;
      activeFeatureCard = null;
    } else {
      openFeatureCard(card, true);
    }
  });
});

function scrollWithHeaderOffset(el, smooth) {
  const header = document.querySelector('.site-header');
  const headerH = header ? header.offsetHeight : 0;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' });
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
    if (targetCard) scrollWithHeaderOffset(targetCard, true);
  });
}

// Deep link into a feature detail panel, e.g. index.html#priprava-cesky
if (featureCards.length && window.location.hash.indexOf('#priprava-') === 0) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  const key = window.location.hash.replace('#priprava-', '');
  const targetCard = Array.from(featureCards).find((c) => c.dataset.detail === key);
  if (targetCard) {
    const runDeepLink = () => {
      setTimeout(() => {
        openFeatureCard(targetCard, false);
      }, 100);
    };
    if (document.readyState === 'complete') {
      runDeepLink();
    } else {
      window.addEventListener('load', runDeepLink);
    }
  }
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

// Vyskakovací okno s potvrzením po odeslání formuláře
function showFormModal(message, isError) {
  let overlay = document.getElementById('form-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'form-modal-overlay';
    overlay.className = 'form-modal-overlay';
    overlay.innerHTML = `
      <div class="form-modal" role="alertdialog" aria-live="assertive">
        <button type="button" class="form-modal-close" aria-label="Zavřít">&times;</button>
        <div class="form-modal-icon"></div>
        <p class="form-modal-text"></p>
        <button type="button" class="btn btn-navy form-modal-ok">Rozumím</button>
      </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.classList.remove('open');
    overlay.querySelector('.form-modal-close').addEventListener('click', close);
    overlay.querySelector('.form-modal-ok').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  const modal = overlay.querySelector('.form-modal');
  modal.classList.toggle('form-modal-error', !!isError);
  overlay.querySelector('.form-modal-icon').innerHTML = isError
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v6M12 16.5v.1"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>';
  overlay.querySelector('.form-modal-text').textContent = message;
  overlay.classList.add('open');
}

// Form submission via Web3Forms
function setupWeb3Form(formId, statusId, submitSelector, successMsg) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector(submitSelector);
    submitBtn.disabled = true;
    status.textContent = 'Odesílám…';
    status.className = 'signup-status';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = successMsg;
        status.classList.add('success');
        form.reset();
        showFormModal(successMsg, false);
      } else {
        const errorMsg = 'Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište na e-mail.';
        status.textContent = errorMsg;
        status.classList.add('error');
        showFormModal(errorMsg, true);
      }
    } catch (err) {
      const errorMsg = 'Něco se nepovedlo. Zkuste to prosím znovu, nebo nám napište na e-mail.';
      status.textContent = errorMsg;
      status.classList.add('error');
      showFormModal(errorMsg, true);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

setupWeb3Form('signup-form', 'signup-status', '.signup-submit', 'Děkujeme! Přihláška byla odeslána, brzy se ozveme.');
setupWeb3Form('withdrawal-form', 'withdrawal-status', '.withdrawal-submit', 'Odstoupení od smlouvy bylo odesláno, brzy se ozveme.');
setupWeb3Form('event-form', 'event-status', '.event-submit', 'Děkujeme! Přihláška na úvodní hodinu byla odeslána, brzy se ozveme.');

// Skrytí propagace "Úvodní hodina zdarma" (banner i sekce na hlavní stránce),
// jakmile termíny proběhnou – stačí posunout datum níže.
(function () {
  var hideAfter = new Date('2026-09-09T00:00:00');
  if (new Date() >= hideAfter) {
    document.querySelectorAll('.event-timed').forEach(function (el) { el.remove(); });
  }
})();

// Lightbox – zvětšení fotky po kliknutí, procházení šipkami (galerie na kontaktu)
(function () {
  const galleryImages = Array.from(document.querySelectorAll('.contact-gallery img'));
  if (!galleryImages.length) return;

  let overlay;
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    const overlayImg = overlay.querySelector('img');
    overlayImg.src = img.src;
    overlayImg.alt = img.alt || '';
  }

  function openLightbox(index) {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Zavřít">&times;</button>
        <button type="button" class="lightbox-arrow lightbox-prev" aria-label="Předchozí fotka">&#10094;</button>
        <img alt="">
        <button type="button" class="lightbox-arrow lightbox-next" aria-label="Další fotka">&#10095;</button>
      `;
      document.body.appendChild(overlay);
      const close = () => overlay.classList.remove('open');
      overlay.querySelector('.lightbox-close').addEventListener('click', close);
      overlay.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
      overlay.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      });
    }
    showImage(index);
    overlay.classList.add('open');
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });
})();
