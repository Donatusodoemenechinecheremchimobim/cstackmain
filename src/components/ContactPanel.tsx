import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Mail, Database, Terminal, ShieldCheck } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNewMessage: (msg: ContactMessage) => void;
  prefilledSubject?: string;
  prefilledMessage?: string;
  onClearPrefills?: () => void;
}

export default function ContactPanel({
  isOpen,
  onClose,
  onNewMessage,
  prefilledSubject = '',
  prefilledMessage = '',
  onClearPrefills
}: ContactPanelProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync prefilled parameters from active calculators
  useEffect(() => {
    if (isOpen) {
      if (prefilledSubject) setSubject(prefilledSubject);
      if (prefilledMessage) setMessage(prefilledMessage);
    }
  }, [isOpen, prefilledSubject, prefilledMessage]);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'CLIENT NAME IS REQUIRED';
    if (!email.trim()) {
      tempErrors.email = 'CLIENT EMAIL IS REQUIRED';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'INVALID EMAIL SPEC';
    }
    if (!subject.trim()) tempErrors.subject = 'SUBJECT CATEGORY IS REQUIRED';
    if (!message.trim()) tempErrors.message = 'REQUIREMENTS DETAILS ARE REQUIRED';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // High velocity simulation
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: 'TX_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' // ' + new Date().toLocaleDateString(),
      };

      onNewMessage(newMsg);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Clean inputs & trigger parents clean callbacks
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      if (onClearPrefills) onClearPrefills();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="contact-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0C0C0C]/95 backdrop-blur-md flex flex-col pt-24 px-6 md:px-12 pb-16"
        >
          {/* Header Controls */}
          <div className="max-w-4xl mx-auto w-full flex justify-between items-center border-b border-[#D7E2EA]/10 pb-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#007CE7] font-semibold uppercase">05 / COMMUNICATE RELAY</span>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#D7E2EA] mt-1">
                SECURE CONSOLE
              </h2>
            </div>
            <button
              id="close-contact-panel-btn"
              onClick={onClose}
              className="p-3 rounded-full border border-[#D7E2EA]/10 hover:border-[#007CE7]/50 hover:bg-[#007CE7]/5 transition-all text-[#D7E2EA] flex items-center justify-center cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Context Details */}
            <div className="col-span-1 md:col-span-5 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white">COMMUNICATION MATRIX</h3>
                <p className="text-sm font-light text-[#D7E2EA]/75 leading-relaxed uppercase">
                  Submit this digital inquiry token to transmit secure routing packets directly to the CSTACK desk. Each inquiry logs locally.
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div className="space-y-4 font-mono text-xs text-[#D7E2EA]/60">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#007CE7]" />
                  <span>chibundusadiq@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#007CE7]" />
                  <span>ACTIVE NODE: LOCAL_LEDGER</span>
                </div>
              </div>

              {/* WHY US Mini Bento panel */}
              <div className="border border-[#007CE7]/15 bg-[#111622]/40 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">VERIFIED SECURE LINK</span>
                </div>
                <p className="text-[11px] font-light text-[#D7E2EA]/70 uppercase">
                  Transmissions cache instantly to the persistent ledger in the navy header. We never distribute Client credentials to unregulated server nodes.
                </p>
              </div>
            </div>

            {/* Form Console */}
            <div className="col-span-1 md:col-span-7">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border border-emerald-500/20 bg-emerald-500/[0.02] rounded-2xl p-8 text-center space-y-4 flex flex-col items-center"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-widest text-[#D7E2EA]">
                        TRANSMISSION RECEIVED
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono mt-1 uppercase">
                        STATUS // INTEGRATION_ESTABLISHED: 200 OK
                      </p>
                    </div>
                    <p className="text-sm font-light text-[#D7E2EA]/85 max-w-sm uppercase">
                      Client query is packaged & compiled. Verify your transmittal record inside the secure INBOX tab on the navigation taskbar.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-xs font-mono tracking-widest font-semibold border border-[#D7E2EA]/10 hover:border-[#007CE7]/50 hover:bg-white/5 text-[#D7E2EA] px-6 py-2.5 rounded-lg transition-all"
                    >
                      SEND ANOTHER PACKET
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="space-y-1.5 font-mono">
                      <label className="text-[10px] tracking-widest uppercase text-white/55 block">
                        Full Name / Organization
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="E.G. CHRIS STACK"
                        className={`w-full bg-[#121212] border ${
                          errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-[#D7E2EA]/10 focus:border-[#007CE7]/40'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all`}
                      />
                      {errors.name && (
                        <p className="text-[10px] font-semibold text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 font-mono">
                      <label className="text-[10px] tracking-widest uppercase text-white/55 block">
                        Secure Email Address
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="ENTER SECURE ADDR"
                        className={`w-full bg-[#121212] border ${
                          errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#D7E2EA]/10 focus:border-[#007CE7]/40'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all`}
                      />
                      {errors.email && (
                        <p className="text-[10px] font-semibold text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5 font-mono">
                      <label className="text-[10px] tracking-widest uppercase text-white/55 block">
                        Project Subject Category
                      </label>
                      <input
                        id="contact-subject-input"
                        type="text"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                        }}
                        placeholder="E.G., WEB SYSTEMS ASSEMBLY"
                        className={`w-full bg-[#121212] border ${
                          errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-[#D7E2EA]/10 focus:border-[#007CE7]/40'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all`}
                      />
                      {errors.subject && (
                        <p className="text-[10px] font-semibold text-red-500">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] tracking-widest uppercase text-white/55 block">
                          Message parameters / Details
                        </label>
                        {prefilledMessage && (
                          <span className="text-[9px] text-[#007CE7] uppercase font-bold tracking-wider animate-pulse flex items-center gap-1">
                            <Terminal className="w-3 h-3" /> ESTIMATOR AUTO-LOADED
                          </span>
                        )}
                      </div>
                      <textarea
                        id="contact-message-input"
                        rows={5}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                        }}
                        placeholder="INPUT PROJECT REQUIREMENTS OR PHRASE AN AGREEMENT..."
                        className={`w-full bg-[#121212] border ${
                          errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-[#D7E2EA]/10 focus:border-[#007CE7]/40'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all`}
                      />
                      {errors.message && (
                        <p className="text-[10px] font-semibold text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-button-custom w-full cursor-pointer flex items-center justify-center gap-3 rounded-xl px-8 py-3.5 sm:px-10 sm:py-4 tracking-widest text-sm relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>COMPILING PACKETS SECURELY...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMIT REQUISITION DATA</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
