# CODE BLUE: AI-Powered Build Guide

## Complete Step-by-Step Process for Building with AI IDEs

**Target IDEs**: Cursor, Windsurf, Claude Code, GitHub Copilot, or any AI-assisted development environment

**Estimated Build Time**: 40-60 hours across all phases

**Skill Level Required**: Beginner to Intermediate (the AI does the heavy lifting)

---

# TABLE OF CONTENTS

1. [Pre-Build Setup](#phase-0-pre-build-setup)
2. [Phase 1: Project Scaffolding](#phase-1-project-scaffolding)
3. [Phase 2: Core Data Models](#phase-2-core-data-models)
4. [Phase 3: Game State Management](#phase-3-game-state-management)
5. [Phase 4: Narrative Engine](#phase-4-narrative-engine)
6. [Phase 5: Skill Check System](#phase-5-skill-check-system)
7. [Phase 6: UI Foundation](#phase-6-ui-foundation)
8. [Phase 7: Dialogue System](#phase-7-dialogue-system)
9. [Phase 8: The Board (Diagnostic Tracking)](#phase-8-the-board-system)
10. [Phase 9: Patient Encounter System](#phase-9-patient-encounter-system)
11. [Phase 10: NPC & Relationship System](#phase-10-npc--relationship-system)
12. [Phase 11: Shift System](#phase-11-shift-system)
13. [Phase 12: Progression & Save System](#phase-12-progression--save-system)
14. [Phase 13: Content Creation Pipeline](#phase-13-content-creation-pipeline)
15. [Phase 14: CPC Coding Mode](#phase-14-cpc-coding-mode)
16. [Phase 15: Audio & Polish](#phase-15-audio--polish)
17. [Phase 16: Testing & Balancing](#phase-16-testing--balancing)
18. [Appendix: Troubleshooting Prompts](#appendix-troubleshooting-prompts)

---

# PHASE 0: PRE-BUILD SETUP

## Step 0.1: Choose Your Tech Stack

**Recommended Stack for this project:**

| Component | Technology | Why |
|-----------|------------|-----|
| Framework | **Next.js 14+ (App Router)** | React-based, great for narrative games, easy deployment |
| Language | **TypeScript** | Type safety prevents bugs, AI writes better TS |
| Styling | **Tailwind CSS** | Rapid UI development, AI knows it well |
| State | **Zustand** | Simple, powerful, perfect for game state |
| Database | **Local Storage + JSON** | Start simple, can migrate later |
| Narrative | **Custom Ink-like Parser** | We'll build a simpler version |
| Deployment | **Vercel** | One-click deploy for Next.js |

**Alternative Stack (if you prefer):**
- Godot + GDScript (more traditional game engine)
- Unity + Ink (industry standard for narrative games)
- Twine + SugarCube (simplest, no coding required)

## Step 0.2: Set Up Your Development Environment

### PROMPT 0.2.1: Environment Setup
```
I'm starting a new game development project. Help me set up my development environment:

1. Check if I have Node.js installed (need v18+)
2. Check if I have npm or pnpm installed
3. Recommend VS Code extensions for:
   - TypeScript development
   - Tailwind CSS
   - React/Next.js
   - Git integration

Give me the terminal commands to check versions and install anything missing.
```

## Step 0.3: Create Project Context File

Before starting, create a file called `PROJECT_CONTEXT.md` in your project root. This is your "AI memory" - paste it at the start of sessions.

### PROMPT 0.3.1: Create Context File
```
Create a PROJECT_CONTEXT.md file that I can paste at the start of AI coding sessions. It should contain:

Project: CODE BLUE - An Emergency Room RPG
Tech Stack: Next.js 14, TypeScript, Tailwind CSS, Zustand

Core Concept:
- Player is a medical student on ER rotation
- Text-based narrative game with skill checks (2d6 + modifier system)
- 18 skills across Clinical, Social, and Psychological categories
- Internal dialogue system (skills "speak" as characters like Disco Elysium)
- Persistent learning through "Lessons" that carry across shifts
- Relationship tracking with NPCs
- Medical education integrated into gameplay

Key Files (update as we build):
- /src/types/ - TypeScript interfaces
- /src/store/ - Zustand state management
- /src/components/ - React components
- /src/data/ - Game content (patients, dialogue, etc.)
- /src/utils/ - Helper functions
- /src/hooks/ - Custom React hooks

Current Phase: [UPDATE THIS]
Last Completed: [UPDATE THIS]
```

---

# PHASE 1: PROJECT SCAFFOLDING

## Step 1.1: Create Next.js Project

### PROMPT 1.1.1: Initialize Project
```
Create a new Next.js 14 project with the following specifications:

Project name: code-blue
Use: App Router (not Pages Router)
TypeScript: Yes
Tailwind CSS: Yes
ESLint: Yes
src/ directory: Yes
Import alias: @/*

Give me the exact terminal command and walk me through any prompts.
```

### PROMPT 1.1.2: Install Dependencies
```
For my Next.js game project, install these additional dependencies:

Production:
- zustand (state management)
- immer (immutable state updates)
- uuid (generating unique IDs)
- lodash (utility functions)
- framer-motion (animations)
- howler (audio - for later)

Development:
- @types/lodash
- @types/uuid

Give me the npm/pnpm install commands.
```

## Step 1.2: Set Up Project Structure

### PROMPT 1.2.1: Create Folder Structure
```
Create the following folder structure for my Next.js game project. Create empty index.ts files where appropriate for clean imports:

src/
├── app/
│   ├── page.tsx (main game entry)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/ (reusable UI components)
│   ├── game/ (game-specific components)
│   └── debug/ (development tools)
├── store/
│   ├── gameStore.ts (main game state)
│   ├── dialogueStore.ts (conversation state)
│   └── index.ts
├── types/
│   ├── game.ts (core game types)
│   ├── character.ts (player & NPC types)
│   ├── medical.ts (medical content types)
│   └── index.ts
├── data/
│   ├── skills.ts (skill definitions)
│   ├── characters/ (NPC data)
│   ├── patients/ (patient case data)
│   └── dialogue/ (conversation trees)
├── utils/
│   ├── dice.ts (dice rolling)
│   ├── skillChecks.ts (skill check logic)
│   └── helpers.ts
├── hooks/
│   └── useGameState.ts
└── lib/
    └── narrativeParser.ts (dialogue parsing)

Generate the folder structure and placeholder files.
```

## Step 1.3: Configure Tailwind for Game UI

### PROMPT 1.3.1: Custom Tailwind Config
```
Update my tailwind.config.ts for a medical drama RPG game with these requirements:

Color palette:
- Primary: Hospital blue/teal (#0891b2 family)
- Danger: Emergency red (#dc2626 family)
- Warning: Caution amber (#f59e0b family)
- Success: Stable green (#22c55e family)
- Neutral: Clinical grays
- Background: Dark theme (easier on eyes for long play sessions)

Typography:
- Heading font: Something clean and medical-feeling
- Body font: Readable for lots of text
- Monospace: For medical data, vitals display

Custom utilities needed:
- Text glow effects for skill voice highlights
- Pulse animation for urgent elements
- Typewriter animation class
- Screen scan line effect (optional CRT aesthetic)

Extend the default config, don't replace it.
```

---

# PHASE 2: CORE DATA MODELS

## Step 2.1: Define TypeScript Types

### PROMPT 2.1.1: Core Game Types
```
Create TypeScript interfaces in src/types/game.ts for my medical RPG:

1. Skill interface:
   - id: string (e.g., "TRIAGE", "DIFFERENTIAL")
   - name: string (display name)
   - category: "CLINICAL" | "SOCIAL" | "PSYCHOLOGICAL"
   - description: string
   - voiceName: string (e.g., "The Alarm", "The Detective")
   - voiceTone: string (description of how this skill "speaks")

2. PlayerSkills interface:
   - A record/map of skill IDs to current modifier values (-2 to +7)

3. SkillCheck interface:
   - skillId: string
   - dc: number (difficulty class, 6-18)
   - modifiers: Array of { source: string, value: number }
   - result?: { roll: number, total: number, success: boolean }

4. Lesson interface:
   - id: string
   - name: string
   - description: string
   - unlockedFrom: string (what triggered learning this)
   - effects: Array of { type: "SKILL_BONUS" | "UNLOCK_DIALOGUE" | "UNLOCK_ACTION", target: string, value: number | string }

5. GamePhase enum:
   - MAIN_MENU, CHARACTER_CREATION, SHIFT_START, GAMEPLAY, PATIENT_ENCOUNTER, DIALOGUE, SKILL_CHECK, SHIFT_END, GAME_OVER

Include JSDoc comments explaining each field.
```

### PROMPT 2.1.2: Character Types
```
Create TypeScript interfaces in src/types/character.ts:

1. PlayerCharacter interface:
   - id: string
   - name: string
   - background: "EMT" | "RESEARCH" | "LATE_BLOOMER" | "LEGACY"
   - personalityAxes: {
       confidence: number (-3 to +3, Anxious to Confident)
       approach: number (-3 to +3, By-the-Book to Intuitive)
       outlook: number (-3 to +3, Cynical to Idealistic)
     }
   - skills: PlayerSkills
   - lessons: Lesson[]
   - energy: number (0-100)
   - stress: number (0-100)
   - currentShift: number
   - totalXP: number

2. NPC interface:
   - id: string
   - name: string
   - role: "ATTENDING" | "RESIDENT" | "NURSE" | "TECH" | "OTHER"
   - title: string (e.g., "Dr.", "RN")
   - description: string
   - personality: string
   - sprites: { neutral: string, happy: string, angry: string, sad: string }

3. Relationship interface:
   - npcId: string
   - professional: number (-3 to +3)
   - personal: number (0 to 4)
   - storyProgress: number (0 to 100)
   - flags: Record<string, boolean> (story-specific flags)

4. RelationshipChange interface:
   - npcId: string
   - professionalDelta: number
   - personalDelta: number
   - reason: string

Include helper type for NPCRole descriptions.
```

### PROMPT 2.1.3: Medical Content Types
```
Create TypeScript interfaces in src/types/medical.ts:

1. Vital Signs interface:
   - heartRate: number
   - bloodPressure: { systolic: number, diastolic: number }
   - respiratoryRate: number
   - oxygenSaturation: number
   - temperature: number
   - isAbnormal: (vital: keyof VitalSigns) => boolean

2. Patient interface:
   - id: string
   - name: string
   - age: number
   - sex: "M" | "F"
   - chiefComplaint: string
   - vitals: VitalSigns
   - allergies: string[]
   - medications: string[]
   - pastMedicalHistory: string[]
   - familyHistory: string[]
   - socialHistory: { smoking: boolean, alcohol: string, drugs: string, occupation: string }
   - hiddenCondition: string (the actual diagnosis)
   - acuity: 1 | 2 | 3 | 4 | 5 (ESI triage level)
   - currentStatus: "WAITING" | "IN_PROGRESS" | "CRITICAL" | "STABLE" | "DISCHARGED" | "ADMITTED" | "DECEASED"

3. Symptom interface:
   - id: string
   - name: string
   - description: string
   - revealedBy: "HISTORY" | "PHYSICAL_EXAM" | "LABS" | "IMAGING" | "AUTOMATIC"
   - requiredSkillCheck?: SkillCheck
   - isRedFlag: boolean

4. PatientCase interface:
   - id: string
   - patient: Patient
   - symptoms: Symptom[]
   - correctDiagnoses: string[]
   - redHerrings: string[]
   - keyFindings: Array<{ finding: string, significance: string, skill: string }>
   - teachingPoints: string[]
   - possibleOutcomes: Array<{ condition: string, outcome: string, xpReward: number }>

5. BoardEntry interface (the diagnostic whiteboard):
   - id: string
   - type: "SYMPTOM" | "DIFFERENTIAL" | "CONNECTION" | "LESSON" | "ECHO"
   - content: string
   - pinned: boolean
   - linkedTo: string[] (IDs of connected entries)
   - source: string (where this came from)

Add type guards and helper functions.
```

## Step 2.2: Create Skill Data

### PROMPT 2.2.1: Define All 18 Skills
```
Create src/data/skills.ts with complete definitions for all 18 skills.

Reference this structure for each skill:

CLINICAL SKILLS (8):
1. TRIAGE - "The Alarm" - Urgency recognition
2. DIFFERENTIAL - "The List-Maker" - Diagnostic reasoning  
3. PATHOPHYSIOLOGY - "The Professor" - Disease mechanisms
4. HISTORY - "The Detective" - Patient interviewing
5. PHYSICAL_EXAM - "The Hands" - Clinical assessment
6. PROCEDURE - "The Technician" - Technical skills
7. PHARMACOLOGY - "The Chemist" - Medication knowledge
8. INTERPRETATION - "The Analyst" - Labs/imaging reading

SOCIAL SKILLS (6):
9. BEDSIDE - "The Healer" - Patient rapport
10. EMPATHY - "The Mirror" - Emotional connection
11. COMMUNICATION - "The Translator" - Information transfer
12. HIERARCHY - "The Navigator" - Medical politics
13. TEAMWORK - "The Teammate" - Collaboration
14. ADVOCACY - "The Champion" - Patient rights

PSYCHOLOGICAL SKILLS (4):
15. COMPOSURE - "The Professional" - Staying calm
16. INSTINCT - "The Gut" - Clinical intuition
17. DOUBT - "The Critic" - Self-questioning
18. DRIVE - "The Engine" - Determination
19. MEMORY - "The Student" - Recall
20. HUMANITY - "The Person" - Human connection

Wait - that's 20. Let me recalculate:
- Clinical: 8
- Social: 6  
- Psychological: 6 (COMPOSURE, INSTINCT, DOUBT, DRIVE, MEMORY, HUMANITY)
Total: 20 skills

For each skill include:
- 3 example "voice lines" showing how this skill speaks internally
- Starting modifier by background (EMT, RESEARCH, LATE_BLOOMER, LEGACY)

Export as a typed constant object and as an array.
```

---

# PHASE 3: GAME STATE MANAGEMENT

## Step 3.1: Create Zustand Store

### PROMPT 3.1.1: Main Game Store
```
Create src/store/gameStore.ts using Zustand with Immer middleware.

The store should manage:

1. Game Phase State:
   - currentPhase: GamePhase
   - setPhase(phase): void
   - previousPhase: GamePhase (for back navigation)

2. Player State:
   - player: PlayerCharacter | null
   - createPlayer(name, background, personality): void
   - updateSkill(skillId, delta): void
   - addLesson(lesson): void
   - updateEnergy(delta): void
   - updateStress(delta): void
   - addXP(amount): void

3. Shift State:
   - currentShift: number
   - shiftTimeRemaining: number (in minutes, 480 = 8 hour shift)
   - activeCases: PatientCase[]
   - completedCases: PatientCase[]
   - startShift(): void
   - endShift(): void
   - advanceTime(minutes): void

4. Board State:
   - boardEntries: BoardEntry[]
   - maxSlots: number
   - pinnedCount: number
   - addEntry(entry): void
   - removeEntry(id): void
   - pinEntry(id): void
   - unpinEntry(id): void
   - linkEntries(id1, id2): void

5. Relationship State:
   - relationships: Record<string, Relationship>
   - updateRelationship(change: RelationshipChange): void
   - getRelationship(npcId): Relationship

Include selectors for common derived state:
- isPinned(entryId): boolean
- getSkillModifier(skillId): number
- canAddBoardEntry(): boolean

Use Immer for immutable updates. Include devtools middleware for debugging.
```

### PROMPT 3.1.2: Dialogue Store
```
Create src/store/dialogueStore.ts for managing conversation state:

State:
- isActive: boolean
- currentNodeId: string | null
- history: DialogueHistoryEntry[] (what's been said)
- availableChoices: DialogueChoice[]
- currentSpeaker: string | null
- currentSpeakerMood: string
- typewriterText: string (text being typed out)
- isTyping: boolean
- internalVoices: InternalVoice[] (skill commentary queue)

Actions:
- startDialogue(startNodeId): void
- advanceDialogue(choiceId?): void
- endDialogue(): void
- addInternalVoice(skillId, text): void
- clearInternalVoices(): void
- setTypewriterText(text): void
- completeTypewriter(): void

Types needed:
- DialogueHistoryEntry: { speaker: string, text: string, timestamp: number }
- DialogueChoice: { id: string, text: string, skillCheck?: SkillCheck, requirements?: Requirement[] }
- InternalVoice: { skillId: string, skillName: string, text: string, priority: number }
- Requirement: { type: "SKILL" | "RELATIONSHIP" | "FLAG", target: string, value: number | boolean }

Make sure dialogue history persists appropriately.
```

## Step 3.2: Create Custom Hooks

### PROMPT 3.2.1: Game State Hook
```
Create src/hooks/useGameState.ts that provides a convenient interface to the game stores:

The hook should return:
- All commonly needed state (player, currentPhase, etc.)
- Computed values (effective skill modifiers including lesson bonuses)
- Action dispatchers with proper typing
- Loading and error states

Also create these specialized hooks in the same file or separate files:
- useSkillCheck(): handles performing skill checks with all modifiers
- useDialogue(): simplified dialogue navigation
- usePatientCase(): current patient case management
- useRelationships(): NPC relationship helpers

Example usage should look like:
const { player, performSkillCheck, advanceDialogue } = useGameState();
const result = performSkillCheck("HISTORY", 10);
```

---

# PHASE 4: NARRATIVE ENGINE

## Step 4.1: Dialogue Data Format

### PROMPT 4.1.1: Design Dialogue Format
```
Design a JSON/TypeScript format for branching dialogue in my medical RPG.

Requirements:
1. Support for multiple speakers (NPCs, player)
2. Conditional dialogue based on:
   - Skill levels
   - Relationship levels
   - Story flags
   - Previous choices
3. Skill check integration (some options require checks)
4. Internal voice commentary (skills commenting on the conversation)
5. Consequences (relationship changes, XP, lessons learned)
6. Branching and merging paths
7. Variable interpolation (e.g., {{player.name}}, {{patient.name}})

Create a TypeScript type definition and show an example dialogue tree for:
"Meeting Dr. Jimmy Reyes for the first time on your rotation"

The dialogue should:
- Have 3-4 player response options at key points
- Include at least one skill check option
- Have internal voice commentary from HIERARCHY and COMPOSURE
- Result in different starting relationship values based on choices
```

### PROMPT 4.1.2: Dialogue Parser
```
Create src/lib/narrativeParser.ts that can:

1. Load dialogue from JSON files
2. Parse and validate dialogue structure
3. Evaluate conditions to determine available choices
4. Handle variable interpolation (replace {{player.name}} with actual values)
5. Process consequences when choices are made
6. Queue internal voice commentary

Functions needed:
- loadDialogue(dialogueId: string): Promise<DialogueTree>
- evaluateConditions(conditions: Condition[], state: GameState): boolean
- getAvailableChoices(node: DialogueNode, state: GameState): DialogueChoice[]
- interpolateText(text: string, context: InterpolationContext): string
- processConsequences(consequences: Consequence[], dispatch: Function): void
- getInternalCommentary(node: DialogueNode, state: GameState): InternalVoice[]

Include error handling for missing dialogues, invalid references, etc.
```

## Step 4.2: Internal Voice System

### PROMPT 4.2.1: Skill Voice Manager
```
Create src/lib/internalVoices.ts that manages the "skills talking to you" system:

Core concept: Skills have personalities and interject during gameplay with commentary, advice, warnings, and reactions.

1. VoiceEvent enum:
   - SCENE_START, DIALOGUE_LINE, CHOICE_AVAILABLE, SKILL_CHECK_BEFORE, SKILL_CHECK_AFTER, PATIENT_OBSERVATION, DANGER_DETECTED, EMOTIONAL_MOMENT, IDLE

2. VoiceTrigger interface:
   - event: VoiceEvent
   - conditions: Condition[]
   - skillId: string
   - lines: string[] (pick randomly)
   - priority: number (higher = more likely to show)
   - cooldown: number (minimum time before this skill speaks again)

3. Functions:
   - getRelevantVoices(event: VoiceEvent, context: GameContext): InternalVoice[]
   - prioritizeVoices(voices: InternalVoice[], maxCount: number): InternalVoice[]
   - formatVoiceLine(skillId: string, text: string): FormattedVoice
   - shouldSkillSpeak(skillId: string, lastSpoke: number): boolean

4. Each skill should have:
   - Generic lines for common situations
   - Specific triggers for their domain
   - Reactions to other skills speaking (optional, for "skill debates")

Include at least 5 voice lines per skill for common events.
The system should feel organic - not every moment has commentary, but key moments do.
```

---

# PHASE 5: SKILL CHECK SYSTEM

## Step 5.1: Dice and Probability

### PROMPT 5.1.1: Dice Rolling System
```
Create src/utils/dice.ts with dice rolling utilities:

1. roll2d6(): returns { dice: [number, number], total: number }
   - True random using crypto.getRandomValues for fairness
   - Track if it's a critical (snake eyes = 2, boxcars = 12)

2. rollWithModifier(modifier: number): returns full roll result

3. calculateProbability(target: number, modifier: number): number
   - Returns probability of meeting or exceeding target with 2d6+modifier

4. DifficultyClass constants:
   - TRIVIAL = 6
   - EASY = 8
   - MODERATE = 10
   - HARD = 12
   - VERY_HARD = 14
   - EXTREME = 16
   - LEGENDARY = 18

5. interpretResult(roll: number, dc: number): 
   - Returns: "CRITICAL_FAILURE" | "FAILURE" | "SUCCESS" | "CRITICAL_SUCCESS"
   - Critical failure: natural 2 (snake eyes)
   - Critical success: natural 12 (boxcars)

Include unit tests or test cases for edge cases.
```

### PROMPT 5.1.2: Skill Check Resolution
```
Create src/utils/skillChecks.ts for full skill check resolution:

1. gatherModifiers(skillId: string, state: GameState): Modifier[]
   - Base skill modifier
   - Lesson bonuses
   - Situational modifiers (from context)
   - Equipment/item bonuses (if any)
   - Relationship bonuses (if relevant NPC)
   - Fatigue/stress penalties

2. performSkillCheck(params: SkillCheckParams): SkillCheckResult
   
   SkillCheckParams:
   - skillId: string
   - dc: number
   - situationalModifiers?: Modifier[]
   - assistedBy?: string (NPC who's helping)
   - isPassive?: boolean (no roll, just check if modifier beats DC-10)

   SkillCheckResult:
   - success: boolean
   - roll: { dice: [number, number], natural: number }
   - modifiers: Modifier[]
   - totalModifier: number
   - finalResult: number
   - margin: number (how much over/under DC)
   - criticalType: "NONE" | "SUCCESS" | "FAILURE"
   - narrativeResult: string (flavor text for this outcome)

3. getAssistedDC(baseDC: number, helperSkill: number): number
   - Reduces DC based on helper's skill level
   - Formula: baseDC - floor(helperSkill / 2)

4. generateFailureConsequence(skillId: string, context: string): Consequence
   - Creates interesting failure outcomes based on what was attempted

Include the full probability math as comments for reference.
```

---

# PHASE 6: UI FOUNDATION

## Step 6.1: Core UI Components

### PROMPT 6.1.1: Base UI Components
```
Create reusable UI components in src/components/ui/:

1. Button.tsx
   - Variants: primary, secondary, danger, ghost
   - Sizes: sm, md, lg
   - States: normal, hover, active, disabled, loading
   - Optional icon support
   - Medical/clinical aesthetic

2. Card.tsx
   - For patient cards, info panels, dialogue boxes
   - Variants: default, elevated, bordered
   - Header and footer slots
   - Collapsible option

3. Badge.tsx
   - For status indicators, skill levels, acuity
   - Color variants matching our medical palette
   - Animated pulse option for urgent states

4. ProgressBar.tsx
   - For health, energy, stress, time
   - Animated fill
   - Color changes at thresholds
   - Optional label

5. Modal.tsx
   - Centered overlay modal
   - Variants: dialog, fullscreen, slide-in
   - Close on backdrop click (optional)
   - Trap focus for accessibility

6. Tooltip.tsx
   - For explaining medical terms, skill descriptions
   - Hover triggered
   - Positioning: top, bottom, left, right

Use Tailwind CSS. Include proper TypeScript props interfaces.
Each component should have sensible defaults and be fully customizable.
```

### PROMPT 6.1.2: Typography Components
```
Create typography components in src/components/ui/Typography.tsx:

1. Heading (h1-h6 with medical styling)

2. Text (body text with variants)
   - default, muted, danger, success
   - sizes: sm, base, lg

3. SkillVoice (for internal dialogue)
   - Styled distinctly from regular text
   - Italic with skill-specific color accent
   - Includes skill name attribution
   - Optional typing animation

4. MedicalTerm (for terminology)
   - Styled to stand out
   - Hoverable for definition tooltip
   - Links to glossary

5. Dialogue (for conversation text)
   - Speaker name with distinct styling
   - Quote styling for spoken text
   - Support for typewriter effect

6. CodeBlue (for the game title/logo text)
   - Stylized display text
   - Optional pulse animation
   - Uses custom font if available

Make them composable and consistent with our dark medical theme.
```

## Step 6.2: Game-Specific Components

### PROMPT 6.2.1: Skill Check Display
```
Create src/components/game/SkillCheckDisplay.tsx:

A component that shows the skill check process visually:

Props:
- skillCheck: SkillCheckParams
- result?: SkillCheckResult (null while rolling)
- onRoll: () => void
- showModifierBreakdown: boolean

Visual elements:
1. Skill name and icon/color
2. Difficulty display (DC X - "Hard")
3. Modifier breakdown:
   - Base skill: +2
   - Lesson bonus: +1
   - Fatigue: -1
   - Total: +2

4. Dice animation area:
   - Show two d6 dice
   - Rolling animation
   - Final values highlighted

5. Result display:
   - Roll + Modifier = Total vs DC
   - SUCCESS/FAILURE with appropriate styling
   - Critical success/failure special effects
   - Margin display (+2 over / -3 under)

6. Narrative result text

Include animations using Framer Motion:
- Dice tumbling while rolling
- Result reveal with impact
- Success = green glow pulse
- Failure = red shake
- Critical = special effect (confetti for success, screen shake for failure)
```

### PROMPT 6.2.2: Vital Signs Display
```
Create src/components/game/VitalsMonitor.tsx:

A component that displays patient vital signs like a hospital monitor:

Props:
- vitals: VitalSigns
- showTrends: boolean (show arrows for changes)
- isAlarming: boolean (abnormal vitals trigger alarm state)
- compactMode: boolean

Display:
1. Heart Rate
   - Number display with BPM
   - Simple waveform visualization (optional)
   - Green/yellow/red based on normal ranges
   - Pulse animation synced to rate

2. Blood Pressure
   - Systolic/Diastolic display
   - Color coding for ranges

3. Respiratory Rate
   - Breaths per minute
   - Color coding

4. O2 Saturation
   - Percentage with % symbol
   - Color gradient (green > yellow > red)

5. Temperature
   - Fahrenheit display
   - Fever indicator

Include:
- Age-appropriate normal ranges (adult vs pediatric)
- Alarm animation when critical
- Trend arrows (↑↓→) if showTrends is true
- Audio alarm integration hook (for later)

Style it to look like an actual bedside monitor - dark background, bright readings.
```

### PROMPT 6.2.3: Dialogue Box Component
```
Create src/components/game/DialogueBox.tsx:

The main conversation interface component:

Props:
- speaker: { name: string, mood: string, portrait?: string }
- text: string
- isTyping: boolean
- typingSpeed: number
- choices?: DialogueChoice[]
- internalVoices?: InternalVoice[]
- onChoice: (choiceId: string) => void
- onAdvance: () => void

Layout:
1. Speaker area (left or top):
   - Character portrait (mood-appropriate)
   - Name plate with role indicator
   - Mood indicator (subtle)

2. Text area (main):
   - Typewriter text display
   - Click/tap to complete typing
   - Auto-scroll for long text

3. Internal voices area (overlaid or sidebar):
   - Skill voices appear here
   - Styled distinctly from main dialogue
   - Stack multiple voices
   - Fade in/out animation

4. Choice area (bottom):
   - Only appears when choices available
   - Shows skill check requirements on choices
   - Locked choices shown but grayed out
   - Hover shows why locked

5. Advance indicator:
   - Subtle "click to continue" when waiting
   - Hidden during typing and when choices shown

Include keyboard navigation (1-4 for choices, space/enter to advance).
```

---

# PHASE 7: DIALOGUE SYSTEM

## Step 7.1: Dialogue Components

### PROMPT 7.1.1: Full Dialogue System
```
Create the complete dialogue system in src/components/game/DialogueSystem.tsx:

This is the main controller component that orchestrates dialogue:

1. Uses dialogueStore for state
2. Loads dialogue trees from data files
3. Manages the dialogue flow

Features:
- Typewriter effect with configurable speed
- Choice selection with skill check integration
- Internal voice interruptions at appropriate moments
- Consequence processing after choices
- Transition animations between nodes
- History tracking (what's been said)

Sub-components (create as needed):
- DialogueHistory (scrollable log of conversation)
- ChoiceButton (individual choice with requirements display)
- InternalVoicePanel (where skill voices appear)
- SpeakerPortrait (character image with mood)

The flow should feel like:
1. Speaker says line (typewriter)
2. Relevant skill voices comment (if any)
3. Player reads and processes
4. If choices: display choices
5. Player selects choice
6. If skill check required: perform check
7. Process consequences
8. Move to next node
9. Repeat until dialogue ends

Handle edge cases:
- Dialogue ending
- Missing nodes (error gracefully)
- Empty choice arrays
- Multiple internal voices at once
```

## Step 7.2: Create Sample Dialogue

### PROMPT 7.2.1: First Dialogue Tree
```
Create the dialogue data file src/data/dialogue/intro_jimmy.ts:

This is the player's first meeting with Dr. Jimmy Reyes.

Context: First day of ER rotation, 6:50 AM, Jimmy is giving you a quick tour.

Structure the dialogue with:
1. Jimmy's initial greeting (slightly tired, sizing you up)
2. Player can respond 3-4 ways (eager, nervous, professional, humor)
3. Jimmy explains the three rules
4. Internal voices from HIERARCHY and COMPOSURE
5. Jimmy asks if you're ready for your first patient
6. Final response options leading to different relationship starting points

Include:
- At least one skill check option (HIERARCHY DC 8 to say something insightful)
- Conditional text based on player background (EMT background gets different response)
- Relationship consequences for each path
- A LESSON unlock if they pick the learning-focused path

Format it using the dialogue structure we defined earlier.
Total length: 15-25 dialogue nodes.
```

---

# PHASE 8: THE BOARD SYSTEM

## Step 8.1: Board Components

### PROMPT 8.1.1: Diagnostic Board UI
```
Create src/components/game/DiagnosticBoard.tsx:

The Board is the player's mental whiteboard for tracking their diagnostic reasoning.

Visual design: 
- Looks like a corkboard or whiteboard
- Entries are like pinned notes/cards
- Connections shown as strings/lines between related entries

Features:
1. Entry display:
   - Different visual styles per type (SYMPTOM, DIFFERENTIAL, CONNECTION, LESSON, ECHO)
   - Icon for each type
   - Pinned vs unpinned state
   - Hover for full details

2. Slot management:
   - Show X/Y slots used
   - Pinned entries can't be auto-removed
   - Warning when approaching limit

3. Connection visualization:
   - Lines connecting linked entries
   - Click entry to highlight its connections
   - Different line styles for different connection types

4. Interactions:
   - Click to pin/unpin
   - Drag to rearrange (optional)
   - Right-click for context menu (details, remove, link)
   - Double-click for full detail modal

5. Filters:
   - Filter by type
   - Filter by pinned status
   - Search entries

Props:
- entries: BoardEntry[]
- maxSlots: number
- onPin: (id) => void
- onUnpin: (id) => void
- onRemove: (id) => void
- onLink: (id1, id2) => void

Make it feel like a detective's evidence board meets a medical student's study notes.
```

### PROMPT 8.1.2: Board Entry Detail Modal
```
Create src/components/game/BoardEntryDetail.tsx:

Modal that shows full details of a board entry:

For SYMPTOM entries:
- Symptom name and description
- When/how it was discovered
- Significance (what it might indicate)
- Red flag indicator if applicable

For DIFFERENTIAL entries:
- Diagnosis name
- Supporting evidence (linked symptoms)
- Contradicting evidence
- Probability assessment (based on links)
- "Learn more" link to glossary

For CONNECTION entries:
- The two things being connected
- Reasoning for the connection
- Strength of connection

For LESSON entries:
- What was learned
- When/how it was learned
- Mechanical effects (bonuses granted)
- Never auto-removed (always pinned)

For ECHO entries:
- Patient who affected you
- What happened
- Emotional impact
- May provide bonuses and penalties

Include:
- Close button
- Pin/Unpin button
- Link button (select another entry to link to)
- Remove button (with confirmation)
```

---

# PHASE 9: PATIENT ENCOUNTER SYSTEM

## Step 9.1: Patient Case Components

### PROMPT 9.1.1: Patient Chart Component
```
Create src/components/game/PatientChart.tsx:

The electronic medical record view for a patient:

Sections (tabs or scrollable):
1. Summary
   - Name, age, sex
   - Chief complaint
   - Current vitals
   - Acuity level (ESI 1-5)
   - Allergies (highlighted if present)

2. History of Present Illness
   - Revealed through HISTORY skill checks
   - Starts sparse, fills in as you ask questions
   - Key findings highlighted

3. Past Medical History
   - Known conditions
   - Medications
   - Surgeries

4. Physical Exam
   - Revealed through PHYSICAL_EXAM checks
   - Organized by system (HEENT, Cardiac, Pulm, Abd, etc.)
   - Abnormal findings highlighted

5. Labs/Imaging (if ordered)
   - Results display
   - Abnormal values flagged
   - Interpretation notes (if INTERPRETATION check passed)

6. Assessment & Plan (player's working diagnosis)
   - Links to Board
   - Differential list
   - Current plan

Props:
- patient: Patient
- revealedSymptoms: Symptom[]
- labResults?: LabResults
- imagingResults?: ImagingResults

Real-time updates as information is discovered.
```

### PROMPT 9.1.2: Patient Encounter Flow
```
Create src/components/game/PatientEncounter.tsx:

The main component for working up a patient:

Phases:
1. INTRODUCTION
   - See patient in room
   - Initial impression
   - Read vitals on board
   - TRIAGE check to assess acuity

2. HISTORY
   - Dialogue with patient
   - Choose questions to ask (costs time)
   - HISTORY skill checks reveal information
   - Internal voices comment on responses

3. PHYSICAL_EXAM
   - Select exam maneuvers to perform
   - PHYSICAL_EXAM checks reveal findings
   - Time cost per maneuver
   - Some findings only visible with specific checks

4. WORKUP
   - Order labs and imaging
   - Wait for results (time passes)
   - INTERPRETATION checks to understand results

5. DIAGNOSIS
   - Access the Board
   - Make connections
   - Formulate differential
   - Can present to attending for feedback

6. TREATMENT
   - Order treatments based on diagnosis
   - PHARMACOLOGY checks for correct dosing
   - Monitor response

7. DISPOSITION
   - Admit vs Discharge vs Transfer
   - Communicate with patient/family
   - Documentation (simplified)

State machine for phase transitions. 
Each phase can be interrupted by critical events (patient crashing, etc.)
```

### PROMPT 9.1.3: Patient Interaction Dialogue
```
Create src/data/patients/chest_pain_woman.ts:

Complete data file for the "Mrs. Elena Martinez" case from the sample scene:

Include:
1. Patient base data (demographics, vitals, history)

2. Symptom list with reveal conditions:
   - Chest pressure (revealed on asking about pain)
   - Jaw pain (revealed on asking about radiation - HISTORY DC 8)
   - Diaphoresis (revealed on observation - automatic)
   - Duration (revealed on asking)
   - Diabetic history (revealed on PMH question)
   - Family history (revealed on family history question)

3. History dialogue tree:
   - Opening (patient is annoyed about wait)
   - Question branches for each HPI element
   - Emotional beats (her fear showing through)
   - Daughter interjections

4. Physical exam findings:
   - Diaphoretic (automatic)
   - Mild tachycardia (automatic)
   - Chest wall non-tender (if checked - rules out MSK)
   - Lungs clear (if checked - helps rule out PE)

5. Labs:
   - Initial troponin: 0.04 (slightly elevated but easy to miss)
   - BMP: normal
   - CBC: normal

6. EKG:
   - Description of STEMI pattern
   - INTERPRETATION DC 12 to recognize

7. Outcomes based on decisions:
   - Correct recognition + rapid escalation = save, +50 XP
   - Delayed recognition = save but longer hospital stay, +25 XP
   - Missed diagnosis = patient codes, resuscitated, -rep, trauma

8. Teaching points and lesson unlocks

This should be a complete, playable case.
```

---

# PHASE 10: NPC & RELATIONSHIP SYSTEM

## Step 10.1: NPC Data

### PROMPT 10.1.1: Create NPC Data Files
```
Create NPC data files in src/data/characters/:

For each major NPC, create a file with:

1. jimmy_reyes.ts - PGY-3 Resident
   - Full bio and personality
   - Dialogue voice patterns (how he talks)
   - Relationship thresholds (what unlocks at each level)
   - Story arc beats
   - Unique interactions and scenes

2. rachel_okonkwo.ts - Attending Physician
   - The mentor figure
   - High standards but supportive
   - Socratic teaching style

3. maria_santos.ts - Charge Nurse
   - 20 years experience
   - Runs the department
   - Relationship crucial for success

4. priya_sharma.ts - PGY-2 Resident
   - Competitive, ambitious
   - Can be ally or rival
   - Her own struggles (hidden)

Create interface for NPC data:
- Static info (bio, role, appearance)
- Dynamic relationship data
- Dialogue patterns (vocabulary, sentence structure, verbal tics)
- Available scenes by relationship level
- Teaching content they can provide
```

### PROMPT 10.1.2: Relationship UI
```
Create src/components/game/RelationshipPanel.tsx:

Shows relationship status with NPCs:

1. NPC Card:
   - Portrait
   - Name and role
   - Professional meter (-3 to +3) with labels
   - Personal meter (0 to 4) with labels
   - Key unlocks at current level

2. Relationship Detail Modal:
   - Full bio
   - Relationship history (key moments)
   - What they think of you (flavor text)
   - Available scenes/conversations
   - Tips for improving relationship

3. Notification System:
   - "Relationship changed" notifications
   - [Jimmy Reyes - Professional ↑] "He respects your clinical judgment"
   - Slide-in animation

Meters should have descriptive labels:
Professional: Liability → Green → Competent → Reliable → Impressive
Personal: Stranger → Acquaintance → Colleague → Friend → Confidant

Include subtle indicators of relationship health/trajectory.
```

---

# PHASE 11: SHIFT SYSTEM

## Step 11.1: Shift Structure

### PROMPT 11.1.1: Shift Manager Component
```
Create src/components/game/ShiftManager.tsx:

Manages the overall shift structure:

1. Shift Start:
   - Date and time display
   - "Day X of rotation"
   - Staff on shift today
   - Handoff from previous team
   - Mood/energy check

2. Main Shift Loop:
   - Time display (continuously updating)
   - Current cases sidebar
   - New arrival notifications
   - Crisis event interruptions

3. Patient Queue:
   - Waiting patients
   - In-progress patients
   - Patients needing attention
   - Click to switch between cases

4. Time Management:
   - Actions take time
   - Can't do everything
   - Prioritization matters
   - "Time skip" option for waiting

5. Crisis Events:
   - Random interruptions
   - Traumas, codes, critical patients
   - Drop everything and respond
   - Timer-based decisions

6. Shift End:
   - Sign-out to night team
   - Summary of cases
   - XP tally
   - Relationship changes
   - Debrief/reflection scene

State management for:
- Time remaining
- Active cases
- Pending events
- Staff availability
```

### PROMPT 11.1.2: Shift Event System
```
Create src/lib/shiftEvents.ts:

System for random and scripted shift events:

1. Event Types:
   - NEW_PATIENT: Patient arrives
   - CASE_UPDATE: Existing patient changes
   - CRISIS: Code blue, trauma, etc.
   - SOCIAL: NPC interaction opportunity
   - TEACHING: Learning moment
   - PERSONAL: Energy/stress event

2. Event Structure:
   - id: string
   - type: EventType
   - priority: number (1-10)
   - triggerConditions: Condition[]
   - content: varies by type
   - duration: number (minutes)
   - interruptable: boolean

3. Event Queue System:
   - Events scheduled throughout shift
   - Some random, some scripted
   - Priority-based interruption
   - Can't have more than X pending

4. Scripted Story Events:
   - First code (guaranteed in week 2)
   - First death (story beat)
   - Mentor check-ins
   - Relationship milestone scenes

5. Random Event Tables:
   - By shift number (early shifts are easier)
   - By time of day (3 AM = weird cases)
   - By department state (busy = more stress)

Functions:
- generateShiftEvents(shiftNumber, difficulty): Event[]
- addEvent(event): void
- processNextEvent(): Event
- checkForInterruption(): Event | null
```

---

# PHASE 12: PROGRESSION & SAVE SYSTEM

## Step 12.1: Save System

### PROMPT 12.1.1: Save/Load Implementation
```
Create src/lib/saveSystem.ts:

Save game implementation using localStorage with JSON:

1. SaveData interface:
   - version: string (for migration)
   - timestamp: Date
   - player: PlayerCharacter
   - relationships: Record<string, Relationship>
   - completedShifts: number
   - storyFlags: Record<string, boolean>
   - lessons: Lesson[]
   - statistics: GameStatistics

2. Functions:
   - saveGame(slot: number): boolean
   - loadGame(slot: number): SaveData | null
   - getSaveSlots(): SaveSlotInfo[]
   - deleteSave(slot: number): boolean
   - exportSave(): string (for backup)
   - importSave(data: string): boolean

3. Auto-save:
   - Save at shift end
   - Save before major decisions
   - Save at quit

4. Save Slot Display:
   - 3 save slots
   - Shows: date, shift number, playtime
   - Thumbnail or summary

5. Data Migration:
   - Version checking
   - Upgrade old saves to new format
   - Graceful failure if incompatible

Handle edge cases:
- localStorage full
- Corrupted data
- Missing fields in old saves
```

### PROMPT 12.1.2: Statistics Tracking
```
Create src/lib/statistics.ts:

Track interesting gameplay statistics:

1. Case Statistics:
   - Total patients seen
   - Correct diagnoses
   - Missed diagnoses
   - Patients saved
   - Patients lost
   - By case type (cardiac, trauma, etc.)

2. Skill Statistics:
   - Skill checks attempted per skill
   - Success rate per skill
   - Critical successes/failures
   - Most improved skill

3. Relationship Statistics:
   - Time spent with each NPC
   - Relationship peaks
   - Key moments

4. Time Statistics:
   - Total playtime
   - Shifts completed
   - Time per shift (average)

5. Learning Statistics:
   - Lessons learned
   - Medical terms encountered
   - Glossary completion percentage

6. Achievement tracking (optional):
   - First successful diagnosis
   - First code survived
   - Perfect shift
   - etc.

Display these in a Statistics menu option.
```

---

# PHASE 13: CONTENT CREATION PIPELINE

## Step 13.1: Content Tools

### PROMPT 13.1.1: Patient Case Generator
```
Create src/tools/caseGenerator.ts (development tool):

A helper for generating patient case data:

1. Case Template Generator:
   - Input: diagnosis category, difficulty, teaching focus
   - Output: skeleton PatientCase with reasonable defaults

2. Symptom Suggester:
   - Input: diagnosis
   - Output: list of typical symptoms with reveal conditions

3. Dialogue Template:
   - Input: patient personality type, chief complaint
   - Output: conversation tree skeleton

4. Outcome Generator:
   - Input: correct diagnosis, possible mistakes
   - Output: outcome branches with consequences

5. Validation:
   - Check all required fields present
   - Check dialogue tree has no dead ends
   - Check skill checks have reasonable DCs
   - Check teaching points exist

This is a DEV tool, not player-facing.
Can be run via npm script or simple CLI.
```

### PROMPT 13.1.2: Create Content Templates
```
Create templates in src/data/templates/:

1. patient_template.ts:
   - Empty patient case with all required fields
   - Comments explaining each field
   - Example values as reference

2. dialogue_template.ts:
   - Empty dialogue tree structure
   - Common node patterns
   - Skill check integration example

3. npc_template.ts:
   - Empty NPC data file
   - All relationship beats
   - Dialogue pattern guide

4. lesson_template.ts:
   - Lesson structure
   - Effect types
   - Trigger conditions

5. shift_event_template.ts:
   - Event structure
   - Priority guidelines
   - Consequence patterns

These are for human content creators (you!) to copy and fill in.
Include detailed comments explaining how to use each field.
```

---

# PHASE 14: CPC CODING MODE

## Step 14.1: Coding Challenge System

### PROMPT 14.1.1: CPC Challenge Component
```
Create src/components/game/CPCChallenge.tsx:

Optional coding challenge after patient cases:

Display:
1. Case Summary:
   - Diagnosis
   - Procedures performed
   - Service/setting

2. Challenge Question:
   - "What is the primary ICD-10 code?"
   - "What CPT code applies to this procedure?"
   - Multiple choice (A, B, C, D)

3. Hint System:
   - Skill check (MEMORY + INTERPRETATION) for hint
   - Hint narrows options or explains logic

4. Result:
   - Correct: XP bonus, explanation of why
   - Incorrect: Correct answer shown, explanation

5. Learning Mode:
   - No penalty for wrong
   - Full explanation always shown
   - Study card added to glossary

Props:
- caseData: CompletedCase
- mode: "LEARNING" | "INTEGRATED" | "EXAM_PREP"
- onComplete: (correct: boolean) => void
```

### PROMPT 14.1.2: CPC Data Structure
```
Create src/data/cpc/:

1. icd10_common.ts:
   - Common ER diagnosis codes
   - Code, description, category
   - Associated symptoms/presentation
   - Example: I21.11 - STEMI involving RCA

2. cpt_common.ts:
   - Common ER procedure codes
   - Code, description, typical use
   - Example: 93010 - EKG interpretation

3. coding_challenges.ts:
   - Challenge structure:
     - caseType: string
     - question: string
     - correctAnswer: string
     - wrongAnswers: string[]
     - explanation: string
     - difficulty: 1-5

4. Map cases to challenges:
   - Each patient case can have associated coding challenges
   - Multiple challenges per case (diagnosis + procedure)

Start with 20-30 high-yield codes/challenges.
```

---

# PHASE 15: AUDIO & POLISH

## Step 15.1: Audio System

### PROMPT 15.1.1: Audio Manager
```
Create src/lib/audioManager.ts using Howler.js:

Audio system for atmosphere and feedback:

1. Ambient Tracks:
   - ER_GENERAL: background hospital bustle
   - ER_BUSY: more intense version
   - ER_NIGHT: quieter, eerier
   - ER_CRISIS: urgent atmosphere

2. Sound Effects:
   - UI: button clicks, notifications
   - Medical: monitor beeps, alarms, announcements
   - Dice: rolling sounds for skill checks
   - Dramatic: success sting, failure sting, critical

3. Music (optional):
   - Menu theme
   - Emotional scene underscoring
   - Victory/defeat stingers

Functions:
- playAmbient(track: string): void
- crossfadeAmbient(track: string): void
- playSFX(sound: string): void
- playMusic(track: string): void
- setVolume(category: string, level: number): void
- mute(category: string): void

Include:
- Volume controls per category
- Mute toggles
- Settings persistence
```

### PROMPT 15.1.2: Visual Polish Pass
```
Create improvements for visual polish:

1. Animations (src/lib/animations.ts):
   - Page transitions
   - Component enter/exit
   - Skill check drama
   - Notification slides
   
2. Particles (optional, src/components/ui/Particles.tsx):
   - Critical success celebration
   - Crisis urgency effect
   - Subtle ambient particles

3. Screen Effects:
   - Vignette during tense moments
   - Color grading shifts (warmer for emotional, colder for clinical)
   - Subtle CRT scanlines (optional retro aesthetic)

4. Loading States:
   - Skeleton screens
   - Progress indicators
   - Transition animations

5. Micro-interactions:
   - Button hover effects
   - Card lift on hover
   - Input focus states
   - Success/error feedback

Use Framer Motion for consistency.
Keep effects subtle - this is a serious medical drama, not a flashy game.
```

---

# PHASE 16: TESTING & BALANCING

## Step 16.1: Testing Infrastructure

### PROMPT 16.1.1: Test Utilities
```
Create testing utilities in src/__tests__/:

1. gameTestUtils.ts:
   - createMockPlayer(overrides): PlayerCharacter
   - createMockPatient(overrides): Patient
   - createMockGameState(overrides): GameState
   - simulateSkillCheck(skill, dc, modifier): SkillCheckResult

2. Skill check probability tests:
   - Verify 2d6 distribution
   - Test modifier application
   - Test critical detection

3. Dialogue flow tests:
   - Test condition evaluation
   - Test all paths reachable
   - Test no dead ends

4. State persistence tests:
   - Save/load roundtrip
   - State consistency

5. Integration tests:
   - Full patient encounter flow
   - Shift start to end
   - Relationship changes persist

Use Jest or Vitest. Focus on game logic, not UI.
```

### PROMPT 16.1.2: Balance Testing
```
Create src/tools/balanceTester.ts:

Tool for testing game balance:

1. Skill Check Simulation:
   - Run 1000 checks at each DC
   - With various modifier levels
   - Report pass rates
   - Flag imbalanced checks

2. Progression Simulation:
   - Simulate X shifts of play
   - Track skill growth
   - Track relationship growth
   - Flag if too fast/slow

3. Case Difficulty Analysis:
   - Analyze each case
   - Required checks and DCs
   - Failure consequences
   - Suggested difficulty adjustments

4. Content Coverage:
   - List all skills
   - Count checks using each skill
   - Flag underused skills

Output readable reports for adjustment.
```

---

# APPENDIX: TROUBLESHOOTING PROMPTS

## Common Issues & Fix Prompts

### PROMPT T1: Type Errors
```
I'm getting TypeScript errors in my game project. Here's the error:
[PASTE ERROR]

Here's the relevant code:
[PASTE CODE]

Please:
1. Explain what's wrong
2. Provide the fix
3. Explain why this fixes it
```

### PROMPT T2: State Not Updating
```
My Zustand store state isn't updating correctly.

Store code:
[PASTE STORE]

Component using it:
[PASTE COMPONENT]

Expected behavior: [DESCRIBE]
Actual behavior: [DESCRIBE]

Help me debug this.
```

### PROMPT T3: Dialogue Not Progressing
```
My dialogue system is stuck and not advancing to the next node.

Current dialogue data:
[PASTE DIALOGUE]

Current state:
[PASTE STATE]

The player selected choice: [CHOICE ID]

Walk me through what should happen and help me find the bug.
```

### PROMPT T4: Save/Load Broken
```
Save/load is failing in my game.

Error message: [ERROR]

SaveData structure:
[PASTE INTERFACE]

Current save function:
[PASTE CODE]

Help me fix this and add better error handling.
```

### PROMPT T5: Performance Issues
```
My game is running slowly, especially during [DESCRIBE SITUATION].

Relevant component:
[PASTE CODE]

What I've tried:
[LIST]

Help me profile and optimize this.
```

### PROMPT T6: Adding New Content
```
I need to add a new [PATIENT CASE / NPC / DIALOGUE / FEATURE].

Here's what I want:
[DESCRIBE]

Here's my current data format:
[PASTE TEMPLATE]

Generate the new content following my existing patterns.
```

### PROMPT T7: Refactoring
```
This code works but it's getting hard to maintain:

[PASTE CODE]

Please refactor this to be:
- More modular
- Easier to test
- Following React/TypeScript best practices
- Consistent with the rest of my codebase

Explain your changes.
```

---

# FINAL NOTES

## Tips for Working with AI IDEs

1. **Always provide context**: Paste relevant types, existing code, and goals
2. **Be specific**: "Fix this bug" < "The dialogue doesn't advance when I click choice B"
3. **Iterate**: Don't try to build everything in one prompt
4. **Verify**: Always test generated code before moving on
5. **Version control**: Commit working states frequently
6. **Document as you go**: Update PROJECT_CONTEXT.md with new patterns

## Recommended Build Order

1. Types & Data Models (Phase 2) - Foundation
2. State Management (Phase 3) - Core infrastructure
3. Dice/Skill Checks (Phase 5) - Core mechanic
4. Basic UI (Phase 6) - See something working
5. Dialogue System (Phase 7) - Main interaction
6. One Complete Patient (Phase 9) - Vertical slice
7. Everything else - Expand from working core

## When to Ask for Human Help

- Complex medical accuracy questions
- Game design decisions (is this fun?)
- Balancing (is this too hard/easy?)
- Artistic direction (does this feel right?)
- Story and character writing (is this compelling?)

The AI is great at code. You're great at vision. Combine both.

---

*Good luck building CODE BLUE!*
*Remember: the goal is to learn while having fun - both for you building it, and for players playing it.*
