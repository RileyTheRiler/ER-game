# CODE BLUE
## An Emergency Room RPG

*"Medicine is learned by the bedside and not in the classroom."* — William Osler

---

# CONCEPT OVERVIEW

**Tagline**: *Scrubs meets Disco Elysium meets Hades*

**Elevator Pitch**: You are a third-year medical student on your first emergency medicine rotation. You know almost nothing. The ER knows everything—and it's about to teach you, one shift at a time.

**Core Experience**: 
- Learn medicine through failure, consequence, and repetition
- Navigate a web of relationships with attendings, residents, nurses, and patients
- Make split-second decisions with incomplete information
- Live the gritty, heartful, darkly funny reality of emergency medicine

**Influences**:
- *ER* (NBC) — The gold standard. Rapid-fire medicine, interwoven personal drama, the weight of life-and-death decisions
- *The Pitt* (Max) — Modern, real-time intensity, focus on system failures and moral complexity
- *Disco Elysium* — Internal dialogue as gameplay, skills as characters, failure as narrative
- *Hades* — Learning through repetition, relationship progression across runs, failure as progress
- *Scrubs* — Humor as coping mechanism, the intern experience, internal monologue

---

# THE PLAYER CHARACTER

## Alex Chen — Third-Year Medical Student

**Starting Point**: Day one of your emergency medicine clerkship. You've spent two years in lecture halls learning pathophysiology. You've practiced on mannequins and standardized patients. You've never seen real blood, real fear, or real death.

**What You Don't Know**: Everything. How to read an EKG. What a "STEMI" is. Why nurses are looking at you like that. Where the supply closet is. How to tell a family their mother is dying.

**What You're About To Learn**: All of it.

### Character Customization

At rotation start, players choose:

**Background** (affects starting skill bonuses):
- **EMT Experience**: +2 to TRIAGE, COMPOSURE. You've seen emergencies—just from the other side.
- **Research Track**: +2 to DIFFERENTIAL, PATHOPHYSIOLOGY. You know the science; now learn the practice.
- **Late Bloomer**: +2 to BEDSIDE, EMPATHY. You lived life before medicine; you understand people.
- **Legacy**: +2 to PROCEDURE, HIERARCHY. Your parent is a doctor. You know the culture—for better or worse.

**Personality Axes** (affect dialogue options and internal voice):
- **Confident ↔ Anxious**: How you present under pressure
- **By-the-Book ↔ Intuitive**: How you approach decision-making
- **Idealistic ↔ Cynical**: How you see the system

---

# CORE MECHANICS

## The Skill System

### Medical Skills (CLINICAL)

These represent your growing medical competence.

| Skill | Domain | What It Does |
|-------|--------|--------------|
| **TRIAGE** | Assessment | Recognize severity. Who's crashing? Who can wait? |
| **DIFFERENTIAL** | Diagnosis | Generate and narrow the list of possibilities |
| **PATHOPHYSIOLOGY** | Science | Understand the mechanism. Why is this happening? |
| **HISTORY** | Information | Ask the right questions. Extract the story. |
| **PHYSICAL EXAM** | Assessment | Hands on the patient. What does the body tell you? |
| **PROCEDURE** | Intervention | IVs, intubations, chest tubes. Technical execution. |
| **PHARMACOLOGY** | Treatment | Right drug, right dose, right route. Interactions. |
| **INTERPRETATION** | Data | Labs, imaging, EKGs. What does it mean? |

### Interpersonal Skills (SOCIAL)

These determine how you navigate the human side of medicine.

| Skill | Domain | What It Does |
|-------|--------|--------------|
| **BEDSIDE** | Patient Care | Connection. Comfort. Trust. |
| **EMPATHY** | Emotional | Feel what they feel. Sometimes too much. |
| **COMMUNICATION** | Information | Explain clearly. Deliver news. Get consent. |
| **HIERARCHY** | Politics | Read the room. Know your place. Push when needed. |
| **TEAMWORK** | Collaboration | Work with nurses, residents, techs. They know more than you. |
| **ADVOCACY** | Ethics | Fight for your patient against the system. |

