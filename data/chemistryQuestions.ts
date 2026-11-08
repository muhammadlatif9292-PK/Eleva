export interface Question {
  id: string;
  unitID: string;
  text: string;
  urduText: string;
  options: string[];
  urduOptions: string[];
  correctAnswer: number; // index
  explanation: string;
  diagramId?: string;
}

export const chemistryQuestions: Question[] = [
  {
    id: "cq1",
    unitID: "c9",
    text: "A reaction in which products can react again to form reactants is called:",
    urduText: "ایک ری ایکشن جس میں پروڈکٹس دوبارہ ری ایکٹ کر کے ری ایکٹنٹس بنا سکتے ہیں، کہلاتا ہے:",
    options: ["Irreversible Reaction", "Reversible Reaction", "Complete Reaction", "Spontaneous Reaction"],
    urduOptions: ["ناقابل واپسی ری ایکشن", "ریورس ایبل ری ایکشن", "مکمل ری ایکشن", "خود بخود ری ایکشن"],
    correctAnswer: 1,
    explanation: "Reversible reactions can proceed in both directions and are represented by a double arrow."
  },
  {
    id: "cq2",
    unitID: "c9",
    text: "At dynamic equilibrium, the rate of forward reaction is:",
    urduText: "ڈائنامک ایکویلیبریم پر، فارورڈ ری ایکشن کی شرح کیا ہوتی ہے؟",
    options: ["Zero", "Greater than reverse rate", "Less than reverse rate", "Equal to reverse rate"],
    urduOptions: ["صفر", "ریورس ریٹ سے زیادہ", "ریورس ریٹ سے کم", "ریورس ریٹ کے برابر"],
    correctAnswer: 3,
    explanation: "Dynamic equilibrium occurs when the rates of forward and reverse reactions are equal."
  },
  {
    id: "cq3",
    unitID: "c10",
    text: "According to Arrhenius, a base is a substance that dissociates in water to give:",
    urduText: "آرہینیس کے مطابق، اساس ایک ایسا مادہ ہے جو پانی میں کیا دینے کے لیے الگ ہو جاتا ہے؟",
    options: ["H+ ions", "OH- ions", "Protons", "Electrons"],
    urduOptions: ["H+ آئنز", "OH- آئنز", "پروٹونز", "الیکٹرونز"],
    correctAnswer: 1,
    explanation: "Arrhenius bases release hydroxide ions (OH-) in aqueous solution."
  },
  {
    id: "cq4",
    unitID: "c10",
    text: "A Lewis acid is an electron-pair:",
    urduText: "لیوس تیزاب ایک الیکٹران پیئر کیا ہے؟",
    options: ["Donor", "Acceptor", "Neutral", "Generator"],
    urduOptions: ["ڈونر", "ایکسیپٹر", "نیوٹرل", "جنریٹر"],
    correctAnswer: 1,
    explanation: "Lewis acids are defined as electron-pair acceptors."
  },
  {
    id: "cq5",
    unitID: "c11",
    text: "The unique property of carbon to form long chains is called:",
    urduText: "کاربن کی لمبی زنجیریں بنانے کی منفرد خاصیت کہلاتی ہے:",
    options: ["Isomerism", "Catenation", "Polymerization", "Hydrogenation"],
    urduOptions: ["آئسومرزم", "کیٹینیشن", "پولیمرائزیشن", "ہائیڈروجنیشن"],
    correctAnswer: 1,
    explanation: "Catenation is the self-linking of carbon atoms to form long chains and rings."
  },
  {
    id: "cq6",
    unitID: "c11",
    text: "Which of the following is the functional group of alcohols?",
    urduText: "درج ذیل میں سے کون سا الکحل کا فنکشنل گروپ ہے؟",
    options: ["-CHO", "-COOH", "-OH", "-CO-"],
    urduOptions: ["-CHO", "-COOH", "-OH", "-CO-"],
    correctAnswer: 2,
    explanation: "The hydroxyl group (-OH) is the functional group of alcohols."
  },
  {
    id: "cq7",
    unitID: "c12",
    text: "The general formula for alkanes is:",
    urduText: "الکینز کا عمومی فارمولا ہے:",
    options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"],
    urduOptions: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"],
    correctAnswer: 1,
    explanation: "Alkanes follow the general formula CnH2n+2."
  },
  {
    id: "cq8",
    unitID: "c12",
    text: "Alkenes are unsaturated hydrocarbons containing at least one:",
    urduText: "الکینز غیر سیر شدہ ہائیڈرو کاربن ہیں جن میں کم از کم ایک کیا ہوتا ہے؟",
    options: ["Single bond", "Double bond", "Triple bond", "Ionic bond"],
    urduOptions: ["سنگل بانڈ", "ڈبل بانڈ", "ٹرپل بانڈ", "آئنک بانڈ"],
    correctAnswer: 1,
    explanation: "Alkenes contain at least one carbon-carbon double bond."
  },
  {
    id: "cq9",
    unitID: "c13",
    text: "Proteins are polymers of:",
    urduText: "پروٹینز کس کے پولیمر ہیں؟",
    options: ["Glucose", "Fatty acids", "Amino acids", "Nucleotides"],
    urduOptions: ["گلوکوز", "فیٹی ایسڈز", "امینو ایسڈز", "نیوکلیوٹائڈز"],
    correctAnswer: 2,
    explanation: "Proteins are made up of long chains of amino acids linked by peptide bonds."
  },
  {
    id: "cq10",
    unitID: "c13",
    text: "Which vitamin is fat-soluble?",
    urduText: "کون سا وٹامن چربی میں حل پذیر ہے؟",
    options: ["Vitamin B", "Vitamin C", "Vitamin A", "Vitamin B12"],
    urduOptions: ["وٹامن B", "وٹامن C", "وٹامن A", "وٹامن B12"],
    correctAnswer: 2,
    explanation: "Vitamins A, D, E, and K are fat-soluble, while B and C are water-soluble."
  },
  {
    id: "cq11",
    unitID: "c14",
    text: "The layer of atmosphere where most weather occurs is:",
    urduText: "کرہ ہوائی کی وہ تہہ جہاں زیادہ تر موسم ہوتا ہے:",
    options: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"],
    urduOptions: ["اسٹریٹوسفیئر", "ٹروپوسفیئر", "میسوسفیئر", "تھرموسفیئر"],
    correctAnswer: 1,
    explanation: "The troposphere is the lowest layer where weather phenomena take place."
  },
  {
    id: "cq12",
    unitID: "c14",
    text: "Acid rain is caused by the oxides of:",
    urduText: "تیزابی بارش کن کے آکسائیڈز کی وجہ سے ہوتی ہے؟",
    options: ["Carbon and Nitrogen", "Sulfur and Nitrogen", "Sulfur and Carbon", "Phosphorus and Sulfur"],
    urduOptions: ["کاربن اور نائٹروجن", "سلفر اور نائٹروجن", "سلفر اور کاربن", "فاسفورس اور سلفر"],
    correctAnswer: 1,
    explanation: "Oxides of sulfur (SO2) and nitrogen (NOx) react with water to form acid rain."
  },
  {
    id: "cq13",
    unitID: "c15",
    text: "Temporary hardness of water is due to the presence of:",
    urduText: "پانی کی عارضی سختی کس کی موجودگی کی وجہ سے ہوتی ہے؟",
    options: ["Chlorides", "Sulfates", "Bicarbonates", "Carbonates"],
    urduOptions: ["کلورائڈز", "سلفیٹس", "بائی کاربونیٹس", "کاربونیٹس"],
    correctAnswer: 2,
    explanation: "Temporary hardness is caused by dissolved calcium and magnesium bicarbonates."
  },
  {
    id: "cq14",
    unitID: "c15",
    text: "Which method is used to remove permanent hardness of water?",
    urduText: "پانی کی مستقل سختی دور کرنے کے لیے کون سا طریقہ استعمال کیا جاتا ہے؟",
    options: ["Boiling", "Clark's method", "Ion-exchange method", "Filtration"],
    urduOptions: ["ابالنا", "کلارک کا طریقہ", "آئن ایکسچینج کا طریقہ", "فلٹریشن"],
    correctAnswer: 2,
    explanation: "Ion-exchange and washing soda methods are used for permanent hardness."
  },
  {
    id: "cq15",
    unitID: "c16",
    text: "The raw materials for the Solvay process are:",
    urduText: "سولوی پراسیس کے لیے خام مال ہیں:",
    options: ["Brine and Ammonia", "Brine, Limestone and Ammonia", "Limestone and Brine", "Ammonia and Limestone"],
    urduOptions: ["نمکین پانی اور امونیا", "نمکین پانی، چونا پتھر اور امونیا", "چونا پتھر اور نمکین پانی", "امونیا اور چونا پتھر"],
    correctAnswer: 1,
    explanation: "Solvay process uses brine (NaCl), limestone (CaCO3), and ammonia (NH3)."
  },
  {
    id: "cq16",
    unitID: "c16",
    text: "Urea is a nitrogenous fertilizer containing:",
    urduText: "یوریا ایک نائٹروجن والی کھاد ہے جس میں ہوتا ہے:",
    options: ["20% Nitrogen", "46% Nitrogen", "60% Nitrogen", "80% Nitrogen"],
    urduOptions: ["20% نائٹروجن", "46% نائٹروجن", "60% نائٹروجن", "80% نائٹروجن"],
    correctAnswer: 1,
    explanation: "Urea contains approximately 46% nitrogen by mass."
  }
];
