# ELEVA — MASTER BUILD PROMPT FOR GOOGLE AI STUDIO
# Version: FRESH START — Read every word before touching any file.

---

## ⚠️ CRITICAL BUILDER RULES — READ BEFORE ANYTHING ELSE

These are the mistakes that destroyed the previous builds. You must follow these rules on every single action:

1. **File name casing is exact.** `PhysicsHome.tsx` is NOT the same as `physicsHome.tsx`. Before every import, open the file explorer and confirm the exact filename including uppercase and lowercase letters.
2. **Never do two big things at once.** One feature at a time. Build it. Confirm it compiles. Then move on.
3. **TypeScript check after every change.** Run `npm run lint` after every file edit. If there is even one error, fix it before proceeding. Never say "it should work" without verifying.
4. **Never add `framer-motion` to `transpilePackages` in `next.config.mjs`.** This causes the vendor-chunk crash. Only `lucide-react` goes in transpilePackages.
5. **Never use `output: 'standalone'` or `distDir: 'dist'` in `next.config.mjs`.** These break the AI Studio deployment every time.
6. **Never import from `motion/react`.** Always import from `framer-motion`.
7. **The `motion` component and TypeScript:** When using `framer-motion` with React 19, cast it as: `const motion = motionImport as any;` to avoid className type errors.
8. **`@types/react` and `@types/react-dom` must always be in `devDependencies`.** Without them, every React class component breaks.
9. **`tsconfig.json` must never have `experimentalDecorators: true` or `useDefineForClassFields: false`.** These break class components in React 19.
10. **The Firestore "unavailable" error is NOT a real error** when shown in the console. It is a warning that the preview window cannot reach Firebase from its sandbox. The app still works. Do not try to "fix" it by re-provisioning Firebase — that causes a loop.
11. **Do not auto-click "Fix" more than once.** If the AI suggests a fix and it fails once, stop and reason about the root cause. Clicking Fix repeatedly causes code regression loops.
12. **When a component has props, always open the component file and read the actual prop interface before using it.** Never guess prop names.

---

## PART 1 — PROJECT IDENTITY

**App Name:** ELEVA ("Elevate Your Knowledge")
**Purpose:** A luxury educational app for Grade 10 students following the KPTBB (Khyber Pakhtunkhwa Textbook Board) curriculum in Pakistan.
**Subjects:** Physics, Chemistry, Biology, Mathematics, Pakistan Studies, Urdu, Islamiyat, Mutalia Quran, English (9 subjects total)
**Build Strategy:** Physics first (fully complete), then Chemistry (fully complete), then remaining subjects as placeholders. Gamification and dashboards come LAST after all subjects are structurally complete.
**Admin Email:** muhammadlatif9292@gmail.com

---

## PART 2 — TECH STACK (DO NOT DEVIATE)

- **Framework:** Next.js 15 with App Router (`app/` directory)
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`
- **Animation:** `framer-motion` v11 only
- **Icons:** `lucide-react` v0.460.0 only
- **State:** `zustand` v5
- **AI:** `@google/genai` using model `gemini-2.0-flash`
- **Database:** Firebase v12 (Firestore + Auth)
- **Language:** TypeScript strict: false

**`package.json` dependencies — use exactly these versions:**
```json
{
  "dependencies": {
    "@google/genai": "^1.29.0",
    "@tailwindcss/postcss": "^4.2.2",
    "clsx": "^2.1.1",
    "firebase": "^12.11.0",
    "framer-motion": "^11.11.17",
    "lucide-react": "^0.460.0",
    "next": "^15.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-markdown": "^10.1.0",
    "tailwind-merge": "^3.5.0",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@types/node": "^22.14.0",
    "eslint": "^9.39.4",
    "eslint-config-next": "^15.1.4",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2"
  }
}
```

**`tsconfig.json` — use exactly this:**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "preserve",
    "paths": { "@/*": ["./*"] },
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": false,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

**`next.config.mjs` — use exactly this:**
```js
const nextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }]
  }
};
export default nextConfig;
```

---

## PART 3 — DESIGN SYSTEM (LOCKED — NEVER CHANGE)

**Colours:**
- Background: `#050505` (deep noir)
- Background accent: `radial-gradient(circle at top right, rgba(27, 44, 193, 0.1), transparent 50%)`
- Gold primary: `#F5C518`
- Physics accent: `#8B5CF6` (purple)
- Chemistry accent: `#F59E0B` (amber)
- Biology accent: `#10B981` (emerald)
- Mathematics accent: `#3B82F6` (blue)
- Text primary: `white/90`
- Text muted: `white/40`

