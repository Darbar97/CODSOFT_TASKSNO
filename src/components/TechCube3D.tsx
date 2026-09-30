import React, { useState, useRef, useEffect } from 'react';
import { Layers, Bot, Code2, Sparkles, Terminal, Cpu, RotateCw, Play, Pause } from 'lucide-react';

export const TechCube3D: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -16, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!autoRotate || isDragging) return;

    let prevTime = performance.now();
    const animate = (time: number) => {
      // Pause animation if page is hidden to save resources
      if (document.hidden) {
        prevTime = time;
        animFrameId.current = requestAnimationFrame(animate);
        return;
      }
      const delta = (time - prevTime) / 1000;
      prevTime = time;
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + delta * 18) % 360,
      }));
      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [autoRotate, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore if pointer capture is not supported
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.45)),
      y: (prev.y + deltaX * 0.45) % 360,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const faces = [
    {
      label: 'React',
      sub: 'Frontend Architecture',
      icon: Layers,
      color: 'from-cyan-500/20 to-blue-700/20 border-cyan-400/50 text-cyan-800 dark:text-cyan-300',
      transform: 'rotateY(0deg) translateZ(80px)',
    },
    {
      label: 'Generative AI',
      sub: 'TCS iON Certified',
      icon: Sparkles,
      color: 'from-purple-500/20 to-indigo-700/20 border-purple-400/50 text-purple-700 dark:text-purple-300',
      transform: 'rotateY(90deg) translateZ(80px)',
    },
    {
      label: 'Python',
      sub: 'Scripting & AI Tools',
      icon: Terminal,
      color: 'from-amber-500/20 to-orange-600/20 border-amber-400/40 text-amber-700 dark:text-amber-400',
      transform: 'rotateY(180deg) translateZ(80px)',
    },
    {
      label: 'AI Agents',
      sub: 'IBM SkillsBuild',
      icon: Bot,
      color: 'from-emerald-500/20 to-teal-700/20 border-emerald-400/40 text-emerald-700 dark:text-emerald-300',
      transform: 'rotateY(-90deg) translateZ(80px)',
    },
    {
      label: 'JavaScript',
      sub: 'ES6+ & Async DOM',
      icon: Code2,
      color: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/40 text-yellow-700 dark:text-yellow-400',
      transform: 'rotateX(90deg) translateZ(80px)',
    },
    {
      label: 'Full Stack CI',
      sub: 'Git & Vercel Deploy',
      icon: Cpu,
      color: 'from-zinc-500/20 to-zinc-700/20 border-zinc-400/40 text-zinc-700 dark:text-zinc-300',
      transform: 'rotateX(-90deg) translateZ(80px)',
    },
  ];

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Scene Viewport */}
      <div
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000 touch-none max-w-full"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          className="relative w-36 h-36 sm:w-40 sm:h-40 preserve-3d"
        >
          {faces.map((face) => {
            const Icon = face.icon;
            return (
              <div
                key={face.label}
                style={{
                  transform: face.transform,
                  backfaceVisibility: 'visible',
                }}
                className={`absolute inset-0 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border shadow-lg flex flex-col items-center justify-center p-3 text-center transition-all bg-gradient-to-br ${face.color}`}
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 shadow-xs mb-1 sm:mb-1.5">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                  {face.label}
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {face.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 max-w-full">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          title={autoRotate ? 'Pause 3D rotation' : 'Start 3D rotation'}
          aria-label={autoRotate ? 'Pause 3D cube rotation' : 'Start 3D cube auto rotation'}
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{autoRotate ? 'Pause 3D' : 'Auto Rotate'}</span>
        </button>

        <button
          type="button"
          onClick={() => setRotation({ x: -16, y: 35 })}
          className="p-2 sm:p-1.5 min-h-[38px] min-w-[38px] sm:min-h-0 sm:min-w-0 flex items-center justify-center text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          title="Reset 3D view"
          aria-label="Reset 3D cube rotation to initial angle"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 italic">
          (Swipe or drag in 3D)
        </span>
      </div>
    </div>
  );
};
