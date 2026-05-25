import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calculator, Sparkles, AlertCircle, Clock, Zap, Target } from 'lucide-react';
import { PRICING_TIERS } from '../data';

interface PricingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestProposal: (tierName: string, calculatedPrice?: string) => void;
}

export default function PricingPanel({ isOpen, onClose, onRequestProposal }: PricingPanelProps) {
  // Configurable calculator states
  const [includeWeb, setIncludeWeb] = useState(true);
  const [includeApp, setIncludeApp] = useState(false);
  const [includeBranding, setIncludeBranding] = useState(false);
  const [supportSLA, setSupportSLA] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.25 | 0.9>(1); // 1 = Standard, 1.25 = Rush, 0.9 = Eco

  // Base Prices
  const baseWebPrice = 5800;
  const baseAppPrice = 6200;
  const baseBrandingPrice = 2400;
  const baseSLAPrice = 1200;

  // Compute calculated values
  const computeSubtotal = () => {
    let sum = 0;
    if (includeWeb) sum += baseWebPrice;
    if (includeApp) sum += baseAppPrice;
    if (includeBranding) sum += baseBrandingPrice;
    if (supportSLA) sum += baseSLAPrice;
    return Math.round(sum * speedMultiplier);
  };

  const calculatedTotal = computeSubtotal();

  const handleApplyEstimate = () => {
    let serviceSummary = [];
    if (includeWeb) serviceSummary.push('PRO WEBSITE');
    if (includeApp) serviceSummary.push('MOBILE APP');
    if (includeBranding) serviceSummary.push('BRANDING GRAPHICS');
    if (supportSLA) serviceSummary.push('MAINTENANCE SUPPORT');
    
    const summaryStr = `CUSTOM PROJECT INQUIRY (${serviceSummary.join(' + ')})`;
    onRequestProposal(summaryStr, `$${calculatedTotal.toLocaleString()}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="pricing-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0C0C0C]/95 backdrop-blur-md flex flex-col pt-24 px-6 md:px-12 pb-16"
        >
          {/* Header Controls */}
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-[#D7E2EA]/10 pb-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#5E0ED7] font-semibold uppercase">03 / ESTIMATES</span>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#D7E2EA] mt-1">
                PRICING & CALCULATOR
              </h2>
            </div>
            <button
              id="close-pricing-panel-btn"
              onClick={onClose}
              className="p-3 rounded-full border border-[#D7E2EA]/10 hover:border-[#5E0ED7]/50 hover:bg-[#5E0ED7]/5 transition-all text-[#D7E2EA] flex items-center justify-center cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full space-y-16">
            {/* Interactive Custom Configurator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="col-span-1 lg:col-span-7 glass-cyber-card rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator className="w-5 h-5 text-[#5E0ED7]" />
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                      BUILD YOUR ESTIMATE
                    </h3>
                  </div>
                  <p className="text-sm font-light text-[#D7E2EA]/70 mb-6 uppercase">
                    Customize your project scope below to receive an instant estimate for your brand.
                  </p>

                  <div className="space-y-4">
                    {/* Web Option */}
                    <div 
                      onClick={() => setIncludeWeb(!includeWeb)}
                      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${
                        includeWeb ? 'bg-[#5E0ED7]/10 border-[#5E0ED7]' : 'bg-transparent border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          checked={includeWeb}
                          onChange={() => {}} // Handled by parent container click
                          className="mt-1 accent-[#5E0ED7]" 
                        />
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-wider text-white">HIGH-END CREATIVE WEBSITE</h4>
                          <p className="text-[11px] font-light text-[#D7E2EA]/60 uppercase">Beautiful, custom & highly interactive pages tailored for desktop and mobile</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/90">${baseWebPrice.toLocaleString()}</span>
                    </div>

                    {/* App Option */}
                    <div 
                      onClick={() => setIncludeApp(!includeApp)}
                      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${
                        includeApp ? 'bg-[#5E0ED7]/10 border-[#5E0ED7]' : 'bg-transparent border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          checked={includeApp}
                          onChange={() => {}}
                          className="mt-1 accent-[#5E0ED7]" 
                        />
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-wider text-white">CUSTOM NATIVE MOBILE APP</h4>
                          <p className="text-[11px] font-light text-[#D7E2EA]/60 uppercase">Fluid mobile applications for iPhone and Android users</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/90">${baseAppPrice.toLocaleString()}</span>
                    </div>

                    {/* Graphic design Option */}
                    <div 
                      onClick={() => setIncludeBranding(!includeBranding)}
                      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${
                        includeBranding ? 'bg-[#5E0ED7]/10 border-[#5E0ED7]' : 'bg-transparent border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          checked={includeBranding}
                          onChange={() => {}}
                          className="mt-1 accent-[#5E0ED7]" 
                        />
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-wider text-white">HIGH-END BRANDING & GRAPHICS</h4>
                          <p className="text-[11px] font-light text-[#D7E2EA]/60 uppercase">Custom logos, beautiful typographic styleguides, and marketing materials</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/90">${baseBrandingPrice.toLocaleString()}</span>
                    </div>

                    {/* Support SLA Option */}
                    <div 
                      onClick={() => setSupportSLA(!supportSLA)}
                      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${
                        supportSLA ? 'bg-[#5E0ED7]/10 border-[#5E0ED7]' : 'bg-transparent border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          checked={supportSLA}
                          onChange={() => {}}
                          className="mt-1 accent-[#5E0ED7]" 
                        />
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-wider text-white">MONTHLY MAINTENANCE & SUPPORT</h4>
                          <p className="text-[11px] font-light text-[#D7E2EA]/60 uppercase">Continuous updates, design optimizations, and priority help</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-white/90">${baseSLAPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Delay Factor Toggles */}
                  <div className="pt-6">
                    <span className="text-[10px] font-mono tracking-widest text-[#D7E2EA]/40 block mb-3 uppercase">
                      Timeline Speed Preference
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'BALANCED (-10%)', mult: 0.9, icon: <Clock className="w-3.5 h-3.5 text-green-400" /> },
                        { label: 'STANDARD TIMELINE', mult: 1, icon: <Target className="w-3.5 h-3.5 text-indigo-400" /> },
                        { label: 'RUSH TIMELINE (+25%)', mult: 1.25, icon: <Zap className="w-3.5 h-3.5 text-orange-400" /> }
                      ].map((v) => (
                        <div
                          key={v.label}
                          onClick={() => setSpeedMultiplier(v.mult as any)}
                          className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            speedMultiplier === v.mult ? 'bg-[#5E0ED7]/15 border-[#5E0ED7]' : 'border-[#D7E2EA]/10 hover:border-[#D7E2EA]/20'
                          }`}
                        >
                          {v.icon}
                          <span className="text-[9px] font-mono font-semibold text-white uppercase">{v.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D7E2EA]/10 flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center gap-1.5 font-mono">
                    <AlertCircle className="w-4 h-4 text-[#5E0ED7]" />
                    ESTIMATED DELIVERY TIMELINE: {speedMultiplier === 1.25 ? '7-14 DAYS' : speedMultiplier === 0.9 ? '4-5 WEEKS' : '2-3 WEEKS'}
                  </span>
                </div>
              </div>

              {/* Price Breakdown Preview */}
              <div className="col-span-1 lg:col-span-5 flex flex-col justify-between border border-[#5E0ED7]/30 bg-zinc-950 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-[#5E0ED7]/5 border-l border-b border-[#5E0ED7]/20 rounded-bl-2xl text-[9px] font-mono text-[#5E0ED7] tracking-widest uppercase font-semibold">
                  ESTIMATE SUMMARY
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono tracking-widest text-[#5E0ED7] uppercase font-bold">ESTIMATED PROJECT COST</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl md:text-5xl font-black text-white font-sans">
                        ${calculatedTotal.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 uppercase">EST USD</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Pricing checklist summary */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                      CHOSEN SERVICES
                    </span>
                    <div className="space-y-2 text-xs font-mono text-[#D7E2EA]/85">
                      <div className="flex justify-between items-center">
                        <span>CREATIVE WEBSITE:</span>
                        <span className={includeWeb ? 'text-green-400' : 'text-zinc-600'}>
                          {includeWeb ? 'ENABLED // BASE' : 'DISABLED'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>NATIVE MOBILE:</span>
                        <span className={includeApp ? 'text-green-400' : 'text-zinc-600'}>
                          {includeApp ? 'ENABLED // BASE' : 'DISABLED'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>IDENTITY DESIGN:</span>
                        <span className={includeBranding ? 'text-green-400' : 'text-zinc-600'}>
                          {includeBranding ? 'ENABLED // BASE' : 'DISABLED'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>MAINTENANCE SUPPORT:</span>
                        <span className={supportSLA ? 'text-green-400' : 'text-zinc-600'}>
                          {supportSLA ? 'ENABLED // BASE' : 'DISABLED'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>TIMELINE ACCELERATION:</span>
                        <span className="text-[#5E0ED7]">
                          {speedMultiplier === 1.25 ? '1.25x (RUSH)' : speedMultiplier === 0.9 ? '0.9x (BALANCED)' : '1.00x (STANDARD)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-white/5 bg-[#0C0C0C]/50 rounded-xl p-4 text-[11px] font-light text-[#D7E2EA]/75 leading-relaxed">
                    By clicking the button below, we will prefill these custom preferences directly into our contact form so you don't have to rewrite them.
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleApplyEstimate}
                    className="contact-button-custom w-full cursor-pointer flex items-center justify-center gap-3 rounded-xl py-4 uppercase tracking-widest text-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>APPLY TO INQUIRY FORM</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Traditional Tier Breakdown List */}
            <div>
              <div className="text-center space-y-2 mb-8">
                <span className="text-xs font-mono text-[#5E0ED7] tracking-widest uppercase font-semibold">READY-MADE PACKAGES</span>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white font-sans tracking-tight">POPULAR PRICING TIERS</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className="glass-cyber-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:scale-[1.01] transition-transform"
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-white/50 block uppercase">
                          {tier.category}
                        </span>
                        <h4 className="text-lg font-bold uppercase text-white mt-0.5">
                          {tier.name}
                        </h4>
                      </div>

                      <div className="flex items-baseline gap-1 bg-[#121620] px-4 py-2.5 rounded-xl border border-white/5">
                        <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                        <span className="text-[10px] font-mono text-white/40 uppercase">// {tier.timeline} DELIVERY</span>
                      </div>

                      <p className="text-xs font-light text-[#D7E2EA]/70 leading-relaxed min-h-[50px]">
                        {tier.description}
                      </p>

                      <div className="h-px bg-white/5" />

                      <ul className="space-y-2">
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs font-light text-[#D7E2EA]/90">
                            <Check className="w-3.5 h-3.5 text-[#5E0ED7] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onRequestProposal(tier.name, tier.price)}
                      className="w-full text-center py-3 rounded-xl border border-white/10 hover:border-[#5E0ED7]/30 hover:bg-[#5E0ED7]/5 font-mono text-[10px] font-bold tracking-widest uppercase text-white transition-all mt-6"
                    >
                      GET STARTED
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