**Fonts (Google Fonts):**
- Display headings: `Instrument Serif` italic
- Body: `Inter` light/regular
- Urdu content: `Noto Nastaliq Urdu`

**CSS classes in `app/globals.css`** (paste the full globals.css from the reference file):
- `.prestige-card` — glassmorphism card with gold gradient border
- `.prestige-button-primary` — gold filled button with inner glow
- `.prestige-button-secondary` — subtle glass button
- `.font-urdu` — RTL Urdu text class
- `.safe-zone` — standard page padding
- `.no-scrollbar` — hides scrollbar track

**All h1-h4 tags are automatically italic Instrument Serif via globals.css.**

---

## PART 4 — AUTHENTICATION SYSTEM

**Flow:**
1. User opens app → sees 9-second cinematic noir intro
2. Intro ends → Auth screen appears
3. Auth screen Step 1: Enter Access Code (format `ELV-XXXX-XXX`) — validated against Firestore `accessCodes` collection
4. Auth screen Step 2: Enter `studentFullName` and `fatherName`
5. System generates Permanent Personal ID (format `ELEVA-STD-#####`) and saves to Firestore `users` collection
6. User lands on Home Dashboard

**Admin bypass:** If signed in with Google using `muhammadlatif9292@gmail.com`, skip access code and go directly to profile setup with `userType: 'admin'`.

**UserProfile interface:**
```typescript
interface UserProfile {
  userID: string;
  personalID: string;
  userType: 'student' | 'parent' | 'teacher' | 'admin';
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
```

---

## PART 5 — APP NAVIGATION STRUCTURE

The entire app lives in `app/page.tsx` as a single-page router using `useState` for `currentView`.

**`currentView` type:**
```typescript
type CurrentView =
  | 'landing'
  | 'physics_home' | 'physics_chat' | 'physics_lecture'
  | 'chemistry_home' | 'chemistry_chat' | 'chemistry_lecture'
  | 'biology_home'
  | 'practice' | 'tests' | 'practice_arena'
  | 'formula_sheet' | 'progress' | 'settings' | 'admin';
```

**Initial view:** `'landing'` (home dashboard) — NOT `'physics_home'`.

**Bottom Navigation Bar** (always visible when logged in, `z-50`, glassmorphism):
- Home → `'landing'`
- Physics → `'physics_home'`
- Chemistry → `'chemistry_home'`
- Practice → `'practice'`
- Settings → `'settings'`

All main content screens must have `pb-24` bottom padding so content is not hidden behind the nav bar.

Every screen must have a back button (ChevronLeft icon) returning to its parent screen.

---

## PART 6 — HOME DASHBOARD SCREEN (`'landing'`)

The home dashboard must contain:

1. **Header:** "Welcome back, [studentFullName]" in display font + Personal ID in small gold text
2. **Daily strip:** streak count, today's XP (from userProfile, show 0 if null)
3. **Subject grid (3 columns on desktop, 1 on mobile):**
   - Physics (purple `#8B5CF6`, Atom icon)
   - Chemistry (amber `#F59E0B`, Zap icon)
   - Biology (emerald `#10B981`, Microscope icon) — shows "Coming Soon" badge
   - Mathematics (blue `#3B82F6`, Calculator icon) — shows "Coming Soon" badge
   - Pakistan Studies (orange, BookOpen icon) — "Coming Soon"
   - Urdu (pink, BookText icon) — "Coming Soon"
   - Islamiyat (teal, Moon icon) — "Coming Soon"
   - Mutalia Quran (green, Star icon) — "Coming Soon"
   - English (indigo, Languages icon) — "Coming Soon"
4. **Quick access row:** Practice, Tests, Progress, Formula Sheet
5. **Admin panel button** (visible only when `userProfile.userType === 'admin'`)

---

## PART 7 — PROFESSOR NOVA (AI CHAT)

