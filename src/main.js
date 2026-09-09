import './style.css';

import amd from './assets/icons/amd.svg?raw';
import nvidia from './assets/icons/nvidia.svg?raw';
import kingston from './assets/icons/kingston.svg?raw';
import hyperx from './assets/icons/hyperx.svg?raw';
import logitechg from './assets/icons/logitechg.svg?raw';
import asus from './assets/icons/asus.svg?raw';
import keyboard from './assets/icons/generic-keyboard.svg?raw';
import mouse from './assets/icons/generic-mouse.svg?raw';
import monitor from './assets/icons/generic-monitor.svg?raw';

import mouseStandardJpg from './assets/photos/mouse-standard.jpg';
import mouseStandardWebp from './assets/photos/mouse-standard.webp';
import mouseProJpg from './assets/photos/mouse-silver-gold.jpg';
import mouseProWebp from './assets/photos/mouse-silver-gold.webp';

// ---------- Data (Almaty) ----------
const WHATSAPP = 'https://wa.me/message/6GAEB2IXIE6PG1';

const PERIODS = {
  hour: { unit: 'за час', hint: '' },
  twoPlusOne: { unit: 'за 2+1', hint: '' },
  threePlusTwo: { unit: 'за 3+2', hint: '' },
  turboDay: { unit: 'турбо день', hint: '12:00–18:00' },
  turboNight: { unit: 'турбо ночь', hint: '01:00–08:00' },
  night: { unit: 'ночь', hint: '22:00–08:00' },
};

const BASE_SPECS = [
  [amd, 'Ryzen 5 5700X3D'],
  [nvidia, 'RTX 4060 8GB'],
  [kingston, '32GB Kingston Fury'],
  [keyboard, 'Aula F75'],
  [hyperx, 'HyperX Cloud II'],
];

const TIERS = [
  {
    id: 'standard',
    name: 'Standard',
    count: '36 ПК',
    prices: {
      hour: 800,
      twoPlusOne: 1600,
      threePlusTwo: 2400,
      turboDay: 2000,
      turboNight: 1500,
      night: 3000,
    },
    specs: [...BASE_SPECS, [mouse, 'Zowie BenQ EC1-C'], [asus, 'Asus 280 Hz']],
    media: {
      jpg: mouseStandardJpg,
      webp: mouseStandardWebp,
      alt: 'Мышь Zowie BenQ EC1-C зала Standard',
    },
  },
  {
    id: 'silver',
    name: 'Silver',
    count: '10 ПК',
    prices: {
      hour: 1000,
      twoPlusOne: 2000,
      threePlusTwo: 3000,
      turboDay: 2800,
      turboNight: 2000,
      night: 4000,
    },
    specs: [...BASE_SPECS, [logitechg, 'Logitech G Pro X Superlight 2'], [asus, 'Asus 310 Hz']],
    media: {
      jpg: mouseProJpg,
      webp: mouseProWebp,
      alt: 'Мышь Logitech G Pro X Superlight 2 зала Silver',
    },
  },
  {
    id: 'gold',
    name: 'Gold',
    count: '10 ПК',
    prices: {
      hour: 1200,
      twoPlusOne: 2400,
      threePlusTwo: 3600,
      turboDay: 3600,
      turboNight: 2500,
      night: 5000,
    },
    specs: [...BASE_SPECS, [logitechg, 'Logitech G Pro X Superlight 2'], [monitor, 'HKC 360 Hz']],
    media: {
      jpg: mouseProJpg,
      webp: mouseProWebp,
      alt: 'Мышь Logitech G Pro X Superlight 2 зала Gold',
    },
  },
];

const money = new Intl.NumberFormat('ru-RU');

// ---------- Scroll reveal ----------
const revealer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
);
const observeReveals = () =>
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => revealer.observe(el));

// ---------- Tier cards (rendered once, prices updated in place) ----------
const tiersEl = document.querySelector('#tiers');

tiersEl.innerHTML = TIERS.map(
  (t) => `
  <article class="tier tier--${t.id}" data-tier="${t.id}" data-reveal>
    <div class="tier__media">
      <picture>
        <source srcset="${t.media.webp}" type="image/webp" />
        <img src="${t.media.jpg}" alt="${t.media.alt}" width="933" height="1400" loading="lazy" />
      </picture>
      <span class="tier__badge">${t.count}</span>
    </div>
    <div class="tier__body">
      <h3 class="tier__name">${t.name}</h3>
      <p class="tier__price"><span data-price></span> ₸<small data-unit></small></p>
      <p class="tier__hint" data-hint></p>
      <ul class="tier__specs">
        ${t.specs
          .map(
            ([icon, label]) =>
              `<li><span class="ico" aria-hidden="true">${icon}</span><span>${label}</span></li>`,
          )
          .join('')}
      </ul>
      <a class="btn btn--ghost tier__cta" href="${WHATSAPP}" target="_blank" rel="noopener">Забронировать ${t.name}</a>
    </div>
  </article>`,
).join('');

function setPeriod(period) {
  const { unit, hint } = PERIODS[period];
  for (const tier of TIERS) {
    const card = tiersEl.querySelector(`[data-tier="${tier.id}"]`);
    card.querySelector('[data-price]').textContent = money.format(tier.prices[period]);
    card.querySelector('[data-unit]').textContent = unit;
    card.querySelector('[data-hint]').textContent = hint;
  }
}

const periodButtons = document.querySelectorAll('[data-periods] [data-period]');
periodButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    periodButtons.forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', String(b === btn));
    });
    setPeriod(btn.dataset.period);
  });
});
setPeriod('hour');

// ---------- Nav: solid on scroll, burger on mobile ----------
const nav = document.querySelector('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger = document.querySelector('[data-burger]');
const menu = document.querySelector('#menu');
const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  document.body.classList.toggle('menu-open', open);
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

observeReveals();
