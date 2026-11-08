import React from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { ClipboardList, Search, Filter, Play, Clock, Star, Zap, ChevronRight, ChevronLeft } from 'lucide-react';

interface PracticeScreenProps {
  onBack: () => void;
  onStartPractice: (unitId?: string) => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ onBack, onStartPractice }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="flex items-end justify-between border-b border-white/5 pb-8">
        <div className="flex items-center gap-8">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={24} className="text-white/60" />
          </motion.button>
          <div className="space-y-2">
            <h1 className="text-6xl font-display italic text-white tracking-tighter">Practice Arena</h1>
            <p className="text-white/30 font-urdu text-2xl mt-2">مشق — تعلیمی کمال کا راستہ</p>
          </div>
        </div>
        <div className="prestige-card px-8 py-4 flex items-center gap-4 border-white/5">
          <Star size={28} className="text-[#F5C518] fill-[#F5C518]/20" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mastery Level</span>
            <span className="font-display italic text-2xl text-white">Elite 12</span>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 prestige-card p-2 flex items-center gap-4 border-white/5 bg-white/[0.02]">
          <div className="p-4 text-white/20">
            <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Search topics, units, or questions..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-white text-lg font-light placeholder:text-white/10"
          />
        </div>
        <button className="prestige-button-secondary px-10 flex items-center gap-4 text-xs tracking-[0.3em] font-bold">
          <Filter size={20} />
          FILTER
        </button>
      </div>

      {/* Practice Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { id: 'topic', title: 'Topic Wise', desc: 'Focus on specific concepts', icon: ClipboardList, color: '#1B2CC1' },
          { id: 'mixed', title: 'Mixed Bag', desc: 'Random questions from all units', icon: Play, color: '#F5C518' },
          { id: 'timed', title: 'Timed Challenge', desc: 'Beat the clock', icon: Clock, color: '#E11D48' },
        ].map((mode, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStartPractice()}
            className="prestige-card p-12 text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-10" style={{ backgroundColor: mode.color }} />
            <div 
              className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-8 transition-all duration-500 group-hover:rotate-12"
              style={{ backgroundColor: `${mode.color}20`, border: `1px solid ${mode.color}30` }}
            >
              <mode.icon size={32} style={{ color: mode.color }} />
            </div>
            <h3 className="text-3xl font-display italic text-white mb-3 group-hover:text-[#F5C518] transition-colors">{mode.title}</h3>
            <p className="text-white/40 text-sm font-light leading-relaxed">{mode.desc}</p>
            
            <div className="flex items-center gap-2 mt-6 text-[#F5C518] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold uppercase tracking-widest">Enter Arena</span>
              <ChevronRight size={14} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Practice */}
      <section className="space-y-10">
        <div className="flex items-end justify-between border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-display italic text-white">Recent Activity</h2>
            <p className="text-white/30 text-sm font-light tracking-widest uppercase">Your Intellectual Footprint</p>
          </div>
        </div>
        <div className="prestige-card border-white/5 divide-y divide-white/5 overflow-hidden">
          {[
            { topic: 'Simple Harmonic Motion', unit: 'Unit 10', score: '85%', date: '2 hours ago' },
            { topic: 'Refraction of Light', unit: 'Unit 12', score: '92%', date: 'Yesterday' },
            { topic: 'Coulomb\'s Law', unit: 'Unit 13', score: '78%', date: '2 days ago' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="p-8 flex items-center justify-between transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[#F5C518] group-hover:bg-[#F5C518]/10 transition-all duration-500">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-display italic text-white group-hover:text-[#F5C518] transition-colors">{item.topic}</h4>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1">{item.unit} • {item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-display italic text-[#F5C518]">{item.score}</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Accuracy</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
