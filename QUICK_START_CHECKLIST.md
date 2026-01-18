# CODE BLUE: Quick-Start Build Checklist

## Before You Begin

- [ ] Install Node.js 18+
- [ ] Install VS Code with extensions: TypeScript, Tailwind, ESLint
- [ ] Choose your AI IDE: Cursor / Windsurf / Claude Code
- [ ] Read through GAME_DESIGN_DOCUMENT.md for vision
- [ ] Read through SAMPLE_SCENE.md for feel

---

## Phase 1: Project Setup (Day 1)

```bash
# Terminal commands
npx create-next-app@latest code-blue --typescript --tailwind --eslint --app --src-dir
cd code-blue
npm install zustand immer uuid lodash framer-motion howler
npm install -D @types/lodash @types/uuid
```

- [ ] Project created
- [ ] Dependencies installed
- [ ] Folder structure created (see AI_BUILD_GUIDE.md Phase 1.2.1)
- [ ] Tailwind configured with medical theme
- [ ] PROJECT_CONTEXT.md in project root

---

## Phase 2: Core Types (Day 1-2)

- [ ] `src/types/game.ts` — Skill, SkillCheck, Lesson, GamePhase
- [ ] `src/types/character.ts` — PlayerCharacter, NPC, Relationship
- [ ] `src/types/medical.ts` — Patient, VitalSigns, Symptom, BoardEntry
- [ ] `src/data/skills.ts` — All 20 skills with voice lines

**Test**: Types compile without errors

---

## Phase 3: State Management (Day 2-3)

- [ ] `src/store/gameStore.ts` — Player, shift, board state
- [ ] `src/store/dialogueStore.ts` — Conversation state
- [ ] `src/hooks/useGameState.ts` — Convenient access hook

**Test**: Can update and read state in a test component

---

## Phase 4: Core Mechanics (Day 3-4)

- [ ] `src/utils/dice.ts` — 2d6 rolling with crypto random
- [ ] `src/utils/skillChecks.ts` — Full skill check resolution
- [ ] `src/lib/internalVoices.ts` — Skill voice system

**Test**: Skill checks produce correct probability distribution

---

## Phase 5: Basic UI (Day 4-5)

- [ ] Button, Card, Badge, Modal, ProgressBar components
- [ ] Typography components (SkillVoice, MedicalTerm, Dialogue)
- [ ] SkillCheckDisplay component with dice animation
- [ ] VitalsMonitor component

**Test**: Components render correctly, look good

---

## Phase 6: Dialogue System (Day 5-7)

- [ ] Dialogue data format defined
- [ ] `src/lib/narrativeParser.ts` — Parse and evaluate dialogue
- [ ] DialogueBox component with typewriter effect
- [ ] Internal voice integration
- [ ] First dialogue tree (Jimmy intro)

**Test**: Can play through intro dialogue with choices

---

## Phase 7: First Playable Patient (Day 7-10)

- [ ] Patient chart component
- [ ] Patient encounter flow component
- [ ] Mrs. Martinez case data complete
- [ ] History dialogue tree
- [ ] Skill checks integrated
- [ ] Outcomes based on decisions

**Test**: Can complete full patient encounter start to finish

---

## Phase 8: Board System (Day 10-11)

- [ ] DiagnosticBoard component
- [ ] BoardEntryDetail modal
- [ ] Entries added during patient encounter
- [ ] Connections and links working

**Test**: Board reflects discoveries, lessons persist

---

## Phase 9: Shift Structure (Day 11-13)

- [ ] ShiftManager component
- [ ] Time tracking
- [ ] Multiple cases per shift
- [ ] Shift start/end flow

**Test**: Can complete a full shift with multiple patients

---

## Phase 10: Relationships (Day 13-14)

- [ ] NPC data files (Jimmy, Dr. Okonkwo, Maria)
- [ ] RelationshipPanel component
- [ ] Relationship changes from interactions
- [ ] Relationship-gated content

**Test**: Relationships track and affect gameplay

---

## Phase 11: Save/Load (Day 14-15)

- [ ] `src/lib/saveSystem.ts`
- [ ] Auto-save at shift end
- [ ] Save slot UI
- [ ] Load game functionality

**Test**: Can save, close, reload, continue

---

## Phase 12: More Content (Day 15-20)

- [ ] 3+ additional patient cases
- [ ] Full NPC dialogue trees
- [ ] Story events
- [ ] CPC mode (optional)

---

## Phase 13: Polish (Day 20-25)

- [ ] Audio (ambient, SFX)
- [ ] Animations refined
- [ ] Bug fixes
- [ ] Balance testing

---

## Phase 14: Launch Prep (Day 25-30)

- [ ] Full playtest
- [ ] Glossary complete
- [ ] Tutorial/onboarding
- [ ] Deploy to Vercel

---

## Key Prompts Cheat Sheet

### Starting a session:
```
[Paste PROJECT_CONTEXT.md]

I'm working on CODE BLUE, a medical RPG. Today I want to work on [SPECIFIC TASK].

Here's my current code for [RELEVANT FILE]:
[paste code]

Help me [specific request].
```

### Creating a new component:
```
Create a React component for [DESCRIPTION].

Requirements:
- [list requirements]

It should use:
- TypeScript with strict typing
- Tailwind CSS for styling
- Framer Motion for animations (if needed)
- My existing types from src/types/

Follow my project's patterns.
```

### Adding a patient case:
```
Create a new patient case for CODE BLUE.

Case concept: [DESCRIPTION]

Include:
- Patient demographics and vitals
- Symptom list with reveal conditions
- History dialogue tree
- Physical exam findings
- Lab/imaging results
- Multiple outcome paths
- Teaching points
- Skill checks with appropriate DCs

Use the same format as my existing cases.
```

### Debugging:
```
I have a bug in my game.

Expected: [what should happen]
Actual: [what's happening]
Error (if any): [error message]

Here's the relevant code:
[paste code]

Help me find and fix the issue.
```

---

## Resource Links

- [Next.js Docs](https://nextjs.org/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

---

## Remember

1. **Commit often** — Working code is better than perfect code
2. **Test as you go** — Don't build 5 features then test
3. **Update PROJECT_CONTEXT.md** — Your future self will thank you
4. **It's okay to restart** — Sometimes the second attempt is cleaner
5. **Have fun** — You're building something cool

---

*Estimated total build time: 30-60 hours depending on experience and scope*
