import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Eye, Code, Compass, Terminal, ShieldAlert, Cpu, HeartHandshake } from 'lucide-react';
import { BIO_STATS, CORE_SKILLS, TEAM_MEMBERS } from '../data';

interface AboutPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutPanel({ isOpen, onClose }: AboutPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="about-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0C0C0C]/95 backdrop-blur-md flex flex-col pt-24 px-6 md:px-12 pb-16"
        >
          {/* Header Controls */}
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-[#D7E2EA]/10 pb-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#5E0ED7] font-semibold uppercase">02 / BRAND IDENTITY & TEAM</span>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#D7E2EA] mt-1">
                WHO WE ARE
              </h2>
            </div>
            <button
              id="close-about-panel-btn"
              onClick={onClose}
              className="p-3 rounded-full border border-[#D7E2EA]/10 hover:border-[#5E0ED7]/50 hover:bg-[#5E0ED7]/5 transition-all text-[#D7E2EA] flex items-center justify-center cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Biography & Why Us Section */}
            <div className="col-span-1 lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-xl md:text-2xl font-light text-white leading-normal uppercase">
                  CSTACK IS A <span className="font-semibold text-white">HIGH-END DESIGN & DIGITAL SUITE</span>. WE BUILD BEAUTIFUL WEBSITES, REMARKABLE BRANDING ASSETS, AND SEAMLESS USER EXPERIENCES COLLABORATIVELY.
                </p>
                <div className="h-px bg-gradient-to-r from-[#5E0ED7]/30 to-transparent w-3/4" />
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">
                  // OUR CREATIVE PHILOSOPHY
                </h3>
                <p className="text-[#D7E2EA]/75 text-base font-light leading-relaxed">
                  Instead of dealing with fragmented agencies, complex visual timelines, and slow communications, CSTACK serves as your direct collaborative design partner. We design clean modern websites, craft inspiring identity assets, and develop lightning-fast visual interfaces in one unified graphic style.
                </p>
                <p className="text-[#D7E2EA]/75 text-base font-light leading-relaxed">
                  Every project we deliver is defined by gorgeous grid proportions, eye-friendly typography, and smooth page transition animations. If you expect pristine layout standards, friendly workflows, and professional outcomes, your project deserves CSTACK.
                </p>
              </motion.div>

              {/* WHY US FACTORS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#5E0ED7]">
                  WHY CHOOSE CSTACK?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-white/5 bg-[#121212] p-5 rounded-xl space-y-2">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">CREATIVE STANDARDS</h4>
                    <p className="text-[11px] font-light text-[#D7E2EA]/70">We build on top-tier custom interactive principles so your brand is simple to customize and manage over time.</p>
                  </div>
                  <div className="border border-white/5 bg-[#121212] p-5 rounded-xl space-y-2">
                    <HeartHandshake className="w-5 h-5 text-purple-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">DIRECT PARTNERSHIP</h4>
                    <p className="text-[11px] font-light text-[#D7E2EA]/70">No complex corporate hierarchy. You work directly with the hand-picked designers and developers creating your products.</p>
                  </div>
                  <div className="border border-white/5 bg-[#121212] p-5 rounded-xl space-y-2">
                    <ShieldAlert className="w-5 h-5 text-violet-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">QUALITY GUARANTEED</h4>
                    <p className="text-[11px] font-light text-[#D7E2EA]/70">Every milestone goes through precise human eye evaluations and testing, resulting in a 99.8% customer satisfaction rate.</p>
                  </div>
                </div>
              </div>

              {/* Stats Bento */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {BIO_STATS.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="border border-[#5E0ED7]/10 bg-[#111622]/50 rounded-xl p-5 text-center flex flex-col justify-center items-center group hover:border-[#5E0ED7]/40 hover:bg-[#111622]/80 transition-all text-[#D7E2EA]"
                  >
                    <span className="text-3xl md:text-4xl font-black text-white group-hover:scale-105 transition-transform">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider font-semibold text-[#D7E2EA]/50 mt-2 uppercase">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Meet the Team Panel */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#5E0ED7]">
                  MEET OUR TEAM
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                  {TEAM_MEMBERS.map((member) => (
                    <div key={member.name} className="border border-white/5 bg-[#111111] p-4 rounded-xl space-y-1 flex flex-col justify-between hover:border-[#5E0ED7]/30 transition-all">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide leading-tight">{member.name}</h4>
                        <div className="text-[9px] font-mono text-[#5E0ED7] mt-1 font-semibold">{member.role}</div>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-light pt-2 uppercase leading-snug">{member.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Skills & Dials */}
            <div className="col-span-1 lg:col-span-12 xl:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="border border-[#5E0ED7]/20 bg-[#121622]/85 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                    OUR CORE SPECIALITIES
                  </h3>
                </div>

                <div className="space-y-4">
                  {CORE_SKILLS.map((skill, idx) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-white font-medium tracking-wide uppercase">{skill}</span>
                        <span className="text-[#5E0ED7] font-semibold">{98 - idx * 3}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${98 - idx * 3}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          style={{
                            background: 'linear-gradient(90deg, #440099, #5E0ED7)'
                          }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-[10px] font-mono uppercase text-white/40 mb-3 tracking-widest">
                    STUDIO SKILLS & TOOLS
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-light text-[#D7E2EA]/75">
                    <div>✨ REACT & MODERN WEBSITES</div>
                    <div>⚡ RESPONSIVE ANIMATIONS</div>
                    <div>🎨 HIGH-END TYPOGRAPHY</div>
                    <div>💎 ADOBE ILLUSTRATOR & DESIGN</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
