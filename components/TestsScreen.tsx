import React from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { Trophy, Clock, Calendar, ChevronRight, Star, AlertCircle, ShieldCheck, ChevronLeft } from 'lucide-react';

interface TestsScreenProps {
  onBack: () => void;
  onStartTest: (unitId?: string) => void;
}

export const TestsScreen: React.FC<TestsScreenProps> = ({ onBack, onStartTest }) => {
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
            <h1 className="text-6xl font-display italic text-white tracking-tighter">Tests & Mock Exams</h1>
            <p className="text-white/30 font-urdu text-2xl mt-2">امتحانات — آپ کی صلاحیت کا امتحان</p>
          </div>
        </div>
        <div className="prestige-card px-8 py-4 flex items-center gap-4 border-white/5">
          <Trophy size={28} className="text-[#F5C518] fill-[#F5C518]/20" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Global Ranking</span>
            <span className="font-display italic text-2xl text-white">Top #124</span>
          </div>
        </div>
      </header>

      {/* Test Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          className="relative prestige-card p-12 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B2CC1]/20 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative z-10 space-y-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-[#1B2CC1]/10 border border-[#1B2CC1]/20 flex items-center justify-center text-[#1B2CC1]">
              <Clock size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-display italic text-white">Weekly Mock Exam</h3>
              <p className="text-white/30 text-sm font-light leading-relaxed">Full syllabus coverage following KPTBB board pattern. Proctored environment.</p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#F5C518]" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Next: Sunday, 10:00 AM</span>
              </div>
              <button 
                onClick={() => onStartTest('mock')}
                className="prestige-button-primary px-8 text-xs tracking-widest"
              >
                START MOCK
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          className="prestige-card p-12 flex flex-col justify-between group"
        >
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center text-[#F5C518]">
              <ShieldCheck size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-display italic text-white">Unit Revision Tests</h3>
              <p className="text-white/30 text-sm font-light leading-relaxed">Short, focused assessments for each unit to verify conceptual clarity.</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-12">
            <div className="flex items-center gap-3">
              <Star size={20} className="text-white/20" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">9 Units Available</span>
            </div>
            <button 
              onClick={() => onStartTest()}
              className="prestige-button-secondary px-8 text-xs tracking-widest"
            >
              START TEST
            </button>
          </div>
        </motion.div>
      </div>

      {/* Past Results */}
      <section className="space-y-10">
        <div className="flex items-end justify-between border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-display italic text-white">Past Performance</h2>
            <p className="text-white/30 text-sm font-light tracking-widest uppercase">Historical Academic Records</p>
          </div>
        </div>
        <div className="space-y-6">
          {[
            { name: 'Physics Unit 10-12 Mock', date: 'Mar 15, 2026', score: '78/100', status: 'Passed', color: '#10B981' },
            { name: 'Monthly Assessment - Feb', date: 'Feb 28, 2026', score: '92/100', status: 'Excellent', color: '#F5C518' },
            { name: 'Physics Unit 10 Quiz', date: 'Feb 10, 2026', score: '18/20', status: 'Passed', color: '#10B981' },
          ].map((test, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="prestige-card p-8 flex items-center justify-between border-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[#F5C518] group-hover:bg-[#F5C518]/10 transition-all duration-500">
                  <Trophy size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-display italic text-white group-hover:text-[#F5C518] transition-colors">{test.name}</h4>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1">{test.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-3xl font-display italic" style={{ color: test.color }}>{test.score}</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{test.status}</p>
                </div>
                <ChevronRight size={24} className="text-white/10 group-hover:text-[#F5C518] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
