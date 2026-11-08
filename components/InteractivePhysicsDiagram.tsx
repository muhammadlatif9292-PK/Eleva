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
  'shm-mechanism': {
    title: 'Simple Harmonic Motion Mechanism',
    steps: [
      {
        title: 'Equilibrium Position',
        description: 'The mass is at rest, and the net force is zero.',
        urduDescription: 'ماس آرام کی حالت میں ہے، اور نیٹ فورس صفر ہے۔',
        visual: (
          <div className="flex flex-col items-center justify-center gap-12 h-40">
            <div className="w-full h-1 bg-white/10 relative">
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 rounded-2xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-400"
              >m</motion.div>
            </div>
            <div className="text-sm font-mono text-white/20 uppercase tracking-widest">x = 0</div>
          </div>
        )
      },
      {
        title: 'Maximum Displacement',
        description: 'The mass is pulled to its extreme position, storing potential energy.',
        urduDescription: 'ماس کو اس کی آخری پوزیشن پر کھینچا جاتا ہے، جس سے پوٹینشل انرجی اسٹور ہوتی ہے۔',
        visual: (
          <div className="flex flex-col items-center justify-center gap-12 h-40">
            <div className="w-full h-1 bg-white/10 relative">
              <motion.div 
                initial={{ x: 0 }}
                animate={{ x: 120 }}
                className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 rounded-2xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-400"
              >m</motion.div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                className="absolute left-1/2 h-1 bg-blue-500/50"
              />
            </div>
            <div className="text-sm font-mono text-[#F5C518] uppercase tracking-widest">x = +A</div>
          </div>
        )
      },
      {
        title: 'Restoring Force',
        description: 'The force pulls the mass back toward the equilibrium position.',
        urduDescription: 'فورس ماس کو واپس توازن کی پوزیشن کی طرف کھینچتی ہے۔',
        visual: (
          <div className="flex flex-col items-center justify-center gap-12 h-40">
            <div className="w-full h-1 bg-white/10 relative">
              <motion.div 
                animate={{ x: [120, 0] }}
                transition={{ duration: 1, ease: "circIn" }}
                className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 rounded-2xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-400"
              >m</motion.div>
              <motion.div 
                animate={{ opacity: [0, 1, 0], x: [120, 60] }}
                transition={{ repeat: Infinity }}
                className="absolute left-1/2 top-0 text-[#F5C518]"
              >
                <ChevronLeft size={32} />
              </motion.div>
            </div>
            <div className="text-sm font-mono text-white/20 uppercase tracking-widest">F = -kx</div>
          </div>
        )
      }
    ]
  }
};

export const InteractivePhysicsDiagram: React.FC<{ id: string }> = ({ id }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const data = diagramData[id] || diagramData['shm-mechanism'];
  const step = data.steps[currentStep];

  return (
    <div className="prestige-card overflow-hidden border-white/5 bg-white/[0.01]">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518]">
            <RefreshCcw size={20} className={currentStep > 0 ? 'animate-spin-slow' : ''} />
          </div>
          <h4 className="font-display italic text-xl text-white">{data.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          {data.steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentStep ? 'w-8 bg-[#F5C518]' : 'w-2 bg-white/10'
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
            <div className="flex items-center gap-3 text-[10px] font-bold text-[#F5C518] uppercase tracking-widest">
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
          className="flex items-center gap-3 px-8 py-3 rounded-xl bg-[#F5C518] text-[#050505] font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
        >
          <span>{currentStep === data.steps.length - 1 ? 'RESTART' : 'NEXT STEP'}</span>
          {currentStep !== data.steps.length - 1 && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};
