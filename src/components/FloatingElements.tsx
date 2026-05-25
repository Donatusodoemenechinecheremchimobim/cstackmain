import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code, Smartphone, Grid, Video, Landmark } from 'lucide-react';

interface FloatingElementsProps {
  tilt: { x: number; y: number };
}

interface FloatingBadge {
  id: string;
  label: string;
  icon: ReactNode;
  color: string;
  dotColor: string;
  x: string; // horizontal percentage coordinate
  y: string; // vertical percentage coordinate
  speedX: number; // custom parallax horizontal speed multiplier
  speedY: number; // custom parallax vertical speed multiplier
  rotate: number; // default tilt angle
  sizeMobile: string; // visibility adjustments for responsive layouts
}

interface FloatingImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  x: string;
  y: string;
  speedX: number;
  speedY: number;
  rotate: number;
  size: string; // width
}

export default function FloatingElements({ tilt }: FloatingElementsProps) {
  // Configured high-end floating capsule badges
  const BADGES: FloatingBadge[] = [
    {
      id: 'badge-1',
      label: 'FINTECH APPS',
      icon: <Landmark className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      color: 'border-emerald-500/20 bg-emerald-950/10 text-emerald-300',
      dotColor: 'bg-emerald-400',
      x: '12%',
      y: '18%',
      speedX: 0.8,
      speedY: 0.6,
      rotate: -6,
      sizeMobile: 'scale-90 opacity-60 sm:opacity-100'
    },
    {
      id: 'badge-2',
      label: 'BESPOKE WEBSITES',
      icon: <Code className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
      color: 'border-blue-500/20 bg-blue-950/10 text-blue-300',
      dotColor: 'bg-blue-400',
      x: '82%',
      y: '15%',
      speedX: -1.2,
      speedY: 0.8,
      rotate: 5,
      sizeMobile: 'scale-90 opacity-60 sm:opacity-100'
    },
    {
      id: 'badge-3',
      label: 'GRAPHIC DESIGNING',
      icon: <Grid className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      color: 'border-amber-500/20 bg-amber-950/10 text-amber-300',
      dotColor: 'bg-amber-400',
      x: '86%',
      y: '55%',
      speedX: -0.8,
      speedY: -1.0,
      rotate: -4,
      sizeMobile: 'scale-85 opacity-50 sm:opacity-100'
    },
    {
      id: 'badge-4',
      label: 'MOBILE APPS',
      icon: <Smartphone className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
      color: 'border-purple-500/20 bg-purple-950/10 text-purple-300',
      dotColor: 'bg-purple-400',
      x: '15%',
      y: '58%',
      speedX: 1.1,
      speedY: -0.7,
      rotate: 8,
      sizeMobile: 'scale-85 opacity-50 sm:opacity-100'
    },
    {
      id: 'badge-5',
      label: 'CREATIVE BLUEPRINTS',
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
      color: 'border-indigo-500/20 bg-indigo-950/10 text-indigo-300',
      dotColor: 'bg-indigo-400',
      x: '75%',
      y: '80%',
      speedX: -0.6,
      speedY: -0.5,
      rotate: -3,
      sizeMobile: 'hidden lg:flex'
    },
    {
      id: 'badge-6',
      label: '3D & MOTION GRAPHICS',
      icon: <Video className="w-3.5 h-3.5 text-pink-400 shrink-0" />,
      color: 'border-pink-500/20 bg-pink-950/10 text-pink-300',
      dotColor: 'bg-pink-400',
      x: '20%',
      y: '82%',
      speedX: 0.5,
      speedY: 0.9,
      rotate: 4,
      sizeMobile: 'hidden lg:flex'
    }
  ];

  // Visual thumbnail cards of real project mockups floated in negative space
  const PREVIEW_IMAGES: FloatingImage[] = [
    {
      id: 'pic-1',
      title: 'AETHER DIGITAL PORTAL',
      category: 'CREATIVE DESIGN',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      x: '8%',
      y: '35%',
      speedX: 0.9,
      speedY: 0.4,
      rotate: -8,
      size: 'w-24 sm:w-32 md:w-36 lg:w-44'
    },
    {
      id: 'pic-2',
      title: 'HEXAFLOW CONTROLLER',
      category: 'MOBILE PLATFORM',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
      x: '78%',
      y: '32%',
      speedX: -1.0,
      speedY: -0.5,
      rotate: 7,
      size: 'w-24 sm:w-32 md:w-36 lg:w-44'
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10 w-full h-full">
      {/* Background Floating Capsule Badges layer */}
      {BADGES.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${b.color} ${b.sizeMobile}`}
          style={{
            left: b.x,
            top: b.y,
          }}
          animate={{
            x: tilt.x * b.speedX * 1.2,
            y: tilt.y * b.speedY * 1.2,
            rotate: b.rotate,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 25 }}
        >
          {/* Pulsing indicator dot */}
          <span className={`w-1.5 h-1.5 rounded-full ${b.dotColor} animate-pulse shrink-0`} />
          {b.icon}
          <span className="text-[10px] font-mono tracking-wider font-extrabold whitespace-nowrap">
            {b.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Picture Cards with high-end glassframes */}
      {PREVIEW_IMAGES.map((img) => (
        <motion.div
          key={img.id}
          className={`absolute ${img.size} aspect-video bg-[#121212]/80 rounded-xl p-1.5 border border-white/5 shadow-2xl backdrop-blur-sm pointer-events-none transition-all duration-300 group`}
          style={{
            left: img.x,
            top: img.y,
          }}
          animate={{
            x: tilt.x * img.speedX * 1.5,
            y: tilt.y * img.speedY * 1.5,
            rotate: img.rotate,
          }}
          transition={{ type: 'spring', stiffness: 45, damping: 22 }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <img
              src={img.imageUrl}
              alt={img.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 saturate-[0.8] contrast-[1.1] transition-transform duration-500 hover:scale-105"
            />
            {/* Glossy sheen reflection filter */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            
            {/* Elegant tiny caption bar inside images */}
            <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#0C0C0C]/85 backdrop-blur-md py-1 px-1.5 rounded border border-white/5 flex justify-between items-center text-[7px] font-mono tracking-widest text-[#D7E2EA]/70">
              <span className="truncate">{img.title}</span>
              <span className="text-[#5E0ED7] font-black shrink-0 ml-1">CSTACK</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
