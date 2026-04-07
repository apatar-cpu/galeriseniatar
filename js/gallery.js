/**
 * gallery.js
 * ──────────
 * Renders the Gallery page: reads the ?cat= URL parameter, shows a
 * 2-column portrait grid of all artworks in that category.
 *
 * Requires: data.js, nav.js
 */

'use strict';

/** Category currently displayed — set from the URL param on load. */
let currentGalleryCat = null;

/**
 * Build a single gallery card element.
 *
 * @param {Object} artwork
 * @param {string} cat
 * @param {number} delay  — staggered animation delay index
 * @returns {HTMLElement}
 */
function makeGalleryCard(artwork, cat, delay) {
  const card = document.createElement('div');
  card.className = 'gallery-card fade-in';
  card.style.animationDelay = `${delay * 0.05}s`;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', artwork.title);

  card.addEventListener('click', () => goToImage(cat, artwork.id));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') goToImage(cat, artwork.id);
  });

  const imgSrc = artwork.pid ? cardUrl(artwork.pid) : '';

  if (imgSrc) {
    card.innerHTML = `
      <img class="gallery-card-img" src="${imgSrc}" alt="${artwork.title}" loading="lazy">
      <div class="gallery-card-placeholder" style="display:none">🖼</div>
      <div class="gallery-card-title">${artwork.title}</div>
    `;
    const img = card.querySelector('.gallery-card-img');
    const ph  = card.querySelector('.gallery-card-placeholder');
    img.addEventListener('error', () => {
      img.style.display = 'none';
      ph.style.display  = 'flex';
    });
  } else {
    card.innerHTML = `
      <div class="gallery-card-placeholder">🖼</div>
      <div class="gallery-card-title">${artwork.title}</div>
    `;
  }

  return card;
}

/**
 * Populate the grid with the given artworks list.
 *
 * @param {Object[]} artworks
 * @param {string}   cat
 */
function renderGrid(artworks, cat) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!artworks.length) {
    grid.innerHTML = '<p class="empty-state">Tidak ada karya ditemukan.</p>';
    return;
  }

  artworks.forEach((aw, i) => grid.appendChild(makeGalleryCard(aw, cat, i)));
}

/**
 * Filter the currently displayed category by title.
 *
 * @param {string} query
 */
function filterGallery(query) {
  const q        = query.toLowerCase().trim();
  const all      = ARTWORKS[currentGalleryCat] || [];
  const filtered = all.filter((aw) => aw.title.toLowerCase().includes(q));
  renderGrid(filtered, currentGalleryCat);
}

// ── Initialise on page load ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();

  // Read category from URL
  currentGalleryCat = getParam('cat') || CATEGORIES[0];

  // Update nav title
  const navTitle = document.getElementById('gallery-nav-title');
  if (navTitle) navTitle.textContent = currentGalleryCat;

  // Set document title
  document.title = `${currentGalleryCat} — Galeri Seni Atar`;

  // Render all artworks for this category
  renderGrid(ARTWORKS[currentGalleryCat] || [], currentGalleryCat);

  // Search
  const searchInput = document.getElementById('gallery-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterGallery(e.target.value));
  }
});
