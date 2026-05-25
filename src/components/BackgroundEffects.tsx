import { useEffect, useState } from 'react';

export default function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPercent(window.scrollY / scrollHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Soft cursor fluid lagging logic
  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      setMousePosition((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.06,
          y: prev.y + dy * 0.06,
        };
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-[#0C0C0C]">
      {/* Primary Electric Blue Aura Follower */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.14] mix-blend-screen pointer-events-none transition-transform duration-300"
        style={{
          background: 'radial-gradient(circle, #007CE7 0%, #002B5C 50%, transparent 100%)',
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      />

      {/* Secondary Ambient Cyber Indigo Static Centerpiece */}
      <div
        className="absolute top-1/4 left-1/3 w-[800px] h-[600px] rounded-full blur-[180px] opacity-[0.06] mix-blend-color-dodge pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0D47A1 0%, #000B21 70%, transparent 100%)',
        }}
      />

      {/* Electric grid lines reacting to cursor slide */}
      <div 
        className="absolute inset-0 opacity-[0.02] dot-grid-bg"
        style={{
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.015}px, ${(mousePosition.y - window.innerHeight / 2) * -0.015}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* Modern cyber corner tickers for brand-authenticity */}
      <div className="absolute top-[3vh] left-[4vw] text-[9px] font-mono whitespace-nowrap opacity-[0.25] tracking-[0.2em] uppercase text-[#D7E2EA]">
        SYSTEM // CSTACK_NODE_INIT
      </div>
      <div className="absolute top-[3vh] right-[4vw] text-[9px] font-mono whitespace-nowrap opacity-[0.25] tracking-[0.2em] uppercase text-[#D7E2EA]">
        SECTOR // WORLD_WIDE_ENG_v2.0
      </div>

      <div className="absolute bottom-[3vh] left-[4vw] text-[9px] font-mono whitespace-nowrap opacity-[0.15] tracking-[0.2em] uppercase text-[#D7E2EA]">
        ACCURACY RATE // 99.8% EST
      </div>
      <div className="absolute bottom-[3vh] right-[4vw] text-[9px] font-mono whitespace-nowrap opacity-[0.15] tracking-[0.2em] uppercase text-[#D7E2EA]">
        LATENCY // 0.12MS CORE
      </div>
    </div>
  );
}
