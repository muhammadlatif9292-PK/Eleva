export interface LectureSection {
  title: string;
  urduTitle: string;
  content: string;
  urduContent: string;
  image?: string;
  interactiveDiagramId?: string;
  equations?: { equation: string; description: string }[];
}

export interface UnitContent {
  unitID: string;
  title: string;
  urduTitle: string;
  sections: LectureSection[];
  keyPoints: string[];
  glossary: { term: string; definition: string; urduTerm: string; urduDefinition: string }[];
}

export const chemistryContent: Record<string, UnitContent> = {
  "c9": {
    unitID: "c9",
    title: "Chemical Equilibrium",
    urduTitle: "کیمیائی توازن",
    sections: [
      {
        title: "Reversible Reactions",
        urduTitle: "ریورس ایبل ری ایکشنز",
        content: "A reversible reaction is one in which the products can react to form the original reactants. It never goes to completion and is represented by a double arrow. For example, H2 + I2 ⇌ 2HI.",
        urduContent: "ریورس ایبل ری ایکشن وہ ہوتا ہے جس میں پروڈکٹس دوبارہ ری ایکٹ کر کے اصل ری ایکٹنٹس بنا سکتے ہیں۔ یہ کبھی مکمل نہیں ہوتا اور اسے دوہرے تیر سے ظاہر کیا جاتا ہے۔ مثال کے طور پر، H2 + I2 ⇌ 2HI۔",
        image: "https://picsum.photos/seed/c9s1/1200/600",
        interactiveDiagramId: "equilibrium-simulator"
      },
      {
        title: "Dynamic Equilibrium",
        urduTitle: "ڈائنامک ایکویلیبریم",
        content: "Dynamic equilibrium is a state where the rate of the forward reaction equals the rate of the reverse reaction. The concentrations of reactants and products remain constant, although the reactions continue at a molecular level.",
        urduContent: "ڈائنامک ایکویلیبریم ایک ایسی حالت ہے جہاں فارورڈ ری ایکشن کی شرح ریورس ری ایکشن کی شرح کے برابر ہوتی ہے۔ ری ایکٹنٹس اور پروڈکٹس کے ارتکاز مستقل رہتے ہیں، اگرچہ مالیکیولر سطح پر ری ایکشنز جاری رہتے ہیں۔",
        image: "https://picsum.photos/seed/c9s2/1200/600"
      },
      {
        title: "Haber Process",
        urduTitle: "ہیبر کا عمل",
        content: "The Haber process is an industrial application of chemical equilibrium. It involves the synthesis of ammonia from nitrogen and hydrogen. According to Le Chatelier's principle, high pressure and low temperature favor ammonia production.",
        urduContent: "ہیبر کا عمل کیمیائی توازن کا ایک صنعتی استعمال ہے۔ اس میں نائٹروجن اور ہائیڈروجن سے امونیا کی تیاری شامل ہے۔ لی چیٹلیئر کے اصول کے مطابق، زیادہ دباؤ اور کم درجہ حرارت امونیا کی پیداوار کے حق میں ہے۔",
        image: "https://picsum.photos/seed/c9s4/1200/600",
        interactiveDiagramId: "haber-process"
      },
      {
        title: "Law of Mass Action",
        urduTitle: "لا آف ماس ایکشن",
        content: "Proposed by Guldberg and Waage, it states that the rate of a chemical reaction is directly proportional to the product of the active masses (molar concentrations) of the reacting substances.",
        urduContent: "گولڈ برگ اور ویج کا پیش کردہ یہ قانون بتاتا ہے کہ کسی کیمیائی رد عمل کی شرح ری ایکٹ کرنے والے مادوں کے فعال ماس (مولر ارتکاز) کے حاصل ضرب کے براہ راست متناسب ہوتی ہے۔",
        image: "https://picsum.photos/seed/c9s3/1200/600"
      }
    ],
    keyPoints: [
      "Equilibrium is only possible in a closed system.",
      "At equilibrium, forward and reverse rates are equal.",
      "Kc depends only on temperature.",
      "Catalysts do not change the equilibrium position."
    ],
    glossary: [
      { term: "Reversible Reaction", urduTerm: "ریورس ایبل ری ایکشن", definition: "A reaction that can proceed in both directions.", urduDefinition: "ایک ایسا ری ایکشن جو دونوں سمتوں میں چل سکتا ہے۔" },
      { term: "Dynamic Equilibrium", urduTerm: "ڈائنامک ایکویلیبریم", definition: "Rate of forward reaction = Rate of reverse reaction.", urduDefinition: "فارورڈ ری ایکشن کی شرح = ریورس ری ایکشن کی شرح۔" }
    ]
  },
  "c10": {
    unitID: "c10",
    title: "Acids, Bases and Salts",
    urduTitle: "تیزاب، اساس اور نمکیات",
    sections: [
      {
        title: "Arrhenius Concept",
        urduTitle: "آرہینیس کا تصور",
        content: "According to Arrhenius, an acid is a substance that dissociates in water to give hydrogen ions (H+), while a base gives hydroxide ions (OH-).",
        urduContent: "آرہینیس کے مطابق، تیزاب وہ مادہ ہے جو پانی میں ہائیڈروجن آئنز (H+) دینے کے لیے الگ ہو جاتا ہے، جبکہ اساس ہائیڈروکسائیڈ آئنز (OH-) دیتی ہے۔",
        image: "https://picsum.photos/seed/c10s1/1200/600",
        interactiveDiagramId: "ph-explorer",
        equations: [
          { equation: "HCl (aq) → H+ (aq) + Cl- (aq)", description: "Dissociation of Hydrochloric Acid" },
          { equation: "NaOH (aq) → Na+ (aq) + OH- (aq)", description: "Dissociation of Sodium Hydroxide" }
        ]
      },
      {
        title: "Bronsted-Lowry Theory",
        urduTitle: "برونسٹڈ لوری تھیوری",
        content: "An acid is a proton (H+) donor and a base is a proton acceptor. This theory introduces the concept of conjugate acid-base pairs.",
        urduContent: "تیزاب ایک پروٹون (H+) ڈونر ہے اور اساس ایک پروٹون ایکسیپٹر ہے۔ یہ نظریہ کنجوجیٹ ایسڈ بیس پیئرز کا تصور پیش کرتا ہے۔",
        image: "https://picsum.photos/seed/c10s2/1200/600",
        equations: [
          { equation: "HCl + NH3 ⇌ NH4+ + Cl-", description: "Proton transfer from HCl to NH3" },
          { equation: "H2O + NH3 ⇌ NH4+ + OH-", description: "Water acting as an acid" }
        ]
      },
      {
        title: "Lewis Concept",
        urduTitle: "لیوس کا تصور",
        content: "A Lewis acid is an electron-pair acceptor (e.g., BF3), and a Lewis base is an electron-pair donor (e.g., NH3).",
        urduContent: "لیوس تیزاب ایک الیکٹران پیئر ایکسیپٹر ہے (جیسے BF3)، اور لیوس اساس ایک الیکٹران پیئر ڈونر ہے (جیسے NH3)۔",
        image: "https://picsum.photos/seed/c10s3/1200/600"
      }
    ],
    keyPoints: [
      "pH is the negative logarithm of H+ concentration.",
      "Neutral solutions have pH 7.",
      "Amphoteric substances can act as both acid and base.",
      "Salts are formed by neutralization of acid and base."
    ],
    glossary: [
      { term: "pH", urduTerm: "پی ایچ", definition: "Measure of acidity or alkalinity.", urduDefinition: "تیزابیت یا اساسیت کی پیمائش۔" },
      { term: "Salt", urduTerm: "نمک", definition: "Ionic compound from neutralization.", urduDefinition: "نیوٹرلائزیشن سے بننے والا آئنک مرکب۔" }
    ]
  },
  "c11": {
    unitID: "c11",
    title: "Organic Chemistry",
    urduTitle: "نامیاتی کیمیا",
    sections: [
      {
        title: "Introduction to Organic Compounds",
        urduTitle: "نامیاتی مرکبات کا تعارف",
        content: "Organic chemistry is the study of carbon compounds (excluding oxides, carbonates, and bicarbonates). Carbon has a unique property called catenation, which allows it to form long chains.",
        urduContent: "نامیاتی کیمیا کاربن کے مرکبات کا مطالعہ ہے (آکسائیڈز، کاربونیٹس اور بائی کاربونیٹس کے علاوہ)۔ کاربن میں کیٹینیشن نامی ایک منفرد خاصیت ہے جو اسے لمبی زنجیریں بنانے کی اجازت دیتی ہے۔",
        image: "https://picsum.photos/seed/c11s1/1200/600"
      },
      {
        title: "Functional Groups",
        urduTitle: "فنکشنل گروپس",
        content: "A functional group is an atom or group of atoms that gives organic compounds their characteristic chemical properties. Examples include -OH (alcohol), -COOH (carboxylic acid), and -CHO (aldehyde).",
        urduContent: "فنکشنل گروپ ایک ایٹم یا ایٹموں کا گروپ ہے جو نامیاتی مرکبات کو ان کی مخصوص کیمیائی خصوصیات دیتا ہے۔ مثالوں میں -OH (الکحل)، -COOH (کاربو آکسیلک ایسڈ)، اور -CHO (ایلڈیہائڈ) شامل ہیں۔",
        image: "https://picsum.photos/seed/c11s2/1200/600",
        interactiveDiagramId: "functional-group-explorer"
      }
    ],
    keyPoints: [
      "Catenation is the self-linking of carbon atoms.",
      "Organic compounds have low melting and boiling points.",
      "Isomerism is common in organic compounds.",
      "Functional groups determine chemical reactivity."
    ],
    glossary: [
      { term: "Catenation", urduTerm: "کیٹینیشن", definition: "Self-linking of atoms to form chains.", urduDefinition: "ایٹموں کا زنجیریں بنانے کے لیے خود سے جڑنا۔" },
      { term: "Functional Group", urduTerm: "فنکشنل گروپ", definition: "Reactive part of an organic molecule.", urduDefinition: "نامیاتی مالیکیول کا ری ایکٹو حصہ۔" }
    ]
  },
  "c12": {
    unitID: "c12",
    title: "Hydrocarbons",
    urduTitle: "ہائیڈرو کاربن",
    sections: [
      {
        title: "Alkanes",
        urduTitle: "الکینز",
        content: "Alkanes are saturated hydrocarbons with single bonds between carbon atoms. Their general formula is CnH2n+2. They are also called paraffins because of their low reactivity.",
        urduContent: "الکینز سیر شدہ ہائیڈرو کاربن ہیں جن میں کاربن ایٹموں کے درمیان سنگل بانڈ ہوتے ہیں۔ ان کا عمومی فارمولا CnH2n+2 ہے۔ ان کی کم ری ایکٹیویٹی کی وجہ سے انہیں پیرافنز بھی کہا جاتا ہے۔",
        image: "https://picsum.photos/seed/c12s1/1200/600"
      },
      {
        title: "Alkenes and Alkynes",
        urduTitle: "الکینز اور الکائنز",
        content: "Alkenes (CnH2n) contain at least one carbon-carbon double bond. Alkynes (CnH2n-2) contain at least one carbon-carbon triple bond. Both are unsaturated hydrocarbons.",
        urduContent: "الکینز (CnH2n) میں کم از کم ایک کاربن کاربن ڈبل بانڈ ہوتا ہے۔ الکائنز (CnH2n-2) میں کم از کم ایک کاربن کاربن ٹرپل بانڈ ہوتا ہے۔ دونوں غیر سیر شدہ ہائیڈرو کاربن ہیں۔",
        image: "https://picsum.photos/seed/c12s2/1200/600"
      }
    ],
    keyPoints: [
      "Alkanes undergo substitution reactions.",
      "Alkenes and Alkynes undergo addition reactions.",
      "Hydrogenation converts alkenes to alkanes.",
      "Ethene is used for artificial ripening of fruits."
    ],
    glossary: [
      { term: "Hydrocarbon", urduTerm: "ہائیڈرو کاربن", definition: "Compound of carbon and hydrogen only.", urduDefinition: "صرف کاربن اور ہائیڈروجن کا مرکب۔" },
      { term: "Saturated", urduTerm: "سیر شدہ", definition: "Contains only single bonds.", urduDefinition: "صرف سنگل بانڈز پر مشتمل۔" }
    ]
  },
  "c13": {
    unitID: "c13",
    title: "Biochemistry",
    urduTitle: "بائیو کیمسٹری",
    sections: [
      {
        title: "Carbohydrates",
        urduTitle: "کاربوہائیڈریٹس",
        content: "Carbohydrates are polyhydroxy aldehydes or ketones. They are classified into monosaccharides (glucose), oligosaccharides (sucrose), and polysaccharides (starch, cellulose).",
        urduContent: "کاربوہائیڈریٹس پولی ہائیڈروکسی ایلڈیہائڈز یا کیٹونز ہیں۔ انہیں مونو سیکرائڈز (گلوکوز)، اولیگو سیکرائڈز (سوکروز)، اور پولی سیکرائڈز (نشاستہ، سیلولوز) میں تقسیم کیا گیا ہے۔",
        image: "https://picsum.photos/seed/c13s1/1200/600"
      },
      {
        title: "Proteins and Lipids",
        urduTitle: "پروٹینز اور لپڈز",
        content: "Proteins are polymers of amino acids. Lipids are esters of long-chain fatty acids and glycerol. Both are essential for life processes.",
        urduContent: "پروٹینز امینو ایسڈز کے پولیمر ہیں۔ لپڈز لمبی زنجیر والے فیٹی ایسڈز اور گلیسرول کے ایسٹرز ہیں۔ دونوں زندگی کے عمل کے لیے ضروری ہیں۔",
        image: "https://picsum.photos/seed/c13s2/1200/600"
      }
    ],
    keyPoints: [
      "Glucose is the primary source of energy.",
      "Enzymes are biological catalysts (proteins).",
      "Vitamins are required in small amounts for health.",
      "DNA and RNA are nucleic acids."
    ],
    glossary: [
      { term: "Enzyme", urduTerm: "اینزائم", definition: "Biological catalyst.", urduDefinition: "حیاتیاتی کیٹالسٹ۔" },
      { term: "Lipid", urduTerm: "لپڈ", definition: "Fats and oils.", urduDefinition: "چربی اور تیل۔" }
    ]
  },
  "c14": {
    unitID: "c14",
    title: "Environmental Chemistry I: Atmosphere",
    urduTitle: "ماحولیاتی کیمیا: کرہ ہوائی",
    sections: [
      {
        title: "Layers of Atmosphere",
        urduTitle: "کرہ ہوائی کی تہیں",
        content: "The atmosphere is divided into layers: Troposphere, Stratosphere, Mesosphere, and Thermosphere. Most weather occurs in the troposphere.",
        urduContent: "کرہ ہوائی کو تہوں میں تقسیم کیا گیا ہے: ٹروپوسفیئر، اسٹریٹوسفیئر، میسوسفیئر، اور تھرموسفیئر۔ زیادہ تر موسم ٹروپوسفیئر میں ہوتا ہے۔",
        image: "https://picsum.photos/seed/c14s1/1200/600"
      },
      {
        title: "Air Pollutants",
        urduTitle: "فضائی آلودگی",
        content: "Primary pollutants (CO, SO2) are emitted directly. Secondary pollutants (Acid rain, Smog) form from primary ones. Greenhouse effect leads to global warming.",
        urduContent: "بنیادی آلودگی (CO, SO2) براہ راست خارج ہوتی ہے۔ ثانوی آلودگی (تیزابی بارش، اسموگ) بنیادی آلودگی سے بنتی ہے۔ گرین ہاؤس اثر گلوبل وارمنگ کا باعث بنتا ہے۔",
        image: "https://picsum.photos/seed/c14s2/1200/600",
        interactiveDiagramId: "greenhouse-effect"
      }
    ],
    keyPoints: [
      "Troposphere extends up to 12 km.",
      "Ozone layer in stratosphere protects from UV rays.",
      "Acid rain has pH less than 5.6.",
      "CO is a silent killer."
    ],
    glossary: [
      { term: "Pollutant", urduTerm: "آلودگی", definition: "Substance that causes pollution.", urduDefinition: "وہ مادہ جو آلودگی کا باعث بنتا ہے۔" },
      { term: "Ozone", urduTerm: "اوزون", definition: "O3 gas in stratosphere.", urduDefinition: "اسٹریٹوسفیئر میں O3 گیس۔" }
    ]
  },
  "c15": {
    unitID: "c15",
    title: "Environmental Chemistry II: Water",
    urduTitle: "ماحولیاتی کیمیا: پانی",
    sections: [
      {
        title: "Hard Water",
        urduTitle: "بھاری پانی",
        content: "Hard water contains dissolved salts of calcium and magnesium. Temporary hardness is due to bicarbonates, while permanent hardness is due to chlorides and sulfates.",
        urduContent: "بھاری پانی میں کیلشیم اور میگنیشیم کے نمکیات حل ہوتے ہیں۔ عارضی سختی بائی کاربونیٹس کی وجہ سے ہوتی ہے، جبکہ مستقل سختی کلورائڈز اور سلفیٹس کی وجہ سے ہوتی ہے۔",
        image: "https://picsum.photos/seed/c15s1/1200/600"
      },
      {
        title: "Water Pollution",
        urduTitle: "آبی آلودگی",
        content: "Industrial waste, domestic sewage, and agricultural runoff pollute water. This leads to diseases like cholera, typhoid, and dysentery.",
        urduContent: "صنعتی فضلہ، گھریلو سیوریج، اور زرعی فضلہ پانی کو آلودہ کرتے ہیں۔ اس سے ہیضہ، ٹائیفائیڈ اور پیچش جیسی بیماریاں جنم لیتی ہیں۔",
        image: "https://picsum.photos/seed/c15s2/1200/600"
      }
    ],
    keyPoints: [
      "Water is a universal solvent due to polarity.",
      "Temporary hardness is removed by boiling or Clark's method.",
      "Permanent hardness is removed by washing soda or ion-exchange.",
      "Fluoridation prevents tooth decay but excess causes fluorosis."
    ],
    glossary: [
      { term: "Hard Water", urduTerm: "بھاری پانی", definition: "Water that doesn't form lather easily.", urduDefinition: "وہ پانی جو آسانی سے جھاگ نہیں بناتا۔" },
      { term: "Soft Water", urduTerm: "ہلکا پانی", definition: "Water that forms lather easily.", urduDefinition: "وہ پانی جو آسانی سے جھاگ بناتا ہے۔" }
    ]
  },
  "c16": {
    unitID: "c16",
    title: "Chemical Industries",
    urduTitle: "کیمیائی صنعتیں",
    sections: [
      {
        title: "Metallurgy",
        urduTitle: "میٹالرجی",
        content: "Metallurgy is the process of extracting metals from their ores. It involves concentration, roasting, smelting, and refining.",
        urduContent: "میٹالرجی کچ دھاتوں سے دھاتیں نکالنے کا عمل ہے۔ اس میں ارتکاز، روسٹنگ، سمیلٹنگ اور ریفائننگ شامل ہے۔",
        image: "https://picsum.photos/seed/c16s1/1200/600"
      },
      {
        title: "Solvay Process",
        urduTitle: "سولوی پراسیس",
        content: "The Solvay process is used to manufacture sodium carbonate (washing soda). Raw materials are brine, limestone, and ammonia.",
        urduContent: "سولوی پراسیس سوڈیم کاربونیٹ (واشنگ سوڈا) بنانے کے لیے استعمال ہوتا ہے۔ خام مال نمکین پانی، چونا پتھر اور امونیا ہیں۔",
        image: "https://picsum.photos/seed/c16s2/1200/600",
        interactiveDiagramId: "solvay-process"
      }
    ],
    keyPoints: [
      "Urea is a nitrogenous fertilizer (46% N).",
      "Fractional distillation separates petroleum components.",
      "Roasting is heating ore in excess of air.",
      "Slag is a waste product in smelting."
    ],
    glossary: [
      { term: "Ore", urduTerm: "کچ دھات", definition: "Mineral from which metal is extracted.", urduDefinition: "وہ معدنیات جس سے دھات نکالی جاتی ہے۔" },
      { term: "Metallurgy", urduTerm: "میٹالرجی", definition: "Science of extracting metals.", urduDefinition: "دھاتیں نکالنے کی سائنس۔" }
    ]
  }
};
