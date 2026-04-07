/**
 * nav.js
 * ──────
 * Sidebar open/close and shared navigation helpers.
 * Included on every page that has the sidebar HTML fragment.
 *
 * Navigation between pages uses plain URL parameters:
 *   gallery.html?cat=Photography
 *   image.html?cat=Music&id=2
 */

'use strict';

// ── Sidebar ───────────────────────────────────────

function openSidebar() {
  document.getElementById('sidebar-overlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar-overlay').classList.remove('open');
}

// Close sidebar when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

// ── URL parameter helpers ─────────────────────────

/**
 * Read a single URL query parameter by name.
 * e.g. getParam('cat') on  gallery.html?cat=Music  → "Music"
 */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/**
 * Navigate to the gallery page for a given category.
 */
function goToGallery(cat) {
  window.location.href = `gallery.html?cat=${encodeURIComponent(cat)}`;
}

/**
 * Navigate to the image detail page.
 */
function goToImage(cat, id) {
  window.location.href = `image.html?cat=${encodeURIComponent(cat)}&id=${encodeURIComponent(id)}`;
}

/**
 * Go back one step in browser history.
 * Falls back to home.html if there is no history.
 */
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'home.html';
  }
}

// ── Sidebar HTML (shared fragment) ───────────────
// Each page calls renderSidebar() on DOMContentLoaded to inject
// the sidebar markup into #sidebar-overlay.

function renderSidebar() {
  const overlay = document.getElementById('sidebar-overlay');
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="sidebar-backdrop" onclick="closeSidebar()"></div>
    <nav class="sidebar">
      <div class="sidebar-header">
        <button class="sidebar-menu-btn" onclick="closeSidebar()" aria-label="Close menu">
          ${iconHamburger()}
        </button>
        <span class="sidebar-title">Galeri ATAR</span>
      </div>
      <div class="sidebar-nav">
        <a class="sidebar-item" href="index.html">
          ${iconHome()} <span>Welcome</span>
        </a>
        <a class="sidebar-item" href="home.html">
          ${iconGrid()} <span>Home Galeri</span>
        </a>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">Kategori</div>
        ${CATEGORIES.map(cat => `
          <a class="sidebar-item" href="gallery.html?cat=${encodeURIComponent(cat)}">
            ${iconCat(cat)} <span>${cat}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

// ── Inline SVG icon helpers ───────────────────────

function iconHamburger() {
  return `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;
}
function iconHome() {
  return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
  </svg>`;
}
function iconGrid() {
  return `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>`;
}
function iconArrowRight() {
  return `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>`;
}
function iconArrowLeft() {
  return `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>`;
}
function iconSearch() {
  return `<svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>`;
}
function iconCat(cat) {
  // Return a contextual icon per category
  const icons = {
    'Traditional Art': `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    'Digital Art':     `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>`,
    'Photography':     `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    'Music':           `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    'Architecture':    `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  };
  return icons[cat] || iconGrid();
}