### Internal Skills (PSYCHOLOGICAL)

These are the voices in your head—your relationship with yourself.

| Skill | Voice | What It Does |
|-------|-------|--------------|
| **COMPOSURE** | The Professional | Stay calm. Don't show fear. You can process later. |
| **INSTINCT** | The Gut | Something's wrong. You can't explain it. Trust it anyway. |
| **DOUBT** | The Critic | Are you sure? What if you're wrong? Check again. |
| **DRIVE** | The Engine | Push through. You can sleep when you're dead. They need you. |
| **MEMORY** | The Student | Wait—you read about this. What did Uptodate say? |
| **HUMANITY** | The Person | They're not a diagnosis. They're someone's mother. |

---

## Skill Checks

### Core Mechanic: 2d6 + Modifier

```
Roll: 2d6 + Skill Modifier + Situational Modifiers
Compare to: Difficulty Class (DC)
```

### DC Scale

| DC | Difficulty | Example |
|----|------------|---------|
| 6 | Routine | Taking a basic history from a cooperative patient |
| 8 | Standard | Starting an IV on a normal vein |
| 10 | Challenging | Recognizing early sepsis signs |
| 12 | Difficult | Identifying a subtle STEMI on EKG |
| 14 | Expert | Emergency intubation |
| 16 | Crisis | Stabilizing a crashing polytrauma |

### Failure Is Progress

**Design Principle**: Every failure teaches something. Failed checks unlock:
- **INSIGHT entries**: New understanding added to your Board
- **Dialogue options**: "I made this mistake before..."
- **Skill growth**: Failure XP contributes to advancement
- **Story consequences**: Patients remember. Staff remembers. You remember.

### Assisted Checks

You're a student. You're supposed to ask for help.

```
ASSISTED CHECK: Your roll + (Helper's Modifier / 2)
- Asking the resident: Lower DC, you learn less
- Asking the attending: Lowest DC, they judge your competence
- Not asking when you should have: Consequences
```

---

## The Board: Your Mental Whiteboard

Adapted from the evidence-board concept—this is your internal diagnostic tracking system.

### Board Entry Types

| Type | Icon | What It Is |
|------|------|------------|
| **SYMPTOM** | 🔴 | A clinical finding. Fever. Chest pain. Confusion. |
| **DIFFERENTIAL** | 📋 | A possible diagnosis you're considering |
| **CONNECTION** | 🔗 | A link between symptoms and diagnoses |
| **LESSON** | 💡 | Something you learned the hard way |
| **ECHO** | 💔 | A patient who stays with you |

### How It Works

During patient encounters:
1. **Gather symptoms** through HISTORY and PHYSICAL EXAM
2. **Pin differentials** based on pattern recognition
3. **Make connections** to narrow the list (requires DIFFERENTIAL checks)
4. **Test and eliminate** through labs, imaging, procedures

**Board Slots**: Start with 4, max 8. You can only actively consider so many possibilities.

**LESSON entries** are permanent—they persist across shifts and provide:
- Passive skill bonuses
- New dialogue options
- Pattern recognition hints

---

## The Shift System

### Structure of a Shift

Each playable shift follows this structure:

```
SHIFT START
├── Handoff (learn about patients already in department)
├── New Arrivals (3-5 cases enter during shift)
│   ├── Triage
│   ├── Workup
│   ├── Treatment/Disposition
│   └── Complications
├── Ongoing Cases (patients from previous shifts)
├── Crisis Events (0-2 per shift, high-stakes interruptions)
└── SHIFT END
    ├── Sign-out (hand off to next team)
    └── Debrief (reflection, relationship scenes)
```

### Time Pressure

**Real-time segments**: Crisis events play out in pseudo-real-time
- Dialogue options have timers
- Delayed decisions have consequences
- Silence is a choice

