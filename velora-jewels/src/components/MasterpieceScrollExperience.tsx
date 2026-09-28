import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { Sparkles, Gem, ShieldCheck, ArrowRight, Flame, Award } from 'lucide-react';

export type AnimationChapter = 'diamond' | 'gold';

interface MasterpieceScrollExperienceProps {
  onInquirePiece: (pieceName: string) => void;
  onExploreCollections: () => void;
}

const TOTAL_FRAMES = 239;

export const MasterpieceScrollExperience: React.FC<MasterpieceScrollExperienceProps> = ({
  onInquirePiece,
  onExploreCollections,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Separate image caches for Diamond and Gold Flow chapters
  const diamondImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const diamondLoadedRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES));
  const goldImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const goldLoadedRef = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAMES));

  const [activeChapter, setActiveChapter] = useState<AnimationChapter>('diamond');
  const currentRenderedIdx = useRef<number>(-1);
  const [loadProgress, setLoadProgress] = useState<{ diamond: number; gold: number }>({ diamond: 0, gold: 0 });

  // Scroll Progress across this 360vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollProgressVal, setScrollProgressVal] = useState<number>(0);

  // Path helper
  const getFramePath = (chapter: AnimationChapter, index: number) => {
    const formatted = String(index).padStart(6, '0');
    return chapter === 'diamond' 
      ? `frames/frame_${formatted}.jpg` 
      : `gold_frames/frame_${formatted}.jpg`;
  };

  // Draw image with object-fit: cover
  const drawImageCover = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    if (!img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

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
  }, []);

  // Find nearest loaded frame to eliminate flickering
  const findNearestLoadedFrame = useCallback((chapter: AnimationChapter, targetIdx: number): number => {
    const loadedRef = chapter === 'diamond' ? diamondLoadedRef.current : goldLoadedRef.current;
    const images = chapter === 'diamond' ? diamondImagesRef.current : goldImagesRef.current;

    if (loadedRef[targetIdx] === 1 && images[targetIdx]) {
      return targetIdx;
    }

    let minDiff = Infinity;
    let bestIdx = -1;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (loadedRef[i] === 1 && images[i]) {
        const diff = Math.abs(i - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      }
    }

    return bestIdx;
  }, []);

  // Render a specific frame onto canvas
  const renderFrame = useCallback((frameIdx: number, force = false, overrideChapter?: AnimationChapter) => {
    const chapter = overrideChapter || activeChapter;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const validFrame = findNearestLoadedFrame(chapter, frameIdx);
    if (validFrame === -1) return;

    if (force || validFrame !== currentRenderedIdx.current) {
      const images = chapter === 'diamond' ? diamondImagesRef.current : goldImagesRef.current;
      const img = images[validFrame];
      if (img && img.complete) {
        drawImageCover(ctx, canvas, img);
        currentRenderedIdx.current = validFrame;
      }
    }
  }, [activeChapter, findNearestLoadedFrame, drawImageCover]);

  // Canvas resize with retina DPR support
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      if (currentRenderedIdx.current >= 0) {
        renderFrame(currentRenderedIdx.current, true);
      }
    }
  }, [renderFrame]);

  // Preloading priority queue for both Diamond and Gold chapters
  useEffect(() => {
    let diamondCount = 0;
    let goldCount = 0;

    const setupPreload = (chapter: AnimationChapter, isPrimary: boolean) => {
      const images = chapter === 'diamond' ? diamondImagesRef.current : goldImagesRef.current;
      const loadedRef = chapter === 'diamond' ? diamondLoadedRef.current : goldLoadedRef.current;

      // 1. Immediately load frame 0
      const firstImg = new Image();
      firstImg.src = getFramePath(chapter, 0);
      images[0] = firstImg;
      firstImg.onload = () => {
        loadedRef[0] = 1;
        if (chapter === 'diamond') {
          diamondCount++;
          setLoadProgress(prev => ({ ...prev, diamond: Math.round((diamondCount / TOTAL_FRAMES) * 100) }));
          handleResize();
          renderFrame(0, true, 'diamond');
        } else {
          goldCount++;
          setLoadProgress(prev => ({ ...prev, gold: Math.round((goldCount / TOTAL_FRAMES) * 100) }));
        }
      };

      // 2. Keyframes (every 6 frames)
      const keyframes: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 6) {
        if (i !== 0) keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES - 1)) {
        keyframes.push(TOTAL_FRAMES - 1);
      }

      // 3. Remaining frames
      const remaining: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!keyframes.includes(i)) {
          remaining.push(i);
        }
      }

      const queue = [...keyframes, ...remaining];
      const maxWorkers = isPrimary ? 6 : 4;
      let activeWorkers = 0;

      const processQueue = () => {
        while (activeWorkers < maxWorkers && queue.length > 0) {
          const idx = queue.shift();
          if (idx === undefined || images[idx]) continue;

          activeWorkers++;
          const img = new Image();
          img.src = getFramePath(chapter, idx);
          images[idx] = img;

          img.onload = () => {
            loadedRef[idx] = 1;
            activeWorkers--;
            if (chapter === 'diamond') {
              diamondCount++;
              setLoadProgress(prev => ({ ...prev, diamond: Math.round((diamondCount / TOTAL_FRAMES) * 100) }));
            } else {
              goldCount++;
              setLoadProgress(prev => ({ ...prev, gold: Math.round((goldCount / TOTAL_FRAMES) * 100) }));
            }
            processQueue();
          };

          img.onerror = () => {
            activeWorkers--;
            processQueue();
          };
        }
      };

      if (isPrimary) {
        processQueue();
      } else {
        setTimeout(processQueue, 300);
      }
    };

    setupPreload('diamond', true);
    setupPreload('gold', false);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, renderFrame]);

  // Link scroll progress to frame index with smooth damping
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latestProgress) => {
      setScrollProgressVal(latestProgress);
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(latestProgress * (TOTAL_FRAMES - 1)))
      );
      renderFrame(targetFrame);
    });

    return () => unsubscribe();
  }, [scrollYProgress, renderFrame]);

  // Switch chapter handler
  const handleSelectChapter = (chapter: AnimationChapter) => {
    setActiveChapter(chapter);
    const currentFrame = currentRenderedIdx.current >= 0 ? currentRenderedIdx.current : 0;
    renderFrame(currentFrame, true, chapter);
  };

  const activeCardIndex = scrollProgressVal < 0.33 ? 0 : scrollProgressVal < 0.67 ? 1 : 2;

  const currentPieceTitle = activeChapter === 'diamond' 
    ? 'The Aarya Diamond Solitaire' 
    : 'The Jaipur Royal Kundan Altar';

  return (
    <section 
      ref={containerRef} 
      id="masterpiece-experience" 
      className="relative w-full h-[350vh] bg-[#09090b] border-t border-[#1f1b15]"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Fullscreen Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[1.03] contrast-[1.06]"
        />

        {/* Ambient Radial Luxury Vignette & Subtle Gold Atmosphere */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_42%,rgba(9,9,11,0.65)_78%,rgba(9,9,11,0.94)_100%] pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/85 via-transparent to-[#09090b]/90 pointer-events-none z-1" />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vh] pointer-events-none z-1 transition-all duration-700 ${
            activeChapter === 'diamond'
              ? 'bg-radial-[circle,rgba(191,231,247,0.06)_0%,transparent_70%]'
              : 'bg-radial-[circle,rgba(212,175,55,0.08)_0%,transparent_70%]'
          }`} 
        />

        {/* Chapter Selection Bar (Top Left) */}
        <div className="absolute top-24 left-4 sm:left-10 z-20 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#121110]/85 backdrop-blur-xl border border-[#d4af37]/30 shadow-2xl">
            <button
              onClick={() => handleSelectChapter('diamond')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeChapter === 'diamond'
                  ? 'bg-gradient-to-r from-[#e0f2fe]/20 to-[#38bdf8]/20 text-[#f0f9ff] border border-[#7dd3fc]/60 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              <Gem className={`w-3.5 h-3.5 ${activeChapter === 'diamond' ? 'text-[#7dd3fc]' : 'text-[#64748b]'}`} />
              <span>Ch. 01 · Diamond Spark</span>
            </button>

            <button
              onClick={() => handleSelectChapter('gold')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeChapter === 'gold'
                  ? 'bg-gradient-to-r from-[#d4af37]/25 to-[#f5d77f]/25 text-[#fff8eb] border border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#9c917f] hover:text-[#faedd0]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeChapter === 'gold' ? 'text-[#d4af37]' : 'text-[#736754]'}`} />
              <span>Ch. 02 · Gold Flow</span>
            </button>
          </div>
        </div>

        {/* Narrative Story Cards (Left Column) */}
        <div className="absolute left-4 sm:left-10 max-w-md w-[92%] sm:w-auto z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            {activeChapter === 'diamond' && (
              <motion.div
                key={`diamond-${activeCardIndex}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0e0d11]/85 backdrop-blur-2xl border border-[#7dd3fc]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto"
              >
                {activeCardIndex === 0 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7dd3fc] font-semibold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Act 01 · Optical Symmetry</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f8fafc] font-light leading-tight">
                      58 Symmetrical Facets of Light
                    </h3>
                    <p className="text-xs sm:text-sm text-[#cbd5e1] font-light leading-relaxed mt-2.5">
                      Cut with nanometer laser precision. Light enters through the crown table, undergoes total internal reflection, and disperses into brilliant fire.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#1e293b]">
                      <div className="text-center p-2 rounded-lg bg-[#111827]/80 border border-[#1e293b]">
                        <div className="text-xs font-semibold text-[#f8fafc]">0.044</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Dispersion</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#111827]/80 border border-[#1e293b]">
                        <div className="text-xs font-semibold text-[#f8fafc]">Triple Ex</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Cut & Polish</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#111827]/80 border border-[#1e293b]">
                        <div className="text-xs font-semibold text-[#7dd3fc]">D / FL</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Color & Clarity</div>
                      </div>
                    </div>
                  </>
                )}

                {activeCardIndex === 1 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7dd3fc] font-semibold mb-2">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Act 02 · Refractive Brilliance</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f8fafc] font-light leading-tight">
                      Pure Prismatic Scintillation
                    </h3>
                    <p className="text-xs sm:text-sm text-[#cbd5e1] font-light leading-relaxed mt-2.5">
                      Every rotation angle unleashes dynamic spectral scintillation. Hand-selected for ideal pavilion depth to eliminate light leakage.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#1e293b]">
                      <div className="text-center p-2 rounded-lg bg-[#111827]/80 border border-[#1e293b]">
                        <div className="text-xs font-semibold text-[#f8fafc]">57.5%</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Table Ratio</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#111827]/80 border border-[#1e293b]">
                        <div className="text-xs font-semibold text-[#f8fafc]">34.5°</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Crown Angle</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#111827]/80 border border-[#1e293b]">
                        <div className="text-xs font-semibold text-[#7dd3fc]">Zero</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Fluorescence</div>
                      </div>
                    </div>
                  </>
                )}

                {activeCardIndex === 2 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7dd3fc] font-semibold mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Act 03 · Heirloom Devotion</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f8fafc] font-light leading-tight">
                      Certified Haute Joaillerie
                    </h3>
                    <p className="text-xs sm:text-sm text-[#cbd5e1] font-light leading-relaxed mt-2.5">
                      Accompanied by dual GIA & IGI dossiers, laser inscription, and lifetime complimentary atelier care at our Jaipur flagship.
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1e293b]">
                      <button
                        onClick={() => onInquirePiece(currentPieceTitle)}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-[#0f172a] font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Inquire Piece</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={onExploreCollections}
                        className="py-2.5 px-4 border border-[#7dd3fc]/40 text-[#f1f5f9] hover:text-white font-medium text-xs tracking-wider uppercase rounded-lg hover:bg-[#1e293b] transition-all"
                      >
                        Catalog
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeChapter === 'gold' && (
              <motion.div
                key={`gold-${activeCardIndex}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-2xl bg-[#0f0e11]/85 backdrop-blur-2xl border border-[#d4af37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto"
              >
                {activeCardIndex === 0 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
                      <Gem className="w-3.5 h-3.5" />
                      <span>Act 01 · Jaipur Kundan Heritage</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f3ea] font-light leading-tight">
                      Hand-Set in 18K & 22K Gold
                    </h3>
                    <p className="text-xs sm:text-sm text-[#b8ad9a] font-light leading-relaxed mt-2.5">
                      Forged by 4th-generation Jaipur karigars. Each bezel is crafted with 24K gold foil setting embracing uncut natural polki and emeralds securely.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#2a241b]">
                      <div className="text-center p-2 rounded-lg bg-[#181613]/70 border border-[#362f22]">
                        <div className="text-xs font-semibold text-[#f8f5ee]">BIS 916</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#9c907b]">Hallmarked</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#181613]/70 border border-[#362f22]">
                        <div className="text-xs font-semibold text-[#f8f5ee]">42 MI Rd</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#9c907b]">Jaipur Studio</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#181613]/70 border border-[#362f22]">
                        <div className="text-xs font-semibold text-[#d4af37]">100%</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#9c907b]">Handmade</div>
                      </div>
                    </div>
                  </>
                )}

                {activeCardIndex === 1 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
                      <Award className="w-3.5 h-3.5" />
                      <span>Act 02 · Royal Altar Molten Gold</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f3ea] font-light leading-tight">
                      Flowing Curves of Purity
                    </h3>
                    <p className="text-xs sm:text-sm text-[#b8ad9a] font-light leading-relaxed mt-2.5">
                      Molten gold sculpture inspired by Rajasthan palace arches. Hand-polished to a warm, deep luster that catches candlelight with unmatched warmth.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#2a241b]">
                      <div className="text-center p-2 rounded-lg bg-[#181613]/70 border border-[#362f22]">
                        <div className="text-xs font-semibold text-[#f8f5ee]">22K / 18K</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#9c907b]">Gold Purity</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#181613]/70 border border-[#362f22]">
                        <div className="text-xs font-semibold text-[#f8f5ee]">Polki</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#9c907b]">Uncut Gem</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#181613]/70 border border-[#362f22]">
                        <div className="text-xs font-semibold text-[#d4af37]">Enamel</div>
                        <div className="text-[9px] uppercase tracking-wider text-[#9c907b]">Meenakari</div>
                      </div>
                    </div>
                  </>
                )}

                {activeCardIndex === 2 && (
                  <>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Act 03 · Eternal Heirloom</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f3ea] font-light leading-tight">
                      Designed for Generations
                    </h3>
                    <p className="text-xs sm:text-sm text-[#b8ad9a] font-light leading-relaxed mt-2.5">
                      A bridal crown treasure preserved across centuries. Custom private commissions available with lifetime buyback guarantee and certificate of origin.
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#2a241b]">
                      <button
                        onClick={() => onInquirePiece(currentPieceTitle)}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-[#0b0b0d] font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Inquire Piece</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={onExploreCollections}
                        className="py-2.5 px-4 border border-[#d4af37]/50 text-[#ede7dc] hover:text-[#faedd0] font-medium text-xs tracking-wider uppercase rounded-lg hover:bg-[#1a1713] transition-all"
                      >
                        Catalog
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
