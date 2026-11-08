import React from 'react';
import { motion as motionImport } from 'motion/react';
const motion = motionImport as any;
import { ChevronLeft, Book, Zap, Target, Sparkles } from 'lucide-react';

interface FormulaSheetProps {
  onBack: () => void;
}

export const PhysicsFormulaSheet: React.FC<FormulaSheetProps> = ({ onBack }) => {
  const formulas = [
    {
      unit: "Unit 10: SHM & Waves",
      items: [
        { name: "Time Period (Spring)", formula: "T = 2π√(m/k)", urdu: "وقت کا دورانیہ (اسپرنگ)" },
        { name: "Time Period (Pendulum)", formula: "T = 2π√(l/g)", urdu: "وقت کا دورانیہ (پینڈولم)" },
        { name: "Wave Equation", formula: "v = fλ", urdu: "لہر کی مساوات" }
      ]
    },
    {
      unit: "Unit 12: Geometrical Optics",
      items: [
        { name: "Mirror/Lens Formula", formula: "1/f = 1/p + 1/q", urdu: "آئینہ/لینس فارمولا" },
        { name: "Refractive Index", formula: "n = c/v = sin(i)/sin(r)", urdu: "ریفریکٹیو انڈیکس" },
        { name: "Power of Lens", formula: "P = 1/f (in meters)", urdu: "لینس کی طاقت" }
      ]
    },
    {
      unit: "Unit 13: Electrostatics",
      items: [
        { name: "Coulomb's Law", formula: "F = k(q1q2)/r²", urdu: "کولمب کا قانون" },
        { name: "Electric Field", formula: "E = F/q", urdu: "الیکٹرک فیلڈ" },
        { name: "Capacitance", formula: "C = Q/V", urdu: "کیپیسیٹنس" }
      ]
    },
    {
      unit: "Unit 14: Current Electricity",
      items: [
        { name: "Ohm's Law", formula: "V = IR", urdu: "اوہم کا قانون" },
        { name: "Electric Power", formula: "P = VI = I²R = V²/R", urdu: "برقی طاقت" },
        { name: "Series Resistance", formula: "Re = R1 + R2 + ...", urdu: "سیریز مزاحمت" },
        { name: "Parallel Resistance", formula: "1/Re = 1/R1 + 1/R2 + ...", urdu: "متوازی مزاحمت" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#050505] z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1B2CC110,transparent_50%)] pointer-events-none" />
      
      <header className="sticky top-0 z-20 px-8 py-8 flex items-center justify-between border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-display italic text-white tracking-tighter">Formula Vault</h2>
          <p className="text-white/30 font-urdu text-lg">فارمولا والٹ — تمام اہم مساواتیں</p>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formulas.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="prestige-card p-10 space-y-8 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1B2CC1]/10 flex items-center justify-center text-[#1B2CC1]">
                  <Book size={20} />
                </div>
                <h3 className="text-2xl font-display italic text-white">{section.unit}</h3>
              </div>

              <div className="space-y-6">
                {section.items.map((item, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#F5C518]/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{item.name}</span>
                      <span className="text-sm font-urdu text-white/20">{item.urdu}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="text-3xl font-mono text-[#F5C518] tracking-tight group-hover:scale-105 transition-transform origin-left">
                        {item.formula}
                      </code>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[#F5C518] transition-colors">
                        <Sparkles size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-24 text-center space-y-6">
          <div className="w-20 h-1 bg-[#F5C518] mx-auto rounded-full opacity-20" />
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">End of Formula Vault</p>
        </footer>
      </main>
    </div>
  );
};