**Turn-based segments**: Routine care allows deliberation
- Take time to think through differentials
- Consult references (with time cost)
- Ask for help (with relationship cost/benefit)

### Persistence Across Shifts

**What Carries Forward**:
- Skill levels and LESSON entries
- Relationship states with all NPCs
- Reputation (competence, reliability, judgment)
- Unresolved cases (some patients stay for days)
- Psychological state (burnout, trauma)

**What Resets**:
- Board slots (cleared except pinned LESSONS)
- Active cases (new patients each shift)
- Energy (starts fresh, depletes through shift)

---

# THE CAST

## The Hierarchy

### Attending Physicians

**Dr. Rachel Okonkwo** — The Mentor
- Specialty: Emergency Medicine, 15 years
- Teaching style: Socratic. She won't give you answers, but she'll make you find them.
- Quote: "What does that heart rate tell you? No—don't guess. What does it *tell* you?"
- Arc: Watches for burnout in her students. Hiding her own.

**Dr. Marcus Webb** — The Old Guard
- Specialty: Emergency Medicine, 25 years
- Teaching style: Sink or swim. He came up hard; so will you.
- Quote: "In my day, we didn't have UpToDate. We had textbooks and terror."
- Arc: Respected but rigid. The department is changing around him.

**Dr. Sarah Lindqvist** — The Researcher
- Specialty: Emergency Medicine + Critical Care
- Teaching style: Evidence-based. If there's not a study, she's skeptical.
- Quote: "That's a nice theory. Where's your data?"
- Arc: Brilliant but distant. Something personal she won't discuss.

### Residents

**Dr. James "Jimmy" Reyes** — PGY-3 (Third Year)
- Your immediate supervisor most days
- Tired, cynical, secretly still cares
- Quote: "Welcome to the show. Try not to kill anyone on your first day. That's my job."
- Arc: Deciding if he still wants this life

**Dr. Priya Sharma** — PGY-2 (Second Year)
- Ambitious, competitive, sharp
- Will help you if it doesn't cost her
- Quote: "I don't have time to hold your hand. Keep up or stay out of my way."
- Arc: Her perfectionism is cracking

**Dr. Ben Okafor** — PGY-1 (Intern)
- Only one year ahead of you
- Still remembers being where you are
- Quote: "Okay, I'll tell you the trick, but if anyone asks, you figured it out yourself."
- Arc: His confidence masks impostor syndrome

### Nurses

**Maria Santos, RN** — Charge Nurse, 20 years
- Runs the department. Attendings know it.
- Will save you if you respect her. Will bury you if you don't.
- Quote: "Doctor, I've been a nurse longer than you've been alive. Would you like my opinion, or would you like to learn the hard way?"
- Arc: Fighting for her nurses against administration

**Kenji Tanaka, RN** — Trauma Bay
- Former military medic. Unflappable.
- Quiet until he's not. When Kenji speaks, listen.
- Quote: "..."  
- Arc: What he saw overseas. What he still sees.

**Diana Oduya, RN** — New Grad
- Six months in. Still learning.
- Eager, anxious, your peer in inexperience
- Quote: "Is this your first code? It's my first code. Oh god."
- Arc: Discovering if she made the right choice

### Other Staff

**Ray Dominguez** — Paramedic
- Your source for field information
- Dark humor as survival mechanism
- Quote: "Found him face-down in a ditch. Could be drugs, could be a stroke, could be aliens. Your call, doc."

**Father Thomas Aquino** — Hospital Chaplain
- Non-denominational presence
- There for the families. There for you, too.
- Quote: "You don't have to believe in anything. You just have to sit with me a while."

**Dr. Amara Osei** — Psychiatry Consult
- Called for behavioral emergencies
- Sees what everyone else misses
- Quote: "The chart says 'agitated.' I'd be agitated too if I was withdrawing from benzos and no one noticed."

---

# PATIENT ENCOUNTERS

## Case Structure

### The Presentation

Each case begins with limited information:

