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

export const physicsQuestions: Question[] = [
  {
    id: "q1",
    unitID: "p10",
    text: "Simple Harmonic Motion is a special type of:",
    urduText: "سادہ ہارمونک موشن کس کی ایک خاص قسم ہے؟",
    options: ["Translatory Motion", "Rotatory Motion", "Oscillatory Motion", "Circulatory Motion"],
    urduOptions: ["ترجمہ کی حرکت", "گردشی حرکت", "تھرتھراہٹ کی حرکت", "گردشی حرکت"],
    correctAnswer: 2,
    explanation: "SHM is a specific form of oscillatory motion where restoring force is proportional to displacement."
  },
  {
    id: "q2",
    unitID: "p11",
    text: "Speed of sound in air at 0°C is 331m/s, at 20°C speed will be:",
    urduText: "0°C پر ہوا میں آواز کی رفتار 331m/s ہے، 20°C پر رفتار کیا ہوگی؟",
    options: ["340m/s", "341m/s", "342m/s", "343m/s"],
    urduOptions: ["340m/s", "341m/s", "342m/s", "343m/s"],
    correctAnswer: 3,
    explanation: "Speed increases by 0.6 m/s for every 1°C rise. 331 + (0.6 * 20) = 343 m/s."
  },
  {
    id: "q3",
    unitID: "p12",
    text: "Which property of light waves remains same during the refraction of light?",
    urduText: "روشنی کے انعطاف کے دوران روشنی کی لہروں کی کون سی خاصیت ایک جیسی رہتی ہے؟",
    options: ["Speed", "Frequency", "Wavelength", "Direction"],
    urduOptions: ["رفتار", "فریکوئنسی", "طول موج", "سمت"],
    correctAnswer: 1,
    explanation: "Frequency is determined by the source and does not change when light enters a different medium."
  },
  {
    id: "q4",
    unitID: "p12",
    text: "The speed of light in water having refractive index 1.5 is:",
    urduText: "پانی میں روشنی کی رفتار کیا ہے جس کا ریفریکٹیو انڈیکس 1.5 ہے؟",
    options: ["2 x 10^8 m/s", "2.5 x 10^8 m/s", "3 x 10^8 m/s", "3.5 x 10^8 m/s"],
    urduOptions: ["2 x 10^8 m/s", "2.5 x 10^8 m/s", "3 x 10^8 m/s", "3.5 x 10^8 m/s"],
    correctAnswer: 0,
    explanation: "v = c / n. So, 3 x 10^8 / 1.5 = 2 x 10^8 m/s."
  },
  {
    id: "q5",
    unitID: "p13",
    text: "The SI unit of Electric Field Intensity is:",
    urduText: "الیکٹرک فیلڈ انٹینسیٹی کا SI یونٹ کیا ہے؟",
    options: ["JC^-1", "NC^-1", "Nm^-1", "VC^-1"],
    urduOptions: ["JC^-1", "NC^-1", "Nm^-1", "VC^-1"],
    correctAnswer: 1,
    explanation: "Electric Field Intensity E = F/q, so unit is Newton per Coulomb (N/C or NC^-1)."
  },
  {
    id: "q6",
    unitID: "p14",
    text: "The power rating of a lamp connected to a 15V source when it carries 2A current is:",
    urduText: "15V سورس سے منسلک لیمپ کی پاور ریٹنگ کیا ہے جب اس میں 2A کرنٹ ہو؟",
    options: ["7.5W", "10W", "20W", "30W"],
    urduOptions: ["7.5W", "10W", "20W", "30W"],
    correctAnswer: 3,
    explanation: "P = V x I. So, 15V x 2A = 30W."
  },
  {
    id: "q7",
    unitID: "p15",
    text: "Which form of energy is converted into electrical energy by generator?",
    urduText: "جنریٹر کے ذریعے توانائی کی کون سی شکل برقی توانائی میں تبدیل ہوتی ہے؟",
    options: ["Chemical", "Nuclear", "Mechanical", "Thermal"],
    urduOptions: ["کیمیائی", "نیوکلیئر", "مکینیکل", "تھرمل"],
    correctAnswer: 2,
    explanation: "A generator converts mechanical energy (rotation) into electrical energy."
  },
  {
    id: "q8",
    unitID: "p13",
    text: "Two capacitors of 6µF are connected in series, the equivalent capacitance is:",
    urduText: "6µF کے دو کیپیسیٹرز سیریز میں جڑے ہوئے ہیں، مساوی کیپیسیٹنس کیا ہے؟",
    options: ["1µF", "2µF", "3µF", "4µF"],
    urduOptions: ["1µF", "2µF", "3µF", "4µF"],
    correctAnswer: 2,
    explanation: "In series, 1/Ceq = 1/C1 + 1/C2. 1/Ceq = 1/6 + 1/6 = 2/6 = 1/3. So Ceq = 3µF."
  },
  {
    id: "q9",
    unitID: "p18",
    text: "Release of energy by sun is due to:",
    urduText: "سورج سے توانائی کا اخراج کس وجہ سے ہوتا ہے؟",
    options: ["Nuclear Fusion", "Nuclear Fission", "Burning of gases", "Chemical Reaction"],
    urduOptions: ["نیوکلیئر فیوژن", "نیوکلیئر فیشن", "گیسوں کا جلنا", "کیمیائی ردعمل"],
    correctAnswer: 0,
    explanation: "The sun produces energy through nuclear fusion of hydrogen into helium."
  },
  {
    id: "q10",
    unitID: "p18",
    text: "The diameter of nucleus is approximately:",
    urduText: "نیوکلیئس کا قطر تقریباً کتنا ہوتا ہے؟",
    options: ["10^-10 m", "10^-12 m", "10^-15 m", "10^-18 m"],
    urduOptions: ["10^-10 m", "10^-12 m", "10^-15 m", "10^-18 m"],
    correctAnswer: 2,
    explanation: "The nucleus is extremely small, roughly 10^-15 meters in diameter."
  },
  {
    id: "q11",
    unitID: "p12",
    text: "In the given ray diagram of a convex lens, where is the image formed?",
    urduText: "دیے گئے کنویکس لینس کے رے ڈایاگرام میں، امیج کہاں بنتی ہے؟",
    options: ["At F", "Between F and 2F", "Beyond 2F", "At 2F"],
    urduOptions: ["F پر", "F اور 2F کے درمیان", "2F سے پرے", "2F پر"],
    correctAnswer: 2,
    explanation: "When an object is placed between F and 2F, the image is formed beyond 2F, real and inverted.",
    diagramId: "convex-lens-ray"
  },
  {
    id: "q12",
    unitID: "p16",
    text: "Identify the logic gate shown in the diagram:",
    urduText: "ڈایاگرام میں دکھائے گئے لاجک گیٹ کی شناخت کریں:",
    options: ["OR Gate", "AND Gate", "NOT Gate", "NAND Gate"],
    urduOptions: ["OR گیٹ", "AND گیٹ", "NOT گیٹ", "NAND گیٹ"],
    correctAnswer: 1,
    explanation: "The D-shaped symbol represents an AND gate, which outputs 1 only if both inputs are 1.",
    diagramId: "logic-and-gate"
  },
  {
    id: "q13",
    unitID: "p14",
    text: "In the simple circuit shown, if the resistance R is doubled, the current I will:",
    urduText: "دکھائے گئے سادہ سرکٹ میں، اگر مزاحمت R کو دوگنا کر دیا جائے، تو کرنٹ I کیا ہوگا؟",
    options: ["Double", "Remain same", "Be halved", "Become zero"],
    urduOptions: ["دوگنا ہو جائے گا", "وہی رہے گا", "آدھا ہو جائے گا", "صفر ہو جائے گا"],
    correctAnswer: 2,
    explanation: "According to Ohm's Law (V=IR), current is inversely proportional to resistance. Doubling R halves I.",
    diagramId: "simple-circuit"
  }
];
