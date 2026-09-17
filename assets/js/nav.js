/**
 * nav.js — shared navigation + theme toggle
 *
 * Renders the site nav into any element with id="site-nav".
 * Automatically marks the active link based on the current page.
 * Handles light/dark theme switching with localStorage persistence.
 */

(function () {
  const NAV_SCRIPT = document.currentScript;

  const NAV_LINKS = [
    { label: 'Projects', href: '/index.html' },
    { label: 'About',    href: '/about.html' },
  ];

  const SUN_ICON = `<svg class="theme-icon theme-icon--sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;

  const MOON_ICON = `<svg class="theme-icon theme-icon--moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  function getRoot() {
    // Derive the relative path back to the site root from how this script
    // itself was referenced (e.g. "../assets/js/nav.js" -> "../"), rather
    // than from location.pathname — which breaks under file:// URLs and
    // when the site is hosted from a subdirectory.
    const src = NAV_SCRIPT && NAV_SCRIPT.getAttribute('src');
    if (!src) return '';
    return src.replace(/assets\/js\/nav\.js(?:[?#].*)?$/, '');
  }

  function isActive(href) {
    const path = location.pathname;
    const normalised = href.replace(/^\//, '').split('#')[0];
    return path.endsWith(normalised) || (normalised === 'index.html' && path === '/');
  }

  function render() {
    const target = document.getElementById('site-nav');
    if (!target) return;

    const root = getRoot();

    const linksHTML = NAV_LINKS.map(({ label, href }) => {
      const resolvedHref = root + href.replace(/^\//, '');
      const active = isActive(href) ? ' aria-current="page"' : '';
      return `<a href="${resolvedHref}"${active}>${label}</a>`;
    }).join('');

    target.innerHTML = `
      <nav class="site-nav" role="navigation" aria-label="Main navigation">
        <div class="container">
          <a class="nav-wordmark" href="${root}index.html">Zhuri Solan</a>
          <div class="nav-right">
            <div class="nav-links">${linksHTML}</div>
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark mode">
              ${SUN_ICON}
              ${MOON_ICON}
            </button>
          </div>
        </div>
      </nav>
    `;

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
