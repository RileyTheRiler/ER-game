# CODE BLUE: Patient Case Library — New Cases

## Inspired by "The Pitt" (Max, 2024)

These cases are adapted from real-world medical drama scenarios to teach lessons that textbooks cannot.

---

## CASE PC011: "The List"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC011 |
| **Patient Name** | Theresa Kowalski |
| **Age** | 47 |
| **Chief Complaint** | Intractable vomiting, weakness |
| **Actual Diagnosis** | Self-induced vomiting (Ipecac) |
| **Difficulty** | Hard |
| **Teaching Focus** | Indirect presentation, psychiatric crisis in family member, limits of intervention, threat assessment |

### The Twist

**The patient you're treating is not the one who needs help.**

Theresa made herself sick to get her son David into the hospital. She found writings on his computer—lists of girls he wants to "eliminate." She doesn't know what to do. She's terrified. She came to the only place she thought could help.

### Why This Case Matters for Medical Students

- You will encounter situations where the "patient" is a vehicle for something else
- You cannot force treatment on a legal adult without consent
- Some cases have no good outcome—learning to sit with that is essential
- Social work collaboration is a skill, not a weakness

---

### Patient Data

```yaml
patient:
  id: "PC011"
  name: "Theresa Kowalski"
  age: 47
  sex: "F"
  
  chief_complaint: "Vomiting, can't keep anything down"
  
  vitals:
    heart_rate: 98
    blood_pressure: { systolic: 108, diastolic: 68 }
    respiratory_rate: 16
    oxygen_saturation: 99
    temperature: 98.4
  
  allergies: []
  
  medications:
    - "None"
  
  past_medical_history:
    - "No significant history"
  
  social_history:
    smoking: false
    alcohol: "Rare"
    drugs: "None"
    occupation: "Administrative assistant"
    family: "Widow, husband died of COVID in 2020"
  
  labs:
    potassium: 3.1  # Low from vomiting
    sodium: 138
    chloride: 98
    bicarbonate: 28
    BUN: 18
    creatinine: 0.9
    glucose: 92
    WBC: 7.2
    hemoglobin: 13.1
  
  hidden_condition: "Self-induced vomiting with Ipecac syrup"
  acuity: 4  # Appears routine
  
  # The real patient
  accompanying_person:
    name: "David Kowalski"
    age: 18
    relationship: "Son"
    presentation: "Withdrawn, on phone, minimal eye contact"
    hidden_condition: "Possible threat to others, depression, isolation"
```

---

### The Setup

**Triage Notes**:
> 47 y/o F, brought in by son for n/v x 12 hours. States she "can't stop vomiting."
> Appears mildly dehydrated. Cooperative. Son present, quiet.

**First Impression**: Routine dehydration case. GI bug or food poisoning. Easy.

**The Trap**: Everything points to a simple case. The labs will show low potassium (from vomiting), easily corrected. The temptation is to treat, discharge, and move on.

**The Reality**: Theresa will eventually reveal that she made herself sick on purpose. She needs you to help her son.

---

### Initial Encounter

**[ENTERING ROOM]**

Theresa is lying on the stretcher looking pale but alert. Her son David (18, thin, wearing a hoodie) sits in the corner, scrolling his phone. He doesn't look up when you enter.

**THERESA**: Thank you for seeing me. I'm sorry to be a bother.

