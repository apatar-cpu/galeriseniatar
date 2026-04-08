/**
 * about.js
 * ────────
 * Populates the image collage in the About page hero section.
 *
 * Pulls all artwork thumbnails from every category, shuffles them,
 * then tiles them into the .about-collage grid. The grid uses
 * CSS auto-fill so column/row count adapts automatically to the
 * viewport — no JS resize handling needed.
 *
 * Requires: data.js
 */

'use strict';

/**
 * Fisher-Yates shuffle — returns a new shuffled array.
 * @param {Array} arr
 * @returns {Array}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Collect all artworks that have a public_id (pid), across every category.
 * @returns {Object[]}
 */
function getAllArtworksWithImages() {
  return CATEGORIES.flatMap((cat) =>
    ARTWORKS[cat].filter((aw) => aw.pid)
  );
}

/**
 * Calculate how many grid cells are needed to fill the hero area.
 * Adds a 50% buffer so scrolling/resizing never shows empty cells.
 *
 * @param {HTMLElement} hero   — .about-hero element
 * @param {number}      colW   — min column width in px
 * @param {number}      rowH   — row height in px
 * @returns {number}
 */
function calcCellCount(hero, colW, rowH) {
  const cols = Math.ceil(hero.offsetWidth  / colW) + 1;
  const rows = Math.ceil(hero.offsetHeight / rowH) + 1;
  return cols * rows;
}

/**
 * Build an <img> element for the collage.
 * Falls back to a dark placeholder div when the image fails to load.
 *
 * @param {string} src
 * @param {string} alt
 * @returns {HTMLElement}
 */
function makeCollageCell(src, alt) {
  const img = document.createElement('img');
  img.className = 'about-collage-img';
  img.alt   = alt;
  img.loading = 'lazy';
  img.src   = src;
  img.addEventListener('error', () => {
    // Replace broken image with a dark placeholder cell
    const ph = document.createElement('div');
    ph.style.cssText = 'width:100%;height:100%;background:#1a1a1a;';
    img.replaceWith(ph);
  });
  return img;
}

/**
 * Render the collage into #about-collage.
 * Called once on DOMContentLoaded.
 */
function renderCollage() {
  const hero    = document.querySelector('.about-hero');
  const collage = document.getElementById('about-collage');
  if (!collage || !hero) return;

  const artworks = getAllArtworksWithImages();
  if (!artworks.length) {
    // No Cloudinary images configured — hide the collage container
    collage.style.display = 'none';
    return;
  }

  // Determine how many cells we need — use current viewport stats
  // Use generous defaults so the grid always overfills the hero
  const colW     = window.innerWidth >= 769 ? 140 : 100;
  const rowH     = window.innerWidth >= 769 ? 150 : 120;
  const needed   = calcCellCount(hero, colW, rowH);

  // Repeat the shuffled artwork list until we have enough cells
  const shuffled = shuffle(artworks);
  const cells    = [];
  while (cells.length < needed) {
    cells.push(...shuffled);
  }

  // Insert cells
  cells.slice(0, needed).forEach((aw) => {
    collage.appendChild(makeCollageCell(thumbUrl(aw.pid), aw.title));
  });
}

// ── Init ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', renderCollage);