**Physics AI System Prompt:**
```
You are Professor Nova, a world-class Physics specialist for Grade 10 KPTBB Pakistan students.
RULES:
- Speak ONLY in English for all academic content. Never translate Physics terms to Urdu.
- UI encouragement can be bilingual.
- Knowledge scope: Units 10-18 (SHM, Sound, Optics, Electrostatics, Electricity, Electromagnetism, Electronics, ICT, Atomic/Nuclear Physics).
- For all calculations use this exact format:
  [GIVEN]: list all known values with units
  [FORMULA]: state the relevant formula
  [CALCULATION]: step by step substitution
  [RESULT]: bold the final answer with SI units
- Board exam weightage: Unit 12 Optics=13 marks (highest), Unit 14 Electricity=9 marks, Unit 18 Nuclear=7 marks.
- For off-topic questions: "That topic is outside my Physics scope. Please visit the relevant subject module."
- Encourage using student's name. Every 5th response include: "Your dedication would make your father proud."
- Use ⭐ BOARD EXAM ALERT when teaching frequently tested topics.
- Never hallucinate. If unsure about a KPTBB-specific fact, say so.
- Depth levels: Textbook → Guides → Full Exam Prep (follow what the student requests).
```

**Chemistry AI System Prompt:**
```
You are Professor Nova, a Chemistry specialist for Grade 10 KPTBB Pakistan students.
RULES:
- Speak ONLY in English for all academic content. Chemical terms (like H2SO4, NaOH) stay in English always.
- Chemistry is reaction-heavy and definition-heavy, not numerical-heavy. Teach accordingly.
- Knowledge scope: Units 9-16 (Equilibrium, Acids/Bases, Organic, Hydrocarbons, Biochemistry, Atmosphere, Water, Industries).
- For chemical equations always balance them and show state symbols (s), (l), (g), (aq).
- For off-topic questions: "That topic is outside my Chemistry scope."
- The textbook exercise short questions and long questions are outdated. Focus on SLO-based board paper patterns from 2018-2024.
- Use ⭐ BOARD EXAM ALERT for frequently tested reactions and definitions.
```

**API call pattern (use this exact structure):**
```typescript
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
const result = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: conversationHistory,
  config: { systemInstruction: SYSTEM_PROMPT, maxOutputTokens: 2048 }
});
const text = result.text;
```

---

## PART 8 — PHYSICS MODULE (COMPLETE)

**Units:** p10 through p18 (9 units, all fully built in reference data file)

**PhysicsHome screen must have:**
- Unit grid (9 cards, one per unit, p10-p18) — each shows unit number, title, Urdu title, a colour-coded progress bar (starts at 0%)
- "Ask Professor Nova" quick input bar at top — typing and pressing send goes to `physics_chat` with that text pre-filled
- Quick action buttons: Chat, Lecture, Practice, Tests, Formula Sheet
- Back button → landing

**PhysicsLecture screen must have:**
- Unit selector at top
- Sections displayed as expandable cards with English content and Urdu content toggle
- Formulas displayed in a formula vault sidebar
- Numerical problems with interactive answer checking (type answer → check → show solution)
- "Quick Question" button on each section → opens physics_chat with pre-filled context
- Interactive diagrams triggered by `interactiveDiagramId` field:
  - `"wave-simulator"` → wave frequency/amplitude slider
  - `"lens-simulator"` → object distance slider showing image change
  - `"circuit-lab"` → toggle switch and resistance slider
- Progress tracker in sidebar showing sections viewed
- Back button → physics_home

**PhysicsChat screen must have:**
- Conversation history (array of `{role: 'user'|'model', content: string}`)
- Image upload button (converts to base64, sends to Gemini vision)
- Voice input button (Web Speech API)
- Message bubbles: AI on left (`align-self: flex-start`), User on right (`align-self: flex-end`)
- Send triggers exactly once — use a `isSending` ref guard to prevent double-send
- Back button → physics_home

**PhysicsFormulaSheet screen:**
- All 9 units listed with their formulas
- Gold-on-dark styling
- Back button → physics_home

**Exam Practice Modes (in `practice_arena`):**
- MCQ mode: 12 questions, 1 mark each, 4 options
- RRQ mode: short answer questions
- ERQ mode: long answer (2-part: 4 marks theory + 3 marks numerical)
- Mock Paper: full 65-mark exam with timer

**Table of Specification for Physics (65 marks total):**
- 12 MCQs × 1 mark = 12 marks
- 8 of 11 RRQs × 4 marks = 32 marks
- 3 of 4 ERQs × 7 marks = 21 marks

---

## PART 9 — CHEMISTRY MODULE (COMPLETE)

**Units:** c9 through c16 (8 units, all built in reference data file)

