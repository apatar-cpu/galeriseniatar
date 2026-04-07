/**
 * image.js
 * ────────
 * Renders the Image Detail page.
 * Reads ?cat= and ?id= from the URL, looks up the artwork in ARTWORKS,
 * then populates the split layout (desktop: desc left / image right;
 * mobile: image top / desc bottom).
 *
 * Requires: data.js, nav.js, audio.js
 */

'use strict';

// ── Initialise on page load ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();

  const cat = getParam('cat');
  const id  = getParam('id');
  const aw  = getArtwork(cat, id);

  if (!aw) {
    // Artwork not found — show an error and link back to home
    document.getElementById('image-title').textContent = 'Karya tidak ditemukan.';
    document.getElementById('image-desc').textContent  =
      'Parameter URL tidak valid. Silakan kembali ke halaman galeri.';
    return;
  }

  renderImageView(aw, cat);
});

/**
 * Populate the image detail layout with artwork data.
 *
 * @param {Object} aw  — artwork object
 * @param {string} cat — category name
 */
function renderImageView(aw, cat) {
  // ── Category label ────────────────────────────────
  const catLabel = document.getElementById('image-cat-label');
  if (catLabel) catLabel.textContent = cat || '';

  // ── Title ─────────────────────────────────────────
  const titleEl = document.getElementById('image-title');
  if (titleEl) titleEl.textContent = aw.title;

  // ── Description ───────────────────────────────────
  const descEl = document.getElementById('image-desc');
  if (descEl) descEl.textContent = aw.desc || '';

  // ── Page / nav title ──────────────────────────────
  document.title = `${aw.title} — Galeri Seni Atar`;
  const navPageTitle = document.getElementById('image-nav-title');
  if (navPageTitle) navPageTitle.textContent = aw.title;

  // ── Image (right panel on desktop, top on mobile) ─
  const imgContainer = document.getElementById('image-detail-image');
  if (imgContainer) {
    const imgSrc = aw.pid ? fullUrl(aw.pid) : '';
    if (imgSrc) {
      const img = document.createElement('img');
      img.src   = imgSrc;
      img.alt   = aw.title;
      img.loading = 'eager';   // load immediately — it's the hero element
      img.addEventListener('error', () => {
        imgContainer.innerHTML =
          '<div class="no-image">Gambar tidak tersedia 📷</div>';
      });
      imgContainer.innerHTML = '';
      imgContainer.appendChild(img);
    } else {
      imgContainer.innerHTML = '<div class="no-image">image here</div>';
    }
  }

  // ── Audio player (Music artworks only) ───────────
  const audioSlot = document.getElementById('audio-player-slot');
  if (audioSlot && aw.audio) {
    const player = buildAudioPlayer(aw.audio, '▶ Putar Audio');
    audioSlot.innerHTML = '';
    audioSlot.appendChild(player);
  }
}
