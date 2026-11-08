import React from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { BarChart3, TrendingUp, Award, Clock, Star, Zap, User, Target, ChevronRight, ChevronLeft } from 'lucide-react';

export const ProgressScreen: React.FC<{ user: any, xpData: any, streakData: any, onBack: () => void }> = ({ user, xpData, streakData, onBack }) => {
  const totalXP = xpData?.totalXP || 0;
  const currentLevel = xpData?.currentLevel || 1;
  const currentStreak = streakData?.currentStreak || 0;

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
            <h1 className="text-6xl font-display italic text-white tracking-tighter">Student Progress</h1>
            <p className="text-white/30 font-urdu text-2xl mt-2">ترقی — آپ کی علمی کامیابی کا ریکارڈ</p>
          </div>
        </div>
        <div className="prestige-card px-8 py-4 flex items-center gap-4 border-white/5">
          <Award size={28} className="text-[#F5C518] fill-[#F5C518]/20" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Global Rank</span>
            <span className="font-display italic text-2xl text-white">#1,240</span>
          </div>
        </div>
      </header>

      {/* Profile Overview */}
      <section className="prestige-card p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B2CC1]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 relative group-hover:scale-105 transition-transform duration-700">
          <User size={80} />
          <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#F5C518] rounded-full border-4 border-[#050505] flex items-center justify-center text-[#050505] font-display italic text-xl shadow-[0_0_20px_rgba(245,197,24,0.3)]">
            {currentLevel}
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-1">
            <h2 className="text-5xl font-display italic text-white">{user.studentFullName}</h2>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Executive ID: {user.personalID}</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <div className="prestige-card px-6 py-3 flex items-center gap-3 border-white/5 bg-white/[0.02]">
              <Zap size={20} className="text-[#F5C518] fill-[#F5C518]/20" />
              <span className="text-sm font-bold text-white/60 tracking-widest uppercase">{totalXP.toLocaleString()} XP</span>
            </div>
            <div className="prestige-card px-6 py-3 flex items-center gap-3 border-white/5 bg-white/[0.02]">
              <TrendingUp size={20} className="text-[#10B981]" />
              <span className="text-sm font-bold text-white/60 tracking-widest uppercase">{currentStreak} DAY STREAK</span>
            </div>
            <div className="prestige-card px-6 py-3 flex items-center gap-3 border-white/5 bg-white/[0.02]">
              <Target size={20} className="text-[#1B2CC1]" />
              <span className="text-sm font-bold text-white/60 tracking-widest uppercase">85% ACCURACY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="prestige-card p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-2xl font-display italic text-white">Syllabus Mastery</h3>
            <BarChart3 size={24} className="text-[#1B2CC1]" />
          </div>
          <div className="space-y-6">
            {[
              { label: 'Physics', progress: 35, color: '#8B5CF6' },
              { label: 'Mathematics', progress: 28, color: '#3B82F6' },
              { label: 'Chemistry', progress: 15, color: '#10B981' },
            ].map((sub, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-white/40">{sub.label}</span>
                  <span className="text-white/60">{sub.progress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.progress}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full"
                    style={{ backgroundColor: sub.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="prestige-card p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-2xl font-display italic text-white">Weekly Engagement</h3>
            <TrendingUp size={24} className="text-[#10B981]" />
          </div>
          <div className="flex items-end justify-between h-40 gap-3">
            {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`w-full rounded-t-lg transition-all duration-500 ${i === 3 ? 'bg-[#F5C518] shadow-[0_0_20px_rgba(245,197,24,0.2)]' : 'bg-white/5'}`}
                />
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="prestige-card p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h3 className="text-2xl font-display italic text-white">Achievements</h3>
            <Star size={24} className="text-[#F5C518]" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`aspect-square rounded-2xl flex items-center justify-center border ${i <= 4 ? 'bg-[#F5C518]/10 border-[#F5C518]/20 text-[#F5C518]' : 'bg-white/5 border-white/5 text-white/10'}`}
              >
                <Award size={28} />
              </motion.div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-3 text-[10px] font-bold text-[#F5C518] uppercase tracking-[0.3em] hover:underline pt-4">
            VIEW ALL BADGES
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
