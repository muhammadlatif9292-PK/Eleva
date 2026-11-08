# ELEVA — Elevate Your Knowledge

> **A luxury educational platform engineered for Grade 10 students following the Khyber Pakhtunkhwa Textbook Board (KPTBB) curriculum in Pakistan.**

ELEVA is a Next.js 15 educational ecosystem that delivers a premium learning experience for high school science students. Featuring specialized interactive lecture modules, vector diagrams, formula solvers, gamified practice arenas, and AI-powered 1-on-1 tutoring.

---

## 🏛️ Learning Ecosystem & Features

### ⚛️ Physics Mastery (KPTBB Class 10)
- **Deep-Dive Interactive Lectures**: Covers foundational mechanics, wave motion, geometrical optics, electrostatics, current electricity, electromagnetism, and introductory electronics.
- **Interactive Physics Diagrams**: Vector-drawn optical ray tracing for convex and concave lenses/mirrors, circuit diagrams, and force vectors.
- **Physics Formula Sheet**: Dynamic interactive cheat sheet with unit converters, variable isolators, and live physics calculations.
- **Physics AI Tutor**: Embedded conversational assistant powered by Google Gemini to explain concepts and solve numericals step-by-step.

### 🧪 Chemistry Laboratory (KPTBB Class 10)
- **Interactive Chemistry Lectures**: Comprehensive coverage of chemical equilibrium, acids, bases and salts, organic chemistry, hydrocarbons, biochemistry, and environmental chemistry.
- **Interactive Reaction Diagrams**: Reaction mechanisms, atomic orbital models, and titration curves.
- **Chemistry AI Assistant**: Instant explanations for reaction kinetics, IUPAC nomenclature, and balancing chemical equations.

### 🎯 Practice Arena & Exam Simulators
- **Targeted Practice**: Topic-wise practice sessions with difficulty scaling and immediate pedagogical explanations.
- **Timed Board Exam Simulations**: Full-length mock examinations strictly structured around the KPTBB examination pattern.
- **Progress Tracking & Analytics**: Mastery meters, accuracy diagnostics, streak counters, and XP progression.

### 👑 Prestige Design System
- Built on a dark aesthetic (*Obsidian Onyx* `#050505`, *Sovereign Gold* `#F5C518`, *Pure Chalk* `#FFFFFF`).
- Zero visual clutter, distraction-free typography, and fluid micro-interactions with Framer Motion.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Core Library**: [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/) / Motion
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Firebase v12](https://firebase.google.com/) (Cloud Firestore + Firebase Authentication)
- **AI Core**: [Google Gemini 2.0 Flash](https://ai.google.dev/) (`@google/genai`)
- **State Management**: [Zustand v5](https://github.com/pmndrs/zustand)
- **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown)

---

## 📂 Repository Structure

```text
Eleva/
├── app/                        # Next.js App Router root
│   ├── error.tsx               # Error boundary
│   ├── global-error.tsx        # Critical system failure boundary
│   ├── globals.css             # Tailwind v4 styles & prestige tokens
│   ├── layout.tsx              # Root HTML shell & metadata
│   ├── not-found.tsx           # 404 handler
│   └── page.tsx                # Main student dashboard & subject navigator
├── components/                 # Application component suite
│   ├── AdminPanel.tsx          # System administration & seed management
│   ├── ChemistryChat.tsx       # AI Chemistry tutor chat interface
│   ├── ChemistryHome.tsx       # Chemistry subject portal
│   ├── ChemistryLecture.tsx    # Chemistry multimedia lectures
│   ├── ErrorBoundary.tsx       # Component-level error isolation
│   ├── InteractiveChemistryDiagram.tsx
│   ├── InteractivePhysicsDiagram.tsx
│   ├── PhysicsChat.tsx         # AI Physics tutor chat interface
│   ├── PhysicsDiagrams.tsx     # Vector physics diagrams
│   ├── PhysicsFormulaSheet.tsx # Interactive physics equations
│   ├── PhysicsHome.tsx         # Physics subject portal
│   ├── PhysicsLecture.tsx      # Physics multimedia lectures
│   ├── PracticeArena.tsx       # Gamified question practice
│   ├── PracticeScreen.tsx      # Topic drill interface
│   ├── ProgressScreen.tsx      # Student analytics & achievements
│   ├── SettingsScreen.tsx      # User preferences & profile settings
│   └── TestsScreen.tsx         # Board exam mock testing
├── data/                       # Curriculum content & question banks
│   ├── chemistryContent.ts     # Chapter notes & curriculum data
│   ├── chemistryQuestions.ts   # KPTBB chemistry question corpus
│   ├── physicsContent.ts       # Physics textbook curriculum notes
│   └── physicsQuestions.ts     # KPTBB physics question corpus
├── docs/                       # Architectural blueprints & prompt guides
│   ├── ELEVA_MASTER_PROMPT.md  # System specification & builder rules
│   └── ELEVA.pdf               # Project design document
├── lib/
│   ├── firebase.ts             # Firebase client SDK initialization & error handling
│   └── store.ts                # Zustand global student state
├── services/
│   └── seedService.ts          # Firestore curriculum bootstrap utility
├── firebase-applet-config.json # Firebase connection template
├── firebase-blueprint.json     # Firestore collection schema blueprint
├── firestore.rules             # Security rules for Firestore collections
├── next.config.mjs             # Next.js configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.18.0 or higher)
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/muhammadlatif9292-PK/Eleva.git
cd Eleva

npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local` and configure your API keys:
```bash
cp .env.example .env.local
```
Add your credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
GEMINI_API_KEY="your-gemini-api-key"
NEXT_PUBLIC_GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License & Attribution

Designed and engineered by **Muhammad Hamad Latif** (`muhammadlatif9292@gmail.com`). All rights reserved.
