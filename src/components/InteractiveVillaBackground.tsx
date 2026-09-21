import { useState, useRef, useCallback, MouseEvent } from 'react';
import { motion } from 'motion/react';

export default function InteractiveVillaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive parallax offset driven by mouse/touch
  const [cameraOffset, setCameraOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    // Gentle camera tracking offset (max 15px)
    setCameraOffset({
      x: Math.max(-1, Math.min(1, x)) * -14,
      y: Math.max(-1, Math.min(1, y)) * -10,
    });
  }, []);

  const handleMouseLeave = () => {
    setCameraOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-auto select-none"
      id="cinematic-villa-camera-canvas"
    >
      {/* 
        Continuous Cinematic Camera Shot (Filming the villa with slow, continuous cinematic drone/gimbal glide)
        Combined with subtle mouse-directed camera tilt
      */}
      <motion.div
        className="absolute -inset-8 sm:-inset-14 w-[calc(100%+4rem)] sm:w-[calc(100%+7rem)] h-[calc(100%+4rem)] sm:h-[calc(100%+7rem)]"
        initial={{ scale: 1.04 }}
        animate={{ 
          scale: 1, 
          x: cameraOffset.x,
          y: cameraOffset.y,
        }}
        transition={{
          scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
          x: { type: 'spring', damping: 35, stiffness: 80 },
          y: { type: 'spring', damping: 35, stiffness: 80 }
        }}
      >
        <div className="w-full h-full animate-cinematic-camera">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=95"
            alt="تصوير سينمائي متحرك لفيلا معمارية حديثة"
            className="w-full h-full object-cover object-center filter saturate-[0.95] brightness-[1.04] contrast-[1.06]"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Dynamic Overlay: crystal clear on initial view, smoothly deepens for comfortable reading */}
      <motion.div 
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#F5F4F0]/30 via-[#F5F4F0]/60 to-[#F5F4F0]/95" 
      />

      {/* Editorial Architectural Grid Texture */}
      <div className="absolute inset-0 pointer-events-none bg-editorial-grid opacity-35 mix-blend-multiply" />
    </div>
  );
}