```
EMS RADIO:
"County General, Medic 7. We have a 67-year-old male,
chief complaint of chest pain, diaphoretic, B/P 90/60.
ETA 4 minutes."
```

**Player must determine**:
- Acuity (how sick? how fast?)
- Resources needed (trauma bay? cardiac monitor?)
- Initial differential (heart attack? dissection? PE?)

### The Workup

**HISTORY skill check**: What questions do you ask?
- Success: Patient reveals key information
- Partial: Patient is vague; requires follow-up
- Failure: You miss a critical question; information comes later (if at all)

**PHYSICAL EXAM skill check**: What do you find?
- Tied to specific exam maneuvers
- Must know what to look for
- Teaching moment: Game explains findings and significance

**INTERPRETATION skill check**: Labs, imaging, EKGs
- Raw data presented; player interprets
- Multiple choice with reasoning required
- Wrong interpretations have consequences

### The Decision

Every case reaches decision points:

```
DECISION POINT: CHEST PAIN PATIENT

The EKG shows... something. ST elevations in leads II, III, aVF.

[ ] Call cardiology for emergent cath lab (INTERPRETATION DC 10)
[ ] Give aspirin and repeat EKG in 15 minutes (INTERPRETATION DC 8)
[ ] Ask the resident what they think (HIERARCHY DC 6)
[ ] Admit for observation (Safe but delays care)
```

### Consequences

**Correct call, good outcome**: 
- XP, reputation boost, patient thanks you

**Correct call, bad outcome**: 
- Medicine isn't magic. Sometimes you do everything right.
- ECHO entry: This one stays with you

**Wrong call, good outcome**: 
- You got lucky. DOUBT skill interrupts: "What if next time..."

**Wrong call, bad outcome**: 
- Consequences range from extended stay to permanent harm to death
- Morbidity and Mortality conference
- Relationship impacts
- LESSON entry: You won't make this mistake again

---

## Sample Cases

### Case: "Just a Little Chest Pain"

**Presentation**: 52-year-old woman, "I think it's just heartburn."

**The Trap**: She's minimizing. Women present atypically. Her EKG is "normal."

**Key Findings** (if you look):
- Diaphoresis (sweating)
- Nausea
- "Pressure" rather than "pain"
- Diabetes (masks symptoms)
- Troponin takes time; first one may be negative

**Teaching Points**:
- Atypical MI presentation
- Serial troponins
- Risk stratification (HEART score)
- Gender bias in cardiac care

### Case: "The Frequent Flyer"

**Presentation**: 34-year-old man, here "for pain meds again." Staff is dismissive.

**The Trap**: He has a real problem this time. Everyone's pattern recognition works against him.

**Key Findings** (if you look):
- Vital signs slightly off
- Abdomen tender in a new location
- He's scared, not demanding

**Teaching Points**:
- Anchoring bias
- Every visit is a new visit
- The "difficult patient" is still a patient

### Case: "Peds Emergency"

**Presentation**: 4-year-old brought in by frantic parents. "She won't stop crying."

**The Trap**: Kids can't tell you what's wrong. Parents are scared. You're scared.

**Key Findings** (if you know pediatric assessment):
- Where is she on growth charts?
- Is she meeting developmental milestones?
- The subtle signs: how she holds her arm, whether she tracks your movements

