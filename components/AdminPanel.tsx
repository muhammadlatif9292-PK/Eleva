import React, { useState, useEffect, useCallback } from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { 
  Shield, 
  Users, 
  Key, 
  RefreshCcw, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Copy,
  Database,
  Zap,
  Crown,
  ChevronLeft
} from 'lucide-react';
import { db, handleFirestoreError } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { seedInitialData } from '../services/seedService';

interface AdminPanelProps {
  user: any;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'codes' | 'system'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // Code Generation State
  const [codeCount, setCodeCount] = useState(1);
  const [codeType, setCodeType] = useState<'FREE' | 'PREM'>('FREE');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const q = query(collection(db, 'users'), limit(50));
        const snapshot = await getDocs(q);
        setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } else if (activeTab === 'codes') {
        const q = query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        setCodes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    } catch (err) {
      handleFirestoreError(err, 'get' as any, activeTab === 'users' ? 'users' : 'accessCodes');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateCodes = async () => {
    setActionLoading(true);
    try {
      const newCodes = [];
      for (let i = 0; i < codeCount; i++) {
        const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const randomPart2 = Math.random().toString(36).substring(2, 5).toUpperCase();
        const code = `${codeType === 'PREM' ? 'ELV-PREM' : 'ELV'}-${randomPart1}-${randomPart2}`;
        
        await setDoc(doc(db, 'accessCodes', code), {
          code,
          codeType,
          isUsed: false,
          createdAt: Timestamp.now(),
          createdBy: user.userID
        });
        newCodes.push(code);
      }
      setMessage({ text: `Successfully generated ${codeCount} ${codeType} codes.`, type: 'success' });
      fetchData();
    } catch (err) {
      handleFirestoreError(err, 'write' as any, 'accessCodes');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleUserPremium = async (userId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        isPremium: !currentStatus
      });
      setUsers(users.map(u => u.id === userId ? { ...u, isPremium: !currentStatus } : u));
      setMessage({ text: 'User status updated', type: 'success' });
    } catch (err) {
      handleFirestoreError(err, 'update' as any, `users/${userId}`);
    }
  };

  const handleSeed = async () => {
    setActionLoading(true);
    try {
      await seedInitialData();
      setMessage({ text: 'Initial data seeded successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Seeding failed', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
        <div className="flex items-center gap-6">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={24} className="text-white/60" />
          </motion.button>
          <div className="space-y-2">
            <h1 className="text-[clamp(2.5rem,8vw,3.5rem)] font-display italic text-white flex items-center gap-6 tracking-tight leading-tight">
              <Shield className="text-[#F5C518]" size={48} />
              Mission Control
            </h1>
            <p className="text-white/40 font-light tracking-wide">Manage ELEVA ecosystem and student access.</p>
          </div>
        </div>
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
          {(['users', 'codes', 'system'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#F5C518] text-[#050505] shadow-lg shadow-[#F5C518]/20' : 'text-white/40 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
        >
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{message.text}</span>
          <button onClick={() => setMessage(null)} className="ml-auto text-xs font-bold uppercase tracking-widest">Dismiss</button>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <div className="prestige-card overflow-hidden border-white/5">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h2 className="font-display italic text-2xl text-white flex items-center gap-4">
              <Users size={24} className="text-[#F5C518]" />
              Student Directory
            </h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-[#F5C518]/50 text-white placeholder:text-white/20"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.01] text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                  <th className="px-8 py-6">Student</th>
                  <th className="px-8 py-6">ELEVA ID</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Joined</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="px-8 py-24 text-center text-white/20 font-light italic text-xl">Synchronizing student data...</td></tr>
                ) : users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5C518] font-display italic text-lg">
                          {u.studentFullName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm tracking-wide">{u.studentFullName}</p>
                          <p className="text-xs text-white/30 font-light">{u.email || 'No Email'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-mono text-xs font-bold text-[#F5C518] tracking-widest">{u.personalID}</td>
                    <td className="px-8 py-6">
                      {u.isPremium ? (
                        <span className="bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#F5C518]/20 flex items-center gap-2 tracking-widest">
                          <Crown size={12} fill="currentColor" /> PREMIUM
                        </span>
                      ) : (
                        <span className="bg-white/5 text-white/30 text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 tracking-widest">FREE</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-xs text-white/40 font-light">
                      {u.createdAt?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => toggleUserPremium(u.id, u.isPremium)}
                        className="text-xs font-bold text-[#F5C518] hover:underline tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {u.isPremium ? 'Downgrade' : 'Upgrade'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'codes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="prestige-card p-10 border-white/5 bg-white/[0.02]">
              <h2 className="font-display italic text-2xl text-white mb-8 flex items-center gap-4">
                <Plus size={24} className="text-[#F5C518]" />
                Generate Codes
              </h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] block">Access Tier</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setCodeType('FREE')}
                      className={`py-4 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all ${codeType === 'FREE' ? 'border-[#F5C518] bg-[#F5C518]/10 text-[#F5C518]' : 'border-white/5 text-white/20 hover:text-white/40'}`}
                    >
                      Standard
                    </button>
                    <button 
                      onClick={() => setCodeType('PREM')}
                      className={`py-4 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all ${codeType === 'PREM' ? 'border-[#F5C518] bg-[#F5C518] text-[#050505]' : 'border-white/5 text-white/20 hover:text-white/40'}`}
                    >
                      Premium
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] block">Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="50"
                    value={codeCount}
                    onChange={(e) => setCodeCount(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-display italic text-2xl text-white focus:outline-none focus:border-[#F5C518]/50"
                  />
                </div>
                <button 
                  onClick={generateCodes}
                  disabled={actionLoading}
                  className="prestige-button-primary w-full !py-5 text-sm tracking-[0.2em] disabled:opacity-20"
                >
                  {actionLoading ? 'GENERATING...' : 'GENERATE CREDENTIALS'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="prestige-card overflow-hidden border-white/5">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <h2 className="font-display italic text-2xl text-white flex items-center gap-4">
                  <Key size={24} className="text-[#F5C518]" />
                  Recent Credentials
                </h2>
                <button onClick={fetchData} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all">
                  <RefreshCcw size={18} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/[0.01] text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                      <th className="px-8 py-6">Code</th>
                      <th className="px-8 py-6">Type</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr><td colSpan={4} className="px-8 py-24 text-center text-white/20 font-light italic text-xl">Retrieving credentials...</td></tr>
                    ) : codes.map((c) => (
                      <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <span className="font-mono font-bold text-white tracking-widest">{c.code}</span>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(c.code);
                                setMessage({ text: 'Code copied to clipboard', type: 'success' });
                              }}
                              className="text-white/10 hover:text-[#F5C518] transition-colors"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border tracking-widest ${c.codeType === 'PREM' ? 'border-[#F5C518] text-[#F5C518] bg-[#F5C518]/10' : 'border-white/10 text-white/30 bg-white/5'}`}>
                            {c.codeType}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          {c.isUsed ? (
                            <span className="text-rose-500 text-[10px] font-bold flex items-center gap-2 tracking-widest uppercase">
                              <AlertCircle size={14} /> EXPIRED
                            </span>
                          ) : (
                            <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-2 tracking-widest uppercase">
                              <CheckCircle size={14} /> ACTIVE
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-6 text-xs text-white/40 font-light">
                          {c.createdAt?.toDate().toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prestige-card p-12 space-y-8 border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-3xl bg-[#F5C518]/10 flex items-center justify-center border border-[#F5C518]/20">
              <Database className="text-[#F5C518]" size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display italic text-white">Database Synchronization</h2>
              <p className="text-white/40 font-light tracking-wide">Initialize or reset the core educational intelligence layer.</p>
            </div>
            <button 
              onClick={handleSeed}
              disabled={actionLoading}
              className="prestige-button-primary w-full !py-5 text-sm tracking-[0.2em] flex items-center justify-center gap-4 disabled:opacity-20"
            >
              <Zap size={20} className="text-[#050505]" fill="currentColor" />
              {actionLoading ? 'SYNCHRONIZING...' : 'SEED CORE DATA'}
            </button>
          </div>

          <div className="prestige-card p-12 space-y-8 border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
              <RefreshCcw className="text-rose-500" size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display italic text-white">System Recovery</h2>
              <p className="text-white/40 font-light tracking-wide">Emergency protocols for account restoration and maintenance.</p>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-white/5 border border-white/10 text-white/40 font-bold py-4 rounded-2xl hover:bg-white/10 hover:text-white transition-all text-[10px] uppercase tracking-[0.3em]">
                Clear Expired Credentials
              </button>
              <button className="w-full bg-white/5 border border-white/10 text-white/40 font-bold py-4 rounded-2xl hover:bg-white/10 hover:text-white transition-all text-[10px] uppercase tracking-[0.3em]">
                Reset Global Intelligence Streaks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
