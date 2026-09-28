/**
 * AURELIA HAUTE JOAILLERIE
 * Pure Full-Screen Scroll Engine: Diamond Spark & Gold Flow
 */
(function () {
  'use strict';

  const FRAME_COUNT = 239;

  // Frame path helpers
  const getDiamondFramePath = (index) =>
    `frames/frame_${String(index).padStart(6, '0')}.jpg`;

  const getGoldFramePath = (index) =>
    `gold_frames/frame_${String(index).padStart(6, '0')}.jpg`;

  // DOM Elements
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderStatus = document.getElementById('preloader-status');

  // Section 1: Diamond
  const diamondSection = document.getElementById('section-diamond');
  const diamondCanvas = document.getElementById('diamond-canvas');
  const diamondCtx = diamondCanvas ? diamondCanvas.getContext('2d', { alpha: false }) : null;

  // Section 2: Gold Flow
  const goldSection = document.getElementById('section-gold');
  const goldCanvas = document.getElementById('gold-canvas');
  const goldCtx = goldCanvas ? goldCanvas.getContext('2d', { alpha: false }) : null;

  // Animation & Rendering State
  const diamondState = {
    canvas: diamondCanvas,
    ctx: diamondCtx,
    images: new Array(FRAME_COUNT),
    loadedStatus: new Uint8Array(FRAME_COUNT),
    targetProgress: 0,
    currentProgress: 0,
    renderedIndex: -1,
    frameCount: FRAME_COUNT,
    getPath: getDiamondFramePath
  };

  const goldState = {
    canvas: goldCanvas,
    ctx: goldCtx,
    images: new Array(FRAME_COUNT),
    loadedStatus: new Uint8Array(FRAME_COUNT),
    targetProgress: 0,
    currentProgress: 0,
    renderedIndex: -1,
    frameCount: FRAME_COUNT,
    getPath: getGoldFramePath
  };

  let dpr = 1;

  // --------------------------------------------------------------------------
  // Canvas Sizing and Drawing Helpers
  // --------------------------------------------------------------------------
  function resizeSingleCanvas(state) {
    if (!state.canvas || !state.ctx) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (state.canvas.width !== targetWidth || state.canvas.height !== targetHeight) {
      state.canvas.width = targetWidth;
      state.canvas.height = targetHeight;
      state.ctx.imageSmoothingEnabled = true;
      state.ctx.imageSmoothingQuality = 'high';

      // Re-draw current frame immediately
      if (state.renderedIndex >= 0) {
        renderFrame(state, state.renderedIndex, true);
      }
    }
  }

  function resizeAllCanvases() {
    resizeSingleCanvas(diamondState);
    resizeSingleCanvas(goldState);
  }

  // Draw image preserving aspect ratio (object-fit: cover)
  function drawImageCover(ctx, canvas, img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = cw;
      drawHeight = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawHeight) * 0.5;
    } else {
      drawHeight = ch;
      drawWidth = ch * imgRatio;
      offsetX = (cw - drawWidth) * 0.5;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Find nearest loaded frame to eliminate flickering
  function findNearestLoadedFrame(state, targetIdx) {
    if (state.loadedStatus[targetIdx] === 1 && state.images[targetIdx]) {
      return targetIdx;
    }

    let minDiff = Infinity;
    let bestIdx = -1;

    for (let i = 0; i < state.frameCount; i++) {
      if (state.loadedStatus[i] === 1 && state.images[i]) {
        const diff = Math.abs(i - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      }
    }

    return bestIdx;
  }

  function renderFrame(state, frameIndex, force = false) {
    const validFrame = findNearestLoadedFrame(state, frameIndex);
    if (validFrame === -1 || !state.ctx) return;

    if (force || validFrame !== state.renderedIndex) {
      const img = state.images[validFrame];
      if (img && img.complete) {
        drawImageCover(state.ctx, state.canvas, img);
        state.renderedIndex = validFrame;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Intelligent Frame Preloader & Priority Queue
  // --------------------------------------------------------------------------
  let initialLoadedCount = 0;
  let totalPreloaded = 0;
  const TOTAL_FRAMES_ALL = FRAME_COUNT * 2;

  function updatePreloaderProgress() {
    totalPreloaded++;
    const pct = Math.min(100, Math.round((totalPreloaded / TOTAL_FRAMES_ALL) * 100));
    if (preloaderBar) {
      preloaderBar.style.width = `${pct}%`;
    }
    if (preloaderStatus) {
      preloaderStatus.textContent = `PREPARING ATELIER FRAMES (${pct}%)...`;
    }
  }

  function dismissPreloader() {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      document.body.classList.remove('loading-state');
    }
  }

  function checkInitialReady() {
    initialLoadedCount++;
    // Once frame 0 of both Diamond and Gold are loaded, dismiss preloader
    if (initialLoadedCount >= 2) {
      setTimeout(() => {
        dismissPreloader();
      }, 300);
    }
  }

  function setupPreloading(state, isFirstSection = true) {
    // 1. Immediately load frame 0
    const firstImg = new Image();
    firstImg.src = state.getPath(0);
    state.images[0] = firstImg;
    firstImg.onload = () => {
      state.loadedStatus[0] = 1;
      resizeSingleCanvas(state);
      renderFrame(state, 0, true);
      updatePreloaderProgress();
      checkInitialReady();
    };
    firstImg.onerror = () => {
      checkInitialReady();
    };

    // 2. Prioritize keyframes (every 6 frames)
    const keyframes = [];
    for (let i = 0; i < state.frameCount; i += 6) {
      if (i !== 0) keyframes.push(i);
    }
    if (!keyframes.includes(state.frameCount - 1)) {
      keyframes.push(state.frameCount - 1);
    }

    // 3. Fill in the rest
    const remaining = [];
    for (let i = 1; i < state.frameCount; i++) {
      if (!keyframes.includes(i)) {
        remaining.push(i);
      }
    }

    const queue = [...keyframes, ...remaining];
    const maxWorkers = isFirstSection ? 6 : 4;
    let activeWorkers = 0;

    function processQueue() {
      while (activeWorkers < maxWorkers && queue.length > 0) {
        const idx = queue.shift();
        if (state.images[idx]) continue;

        activeWorkers++;
        const img = new Image();
        img.src = state.getPath(idx);
        state.images[idx] = img;

        img.onload = () => {
          state.loadedStatus[idx] = 1;
          activeWorkers--;
          updatePreloaderProgress();

          // If this frame corresponds to current scrub position, render it
          const currentTarget = Math.round(state.currentProgress * (state.frameCount - 1));
          if (idx === currentTarget || state.renderedIndex === -1) {
            renderFrame(state, currentTarget, true);
          }
          processQueue();
        };

        img.onerror = () => {
          activeWorkers--;
          processQueue();
        };
      }
    }

    // Delay secondary section slightly so primary section keyframes load first
    if (isFirstSection) {
      processQueue();
    } else {
      setTimeout(processQueue, 250);
    }
  }

  // --------------------------------------------------------------------------
  // Scroll Position Calculations
  // --------------------------------------------------------------------------
  function calculateSectionProgress(section) {
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) return 0;

    const currentOffset = -rect.top;
    return Math.max(0, Math.min(1, currentOffset / scrollableDistance));
  }

  function updateScrollTargets() {
    // Update progress targets based on scroll positions
    diamondState.targetProgress = calculateSectionProgress(diamondSection);
    goldState.targetProgress = calculateSectionProgress(goldSection);
  }

  // --------------------------------------------------------------------------
  // Main Animation Loop with Damped Lerp Scrubbing
  // --------------------------------------------------------------------------
  function updateSectionRender(state, sectionEl) {
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

    // Linear interpolation for silky smooth inertia
    const ease = 0.12;
    const diff = state.targetProgress - state.currentProgress;

    if (Math.abs(diff) > 0.0001) {
      state.currentProgress += diff * ease;
    } else {
      state.currentProgress = state.targetProgress;
    }

    const targetFrame = Math.min(
      state.frameCount - 1,
      Math.max(0, Math.round(state.currentProgress * (state.frameCount - 1)))
    );

    // Only render canvas when on screen
    if (isVisible) {
      renderFrame(state, targetFrame);
    }
  }

  function animationLoop() {
    updateSectionRender(diamondState, diamondSection);
    updateSectionRender(goldState, goldSection);

    requestAnimationFrame(animationLoop);
  }

  // --------------------------------------------------------------------------
  // Event Bindings
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    window.addEventListener('scroll', updateScrollTargets, { passive: true });
    window.addEventListener('resize', () => {
      resizeAllCanvases();
      updateScrollTargets();
    });
  }

  // --------------------------------------------------------------------------
  // Initialization Sequence
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    resizeAllCanvases();
    setupPreloading(diamondState, true);
    setupPreloading(goldState, false);
    setupEventListeners();
    updateScrollTargets();
    requestAnimationFrame(animationLoop);

    // Failsafe preloader timeout (after 3.5s max, always reveal)
    setTimeout(() => {
      dismissPreloader();
    }, 3500);
  });
})();
