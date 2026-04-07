/**
 * home.js
 * ───────
 * Renders the Home page: category sections each with a horizontal
 * scrollable row of portrait thumbnail cards.
 *
 * Requires: data.js, nav.js
 */

'use strict';

/**
 * Format a category name into two-tone HTML:
 *   "Traditional Art"  →  "Traditional <em>Art</em>"
 */
function formatCatTitle(cat) {
  const parts = cat.split(' ');
  if (parts.length < 2) return cat;
  return `${parts[0]} <em>${parts.slice(1).join(' ')}</em>`;
}

/**
 * Build a single thumbnail card element.
 *
 * @param {Object} artwork  — artwork data object from ARTWORKS
 * @param {string} cat      — category name (used for navigation)
 * @returns {HTMLElement}
 */
function makeThumbCard(artwork, cat) {
  const card = document.createElement('div');
  card.className = 'thumb-card fade-in';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', artwork.title);

  card.addEventListener('click', () => goToImage(cat, artwork.id));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') goToImage(cat, artwork.id);
  });

  const imgSrc = artwork.pid ? thumbUrl(artwork.pid) : '';

  if (imgSrc) {
    card.innerHTML = `
      <img class="thumb-img" src="${imgSrc}" alt="${artwork.title}" loading="lazy">
      <div class="thumb-img-placeholder" style="display:none">🖼</div>
      <div class="thumb-title">${artwork.title}</div>
    `;
    const img = card.querySelector('.thumb-img');
    const ph  = card.querySelector('.thumb-img-placeholder');
    img.addEventListener('error', () => {
      img.style.display = 'none';
      ph.style.display  = 'flex';
    });
  } else {
    card.innerHTML = `
      <div class="thumb-img-placeholder">🖼</div>
      <div class="thumb-title">${artwork.title}</div>
    `;
  }

  return card;
}

/**
 * Render all category sections into #home-sections.
 * Called once on page load.
 */
function renderHome() {
  const container = document.getElementById('home-sections');
  if (!container) return;
  container.innerHTML = '';

  HOME_CATEGORIES.forEach((cat) => {
    const artworks = ARTWORKS[cat].slice(0, 6);

    const section = document.createElement('div');
    section.className = 'section-gap';

    // Header row: category title + "View all" link
    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
      <h2 class="section-title">${formatCatTitle(cat)}</h2>
      <button class="view-all-btn" onclick="goToGallery('${cat}')">Lihat semua →</button>
    `;

    // Horizontal thumbnail row
    const rowId = 'row-' + cat.replace(/\s+/g, '_');
    const rowEl = document.createElement('div');
    rowEl.className = 'thumb-row';
    rowEl.id = rowId;

    artworks.forEach((aw) => rowEl.appendChild(makeThumbCard(aw, cat)));

    section.appendChild(header);
    section.appendChild(rowEl);
    container.appendChild(section);
  });
}

/**
 * Filter all thumbnail rows to artworks whose title matches the query.
 *
 * @param {string} query — search string (case-insensitive)
 */
function filterHome(query) {
  const q = query.toLowerCase().trim();

  HOME_CATEGORIES.forEach((cat) => {
    const rowEl = document.getElementById('row-' + cat.replace(/\s+/g, '_'));
    if (!rowEl) return;
    rowEl.innerHTML = '';

    const filtered = ARTWORKS[cat].filter(
      (aw) =>
        aw.title.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q)
    );

    filtered.slice(0, 6).forEach((aw) => rowEl.appendChild(makeThumbCard(aw, cat)));

    // Show empty message inside the row if nothing matches
    if (filtered.length === 0) {
      rowEl.innerHTML = '<p style="font-size:13px;color:#888;padding:8px 0;">Tidak ada hasil.</p>';
    }
  });
}

// ── Initialise on page load ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderHome();

  const searchInput = document.getElementById('home-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterHome(e.target.value));
  }
});