**ChemistryHome, ChemistryLecture, ChemistryChat** follow the exact same structural pattern as Physics with these differences:
- Colour: amber `#F59E0B`
- No formula vault (fewer formulas, more reactions)
- Reactions displayed with balanced equations and state symbols
- Interactive diagrams:
  - `"equilibrium-simulator"` → Le Chatelier's principle
  - `"ph-explorer"` → pH scale slider
  - `"functional-group-explorer"` → organic group visualiser
  - `"haber-process"` → industrial process diagram
  - `"greenhouse-effect"` → atmosphere diagram

---

## PART 10 — BIOLOGY MODULE (PLACEHOLDER)

Create `components/BiologyHome.tsx` as a placeholder:
- Same layout structure as ChemistryHome
- Green colour `#10B981`
- "Coming Soon — Units Loading" banner at top
- Show 8 unit cards with no content, just unit titles greyed out
- AI chat button shows: "Biology module coming soon. Check back later." toast — does not open chat
- Back button → landing

---

## PART 11 — PRACTICE AND TESTS SCREENS

**PracticeScreen** (`'practice'`):
- Lists all available subjects
- Shows unit-by-unit practice cards for Physics (active) and Chemistry (active)
- Other subjects show "Coming Soon"
- Tapping a unit → launches `practice_arena` with that unitId

**TestsScreen** (`'tests'`):
- Weekly Mock Exam card (full 65-mark Physics paper)
- Unit Revision Tests (per unit)
- Past Results section (read from Firestore `testResults` if available)

**PracticeArena** (`'practice_arena'`):
- Full-screen distraction-free mode
- Props: `unitId`, `subject`, `user`, `onBack`
- Question displayed with 4 options
- After answering: show correct/wrong with concept explanation
- +10 XP for correct answers (write to Firestore if connected)
- Progress bar at top
- Session summary at end

---

## PART 12 — PROGRESS SCREEN

- Shows `userProfile.studentFullName`, Personal ID, level
- XP total and weekly XP
- Subject mastery bars (Physics, Chemistry)
- Streak count
- Earned badges/rewards grid
- Back button → landing

---

## PART 13 — SETTINGS SCREEN

