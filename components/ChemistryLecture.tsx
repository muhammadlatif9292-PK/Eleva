'use client';

import React, { useState, useEffect } from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { 
  ChevronLeft, 
  Bot, 
  Play, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  Bookmark,
  Share2,
  Sparkles,
  Trophy,
  Zap
} from 'lucide-react';
import { chemistryContent } from '../data/chemistryContent';
import { InteractiveChemistryDiagram } from './InteractiveChemistryDiagram';

interface ChemistryLectureProps {
  unitId: string;
  onBack: () => void;
  onStartChat: (topic?: string) => void;
}

export const ChemistryLecture: React.FC<ChemistryLectureProps> = ({ 
  unitId, 
  onBack,
  onStartChat
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  // Use static content for extreme scalability and zero-latency
  const content = chemistryContent[unitId];

  useEffect(() => {
    if (content && !completedSections.includes(activeSection)) {
      setCompletedSections(prev => [...prev, activeSection]);
    }
  }, [activeSection, content, completedSections]);

  if (!content) {
    return (
      <div className="fixed inset-0 bg-[#050505] grid place-items-center z-50">
        <div className="text-white/40 font-display italic text-2xl">Unit Content Not Found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#F59E0B] selection:text-[#050505]">
      {/* Ambient Background Glow */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#F59E0B]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 lg:left-24 right-0 h-24 bg-[#050505]/80 backdrop-blur-3xl border-b border-white/5 z-40 px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <div className="space-y-1">
            <h2 className="text-2xl font-display italic tracking-tight">{content.title}</h2>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">KPTBB Standard • Chemistry</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-4 text-white/40 hover:text-white transition-colors"><Bookmark size={20} /></button>
          <button className="p-4 text-white/40 hover:text-white transition-colors"><Share2 size={20} /></button>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Live Session</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 pb-48 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Content Flow */}
        <div className="lg:col-span-8 space-y-24">
          {content.sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-[0.5em]">0{index + 1}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#F59E0B]/20 to-transparent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl font-display italic tracking-tighter leading-tight">{section.title}</h3>
                  <p className="text-2xl font-urdu text-white/40 leading-relaxed">{section.urduTitle}</p>
                </div>
              </div>

              {section.image && (
                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 group">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-[#F59E0B] text-[#050505] flex items-center justify-center shadow-2xl"
                  >
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </motion.button>
                </div>
              )}

              {/* Interactive Reaction Mechanisms */}
              {section.interactiveDiagramId && (
                <div className="my-12">
                  <InteractiveChemistryDiagram id={section.interactiveDiagramId} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-xl text-white/60 font-light leading-relaxed">
                    {section.content}
                  </p>
                </div>
                <div className="space-y-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                  <p className="text-xl font-urdu text-white/50 leading-[2] text-right">
                    {section.urduContent}
                  </p>
                </div>
              </div>

              {/* Chemical Equations */}
              {section.equations && section.equations.length > 0 && (
                <div className="space-y-6">
                  <h5 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Chemical Equations</h5>
                  <div className="grid grid-cols-1 gap-4">
                    {section.equations.map((eq, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                        <div className="font-mono text-xl text-[#F59E0B]">{eq.equation}</div>
                        <div className="text-sm text-white/40 font-light">{eq.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => onStartChat(`I have a question about the section "${section.title}" in the lecture "${content.title}". Specifically, could you explain more about: ${section.content.substring(0, 100)}...`)}
                  className="flex items-center gap-3 text-[10px] font-bold text-[#F59E0B] uppercase tracking-[0.3em] group"
                >
                  <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Quick Question</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </motion.button>
              </div>
            </motion.section>
          ))}

          {/* Key Points Summary */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-10"
          >
            <h5 className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Executive Summary</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.keyPoints.map((point, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                  <Sparkles size={20} className="text-[#F59E0B] shrink-0" />
                  <p className="text-sm text-white/60 font-light">{point}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Completion Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="prestige-card p-16 text-center space-y-10 border-[#F59E0B]/20"
          >
            <div className="w-24 h-24 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center mx-auto text-[#F59E0B]">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
              <h4 className="text-4xl font-display italic">Lecture Completed</h4>
              <p className="text-white/40 font-light tracking-widest uppercase text-sm">Knowledge Synchronized Successfully</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onStartChat(`I just finished the lecture on ${content.title}. Can we do a quick quiz?`)}
                className="prestige-button-primary px-12 py-5 text-sm tracking-[0.2em] !bg-[#F59E0B] !text-[#050505]"
              >
                START QUIZ
              </button>
              <button className="prestige-button-secondary px-12 py-5 text-sm tracking-[0.2em]">
                NEXT LECTURE
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Sidebar Utilities */}
        <aside className="lg:col-span-4 space-y-10 sticky top-32 h-fit">
          {/* Professor Nova Quick Access */}
          <div className="prestige-card p-8 space-y-8 bg-gradient-to-br from-[#F59E0B]/10 to-transparent border-white/10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-[#050505]">
                <Bot size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-display italic">Professor Nova</p>
                <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest">Active Assistant</p>
              </div>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Confused about a reaction? Ask me to visualize the mechanism or explain the stoichiometry.
            </p>
            <button 
              onClick={() => onStartChat()}
              className="w-full prestige-button-primary bg-white text-[#050505] py-4 text-xs tracking-widest"
            >
              ASK NOVA
            </button>
          </div>

          {/* Progress Tracking */}
          <div className="prestige-card p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Unit Progress</h5>
                <p className="text-2xl font-display italic text-[#F59E0B]">Mastery Tier I</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                <Trophy size={24} className="text-[#F59E0B]" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  <span>Concepts Mastered</span>
                  <span>{Math.round((completedSections.length / (content.sections.length || 1)) * 100)}%</span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedSections.length / (content.sections.length || 1)) * 100}%` }}
                    className="h-full bg-[#F59E0B]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Sections</p>
                  <p className="text-lg font-display italic text-white">{completedSections.length}/{content.sections.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Mastery</p>
                  <p className="text-lg font-display italic text-white">Lvl 1</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-[10px] font-bold text-[#10B981] uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Syncing with Global Progress</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Professor Nova FAB - Prestige Edition */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onStartChat()}
        className="fixed bottom-12 right-12 w-20 h-20 rounded-[2rem] bg-[#F59E0B] text-[#050505] flex items-center justify-center shadow-[0_20px_50px_rgba(245,158,11,0.3)] z-50 group"
      >
        <div className="absolute inset-0 bg-[#F59E0B] rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
        <Bot size={32} className="relative z-10" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#1B2CC1] rounded-full border-4 border-[#050505] flex items-center justify-center">
          <Sparkles size={10} className="text-white" />
        </div>
      </motion.button>
    </div>
  );
};
