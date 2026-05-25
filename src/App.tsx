import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ShieldAlert, ArrowUpRight, X } from 'lucide-react';
import { ContactMessage, ActivePanel } from './types';
import BackgroundEffects from './components/BackgroundEffects';
import InteractiveThreeDSphere from './components/InteractiveThreeDSphere';
import FloatingElements from './components/FloatingElements';
import WorkPanel from './components/WorkPanel';
import AboutPanel from './components/AboutPanel';
import PricingPanel from './components/PricingPanel';
import ContactPanel from './components/ContactPanel';
import InboxPanel from './components/InboxPanel';

const fadeDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.1,
    }
  })
};

export default function App() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('home');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Estmator bridge hooks
  const [prefilledSubject, setPrefilledSubject] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  // 3D parallax title movement with mobile touch support and continuous ambient 3D idle orbit sways
  useEffect(() => {
    let lastMoved = Date.now();
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 35; // multiplier for Y-axis rotation
      targetY = (e.clientY / innerHeight - 0.5) * -35; // multiplier for X-axis rotation
      lastMoved = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        targetX = (touch.clientX / innerWidth - 0.5) * 35;
        targetY = (touch.clientY / innerHeight - 0.5) * -35;
        lastMoved = Date.now();
      }
    };

    const updateTilt = () => {
      const time = Date.now() * 0.001; // elapsed time in seconds
      const elapsedSinceMove = Date.now() - lastMoved;

      let currentTargetX = targetX;
      let currentTargetY = targetY;

      // When there is no active input (mobile idle or inactive cursor), activate ambient floating orbit
      if (elapsedSinceMove > 1000) {
        // Slow gentle idle orbit using layered sine waves
        const orbitX = Math.sin(time * 0.7) * 16;
        const orbitY = Math.cos(time * 0.5) * 12;

        // Smoothly blend into the ambient sways
        const blendFactor = Math.min((elapsedSinceMove - 1000) / 1500, 1); // 1.5 seconds blend duration
        currentTargetX = targetX * (1 - blendFactor) + orbitX * blendFactor;
        currentTargetY = targetY * (1 - blendFactor) + orbitY * blendFactor;
      }

      setTilt((prev) => {
        // High-end spring-like dampening interpolation
        const dx = currentTargetX - prev.x;
        const dy = currentTargetY - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });

      animationFrameId = requestAnimationFrame(updateTilt);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateTilt);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Move proposal payload parameters into the contact drawer automatically
  const handleRequestProposal = (tierName: string, calculatedPrice?: string) => {
    setPrefilledSubject(`REQUISITION // ${tierName.toUpperCase()}`);
    setPrefilledMessage(
      `CSTACK REQUISITION COMMENCE PROTOCOL\n` +
      `------------------------------------\n` +
      `REQUEST SPEC: ${tierName.toUpperCase()}\n` +
      `ESTIMATED REQUISITION VALUE: ${calculatedPrice || 'TBD ON BRIEF'}\n\n` +
      `PLEASE INPUT COMPILATION PARAMETERS BELOW:`
    );
    // Switch drawers seamlessly
    setActivePanel('contact');
  };

  const handleClearPrefills = () => {
    setPrefilledSubject('');
    setPrefilledMessage('');
  };

  // Load persistent local messages cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem('cstack_portfolio_messages');
      if (cached) {
        setMessages(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Failed to parse local storage messages', e);
    }
  }, []);

  // Save new messages
  const handleNewMessage = (newMsg: ContactMessage) => {
    const updated = [newMsg, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem('cstack_portfolio_messages', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write to local storage', e);
    }
  };

  // Delete message
  const handleDeleteMessage = (id: string) => {
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    try {
      localStorage.setItem('cstack_portfolio_messages', JSON.stringify(filtered));
    } catch (e) {
      console.error('Failed to update local storage', e);
    }
  };

  // Clear all messages
  const handleClearAllMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem('cstack_portfolio_messages');
    } catch (e) {
      console.error('Failed to clear local storage', e);
    }
  };

  return (
    <div 
      className="relative flex flex-col justify-between min-h-screen text-[#D7E2EA] overflow-x-hidden select-none bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* 3D Moving Light/Particle Aura effects */}
      <BackgroundEffects />

      {/* Hero Header / Navigation bar */}
      <nav 
        id="hero-navbar"
        className="flex w-full items-center justify-between z-40 px-5 sm:px-8 md:px-12 pt-5 md:pt-6"
      >
        {/* Left: 32px circular logo with a 2px border in accent color (#5E0ED7) containing a 10px solid circle */}
        <motion.div
          id="navbar-logo"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeDownVariants}
          onClick={() => {
            setActivePanel('home');
            setIsMobileMenuOpen(false);
          }}
          className="w-8 h-8 rounded-full border-2 border-[#5E0ED7] flex items-center justify-center cursor-pointer"
        >
          <div className="w-[10px] h-[10px] rounded-full bg-[#5E0ED7]" />
        </motion.div>

        {/* Center: 4 nav links "Story", "Expertise", "Studios", "Feedback" matching 14px tracking-widest text-[#D7E2EA] / hover text-black for light overlays */}
        <div id="navbar-links-wrapper" className="hidden md:flex items-center gap-10">
          {[
            { label: 'Story', panel: 'about' as ActivePanel, idx: 1 },
            { label: 'Expertise', panel: 'work' as ActivePanel, idx: 2 },
            { label: 'Studios', panel: 'pricing' as ActivePanel, idx: 3 },
            { label: 'Feedback', panel: 'contact' as ActivePanel, idx: 4 }
          ].map((item) => (
            <motion.button
              key={item.label}
              custom={item.idx}
              initial="hidden"
              animate="visible"
              variants={fadeDownVariants}
              onClick={() => setActivePanel(item.panel)}
              className={`cursor-pointer uppercase tracking-widest transition-all hover:text-[#5E0ED7] text-[14px] font-semibold ${
                activePanel === item.panel ? 'text-[#5E0ED7]' : 'text-[#D7E2EA]'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Right: 36px round black hamburger button with three horizontal lines */}
        <motion.button
          id="hamburger-btn"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeDownVariants}
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 rounded-full bg-black border border-white/10 flex flex-col items-center justify-center gap-[4px] cursor-pointer"
          title="Open Menu"
        >
          <span className="w-4 h-[2px] bg-white rounded-full" />
          <span className="w-4 h-[2px] bg-white rounded-full" />
          <span className="w-4 h-[2px] bg-white rounded-full" />
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white text-black flex flex-col px-5 sm:px-8 md:px-12 pt-5 md:pt-6 pb-12"
          >
            {/* Top row */}
            <div className="flex w-full items-center justify-between">
              {/* same logo (left) */}
              <div 
                className="w-8 h-8 rounded-full border-2 border-[#5E0ED7] flex items-center justify-center"
              >
                <div className="w-[10px] h-[10px] rounded-full bg-[#5E0ED7]" />
              </div>

              {/* 36px round black close button with close X icon (right) */}
              <button
                id="close-mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
                title="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* vertical list of the 4 nav links */}
            <div className="flex flex-col items-start gap-8 mt-16">
              {[
                { label: 'Story', panel: 'about' as ActivePanel },
                { label: 'Expertise', panel: 'work' as ActivePanel },
                { label: 'Studios', panel: 'pricing' as ActivePanel },
                { label: 'Feedback', panel: 'contact' as ActivePanel }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActivePanel(item.panel);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-3xl font-semibold tracking-widest uppercase text-left hover:text-[#5E0ED7] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Bottom (mt-auto) Work With Us CTA */}
            <div className="mt-auto">
              <button
                onClick={() => {
                  setActivePanel('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 text-xl font-semibold tracking-widest text-[#5E0ED7] hover:opacity-80 transition-opacity uppercase"
              >
                <span>WORK WITH US</span>
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extreme 3D Interactive Typography Centerpiece */}
      <main 
        id="hero-display-content"
        className="flex flex-col items-center justify-center flex-grow text-center z-20 w-full overflow-hidden shrink-0 mt-6 sm:mt-4 md:-mt-5 select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center relative pointer-events-auto flex items-center justify-center min-h-[300px] sm:min-h-[460px] md:min-h-[580px]"
          style={{
            perspective: 1200,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Futuristic subtle background watermark */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] scale-[1.6] w-full flex justify-center overflow-hidden">
            <span className="text-[25vw] font-black uppercase tracking-tighter text-[#007CE7]">
              WEB.APP
            </span>
          </div>

          {/* Interactive 3D Holographic Globe constellation sphere */}
          <InteractiveThreeDSphere tilt={tilt} />

          {/* Floating specialty badge pill tabs & picture cards */}
          <FloatingElements tilt={tilt} />

          {/* Holographic 3D Typography Layer */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: tilt.y,
              rotateY: tilt.x,
              z: 20
            }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            className="relative select-none text-center flex items-center justify-center cursor-pointer"
            onClick={() => setActivePanel('work')}
          >
            {/* Ambient Deep Glow/Shadow Layer (Purple hex #5E0ED7) */}
            <span 
              className="absolute text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] font-black uppercase text-[#5E0ED7]/20 tracking-tight leading-none select-none blur-[6px]"
              style={{
                transform: 'translateZ(-40px)',
              }}
            >
              CSTACK
            </span>

            {/* Secondary Deep Glow (Cyber blue) */}
            <span 
              className="absolute text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] font-black uppercase text-[#007CE7]/30 tracking-tight leading-none select-none"
              style={{
                transform: 'translateZ(-20px)',
              }}
            >
              CSTACK
            </span>

            {/* Foreground Primary Heading */}
            <h1 
              id="hero-main-title"
              className="hero-heading font-black uppercase tracking-tight leading-none text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] transition-all duration-300"
              style={{
                transform: 'translateZ(0px)',
                textShadow: '0 15px 45px rgba(94, 14, 215, 0.35)'
              }}
            >
              CSTACK
            </h1>
          </motion.div>
        </motion.div>
      </main>

      {/* Interactive Footer & Contact trigger */}
      <footer 
        id="hero-bottom-bar"
        className="flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 mt-auto z-30"
      >
        <motion.div 
          id="hero-status-p"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[325px] select-none text-left"
          style={{ fontSize: 'clamp(0.72rem, 1.3vw, 1.4rem)' }}
        >
          <div className="flex items-center gap-2 mb-1.5 opacity-60 text-xs font-mono font-bold text-[#007CE7]">
            <Sparkles className="w-3.5 h-3.5 text-[#007CE7] animate-pulse" />
            <span>EST. SYSTEM 2026</span>
          </div>
          <p className="opacity-90">
            CSTACK CONSTRUCTS COMPLIANT WEBSITES, MOBILE SUITES, AND HIGH-FREQUENCY PRINT BLUEPRINTS TO LAUNCH EXTRAORDINARY AMBITIONS worldwide.
          </p>
        </motion.div>

        <motion.button
          id="contact-btn-trigger"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          onClick={() => setActivePanel('contact')}
          className="contact-button-custom cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base rounded-full"
        >
          GET IN TOUCH
        </motion.button>
      </footer>

      {/* Curated Spec Showcase Drawer */}
      <WorkPanel 
        isOpen={activePanel === 'work'} 
        onClose={() => setActivePanel('home')} 
      />
      
      {/* Why Us / Credentials / Capability Meters Drawer */}
      <AboutPanel 
        isOpen={activePanel === 'about'} 
        onClose={() => setActivePanel('home')} 
      />

      {/* Interactive Microbudgeting Estimator Drawer */}
      <PricingPanel
        isOpen={activePanel === 'pricing'}
        onClose={() => setActivePanel('home')}
        onRequestProposal={handleRequestProposal}
      />
      
      {/* Secure Transmittal Contact Form Console */}
      <ContactPanel 
        isOpen={activePanel === 'contact'} 
        onClose={() => setActivePanel('home')} 
        onNewMessage={handleNewMessage}
        prefilledSubject={prefilledSubject}
        prefilledMessage={prefilledMessage}
        onClearPrefills={handleClearPrefills}
      />
      
      {/* Persistent Encrypted-simulated Local Storage Registry Logs */}
      <InboxPanel 
        isOpen={activePanel === 'inbox'} 
        onClose={() => setActivePanel('home')} 
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
        onClearAll={handleClearAllMessages}
      />
    </div>
  );
}
