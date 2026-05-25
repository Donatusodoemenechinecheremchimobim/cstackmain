import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Database, ShieldAlert } from 'lucide-react';
import { ContactMessage } from '../types';

interface InboxPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessage[];
  onDeleteMessage: (id: string) => void;
  onClearAll: () => void;
}

export default function InboxPanel({ isOpen, onClose, messages, onDeleteMessage, onClearAll }: InboxPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="inbox-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0C0C0C]/95 backdrop-blur-md flex flex-col pt-24 px-6 md:px-12 pb-16"
        >
          {/* Header Controls */}
          <div className="max-w-4xl mx-auto w-full flex justify-between items-center border-b border-[#D7E2EA]/10 pb-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#007CE7] font-semibold uppercase">06 / TRANSACTIONS BUFFER</span>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#D7E2EA] mt-1 font-sans">
                LOCAL INBOX
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {messages.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-[10px] font-mono tracking-widest font-semibold border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 text-red-400 px-4 py-2.5 rounded-xl transition-all uppercase cursor-pointer"
                >
                  PURGE LOCAL DATABASE
                </button>
              )}
              <button
                id="close-inbox-panel-btn"
                onClick={onClose}
                className="p-3 rounded-full border border-[#D7E2EA]/10 hover:border-[#007CE7]/55 hover:bg-[#007CE7]/5 transition-all text-[#D7E2EA] flex items-center justify-center cursor-pointer"
                title="Close Panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full">
            {messages.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#007CE7]/20 rounded-2xl bg-zinc-950/40 space-y-4 max-w-xl mx-auto flex flex-col items-center">
                <Database className="w-12 h-12 text-[#007CE7]/30 animate-pulse" />
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white">REQUISITION REGISTRY CLEARED</h4>
                  <p className="text-xs font-mono text-[#007CE7]/60 mt-1 uppercase">
                    NO ACTIVE SECTORS DETECTED
                  </p>
                </div>
                <p className="text-xs font-light text-[#D7E2EA]/60 max-w-xs leading-relaxed uppercase">
                  Transmit a packet inside the contact Secure Console, or apply any interactive budgeting estimate. It logs directly to this browser storage instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center px-4 py-3 border-l-2 border-[#007CE7] text-[10px] font-mono text-[#D7E2EA]/50 uppercase tracking-widest bg-[#007CE7]/5 rounded-r">
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#007CE7]" />
                    ACTIVE SCHEMAS // ENCRYPTED_LEDGER
                  </span>
                  <span>TOTAL ENTRIES: {messages.length}</span>
                </div>

                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-white/5 bg-[#121212] rounded-xl p-5 md:p-6 space-y-4 relative group hover:border-[#007CE7]/30 transition-all"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-[#007CE7] tracking-widest uppercase font-bold">
                            SENDER INFO
                          </span>
                          <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            {msg.name}
                            <span className="text-[11px] font-mono font-normal text-[#D7E2EA]/45 lowercase">
                              &lt;{msg.email}&gt;
                            </span>
                          </h4>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right text-[10px] font-mono text-[#D7E2EA]/40">
                            <span className="block uppercase text-[#007CE7] font-semibold">T_REFID: {msg.id}</span>
                            <span className="block">{msg.timestamp}</span>
                          </div>
                          <button
                            onClick={() => onDeleteMessage(msg.id)}
                            className="p-2 rounded-lg border border-red-500/10 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 group-hover:opacity-100 transition-all cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-white/45 tracking-widest uppercase block">
                          REQUISITION BODY // COMPILATION PARAMETERS
                        </span>
                        <div className="bg-[#0C0C0C] border border-[#007CE7]/10 rounded-lg p-3.5">
                          <p className="text-xs font-mono font-medium text-white uppercase mb-1">
                            SUBJ: {msg.subject}
                          </p>
                          <p className="text-xs font-light text-[#D7E2EA]/85 leading-relaxed whitespace-pre-line uppercase">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
