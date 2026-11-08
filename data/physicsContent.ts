export interface LectureSection {
  title: string;
  urduTitle: string;
  content: string;
  urduContent: string;
  image?: string;
  interactiveDiagramId?: string;
}

export interface NumericalProblem {
  question: string;
  urduQuestion: string;
  formula: string;
  solution: string;
  answer: string;
}

export interface UnitContent {
  unitID: string;
  title: string;
  urduTitle: string;
  sections: LectureSection[];
  formulas: { label: string; formula: string }[];
  keyPoints: string[];
  numericalProblems?: NumericalProblem[];
}

export const physicsContent: Record<string, UnitContent> = {
  "p10": {
    unitID: "p10",
    title: "SHM and Waves",
    urduTitle: "سادہ ہارمونک موشن اور لہریں",
    sections: [
      {
        title: "Oscillatory Motion",
        urduTitle: "تھرتھراہٹ کی حرکت",
        content: "Oscillation is the repeated back and forth motion of a particle about its equilibrium position. Key terms include Cycle (one complete round trip), Time Period (time for one cycle), and Frequency (number of cycles per second).",
        urduContent: "تھرتھراہٹ سے مراد کسی ذرے کی اپنی توازن کی پوزیشن کے گرد بار بار آگے پیچھے کی حرکت ہے۔ اہم اصطلاحات میں سائیکل (ایک مکمل چکر)، وقت کا وقفہ (ایک سائیکل کا وقت)، اور فریکوئنسی (فی سیکنڈ سائیکلوں کی تعداد) شامل ہیں۔",
        image: "https://picsum.photos/seed/p10s1/1200/600"
      },
      {
        title: "Simple Harmonic Motion (SHM)",
        urduTitle: "سادہ ہارمونک موشن",
        content: "SHM is a special type of oscillatory motion where the restoring force is directly proportional to the displacement from the equilibrium position and is always directed towards that position. Mathematically, Fres ∝ -x.",
        urduContent: "سادہ ہارمونک موشن تھرتھراہٹ کی ایک خاص قسم ہے جس میں بحال کرنے والی قوت توازن کی پوزیشن سے نقل مکانی کے براہ راست متناسب ہوتی ہے اور ہمیشہ اسی پوزیشن کی طرف ہوتی ہے۔ ریاضیاتی طور پر، Fres ∝ -x۔",
        image: "https://picsum.photos/seed/p10s2/1200/600"
      },
      {
        title: "The Simple Pendulum",
        urduTitle: "سادہ پنڈولم",
        content: "A simple pendulum consists of a small mass (bob) suspended by a light string. For small angles, its motion is SHM. Its time period depends only on the length of the string and gravitational acceleration, not on the mass of the bob.",
        urduContent: "ایک سادہ پنڈولم ایک چھوٹے ماس (باب) پر مشتمل ہوتا ہے جو ایک ہلکی ڈوری سے لٹکا ہوتا ہے۔ چھوٹے زاویوں کے لیے، اس کی حرکت SHM ہوتی ہے۔ اس کا وقت کا وقفہ صرف ڈوری کی لمبائی اور کشش ثقل کے اسراع پر منحصر ہوتا ہے۔",
        image: "https://picsum.photos/seed/p10s3/1200/600"
      },
      {
        title: "Wave Motion & Types",
        urduTitle: "لہروں کی حرکت اور اقسام",
        content: "A wave is a disturbance that transfers energy through a medium without transferring matter. Mechanical waves (like sound) require a medium, while Electromagnetic waves (like light) can travel through a vacuum.",
        urduContent: "لہر ایک ایسا خلل ہے جو مادے کو منتقل کیے بغیر کسی میڈیم کے ذریعے توانائی منتقل کرتا ہے۔ مکینیکل لہروں (جیسے آواز) کو میڈیم کی ضرورت ہوتی ہے، جبکہ برقی مقناطیسی لہریں (جیسے روشنی) خلا میں سفر کر سکتی ہیں۔",
        image: "https://picsum.photos/seed/p10s4/1200/600",
        interactiveDiagramId: "wave-simulator"
      }
    ],
    formulas: [
      { label: "Time-Frequency Relation", formula: "T = 1/f" },
      { label: "Spring System Period", formula: "T = 2π√(m/k)" },
      { label: "Pendulum Period", formula: "T = 2π√(l/g)" },
      { label: "Wave Equation", formula: "v = fλ" }
    ],
    keyPoints: [
      "Restoring force is always opposite to displacement.",
      "Damping reduces the amplitude of oscillation over time.",
      "Transverse waves vibrate perpendicular to propagation.",
      "Longitudinal waves vibrate parallel to propagation."
    ],
    numericalProblems: [
      {
        question: "Calculate the time period of a simple pendulum 1.0m long at a location where g = 10 m/s².",
        urduQuestion: "ایک سادہ پنڈولم کا وقت کا وقفہ معلوم کریں جس کی لمبائی 1.0 میٹر ہے اور جہاں g = 10 m/s² ہے۔",
        formula: "T = 2π√(l/g)",
        solution: "T = 2 * 3.14 * √(1/10) = 6.28 * 0.316 = 1.98s",
        answer: "1.98s"
      },
      {
        question: "A wave has a frequency of 10Hz and a wavelength of 2m. Calculate its speed.",
        urduQuestion: "ایک لہر کی فریکوئنسی 10 ہرٹز اور طول موج 2 میٹر ہے۔ اس کی رفتار معلوم کریں۔",
        formula: "v = fλ",
        solution: "v = 10 * 2 = 20 m/s",
        answer: "20 m/s"
      }
    ]
  },
  "p11": {
    unitID: "p11",
    title: "Sound",
    urduTitle: "آواز",
    sections: [
      {
        title: "Nature of Sound Waves",
        urduTitle: "آواز کی لہروں کی فطرت",
        content: "Sound is produced by vibrating bodies and travels as longitudinal mechanical waves. It consists of compressions (high pressure) and rarefactions (low pressure). Sound cannot travel through a vacuum.",
        urduContent: "آواز تھرتھراتے ہوئے اجسام سے پیدا ہوتی ہے اور طولانی مکینیکل لہروں کے طور پر سفر کرتی ہے۔ یہ کمپریشن (زیادہ دباؤ) اور ریئرفیکشن (کم دباؤ) پر مشتمل ہوتی ہے۔ آواز خلا میں سفر نہیں کر سکتی۔",
        image: "https://picsum.photos/seed/p11s1/1200/600"
      },
      {
        title: "Characteristics of Sound",
        urduTitle: "آواز کی خصوصیات",
        content: "Pitch depends on frequency (high pitch = high frequency). Loudness depends on amplitude and area of the vibrating body. Quality allows us to distinguish between sounds of the same pitch and loudness.",
        urduContent: "پچ کا انحصار فریکوئنسی پر ہوتا ہے۔ آواز کی بلندی کا انحصار تھرتھرانے والے جسم کے طول اور رقبے پر ہوتا ہے۔ کوالٹی ہمیں ایک ہی پچ اور بلندی کی آوازوں کے درمیان فرق کرنے کی اجازت دیتی ہے۔",
        image: "https://picsum.photos/seed/p11s2/1200/600"
      },
      {
        title: "Intensity & Decibel Scale",
        urduTitle: "شدت اور ڈیسیبل اسکیل",
        content: "Sound intensity is the power per unit area. The decibel (dB) scale is used to measure sound intensity levels relative to the threshold of hearing (10^-12 W/m^2).",
        urduContent: "آواز کی شدت سے مراد فی یونٹ رقبہ پاور ہے۔ ڈیسیبل (dB) اسکیل کا استعمال سماعت کی دہلیز کے مقابلے میں آواز کی شدت کی سطح کی پیمائش کے لیے کیا جاتا ہے۔",
        image: "https://picsum.photos/seed/p11s3/1200/600"
      },
      {
        title: "Ultrasound Applications",
        urduTitle: "الٹراساؤنڈ کے استعمال",
        content: "Ultrasound (frequencies > 20kHz) is used in medical imaging, breaking kidney stones (lithotripsy), and underwater range finding (SONAR).",
        urduContent: "الٹراساؤنڈ (20 کلو ہرٹز سے زیادہ فریکوئنسی) طبی امیجنگ، گردے کی پتھری توڑنے، اور پانی کے اندر فاصلے کی پیمائش (SONAR) میں استعمال ہوتا ہے۔",
        image: "https://picsum.photos/seed/p11s4/1200/600"
      }
    ],
    formulas: [
      { label: "Intensity Level (dB)", formula: "β = 10 log(I/I₀)" },
      { label: "Speed of Sound", formula: "v = 331 + 0.6T" },
      { label: "Echo Distance", formula: "S = vt / 2" }
    ],
    keyPoints: [
      "Audible frequency range for humans is 20Hz to 20,000Hz.",
      "Sound travels fastest in solids and slowest in gases.",
      "Echo requires a minimum distance of about 17 meters.",
      "Noise is irregular and displeasing sound."
    ],
    numericalProblems: [
      {
        question: "Calculate the speed of sound at 20°C.",
        urduQuestion: "20 ڈگری سینٹی گریڈ پر آواز کی رفتار معلوم کریں۔",
        formula: "v = 331 + 0.6T",
        solution: "v = 331 + 0.6 * 20 = 331 + 12 = 343 m/s",
        answer: "343 m/s"
      },
      {
        question: "A person claps near a cliff and hears an echo after 2s. If the speed of sound is 340 m/s, find the distance to the cliff.",
        urduQuestion: "ایک شخص پہاڑی کے قریب تالی بجاتا ہے اور 2 سیکنڈ بعد گونج سنتا ہے۔ اگر آواز کی رفتار 340 m/s ہے تو پہاڑی کا فاصلہ معلوم کریں۔",
        formula: "S = vt / 2",
        solution: "S = (340 * 2) / 2 = 340m",
        answer: "340m"
      }
    ]
  },
  "p12": {
    unitID: "p12",
    title: "Geometrical Optics",
    urduTitle: "جیومیٹریکل آپٹکس",
    sections: [
      {
        title: "Reflection of Light",
        urduTitle: "روشنی کا انعکاس",
        content: "Reflection is the bouncing back of light when it strikes a surface. The laws of reflection state that the incident ray, reflected ray, and normal all lie in the same plane, and the angle of incidence equals the angle of reflection.",
        urduContent: "روشنی کا کسی سطح سے ٹکرا کر واپس پلٹنا انعکاس کہلاتا ہے۔ انعکاس کے قوانین کے مطابق شعاع وقوع، شعاع منعکسہ اور نارمل ایک ہی سطح پر ہوتے ہیں، اور زاویہ وقوع زاویہ انعکاس کے برابر ہوتا ہے۔",
        image: "https://picsum.photos/seed/p12s1/1200/600"
      },
      {
        title: "Refraction & Snell's Law",
        urduTitle: "روشنی کا انعطاف اور اسنیل کا قانون",
        content: "Refraction is the bending of light as it passes from one medium to another. Snell's Law relates the angles and refractive indices: n1 sin θ1 = n2 sin θ2. Refractive index (n) is the ratio of the speed of light in a vacuum to its speed in the medium.",
        urduContent: "روشنی کا ایک میڈیم سے دوسرے میڈیم میں داخل ہوتے وقت مڑنا انعطاف کہلاتا ہے۔ اسنیل کا قانون زاویوں اور ریفریکٹیو انڈیکس کے درمیان تعلق بتاتا ہے۔ ریفریکٹیو انڈیکس (n) خلا میں روشنی کی رفتار اور میڈیم میں روشنی کی رفتار کی نسبت ہے۔",
        image: "https://picsum.photos/seed/p12s2/1200/600"
      },
      {
        title: "Total Internal Reflection",
        urduTitle: "مکمل اندرونی انعکاس",
        content: "When light travels from a denser to a rarer medium at an angle greater than the critical angle, it reflects completely back into the denser medium. This is used in optical fibers and endoscopes.",
        urduContent: "جب روشنی کثیف میڈیم سے لطیف میڈیم میں کرٹیکل زاویے سے بڑے زاویے پر داخل ہوتی ہے، تو یہ مکمل طور پر کثیف میڈیم میں واپس منعکس ہو جاتی ہے۔ یہ آپٹیکل فائبرز اور اینڈوسکوپ میں استعمال ہوتا ہے۔",
        image: "https://picsum.photos/seed/p12s3/1200/600"
      },
      {
        title: "Lenses & Vision Defects",
        urduTitle: "لینس اور بصارت کے نقائص",
        content: "Lenses refract light to form images. Short-sightedness (Myopia) is corrected using concave lenses, while Long-sightedness (Hyperopia) is corrected using convex lenses.",
        urduContent: "لینس روشنی کو منعطف کر کے امیج بناتے ہیں۔ قریب نظری (Myopia) کو مقعر (concave) لینس سے درست کیا جاتا ہے، جبکہ بعید نظری (Hyperopia) کو محدب (convex) لینس سے درست کیا جاتا ہے۔",
        image: "https://picsum.photos/seed/p12s4/1200/600",
        interactiveDiagramId: "lens-simulator"
      }
    ],
    formulas: [
      { label: "Mirror/Lens Formula", formula: "1/f = 1/do + 1/di" },
      { label: "Refractive Index", formula: "n = c / v" },
      { label: "Snell's Law", formula: "n₁ sin θ₁ = n₂ sin θ₂" },
      { label: "Lens Power (D)", formula: "P = 1 / f (m)" }
    ],
    keyPoints: [
      "Concave mirrors converge light; Convex mirrors diverge light.",
      "Real images are inverted; Virtual images are upright.",
      "Critical angle depends on the refractive indices of the media.",
      "Optical fibers work on the principle of total internal reflection."
    ]
  },
  "p13": {
    unitID: "p13",
    title: "Electrostatics",
    urduTitle: "ساکن برقیات",
    sections: [
      {
        title: "Electric Charge & Induction",
        urduTitle: "برقی چارج اور انڈکشن",
        content: "Electrostatics is the study of electric charges at rest. Charges can be produced by friction and detected using an electroscope. Electrostatic induction allows charging an object without direct contact.",
        urduContent: "ساکن برقیات سے مراد ساکن حالت میں برقی چارجز کا مطالعہ ہے۔ چارجز رگڑ کے ذریعے پیدا کیے جا سکتے ہیں اور الیکٹروسکوپ کے ذریعے ان کا پتہ لگایا جا سکتا ہے۔ الیکٹرو سٹیٹک انڈکشن براہ راست رابطے کے بغیر کسی چیز کو چارج کرنے کی اجازت دیتا ہے۔",
        image: "https://picsum.photos/seed/p13s1/1200/600"
      },
      {
        title: "Coulomb's Law",
        urduTitle: "کولمب کا قانون",
        content: "Coulomb's Law states that the force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them. F = k(q1q2)/r^2.",
        urduContent: "کولمب کے قانون کے مطابق دو پوائنٹ چارجز کے درمیان قوت چارجز کے حاصل ضرب کے براہ راست متناسب اور ان کے درمیان فاصلے کے مربع کے معکوس متناسب ہوتی ہے۔",
        image: "https://picsum.photos/seed/p13s2/1200/600"
      },
      {
        title: "Capacitors & Capacitance",
        urduTitle: "کیپیسیٹرز اور کیپیسیٹنس",
        content: "A capacitor is a device used to store electric charge. Capacitance (C) is the ability to store charge per unit potential difference: C = Q/V. Capacitors can be connected in series or parallel.",
        urduContent: "کیپیسیٹر ایک ایسا آلہ ہے جو برقی چارج کو ذخیرہ کرنے کے لیے استعمال ہوتا ہے۔ کیپیسیٹنس (C) سے مراد فی یونٹ پوٹینشل ڈفرنس چارج ذخیرہ کرنے کی صلاحیت ہے: C = Q/V۔ کیپیسیٹرز کو سیریز یا پیرالل میں جوڑا جا سکتا ہے۔",
        image: "https://picsum.photos/seed/p13s3/1200/600"
      }
    ],
    formulas: [
      { label: "Coulomb's Law", formula: "F = k q₁q₂ / r²" },
      { label: "Capacitance", formula: "C = Q / V" },
      { label: "Parallel Capacitors", formula: "Ceq = C₁ + C₂ + ..." },
      { label: "Series Capacitors", formula: "1/Ceq = 1/C₁ + 1/C₂ + ..." }
    ],
    keyPoints: [
      "Like charges repel; unlike charges attract.",
      "The SI unit of charge is Coulomb (C).",
      "Electric field lines radiate outward from positive charges.",
      "Capacitors are used in various electronic appliances."
    ],
    numericalProblems: [
      {
        question: "Calculate the force between two charges of 10µC each separated by 0.1m in air.",
        urduQuestion: "ہوا میں 0.1 میٹر کے فاصلے پر رکھے گئے 10 مائیکرو کولمب کے دو چارجز کے درمیان قوت معلوم کریں۔",
        formula: "F = k q₁q₂ / r²",
        solution: "F = (9x10⁹ * 10x10⁻⁶ * 10x10⁻⁶) / (0.1)² = 90N",
        answer: "90N"
      },
      {
        question: "A 10µF capacitor is connected to a 12V battery. Find the charge stored.",
        urduQuestion: "ایک 10 مائیکرو فیراڈ کیپیسیٹر 12 وولٹ کی بیٹری سے جڑا ہوا ہے۔ ذخیرہ شدہ چارج معلوم کریں۔",
        formula: "Q = CV",
        solution: "Q = 10x10⁻⁶ * 12 = 120µC",
        answer: "120µC"
      }
    ]
  },
  "p14": {
    unitID: "p14",
    title: "Current Electricity",
    urduTitle: "کرنٹ بجلی",
    sections: [
      {
        title: "Electric Current & Ohm's Law",
        urduTitle: "برقی کرنٹ اور اوہم کا قانون",
        content: "Electric current is the rate of flow of charge. Ohm's Law states that the current through a conductor is directly proportional to the potential difference across it, provided physical conditions remain constant: V = IR.",
        urduContent: "برقی کرنٹ سے مراد چارج کے بہاؤ کی شرح ہے۔ اوہم کے قانون کے مطابق کسی کنڈکٹر میں کرنٹ اس کے سروں پر پوٹینشل ڈفرنس کے براہ راست متناسب ہوتا ہے، بشرطیکہ طبعی حالات مستقل رہیں: V = IR۔",
        image: "https://picsum.photos/seed/p14s1/1200/600",
        interactiveDiagramId: "circuit-toggler"
      },
      {
        title: "Electrical Power & Joule's Law",
        urduTitle: "برقی پاور اور جول کا قانون",
        content: "Joule's Law states that the heat generated in a resistor is proportional to the square of the current, resistance, and time: H = I^2Rt. Electrical power is the rate at which work is done: P = VI.",
        urduContent: "جول کے قانون کے مطابق کسی ریزسٹر میں پیدا ہونے والی حرارت کرنٹ کے مربع، ریزسٹنس اور وقت کے متناسب ہوتی ہے: H = I^2Rt۔ برقی پاور سے مراد کام کرنے کی شرح ہے: P = VI۔",
        image: "https://picsum.photos/seed/p14s2/1200/600"
      },
      {
        title: "Household Electricity Safety",
        urduTitle: "گھریلو بجلی کی حفاظت",
        content: "Safety measures in household circuits include fuses, circuit breakers, and earthing. These prevent electric shocks and fire hazards caused by short circuits or overloading.",
        urduContent: "گھریلو سرکٹس میں حفاظتی اقدامات میں فیوز، سرکٹ بریکر اور ارتھنگ شامل ہیں۔ یہ شارٹ سرکٹ یا اوور لوڈنگ کی وجہ سے ہونے والے برقی جھٹکوں اور آگ کے خطرات سے بچاتے ہیں۔",
        image: "https://picsum.photos/seed/p14s3/1200/600"
      }
    ],
    formulas: [
      { label: "Ohm's Law", formula: "V = IR" },
      { label: "Electrical Power", formula: "P = VI = I²R" },
      { label: "Joule's Law", formula: "H = I²Rt" },
      { label: "Energy (kWh)", formula: "E = P(kW) × t(h)" }
    ],
    keyPoints: [
      "Conventional current flows from positive to negative terminal.",
      "Resistance depends on length, area, and material of the conductor.",
      "Kilowatt-hour (kWh) is the commercial unit of electrical energy.",
      "Domestic appliances are always connected in parallel."
    ],
    numericalProblems: [
      {
        question: "Calculate the current passing through a 100Ω resistor when a potential difference of 20V is applied.",
        urduQuestion: "100 اوہم کے ریزسٹر سے گزرنے والا کرنٹ معلوم کریں جب 20 وولٹ کا پوٹینشل ڈفرنس لگایا جائے۔",
        formula: "I = V / R",
        solution: "I = 20 / 100 = 0.2A",
        answer: "0.2A"
      },
      {
        question: "A bulb is rated 100W, 220V. Calculate the current flowing through it.",
        urduQuestion: "ایک بلب کی ریٹنگ 100 واٹ، 220 وولٹ ہے۔ اس میں سے گزرنے والا کرنٹ معلوم کریں۔",
        formula: "I = P / V",
        solution: "I = 100 / 220 = 0.45A",
        answer: "0.45A"
      }
    ]
  },
  "p15": {
    unitID: "p15",
    title: "Electromagnetism",
    urduTitle: "برقی مقناطیسیت",
    sections: [
      {
        title: "Magnetic Effect of Current",
        urduTitle: "کرنٹ کا مقناطیسی اثر",
        content: "A steady electric current in a conductor produces a magnetic field around it. The direction of this field can be determined using the Right-Hand Rule.",
        urduContent: "کسی کنڈکٹر میں مستقل برقی کرنٹ اس کے گرد مقناطیسی میدان پیدا کرتا ہے۔ اس میدان کی سمت کا تعین دائیں ہاتھ کے قانون کے ذریعے کیا جا سکتا ہے۔",
        image: "https://picsum.photos/seed/p15s1/1200/600"
      },
      {
        title: "Electromagnetic Induction",
        urduTitle: "برقی مقناطیسی انڈکشن",
        content: "A changing magnetic field through a circuit induces an electromotive force (emf). This is the principle behind electric generators and transformers.",
        urduContent: "کسی سرکٹ میں بدلتا ہوا مقناطیسی میدان الیکٹرو موٹیو فورس (emf) پیدا کرتا ہے۔ یہ برقی جنریٹروں اور ٹرانسفارمرز کے پیچھے بنیادی اصول ہے۔",
        image: "https://picsum.photos/seed/p15s2/1200/600"
      },
      {
        title: "Transformers",
        urduTitle: "ٹرانسفارمرز",
        content: "A transformer increases or decreases AC voltage based on the principle of mutual induction. The ratio of voltages equals the ratio of the number of turns in the coils: Vs/Vp = Ns/Np.",
        urduContent: "ٹرانسفارمر باہمی انڈکشن کے اصول پر AC وولٹیج کو بڑھاتا یا کم کرتا ہے۔ وولٹیج کی نسبت کوائلز میں چکروں کی تعداد کی نسبت کے برابر ہوتی ہے: Vs/Vp = Ns/Np۔",
        image: "https://picsum.photos/seed/p15s3/1200/600"
      }
    ],
    formulas: [
      { label: "Magnetic Force", formula: "F = BIL sin θ" },
      { label: "Transformer Equation", formula: "Vs / Vp = Ns / Np" },
      { label: "Ideal Transformer", formula: "Vp Ip = Vs Is" }
    ],
    keyPoints: [
      "A solenoid acts like a bar magnet when current flows through it.",
      "Lenz's Law states induced current opposes the change that caused it.",
      "Step-up transformers increase voltage; Step-down decrease it.",
      "Mutual induction occurs between two magnetically coupled coils."
    ],
    numericalProblems: [
      {
        question: "A transformer has 100 turns in the primary and 500 in the secondary. If the primary voltage is 220V, find the secondary voltage.",
        urduQuestion: "ایک ٹرانسفارمر کی پرائمری میں 100 اور سیکنڈری میں 500 چکر ہیں۔ اگر پرائمری وولٹیج 220V ہے تو سیکنڈری وولٹیج معلوم کریں۔",
        formula: "Vs / Vp = Ns / Np",
        solution: "Vs = (Ns / Np) * Vp = (500 / 100) * 220 = 5 * 220 = 1100V",
        answer: "1100V"
      }
    ]
  },
  "p16": {
    unitID: "p16",
    title: "Introductory Electronics",
    urduTitle: "بنیادی الیکٹرانکس",
    sections: [
      {
        title: "Thermionic Emission",
        urduTitle: "تھرمیونک اخراج",
        content: "Thermionic emission is the process of emitting electrons from a heated metal surface. This is the basis for electron guns used in Cathode Ray Oscilloscopes (CRO).",
        urduContent: "تھرمیونک اخراج سے مراد گرم دھاتی سطح سے الیکٹران کے اخراج کا عمل ہے۔ یہ کیتھوڈ رے آسائلوسکوپ (CRO) میں استعمال ہونے والی الیکٹران گنوں کی بنیاد ہے۔",
        image: "https://picsum.photos/seed/p16s1/1200/600"
      },
      {
        title: "Logic Gates",
        urduTitle: "لاجک گیٹس",
        content: "Logic gates are the building blocks of digital electronics. They perform logical operations like AND, OR, NOT, NAND, and NOR based on binary inputs (0 and 1).",
        urduContent: "لاجک گیٹس ڈیجیٹل الیکٹرانکس کے بنیادی اجزاء ہیں۔ یہ بائنری ان پٹس (0 اور 1) کی بنیاد پر AND، OR، NOT، NAND، اور NOR جیسے منطقی آپریشن انجام دیتے ہیں۔",
        image: "https://picsum.photos/seed/p16s2/1200/600"
      }
    ],
    formulas: [
      { label: "AND Operation", formula: "X = A · B" },
      { label: "OR Operation", formula: "X = A + B" },
      { label: "NOT Operation", formula: "X = Ā" }
    ],
    keyPoints: [
      "Cathode rays are streams of high-speed electrons.",
      "Analogue signals vary continuously; Digital signals use discrete levels.",
      "CRO is used to display waveforms and measure voltages.",
      "NAND and NOR are universal gates."
    ],
    numericalProblems: [
      {
        question: "In an AND gate, if input A is 1 and input B is 0, what is the output X?",
        urduQuestion: "ایک AND گیٹ میں، اگر ان پٹ A 1 ہے اور ان پٹ B 0 ہے، تو آؤٹ پٹ X کیا ہوگا؟",
        formula: "X = A · B",
        solution: "X = 1 * 0 = 0",
        answer: "0"
      }
    ]
  },
  "p17": {
    unitID: "p17",
    title: "ICT",
    urduTitle: "معلومات اور مواصلاتی ٹیکنالوجی",
    sections: [
      {
        title: "Components of ICT",
        urduTitle: "ICT کے اجزاء",
        content: "Information and Communication Technology (ICT) systems consist of hardware, software, data, procedures, and human resources. They enable fast and cheap global communication.",
        urduContent: "معلومات اور مواصلاتی ٹیکنالوجی (ICT) سسٹم ہارڈ ویئر، سافٹ ویئر، ڈیٹا، طریقہ کار اور انسانی وسائل پر مشتمل ہوتے ہیں۔ یہ تیز رفتار اور سستی عالمی مواصلات کو ممکن بناتے ہیں۔",
        image: "https://picsum.photos/seed/p17s1/1200/600"
      },
      {
        title: "Transmission of Information",
        urduTitle: "معلومات کی منتقلی",
        content: "Information can be transmitted via electrical signals in wires, radio waves through air, or light signals through optical fibers. Satellites act as microwave relay stations.",
        urduContent: "معلومات کو تاروں میں برقی سگنلز، ہوا کے ذریعے ریڈیو لہروں، یا آپٹیکل فائبرز کے ذریعے روشنی کے سگنلز کے ذریعے منتقل کیا جا سکتا ہے۔ سیٹلائٹ مائیکرو ویو ریلے اسٹیشن کے طور پر کام کرتے ہیں۔",
        image: "https://picsum.photos/seed/p17s2/1200/600"
      }
    ],
    formulas: [],
    keyPoints: [
      "Optical fibers use total internal reflection for signal transmission.",
      "The Internet is a global network of interconnected computers.",
      "Hard disks, CDs, and flash drives are common storage devices.",
      "Word processing is used to create and edit text documents."
    ],
    numericalProblems: [
      {
        question: "If a file size is 2MB, how many bits are there? (1 byte = 8 bits, 1MB = 1024KB, 1KB = 1024 bytes)",
        urduQuestion: "اگر فائل کا سائز 2MB ہے، تو اس میں کتنے بٹس ہیں؟",
        formula: "Bits = Size * 1024 * 1024 * 8",
        solution: "Bits = 2 * 1024 * 1024 * 8 = 16,777,216 bits",
        answer: "16,777,216"
      }
    ]
  },
  "p18": {
    unitID: "p18",
    title: "Radioactivity",
    urduTitle: "ریڈیو ایکٹیویٹی",
    sections: [
      {
        title: "Natural Radioactivity",
        urduTitle: "قدرتی ریڈیو ایکٹیویٹی",
        content: "Radioactivity is the spontaneous release of particles or radiation from unstable nuclei. The three main types are Alpha (α), Beta (β), and Gamma (γ) radiation.",
        urduContent: "ریڈیو ایکٹیویٹی سے مراد غیر مستحکم نیوکلیائی سے ذرات یا تابکاری کا خود بخود اخراج ہے۔ اس کی تین اہم اقسام الفا (α)، بیٹا (β)، اور گاما (γ) تابکاری ہیں۔",
        image: "https://picsum.photos/seed/p18s1/1200/600"
      },
      {
        title: "Half-Life",
        urduTitle: "ہاف لائف",
        content: "Half-life is the time required for half of the radioactive nuclei in a sample to decay. It is a constant characteristic of each radioactive nuclide.",
        urduContent: "ہاف لائف سے مراد وہ وقت ہے جو کسی نمونے میں موجود نصف ریڈیو ایکٹیو نیوکلیائی کے زوال کے لیے درکار ہوتا ہے۔ یہ ہر ریڈیو ایکٹیو نیوکلائیڈ کی ایک مستقل خصوصیت ہے۔",
        image: "https://picsum.photos/seed/p18s2/1200/600"
      },
      {
        title: "Nuclear Fission & Fusion",
        urduTitle: "نیوکلیئر فیشن اور فیوژن",
        content: "Nuclear fission is the splitting of a heavy nucleus into smaller ones, releasing energy. Nuclear fusion is the combining of light nuclei to form a heavier one, which powers stars.",
        urduContent: "نیوکلیئر فیشن سے مراد بھاری نیوکلیئس کا چھوٹے حصوں میں ٹوٹنا ہے، جس سے توانائی خارج ہوتی ہے۔ نیوکلیئر فیوژن سے مراد ہلکے نیوکلیائی کا مل کر ایک بھاری نیوکلیئس بنانا ہے، جو ستاروں کو توانائی فراہم کرتا ہے۔",
        image: "https://picsum.photos/seed/p18s3/1200/600"
      }
    ],
    formulas: [
      { label: "Half-Life Remaining", formula: "N = N₀(1/2)^n" },
      { label: "Number of Half-lives", formula: "n = Δt / T₁/₂" },
      { label: "Mass-Energy Eq", formula: "E = mc²" }
    ],
    keyPoints: [
      "Alpha particles are helium nuclei; Beta are electrons; Gamma are EM rays.",
      "Radioisotopes are used in medicine, agriculture, and industry.",
      "Carbon dating is used to estimate the age of ancient organic objects.",
      "Background radiation is always present in our environment."
    ],
    numericalProblems: [
      {
        question: "A radioactive sample has a half-life of 2 days. What fraction remains after 6 days?",
        urduQuestion: "ایک ریڈیو ایکٹیو نمونے کی ہاف لائف 2 دن ہے۔ 6 دن بعد کتنا حصہ باقی رہ جائے گا؟",
        formula: "N = N₀(1/2)^n",
        solution: "n = 6/2 = 3. N = N₀(1/2)³ = N₀/8",
        answer: "1/8"
      }
    ]
  }
};
