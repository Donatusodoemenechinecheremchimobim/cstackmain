import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Calendar, User, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface WorkPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkPanel({ isOpen, onClose }: WorkPanelProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="work-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0C0C0C]/95 backdrop-blur-md flex flex-col pt-24 px-6 md:px-12 pb-16"
        >
          {/* Header Controls */}
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-[#D7E2EA]/10 pb-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#5E0ED7] font-semibold uppercase">01 / FEATURED DESIGNS</span>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#D7E2EA] mt-1">
                OUR PORTFOLIO
              </h2>
            </div>
            <button
              id="close-work-panel-btn"
              onClick={onClose}
              className="p-3 rounded-full border border-[#D7E2EA]/10 hover:border-[#5E0ED7]/55 hover:bg-[#5E0ED7]/5 transition-all text-[#D7E2EA] flex items-center justify-center cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Project Grid */}
            <div className={`col-span-1 lg:col-span-7 space-y-6 ${selectedProject ? 'hidden lg:block' : 'block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                    onClick={() => setSelectedProject(project)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border border-[#D7E2EA]/10 bg-[#121212] p-4.5 hover:border-[#5E0ED7]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                      selectedProject?.id === project.id ? 'ring-2 ring-[#5E0ED7]/70 border-[#5E0ED7]' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    <div>
                      {/* Project Image Glassframe */}
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-950 mb-4 flex items-center justify-center select-none border border-white/5">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
                        <div className="absolute top-3 right-3 bg-[#0C0C0C]/90 border border-white/5 backdrop-blur-md text-[10px] font-mono px-2.5 py-1 rounded text-[#5E0ED7] tracking-widest font-black uppercase">
                          {project.year}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-[#5E0ED7] uppercase font-bold">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold uppercase tracking-wide text-white mt-1 group-hover:text-[#5E0ED7] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4.5 h-4.5 text-[#5E0ED7] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-[#D7E2EA]/70 text-xs font-light mt-2 line-clamp-2 uppercase">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[9px] font-mono bg-[#111622] text-[#5E0ED7] border border-[#5E0ED7]/15 px-2 py-0.5 rounded uppercase font-semibold">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[9px] font-mono bg-[#222]/50 text-white/50 px-1.5 py-0.5 rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Project Full Details */}
            <div className={`col-span-1 lg:col-span-5 ${selectedProject ? 'block' : 'hidden lg:block'}`}>
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#5E0ED7]/20 bg-[#121622]/85 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-6 sticky top-28"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-mono tracking-widest text-[#5E0ED7] uppercase font-bold">
                          {selectedProject.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-normal mt-1 leading-tight">
                          {selectedProject.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="lg:hidden p-1.5 rounded-full border border-white/10 hover:bg-white/5 text-white/70"
                        title="Back to list"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Beautiful saturated detail image */}
                    <div className="aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-[#5E0ED7]/20 flex items-center justify-center relative select-none">
                      <img
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover saturate-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#5E0ED7]/5 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <p className="text-sm font-light text-[#D7E2EA] leading-relaxed uppercase">
                      {selectedProject.longDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5E0ED7] font-semibold">
                          <User className="w-3.5 h-3.5" />
                          <span>COLLABORATOR</span>
                        </div>
                        <p className="text-xs font-medium text-white/90 uppercase truncate">
                          {selectedProject.client}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5E0ED7] font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>LAUNCH TIME</span>
                        </div>
                        <p className="text-xs font-medium text-white/90 uppercase">
                          {selectedProject.year}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#5E0ED7] font-bold block mb-2 uppercase">
                        PROJECT DESIGN SKILLS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono tracking-wider font-semibold border border-[#5E0ED7]/15 bg-[#111622] hover:bg-[#5E0ED7]/10 px-2 py-1 rounded text-[#D7E2EA] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-[#5E0ED7] text-white font-semibold text-xs tracking-widest uppercase hover:opacity-90 hover:scale-[1.01] active:translate-y-[1px] transition-all py-3.5 cursor-pointer text-center"
                        title="Open Live Website in a New Tab"
                      >
                        LAUNCH LIVE ARCHIVE <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </motion.div>
                ) : (
                  <div className="hidden lg:flex flex-col items-center justify-center border-2 border-dashed border-[#5E0ED7]/15 rounded-2xl p-12 text-center h-[460px]">
                    <div className="p-4 rounded-full bg-[#5E0ED7]/5 text-[#5E0ED7] mb-4 animate-pulse">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D7E2EA]/85 mb-1">
                      SELECT A PROJECT
                    </h4>
                    <p className="text-xs font-light text-[#D7E2EA]/40 max-w-[240px] uppercase">
                      Click on any showcase card in the grid to view descriptions, creative parameters, and project goals.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
