# PROJECT CONTEXT: CODE BLUE

**Paste this at the start of AI coding sessions to maintain continuity.**

---

## Project Overview

**Name**: CODE BLUE  
**Genre**: Medical Drama RPG / Narrative Game  
**Tagline**: "Scrubs meets Disco Elysium meets Hades"

**Core Concept**: Player is a third-year medical student on their first Emergency Medicine rotation. Learn medicine through failure, consequence, and repetition while navigating relationships with staff and making life-or-death decisions.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| State | Zustand + Immer |
| Animation | Framer Motion |
| Audio | Howler.js (later) |
| Storage | localStorage + JSON |

---

## Core Mechanics

### Skill System (20 skills)
- **CLINICAL** (8): TRIAGE, DIFFERENTIAL, PATHOPHYSIOLOGY, HISTORY, PHYSICAL_EXAM, PROCEDURE, PHARMACOLOGY, INTERPRETATION
- **SOCIAL** (6): BEDSIDE, EMPATHY, COMMUNICATION, HIERARCHY, TEAMWORK, ADVOCACY
- **PSYCHOLOGICAL** (6): COMPOSURE, INSTINCT, DOUBT, DRIVE, MEMORY, HUMANITY

### Skill Checks
```
Roll: 2d6 + Modifier vs DC
DC Scale: 6 (Trivial) → 8 (Easy) → 10 (Moderate) → 12 (Hard) → 14 (Very Hard) → 16 (Extreme)
Critical: Natural 2 = Critical Failure, Natural 12 = Critical Success
```

### Internal Voices
Skills "speak" as characters (like Disco Elysium). Each skill has a personality and interjects during gameplay.

### The Board
Mental whiteboard for diagnostic tracking. Entry types: SYMPTOM, DIFFERENTIAL, CONNECTION, LESSON, ECHO. Limited slots (start 4, max 8).

### Progression
- Shift-based gameplay (8-hour shifts)
- Persistent lessons carry across shifts
- Relationships persist and evolve
- XP from diagnoses, procedures, failures, relationship moments

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main entry
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable: Button, Card, Modal, etc.
│   ├── game/              # Game-specific: DialogueBox, VitalsMonitor, etc.
│   └── debug/             # Dev tools
├── store/
│   ├── gameStore.ts       # Main game state (Zustand)
│   ├── dialogueStore.ts   # Conversation state
│   └── index.ts           # Export all stores
├── types/
│   ├── game.ts            # Core types: Skill, SkillCheck, Lesson, GamePhase
│   ├── character.ts       # Player, NPC, Relationship types
│   ├── medical.ts         # Patient, VitalSigns, Symptom types
│   └── index.ts           # Export all types
├── data/
│   ├── skills.ts          # All 20 skill definitions
│   ├── characters/        # NPC data files
│   ├── patients/          # Patient case data
│   └── dialogue/          # Dialogue trees
├── utils/
│   ├── dice.ts            # Dice rolling
│   ├── skillChecks.ts     # Skill check resolution
│   └── helpers.ts         # General utilities
├── hooks/
│   └── useGameState.ts    # Custom hooks
└── lib/
    ├── narrativeParser.ts # Dialogue parsing
    ├── internalVoices.ts  # Skill voice system
    ├── shiftEvents.ts     # Event scheduling
    ├── saveSystem.ts      # Save/load
    └── audioManager.ts    # Audio (later)
```

---

## Key Interfaces (Quick Reference)

```typescript
// Skill Check
interface SkillCheck {
  skillId: string;
  dc: number;
  modifiers: { source: string; value: number }[];
  result?: { roll: number; total: number; success: boolean };
}

// Patient
interface Patient {
  id: string;
  name: string;
  age: number;
  chiefComplaint: string;
  vitals: VitalSigns;
  hiddenCondition: string;
  acuity: 1 | 2 | 3 | 4 | 5;
}

// Dialogue Choice
interface DialogueChoice {
  id: string;
  text: string;
  skillCheck?: SkillCheck;
  requirements?: Requirement[];
  consequences?: Consequence[];
}

// Internal Voice
interface InternalVoice {
  skillId: string;
  skillName: string;
  text: string;
  priority: number;
}
```

---

## Design Principles

1. **Failure is progress** - Every failure teaches something
2. **Skills have personality** - Internal voices are characters
3. **Medicine is learned, not known** - Player starts ignorant, builds competence
4. **Relationships matter** - NPCs remember everything
5. **Time pressure is real** - Can't do everything, must prioritize
6. **Humor and heart** - Dark comedy meets genuine emotion

---

## Current Phase

**Phase**: [UPDATE THIS]  
**Last Completed**: [UPDATE THIS]  
**Current Task**: [UPDATE THIS]  
**Blockers**: [UPDATE THIS]

---

## Notes

[Add session notes here as you work]
