/**
 * nav.js — shared navigation component
 *
 * Renders the site nav into any element with id="site-nav".
 * Automatically marks the active link based on the current page.
 *
 * Usage in HTML:
 *   <header id="site-nav"></header>
 *   <script src="/assets/js/nav.js"></script>
 *   (or use a relative path from /projects/: ../../assets/js/nav.js)
 */

(function () {
  const NAV_LINKS = [
    { label: 'Projects', href: '/index.html#projects' },
    { label: 'About',    href: '/about.html' },
  ];

  function getRoot() {
    // Determine path depth so links always resolve from root.
    // Works for both root pages and /projects/* pages.
    const depth = location.pathname.split('/').filter(Boolean).length;
    return depth > 1 ? '../'.repeat(depth - 1) : '';
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
          <div class="nav-links">${linksHTML}</div>
        </div>
      </nav>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
