"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion as motionImport, AnimatePresence } from 'motion/react';
const motion = motionImport as any;
import { useStore } from '@/lib/store';
import { 
  Atom, 
  Zap, 
  Microscope, 
  BookOpen, 
  User, 
  Key, 
  AlertCircle,
  GraduationCap,
  Star,
  Bot,
  ArrowRight,
  Shield
} from 'lucide-react';
import { auth, db, handleFirestoreError } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInAnonymously, 
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  Timestamp
} from 'firebase/firestore';

// Dynamic imports for sub-components to bypass SSR during build
const PhysicsHome = dynamic(() => import('@/components/PhysicsHome').then(mod => mod.PhysicsHome), { ssr: false });
const PhysicsChat = dynamic(() => import('@/components/PhysicsChat').then(mod => mod.PhysicsChat), { ssr: false });
const PhysicsLecture = dynamic(() => import('@/components/PhysicsLecture').then(mod => mod.PhysicsLecture), { ssr: false });
const ChemistryHome = dynamic(() => import('@/components/ChemistryHome').then(mod => mod.ChemistryHome), { ssr: false });
const ChemistryChat = dynamic(() => import('@/components/ChemistryChat').then(mod => mod.ChemistryChat), { ssr: false });
const ChemistryLecture = dynamic(() => import('@/components/ChemistryLecture').then(mod => mod.ChemistryLecture), { ssr: false });
const AdminPanel = dynamic(() => import('@/components/AdminPanel').then(mod => mod.AdminPanel), { ssr: false });
const PracticeScreen = dynamic(() => import('@/components/PracticeScreen').then(mod => mod.PracticeScreen), { ssr: false });
const TestsScreen = dynamic(() => import('@/components/TestsScreen').then(mod => mod.TestsScreen), { ssr: false });
const PhysicsFormulaSheet = dynamic(() => import('@/components/PhysicsFormulaSheet').then(mod => mod.PhysicsFormulaSheet), { ssr: false });
const PracticeArena = dynamic(() => import('@/components/PracticeArena').then(mod => mod.PracticeArena), { ssr: false });

// --- Types ---
type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

interface UserProfile {
  userID: string;
  personalID: string;
  userType: UserRole;
  displayName: string;
  studentFullName: string;
  fatherName: string;
  avatar: string;
  email: string | null;
  isPremium: boolean;
  nativeLanguage: 'english' | 'urdu' | 'both';
  isFirstLogin: boolean;
  profileComplete: boolean;
  grade: number;
  board: string;
  createdAt: any;
}

// --- Constants ---
const SUBJECTS = [
  { id: 'math', nameEN: 'Mathematics', nameUR: 'ریاضی', icon: BookOpen, color: '#3B82F6' },
  { id: 'physics', nameEN: 'Physics', nameUR: 'طبیعیات', icon: Atom, color: '#8B5CF6' },
  { id: 'biology', nameEN: 'Biology', nameUR: 'حیاتیات', icon: Microscope, color: '#10B981' },
  { id: 'chemistry', nameEN: 'Chemistry', nameUR: 'کیمیا', icon: Zap, color: '#F59E0B' },
  { id: 'english', nameEN: 'English', nameUR: 'انگریزی', icon: BookOpen, color: '#EC4899' },
  { id: 'urdu', nameEN: 'Urdu', nameUR: 'اردو', icon: BookOpen, color: '#EF4444' },
];

// --- Components ---

const ElevaNoirIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 50),     // 0.05s: Logo Shimmer
      setTimeout(() => setStage(2), 1000),   // 1.0s: Tagline Blur-to-Focus
      setTimeout(() => setStage(3), 2000),   // 2.0s: Subject Pulse Grid
      setTimeout(() => setStage(4), 3000),   // 3.0s: Seamless Entrance
      setTimeout(() => onComplete(), 4000),  // 4.0s: End
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] grid place-items-center z-[999] overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1B2CC1]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div 
        className="flex flex-col items-center gap-16 w-full max-w-4xl px-8"
        animate={stage === 4 ? { scale: 1.05, opacity: 0 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[clamp(4rem,15vw,8rem)] font-display italic text-[#F5C518] tracking-[-0.05em] relative"
          >
            Eleva
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: '-150%' }}
              animate={stage >= 1 ? { x: '250%' } : {}}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
            />
          </motion.h1>
        </div>

        <div className="min-h-[4rem] flex items-center justify-center">
          <AnimatePresence>
            {stage >= 2 && (
              <motion.p
                initial={{ opacity: 0, filter: 'blur(30px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/60 text-[clamp(1.2rem,3vw,1.8rem)] font-sans font-light tracking-[0.5rem] uppercase text-center"
              >
                Elevate Your Knowledge
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-8">
          {SUBJECTS.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0 }}
              animate={stage >= 3 ? { 
                opacity: [0.05, 0.6, 0.05],
                y: [0, -4, 0]
              } : {}}
              transition={{ 
                duration: 2, 
                delay: i * 0.2,
                repeat: stage === 3 ? Infinity : 0
              }}
              className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] text-center px-6 py-3 border border-white/5 rounded-2xl bg-white/[0.02]"
            >
              {sub.nameEN}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const HandoverCard = ({ name, onDismiss }: { name: string, onDismiss: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] grid place-items-center bg-[#050505]/90 backdrop-blur-2xl p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="prestige-card p-12 max-w-lg w-full text-center space-y-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F5C518] to-transparent" />
        
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-[#F5C518]/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-[#1B2CC1] to-[#050505] rounded-[2rem] flex items-center justify-center border border-white/10 shadow-2xl">
            <Bot size={48} className="text-[#F5C518]" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[clamp(2.5rem,8vw,3rem)] font-display italic text-white tracking-tight break-words">Welcome, {name}</h2>
          <p className="text-white/40 text-xl font-light leading-relaxed">
            Neural Link initialized. <span className="text-[#F5C518] font-bold italic">Academic Mastery</span> is ready for your engagement.
          </p>
        </div>

        <button 
          onClick={onDismiss}
          className="prestige-button-primary w-full text-lg tracking-[0.2em] py-6"
        >
          BEGIN SESSION
        </button>

        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
          Neural Link Established • KPTBB Standard
        </p>
      </motion.div>
    </motion.div>
  );
};

const AuthScreen = ({ onAuthSuccess }: { onAuthSuccess: (user: UserProfile) => void }) => {
  const [step, setStep] = useState<'code' | 'profile' | 'id_reveal'>('code');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    fatherName: '',
    avatar: '1'
  });
  const [generatedID, setGeneratedID] = useState('');

  const validateCode = async () => {
    // HARDCODED BYPASS: Directly proceed to Physics Home Screen
    setLoading(true);
    setError('');
    try {
      // Temporarily bypass Firebase check for preview
      const credential = await signInAnonymously(auth);
      const uid = credential.user.uid;
      
      // Check if profile already exists
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (userDoc.exists()) {
        onAuthSuccess(userDoc.data() as UserProfile);
        return;
      }

      const mockUser: UserProfile = {
        userID: uid,
        personalID: `ELEVA-STD-${Math.floor(10000 + Math.random() * 90000)}`,
        userType: 'student',
        displayName: 'Prestige Scholar',
        studentFullName: 'Prestige Scholar',
        fatherName: 'Academic Excellence',
        avatar: '1',
        email: 'scholar@eleva.edu',
        isPremium: true,
        nativeLanguage: 'both',
        isFirstLogin: false,
        profileComplete: true,
        grade: 10,
        board: 'KPTBB',
        createdAt: Timestamp.now(),
      };
      
      // Persist the mock user to Firestore so it survives refreshes
      await setDoc(doc(db, 'users', uid), mockUser);
      
      onAuthSuccess(mockUser);
    } catch (err) {
      console.error("Bypass login failed:", err);
      // Fallback mock user if Firebase fails (non-persistent)
      const fallbackUser: UserProfile = {
        userID: 'fallback-uid',
        personalID: 'ELEVA-STD-99999',
        userType: 'student',
        displayName: 'Guest Scholar',
        studentFullName: 'Guest Scholar',
        fatherName: 'System Bypass',
        avatar: '1',
        email: null,
        isPremium: true,
        nativeLanguage: 'both',
        isFirstLogin: false,
        profileComplete: true,
        grade: 10,
        board: 'KPTBB',
        createdAt: Timestamp.now(),
      };
      onAuthSuccess(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser?.uid || ''));
      if (userDoc.exists()) {
        onAuthSuccess(userDoc.data() as UserProfile);
      } else {
        setStep('profile');
      }
    } catch (err) {
      handleFirestoreError(err, 'get' as any, 'users');
    } finally {
      setLoading(false);
    }
  };

  const completeProfile = async () => {
    if (profile.fullName.length < 3 || profile.fatherName.length < 3) {
      setError('Both names must be at least 3 characters.');
      return;
    }

    setLoading(true);
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('No user');

      const personalID = `ELEVA-STD-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedID(personalID);

      const newUser: UserProfile = {
        userID: uid,
        personalID: personalID,
        userType: auth.currentUser?.email === 'muhammadlatif9292@gmail.com' ? 'admin' : 'student',
        displayName: profile.fullName.split(' ')[0],
        studentFullName: profile.fullName,
        fatherName: profile.fatherName,
        avatar: profile.avatar,
        email: auth.currentUser?.email || null,
        isPremium: accessCode.includes('PREM') || auth.currentUser?.email === 'muhammadlatif9292@gmail.com',
        nativeLanguage: 'both',
        isFirstLogin: false,
        profileComplete: true,
        grade: 10,
        board: 'KPTBB',
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(db, 'users', uid), newUser);

      if (accessCode) {
        await setDoc(doc(db, 'accessCodes', accessCode), { 
          isUsed: true, 
          usedByUserID: uid,
          usedAt: Timestamp.now()
        }, { merge: true });
      }

      onAuthSuccess(newUser);
      setStep('id_reveal');
    } catch (err) {
      handleFirestoreError(err, 'write' as any, 'users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1B2CC1]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F5C518]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md prestige-card p-10 md:p-12 relative z-10"
      >
        <div className="flex justify-center mb-12">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-20 h-20 bg-[#F5C518] rounded-[2rem] flex items-center justify-center prestige-button-primary !p-0"
          >
            <GraduationCap size={40} className="text-[#050505]" />
          </motion.div>
        </div>

        {step === 'code' && (
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-[clamp(2.5rem,8vw,3rem)] font-display italic text-white leading-tight tracking-tight">Eleva Prestige</h2>
              <p className="text-white/40 text-sm tracking-widest uppercase">Elite Learning Gateway</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Access Credentials</label>
                <div className="relative group">
                  <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F5C518] transition-colors" size={20} />
                  <input 
                    type="text"
                    placeholder="ELV-XXXX-XXX"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white text-lg font-light focus:outline-none focus:border-[#F5C518]/50 transition-all placeholder:text-white/10"
                  />
                </div>
                {error && <p className="text-rose-400 text-xs flex items-center gap-2 ml-2"><AlertCircle size={14} /> {error}</p>}
              </div>
            </div>

            <button 
              onClick={validateCode}
              disabled={loading}
              className="prestige-button-primary w-full text-lg tracking-[0.2em]"
            >
              {loading ? 'AUTHENTICATING...' : 'ENTER GATEWAY'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.4em]">
                <span className="bg-[#050505] px-4 text-white/20">Executive Access</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="prestige-button-secondary w-full flex items-center justify-center gap-4 text-sm tracking-widest font-bold"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 opacity-80" alt="Google" />
              SIGN IN WITH GOOGLE
            </button>
          </div>
        )}

        {step === 'profile' && (
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-[clamp(2.5rem,8vw,3rem)] font-display italic text-white leading-tight tracking-tight">Profile Setup</h2>
              <p className="text-white/40 text-sm tracking-widest uppercase">Personalize Your Experience</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Full Name</label>
                <input 
                  type="text"
                  placeholder="Enter your full name"
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-6 text-white text-lg font-light focus:outline-none focus:border-[#F5C518]/50 transition-all placeholder:text-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Father&apos;s Name</label>
                <input 
                  type="text"
                  placeholder="Enter father's name"
                  value={profile.fatherName}
                  onChange={(e) => setProfile({...profile, fatherName: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-6 text-white text-lg font-light focus:outline-none focus:border-[#F5C518]/50 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            {error && <p className="text-rose-400 text-xs flex items-center gap-2 ml-2"><AlertCircle size={14} /> {error}</p>}

            <button 
              onClick={completeProfile}
              disabled={loading}
              className="prestige-button-primary w-full text-lg tracking-[0.2em]"
            >
              {loading ? 'INITIALIZING...' : 'COMPLETE SETUP'}
            </button>
          </div>
        )}

        {step === 'id_reveal' && (
          <div className="space-y-10 text-center">
            <div className="space-y-3">
              <h2 className="text-[clamp(2.5rem,8vw,3rem)] font-display italic text-white leading-tight tracking-tight">Identity Verified</h2>
              <p className="text-white/40 text-sm tracking-widest uppercase">Your Executive Credentials</p>
            </div>

            <div className="prestige-card p-10 bg-white/[0.02] border-[#F5C518]/20 space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Personal ID</p>
                <p className="text-4xl font-mono text-[#F5C518] tracking-widest">{generatedID}</p>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="prestige-button-primary w-full text-lg tracking-[0.2em]"
            >
              START LEARNING
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const { user: userProfile, setUser: setUserProfile, isAuthReady, setAuthReady } = useStore();
  const [showIntro, setShowIntro] = useState(true);
  const [showHandover, setShowHandover] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'physics_home' | 'physics_chat' | 'physics_lecture' | 'chemistry_home' | 'chemistry_chat' | 'chemistry_lecture' | 'practice' | 'tests' | 'formula_sheet' | 'practice_arena' | 'admin'>('landing');
  const [activeSubject, setActiveSubject] = useState<'physics' | 'chemistry'>('physics');
  const [activeTopic, setActiveTopic] = useState<string | undefined>(undefined);
  const [activeUnit, setActiveUnit] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profile = userDoc.data() as UserProfile;
            setUserProfile(profile);
            if (!showIntro) setShowHandover(true);
          } else {
            // If user exists in Auth but not in Firestore, we might be in a bypass state
            // Let's create a mock profile if needed, or just wait for AuthScreen
          }
        } catch (err) {
          console.error("Auth state user fetch failed:", err);
        }
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [isMounted, showIntro, setUserProfile, setAuthReady]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (userProfile) {
      setShowHandover(true);
    }
  };

  if (!isMounted || showIntro) {
    return <ElevaNoirIntro onComplete={handleIntroComplete} />;
  }

  if (!isAuthReady) {
    return (
      <div className="fixed inset-0 bg-[#050505] grid place-items-center z-50">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-8"
        >
          <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-[#F5C518]">
            <Zap size={48} />
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Initializing Neural Link</p>
        </motion.div>
      </div>
    );
  }

  if (!userProfile) {
    return <AuthScreen onAuthSuccess={(profile) => setUserProfile(profile as any)} />;
  }

  // Main Content Router
  const renderContent = () => {
    switch (currentView) {
      case 'physics_home':
        return (
          <PhysicsHome 
            onBack={() => setCurrentView('landing')}
            onStartChat={(topic) => {
              setActiveTopic(topic);
              setActiveSubject('physics');
              setCurrentView('physics_chat');
            }}
            onOpenUnit={(unitId) => {
              setActiveUnit(unitId);
              setActiveSubject('physics');
              setCurrentView('physics_lecture');
            }}
            onNavigateToPractice={() => {
              setActiveSubject('physics');
              setCurrentView('practice');
            }}
            onNavigateToTests={() => {
              setActiveSubject('physics');
              setCurrentView('tests');
            }}
            onOpenFormulaSheet={() => setCurrentView('formula_sheet')}
          />
        );
      case 'physics_chat':
        return <PhysicsChat onBack={() => setCurrentView('physics_home')} initialTopic={activeTopic} />;
      case 'physics_lecture':
        return (
          <PhysicsLecture 
            onBack={() => setCurrentView('physics_home')} 
            unitId={activeUnit || 'unit1'} 
            onStartChat={(topic) => {
              setActiveTopic(topic);
              setCurrentView('physics_chat');
            }}
          />
        );
      case 'chemistry_home':
        return (
          <ChemistryHome 
            onBack={() => setCurrentView('landing')}
            onStartChat={(topic) => {
              setActiveTopic(topic);
              setActiveSubject('chemistry');
              setCurrentView('chemistry_chat');
            }}
            onOpenUnit={(unitId) => {
              setActiveUnit(unitId);
              setActiveSubject('chemistry');
              setCurrentView('chemistry_lecture');
            }}
            onNavigateToPractice={() => {
              setActiveSubject('chemistry');
              setCurrentView('practice');
            }}
            onNavigateToTests={() => {
              setActiveSubject('chemistry');
              setCurrentView('tests');
            }}
          />
        );
      case 'chemistry_chat':
        return <ChemistryChat onBack={() => setCurrentView('chemistry_home')} initialTopic={activeTopic} />;
      case 'chemistry_lecture':
        return (
          <ChemistryLecture 
            onBack={() => setCurrentView('chemistry_home')} 
            unitId={activeUnit || 'unit1'} 
            onStartChat={(topic) => {
              setActiveTopic(topic);
              setCurrentView('chemistry_chat');
            }}
          />
        );
      case 'practice':
        return (
          <PracticeScreen 
            onBack={() => setCurrentView('landing')} 
            onStartPractice={(unitId) => {
              setActiveUnit(unitId);
              setCurrentView('practice_arena');
            }}
          />
        );
      case 'tests':
        return (
          <TestsScreen 
            onBack={() => setCurrentView('landing')} 
            onStartTest={(unitId) => {
              setActiveUnit(unitId);
              setCurrentView('practice_arena');
            }}
          />
        );
      case 'practice_arena':
        return <PracticeArena onBack={() => setCurrentView('landing')} unitId={activeUnit || 'unit1'} subject={activeSubject} user={userProfile} />;
      case 'formula_sheet':
        return <PhysicsFormulaSheet onBack={() => setCurrentView('physics_home')} />;
      case 'admin':
        return <AdminPanel user={userProfile} onBack={() => setCurrentView('landing')} />;
      default:
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
            <header className="text-center space-y-4">
              <h1 className="text-6xl font-display italic text-[#F5C518]">Welcome to Eleva</h1>
              <p className="text-white/40 text-xl font-light tracking-widest uppercase">Neural Link Established</p>
            </header>

            <div className="prestige-card p-12 max-w-2xl w-full text-center space-y-8">
              <div className="w-24 h-24 bg-[#F5C518]/10 rounded-[2rem] flex items-center justify-center mx-auto border border-[#F5C518]/20">
                <Zap size={48} className="text-[#F5C518]" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-display italic">Academic Mastery Awaits</h2>
                <p className="text-white/40 leading-relaxed">
                  Your profile is active. You are now connected to the elite learning gateway. 
                  Select a module to begin your journey.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Status</p>
                  <p className="text-emerald-400 font-bold">ONLINE</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Access</p>
                  <p className="text-[#F5C518] font-bold">{userProfile.isPremium ? 'PREMIUM' : 'STANDARD'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <button 
                onClick={() => setCurrentView('physics_home')}
                className="prestige-button-primary flex items-center justify-center gap-4 py-6"
              >
                <Atom size={24} />
                PHYSICS MODULE
              </button>
              <button 
                onClick={() => setCurrentView('chemistry_home')}
                className="prestige-button-primary flex items-center justify-center gap-4 py-6 border-[#F5C518]/20 bg-[#F5C518]/5 text-[#F5C518]"
              >
                <Zap size={24} />
                CHEMISTRY MODULE
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="prestige-button-secondary flex items-center justify-center gap-4 py-6 md:col-span-2"
              >
                <ArrowRight size={24} />
                REFRESH SYSTEM
              </button>
              {userProfile.userType === 'admin' && (
                <button 
                  onClick={() => setCurrentView('admin')}
                  className="prestige-button-secondary flex items-center justify-center gap-4 py-6 md:col-span-2 border-emerald-500/20 text-emerald-400"
                >
                  <Shield size={24} />
                  ADMIN CONTROL PANEL
                </button>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background Layers (z-0) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1B2CC1]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F5C518]/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {showHandover && (
          <HandoverCard 
            name={userProfile.displayName} 
            onDismiss={() => setShowHandover(false)} 
          />
        )}
      </AnimatePresence>

      {/* Main Content (z-10) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        {renderContent()}
      </main>
    </div>
  );
}
