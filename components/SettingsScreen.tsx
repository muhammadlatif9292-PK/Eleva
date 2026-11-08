import React from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { Settings, User, Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight, Moon, Database, ChevronLeft } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { seedInitialData } from '../services/seedService';

export const SettingsScreen: React.FC<{ user: any; onLogout?: () => void; onBack: () => void }> = ({ user, onLogout, onBack }) => {
  const [seeding, setSeeding] = React.useState(false);
  const isAdmin = user.userType === 'admin';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      signOut(auth);
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will seed initial data. Continue?')) return;
    setSeeding(true);
    try {
      await seedInitialData();
      alert('Data seeded successfully!');
    } catch (err) {
      console.error(err);
      alert('Seeding failed.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="border-b border-white/5 pb-8">
        <div className="flex items-center gap-8">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={24} className="text-white/60" />
          </motion.button>
          <div className="space-y-2">
            <h1 className="text-6xl font-display italic text-white tracking-tighter">Settings</h1>
            <p className="text-white/30 font-urdu text-2xl mt-2">ترتیبات — اکاؤنٹ اور ایپ کی ترتیبات</p>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        {/* Admin Section */}
        {isAdmin && (
          <section className="prestige-card border-[#F5C518]/20 bg-[#F5C518]/[0.02] overflow-hidden">
            <div className="p-8 border-b border-[#F5C518]/10 flex items-center justify-between">
              <h2 className="text-2xl font-display italic text-[#F5C518] flex items-center gap-4">
                <Shield size={24} />
                Administrative Access
              </h2>
              <span className="text-[10px] font-bold text-[#F5C518]/40 uppercase tracking-[0.3em]">System Level 4</span>
            </div>
            <div className="p-10">
              <button 
                onClick={handleSeed}
                disabled={seeding}
                className="w-full prestige-button-primary bg-[#F5C518] text-[#050505] flex items-center justify-center gap-4 py-5 disabled:opacity-50"
              >
                <Database size={20} />
                {seeding ? 'INITIALIZING DATA...' : 'SEED CORE INFRASTRUCTURE'}
              </button>
            </div>
          </section>
        )}

        {/* Account Section */}
        <section className="prestige-card overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-display italic text-white flex items-center gap-4">
              <User size={24} className="text-[#1B2CC1]" />
              Executive Profile
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { label: 'Full Name', value: user.studentFullName },
              { label: 'Father\'s Name', value: user.fatherName },
              { label: 'Student ID', value: user.personalID },
              { label: 'Email Address', value: user.email || 'Not connected' },
            ].map((item, i) => (
              <div key={i} className="p-8 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{item.label}</span>
                <span className="text-lg font-display italic text-white/80">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Preferences Section */}
        <section className="prestige-card overflow-hidden">
          <div className="p-8 border-b border-white/5">
            <h2 className="text-2xl font-display italic text-white flex items-center gap-4">
              <Settings size={24} className="text-[#1B2CC1]" />
              System Preferences
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { label: 'Notifications', icon: Bell, value: 'Active', color: 'text-blue-400' },
              { label: 'Visual Theme', icon: Moon, value: 'Prestige Noir', color: 'text-white/40' },
              { label: 'Language', icon: Globe, value: 'EN / UR', color: 'text-emerald-400' },
              { label: 'Security', icon: Shield, value: 'Encrypted', color: 'text-purple-400' },
            ].map((item, i) => (
              <button key={i} className="w-full p-8 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-display italic text-white">{item.label}</p>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.value}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-white/10 group-hover:text-white/40 transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* Support & Logout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button className="prestige-card p-8 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#1B2CC1] transition-colors">
                <HelpCircle size={24} />
              </div>
              <div className="text-left">
                <p className="text-lg font-display italic text-white">Concierge Support</p>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">24/7 Priority Access</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-white/10 group-hover:text-white/40 transition-colors" />
          </button>
          
          <button 
            onClick={handleLogout}
            className="prestige-card p-8 border-rose-500/20 bg-rose-500/[0.02] flex items-center justify-between hover:bg-rose-500/[0.05] transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <LogOut size={24} />
              </div>
              <div className="text-left">
                <p className="text-lg font-display italic text-rose-500">Terminate Session</p>
                <p className="text-[10px] font-bold text-rose-500/40 uppercase tracking-widest">Secure Logout</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-rose-500/20 group-hover:text-rose-500/40 transition-colors" />
          </button>
        </div>

        <div className="text-center pt-12">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">ELEVA PRESTIGE v2.0.0 — NOIR EDITION</p>
        </div>
      </div>
    </div>
  );
};
