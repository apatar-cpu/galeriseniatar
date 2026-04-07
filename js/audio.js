/**
 * audio.js
 * ────────
 * Builds a custom audio player UI backed by a native HTML5 <audio>
 * element — works in every browser on every platform, no plugins needed.
 *
 * Usage:
 *   const playerEl = buildAudioPlayer(audioUrl, trackTitle);
 *   document.getElementById('audio-slot').appendChild(playerEl);
 */

'use strict';

/** Currently active Audio element (only one plays at a time). */
let _activeAudio = null;

/**
 * Stop whatever is currently playing and reset its position.
 */
function stopAllAudio() {
  if (_activeAudio) {
    _activeAudio.pause();
    _activeAudio.currentTime = 0;
    _activeAudio = null;
  }
}

/**
 * Format seconds as m:ss string.
 * @param {number} totalSeconds
 * @returns {string}
 */
function fmtTime(totalSeconds) {
  if (!isFinite(totalSeconds) || isNaN(totalSeconds)) return '0:00';
  const m   = Math.floor(totalSeconds / 60);
  const sec = Math.floor(totalSeconds % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/**
 * Build and return a complete audio player DOM element.
 *
 * The player contains:
 *   - A custom play/pause button
 *   - Elapsed / total time display
 *   - Clickable progress bar
 *   - A native <audio> element with browser controls as a fallback
 *
 * @param {string} src   — Audio URL (mp3, m4a, ogg, wav)
 * @param {string} label — Track label shown above the controls
 * @returns {HTMLElement}
 */
function buildAudioPlayer(src, label) {
  // ── Create native <audio> ────────────────────────
  const audio = new Audio();
  audio.preload = 'metadata';

  // ── Build container HTML ─────────────────────────
  const wrap = document.createElement('div');
  wrap.className = 'audio-player';
  wrap.innerHTML = `
    <div class="audio-player-label">${label || '▶ Putar Audio'}</div>
    <div class="audio-controls">
      <button class="audio-play-btn" aria-label="Play / Pause">
        <svg class="icon-play" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg class="icon-pause" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="display:none">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      <span class="audio-time">0:00 / 0:00</span>
      <div class="audio-progress-wrap" role="progressbar" aria-label="Audio progress">
        <div class="audio-progress-fill"></div>
      </div>
    </div>
    <audio controls style="width:100%;margin-top:8px;border-radius:6px;" preload="metadata">
      <source type="audio/mpeg">
      <p>Browser tidak mendukung audio.
        <a href="${src}" target="_blank" rel="noopener">Unduh</a>
      </p>
    </audio>
  `;

  // ── Grab element refs ────────────────────────────
  const playBtn   = wrap.querySelector('.audio-play-btn');
  const iconPlay  = wrap.querySelector('.icon-play');
  const iconPause = wrap.querySelector('.icon-pause');
  const timeEl    = wrap.querySelector('.audio-time');
  const progWrap  = wrap.querySelector('.audio-progress-wrap');
  const progFill  = wrap.querySelector('.audio-progress-fill');
  const nativeEl  = wrap.querySelector('audio');
  const sourceEl  = wrap.querySelector('source');

  // Set src on both elements
  sourceEl.src = src;
  nativeEl.load();
  audio.src = src;

  // ── Sync custom UI with playback state ───────────
  function setPlaying(isPlaying) {
    iconPlay.style.display  = isPlaying ? 'none' : '';
    iconPause.style.display = isPlaying ? ''     : 'none';
  }

  function resetProgress() {
    progFill.style.width = '0%';
    timeEl.textContent   = `0:00 / ${fmtTime(nativeEl.duration || 0)}`;
  }

  // ── Wire custom play/pause button ────────────────
  playBtn.addEventListener('click', () => {
    // Stop any other audio that's playing
    if (_activeAudio && _activeAudio !== nativeEl) {
      _activeAudio.pause();
      _activeAudio.currentTime = 0;
      // Reset the other player's icon if possible
    }
    _activeAudio = nativeEl;

    if (nativeEl.paused) {
      nativeEl.play().catch((err) => {
        console.warn('Audio play failed:', err);
      });
    } else {
      nativeEl.pause();
    }
  });

  // ── Native audio event listeners ─────────────────
  nativeEl.addEventListener('play',  () => setPlaying(true));
  nativeEl.addEventListener('pause', () => setPlaying(false));

  nativeEl.addEventListener('ended', () => {
    setPlaying(false);
    resetProgress();
    _activeAudio = null;
  });

  nativeEl.addEventListener('loadedmetadata', () => {
    timeEl.textContent = `0:00 / ${fmtTime(nativeEl.duration)}`;
  });

  nativeEl.addEventListener('timeupdate', () => {
    if (!nativeEl.duration) return;
    const pct = (nativeEl.currentTime / nativeEl.duration) * 100;
    progFill.style.width = `${pct}%`;
    timeEl.textContent   = `${fmtTime(nativeEl.currentTime)} / ${fmtTime(nativeEl.duration)}`;
  });

  // Keep custom UI in sync when user uses native controls
  nativeEl.addEventListener('play',  () => { _activeAudio = nativeEl; setPlaying(true);  });
  nativeEl.addEventListener('pause', () => setPlaying(false));

  // ── Clickable / seekable progress bar ────────────
  progWrap.addEventListener('click', (e) => {
    if (!nativeEl.duration) return;
    const rect = progWrap.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    nativeEl.currentTime = Math.max(0, Math.min(pct * nativeEl.duration, nativeEl.duration));
  });

  return wrap;
}
