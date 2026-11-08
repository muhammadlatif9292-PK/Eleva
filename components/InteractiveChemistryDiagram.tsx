'use client';

import React, { useState } from 'react';
import { motion as motionImport, AnimatePresence } from 'motion/react';
const motion = motionImport as any;
import { ChevronRight, ChevronLeft, RefreshCcw, Info } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  urduDescription: string;
  visual: React.ReactNode;
}

interface DiagramData {
  [key: string]: {
    title: string;
    steps: Step[];
  };
}

const diagramData: DiagramData = {
  'reversible-reaction': {
    title: 'Reversible Reaction Mechanism',
    steps: [
      {
        title: 'Initial State',
        description: 'Reactants A and B are present in the system.',
        urduDescription: 'نظام میں ری ایکٹنٹس A اور B موجود ہیں۔',
        visual: (
          <div className="flex items-center justify-center gap-12 h-40">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-400"
            >A</motion.div>
            <div className="text-2xl text-white/20">+</div>
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-400"
            >B</motion.div>
          </div>
        )
      },
      {
        title: 'Forward Reaction',
        description: 'Reactants collide and form products C and D.',
        urduDescription: 'ری ایکٹنٹس آپس میں ٹکراتے ہیں اور پروڈکٹس C اور D بناتے ہیں۔',
        visual: (
          <div className="flex items-center justify-center gap-12 h-40 relative">
             <motion.div 
              animate={{ x: [0, 40, 0] }}
              className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-400"
            >A</motion.div>
            <motion.div 
              animate={{ x: [0, -40, 0] }}
              className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-400"
            >B</motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-yellow-500/10 blur-xl animate-pulse" />
            </motion.div>
          </div>
        )
      },
      {
        title: 'Dynamic Equilibrium',
        description: 'Forward and reverse reactions occur at the same rate.',
        urduDescription: 'فارورڈ اور ریورس ری ایکشن ایک ہی شرح پر ہوتے ہیں۔',
        visual: (
          <div className="flex flex-col items-center justify-center gap-8 h-40">
            <div className="flex items-center gap-12">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50" />
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50" />
            </div>
            <div className="flex items-center gap-4 text-[#F59E0B]">
              <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity }}><ChevronRight size={32} /></motion.div>
              <motion.div animate={{ x: [0, -20, 0] }} transition={{ repeat: Infinity }}><ChevronLeft size={32} /></motion.div>
            </div>
            <div className="flex items-center gap-12">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50" />
              <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/50" />
            </div>
          </div>
        )
      }
    ]
  }
};

export const InteractiveChemistryDiagram: React.FC<{ id: string }> = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const data = diagramData[id] || diagramData['reversible-reaction'];
  const step = data.steps[currentStep];

  return (
    <div className="prestige-card overflow-hidden border-white/5 bg-white/[0.01]">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
            <RefreshCcw size={20} className={currentStep > 0 ? 'animate-spin-slow' : ''} />
          </div>
          <h4 className="font-display italic text-xl text-white">{data.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          {data.steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentStep ? 'w-8 bg-[#F59E0B]' : 'w-2 bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="p-12 min-h-[400px] flex flex-col justify-between gap-12">
        <div className="relative flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {step.visual}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest">
              <Info size={14} />
              <span>Step {currentStep + 1}: {step.title}</span>
            </div>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              {step.description}
            </p>
          </div>
          <div className="text-right space-y-4">
            <p className="text-xl font-urdu text-white/40 leading-relaxed">
              {step.urduDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
        <button 
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(prev => prev - 1)}
          className="flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all disabled:opacity-0"
        >
          <ChevronLeft size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Previous</span>
        </button>

        <button 
          onClick={() => currentStep === data.steps.length - 1 ? setCurrentStep(0) : setCurrentStep(prev => prev + 1)}
          className="flex items-center gap-3 px-8 py-3 rounded-xl bg-[#F59E0B] text-[#050505] font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
        >
          <span>{currentStep === data.steps.length - 1 ? 'RESTART' : 'NEXT STEP'}</span>
          {currentStep !== data.steps.length - 1 && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};
