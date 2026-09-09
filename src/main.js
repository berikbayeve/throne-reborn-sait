import './style.css';

import amdIcon from './assets/icons/amd.svg';
import nvidiaIcon from './assets/icons/nvidia.svg';
import kingstonIcon from './assets/icons/kingston.svg';
import hyperxIcon from './assets/icons/hyperx.svg';
import logitechgIcon from './assets/icons/logitechg.svg';
import asusIcon from './assets/icons/asus.svg';
import genericKeyboardIcon from './assets/icons/generic-keyboard.svg';
import genericMouseIcon from './assets/icons/generic-mouse.svg';
import genericMonitorIcon from './assets/icons/generic-monitor.svg';

// ---------- Data: tariffs & specs (Almaty) ----------
const PERIOD_LABELS = {
  hour: '1 час',
  twoPlusOne: '2+1',
  threePlusTwo: '3+2',
  turboDay: 'Турбо день (12:00–18:00)',
  turboNight: 'Турбо ночь (01:00–08:00)',
  night: 'Ночь (22:00–08:00)',
};

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
    specs: [
      [amdIcon, 'Ryzen 5 5700X3D'],
      [nvidiaIcon, 'RTX 4060 8GB'],
      [kingstonIcon, '32GB Kingston Fury'],
      [genericKeyboardIcon, 'Aula F75'],
      [hyperxIcon, 'HyperX Cloud II'],
      [genericMouseIcon, 'Zowie BenQ EC1-C'],
      [asusIcon, 'Asus 280 Hz'],
    ],
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
    specs: [
      [amdIcon, 'Ryzen 5 5700X3D'],
      [nvidiaIcon, 'RTX 4060 8GB'],
      [kingstonIcon, '32GB Kingston Fury'],
      [genericKeyboardIcon, 'Aula F75'],
      [hyperxIcon, 'HyperX Cloud II'],
      [logitechgIcon, 'Logitech G Pro X Superlight 2'],
      [asusIcon, 'Asus 310 Hz'],
    ],
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
    specs: [
      [amdIcon, 'Ryzen 5 5700X3D'],
      [nvidiaIcon, 'RTX 4060 8GB'],
      [kingstonIcon, '32GB Kingston Fury'],
      [genericKeyboardIcon, 'Aula F75'],
      [hyperxIcon, 'HyperX Cloud II'],
      [logitechgIcon, 'Logitech G Pro X Superlight 2'],
      [genericMonitorIcon, 'HKC 360 Hz'],
    ],
  },
];

const formatPrice = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ');

// ---------- Scroll reveal ----------
let observer;
function observeReveal() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
  }
  document
    .querySelectorAll('.reveal-on-scroll:not(.visible)')
    .forEach((el) => observer.observe(el));
}

// ---------- Render tier cards ----------
const tiersEl = document.querySelector('#tiers');

function renderTiers(period) {
  tiersEl.innerHTML = TIERS.map(
    (tier) => `
    <article class="tier-card tier-card--${tier.id} reveal-on-scroll">
      <div class="tier-card__head">
        <span class="tier-card__name">${tier.name}</span>
        <span class="tier-card__count">${tier.count}</span>
      </div>
      <p class="tier-card__price">${formatPrice(tier.prices[period])} ₸<span> / ${PERIOD_LABELS[period].split(' (')[0]}</span></p>
      <ul class="tier-card__specs">
        ${tier.specs
          .map(
            ([icon, label]) => `
          <li><img src="${icon}" alt="" /> <strong>${label}</strong></li>
        `,
          )
          .join('')}
      </ul>
      <a href="#contacts" class="tier-card__cta">Забронировать ${tier.name}</a>
    </article>
  `,
  ).join('');

  observeReveal();
}

// ---------- Period switcher ----------
const periodButtons = document.querySelectorAll('.period-switch__btn');
periodButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    periodButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderTiers(btn.dataset.period);
  });
});

renderTiers('hour');

document.addEventListener('DOMContentLoaded', observeReveal);
observeReveal();