- Account info (name, father's name, personal ID, email)
- Language toggle (English / Urdu)
- Notification preferences
- Premium status
- For admin: Admin Control Panel button
- Logout button
- Back button → landing

---

## PART 14 — ADMIN PANEL

Only accessible when `userProfile.userType === 'admin'`.

Features:
- Generate access codes (free and premium)
- Student directory (searchable list from Firestore `users`)
- Toggle student premium status
- Seed curriculum data button
- View mode toggle (see app as student)
- Back button → landing

---

## PART 15 — ZUSTAND STORE

File: `lib/store.ts`

```typescript
import { create } from 'zustand';
// UserProfile interface (see Part 4)
interface AppState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthReady: boolean;
  setAuthReady: (ready: boolean) => void;
}
export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isAuthReady: false,
  setAuthReady: (ready) => set({ isAuthReady: ready }),
}));
```

---

## PART 16 — FIREBASE

File: `lib/firebase.ts` — import from `firebase-applet-config.json` (AI Studio provides this automatically). Export `db`, `auth`. The `testConnection()` function that tries to reach Firestore will fail in the preview sandbox — this is normal, do not treat it as an error.

**Firestore collections needed:**
`users`, `accessCodes`, `recoveryCodes`, `subjects`, `chapters`, `topics`, `questions`, `studentProgress`, `dailySessions`, `tests`, `testResults`, `xpAndLevels`, `streaks`, `rewards`, `dailyBites`, `notifications`, `adminLogs`

---

## PART 17 — THE 9-SECOND CINEMATIC INTRO

Component: `ElevaNoirIntro` inside `app/page.tsx`

Timeline:
- **0–2.5s:** Black screen. ELEVA logo fades in with gold shimmer (opacity 0→1, gold light-sweep left to right)
- **2.5–5s:** "Elevate Your Knowledge" tagline appears with blur-to-focus effect (filter: blur(20px)→blur(0), scale 1.1→1)
- **5–7.5s:** 9 subject names in a grid pulse one by one (opacity 0.2→1→0.5)
- **7.5–9s:** Entire sequence scales up slightly (1.0→1.05) then fades out, transitions to auth screen
- Use `display: grid; place-items: center` for the container — never absolute centering
- Z-index: `z-[999]`, remove from DOM after completion

---

## PART 18 — LANGUAGE RULES (STRICT)

**Group A — Urdu subject:** Urdu only, RTL, `font-urdu` class
**Group B — Islamiyat, Pakistan Studies, Mutalia Quran:** Bilingual, toggle between English and Urdu
**Group C — Physics, Chemistry, Biology, Mathematics, English:** Academic content in English only. If Urdu UI mode is on, UI labels can be Urdu but all scientific terms, formulas, and explanations stay English.

---

## PART 19 — BUILD ORDER (BITES)

Follow this exact order. Do not start a new bite until the previous one has zero TypeScript errors and the preview loads.

**BITE 1:** Set up the project skeleton
- Create all config files exactly as specified in Part 2
- Create `app/globals.css` exactly as in the reference code file
- Create `app/layout.tsx` with React import as first line, ErrorBoundary wrapping children
- Create `lib/store.ts`
- Create `lib/firebase.ts`
- Create `components/ErrorBoundary.tsx` with constructor binding (see reference file)
- Confirm: `npm run lint` zero errors

**BITE 2:** Create the auth and intro screens
- Create `ElevaNoirIntro` component inside `app/page.tsx`
- Create `AuthScreen` component (access code → profile setup → ID reveal)
- Create `app/page.tsx` main router with `currentView` useState starting at `'landing'`
- Confirm: app loads, shows intro, then auth screen

**BITE 3:** Create the home dashboard
- Build the `'landing'` case in the switch with full subject grid and bottom nav bar
- 9 subject cards, Physics and Chemistry active, rest show "Coming Soon"
- Quick access row: Practice, Tests, Progress, Settings
- Confirm: logged-in user sees the home dashboard

**BITE 4:** Create the Physics module
- `components/PhysicsHome.tsx`
- `components/PhysicsChat.tsx` (with Gemini integration)
- `components/PhysicsLecture.tsx` (with interactive diagrams)
- `components/PhysicsFormulaSheet.tsx`
- `data/physicsContent.ts` (paste from reference file)
- `data/physicsQuestions.ts` (paste from reference file)
- Wire all navigation in `app/page.tsx`
- Confirm: full Physics flow works end-to-end

**BITE 5:** Create the Chemistry module
- Same structure as Physics
- `data/chemistryContent.ts` and `data/chemistryQuestions.ts` from reference file
- Confirm: full Chemistry flow works

**BITE 6:** Create Practice, Tests, PracticeArena
- Wire to both Physics and Chemistry data
- Confirm: practice and exam modes work

**BITE 7:** Create Progress, Settings, Admin screens
- `components/ProgressScreen.tsx`
- `components/SettingsScreen.tsx`
- `components/AdminPanel.tsx`
- Confirm: all screens open and back navigation works

**BITE 8:** Create Biology placeholder
- `components/BiologyHome.tsx`
- Confirm: Biology card on home goes to Biology placeholder

**BITE 9:** Visual polish
- Framer-motion transitions between views (`AnimatePresence mode="wait"`)
- `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}` on all cards
- Bottom nav active state highlights in gold
- Confirm: all animations smooth, no layout jumps

**BITE 10:** Remaining subject placeholders
- Mathematics, Pakistan Studies, Urdu, Islamiyat, Mutalia Quran, English
- All as placeholder home screens like Biology
- Confirm: all 9 subject cards on home navigate to their placeholder

---

## PART 20 — WHAT TO DO AFTER ALL BITES COMPLETE

Only after all 10 bites are confirmed working with zero errors:

1. Populate remaining subject data files (Biology, Mathematics etc.) one subject at a time
2. Add gamification: XP system, streaks, level-up animations, leaderboard
3. Add parent dashboard and teacher dashboard
4. Add seeding service for access codes
5. Final infrastructure hardening (JWT stateless auth, offline support for textbook reading)

**Never add infrastructure changes and feature changes in the same prompt.**

---

## PART 21 — ERROR PREVENTION CHECKLIST

Before submitting any prompt to the builder, verify:
- [ ] Am I doing only ONE thing in this prompt?
- [ ] Have I specified exact file paths including correct casing?
- [ ] Have I said "run TypeScript check after" at the end?
- [ ] Am I NOT touching `next.config.mjs` unless necessary?
- [ ] Am I NOT adding framer-motion to transpilePackages?
- [ ] Am I NOT using `output: standalone` or `distDir`?
- [ ] Is the Firestore warning the only error (acceptable)?
- [ ] Have I said "do not click Fix more than once if errors appear"?