**Teaching Points**:
- Pediatric vital sign norms (they're different)
- Developmental assessment
- Communicating with parents
- Non-accidental trauma (the thing nobody wants to consider)

---

# RELATIONSHIP SYSTEM

## Relationship Tracks

Each major NPC has:
- **Professional Track**: How they see your competence
- **Personal Track**: How they see you as a person
- **Story Track**: Their personal arc, which you can influence

### Professional Reputation

| Level | Perception | Effect |
|-------|------------|--------|
| -3 | Dangerous | Supervised constantly, liability |
| -2 | Incompetent | Not trusted with anything important |
| -1 | Green | Expected to struggle |
| 0 | Student | Normal starting point |
| +1 | Capable | Given more autonomy |
| +2 | Reliable | Trusted with important tasks |
| +3 | Impressive | Treated almost like a junior resident |

### Personal Connection

| Level | Relationship | Unlocks |
|-------|--------------|---------|
| 0 | Stranger | Nothing |
| 1 | Acquaintance | Basic conversation |
| 2 | Colleague | Personal dialogue options |
| 3 | Friend | Story scenes, support mechanics |
| 4 | Confidant | Their arc intersects with yours |

### Relationship Mechanics

**What builds Professional reputation**:
- Correct diagnoses
- Successful procedures
- Knowing when to ask for help
- Following through

**What damages Professional reputation**:
- Missed diagnoses
- Errors
- Not asking when you should have
- Overconfidence

**What builds Personal connection**:
- Time spent together
- Showing interest in them as people
- Being there during hard moments
- Vulnerability

**What damages Personal connection**:
- Dismissiveness
- Hierarchy violations
- Breaking confidence
- Being an asshole

---

# PROGRESSION SYSTEM

## Experience & Advancement

### XP Sources

| Source | Base XP | Notes |
|--------|---------|-------|
| Correct diagnosis | 10-25 | Based on difficulty |
| Successful procedure | 15-30 | Based on complexity |
| Meaningful failure | 10 | You learn from mistakes |
| Patient disposition | 5-15 | Completing a case |
| Relationship scene | 10 | Deepening connections |
| Shift completion | 25 | Base shift XP |
| Crisis management | 20-50 | Handling emergencies |

### Advancement Costs

| Improvement | Cost | Limit |
|-------------|------|-------|
| +1 to Clinical Skill | 15 × new rank | Max +6 |
| +1 to Social Skill | 12 × new rank | Max +5 |
| +1 to Internal Skill | 10 × new rank | Max +4 |
| +1 Board Slot | 30 | Max 8 |

### Milestone Progression

Certain story beats are gated by accumulated competence:

| Milestone | Requirement | Unlocks |
|-----------|-------------|---------|
| First Solo Workup | Week 2 | Working up patients alone (with supervision) |
| First Procedure | PROCEDURE +2 | Supervised IV, blood draw |
| First Code | Shift 10 | Participating in cardiac arrest |
| First Death | Story event | Processing patient death |
| First Save | Story event | The one who made it because of you |

---

# CPC CODING MODE (Optional)

For players studying for the Certified Professional Coder exam, an optional mode adds coding challenges.

## How It Works

After patient disposition, a coding screen appears:

```
CODING CHALLENGE

Patient: 67 y/o M with acute inferior STEMI
  - Emergent cardiac catheterization
  - Stent placement to RCA

What's the primary diagnosis code?

[A] I21.11 — STEMI involving right coronary artery
[B] I21.19 — STEMI of other sites
[C] I25.10 — Atherosclerotic heart disease
[D] I21.3 — STEMI of unspecified site

> [INTERPRETATION + MEMORY DC 8 for hint]
```

## Coding Integration

| Situation | Coding Element |
|-----------|----------------|
| Diagnosis | ICD-10-CM code selection |
| Procedure | CPT code selection |
| E/M Level | Determining evaluation complexity |
| Modifiers | When and how to apply |

## Toggle Settings

- **Off**: No coding challenges
- **Learning**: Coding challenges with explanations, no penalty
- **Integrated**: Coding success affects XP and reputation
- **Exam Prep**: Timed challenges matching CPC format

---

# TONE & WRITING

## The Three Registers

### Medical Realism

Authentic terminology, procedures, and situations:

> **EMS RADIO**: "Medic 7, 54-year-old male, GCS 9, BP 80 palp, obvious deformity to the left femur, significant blood loss at scene."
>
> **You know**: GCS 9 is altered. 80 palp is hypotensive. Femur fractures bleed. This is bad.

### Dark Humor

The coping mechanism of everyone in medicine:

> **JIMMY**: You know what the difference is between a medical student and a large pizza?
> **YOU**: What?
> **JIMMY**: A large pizza can feed a family.
> **YOU**: That's... dark.
> **JIMMY**: [already walking away] Welcome to emergency medicine.

### Emotional Truth

The moments that break through:

> The family is in the quiet room. You've never done this before.
>
> **COMPOSURE**: You've practiced this. Bad news in three parts. Warning shot, information, support.
>
> **HUMANITY**: That's their mother in there. That's someone's *mother*.
>
> **DR. OKONKWO**: [quietly] I'll be right here. Take your time.

---

# TECHNICAL IMPLEMENTATION

## Engine Recommendation

**Ink + Unity** or **Twine + Custom Framework**

Given the scope (branching narrative, state tracking, skill checks), recommend:
- **Narrative Engine**: Ink (by Inkle) — excellent for complex branching, variable tracking, conditional content
- **Game Framework**: Unity or Godot for visual presentation
- **Art Style**: Stylized 2D portraits, visual novel presentation
- **Audio**: Ambient ER soundscape, subtle music during emotional beats

## State Management

```
GameState:
├── PlayerCharacter
│   ├── Skills[18]
│   ├── Board[8 slots]
│   ├── Lessons[persistent]
│   └── Energy
├── Relationships[NPC count]
│   ├── Professional
│   ├── Personal
│   └── StoryProgress
├── Shift
│   ├── CurrentCases[active]
│   ├── CompletedCases
│   └── TimeRemaining
└── Persistent
    ├── ShiftCount
    ├── TotalXP
    ├── Milestones[unlocked]
    └── Endings[available]
```

---

# DEVELOPMENT PHASES

## Phase 1: Vertical Slice
- 1 complete shift
- 3 patient cases (easy, medium, hard)
- Core skill check system
- 3 NPCs with basic relationship tracking
- Board system prototype

## Phase 2: Core Loop
- 5 shifts with variety
- 15 patient cases
- Full skill system
- All major NPCs
- Progression system
- Basic CPC mode

## Phase 3: Full Game
- 20+ shifts (4-week rotation)
- 50+ unique patient presentations
- Complete story arcs for all NPCs
- Multiple endings based on choices
- Full CPC integration
- Polish, balancing, testing

---

# APPENDIX A: MEDICAL TERMINOLOGY GLOSSARY

*This section will contain a comprehensive glossary that builds as the player encounters terms. Example entries:*

| Term | Definition | Context |
|------|------------|---------|
| **STEMI** | ST-Elevation Myocardial Infarction | Heart attack visible on EKG |
| **Diaphoresis** | Excessive sweating | Sign of distress, often cardiac |
| **GCS** | Glasgow Coma Scale | Consciousness assessment (3-15) |
| **Differential** | List of possible diagnoses | What could this be? |
| **NPO** | Nothing by mouth (nil per os) | Patient can't eat/drink |
| **Troponin** | Cardiac enzyme | Elevated in heart damage |

---

# APPENDIX B: SKILL VOICE EXAMPLES

*Sample internal dialogue for each skill:*

**COMPOSURE** (staying calm):
> *The family is screaming. The monitor is alarming. The resident is frozen. You have trained for this. Find your center. Move.*

**INSTINCT** (gut feeling):
> *Something's wrong with this patient. The vitals are "fine." The labs are "fine." But look at her face. She knows something's coming.*

**DOUBT** (second-guessing):
> *You said MI. What if it's a PE? What if it's both? Did you even check the D-dimer? You should check the D-dimer.*

**MEMORY** (recall):
> *Fever, altered mental status, neck stiffness. The triad. What's the triad for? Come on, you know this. It was on the exam. Meningitis. It's meningitis.*

**HUMANITY** (emotional connection):
> *He's eighty-seven. He's lived a whole life. Look at his hands—those are working hands. Someone loves him. Someone is waiting for him to come home.*

---

*Document Version 1.0*
*Ready for iteration and development*
