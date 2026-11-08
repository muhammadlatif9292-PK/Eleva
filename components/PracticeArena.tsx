import React, { useState, useEffect } from 'react';
import { motion as motionImport, AnimatePresence } from 'motion/react';
const motion = motionImport as any;
import { 
  ChevronLeft, 
  Zap, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  BookOpen,
  RotateCcw,
  Home
} from 'lucide-react';
import { Question as PhysicsQuestion, physicsQuestions } from '../data/physicsQuestions';
import { Question as ChemistryQuestion, chemistryQuestions } from '../data/chemistryQuestions';
import { PhysicsDiagrams } from './PhysicsDiagrams';
import { InteractiveChemistryDiagram } from './InteractiveChemistryDiagram';
import { db, handleFirestoreError } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

type Question = PhysicsQuestion | ChemistryQuestion;

interface PracticeArenaProps {
  user: any;
  unitId?: string;
  subject?: 'physics' | 'chemistry';
  onBack: () => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({ user, unitId, subject = 'physics', onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(unitId === 'mock' ? 3600 : null); // 60 mins for mock

  useEffect(() => {
    if (timeLeft === null || showResults) return;
    if (timeLeft === 0) {
      setShowResults(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => (t ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResults]);

  useEffect(() => {
    const sourceQuestions = subject === 'chemistry' ? chemistryQuestions : physicsQuestions;
    
    // Filter questions by unit if provided, otherwise random mix
    let filtered = unitId && unitId !== 'mock'
      ? (sourceQuestions as any[]).filter(q => q.unitID === unitId)
      : [...sourceQuestions].sort(() => Math.random() - 0.5).slice(0, 15); // 15 for mock
    
    if (filtered.length === 0) filtered = sourceQuestions.slice(0, 5);
    setQuestions(filtered);
  }, [unitId, subject]);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = async () => {
    if (selectedOption === null || isAnswered) return;
    
    const correct = selectedOption === questions[currentIndex].correctAnswer;
    setIsAnswered(true);
    
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      // Award XP in Firebase
      try {
        await updateDoc(doc(db, 'xpAndLevels', user.userID), {
          totalXP: increment(10),
          weeklyXP: increment(10)
        });
      } catch (err) {
        handleFirestoreError(err, 'update' as any, `xpAndLevels/${user.userID}`);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-50 overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2CC1]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-2xl mx-auto px-8 py-24 text-center space-y-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="w-32 h-32 rounded-[3rem] bg-[#F5C518] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,197,24,0.3)]">
              <Trophy size={64} className="text-[#050505]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-6xl font-display italic text-white tracking-tighter">Session Mastered</h2>
              <p className="text-white/40 text-sm tracking-[0.4em] uppercase">Intellectual Synchronization Complete</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            <div className="prestige-card p-10 space-y-2 border-white/5">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Accuracy</p>
              <p className="text-5xl font-display italic text-[#F5C518]">{Math.round((score / questions.length) * 100)}%</p>
            </div>
            <div className="prestige-card p-10 space-y-2 border-white/5">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">XP Gained</p>
              <p className="text-5xl font-display italic text-white">+{score * 10}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.location.reload()}
              className="prestige-button-primary w-full sm:w-auto px-16 py-6 text-sm tracking-[0.2em] flex items-center justify-center gap-3"
            >
              <RotateCcw size={18} />
              RETRY ARENA
            </button>
            <button 
              onClick={onBack}
              className="prestige-button-secondary w-full sm:w-auto px-16 py-6 text-sm tracking-[0.2em] flex items-center justify-center gap-3"
            >
              <Home size={18} />
              DASHBOARD
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1B2CC115,transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-8 py-8 flex items-center justify-between border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 max-w-md mx-12 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <span className={`font-mono text-sm ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-[#F5C518]'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              )}
              <span className="text-[#F5C518]">{streak}x Streak</span>
            </div>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#F5C518] shadow-[0_0_15px_rgba(245,197,24,0.5)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
          <Zap size={20} className="text-[#F5C518]" />
          <span className="font-display italic text-xl text-white">{score * 10}</span>
        </div>
      </header>

      {/* Arena Content */}
      <main className="flex-1 relative z-10 overflow-y-auto px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-[clamp(2rem,6vw,3rem)] font-display italic text-white leading-tight tracking-tight">
                  {currentQuestion.text}
                </h2>
                <p className="text-2xl md:text-3xl font-urdu text-white/40 leading-relaxed text-right">
                  {currentQuestion.urduText}
                </p>
              </div>

              {currentQuestion.diagramId && (
                <div className="prestige-card p-8 border-white/5 bg-white/[0.02] flex items-center justify-center">
                  {subject === 'chemistry' ? (
                    <InteractiveChemistryDiagram id={currentQuestion.diagramId} />
                  ) : (
                    <PhysicsDiagrams id={currentQuestion.diagramId} className="w-full max-w-lg h-auto" />
                  )}
                </div>
              )}

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = isAnswered && idx === currentQuestion.correctAnswer;
                  const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctAnswer;

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!isAnswered ? { y: -4, scale: 1.01 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionSelect(idx)}
                      className={`relative prestige-card p-8 text-left transition-all duration-500 overflow-hidden ${
                        isSelected ? 'border-[#F5C518]/50 bg-white/[0.03]' : 'border-white/5'
                      } ${isCorrect ? '!border-emerald-500/50 bg-emerald-500/5' : ''} ${
                        isWrong ? '!border-rose-500/50 bg-rose-500/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isSelected ? 'bg-[#F5C518] text-[#050505]' : 'bg-white/5 text-white/40'
                        } ${isCorrect ? '!bg-emerald-500 !text-white' : ''} ${
                          isWrong ? '!bg-rose-500 !text-white' : ''
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <div className="space-y-2 flex-1">
                          <p className={`text-lg font-light transition-colors ${isSelected ? 'text-white' : 'text-white/60'}`}>
                            {option}
                          </p>
                          <p className="text-xl font-urdu text-white/20 text-right">
                            {currentQuestion.urduOptions[idx]}
                          </p>
                        </div>
                        {isCorrect && <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />}
                        {isWrong && <XCircle className="text-rose-500 shrink-0" size={24} />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Feedback & Mastery Section */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prestige-card p-10 border-[#F5C518]/20 bg-gradient-to-br from-[#F5C518]/5 to-transparent space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518]">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-xl font-display italic text-white">Concept Insight</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <p className="text-white/60 font-light leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-lg font-urdu text-white/40 leading-loose text-right">
                      یہ تصور بورڈ کے امتحانات کے لیے بہت اہم ہے۔ اسے اچھی طرح سمجھنا آپ کی کامیابی کی ضمانت ہے۔
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-6 pt-4 border-t border-white/5">
                  <button className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-widest hover:text-[#F5C518] transition-colors">
                    <BookOpen size={16} />
                    View Unit Lecture
                  </button>
                  <button 
                    onClick={handleNext}
                    className="prestige-button-primary px-10 py-4 text-xs tracking-widest flex items-center gap-3"
                  >
                    CONTINUE
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Action Bar */}
      {!isAnswered && (
        <footer className="relative z-10 p-8 border-t border-white/5 bg-[#050505]/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
              Select the most precise answer
            </p>
            <button 
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`prestige-button-primary px-16 py-5 text-sm tracking-[0.2em] transition-all ${
                selectedOption === null ? 'opacity-20 grayscale cursor-not-allowed' : 'opacity-100'
              }`}
            >
              CHECK ANSWER
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