**DAVID**: [doesn't look up]

*Internal Voice - INSTINCT: Something's off. She seems... nervous. Not sick-nervous. Something else.*

---

### History Dialogue Tree

**[OPENING OPTIONS]**

→ **"Tell me about the vomiting. When did it start?"**
   (HISTORY DC 6 - Standard opening)
   > It started last night. I thought it was something I ate, but it just kept going.

→ **"David, has your mom been sick before?"**
   (EMPATHY DC 8 - Attempts to engage the son)
   > DAVID: [barely looking up] She's fine. She never gets sick.
   *Note: This answer is important—Theresa never gets sick.*

→ **"You seem anxious. Is there something else going on?"**
   (INSTINCT DC 10 - Probing deeper)
   > THERESA: [glances at David] No, I'm just... It's been a hard week.
   *Internal Voice - INSTINCT: She looked at him before answering. Why?*

→ *Examine the son's demeanor more closely*
   (OBSERVATION - automatic)
   > David hasn't made eye contact since you entered. His posture is closed. He's scrolling but not really looking at anything. He's here, but he's not present.

---

### Standard Medical Workup

**PHYSICAL EXAM (DC 6)**:
- Dry mucous membranes
- Mild tachycardia
- Abdomen soft, non-tender
- No peritoneal signs

> This doesn't fit gastroenteritis or food poisoning. She's not febrile. No diarrhea.

**LABS**:
```
Potassium: 3.1 (Low - from vomiting)
BMP: Otherwise normal
CBC: Normal
Lipase: Normal
UA: Concentrated but no infection
```

*Internal Voice - DIFFERENTIAL: Low potassium from vomiting. But what caused the vomiting? No fever, no diarrhea, no abdominal pain. This doesn't add up.*

---

### The Reveal

**[DECISION POINT - After workup]**

You've been in the room for 15 minutes. David announces he needs to get to school.

**DAVID**: Mom, I have to go. You can call me when you're ready to leave.

**THERESA**: [panic in her eyes] David, wait—

**DAVID**: [already heading to the door] I've got class.

He leaves.

**THERESA**: [voice breaking] Doctor... can you close the door?

---

**[DOOR CLOSED - Private conversation]**

**THERESA**: I need to tell you something. I'm not really sick.

**YOU**: What do you mean?

**THERESA**: I made myself throw up. With Ipecac. So David would bring me here.

*Internal Voice - DOUBT: Did she just confess to... what? Why would she do that?*

**[DIALOGUE OPTIONS]**

→ **"Why would you do that?"**
   (EMPATHY DC 6)
   > THERESA: Because I don't know where else to go. I found something on David's computer. Lists. Lists of girls from his school. Names. And next to each name, he wrote what he wants to do to them.

→ **"That's... a significant choice. You must have been desperate."**
   (COMMUNICATION DC 8)
   > [She starts crying]
   > THERESA: I'm his mother. I would do anything to protect him. Even from himself.

→ **"Are you saying David might hurt someone?"**
   (Direct - no check needed)
   > THERESA: I don't know. He's never been violent. But the things he wrote... I can't unsee them. And I don't know what to do.

---

### The Full Story

**[GATHERED THROUGH CONVERSATION - HISTORY DC 10]**

**Key Information**:
- David is 18 (legal adult)
- Father died during COVID (2020) - David was 15
- David has become increasingly isolated since then
- No friends, no girlfriend, rarely leaves the house
- Good student, never in trouble
- Theresa found "elimination lists" with female classmates' names
- She disposed of her late husband's guns after he died
- David was angry about the guns but "seemed to get over it"
- She didn't call police because she was afraid they'd "overreact"

**THERESA**: He's not a bad kid. He's just... lost. He's been lost since his father died. I thought he'd come back to me, but he's just drifted further away.

*Internal Voice - HUMANITY: She's describing grief. Isolation. The slow erosion of connection. This is how it happens. Gradually, then suddenly.*

*Internal Voice - ADVOCACY: She brought him here because she trusts medicine. She trusts you. But what can you actually do?*

---

### The Impossible Problem

**[MEDICAL STUDENT REALIZATION]**

You want to help. But there are obstacles:

1. **David is 18** — He's a legal adult. You cannot compel treatment.
2. **He has not committed a crime** — Disturbing thoughts are not illegal.
3. **He has no psychiatric emergency** — He's not actively suicidal or homicidal (as far as you know).
4. **He left** — He's not even in the hospital anymore.

*Internal Voice - DOUBT: What are you supposed to do? You're a medical student. This is so far beyond your scope.*

*Internal Voice - HIERARCHY: This needs to be escalated. This is not something you handle alone.*

---

### Escalation & Collaboration

**[MUST DO - Find Social Work]**

You need Kiara, the social worker.

**[FINDING KIARA - TEAMWORK DC 6]**

**YOU**: I have a situation. The patient in Central 12—her vomiting was self-induced. She did it to get her son here. She found writings. Death lists. Girls from his school.

**KIARA**: Did she report it to anyone?

**YOU**: No. She didn't know who to tell.

**KIARA**: Where's the son now?

**YOU**: He left. Said he had to get to school.

**KIARA**: [quietly] OK. Let's go talk to her.

---

### The Conversation with Theresa (with Kiara)

**[JOINT INTERVIEW]**

**KIARA**: Mrs. Kowalski, I'm Kiara. I work with families in situations like this.

**THERESA**: What situation? I don't want him arrested.

**KIARA**: No one is trying to arrest anyone. We want to help David. But we need to understand what you found.

**THERESA**: Lists. Names of girls. And what he wanted to do to them. He said they should be "eliminated."

**KIARA**: Has David ever been violent?

**THERESA**: No. Never.

**KIARA**: Has he been in any trouble at school?

**THERESA**: No.

**KIARA**: Does he have access to weapons?

**THERESA**: No. I got rid of the guns after my husband died. David was angry, but he got over it.

*Internal Voice - DOUBT: Did he get over it? Or did he just stop talking about it?*

**KIARA**: Mrs. Kowalski, would David be willing to talk to someone? A counselor, a therapist?

**THERESA**: I've tried suggesting it. He gets angry. He says I'm the one who needs help.

---

### Attempting Contact

**[THERESA TRIES TO REACH DAVID]**

**THERESA**: [on phone] David, please call me back. The doctors want to talk to you. Please.

*She hangs up. It went straight to voicemail.*

**THERESA**: He's not answering.

**YOU**: Can you text him?

**THERESA**: [texting] ...Nothing.

*Internal Voice - INSTINCT: He's avoiding. He knows something is happening.*

---

### The No-Win Outcome

**[REALITY CHECK - from Robby or attending]**

You present the case to your attending.

**DR. OKONKWO** (or supervising resident):
> You did the right thing by involving social work. But here's the hard truth: David is an adult. He hasn't committed a crime. He's not here. And we can't make him come back.

**YOU**: So what happens now?

**DR. OKONKWO**:
> We document everything. We encourage the mother to contact local mental health services, school counselors, anyone who might have access to David. We give her hotline numbers. And we hope.

*Internal Voice - HUMANITY: Hope. That's all we have. Hope that he gets help before he hurts someone. Or himself.*

---

### Discharge & Documentation

**[CLOSING THE CASE]**

**THERESA**: [as she's discharged] Thank you for listening. For believing me.

**YOU**: I wish we could do more.

**THERESA**: You did something. That's more than I expected.

*She leaves. You don't know what will happen to David. You may never know.*

---

### Lessons Unlocked

**LESSON: "The Invisible Patient"**
> Sometimes the person who needs help isn't the one in the bed.
> *+1 to INSTINCT when accompanying person seems more distressed than patient*

**LESSON: "The Limits of Medicine"**
> You cannot save everyone. Some problems are beyond your reach.
> *-1 to COMPOSURE penalty removed for accepting unresolved cases*

**LESSON: "Teamwork Beyond Medicine"**
> Social workers, chaplains, counselors—they're part of your team.
> *+2 to TEAMWORK when involving non-physician specialists*

---

### XP & Relationship Effects

| Outcome | XP | Relationship Effects |
|---------|-----|---------------------|
| Recognized indirect presentation | +15 | — |
| Involved social work appropriately | +20 | Kiara +1 |
| Maintained empathy with mother | +10 | HUMANITY +1 (permanent) |
| Completed documentation | +10 | HIERARCHY +1 |
| Accepted unresolved outcome gracefully | +15 | DR. OKONKWO +1 (respects maturity) |

**Total possible XP**: 70

---

### Possible Follow-Up (Later Shift)

*[OPTIONAL - depends on narrative arc]*

**Shift 15 or later...**

**DANA**: [quietly] Robby, there's something on the news you should see.

The TV in the break room shows a reporter outside a high school.

> "...the suspect, an 18-year-old male, was apprehended after allegedly..."

Or:

> "...campus counselor says the student sought help after his mother expressed concerns..."

**The outcome is determined by the player's earlier choices**:
- If you were thorough → Better chance of intervention
- If you dismissed the case → Worse outcome more likely

*Internal Voice - ECHO: Some patients never leave you. Some outcomes you'll never know. That's medicine.*

---

### Teaching Points

1. **Indirect Presentation**: The apparent patient isn't always the one who needs help
2. **Legal Limits**: Adults cannot be compelled to accept treatment without meeting specific criteria
3. **Threat Assessment**: Isolation + grievance + access to weapons = heightened concern
4. **Documentation**: When intervention isn't possible, thorough documentation protects everyone
5. **Multidisciplinary Care**: Social workers have skills and resources physicians don't
6. **Grief Manifests Differently**: David's isolation is a grief response that was never addressed
7. **Moral Distress**: Feeling helpless when you see a problem but can't fix it is part of medicine

---

### CPC Coding Elements (if relevant)

**Diagnosis (for Theresa)**: 
- R11.10 - Vomiting, unspecified
- F68.10 - Factitious disorder (if documented)
- E87.6 - Hypokalemia

**E/M Level**: 99283 - Moderate complexity (medical straightforward, but social/psychiatric complexity elevates it)

---

## CASE PC012: "The Crisis" (Sickle Cell Vaso-Occlusive Crisis)

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC012 |
| **Patient Name** | Joyce St. Claire |
| **Age** | 32 |
| **Chief Complaint** | Severe pain, "needs narcotics" |
| **Actual Diagnosis** | Sickle cell vaso-occlusive crisis |
| **Difficulty** | Medium |
| **Teaching Focus** | Pain management, empathy, bias in emergency medicine |

### The Setup

**EMS Report**:
> 32 y/o F, thrown off city bus for being disruptive. 
> Screaming for narcotics. Empty Percocet bottle found, filled 5 days ago.
> Combative, uncooperative.

**The Trap**: Every red flag for drug-seeking is present. Staff is already dismissive. EMS is frustrated. She's screaming. The temptation is to label her and minimize care.

**The Reality**: She has sickle cell disease and is in vaso-occlusive crisis. Her hemoglobin is 6. She is in genuine, severe pain.

---

### Why This Case Matters

> **DR. ROBBY**: "Do you know what sickle cell crisis does to the body? Blood cells get caught and plug up your capillaries and deprive all your cells of oxygen. It's been described as an electrical stabbing pain that feels like it's breaking your bones and flushing glass through your body."

Medical students often learn to be skeptical of pain complaints. This case teaches the opposite lesson: **empathy first, skepticism second**.

---

### Patient Data

```yaml
patient:
  id: "PC012"
  name: "Joyce St. Claire"
  age: 32
  sex: "F"
  
  chief_complaint: "Severe pain everywhere, needs medication"
  
  vitals:
    heart_rate: 118
    blood_pressure: { systolic: 142, diastolic: 88 }
    respiratory_rate: 22
    oxygen_saturation: 94
    temperature: 100.8
  
  allergies:
    - "Codeine - nausea"
  
  medications:
    - "Extended release morphine 30mg q12h"
    - "Oxycodone 10mg PRN breakthrough"
    - "Folic acid 1mg daily"
    - "Hydroxyurea 500mg daily"
  
  past_medical_history:
    - "Sickle cell disease (HbSS)"
    - "Multiple prior vaso-occlusive crises"
    - "History of acute chest syndrome"
    - "Cholecystectomy"
  
  labs:
    hemoglobin: 6.0  # Critically low
    WBC: 14.2
    reticulocyte: 8.2%
    LDH: 842  # Elevated (hemolysis)
    bilirubin: 3.8  # Elevated (hemolysis)
  
  hidden_condition: "Genuine vaso-occlusive crisis"
  acuity: 2  # True emergency despite presentation
```

---

### Initial Encounter

**[ARRIVING IN TRAUMA BAY]**

EMS wheels in Joyce, who is writhing on the stretcher. A medic is holding her wrist.

**JOYCE**: [screaming] My meds at home aren't working! Please, I have sickle cell!

**MEDIC**: She's been uncooperative and combative since pickup.

**NURSE**: [skeptically] Found an empty Percocet bottle. Filled five days ago.

*Internal Voice - DOUBT: Empty bottle in five days. That's 60 pills. That's a lot.*

*Internal Voice - EMPATHY: Look at her face. That's not fake. That's agony.*

---

### Critical Decision Point

**[IMMEDIATE CHOICE]**

```
How do you respond?

[ ] "Let's run a drug screen first before we give anything."
    (WRONG - Delays care, causes suffering, biased approach)
    
[ ] "Start with Toradol and reassess."
    (WRONG - Toradol insufficient for crisis, shows skepticism)
    
[ ] "10mg IV morphine now. Repeat in 5 if needed."
    (CORRECT - Appropriate crisis dosing, shows trust and empathy)
    
[ ] Ask the attending what to do
    (HIERARCHY-appropriate, but may delay care depending on attending)
```

**If CORRECT approach taken:**

**DR. ROBBY**: She needs a Dilaudid drip. This is a vaso-occlusive crisis.

**YOU**: [surprised by the high dose]

**DR. ROBBY**: I saw your face. You're surprised by the opioid dosage?

**YOU**: It seemed... high.

**DR. ROBBY**: So was her pain.

---

### Labs Confirm

**HEMOGLOBIN: 6.0**

*Internal Voice - MEMORY: You can't fake a hemoglobin of 6. That's severe anemia. The sickle cells are hemolyzing. She's in crisis.*

**DR. ROBBY**: 
> Do you know what sickle cell crisis does to the body? Blood cells get caught and plug up your capillaries and deprive all your cells of oxygen. It's been described as an electrical stabbing pain that feels like it's breaking your bones and flushing glass through your body.

---

### Teaching Moment

**[AFTER PAIN IS CONTROLLED]**

**DR. ROBBY**:
> A little empathy goes a long way with those suffering in real pain. Don't worry—you'll get good at spotting the fakers. And half the time, all those people need is someone to really listen to them and hear their story.

---

### Lessons Unlocked

**LESSON: "Pain is Subjective"**
> You cannot see pain. You can only believe it or not.
> *+2 to EMPATHY checks when assessing chronic pain patients*

**LESSON: "The Presentation Isn't the Person"**
> A patient who seems "difficult" may be suffering beyond your comprehension.
> *+1 to BEDSIDE when patient has been labeled "drug-seeking"*

---

### Teaching Points

1. **Sickle Cell Crisis**: Vaso-occlusion causes ischemia and severe pain
2. **Pain Management**: High-dose opioids are appropriate for genuine crisis
3. **Bias Recognition**: "Drug-seeking" labels can blind providers to real emergencies
4. **Chronic Pain**: Patients on home opioids require higher doses for breakthrough pain
5. **Exchange Transfusion**: May be needed for severe crisis (Hgb < 7 with symptoms)
6. **Triggers**: Dehydration, infection, stress, cold can precipitate crisis

---

### CPC Coding Elements

**Diagnosis**: 
- D57.00 - HbSS disease with crisis
- D57.01 - With acute chest syndrome (if present)

**E/M Level**: 99285 - High complexity emergency visit

---

---

## CASE PC013: "The Nail"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC013 |
| **Patient Name** | Hank DeLuca |
| **Age** | 38 |
| **Chief Complaint** | "Nail in my chest" |
| **Actual Diagnosis** | Penetrating cardiac injury with tamponade |
| **Difficulty** | Hard |
| **Teaching Focus** | Trauma resuscitation, thoracotomy, managing difficult patients |

### The Setup

**EMS Report**:
> 38 y/o M, construction worker, nail gun injury to left chest.
> Complaining of severe pain, "colorful" language.
> Vitals: HR 120, BP 100/65.

**The Challenge**: The nail has penetrated the left ventricle. He's conscious and combative. He needs emergent surgery, but he's deteriorating fast.

---

### Patient Personality

Hank is **profane, demanding, and terrified** — a classic trauma patient coping through anger.

**Sample Dialogue**:
> "Pull the f*cking nail out!"
> "I want a second opinion. Where's my f*cking phone? I can Uber to Presby."
> "This place sucks. I will destroy you on Yelp."

**Teaching Point**: Don't take it personally. Anger is fear wearing a mask.

---

### Critical Progression

1. **Initial stabilization**: Ultrasound shows pericardial effusion, no tamponade yet
2. **Deterioration**: BP drops, RV collapse on echo → tamponade developing
3. **Decision point**: Pericardiocentesis or thoracotomy?
4. **Procedure**: Left thoracotomy, finger on ventricle, horizontal mattress suture
5. **Outcome**: Stabilized, transported to OR for definitive repair

---

### Procedure Learning

**Thoracotomy Sequence**:
1. Vertical incision to avoid jugulars and carotids
2. Cut through intercostals on superior rib (avoid neurovascular bundle)
3. Finochietto retractor to spread ribs
4. Open pericardium
5. Finger on puncture wound to control bleeding
6. Horizontal mattress suture

**For Medical Students**: This is an observation case. You may be asked to:
- Hold suction
- Hand instruments
- Keep the patient's attention away from the open chest

---

### Lessons Unlocked

**LESSON: "Anger Is Fear"**
> The most combative patients are often the most scared.
> *+1 to BEDSIDE when patient is hostile but genuinely injured*

**LESSON: "Thoracotomy Steps"**
> You watched a chest get cracked open. You'll remember this.
> *Unlocks ability to assist in future thoracotomies*

---

## CASE PC014: "The Confirmation"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC014 |
| **Patient Name** | Nick Bradley |
| **Age** | 18 |
| **Chief Complaint** | Found unresponsive |
| **Actual Diagnosis** | Fentanyl overdose → brain death |
| **Difficulty** | Medium (medical) / Hard (emotional) |
| **Teaching Focus** | Brain death protocols, family support, organ donation |

### The Arc

This case follows a patient through the **entire brain death confirmation process**:

1. **Initial presentation**: Unresponsive, pinpoint pupils, bradycardia
2. **Narcan response**: Pupils dilate, but no spontaneous breathing
3. **Intubation**: GCS 3, no response to pain
4. **Parent arrival**: "He's a good kid. He doesn't do drugs."
5. **Drug screen**: Positive for fentanyl
6. **Apnea test**: No spontaneous breathing, CO2 rises to 82
7. **Cerebral perfusion study**: No blood flow to brain
8. **Death declaration**: Legal death, ventilator continues for organs
9. **Family processing**: Grief, denial, anger (father attacks another patient)
10. **Organ donation discussion**: If family consents

---

### Critical Teaching Moments

**The Apnea Test Explanation**:
> "We keep him on 100% oxygen, but the ventilator won't be giving him breaths. For 10 minutes. If his carbon dioxide levels come back way too high, then we'll know that his brain stem is not telling him to breathe."

**Delivering the News**:
> "Brain death is the same as death."
> "I wish I could have done more to save your son."

**The Contrast**: In the same episode, another fentanyl OD (Jenna) survives with one spray of Narcan. **Same drug, different outcomes.** This is medicine.

---

### Family Dynamics

**Mother (Lily)**: Denial, bargaining, wants more tests
**Father (John)**: Anger, looking for someone to blame

**The Attack**: Father sees another patient (Jenna) who survived her OD. He confronts her: "Did you give my son drugs?" Violence ensues. Security is called.

**Teaching Point**: Grief manifests in many ways. You cannot control it. You can only be present.

---

### Organ Donation Arc

**If family consents**:
- Transplant coordinator is called
- Nick's organs can save multiple lives
- This provides meaning to a senseless death

**Kiara's Role**: Guide the family through processing before donation discussion

---

### Lessons Unlocked

**LESSON: "Brain Death Is Death"**
> There is no coming back. The body is breathing, but the person is gone.
> *Removes false hope penalties in similar cases*

**LESSON: "Same Drug, Different Fates"**
> Fentanyl doesn't discriminate. Timing and dose determine survival.
> *+2 to COMMUNICATION when discussing overdose with families*

---

## CASE PC015: "The Survivor" (Contrast Case)

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC015 |
| **Patient Name** | Jenna Holloway |
| **Age** | 19 |
| **Chief Complaint** | Unresponsive, brought by roommate |
| **Actual Diagnosis** | Fentanyl-laced Xanax overdose |
| **Difficulty** | Easy (medical) / Medium (social) |
| **Teaching Focus** | Narcan response, harm reduction, public health messaging |

### The Setup

**Presentation**: Roommate drives her to the ED, panicked. Jenna is unresponsive.

**Examination**:
- Pinpoint pupils
- Barely breathing
- Roommate: "She just took half a Xanax to sleep!"

**Treatment**: Single Narcan spray → immediate response

---

### The Conversation After

**Jenna**: "I just took half a Xanax. That's not nothing."

**Teaching Moment**:
> "You should text your friends. Hell, you should text your whole college. Tell anyone who will listen to not take pills without a real prescription unless they want to end up here. Fentanyl is everywhere. It's in everything on the street these days."

---

### The Collision

**Scene**: Jenna is recovering when Nick's father (John) sees her.

> "Did you give my son drugs?"
> "Your son gave ME the drugs, a**hole."
> [Violence, security called]

**Teaching Point**: These two cases intersect. One survives, one doesn't. The survivor faces the survivor's guilt.

---

### Lessons Unlocked

**LESSON: "One Spray Away"**
> Sometimes Narcan works instantly. Sometimes it doesn't work at all.
> *+1 to COMPOSURE when Narcan fails*

**LESSON: "The Messenger"**
> Survivors can become advocates. Use the moment.
> *+1 to ADVOCACY when counseling OD survivors*

---

## CASE PC016: "The Code That Wouldn't Die"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC016 |
| **Patient Name** | Bennet Milton |
| **Age** | 58 |
| **Chief Complaint** | Gallstone pain (apparent) |
| **Actual Diagnosis** | Unstable angina → sudden cardiac arrest |
| **Difficulty** | Impossible (death is inevitable) |
| **Teaching Focus** | First patient death, processing grief, M&M debrief |

### The Setup

This is the **"Hallway Death"** — a patient who dies while waiting, unmonitored.

**Presenting Complaint**: Right upper quadrant pain after steak dinner
**Assessment**: Gallstone on POCUS, EKG normal, HEART score 3
**Plan**: Labs, discharge with follow-up

**The Reality**: His abdominal pain was unstable angina. He arrests in the hallway.

---

### The Code

**Whitaker** performs CPR for 20+ minutes. Refuses to stop.

> "One more minute, please."
> "Five minutes since the last epi."
> "That could do it."

**Outcome**: Asystole. Time of death called.

---

### The Debrief (with Kiara)

**Purpose**: Process the death, identify what went well, accept what couldn't be changed.

**What went well**:
- Checked for reversible causes on ultrasound
- EKG was done, troponin checked
- HEART score of 3 = low risk, standard of care to discharge

**What couldn't be changed**:
- His coronary artery disease was silent
- No indication for cardiac monitoring
- This was his day to die

---

### Staff Support

**Jimmy to Whitaker**:
> "This was not your fault. This was nobody's fault. No doctor on the planet could have caught this."
> "It sucks, but today was this guy's day to leave this mortal coil. 150,000 people die every day in the world, and you got one of them. You learn to live with it."

**Samira to Whitaker**:
> "Unfortunately, it comes with the job. If it's any consolation, I just got scolded for going too slow."

---

### Lessons Unlocked

**LESSON: "Not Every Death Is A Failure"**
> Sometimes you do everything right and they still die.
> *Removes COMPOSURE penalty for deaths with correct workup*

**LESSON: "Debrief Heals"**
> Talking about it with colleagues helps. Silence makes it worse.
> *+1 to HUMANITY after participating in M&M conferences*

---

---

## CASE PC017: "Why Won't She Stop Crying?"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC017 |
| **Patient Name** | Baby Amelia Torres |
| **Age** | 5 months |
| **Chief Complaint** | Irritable, won't stop crying |
| **Actual Diagnosis** | Hair tourniquet syndrome |
| **Difficulty** | Medium |
| **Teaching Focus** | Complete physical exam, thinking beyond the obvious |

### The Setup

**Presentation**: Exhausted mother brings in inconsolable infant. No fever, good feeding, normal delivery. All vaccines up to date.

**The Trap**: You start thinking about serious bacterial infections — sepsis, meningitis, pneumonia. You order a rectal temp, consider an LP.

**The Reality**: A single strand of mother's hair has wrapped around the baby's toe, cutting off circulation.

---

### The Discovery

**Physical Exam Sequence**:
1. Fontanelle: soft and flat ✓
2. Pupils: equal, reactive ✓
3. Mucous membranes: moist ✓
4. Lungs: clear (hard to hear over crying) ✓
5. Heart: tachy but normal ✓
6. Abdomen: soft, non-tender ✓
7. **Extremities**: Check fingers and toes...

> **DR. ROBBY**: "Hair tourniquet. Mother's wet hair can wrap around the toe multiple times. When it dries, it tightens and cuts off circulation."

---

### Treatment

**Question**: How do you remove it?

**Answer**: 
> "It's too tight for scissors. Do we have Nair?"
> "We do indeed."

The Nair dissolves the hair. Crying stops immediately.

---

### Lessons Unlocked

**LESSON: "Always Check the Extremities"**
> Fingers and toes can hide the diagnosis.
> *Automatic reminder to check extremities on crying infant cases*

**LESSON: "Simple Answers Exist"**
> Not every case needs an LP.
> *+1 to DIFFERENTIAL when considering non-invasive diagnoses*

---

## CASE PC018: "My Daughter Has Stomach Pain"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC018 |
| **Patient Name** | Jia Yi Chen |
| **Age** | 12 |
| **Chief Complaint** | 6 weeks of suprapubic pain |
| **Actual Diagnosis** | Imperforate hymen with hematocolpos |
| **Difficulty** | Medium |
| **Teaching Focus** | Primary amenorrhea, pelvic exam in adolescents, sensitive communication |

### The Setup

**History**:
- 6 weeks of constant suprapubic pain
- Progressive: started as 2/10, now 7/10
- No fever, dysuria, nausea, vomiting, diarrhea
- No vaginal discharge
- Urine pregnancy test: NEGATIVE
- **Never had a menstrual period** (friends have theirs)

**Father's Reaction to Pregnancy Test**:
> "A pregnancy test? Of course it's negative. She has a stomachache."

---

### The Discovery

**Physical Examination**:
- Secondary sexual characteristics present (breast development, widening hips)
- Primary amenorrhea (no periods despite age-appropriate development)
- Pelvic exam reveals: **bulging, violaceous membrane blocking vaginal opening**

**Diagnosis**: Imperforate hymen with ~3 months of accumulated menstrual blood

---

### Sensitive Communication

**The Father**: Single dad, wife died of colon cancer when Jia Yi was 6. Doing his best.

> "Her mother would have known what to do."

**Your Response**:
> "I'm sure you do great. She's going to be fine."

**The Fix**: Minor outpatient surgery by gynecology. Complete cure.

---

### Lessons Unlocked

**LESSON: "Primary Amenorrhea Has Causes"**
> When periods don't start, there's a reason.
> *+1 to PATHOPHYSIOLOGY for developmental diagnoses*

**LESSON: "Parents Need Reassurance Too"**
> Especially single parents carrying the weight alone.
> *+1 to BEDSIDE when speaking with single parents*

---

## CASE PC019: "The Sommelier"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC019 |
| **Patient Name** | Tasha Cordera |
| **Age** | 34 |
| **Chief Complaint** | Laceration to forearm |
| **Actual Diagnosis** | Simple laceration requiring sutures |
| **Difficulty** | Easy (medical) |
| **Teaching Focus** | Suturing technique, patient rapport, gender-affirming care |

### The Setup

**Presentation**: Patient cut arm on a Baccarat crystal decanter while demonstrating polishing technique.

**The Twist**: Registration listed the patient as "Mr." Patient presents as female.

---

### Suturing Teaching

**Dr. McKay's Instructions**:
1. "Take it in two bites"
2. "Rotate your wrist, follow the curve of the needle"
3. "Exit at 90 degrees, same distance from the wound"
4. "First tie is a surgeon's knot — wrap twice, grab short end"
5. "Pull with just enough tension to bring wound edges together"
6. "Not too tight or she'll have railroad tracks"
7. "Three more instrument ties, square knots, single wrap"

---

### The Misgendering Fix

**Javadi notices the chart error**:
> "I couldn't help but notice. There's a misgendering error on your chart. I'm really sorry about that. I've gone ahead and fixed it here and on your insurance data file. It shouldn't happen again."

**Tasha's Response**:
> "Wow. I am... Thank you. Truly."

**McKay to Javadi after**:
> "That was cool. Didn't think to check that. Good catch."

---

### Lessons Unlocked

**LESSON: "Charts Can Be Wrong"**
> Always verify. Small corrections matter enormously.
> *+2 to BEDSIDE with LGBTQ+ patients after catching documentation errors*

**LESSON: "Suturing Fundamentals"**
> You closed a wound. You'll remember how.
> *Unlocks basic suturing skill*

---

## CASE PC020: "The BiPAP Mistake"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC020 |
| **Patient Name** | Wendell "Stone" Stone |
| **Age** | 52 |
| **Chief Complaint** | Chest trauma (speaker tower fell on him) |
| **Actual Diagnosis** | Flail chest with small pneumothorax → tension pneumothorax |
| **Difficulty** | Hard |
| **Teaching Focus** | Knowing your limits, running orders by seniors, learning from mistakes |

### The Setup

**Presentation**: Chief rigger at music festival. Speaker tower collapse. 
- Multiple rib fractures, flail chest
- Small pneumothorax on CT
- Pain controlled with serratus anterior block
- Sats dropping to 85%

**The Mistake**: Intern (Santos) orders BiPAP to help with hypoxia. Does NOT run it by the attending.

---

### The Crisis

**BiPAP's positive pressure forces air through the lung injury**:
- Sats crash to 78%
- BP crashes: systolic 82
- Tracheal deviation to the right
- Absent breath sounds on left
- **TENSION PNEUMOTHORAX**

**The Save**: Finger thoracostomy (needle decompression through existing chest wall)

> *[HISSING sound as trapped air escapes]*
> "You hear that?"

---

### The Lecture

**DR. GARCIA**: "Who the hell ordered BiPAP? Are you f*cking kidding me?"

**DR. ROBBY** (defending Santos): "Honest mistake from the rookie. That's how we learn. If she knew everything, she'd be your attending, not an intern."

**But also to Santos**: "You need to run every order by a senior resident or attending. That's why it's a four-year program."

---

### Lessons Unlocked

**LESSON: "BiPAP Can Kill"**
> Positive pressure + compromised lung = tension pneumothorax
> *Warning appears when ordering BiPAP on chest trauma*

**LESSON: "Run It By Someone"**
> You don't know what you don't know yet.
> *HIERARCHY check required before certain high-risk orders*

**LESSON: "Mistakes Are Inevitable"**
> You will make them. Own them. Learn from them.
> *-1 to COMPOSURE penalty after admitting mistakes*

---

## CASE PC021: "The Kraken"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC021 |
| **Patient Name** | Mr. Krakozhia |
| **Age** | Unknown |
| **Chief Complaint** | Methamphetamine-induced psychosis (boarding) |
| **Actual Diagnosis** | Psych hold, agitation |
| **Difficulty** | N/A (procedural) |
| **Teaching Focus** | Team restraint, chemical sedation, earning your "yellow wings" |

### The Context

**The Kraken** is a long-term boarder — a psych patient waiting for an inpatient bed. He's been in the ED for days. Meth-induced psychosis. Violent when awake.

**The Problem**: Psych wanted to transition him to oral meds. The 9:30 AM olanzapine was missed because staff was busy with critical patients. Now he's awake and screaming.

---

### The Takedown

**Team Assembly**:
- Perlah: Head
- Larry: Left leg
- Donahue: Right leg
- Kim: Right arm
- Dana: Left arm
- **Whitaker: Injection**

**The Play**:
> "Larry and I are gonna block for you. Come in right behind us. When we split and go for his legs, you go right up the middle. End zone, baby."

**The Injection**: IM midazolam + Haldol to mid-anterior left thigh

**The Result**: Patient sedated within 60 seconds. Monitor for 20 minutes.

---

### Yellow Wings

**DANA** (to Whitaker, covered in patient's sweat): "Congrats, kid. You just earned your yellow wings."

**Meaning**: First successful participation in a psych restraint/sedation. A rite of passage.

---

### Lessons Unlocked

**LESSON: "Yellow Wings"**
> You helped take down a violent patient. You're part of the team now.
> *+1 to TEAMWORK with nursing staff permanently*

**LESSON: "Stay on Top of Med Schedules"**
> Missed psych meds lead to avoidable crises.
> *Unlocks awareness of boarding patient medication timing*

---

## TEACHING MOMENT: The Ho'oponopono

### "The Four Things That Matter Most"

**Context**: Mr. Spencer is dying. His children don't know what to say. Dr. Robby teaches them a Hawaiian ritual.

**THE FOUR STATEMENTS**:
1. **I love you.**
2. **Thank you.**
3. **I forgive you.**
4. **Please forgive me.**

> "They're gonna sound really simple, but I swear I've seen them work."

---

### In Practice

**Jereme (the son)** uses them easily — he had a good relationship with his father.

**Helen (the daughter)** struggles — she was embarrassed by her father, stayed away, feels guilty:

> "I forgive you, Dad, for not being the man that I wanted you to be. But I am so grateful that you weren't. The world needed you to be exactly as you are."

> "Please, please forgive me."

---

### Application in Game

When a patient is dying and family is present, the player can:
- Suggest the ho'oponopono ritual (EMPATHY DC 8)
- Simply be present and silent
- Leave the family alone

**Choosing to teach it**: Builds HUMANITY, creates a meaningful death scene

---

---

## CASE PC022: "Trust Your Senior"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC022 |
| **Patient Name** | Mr. Marino |
| **Age** | ~40s |
| **Chief Complaint** | Seizure in waiting room |
| **Actual Diagnosis** | Status epilepticus |
| **Difficulty** | Medium |
| **Teaching Focus** | Trusting senior residents, medication dosing, hierarchy |

### The Setup

**Presentation**: Patient seizes in the waiting room. No warning, no prior history. Brought back immediately.

**Initial Treatment**: 4mg lorazepam IV → no response

**The Conflict**: How much more lorazepam before switching to Keppra?

---

### The Disagreement

**Santos (Intern)**: Wants to switch to Keppra after 8mg lorazepam
> "He's already had 8 milligrams. He'll stop breathing."

**Langdon (R3)**: Wants to give more lorazepam
> "Sometimes a patient needs a little more."

**Dr. Robby (Attending)**: "Dr. Langdon's patient, Dr. Langdon's call."

---

### The Outcome

10mg total lorazepam → **seizure stops**

> "Now we can do a Keppra load slowly and safely."

**Langdon to Santos afterward**:
> "Because you're an intern who also needs to learn to trust her senior resident, especially in front of an attending."

---

### Lessons Unlocked

**LESSON: "Sometimes They Need More"**
> Textbook doses aren't always enough. Experience teaches what textbooks can't.
> *Unlocks flexibility in medication dosing for senior residents*

**LESSON: "Don't Undermine Your Senior"**
> Even if you disagree, the hierarchy exists for reasons.
> *-2 to HIERARCHY if you argue with senior in front of attending*

---

## CASE PC023: "The Hidden Bleeder"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC023 |
| **Patient Name** | Bob Chazen |
| **Age** | 53 |
| **Chief Complaint** | Leg wound from mountain biking |
| **Actual Diagnosis** | Arterial pumper under blood blister |
| **Difficulty** | Medium (procedural) |
| **Teaching Focus** | Procedural complications, staying calm, redemption |

### The Setup

**History**: 53-year-old cyclist, injured leg 10 days ago in Moab. Using Neosporin. Now hurts to walk.

**Assessment**: Cellulitic wound with what appears to be "simple hematoma"

**Plan**: Debride the dead skin covering the blister

---

### The Complication

**Whitaker punctures the top of the blood blister...**

> [ARTERIAL SPRAY]
> "Help! Do something, man!"

**Hidden underneath**: A cut arteriole, still bleeding

---

### The Save

**Dr. King arrives**:
1. BP cuff on as tourniquet (inflate to 180mmHg)
2. Lidocaine with epinephrine to constrict vessels
3. Figure-of-eight suture around the bleeder

**Teaching**: "Nice work. There was a cut arteriole under a ballotable vesicle. If Mr. Chazen had gone home without debridement, the blister could have eroded with uncontrollable hemorrhage."

---

### Lessons Unlocked

**LESSON: "Expect the Unexpected"**
> What looks simple can hide danger underneath.
> *+1 to PATHOPHYSIOLOGY when assessing wounds*

**LESSON: "Figure-of-Eight Suture"**
> Two stitches in one. Anterior, then posterior, then tie.
> *Unlocks hemostatic suturing technique*

---

## CASE PC024: "Post-Tonsillectomy Hemorrhage"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC024 |
| **Patient Name** | Travis Johnson |
| **Age** | 17 |
| **Chief Complaint** | Spitting blood |
| **Actual Diagnosis** | Post-tonsillectomy hemorrhage |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Difficult airway, retrograde intubation, inter-hospital politics |

### The Setup

**History**: Tonsillectomy 10 days ago at **St. Michael's** (different hospital). Started spitting blood an hour ago. Parents in Baltimore.

**Initial Treatment**: Nebulized TXA → bleeding stops temporarily

**The Problem**: St. Michael's Head & Neck surgery **refuses to come see him**.
> "They said it's not their job to fix another hospital's problem."

---

### The Crisis

**Bleeder reopens**. Massive hemorrhage.

- Sats dropping: 97 → 94 → 90 → 87 → 84
- Can't visualize cords — too much blood
- Sponge stick in place for direct pressure, but blocks view
- Bougie fails
- **Crike tray opened**

---

### The Retrograde Intubation

**Dr. Langdon proposes**:
> "We take a needle, put it in the cricothyroid. We run a guide wire up and out the mouth, and we slide the ET tube over the wire."

**Garcia (Surgery)**: "You got one shot, and then I cut."

**Sequence**:
1. Needle through cricothyroid membrane
2. Guide wire threaded up
3. Wire emerges from mouth
4. ET tube threaded over wire, down into trachea
5. Wire removed
6. Bag patient

**Result**: Sats recover. Airway secured. Patient goes to OR.

---

### The Legacy

> "Retrograde intubation, that's an Adamson special. I learned that from the best."

**Dr. Adamson** — Robby's mentor who died during COVID. His techniques live on.

---

### Lessons Unlocked

**LESSON: "Retrograde Intubation"**
> When you can't see, go from below.
> *Unlocks advanced airway technique*

**LESSON: "Inter-Hospital Politics"**
> Other hospitals may refuse to help. You're on your own.
> *Awareness of systemic barriers*

---

## CASE PC025: "Caregiver Fatigue"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC025 |
| **Patient Name** | Ginger Kitajima |
| **Age** | ~70s |
| **Chief Complaint** | Fell in rose bush, hurt arm |
| **Actual Diagnosis** | Proximal humerus fracture |
| **Difficulty** | Easy (medical) / Hard (social) |
| **Teaching Focus** | Caregiver fatigue, possible patient abandonment |

### The Setup

**History**: Elderly woman with schizophrenia (on risperidone). Lives alone with daughter Rita, who is sole caregiver. Fell in yard while Rita was showering.

**Medical Findings**: Non-displaced proximal humerus fracture. No surgery needed. Sling for 6 weeks.

**The Problem**: Rita is exhausted. Hasn't slept through the night in months. Now her mother needs even MORE help.

---

### The Warning Signs

> "I can't even remember the last time I slept through the night."
> "It never ends."
> "I wish I had support at home. It's just us."

**Dr. King's advice**: Caretaker fatigue is real. You have to take care of yourself. Otherwise you'll end up in here too.

---

### The Disappearance

Rita goes to park the car. She doesn't come back.

> "She went to park the car. Shouldn't have been more than five minutes."
> [Phone goes straight to voicemail]

**Dana**: "Sole caretaker, overwhelmed, exhausted. You don't think she ditched her mom, do you?"
**King**: "I mean... it happens."

---

### Lessons Unlocked

**LESSON: "Caregiver Fatigue Is Real"**
> The person who cares for the patient may be breaking down too.
> *+1 to EMPATHY when speaking with primary caregivers*

**LESSON: "People Disappear"**
> Sometimes family members leave. You can't force them to stay.
> *Removes COMPOSURE penalty for patient abandonment cases*

---

## CASE PC026: "The Reversal"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC026 |
| **Patient Name** | Kristi Wheeler |
| **Age** | 17 |
| **Chief Complaint** | Scheduled medication abortion |
| **Actual Diagnosis** | N/A (procedure halted) |
| **Difficulty** | N/A (ethical/legal) |
| **Teaching Focus** | Parental consent, legal barriers, ethical complexity |

### The Arc

**Continuation from Episode 104**:
- Kristi missed her appointment
- Returned with "mom" (actually aunt Lynette)
- Dr. Robby remeasured gestational age, found her at 10w6d (within limit)
- Began medication abortion protocol

**The Twist**: Kristi's **real mother** arrives.

> "What the hell are you doing here?"
> "Mom, I want this. This is my decision."
> "My daughter is a minor, so she can't get this abortion without my say-so, right?"

**The Law**: Correct. Parental consent required for minors.

> "Then there is no way this is happening. Not now, not ever."

---

### The Ethical Knot

| Party | Position |
|-------|----------|
| **Kristi** | Wants the abortion |
| **Aunt Lynette** | Supported Kristi, posed as mom |
| **Real Mom** | Refuses consent |
| **Dr. Robby** | Already began protocol, now must stop |
| **Dr. Collins** | Erased her chart to let Robby take over |

**No clean answer**. The case ends unresolved.

---

### Lessons Unlocked

**LESSON: "Legal Barriers Are Real"**
> Even when you want to help, the law may prevent it.
> *Understanding of consent requirements for minors*

**LESSON: "Verify Identity"**
> The person claiming to be "mom" might not be.
> *Awareness of identity verification in sensitive cases*

---

## TEACHING MOMENT: Impact Over Intent

### McKay's Lesson to Whitaker

**Context**: Sherry (the Sterno mom) returned for wound care. Whitaker tried to connect with her, shared his own story, then called in social services without asking.

**Sherry's reaction**:
> "You told her?"
> "Enough! I don't need your help."

**McKay afterward**:
> "You ever heard of impact over intent? I would never intentionally embarrass anybody. But you did."
> "You didn't have a conversation with Sherry or ask her what she needed. Instead, you walked in and told her what to do."
> "You gotta slow down, take a beat, and listen instead of judging people."

---

### McKay's Backstory

**She reveals to Sherry**:
- Used to be an addict
- Lost custody of her son
- Went through very dark times
- Sober 9 years, 2 months, and 14 days
- Wears an ankle monitor (unrelated legal issue)
- Joint custody returning next week

**Teaching Point**: Not everybody has it figured out. Doctors struggle too.

---

### Application in Game

**If player calls in social services without patient consent**:
- Patient may leave
- Relationship damaged
- Teaching moment from mentor

**Better approach**:
- Ask what the patient needs
- Build trust first
- Offer resources, don't impose them

---

---

## CASE PC027: "The Donation"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC027 |
| **Patient Name** | Nick Bradley |
| **Age** | 18 |
| **Chief Complaint** | Fentanyl overdose (continuation) |
| **Actual Diagnosis** | Brain death confirmed |
| **Difficulty** | N/A (emotional/ethical) |
| **Teaching Focus** | Organ donation, family support, grief |

### The Arc Concludes

**Episode 106**: Nick's cerebral perfusion study returns. No blood flow past the brain stem.

**Showing the Results**:
> "This is a healthy brain. See the black? That's blood flowing to the cerebrum. When there's no blood flow... it's white."

**The Declaration**: "He's brain-dead."

---

### The Organ Donation Conversation

**Emma Isaacs** (family support specialist) leads:
> "Your son's driver's license indicated that he wanted to be an organ and tissue donor upon death."

**Mother's Response**:
> "No! You didn't know him! He is still my son!"
> "He was too young to make that kind of decision."

**The Reality**: He was 18. Legally an adult. His wishes are documented.

**Outcome**: Parents need more time. The conversation pauses.

---

### Teaching Points

1. **Showing the scan** helps families understand what "brain death" means
2. **Organ donation** is legally the patient's choice if documented, but families often resist
3. **More time** is sometimes the only thing you can offer
4. **Family support specialists** like Emma handle this better than physicians

---

### Lessons Unlocked

**LESSON: "The White Scan"**
> When the brain has no blood flow, the scan shows white instead of black.
> *Unlocks ability to explain brain death to families*

**LESSON: "Donor Wishes"**
> The patient's documented wishes matter, even when families resist.
> *Awareness of organ donation protocols*

---

## CASE PC028: "The Ambulance Thieves"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC028 |
| **Patient Name** | Miles Hernandez |
| **Age** | 18 |
| **Chief Complaint** | MVA — stolen ambulance versus tree |
| **Actual Diagnosis** | Sternoclavicular dislocation, posterior hip dislocation |
| **Difficulty** | Hard |
| **Teaching Focus** | Rare injuries, procedural skills, "why did they do this?" |

### The Setup

**Background**: Two frat boys stole the ambulance as a prank. Police chased them. They crashed.

**Injuries**:
- Miles (driver): Sternoclavicular dislocation compressing trachea, posterior hip dislocation
- Zac (passenger): Minor lacerations

---

### The Sternoclavicular Reduction

**The Problem**: Clavicle dislocated posteriorly, pushing against trachea. Patient can barely breathe.

**The Fix**:
1. Chlorhexidine swab
2. Local anesthetic injection
3. **Towel clip** — "Go deep. Get a really good grip on both sides of that bone."
4. Pull up sharply

> [CRACKING, POPS]
> "Oh, m*therf*cker!"
> "Screaming is good."

---

### Captain Morgan Hip Reduction

**Setup**: Posterior hip dislocation with intact pedal pulse.

**Technique**:
1. Patient supine, affected leg flexed
2. Physician stands on bed
3. Place your leg behind patient's knee as a hinge
4. Apply anterior force to femur using leg
5. Push down on lower leg

> "This is the Captain Morgan technique for hip reduction."
> "Who's Captain Morgan?"
> "The guy on the rum bottle?"

---

### The Motivation

**Zac explains**:
> "We were gonna drive it and bring it back to campus. I wanted the guys to see Miles, think he was cool. He has a hard time. He doesn't really fit in."

**Collins**: "That's actually kind of sweet."

---

### Lessons Unlocked

**LESSON: "Towel Clip Reduction"**
> For sternoclavicular dislocations, grip with a towel clip and pull.
> *Unlocks rare but critical procedural skill*

**LESSON: "Captain Morgan"**
> Hip reduction using your leg as a hinge. Physics.
> *Unlocks hip reduction technique*

---

## CASE PC029: "The Worm Graveyard"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC029 |
| **Patient Name** | Joseph Marino |
| **Age** | ~40s |
| **Chief Complaint** | Seizure (continuation) |
| **Actual Diagnosis** | Neurocysticercosis |
| **Difficulty** | Medium |
| **Teaching Focus** | Delivering difficult diagnoses, patient communication |

### The Setup

**From Episode 105**: Joseph had a seizure in the waiting room. Treated with lorazepam. Sent for head CT.

**Episode 106**: CT results return showing neurocysticercosis.

---

### Delivering the News

**Langdon explains**:
> "You had larva from a pork tapeworm that made multiple cysts, but they're all dead now."

**Patient's reaction**:
> "A worm? In my f*cking head? Are you kidding me?"
> "Is my brain like Swiss cheese? Am I dying?"

**Clarification**:
> "The cysts are tiny and calcified. There'll be no further damage."

**Patient**: "So there's gonna be a worm graveyard in my brain forever?"

**Langdon**: "Yeah, but they're resting in peace."

---

### Teaching Points

1. **Anticipate the reaction** — This diagnosis sounds terrifying
2. **Clarify repeatedly** — "Had," not "have"
3. **Use humor carefully** — "Resting in peace" helps some patients
4. **The prognosis is good** — Calcified cysts don't cause more damage

---

### Lessons Unlocked

**LESSON: "Scary Diagnoses Need Context"**
> When the diagnosis sounds worse than the prognosis, explain thoroughly.
> *+1 to COMMUNICATION for frightening-sounding diagnoses*

---

## CASE PC030: "The Torsion"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC030 |
| **Patient Name** | Dillon |
| **Age** | ~15 |
| **Chief Complaint** | Severe scrotal pain |
| **Actual Diagnosis** | Testicular torsion |
| **Difficulty** | Medium |
| **Teaching Focus** | Time-sensitive diagnosis, manual detorsion, patient rapport |

### The Setup

**Presentation**: Teen arrives in triage with sudden-onset severe scrotal pain. No trauma.

**Urgency**: If untreated for more than 6 hours, he could lose the testicle.

---

### The Exam and Treatment

**Collins performs ultrasound**: No blood flow to testicle.

**Manual Detorsion**:
> "Most of the time, the torsion is to the inside, so we rotate outward by opening the book."

**First attempt**: [YELLING] — Wrong direction

**Second attempt**: Rotate back 180, then 180 the other way.

> "That feels good. I think I'm OK now."

**Result**: Torsion reduced. Patient needs surgery to tack testicle down.

---

### The Mother (Tina)

**Supportive, present, engaged**:
> "This is the doctor you want. I promise you."
> "He is my heart in human form."

**To Collins**: "Please let me know when you get your own office because you have been wonderful."

---

### Lessons Unlocked

**LESSON: "Open the Book"**
> Testicular torsion usually goes inward, so rotate outward to reduce.
> *Unlocks manual detorsion technique*

**LESSON: "Time-Sensitive Genitourinary"**
> 6 hours to save a testicle. Don't delay.

---

## CASE PC031: "The TikTok Guy"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC031 |
| **Patient Name** | Chanel Sutton |
| **Age** | 22 |
| **Chief Complaint** | Complications from cosmetic procedure |
| **Actual Diagnosis** | Silicone injection complications, possible PE |
| **Difficulty** | Medium |
| **Teaching Focus** | Social media-driven medical decisions, PE workup |

### The Setup

**History**: Chanel found a guy on TikTok who does silicone butt injections in his living room. He may have used silicone caulk from Home Depot.

**Presentation**: Tachycardic, tachypneic, anxious.

**Differential**:
- Panic attack (likely)
- Pulmonary embolism (if silicone hit a vein)

**Plan**: CT scan to rule out PE

---

### Teaching Points

1. **Social media drives dangerous decisions** — "Kids today"
2. **Panic can mask PE** — Scan anyway
3. **Underground cosmetic procedures** are increasingly common
4. **Document everything** — Legal implications

---

## CASE PC032: "The Scalpel Accident"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC032 |
| **Patient Name** | Dr. Garcia (staff) |
| **Age** | N/A |
| **Chief Complaint** | Scalpel through foot |
| **Actual Diagnosis** | Penetrating foot wound |
| **Difficulty** | N/A (procedural complication) |
| **Teaching Focus** | Handling complications, sharps safety |

### The Incident

**During Silas Dunn's chest tube placement...**

Santos drops the scalpel. It sticks into Garcia's foot.

> "f*ck!"
> "Leave it!"
> "I got this. On my own."

**Santos continues the procedure** despite the accident. Completes the chest tube.

---

### The Aftermath

**Garcia to Santos**:
> "You're confident. That's good. But there's a fine line between confidence and cockiness."

**Protocol**: Both need HIV and hepatitis panels drawn.

**Santos offers to suture**: "Hell, no. I'll do it myself. You can assist."

---

### The Lounge Conversation

**Santos**: "I just didn't get to do my chest tube."
**Whitaker**: "At least I didn't k*ll anyone."
**Santos**: "Day's only half over."

---

### Lessons Unlocked

**LESSON: "Sharps Safety"**
> You will drop a scalpel eventually. Prepare for it.
> *Awareness of sharps injury protocols*

**LESSON: "Finish the Procedure"**
> Even when things go wrong, the patient comes first.
> *+1 to COMPOSURE during procedural complications*

---

## TEACHING MOMENT: ECQ America

### The Corporate Threat

**Scene**: Gloria introduces Dr. Tracy Morris from ECQ America, a contract management company that runs 500+ ERs.

**The Pitch**:
> "We're interested in having your emergency department join us."
> "Your hospital's board was very impressed with ECQ's metrics on patient satisfaction, throughput time, and billing collections."

**Robby's Concerns**:
> "Your corporate mandate is profits for shareholders above everything else, yes?"
> "Does your proposal include the part where you cut the pay for all my doctors?"

**The Bribe**:
> "How does regional medical director sound? Lighter workload, better benefits, stock options."

**Gloria's Warning**:
> "I need you to improve scores with the resources we have, or we will explore what ECQ has to offer."

---

### Mechanic Application

**Administration Events**: Periodically, the player faces metrics pressure from above. Improve satisfaction scores or face consequences.

**OFI** = "Opportunities for Improvement" (administrator-speak for "do better with less")

---

---

## CASE PC033: "The ECMO"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC033 |
| **Patient Name** | Harvey Chang |
| **Age** | ~50s |
| **Chief Complaint** | 10 minutes of substernal chest pain with diaphoresis |
| **Actual Diagnosis** | Anterior STEMI with V-fib arrest |
| **Difficulty** | Very Hard |
| **Teaching Focus** | V-fib management, ECMO, waiting for outcomes |

### The Setup

**Presentation**: Brought in by coworker. Substernal chest pain, diaphoresis. Anterior STEMI on triage EKG.

**Patient's Attitude**:
> "My wife died a year ago. I guess today is the day I'll be joining her."

**Robby**: "That is not part of our plan."

---

### The Arrest

**V-fib arrest**. Compressions begin.

**Management**:
1. Shock to 200 → Still V-fib
2. LUCAS mechanical compressions
3. Epi and amio
4. Double sequential defibrillation ("one-two punch") → Still V-fib
5. **Activate ECMO**

---

### ECMO Teaching

> "We treat this like a sterile surgical procedure. We can't introduce bacteria into the circuit."

**The Circuit**:
- Garden hose from right femoral vein → ECMO machine for oxygen → Pumped back into left femoral artery
- ECMO does all the work of heart and lungs
- Once blocked artery opened, heart can restart

**The Wait**:
> "What do you want to do?"
> "We wait. We f*cking wait."

**The Conflict**: A 12-year-old needs the ECMO. Harvey has been on it for 17 days.

---

### Lessons Unlocked

**LESSON: "ECMO Fundamentals"**
> Venous blood out, into machine for oxygen, pumped back arterial
> *Unlocks understanding of ECMO mechanics*

**LESSON: "The Waiting Game"**
> Sometimes there's nothing left to do but wait.
> *COMPOSURE check when outcomes are uncertain*

---

## CASE PC034: "The Face Cream"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC034 |
| **Patient Name** | Nandi |
| **Age** | ~20s |
| **Chief Complaint** | Psychotic behavior, wandering into traffic |
| **Actual Diagnosis** | Mercury poisoning from imported face cream |
| **Difficulty** | Hard |
| **Teaching Focus** | Listen to your patient, zebra hunting, toxicology |

### The Setup

**Presentation**: Roommate found her wandering into traffic, yelling at cars. Pulled out of intersection.

**Initial Assessment**: Possible new-onset schizophrenia (right age range)

**Symptoms**:
- Afraid of people coming after her
- Doesn't feel safe at home
- Worried all the time
- Trouble sleeping
- Hand tremors
- Feet go numb
- Doesn't recognize herself in mirror
- Feels like she's in a dream

---

### The Workup

**Standard workup**: Chem panel, CBC, TSH, drug screen, hCG — all normal

**Head CT**: Normal

**Robby's call**: "Psych can't refuse her now."

**But Mohan persists**:
> "She keeps saying something's wrong. It doesn't feel right to me."

---

### The Catch

**Collins advises**: "Listen to your patient. That is your superpower."

**Mohan investigates**: Nandi is a beauty influencer. Uses imported skincare products.

**The Discovery**: Face cream from Asia with high mercury content. Listed on FDA website as dangerous.

**Order**: Heavy metal panel for mercury, lead, arsenic.

---

### The Conflict

**Langdon is furious**: "I cleared her for psych. You overrode me?"

**Collins**: "If Samira put in an order, there was a reason. I trust her."

**Robby later**: "You are enabling her." → Major fight ensues.

---

### Lessons Unlocked

**LESSON: "Listen to Your Patient"**
> When they say something's wrong, believe them.
> *+1 to DIFFERENTIAL when patient insists on symptoms*

**LESSON: "Zebra Hunting (When Appropriate)"**
> Sometimes the rare diagnosis is the right one.
> *Unlocks awareness of toxic causes for psychiatric presentations*

---

## CASE PC035: "The Table Tennis Player"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC035 |
| **Patient Name** | Terrence |
| **Age** | Adult |
| **Chief Complaint** | "Everted" ankle playing table tennis |
| **Actual Diagnosis** | Second-degree ankle sprain |
| **Difficulty** | Easy (medical) |
| **Teaching Focus** | Communicating with autistic patients |

### The Setup

**Presentation**: Terrence arrives with ankle injury. Immediately challenges Langdon.

> "Could it be a Jones fracture or a dancer's fracture?"
> "Shouldn't you take a complete history on the present illness first?"
> "You didn't ask me if I felt a pop or a snap."

**Langdon gives up**: "Why don't I get you some fresh ice?"

---

### Mel's Approach

**She notices**: Past medical history includes autism diagnosis.

**She adjusts**:
1. Dims the lights ("It's a little bright in here")
2. Turns off beeping monitors
3. Asks open-ended questions: "What worries you the most?"
4. Listens to his main concern: Table tennis tournament in 6 weeks

**His Response**: Opens up about USATT ratings, South Park Table Tennis Club

---

### Visual Teaching

**Mel shows him an ankle diagram**:
> "Sometimes this tendon called peroneus brevis can pull off a piece of this bone, the fifth metatarsal. That's the dancer's fracture, right?"
> "Exactly."

**Result**: Patient walks around room, no serious injury. Ankle stirrup provided.

**Parting**: "Dr. King is a very good doctor."

---

### Lessons Unlocked

**LESSON: "Adjust Your Approach"**
> Autistic patients may need sensory adjustments and direct questions.
> *Unlocks modified communication style for neurodivergent patients*

**LESSON: "What Worries You Most?"**
> Start with the patient's main concern, not yours.
> *+1 to BEDSIDE when opening with patient's priorities*

---

## CASE PC036: "The Threat"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC036 |
| **Patient Name** | Silas Dunn |
| **Age** | 45 |
| **Chief Complaint** | Ladder fall (continuation) |
| **Actual Diagnosis** | Rib fractures, hemothorax (resolved) |
| **Difficulty** | N/A (ethical) |
| **Teaching Focus** | Mandated reporting, moral gray areas, taking action |

### The Arc

**Episode 106**: Wife revealed she's been putting progesterone in his coffee to "k*ll his libido." Suspects he's molesting their daughter Alana.

**Episode 107**: Santos tries to talk to Alana. She shuts down.

> "Has he ever done anything to you that didn't feel right?"
> "He's my dad."

---

### The Confrontation

**Santos visits Silas's room alone**:

> "I talked to your wife and daughter about your extracurricular activities."
> "It didn't say in your chart that you were a child molester."

**Personal angle**:
> "I know men like you... men you trust, men you look up to. First it's a kiss on the head, then it's the lips. A friendly massage becomes a hand under your shirt..."

**The Threat**:
> "You are never going to touch your daughter again. Officer Ahmad is going to arrest you. The only r*pe in your future will be the one you get in prison."
> "Blink twice if you agree to this, once if you want me to let you die."
> "I've already lost two patients today. One more is not gonna make a difference."

**Patient blinks twice**.

---

### The Ethics

**Is this appropriate?** No.

**Is it effective?** Maybe.

**Does it cross lines?** Absolutely.

**Would most players do it?** Yes.

---

### Lessons Unlocked

**LESSON: "Mandated Reporting Limits"**
> You can only report what you can prove.
> *Awareness of legal constraints on child abuse reporting*

**LESSON: "The Gray Zone"**
> Sometimes the rules don't protect the vulnerable.
> *COMPOSURE check when facing moral impossibilities*

---

## CASE PC037: "The Witness"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC037 |
| **Patient Name** | Sam Wallace |
| **Age** | ~40s |
| **Chief Complaint** | Head injury (extubation) |
| **Actual Diagnosis** | Good Samaritan with traumatic brain injury |
| **Difficulty** | N/A |
| **Teaching Focus** | Witness statements, connecting patients |

### The Reveal

**Sam wakes up**. Alert, good parameters. Ready for extubation.

**His question**: "What about the Asian lady? How's she doing?"

**The bombshell**: "Did the cops catch the guy who pushed her?"

> "She was pushed?"
> "Yeah. I saw it."

**Minu was not an accident victim. She was assaulted.**

---

### The Connection

**Sam asks to see Minu**. They meet before she goes to surgery.

**Sam**: "I'm gonna help cops find person who did this to you. They won't get away with this."

**Minu shows him her necklace**: "It's Vishnu, protector and guardian of the universe."

---

### Lessons Unlocked

**LESSON: "Patients Have Information"**
> Witnesses may know things you don't.
> *Reminder to interview all parties in trauma cases*

---

## CASE PC038: "The Resolution"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC038 |
| **Patient Name** | Kristi Wheeler |
| **Age** | 17 |
| **Chief Complaint** | Medication abortion (resolution) |
| **Actual Diagnosis** | N/A |
| **Difficulty** | N/A |
| **Teaching Focus** | Family dynamics, persuasion, resolution |

### The Arc Concludes

**Episode 107**: Kristi locked herself in bathroom. Collins talked to mom Eloise.

**Collins's Approach**:
> "Weren't you about the same age when you got pregnant with her?"
> "If you push her away, she might never come back."

**Mom's Realization**: About losing Kristi forever.

---

### The Outcome

**Mom consents**. Kristi takes the mifepristone.

> "Are you sure you want to do this?"
> "Yes."

**Collins**: "Second dose in 24 hours, then misoprostol. Good luck to both of you."

**Langdon**: "What'd you say to her?"
**Collins**: "Something about not losing Kristi forever."

---

### Lessons Unlocked

**LESSON: "Find the Angle"**
> Everyone has a pressure point. For Eloise, it was losing Kristi.
> *+1 to PERSUASION when identifying parent's core fear*

---

## TEACHING MOMENT: Robby's Breakdown

### The Supply Closet

**Episode ends with**:

Robby, alone in the supply closet. Shaking. Sobbing.

> [GROANS]
> [BREATHING SHAKILY]
> [SOBBING]
> [BANGS]

**No dialogue. No witnesses. Just collapse.**

---

### Context

Throughout Episode 107:
- Gloria pressured him about patient satisfaction
- Fought with Langdon ("No f*cking respect for your superiors")
- Nick Bradley's parents still can't decide on organ donation
- Harvey Chang on ECMO, uncertain if he'll make it
- Anniversary of Dr. Adamson's death
- "I've already lost two patients today"

**He's not fine. He never was.**

---

### Mechanic Application

Staff can reach breaking points. Even attendings. The game should show moments where authority figures are human.

---

---

## CASE PC039: "The Drowning"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC039 |
| **Patient Name** | Amber Phillips |
| **Age** | 6 |
| **Chief Complaint** | Found at bottom of home pool, unknown downtime |
| **Actual Diagnosis** | Drowning with severe hypothermia, fatal hyperkalemia |
| **Difficulty** | Very Hard (futile) |
| **Teaching Focus** | Pediatric resuscitation, hypothermia protocols, accepting death |

### The Setup

**Presentation**: 6-year-old found unresponsive at bottom of pool. Sister Bella fell in, Amber saved her, then couldn't get out herself.

**On Arrival**:
- Asystole on monitor
- Intubated with cuffed 4.5
- Core temp: 85°F (moderate hypothermia)
- CPR ongoing

---

### The Resuscitation

**Warming Protocol**:
- Warm IV fluids
- Arctic Sun pads (warm water circulation)
- Target: Core temp ≥90°F before defibrillation attempt

**The Wait**: Temperature rises slowly. 85 → 88 → 91°F.

**Father**: "Can you shock the heart now?"

**Robby**: "Her heart rhythm right now is flatlining. That's not treatable with a shock."

---

### The End

**Lab result**: Potassium 14.2

> "No one has ever survived a cardiac arrest with a potassium over 11. There is absolutely no chance of recovery."

**Time of death**: 14:51

---

### Bear

**Bella can't see Amber's body**. Mel brings a teddy bear from the gift shop.

> "If you tell Bear everything you want to tell Amber, then I'll take Bear and sit her on Amber's pillow, and then she'll tell her everything you said."

**Bella's message**:
> "Thank you for saving me. When you come home, I promise I won't touch your toys without asking. I'll try not to fight, because you're my best friend in the whole entire world. I love you."

---

### Lessons Unlocked

**LESSON: "Some Cases Are Futile"**
> Potassium over 11 = no survival. You can't save everyone.
> *Awareness of terminal lab values*

**LESSON: "Bear Protocol"**
> When siblings can't say goodbye, a proxy can help.
> *+2 to HUMANITY when using creative grief support*

---

## CASE PC040: "The Freedom House Legend"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC040 |
| **Patient Name** | Willie Alexander |
| **Age** | 81 |
| **Chief Complaint** | Near syncope, pacemaker failure |
| **Actual Diagnosis** | Twiddler's syndrome (pacemaker lead separation) |
| **Difficulty** | Medium |
| **Teaching Focus** | Pacemaker management, medical history, honoring legacy |

### The Setup

**Presentation**: 81-year-old from Memory Day Center. Heart rate 30, BP 80/40. Pacemaker not capturing.

**Portable Chest X-ray**: Wires completely disconnected from pacemaker box.

---

### The Treatment

**Failed Attempts**:
1. Atropine x3 — no change
2. Push dose epi — systolic up to 95
3. Transcutaneous pacing — patient intolerant ("Y'all trying to electrocute me?")

**Solution**: Transvenous pacemaker via internal jugular

> "Passing to 30, just outside the heart."
> "Looking for an injury pattern, since it's below the AV node."

**Result**: Heart rate 80, systolic 130. "I feel like a million bucks."

---

### The Discovery

**Willie keeps touching his chest**. He's been spinning the pacemaker box.

**Diagnosis**: **Twiddler's syndrome** — patient manipulation caused lead separation.

**Fix**: New pacemaker placed deeper so he can't reach it.

---

### The Legacy

**Willie was a Freedom House medic** — the first paramedics in the United States.

> "Back in the '60s, no 911, no ambulances. All we had was police paddy wagons."
> "Dr. Safar invented CPR. Dr. Adamson was a med student when I arrived."
> "Every time I saved a patient, it was like he was standing right here, whispering in my ear."

**Robby**: "Me too."

---

### Lessons Unlocked

**LESSON: "Twiddler's Syndrome"**
> Patients can cause their own device failures.
> *Awareness of rare pacemaker complications*

**LESSON: "The History Behind Medicine"**
> Black medics created EMS. Know your field's history.
> *+1 to HUMANITY when honoring legacy*

---

## CASE PC041: "The Fingertip"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC041 |
| **Patient Name** | Rocco DeJulio |
| **Age** | Adult |
| **Chief Complaint** | Amputation of fingertip |
| **Actual Diagnosis** | Fourth fingertip amputation at nail base |
| **Difficulty** | Medium (procedural) |
| **Teaching Focus** | V-Y flap, bone rongeur, teaching style |

### The Procedure

**Problem**: Fingertip crushed under AC unit. Bone exposed. No tissue to reattach.

**Plan**:
1. **Bone rongeur** — Trim down bone so subcutaneous tissue will cover
2. **V-Y flap** — Plastic surgery technique
   - Mark surgical borders
   - Two incisions forming a V
   - Advance the triangle to cover the tip
   - V becomes Y when sutured

---

### McKay's Teaching Style

**Rocco notices**:
> "You're very good at teaching. You step back, and with a few words, you impart wisdom."

**McKay**: "If you say so."

**Rocco**: "What do you do when you don't work?"

**McKay**: "Sleep."

---

### Lessons Unlocked

**LESSON: "V-Y Flap"**
> When there's nothing to reattach, advance local tissue.
> *Unlocks fingertip repair technique*

---

## CASE PC042: "The Black Widow"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC042 |
| **Patient Name** | Dolores Walker |
| **Age** | Adult |
| **Chief Complaint** | Severe abdominal pain |
| **Actual Diagnosis** | Black widow spider envenomation (not Crohn's perforation) |
| **Difficulty** | Hard |
| **Teaching Focus** | Don't trust the history, complete physical exam |

### The Setup

**Presentation**: Crohn's patient, status post colectomy. Presents with severe abdominal pain, rigidity, guarding. "Peritonitis!" 

**Initial Plan**: CT scan, blood cultures, Zosyn, prepare for OR

**But**: No fever, no vomiting, no diarrhea, no constipation. Pain started after moving firewood.

---

### The Discovery

**Santos asks about the morning**:
> "I might have got a splinter in my foot. I wasn't wearing socks."

**Examination**: Two 1mm puncture wounds on foot. Dead black widow spider in shoe.

> "Red hourglass marking."

**Treatment**: IV diazepam for muscle spasms. Pain resolves.

---

### The Teaching

**Santos to Dr. Shamsi (on phone)**:
> "The abdomen is rigid but no other GI signs or symptoms. It didn't make sense."
> "Black widow venom causes spasm of the abdominal wall musculature. People have had surgery thinking it was appendicitis."

---

### Lessons Unlocked

**LESSON: "Check the Whole Patient"**
> The abdomen wasn't the problem. The foot was.
> *+2 to DIFFERENTIAL when symptom pattern doesn't fit*

**LESSON: "Black Widow Envenomation"**
> Can mimic surgical abdomen. Look for puncture wounds.
> *Unlocks toxicology differential*

---

## CASE PC043: "Is This Trafficking?"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC043 |
| **Patient Name** | Piper |
| **Age** | 18 |
| **Chief Complaint** | Dysuria |
| **Actual Diagnosis** | Chlamydia from ex-boyfriend |
| **Difficulty** | N/A |
| **Teaching Focus** | Trafficking assessment, separating patient from companion |

### The Red Flags

**Presentation**: 18-year-old with burning urination. With her "boss" Laura.

**Concerning Signs**:
- Boss answers questions for her
- Won't leave for pelvic exam
- Same address as boss
- Came from rural Pennsylvania (population 400)
- "Online ad" for job

**McKay to Collins**:
> "Very controlling, answers questions for her, won't leave her side for anything, even a pelvic exam."
> "Red flags for trafficking."

---

### The Separation

**Strategy**: Tell Laura the patient needs CT scan (there's radiation, she can't come).

**Private Interview**:
- "Do you have any concerns about your job or your boss?"
- "Sometimes people are pressured to have sex when they don't want to."

**Result**: Not trafficking. Just chlamydia from ex-boyfriend.

> "If I don't tell him, is there a chance his d*ck will fall off?"

---

### Lessons Unlocked

**LESSON: "Trafficking Assessment"**
> Know the red flags. Separate patient from companion.
> *Unlocks trafficking screening protocol*

**LESSON: "Sometimes It's Not What You Think"**
> Don't assume. Ask the questions, accept the answers.

---

## CASE PC044: "The Honor Walk"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC044 |
| **Patient Name** | Nick Bradley |
| **Age** | 18 |
| **Chief Complaint** | Fentanyl overdose (final resolution) |
| **Actual Diagnosis** | Brain death, organ donor |
| **Difficulty** | N/A |
| **Teaching Focus** | Organ donation completion, closure |

### The Arc Concludes

**Father John** decides with **Father McGill's** support:
> "We're on board with organ donation."

**The OPO** sends an ambulance. Surgical teams from across the country will meet Nick at the Center for Organ Recovery.

---

### The Honor Walk

Staff lines the hallway as Nick is wheeled out.

**Family Support Specialist Emma**: "If it's all right, I think a lot of us here would like to attend Nick's funeral."

**Mother Lily** (sobbing): "Yeah, of course."

---

### Lessons Unlocked

**LESSON: "Honor Walks"**
> When an organ donor leaves the ED, staff gathers to pay respects.
> *+1 to HUMANITY when participating in honor walks*

---

## CASE PC045: "Same Day Return"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC045 |
| **Patient Name** | Louie |
| **Age** | Adult |
| **Chief Complaint** | Found unresponsive on sidewalk |
| **Actual Diagnosis** | Alcohol intoxication |
| **Difficulty** | Easy |
| **Teaching Focus** | Frequent flyers, realistic expectations |

### The Setup

**Presentation**: Louie was discharged sober at 7 AM. Found outside liquor store before 2 PM.

> "How much did you have to drink, Louie?"
> "Just a couple of shots of vodka."
> "So like a half-gallon?"
> "Hell no. Just a quart."

**Langdon's Technique**:
> "If you overexaggerate with your question, you usually get a truthful answer."

---

### The Librium Mystery

**Langdon prescribed 20 Librium** for withdrawal tremors. Only 10 left.

**Santos concerned** about missing pills. Worries about overdose.

**Langdon**: "Vodka is Louie's drug of choice. Quickest way to k*ll the shakes."

**Where are the other pills?** In Louie's pocket. He didn't need them.

---

### Lessons Unlocked

**LESSON: "Frequent Flyers Are Predictable"**
> Some patients will be back the same day. Accept it.
> *Reduces COMPOSURE penalty for repeat patient presentations*

---

## TEACHING MOMENT: Santos Suspects Langdon

### The Investigation

**Santos notices irregularities**:
- Episode 105: Lorazepam vial couldn't be opened during seizure
- Episode 108: Lorazepam returned to PDS unused (same lot number?)
- Episode 108: Librium pills missing from Louie's prescription

**Santos to Dana**:
> "I'm concerned he could be stealing."

**Dana's Response**:
> "I insult the sh*t out of Langdon, but he's a great doctor. I've never seen him impaired. You've been here for what, seven hours? Just do your job."

**Status**: Unresolved. Santos is watching.

---

### Mechanic Application

**Suspicion System**: Player can notice irregularities with staff behavior. Acting too early = "crying wolf." Acting too late = enabling harm.

---

---

## CASE PC046: "The Festival OD"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC046 |
| **Patient Name** | Keely Ralston |
| **Age** | Adult |
| **Chief Complaint** | MDMA overdose from PittFest |
| **Actual Diagnosis** | MDMA overdose with severe hyperthermia and hyponatremia |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Hyperthermia management, hyponatremia seizures, "hot salty" |

### The Setup

**Presentation**: Brought from festival first aid tent. Altered mental status, fever too high for field thermometer. Intubated en route.

**On Arrival**:
- Core temp: 107.3°F
- HR 132, BP 210/120
- Pupils dilated
- Profuse sweating

---

### Initial Management

**Cooling**:
- Ice packs to head, neck, groin
- Ice bath immersion
- Target: Pull out at 102°F (avoid hypothermia overshoot)

**Medications**:
- Ativan (not beta blockers — unopposed alpha could k*ll)
- "She might need another 40mg of Ativan"

**Teaching**: MDMA hypertension/tachycardia is centrally mediated. Benzos are the drug of choice.

---

### The Seizure

**Temp down to 103.2°F** — good progress.

**Then**: Seizure starts. Santos wants more Ativan and Keppra.

**Mohan's insight**:
> "At festivals, you dance for hours. You sweat, you drink gallons of water, but nobody thinks to replenish their salts."

**Order**: 100cc of 3% hypertonic saline (before labs return)

**Lab confirmation**: Sodium 112 (critical hyponatremia)

**Result**: Seizure stops. Mohan was right.

---

### Langdon Explodes

**Santos didn't call Langdon during seizure**. He loses it:

> "Is it hubris or ignorance that makes you think you know more than residents with two to three years more experience?"
> "Your job is to shut up, listen, and learn."

**Robby intervenes publicly**:
> "Where does it say that shaming, belittling, and insulting are effective teaching tools?"
> "This kind of behavior will not be tolerated. I don't want to see it."

---

### Lessons Unlocked

**LESSON: "Hot and Salty"**
> Festival ODs often have hyponatremia from water intoxication.
> *Unlocks empiric hypertonic saline for festival seizures*

**LESSON: "Pull at 102"**
> Stop cooling before you overshoot into hypothermia.
> *Awareness of rewarming/cooling targets*

---

## CASE PC047: "The Fight Bite"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC047 |
| **Patient Name** | "Red" |
| **Age** | Adult |
| **Chief Complaint** | Punched a woman in the face, tooth stuck in hand |
| **Actual Diagnosis** | Fight bite with joint involvement |
| **Difficulty** | Medium |
| **Teaching Focus** | Human bite infections, saline injection test |

### The Setup

**Background**: Waiting room erupts. Woman offered to put mask on another woman's coughing child. Violence ensued.

**Injuries**:
- **Spinks**: Tooth fractured into dentin (seal with dental cement)
- **Red**: Tooth embedded in knuckle, possible joint penetration

---

### The Saline Test

**Robby teaches**:
> "Human mouths are filthy, some more than others."
> "I'm going to inject sterile saline into your knuckle joint. If it comes spraying back out of the bite wound, we'll know."

**Result**: "There she blows."

**Plan**: IV antibiotics, hand surgery for washout.

**Red** (to other patient): "I hope next time you keep your masks and opinions to yourself."

---

### Teaching Points

1. **Fight bites** need saline joint injection test
2. **Tooth in knuckle** = assume joint penetration until proven otherwise
3. **Human bites are filthy** — high infection risk

---

### Lessons Unlocked

**LESSON: "Saline Injection Test"**
> Inject into joint; if it comes out the wound, the joint is violated.
> *Unlocks fight bite assessment technique*

---

## CASE PC048: "The Missed Endometritis"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC048 |
| **Patient Name** | Paula |
| **Age** | Adult (10 days postpartum) |
| **Chief Complaint** | MVC with chest pain |
| **Actual Diagnosis** | Postpartum endometritis causing septic shock |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Postpartum patients need pelvic exam, diagnosis bias |

### The Setup

**Episode 108**: Paula seen by McKay for UTI. Discharged with oral antibiotics.

**Episode 109**: Paula crashes her car. Brought in as MVC. Sternal fracture, concussed.

**Progression**:
- Initially stable
- Then: BP crashing, tachycardic, unresponsive
- Septic shock

---

### Finding the Source

**Ruled out**:
- Chest CT clear (except sternal fracture)
- Abdominal CT clear
- No bleeding
- Urine now clear (no UTI)

**Found**: Purulent drainage from cervix. Endometritis.

**The Miss**:
> "Every postpartum patient needs a pelvic exam to rule out endometritis."

**McKay's Defense**:
> "It was a quick chair exam. There was only mild tenderness over the bladder."
> "I saw no reason to have her wait eight hours for a bed for a pelvic exam."

---

### The Bias Question

**Collins**:
> "Perhaps there was something about the patient that made you overlook proper treatment."

**McKay**: "Are you saying I was biased because of her weight?"

**Collins**: "I raise it as a possibility, not as an accusation."

**McKay**: "I will look out for it."

---

### Lessons Unlocked

**LESSON: "Postpartum = Pelvic"**
> Every postpartum patient with symptoms needs a pelvic exam.
> *Mandatory check for endometritis*

**LESSON: "Tylenol Masks Fever"**
> Ask about OTC med use. It can hide infection signs.
> *+1 to HISTORY TAKING when asking about self-medication*

**LESSON: "Check Your Bias"**
> Body size shouldn't affect thoroughness of exam.
> *Awareness of weight-based clinical bias*

---

## CASE PC049: "The Dog Walker"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC049 |
| **Patient Name** | Walter Pernell |
| **Age** | 52 |
| **Chief Complaint** | Auto versus pedestrian |
| **Actual Diagnosis** | Road rash (no fractures) |
| **Difficulty** | Easy |
| **Teaching Focus** | LET topical anesthesia, gravel extraction, emotional support animals |

### The Setup

**Presentation**: Walking dog (Crosby) in crosswalk. Hit by Paula's car. "The car didn't hit me so much as throw me."

**Injuries**: Major road rash on legs. No fractures on X-ray.

---

### The Treatment

**Protocol**:
1. LET topical anesthetic (no more than 30cc) on raw skin
2. Pick out gravel pieces (Mel's zen exercise: "1,000 pieces, give or take 100")
3. Close with Dermabond

**Emotional Support**: Crosby allowed in room. "Say you need him for anxiety."

---

### Crosby the Hero

**Later**: Crosby catches the rat that's been plaguing the ED.

> [BONES SNAP]
> [APPLAUSE]
> "You got a rat, didn't you?" "Yeah. He does that."

---

### Lessons Unlocked

**LESSON: "LET for Road Rash"**
> Topical Lidocaine/Epinephrine/Tetracaine before gravel extraction.
> *Unlocks road rash management*

---

## CASE PC050: "The Street Team"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC050 |
| **Patient Name** | Mr. Krakozhia |
| **Age** | Adult |
| **Chief Complaint** | Schizophrenia, unhoused, off meds |
| **Actual Diagnosis** | Schizophrenia (untreated) |
| **Difficulty** | N/A |
| **Teaching Focus** | Community medicine, street team, long-acting injectables |

### The Arc

**Earlier**: Krakozhia peed on Whitaker during meth-induced psychosis.

**Episode 109**: He apologizes.

> "I kind of go out of my head when I'm off my meds. Then I guess I piss on people."
> "I'm not using anymore. I take antipsychotics for the schizophrenia I got from doing meth. But I've been clean a year."

---

### The Solution

**Problem**: Can't afford meds. No insurance. Unhoused.

**Solution**: 
- Once-monthly injectable antipsychotic
- Street team brings meds to him at Liberty Avenue encampment

**Whitaker**: "I'd be interested in joining that. Maybe I can bring out the medicine myself."

---

### Lessons Unlocked

**LESSON: "Street Team Medicine"**
> Some patients can't come to you. Go to them.
> *Unlocks community outreach pathway*

**LESSON: "Long-Acting Injectables"**
> Monthly shots for patients who can't maintain daily meds.
> *Awareness of depot antipsychotics*

---

## CASE PC051: "Theresa Sees the Therapist"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC051 |
| **Patient Name** | Theresa Saunders |
| **Age** | Adult |
| **Chief Complaint** | Follow-up after ipecac ingestion |
| **Actual Diagnosis** | Grief, needs therapy |
| **Difficulty** | N/A |
| **Teaching Focus** | Behavioral health placement, incomplete arcs |

### The Update

**Theresa met with Dr. Ozeki** (upstairs therapist). Session went "well."

**David still hasn't called or shown up**.

**Robby**: "I still would like him to talk to somebody."

**Status**: Theresa waiting in ED, hoping David shows up.

---

## TEACHING MOMENT: Collins's Miscarriage

### The Reveal

**During debriefing**, Collins breaks down:

> "I shouldn't have bought that f*cking stroller."

**Robby**: "f*ck that f*cking stroller."

---

### Context

**Collins has been "off" all day**. Langdon noticed. Others noticed.

**What she couldn't say**: She lost her pregnancy. Probably miscarried during the shift.

> "I checked myself. Uterus is empty, barely spotting now. I'm fine."

---

### Robby's Debrief Philosophy

> "We do these debriefs to try to give a sense of closure, meaning, to difficult cases so that they won't linger. But trust me, the kids you'll lose will linger."
> "I found myself at the gates of Big Charity Cemetery, looking at all those mausoleums and crypts, thinking: That's what I need. A safe place where I can put these feelings."

---

### Mechanic Application

**Staff have personal crises during shifts**. The game should show doctors processing their own losses while treating patients.

---

---

## CASE PC052: "The 90% Burn"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC052 |
| **Patient Name** | Teddy |
| **Age** | 28 |
| **Chief Complaint** | Burned in gas tank explosion |
| **Actual Diagnosis** | 90% BSA burns, mostly third-degree (full thickness) |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Parkland formula, escharotomy, honest prognosis |

### The Setup

**Presentation**: Transferred by air. 90% body surface area burns from 200-gallon fuel tank explosion while transferring gas to tractor.

**On Arrival**:
- Singed nasal hairs, soot in oropharynx (airway burn)
- "Not as much pain as I should be" (full thickness = nerve damage)
- Wife Amy en route

---

### Initial Management

**Parkland Formula**: 4 mL × kg × %BSA = total fluid in first 24 hours
- Half in first 8 hours, half in next 16 hours
- Teddy: 27 liters over 24 hours

**Intubation**: Before throat swells shut

> "If there's anything you two want to say to each other, this is the time."

---

### Escharotomy

**Problem**: Burnt skin loses elasticity. Chest wall too tight. Vent can't push air in.

**Signs**:
- High peak pressure
- Low tidal volume
- Restrictive pattern

**Procedure**:
1. Vertical incisions from lateral clavicle to lower rib margin
2. Horizontal incision connecting them
3. Tissue "pops out" as pressure releases

> "That tissue is really popping out."
> "Which illustrates what? The pressure underneath."

---

### The Honest Prognosis

**Whitaker to Robby**: "He's stable. His chance of dying in the next week is over 90%."

**Reality**: He's more likely to die of sepsis before his baby is born.

**Amy's Ring**: Robby returns Teddy's wedding ring, cut off due to swelling.

---

### Lessons Unlocked

**LESSON: "Parkland Formula"**
> 4 mL × kg × %BSA. Half in 8 hours, half in next 16.
> *Unlocks burn fluid resuscitation calculation*

**LESSON: "Escharotomy"**
> Cut burnt skin to let chest wall expand.
> *Unlocks emergency burn procedure*

**LESSON: "Honest Prognosis"**
> 90% burns = 90% mortality. Don't promise survival.
> *COMPOSURE check when delivering hopeless odds*

---

## CASE PC053: "The Line Drive"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC053 |
| **Patient Name** | Everett Young |
| **Age** | 16 |
| **Chief Complaint** | Line drive to left eye |
| **Actual Diagnosis** | Orbital compartment syndrome with grade 4 hyphema |
| **Difficulty** | Hard |
| **Teaching Focus** | Lateral canthotomy, pressure Cy Young dads |

### The Setup

**Presentation**: 16-year-old pitcher, took line drive to eye. Light perception only in left eye.

**Findings**:
- Grade 4 hyphema (blood filling anterior chamber)
- Eye pressure 58 (normal <21)
- Blood collection behind eyeball

**Father** (intense): "95 mph fastball, 12-6 slider, 0.94 ERA. Future Cy Young."

---

### Lateral Canthotomy

**Robby**: "Without a CT? Isn't that exactly what the patient needs?"

**Procedure**:
1. Versed for sedation
2. 1% lido with epi
3. Hemostat crushes lateral canthal area
4. Scissors cut through crushed tissue
5. Toothed forceps find inferior and superior crus (feel like guitar strings)
6. Metzenbaum scissors cut both crura

**Result**: Pressure drops from 58 to 18. "It's getting a lot brighter in here."

---

### The Father Problem

**Javadi snaps**:
> "Your son is freaking out because he may never see out of his left eye again. Forget baseball and just be his dad. God, it can't be that f*cking hard."

**McKay later**:
> "As physicians, we gotta learn to keep our emotions in check and not let our personal experiences interfere with our professional responsibilities."

---

### Lessons Unlocked

**LESSON: "Lateral Canthotomy"**
> Relieve orbital pressure by cutting lateral canthus.
> *Unlocks vision-saving emergency procedure*

**LESSON: "Don't Snap at Parents"**
> Even overbearing parents are coping with fear.
> *COMPOSURE check when frustrated with family*

---

## CASE PC054: "The Gamer's Stroke"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC054 |
| **Patient Name** | Vera Mullahy (Jane Doe initially) |
| **Age** | ~20s |
| **Chief Complaint** | Found unresponsive, couldn't speak |
| **Actual Diagnosis** | Carotid artery dissection with MCA stroke |
| **Difficulty** | Very Hard |
| **Teaching Focus** | TNK, angioedema complication, bedside epi drip |

### The Setup

**Presentation**: Professional gamer, no-showed tournament. Teammate in Dubai called teammate in Houston, who called 911.

**On Arrival**:
- Receptive and expressive aphasia
- Right-sided hemiparesis
- Facial droop
- NIH stroke scale 27

**CT**: No bleed. Carotid artery dissection left neck with thrombus to left MCA.

---

### TNK Decision

**MRI**: Diffusion-flare mismatch = less than 4 hours into stroke.

**Plan**: Tenecteplase (TNK) first, then endovascular therapy (EVT).

**Dr. Mehta** (stroke neurologist, tells jokes constantly):
> "What type of person is best suited to work with an MRI machine? Someone with a magnetic personality."

---

### Angioedema Complication

**After TNK**: Swollen lips, swollen tongue, stridor. Sats dropping.

**Santos**: "We should intubate!"

**Mohan**: "Epinephrine can reverse the swelling right away."

**Solution**:
1. Bedside drip: 1mg epi in 1L saline
2. IV epi 10 mcg push
3. Drip at 5cc/min

**Result**: Stridor improves. "Is it getting easier to breathe?" "Mm-hmm!"

> "Slo-Mo, No-Mo!"

---

### Lessons Unlocked

**LESSON: "Bedside Epi Drip"**
> Mix 1mg in 1L for rapid angioedema treatment.
> *Unlocks fast-acting vasopressor drip*

**LESSON: "Don't Rush to Intubate"**
> If BP and sats are stable, try reversing first.
> *+1 to AIRWAY when considering alternatives*

---

## CASE PC055: "Dana Gets Punched"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC055 |
| **Patient Name** | Dana (staff) |
| **Age** | N/A |
| **Chief Complaint** | Assaulted by patient |
| **Actual Diagnosis** | Non-displaced nasal fracture |
| **Difficulty** | N/A |
| **Teaching Focus** | Healthcare worker violence, systemic failures |

### The Incident

**Doug Driscoll** (angry waiting room patient who nearly left AMA earlier) punches Dana in the face when no one is looking.

**Injuries**:
- Bloody nose
- Hit head (no LOC)
- Non-displaced nasal fracture
- No intracranial hemorrhage

---

### The Systemic Failure

**Robby to Gloria**:
> "Our hard-working nurses were just asking what steps the hospital plans to take to ensure their safety."
> "Maybe you would like to explain why you've denied my request for additional security measures three times in the last four months?"

**Gloria deflects**: "PTMC is a family."

**Langdon**: "A dysfunctional family."

**Nurses threaten union involvement**.

---

### Lessons Unlocked

**LESSON: "Violence Is Systemic"**
> Healthcare worker assault is a national epidemic.
> *Awareness of nurse safety issues*

---

## CASE PC056: "The Half-Pipe Prince"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC056 |
| **Patient Name** | Chad Ashcroft |
| **Age** | 39 |
| **Chief Complaint** | Skateboarding accident |
| **Actual Diagnosis** | Trimalleolar ankle fracture |
| **Difficulty** | Medium |
| **Teaching Focus** | Propofol babbling, complex splinting |

### The Setup

**Presentation**: McKay's ex-husband. Skateboarding with their son Harrison. Broke his ankle.

> "Skateboarding? Really?"
> "You think I want to be in this sh*thole?"

**X-ray**: Distal tibia and fibula with unstable mortise. Three breaks.

---

### Propofol Confession

**Under sedation**:
> "I feel sad."
> "What does he [Mateo] have that I don't have? Sure, he's younger. And that hair."
> "Is she having sex with him?"

**Santos**: "Well, if she isn't, she probably should."

---

### Resolution

**Harrison stays with McKay** while Chad recovers from surgery.

> "Since your dad's gonna be laid up for a while, maybe you'd wanna stay with me?"

---

## TEACHING MOMENT: McKay Called the Cops

### The Confrontation

**Robby**: "I specifically told you to leave Theresa Saunders alone, and you called the cops on her son?"

**McKay**: "A decision was not made. So I made it."

**Robby**: "It was not yours to make!"

**McKay's Defense**:
> "If Theresa left, how are we gonna get David assessed for his risk to others?"
> "What about the girls on this list? Are you telling me their safety is worth less than his?"
> "I can live with this one. And now you can too."

---

### Robby's Reflection

**Later, to McKay after canthotomy**:
> "Teachers can still learn stuff. I saw a sad, confused boy. I did not think enough about those girls."

---

## TEACHING MOMENT: Langdon's Exposure

### The Confrontation

**Robby**: "Frank, have you been helping yourself to benzos from the ER?"

**Langdon**: "Whatever the hell Santos told you is bullshit."

**Robby**: "I didn't mention Santos."

---

### The Locker

**Robby**: "Open your locker."

**Inside**: Pills matching Louie's Librium.

**Langdon's Excuses**:
> "I hurt my back helping my parents move."
> "Dr. Hagan prescribed me pain meds and muscle relaxants."
> "I was just weaning myself off. It was just for maintenance."

---

### The Firing

**Robby**: "I'm not high. You've seen what I do. Could a drug addict do what I do?"

**Robby**: "Apparently. And I just f*cking let him!"

> "You're done. Leave now, or I will have Ahmad escort you out."

---

### Lessons Unlocked

**LESSON: "Trust Your Observations"**
> Santos was right. Irregularities matter.
> *Validation of staff suspicion system*

**LESSON: "Addicts Can Function"**
> Impairment isn't always visible.
> *Awareness of hidden addiction in medicine*

---

---

## CASE PC057: "The Shoulder Dystocia"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC057 |
| **Patient Name** | Natalie Malone |
| **Age** | 35 |
| **Chief Complaint** | Active labor, SROM |
| **Actual Diagnosis** | Shoulder dystocia requiring McRoberts maneuver |
| **Difficulty** | Hard |
| **Teaching Focus** | McRoberts, turtle sign, neonatal resuscitation |

### The Setup

**Presentation**: G3P2, 39 weeks, active labor. This is her third baby. Water broke. She waited too long at home.

**Background**: Surrogate for two dads (same-room teachers). "Same room, same womb."

---

### The Dystocia

**Signs**:
- Head delivers but pulls back ("turtle sign")
- Shoulder stuck on pelvic bone

**McRoberts Maneuver**:
1. Lift knees to chest (hyperflex hips)
2. Suprapubic pressure on bladder
3. If needed: hand inside to rotate posterior shoulder

> "I'm going to need another big push from you."
> "That hurts!" "I know."

**Complication**: Late deceleration. Fetal heart rate drops. OR prepped for crash C-section.

---

### The Resuscitation

**Baby born quiet**. One-minute Apgar: 3.

**Response**:
1. Dry and stimulate vigorously
2. BVM with tiny volumes, once per second
3. Suction ready
4. Intubation tray open

**Result**: Baby cries. Apgar 10.

> "Shouldn't he be crying by now?"
> "Sometimes it takes them a minute."

---

### Lessons Unlocked

**LESSON: "McRoberts Maneuver"**
> Hyperflex hips, suprapubic pressure, rotate shoulder.
> *Unlocks shoulder dystocia management*

**LESSON: "Turtle Sign"**
> Head delivers then retracts = shoulder stuck.
> *Recognition pattern for dystocia*

---

## CASE PC058: "The Postpartum Hemorrhage"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC058 |
| **Patient Name** | Natalie Malone (continued) |
| **Age** | 35 |
| **Chief Complaint** | Massive bleeding after delivery |
| **Actual Diagnosis** | Postpartum hemorrhage requiring Bakri balloon |
| **Difficulty** | Very Hard |
| **Teaching Focus** | PPH management, Bakri balloon, talking to patient |

### The Cascade

**After placenta delivery**: Massive blood loss (2-3 liters).

**Uterotonics Given**:
- Oxytocin drip
- Methergine 0.2 IM
- Carboprost 0.25 IM
- TXA 1000

**Uterine massage**: Not enough.

---

### Bakri Balloon

**Device**: Intrauterine balloon tamponade.

**Procedure**:
1. Insert balloon past cervix
2. Inflate with up to 500cc saline
3. Direct pressure on bleeding vessels

**Teaching**:
> "Keep talking to her. More memories. It's good for her. It's good for all of us."

---

### The Save

**Massive transfusion protocol** running. Systolic 84.

**Balloon inflates**. Bleeding stops.

**OB**: "Nice save, Dr. Robinavitch, Dr. Collins."

---

### Lessons Unlocked

**LESSON: "Bakri Balloon"**
> Intrauterine tamponade for PPH. Up to 500cc.
> *Unlocks hemorrhage control device*

**LESSON: "Talk to Your Patient"**
> Memories and conversation help during crisis.
> *+1 to COMPOSURE when engaging patient during trauma*

---

## CASE PC059: "The Minnesota Tube"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC059 |
| **Patient Name** | Unnamed (cirrhotic mom) |
| **Age** | 48 |
| **Chief Complaint** | Hematemesis (vomiting blood) |
| **Actual Diagnosis** | Ruptured esophageal varices from hepatitis B cirrhosis |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Minnesota tube placement, dual balloon system |

### The Setup

**Presentation**: ICU boarder, cirrhotic from hepatitis B. Intubated overnight. Supposedly stable. Then: massive bleeding.

**Cause**: Variceal rupture at gastroesophageal junction.

---

### Minnesota Tube

**Components**:
1. Gastric balloon (anchor in stomach)
2. Esophageal balloon (pressure on varices)

**Procedure**:
1. Test gastric balloon underwater (check air leaks)
2. Pass tube 50cm
3. Inflate gastric balloon to 50cc, confirm placement on X-ray
4. If still bleeding: inflate esophageal balloon to 30mmHg

> "The mouth is filling up again. It's like a fountain."
> "She's bleeding higher up in the esophagus."

**Result**: Esophageal balloon stops bleeding. GI can cauterize tomorrow.

---

### The Daughter

**Daughter's revelation**:
> "I'm the same age she was when she first got hep B. She was a wild child and IV drug user. But she got clean the day she found out she was pregnant with me."

**Mohan's response**:
> "She sounds like a good mom."
> "She's the best."

---

### Lessons Unlocked

**LESSON: "Minnesota Tube"**
> Two-balloon system for variceal bleeding.
> *Unlocks advanced GI hemorrhage control*

---

## CASE PC060: "The Drug Seeker"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC060 |
| **Patient Name** | Ivan Pugliesi |
| **Age** | 55 |
| **Chief Complaint** | Abdominal cramps, vomiting, diarrhea |
| **Actual Diagnosis** | Opioid withdrawal (masked as GI illness) |
| **Difficulty** | Medium |
| **Teaching Focus** | Spotting fakers, BUPE trick, confrontation |

### The Setup

**Presentation**: From New York for daughter's wedding. Abdominal pain, nausea, back pain. Asks specifically for morphine.

**Red Flags**:
- Dilated pupils, tearing
- Piloerection (goosebumps)
- Hypertension, tachycardia
- Agitation, restlessness
- "Last time they gave me morphine and it worked great"

---

### The BUPE Trick

**Mohan's Strategy**: Give buprenorphine (BUPE), tell patient it's "morphine-like."

> "If this doesn't work, we'll switch to morphine."

**Result**: All symptoms resolve. Confirms opioid withdrawal.

**Confrontation**:
> "The medication we gave you wasn't morphine. It was buprenorphine. It's specifically targeted to treat opioid withdrawal. That's why it worked."

---

### The Denial

**Pugliesi**: "I'm not some junkie on the street. I got a family. I pay my taxes. I return my shopping carts."

**Whitaker**:
> "My father passed away when I was young. I hope your daughter gets to have you there for all her big days to come."

---

### Lessons Unlocked

**LESSON: "Spotting Opioid Withdrawal"**
> Dilated pupils, goosebumps, tachycardia, sweating, agitation.
> *Recognition pattern for drug-seeking*

**LESSON: "BUPE Trick"**
> Give buprenorphine as diagnostic test for opioid dependence.
> *Controversial but effective technique*

---

## CASE PC061: "The 302"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC061 |
| **Patient Name** | David Saunders |
| **Age** | Teen |
| **Chief Complaint** | Suicidal/homicidal ideation |
| **Actual Diagnosis** | Involuntary psychiatric hold (302) |
| **Difficulty** | N/A |
| **Teaching Focus** | 302 petitioner process, young male mental health |

### David's Post

**Instagram**:
> "All I ever wanted was to fit in and be loved, but they mocked me and forced me into an existence of loneliness and pain. It didn't need to be this way."

**Police**: Not enough for BOLO.

---

### Theresa Becomes Petitioner

**Robby explains 302 process**:
> "To call a 302 in Pennsylvania, the petitioner needs to admit to having witnessed the concerning behavior. You need a physician and social worker to sign off."

**Theresa's fear**: "What if I'm wrong?"

**Robby**: "Then you apologize. If you're right, you might save his life."

---

### The Bigger Picture

**Robby's Speech**:
> "We are failing young men because we don't teach them how to express their emotions. We just tell them to man up, and then we let them get their lessons in manhood from toxic podcasts. These young men feel isolated and find community in all the wrong places."

---

### Lessons Unlocked

**LESSON: "302 Petitioner Process"**
> Pennsylvania involuntary hold requires petitioner + physician + social worker.
> *Awareness of psychiatric hold procedures*

---

## TEACHING MOMENT: Dana Quitting

### The Conversation

**Dana to Robby**:
> "I think I'm done."

**Context**: Punched in the face. Decades of abuse. Nurses don't feel safe.

**Dana's History**:
> "I was born at this hospital. I volunteered here in high school. I've been punched, kicked, spit at, pissed on, had feces thrown at me."

**Robby's Response**:
> "I honestly don't know what I'm going to do without you."

**Dana**:
> "You'll figure it out. You always do. You're a good man, Robinavitch. Don't let this place take that from you."

---

## TEACHING MOMENT: Collins/Robby Confession

### The Reveal

**Collins**: IVF, trying alone, multiple failed attempts. "It's probably the last."

**Robby's Confession**:
> "I got pregnant a few years ago. I wasn't ready to be a mom then. I wasn't sure about the relationship. I never told him. I was afraid he'd hate me for being selfish."

**Collins**: "Not selfish, Heather. Not selfish."

**Robby**: "And more importantly, I know he would want you to forgive yourself."

---

## CLIFFHANGER: Mass Casualty Incoming

### The Call

**Code Triage**: Multiple GSWs. Active shooter at PittFest.

**Robby's Personal Stakes**: Jake and his girlfriend Leah are at PittFest.

> "Jake and his girlfriend are there."

**TO BE CONTINUED**

---

---

## CASE PC062: "MCI Triage Protocol"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC062 |
| **Patient Name** | Multiple Victims |
| **Age** | Various |
| **Chief Complaint** | Mass Casualty Incident (Active Shooter) |
| **Actual Diagnosis** | Varied (GSW, Trample, Falls) |
| **Difficulty** | Extreme |
| **Teaching Focus** | START Triage, Resource Rationing, Zoning |

### The Zones

**Red Zone (Trauma Rooms)**: Critical. Will die without immediate intervention (airway, hemorrhage). Stabilize in 5 mins -> OR/ICU.

**Pink Zone (Common Area)**: Semi-stable. Will die in <1 hour without treatment.

**Yellow Zone (North Corridor)**: Stable. Good vitals. Walking/Talking. Extremity wounds.

**Green Zone (Family Med)**: Minor. Scrapes, sprains.

**Black/White (Pedes)**: Deceased or expectant (imminent death).

### The Rules

**No EMR**: Sharpies on wrist bands or foreheads.
**No Imaging**: Assess by mental status and pulse only.
**Resources**: Ration everything. Blood, tubes, staff.

**Decision Mechanic**: Player has 10 seconds per patient to assign a Zone based on AVPU and pulse.

---

## CASE PC063: "The Bubble Intubation"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC063 |
| **Patient Name** | Unnamed GSW |
| **Age** | Adult |
| **Chief Complaint** | GSW to neck, airway compromised |
| **Actual Diagnosis** | Distorted anatomy, unable to intubate conventionally |
| **Difficulty** | Extreme |
| **Teaching Focus** | Retrograde intubation technique, improvisation |

### The Problem

**Situation**: Massive hematoma, blood in airway, suction failing.

**No Laryngoscope**: "Ran out of laryngoscopes. No time to autoclave."

**Technique**:
1. Assistant gives chest compression.
2. Operator watches for air bubbles rising through blood.
3. Follow bubbles to cords.
4. Pass tube blindly along bubble path.

> "You gave the compression, I followed the air bubbles up. More than one way to tube a cat."

---

## CASE PC064: "The Blowholes"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC064 |
| **Patient Name** | Unnamed Trample Victim |
| **Age** | Adult |
| **Chief Complaint** | Chest trauma |
| **Actual Diagnosis** | Pneumomediastinum with massive subcutaneous emphysema |
| **Difficulty** | Hard |
| **Teaching Focus** | Infraclavicular "blowhole" incisions |

### The Setup

**Presentation**: Intubated, chest tube in, but patient puffing up like a balloon.

**Signs**:
- Massive subcutaneous emphysema (crepitus everywhere)
- Losing pulse (tamponade physiology from air pressure)

**Procedure**:
1. Scalpel.
2. Cut "blowhole" incisions below clavicles.
3. Air hisses out. Pulse returns.

> "Tamponade from pneumomediastinum. Cut blowhole incisions to release the air."

---

## CASE PC065: "The Foley Tamponade"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC065 |
| **Patient Name** | Rich Stefano (Cop) |
| **Age** | Adult |
| **Chief Complaint** | GSW to neck |
| **Actual Diagnosis** | Penetrating neck injury with arterial bleed |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Balloon tamponade for penetrating trauma |

### The Improvisation

**Injury**: Entrance neck, exit cheek. Arterial bleeding.

**Procedure**:
1. Insert Foley catheter into wound tract.
2. Inflate balloon with saline.
3. Clamp catheter to keep balloon tight against vessel.
4. Bleeding stops ("Dry as a bone").

**Teaching**: Balloon tamponade isn't just for the uterus (Bakri) or esophagus (Minnesota). It works for bullet holes too.

---

## CASE PC066: "Sylvia's Occult Bleed"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC066 |
| **Patient Name** | Sylvia |
| **Age** | Adult |
| **Chief Complaint** | Broken leg (distracting injury) |
| **Actual Diagnosis** | Liver laceration from car impact |
| **Difficulty** | Hard |
| **Teaching Focus** | FAST exam, distracting injuries, whole blood donation |

### The Distraction

**Presentation**: Hit by car. Open tib-fib fracture. Intense focus on the leg.

**Decompensation**: Leg splinted, but pulse lost.

**FAST Exam**: Blood in Morrison's pouch. Liver lac.

**Crisis**:
- Out of O-neg blood.
- "She needs blood, not crystalloid."

**Solution**:
- "I'm O-neg. Can I donate?"
- Staff member donates fresh whole blood directly for the patient.

---

## CASE PC067: "The Secret Reporter"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC067 |
| **Patient Name** | "MCI-28" (Faker) |
| **Age** | Adult |
| **Chief Complaint** | Arm injury |
| **Actual Diagnosis** | Malingering (Reporter) |
| **Difficulty** | Easy |
| **Teaching Focus** | Security, privacy, observing behavior |

### The Setup

**Behavior**: Patient with "arm injury" wandering ER, filming with phone.

**Robby's Catch**:
> "Hey! What the hell are you doing?"
> Reporter runs, Robby tackles him.

**Reveal**: Stole a victim's hoodie to get inside. Recording trauma for news.

**Outcome**: Restrained, phone confiscated, arrested.

---

## TEACHING MOMENT: Resource Rationing

### The Shortages

1.  **Chest Tubes**: Run out.
    *   *Solution*: Use ET tube in chest incision.
    *   *Sewer*: Use urine bag Christmas tree adapter for drainage.
2.  **Blood**: Run out of O-neg.
    *   *Solution*: Walking Blood Bank (Staff donate).
3.  **Laryngoscopes**: Run out/Dirty.
    *   *Solution*: Bubble intubation or digital (finger) intubation.

> "A tube's a tube. If you inflate the balloon, it won't pull out."

---

## CLIFFHANGER: The Shooter's Identity

### The Call

**Police Update**:
> "They pinged his cell phone to the area of the shooting."

**Theresa's Realization**:
> "David."

**The Shooter**: It's David Saunders. And he might still be out there. Or coming to the hospital.

**TO BE CONTINUED**

---

---

## CASE PC068: "The Tactical Crike"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC068 |
| **Patient Name** | Unnamed GSW |
| **Age** | Adult |
| **Chief Complaint** | Compromised airway, massive bleeding |
| **Actual Diagnosis** | Needs surgical airway |
| **Difficulty** | Extreme |
| **Teaching Focus** | Control Cricothyrotomy (Tactical Airway) |

### The Problem

**Situation**: Can't see cords. No bougie. No skin hooks. Suction failing.

**Technique**: "Control Crike" (Tactical Kit).
1. 11 blade.
2. Knife leaves a trach hook behind (can't miss).
3. Slide in introducer.
4. Feel tracheal rings.
5. Pass tube.

> "Works in the pitch-dark when you're under fire. I can do these with my eyes closed."

---

## CASE PC069: "The IO Burr Hole"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC069 |
| **Patient Name** | Mr. Grayson |
| **Age** | 68 |
| **Chief Complaint** | Decreased mental status |
| **Actual Diagnosis** | Epidural hematoma with impending herniation |
| **Difficulty** | Legendary |
| **Teaching Focus** | Optic nerve sheath diameter, improvised burr hole |

### The Diagnosis

**Signs**:
- Dozed off (mental status change).
- No blown pupil... yet.
- **Optic Nerve Sheath Diameter (ONSD)**: 10mm (Normal <5mm).

**Crisis**: Intracranial pressure (ICP) skyrocketing. No neurosurgeon available.

### The Fix

**Mohan's Move**:
1. Propofol, Roc, Mannitol.
2. **EZ-IO Drill**.
3. Drills directly into the skull to relieve pressure.

> "Relieving intracranial pressure so he doesn't die. With an IO drill? That's sick."

**Outcome**: Patient wakes up. "Incredible save."

---

## CASE PC070: "The Illegal REBOA"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC070 |
| **Patient Name** | Carmen |
| **Age** | Adult |
| **Chief Complaint** | Hypotensive pelvic bleed |
| **Actual Diagnosis** | Retroperitoneal hemorrhage from external iliac artery |
| **Difficulty** | Legendary |
| **Teaching Focus** | REBOA Zone 3 placement |

### The Decision

**Situation**: Bleeding internally. Massive transfusion failing. No surgeon.

**Santos's Move**: REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta).
- **Rule**: Only attendings/seniors can do this.
- **Santos**: "I told her to stop." "I'm doing it anyway."

**Procedure**:
1. Femoral access (blind).
2. Wire up to Zone 3 (below kidneys).
3. Inflate balloon.
4. Palpable systolic pressure returns.

**Result**: Bleeding stops. Pulse returns.
> "You never should have done that on your own. But that was pretty badass."

---

## CASE PC071: "The Blind Supraclavicular"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC071 |
| **Patient Name** | "MCI-7" (Vincent Rivera) |
| **Age** | Adult |
| **Chief Complaint** | Cardiac arrest |
| **Actual Diagnosis** | Hypovolemic shock |
| **Difficulty** | Very Hard |
| **Teaching Focus** | Landmark-guided central line during CPR |

### The Access

**Problem**: Patient arresting. Needs massive volume. No peripheral access. Neck (IJ) too risky without ultrasound.

**Langdon's Move**: Supraclavicular Subclavian Line.
- **Landmarks**: 1cm from lateral head of sternocleidomastoid, 1cm off clavicle, aim at contralateral nipple.

> "If you have to go in blind, this is the only safe way to access a giant vein."

---

## CASE PC072: "The Rummel Tourniquet"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC072 |
| **Patient Name** | Unnamed GSW |
| **Age** | Adult |
| **Chief Complaint** | Retroperitoneal bleed |
| **Actual Diagnosis** | Vessel injury requiring temporary occlusion |
| **Difficulty** | Hard |
| **Teaching Focus** | Improvised vessel loop |

### The MacGyver

**Ingredients**:
- IV tubing
- Umbilical tape
- Red rubber catheter

**Technique**: Loop tape around vessel, thread through tubing, clamp to tighten.

> "Toughest part is getting the umbilical tape through the tubing."

---

## CASE PC073: "The Death of Leah"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC073 |
| **Patient Name** | Leah |
| **Age** | Teen |
| **Chief Complaint** | GSW to chest |
| **Actual Diagnosis** | Fatal hemorrhage, cardiac arrest |
| **Difficulty** | Hopeless |
| **Teaching Focus** | Futility, breaking bad news, emotional breaking point |

### The Futility

**Efforts**:
- Intubation, IO, chest tube.
- 4 units packed cells, 2 FFP, TXA.
- 1200cc auto-transfused.

**The End**:
- "Blood is for the ones we can save. She is right on the edge."
- Pulse lost. CPR fails.

### The Breakdown

**Robby to Jake**:
> "If this had been any other day... No. I didn't save her."
> "I'm gonna remember Leah long after you've forgotten her."

**Result**: Robby snaps at Jake. Total emotional collapse.

---

## TEACHING MOMENT: The Journalist

### The Confrontation

**Reporter**: Fakes injury, wears stolen hoodie. Filming inside ER.

**Action**: Robby tackles him.

> "This guy stole a victim's hoodie and faked an injury to get inside. He's probably a f*cking reporter."

**Lesson**: Media will try anything during MCI. Security is paramount.

---

---

## CASE PC074: "The Blue Man"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC074 |
| **Patient Name** | Unnamed Festival Goer |
| **Age** | Adult |
| **Chief Complaint** | Cyanosis, Altered Mental Status |
| **Actual Diagnosis** | Methemoglobinemia from Amyl Nitrate (Poppers) |
| **Difficulty** | Medium |
| **Teaching Focus** | Chocolate brown blood, Methylene Blue antidote |

### The Mystery

**Signs**:
- SpO2 85% despite high-flow oxygen.
- Patient is blue (cyanotic).
- Blood draw looks like "Chocolate Brown."
- Normal Cardiac Echo / Lung sounds.

**Diagnosis**:
- **Clue**: "Partied too hard at PittFest."
- **Pathology**: Methemoglobinemia (Iron in hemoglobin oxidized to Fe3+, can't carry oxygen).

**Treatment**: Methylene Blue IV.
> "Five minutes, bright spark." (Result: Instant pinking up).

---

## CASE PC075: "The Air Lock"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC075 |
| **Patient Name** | Unnamed Hero |
| **Age** | Adult |
| **Chief Complaint** | Hypotension, Hypoxia |
| **Actual Diagnosis** | Intracardiac Air Embolism |
| **Difficulty** | Extreme |
| **Teaching Focus** | Pigtail catheter aspiration of the right ventricle |

### The Mechanism

**History**: GSW thigh. Ran around with a loose tourniquet.
**Pathophysiology**: Air sucked into femoral vein -> Right Heart -> Air Lock (stops blood flow to lungs).

**Findings**:
- Dilated Right Ventricle (Echo).
- "Vena Cava is plump."
- Murmur (Mill Wheel Murmur - imply).

**The Save**:
- **Procedure**: Insert Pigtail Catheter into Right Ventricle.
- **Action**: Aspirate air bubbles.
- **Risk**: Inducing V-Tach (which happens).
- **Result**: "Pulling back blood... and air."

---

## CASE PC076: "The Anti-Vax ADEM"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC076 |
| **Patient Name** | Flynn Edwards |
| **Age** | Child |
| **Chief Complaint** | Fever, Rash, Coma |
| **Actual Diagnosis** | Measles leading to ADEM (Acute Disseminated Encephalomyelitis) |
| **Difficulty** | Hard (Social Engineering) |
| **Teaching Focus** | Vaccine refusal, ADEM recognition, parental conflict |

### The Diagnosis

**Signs**:
- Rash started on face, moved down (resolving).
- Altered mental status/Coma.
- Parents: "Dr. Google" types. Unvaccinated.

**The Conflict**:
- **Condition**: ADEM (Immune attack on brain).
- **Test Needed**: Lumbar Puncture (LP).
- **Parents**: REFUSE. "I read it causes paralysis."

**Mechanic**: Player must navigate dialogue tree to convince parents or override (Ethics Committee/Protective Custody) before kid suffers permanent brain damage.

---

## CASE PC077: "The Stoic Corpsman"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC077 |
| **Patient Name** | Unnamed Navy Corpsman |
| **Age** | Adult |
| **Chief Complaint** | Found unconscious |
| **Actual Diagnosis** | Occult GSW to thigh |
| **Difficulty** | Easy |
| **Teaching Focus** | Secondary survey, heroes hiding injuries |

### The Reveal

**Scenario**: Man drives victim to ER, claims he's fine ("just woozy").
**Action**: Collapses.
**Exam**: Navy Corpsman who treated others while bleeding out from his own GSW.
**Lesson**: Always check the "Good Samaritan" for injuries in a mass casualty.

---

## CASE PC078: "The Innocent Suspect"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC078 |
| **Patient Name** | David Saunders |
| **Age** | Teen |
| **Chief Complaint** | Psychological Trauma |
| **Actual Diagnosis** | Acute Stress Reaction |
| **Difficulty** | Narrative |
| **Teaching Focus** | De-escalation, False Accusations |

### The Aftermath

**Situation**: David (previous 302 candidate) is dragged in by police, suspected of being the shooter.
**Reality**: Innocent. Shooter committed suicide elsewhere.
**Conflict**: David lashes out at his mom (Theresa).
**Resolution**: Mom reaffirms love/support despite his anger.

---

## TEACHING MOMENT: The Shema

### Spiritual Care

**Scene**: Robby breaking down in private.
**Action**: Reciting the Shema (Jewish prayer).
**Interaction**: Whitaker joins/witnesses.
> "I don't know if I actually believe in God... but a wise man once told me you learn to live with it."
**Mechanic**: Staff "Mental Health Break" interaction.

---

---

## CASE PC079: "The Pelvic Packing"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC079 |
| **Patient Name** | Hector (Hospital Worker) |
| **Age** | Adult |
| **Chief Complaint** | Crushed between truck and dock |
| **Actual Diagnosis** | Unstable Pelvic Fracture (Open Book) |
| **Difficulty** | Legendary |
| **Teaching Focus** | Preperitoneal Packing, Permissive Hypotension |

### The Complication

**Mistake**: "You gave him too much blood and popped the clots."
**Lesson**: **Permissive Hypotension** (Target SBP 90, not 120).

**The Fix**:
- **Constraint**: IR is busy. Patient dying.
- **Procedure**: **Preperitoneal Packing** (performed in ER).
    1. Midline incision below umbilicus.
    2. Open Space of Retzius.
    3. Stuff 6 lap pads on each side of bladder.
    4. Bleeding stops.

> "I've only ever done one in cadaver lab... Saddle up, cowboy."

---

## CASE PC080: "The Missing Patient"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC080 |
| **Patient Name** | Mrs. Cheu |
| **Age** | Elderly |
| **Chief Complaint** | Head Laceration |
| **Actual Diagnosis** | Wandering (Dementia/Confusion) |
| **Difficulty** | Medium |
| **Teaching Focus** | Patient tracking in chaos |

### The Search

**trigger**: Bed is empty. Wrong patient in bed.
**Action**: "Whitaker, you're the bloodhound."
**Search Locations**: Stairs, Waiting Room, Roof.
**Found**: Smoking in the stairwell.
**Lesson**: In MCI chaos, tracking patients is as important as treating them.

---

## CASE PC081: "The Blue Man Confession"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC081 |
| **Patient Name** | Max |
| **Age** | Adult |
| **Chief Complaint** | Methemoglobinemia (Post-Treatment) |
| **Actual Diagnosis** | Intentional Poisoning (Suicide Attempt) |
| **Difficulty** | Narrative |
| **Teaching Focus** | Psychiatric evaluation, digging deeper |

### The Reveal

**Investigation**: Patient denies drugs/toxins.
**Clue**: "He's not asking to go home."
**Confession**: Ordered "suicide kit" (nitrites) online.
**Outcome**: Psychiatric hold.
> "I don't want this kid slipping through the cracks."

---

## CASE PC082: "The Measles LP"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC082 |
| **Patient Name** | Flynn Edwards |
| **Age** | Child |
| **Chief Complaint** | ADEM Coma |
| **Actual Diagnosis** | ADEM confirmed via LP |
| **Difficulty** | Hard (Procedure) |
| **Teaching Focus** | Lumbar Puncture technique |

### The Procedure

**Consent**: Parents finally agree (after "Dr. Google" conflict).
**Technique**:
1. Position (Lateral Decubitus).
2. Landmarks (L3-L4).
3. Insert Bevel Up.
4. Feel the "Pop" (Ligamentum Flavum).
5. Clear fluid returns.

**Outcome**: Steroids started. Prognosis improves.

---

## CASE PC083: "The Arrest"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC083 |
| **Patient Name** | Dr. Cassie McKay (Staff) |
| **Age** | Adult |
| **Chief Complaint** | Under Arrest |
| **Actual Diagnosis** | Probation Violation |
| **Difficulty** | Narrative |
| **Teaching Focus** | Consequences of actions |

### The End of the Shift

**Scenario**: Shift is over. Heroes celebrated.
**Twist**: Police arrive for McKay.
**Charge**: Tampering with ankle monitor (Episode 112).
**Outcome**: Handcuffed and walked out of the ER.
> "No good deed goes unpunished."

---

---

# SEASON 2 ADDITIONS

---

## CASE PC084: "The Placebo Saint"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC084 |
| **Patient Name** | Margaret Walker |
| **Age** | Elderly |
| **Chief Complaint** | "Dying a sinner" |
| **Actual Diagnosis** | Anxiety / Psychosomatic |
| **Difficulty** | Easy |
| **Teaching Focus** | Placebo effect, Bedside manner |

### The Miracle Cure

**Presentation**: Patient convinced she is dying, demanding a priest. Results normal.
**Action**: "We're going to give you a shot." (B12 Vitamin).
**Result**: Near-instant recovery ("Miracle healing powers").
**Lesson**: sometimes the treatment is just making the patient feel heard (and a vitamin shot).

---

## CASE PC085: "The Twisted Point"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC085 |
| **Patient Name** | Mr. Ogilvie |
| **Age** | Adult |
| **Chief Complaint** | Cardiac Arrest |
| **Actual Diagnosis** | Torsades de Pointes |
| **Difficulty** | Hard (ECG Reading) |
| **Teaching Focus** | Identifying Polymorphic V-Tach, Magnesium Sulfate |

### The Missed Code

**Scenario**: Standard V-Tach algorithm fails. Patient dies.
**Debrief (Dr. Al-Hashimi)**:
- "The rhythm was polymorphic, not just V-Tach."
- "Twisting of the points" (Torsades).
- **Cure**: Magnesium Sulfate (push), not just Amiodarone/Shock.
**Mechanic**: Direct critique from the new boss on clinical precision.

---

## CASE PC086: "The Clamshell Flip"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC086 |
| **Patient Name** | John Doe (Dishwasher) |
| **Age** | Adult |
| **Chief Complaint** | Stab wound right chest |
| **Actual Diagnosis** | Hilar Vessel Hemorrhage |
| **Difficulty** | Legendary |
| **Teaching Focus** | Clamshell Thoracotomy, Hilar Flip Maneuver |

### The Maneuver

**Procedure**: Left Thoracotomy -> Cross Clamp Aorta -> No bleeding found.
**Escalation**: "Convert to Clamshell" (Open right side too).
**Finding**: Massive bleeding from the Hilum (Lung root).
**The Move**: **Hilar Flip**. Rotating the lung 180 degrees to kink the "hose" and stop bleeding.
**Save**: Retract lung, confirm dry, internal paddle defib using "double squeeze" method.

---

## CASE PC087: "The Silent Abuse"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC087 |
| **Patient Name** | Kylie Connors |
| **Age** | 9 |
| **Chief Complaint** | Fall on stairs, Chin lac |
| **Actual Diagnosis** | Physical Abuse |
| **Difficulty** | Hard (Investigation) |
| **Teaching Focus** | Pediatric abuse screening, Urinalysis interpretation |

### The Investigation

**Clues**:
- Bruising on back (unusual for stairs).
- History of broken wrist/shin.
- "Dad's girlfriend" seems nervous.
- Gross Hematuria in urine.

**Dilemma**: Is the blood renal trauma or vaginal trauma? (Abuse indicator).
**Action**: Social Work consult, creating a safe space to talk.
**Interaction**: Mel bonds over glasses/hair to build trust.

---

## CASE PC088: "The Safe Haven"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC088 |
| **Patient Name** | Baby Doe |
| **Age** | ~6 weeks |
| **Chief Complaint** | Abandoned in Waiting Room |
| **Actual Diagnosis** | Healthy / Exposure risk |
| **Difficulty** | Medium |
| **Teaching Focus** | Safe Haven laws, Fever workup by age |

### The Rules

**Scenario**: Baby left in bathroom.
**Decision Tree**:
- **< 28 Days**: Full Sepsis Workup (LP, Labs, Admit). Safe Haven applies (no crime).
- **> 28 Days**: PECARN/Step-by-step criteria. Child Abandonment (crime).
**Mechanic**: Estimating age to determine legal/medical pathway.

---

## CASE PC089: "The Occult Scaphoid"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC089 |
| **Patient Name** | Mr. Williams |
| **Age** | Elderly |
| **Chief Complaint** | Wrist Pain |
| **Actual Diagnosis** | Scaphoid Fracture + Early Dementia |
| **Difficulty** | Medium |
| **Teaching Focus** | Snuffbox tenderness, Dementia screening |

### The Hidden Fracture

**Medical**: Wrist X-ray negative.
**Lesson**: Scaphoid fractures often don't show on Day 1. Splint anyway ("Thumb Spica").
**Narrative**: Patient confusion ("Taco Tuesday"). Mel picks up on cognitive decline while treating the wrist.

---

## CASE PC090: "The POLST Passing"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC090 |
| **Patient Name** | Ethan Bostick |
| **Age** | 79 |
| **Chief Complaint** | Altered Mental Status |
| **Actual Diagnosis** | Natural Death |
| **Difficulty** | Narrative |
| **Teaching Focus** | Honor the POLST, Dignity in death |

### The Good Death

**Scenario**: Patient codes while resident is presenting.
**Action**: "No CPR, No Shock." (POLST present).
**Response**: "Making sure he's comfortable."
**Teaching**: "Asystole. Quick and painless. We should all be so lucky."
**Moment**: The "Moment of Silence" mechanic introduced.

---

---

## CASE PC091: "The Nazi Salute"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC091 |
| **Patient Name** | Allen Billings |
| **Age** | Adult |
| **Chief Complaint** | Arm stuck over head |
| **Actual Diagnosis** | Inferior Glenohumeral Dislocation (Luxatio Erecta) |
| **Difficulty** | Medium |
| **Teaching Focus** | Rare dislocations, Reduction technique |

### The Harry Potter Spell

**Presentation**: Arm locked upright. "Luxatio Erecta".
**Controversy**: Surgery wants to go to OR. Robby ("The Cowboy") wants to reduce in ER.
**Procedure**:
1. Sedation.
2. Hand in axilla ("Four fingers deep").
3. Convert to Anterior Dislocation.
4. Reduce.
**Quote**: "I am the OR."

---

## CASE PC092: "The Maggot Cast"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC092 |
| **Patient Name** | Mr. Digby |
| **Age** | Homeless |
| **Chief Complaint** | Itchy Cast |
| **Actual Diagnosis** | Myiasis (Maggot Infestation) under old cast |
| **Difficulty** | Gross-Out |
| **Teaching Focus** | Ethyl Chloride for bugs, Compassion |

### The Reveal

**Scene**: Cutting off a cast that's been on for "years".
**Horror**: Cast is full of live maggots.
**Technique**:
1. Ethyl Chloride Spray (Freeze them).
2. Irrigate "like hell".
**Outcome**: Clean, treat skin, new clothes.

---

## CASE PC093: "The Immaculate Infection"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC093 |
| **Patient Name** | Sister Grace |
| **Age** | Adult (Nun) |
| **Chief Complaint** | Eye Redness |
| **Actual Diagnosis** | Gonococcal Conjunctivitis |
| **Difficulty** | Diagnostic Bias |
| **Teaching Focus** | Do not stereotype. Gram Stain results. |

### The twist

**Lab**: Gram-negative intracellular diplococci (Gonorrhea).
**Patient**: A Nun. "Only married to God."
**Bias**: Lab error? "Immaculate Infection"?
**Reality**: Handling dirty laundry at a shelter without gloves.
**Lesson**: Trust the lab, find the source (Fomites).

---

## CASE PC094: "The Broccoli Block"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC094 |
| **Patient Name** | Barry Mitchell |
| **Age** | Adult |
| **Chief Complaint** | Choking / Stridor |
| **Actual Diagnosis** | Foreign Body Airway Obstruction (Food) |
| **Difficulty** | High (Airway) |
| **Teaching Focus** | Ketamine-Only Laryngoscopy |

### The Procedure

**Scenario**: Upper airway obstruction. Heimlich failed.
**Debate**: Ketamine+Roc (Paralyze) vs. Ketamine Only.
**Choice**: **Ketamine Only** (Preserves respiratory drive).
**Action**: Look with blade, grab broccoli with Magill forceps.
**Outcome**: Immediate relief. No intubation needed.

---

## CASE PC095: "The Hardest Anniversary"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC095 |
| **Patient Name** | Ian Randall |
| **Age** | Adult |
| **Chief Complaint** | Priapism (>8 hours) |
| **Actual Diagnosis** | Medication Overdose (Double injection) |
| **Difficulty** | Medium (Procedure) |
| **Teaching Focus** | Priapism aspiration and irrigation |

### The Drain

**History**: 20th Anniversary. Double dose of ED meds.
**Procedure**:
1. Dorsal Penile Nerve Block (10 and 2 o'clock).
2. Large gauge needle into Corpus Cavernosum (2cm deep).
3. Aspirate blood (dark/ischemic).
4. Irrigate with Phenylephrine.
**Awkwardness**: "Massaging the shaft" suggested by Mel.

---

## CASE PC096: "The Acidic Roofer"

### Overview

| Field | Value |
|-------|-------|
| **Case ID** | PC096 |
| **Patient Name** | Orlando Diaz |
| **Age** | Adult |
| **Chief Complaint** | Altered Mental Status |
| **Actual Diagnosis** | Diabetic Ketoacidosis (DKA) |
| **Difficulty** | Medium |
| **Teaching Focus** | DKA Workup, Potassium before Insulin |

### The Algorithm

**Signs**: Ketones on breath, Glucose > 500.
**Labs**: Anion Gap 24, pH 6.97.
**Treatment**:
1. IV Fluids.
2. Check Potassium (If < 3.3, hold insulin!).
3. Insulin Drip.
**Conflict**: Student suggests potassium check before insulin (Correct), saving the patient from arrhythmia.

---

*End of New Cases*
*Document Version 3.1*
*Inspired by "The Pitt" Seasons 1 & 2*
