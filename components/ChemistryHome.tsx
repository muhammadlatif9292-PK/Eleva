'use client';

import React, { useState } from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { 
  Zap, 
  Search, 
  Camera, 
  Mic, 
  Play, 
  ChevronLeft,
  BookOpen,
  ClipboardList,
  FileText,
  BarChart3,
  Star,
  Trophy
} from 'lucide-react';
import { chemistryContent } from '../data/chemistryContent';

interface ChemistryHomeProps {
  onBack: () => void;
  onStartChat: (topic?: string) => void;
  onOpenUnit: (unitId: string) => void;
  onNavigateToPractice: () => void;
  onNavigateToTests: () => void;
}

export const ChemistryHome: React.FC<ChemistryHomeProps> = ({ 
  onBack,
  onStartChat, 
  onOpenUnit,
  onNavigateToPractice,
  onNavigateToTests
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use static content for extreme scalability and zero-latency
  const units = Object.values(chemistryContent).map((unit, index) => ({
    id: unit.unitID,
    title: unit.title,
    urduTitle: unit.urduTitle,
    order: index + 1,
    priority: index < 3, // Example priority
    weight: "High"
  }));

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={24} className="text-white/60" />
            </motion.button>
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#F59E0B]/20 to-transparent flex items-center justify-center border border-[#F59E0B]/20"
            >
              <Zap className="text-[#F59E0B]" size={40} />
            </motion.div>
            <div className="space-y-1">
              <h1 className="text-[clamp(3rem,8vw,5rem)] font-display italic text-white tracking-tight leading-tight">Chemistry</h1>
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-urdu text-[#F59E0B]/80 leading-relaxed">کیمیا</h2>
            </div>
          </div>
          <p className="text-white/50 text-[clamp(1.1rem,2vw,1.4rem)] font-light max-w-xl">
            Professor Nova is ready to explore the reactions and structures of the molecular world.
          </p>
        </div>
        
        <div className="flex items-center gap-6 self-start md:self-end pb-2">
          <div className="prestige-card px-8 py-4 flex items-center gap-4 border-white/5">
            <BarChart3 size={24} className="text-[#F59E0B]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Progress</span>
              <span className="font-display italic text-xl text-white">0/{units.length} Units Mastered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Ask Professor Nova - Prestige Search */}
      <section className="relative group max-w-4xl mx-auto w-full">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#F59E0B]/10 to-[#1B2CC1]/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="prestige-card p-2 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-4 px-8 py-4">
            <Search className="text-white/30" size={24} />
            <input 
              type="text"
              placeholder="Ask Professor Nova anything about Chemistry..."
              className="w-full bg-transparent border-none focus:outline-none text-white text-lg placeholder:text-white/20 font-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onStartChat(searchQuery)}
            />
          </div>
          <div className="flex items-center gap-3 pr-4">
            <motion.button whileTap={{ scale: 0.9 }} className="p-4 rounded-2xl hover:bg-white/5 text-white/40 transition-colors">
              <Mic size={22} />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="p-4 rounded-2xl hover:bg-white/5 text-white/40 transition-colors">
              <Camera size={22} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartChat(searchQuery)}
              className="prestige-button-primary !py-4 !px-10 text-lg tracking-widest !bg-[#F59E0B] !text-[#050505]"
            >
              ASK
            </motion.button>
          </div>
        </div>
      </section>

      {/* Units Grid */}
      <section className="space-y-10">
        <div className="flex items-end justify-between border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-display italic text-white flex items-center gap-4">
              <BookOpen size={32} className="text-[#F59E0B]" />
              Curriculum — نصاب
            </h2>
            <p className="text-white/30 text-sm font-light tracking-widest uppercase">KPTBB Grade 10 • Chemical Excellence</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <motion.button
              key={unit.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenUnit(unit.id)}
              className="prestige-card p-10 text-left group flex flex-col justify-between min-h-[320px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em]">Unit {unit.order}</span>
                  {unit.priority && (
                    <div className="bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#F59E0B]/20 flex items-center gap-2 tracking-widest">
                      <Star size={12} fill="currentColor" /> PRESTIGE TOPIC
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-display italic text-3xl text-white group-hover:text-[#F59E0B] transition-colors leading-tight">{unit.title}</h3>
                  <p className="text-white/40 text-sm font-light line-clamp-2 leading-relaxed">
                    Master the fundamental principles of {unit.title.toLowerCase()} through guided inquiry.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between text-[11px] font-bold tracking-widest text-white/30 uppercase">
                  <span>Mastery</span>
                  <span>{unit.weight} Weight</span>
                </div>
                <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '15%' }}
                    className="absolute h-full bg-gradient-to-r from-[#F59E0B] to-transparent"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#F59E0B] text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">START LECTURE</span>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-[#F59E0B] group-hover:text-[#050505] transition-all duration-500">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Board Exam Prep Section */}
      <section className="prestige-card p-12 space-y-12">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] border border-[#F59E0B]/20">
            <ClipboardList size={32} />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-display italic text-white">Board Examination Mastery</h2>
            <p className="text-white/40 font-light tracking-wide">Precision practice aligned with KPTBB standards.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Practice MCQs', icon: FileText, color: 'hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/5', action: onNavigateToPractice },
            { label: 'RRQ Practice', icon: ClipboardList, color: 'hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5', action: onNavigateToPractice },
            { label: 'ERQ Practice', icon: BookOpen, color: 'hover:border-[#10B981]/30 hover:bg-[#10B981]/5', action: onNavigateToPractice },
            { label: 'Mock Paper', icon: Trophy, color: 'hover:border-[#F59E0B]/30 hover:bg-[#F59E0B]/5', action: onNavigateToTests },
          ].map((item, i) => (
            <motion.button 
              key={i} 
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={item.action}
              className={`p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-6 transition-all duration-300 ${item.color}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60">
                <item.icon size={28} />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/60">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
};
