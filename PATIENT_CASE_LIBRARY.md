# CODE BLUE: Patient Case Library

## Case Index

| ID | Name | Chief Complaint | Actual Diagnosis | Difficulty | Teaching Focus |
|----|------|-----------------|------------------|------------|----------------|
| PC001 | Elena Martinez | Chest pain | Inferior STEMI | Medium | Atypical MI presentation, women's cardiac symptoms |
| PC002 | Marcus Thompson | "Just need pain meds" | Appendicitis | Medium | Anchoring bias, the "frequent flyer" trap |
| PC003 | Sarah Chen | Headache | Subarachnoid hemorrhage | Hard | "Worst headache of life", LP, CT timing |
| PC004 | Baby Lily | Won't stop crying | Intussusception | Hard | Pediatric assessment, non-verbal patients |
| PC005 | Robert Hayes | Confusion | Hypoglycemia | Easy | Altered mental status workup, quick wins |
| PC006 | Maria Gonzalez | Shortness of breath | Pulmonary embolism | Medium | Wells criteria, D-dimer, risk factors |
| PC007 | James Wilson | Abdominal pain | Abdominal aortic aneurysm | Hard | Vascular emergency, time-critical |
| PC008 | Destiny Williams | "Panic attack" | Diabetic ketoacidosis | Medium | Psych vs medical, Kussmaul breathing |
| PC009 | Frank Morrison | Found down | Opioid overdose | Easy | Narcan, harm reduction, social complexity |
| PC010 | Helen Park | Weakness | Stroke (CVA) | Medium | FAST exam, door-to-needle time |

---

## CASE PC001: Elena Martinez (Reference Case)
*See SAMPLE_SCENE.md for full implementation*

---

## CASE PC002: "The Frequent Flyer"

### Patient Data

```yaml
patient:
  id: "PC002"
  name: "Marcus Thompson"
  age: 34
  sex: "M"
  
  chief_complaint: "Abdominal pain, need something for the pain"
  
  vitals:
    heart_rate: 92
    blood_pressure: { systolic: 138, diastolic: 88 }
    respiratory_rate: 18
    oxygen_saturation: 99
    temperature: 99.8  # Subtle fever - easy to miss
  
  allergies: ["Morphine - nausea"]
  
  medications:
    - "None currently"
  
  past_medical_history:
    - "Chronic back pain"
    - "History of opioid use disorder (in recovery)"
    - "Anxiety"
  
  social_history:
    smoking: true
    alcohol: "Quit 2 years ago"
    drugs: "In recovery, 18 months clean"
    occupation: "Warehouse worker"
  
  hidden_condition: "Acute appendicitis"
  acuity: 3  # Appears lower acuity than reality
```

### The Setup

**EMS/Triage Notes**:
> 34 y/o M, ambulatory, c/o abdominal pain. States he needs "something strong for pain." 
> Known to department - multiple prior visits for pain complaints.
> Triage nurse note: "Frequent flyer, drug-seeking behavior suspected."

**The Trap**: Everyone has already decided he's drug-seeking. The triage note biases everyone who reads it. His vital signs are "almost normal." The subtle fever is dismissed or not noticed.

**The Reality**: He has appendicitis. It's early, which is why the presentation is subtle. If missed, it will perforate.

### Staff Attitudes (Before Diagnosis)

**MARIA (Charge Nurse)**: 
> [sighing] "Room 6. Mr. Thompson is back. Third time this month. Good luck."

**JIMMY (Resident)**:
> "Oh, Marcus. Yeah, I know him. Look, just do a quick exam, make sure he's not dying, and we'll give him some Toradol and discharge him. Don't spend too much time."

**Internal Voice - INSTINCT**:
> *Everyone's already made up their mind. But look at him. Something's different this time.*

**Internal Voice - ADVOCACY**:
> *He's a person. He has a chart full of judgments. When's the last time someone actually examined him?*

### History Dialogue Tree

**[ENTERING ROOM]**

Marcus is sitting on the stretcher, arms crossed, looking defensive. He's pale and sweating slightly.

**MARCUS**: Finally. I've been waiting two hours. My stomach is killing me.

---

**[DIALOGUE OPTIONS - Opening]**

→ **"Mr. Thompson, I'm a medical student. Can you tell me about your pain?"**
   (HISTORY DC 6 - Standard opening)

→ **"I saw in your chart you've been here before. What's different this time?"**
   (HISTORY DC 8 - Acknowledges history, invites comparison)
   *Internal Voice - DOUBT: Is that too leading? Or is it exactly right?*

→ **"The team mentioned you're in recovery. I want you to know that doesn't change how I'll treat you."**
   (EMPATHY DC 10 - Addresses the elephant in the room)
   *SUCCESS: Marcus visibly relaxes. +2 to subsequent HISTORY checks with him.*

→ *Look at his chart first without talking to him*
   (HIERARCHY-appropriate but misses connection opportunity)

---

**[IF: Empathy approach successful]**

**MARCUS**: [surprised, then softening]

You're... the first person who's said that to me. Usually they just look at my chart and decide I'm lying before I open my mouth.

*Internal Voice - HUMANITY: He's been treated like a problem, not a patient. That's how people fall through the cracks.*

**MARCUS**: Look, I know what everyone thinks. But this is different. This isn't my back. This started yesterday, and it's getting worse. I almost didn't come in because I knew how it would look.

---

### Key History Questions

**"Where exactly is the pain?"**
> At first it was all over, kind of around my belly button. But now it's moved. It's here. [Points to right lower quadrant]

*Internal Voice - MEMORY: Periumbilical pain migrating to RLQ. That's the classic appendicitis pattern. Classic. When's the last time you saw something classic?*

**"What does it feel like?"**
> Sharp. Constant. Worse when I move. I tried to walk here and almost couldn't.

**"Any nausea or vomiting?"**
> I threw up twice this morning. Couldn't keep anything down.

**"When did you last eat?"**
> Yesterday lunch. Nothing since. Can't even think about food.

*Internal Voice - PATHOPHYSIOLOGY: Anorexia, nausea, vomiting, migrating pain. This is textbook.*

**"Any fever or chills?"**
> I've been feeling hot. Figured it was just... you know, withdrawal symptoms or something. Even though I'm clean.

*Internal Voice - DOUBT: His temperature was 99.8. Low-grade. Everyone ignored it. Did you?*

**"Have you had your appendix out?"**
> No. Why? You think that's what this is?

---

### Physical Exam Findings

**Vital Signs Review (TRIAGE DC 6)**:
- HR 92 - mildly elevated
- Temp 99.8°F - low-grade fever
- **If noticed**: These vitals don't fit "drug seeking"

**Abdominal Exam (PHYSICAL_EXAM DC 10)**:

SUCCESS reveals:
- RLQ tenderness with guarding
- Positive Rovsing's sign (LLQ pressure → RLQ pain)
- Positive psoas sign (pain with right hip flexion)
- Rebound tenderness (pain when releasing pressure)

*Internal Voice - PHYSICAL_EXAM: Feel that rigidity. That's peritoneal irritation. This isn't fake.*

FAILURE:
- Notes "mild tenderness" without localizing signs
- Misses guarding (patient tenses generally due to anxiety)

**Observation (Automatic)**:
- Patient lying very still (movement worsens peritonitis)
- Facial grimacing on palpation is genuine
- Not exaggerating for attention - actually minimizing

---

### Labs & Imaging

**Labs (if ordered)**:
```
WBC: 14.2 (elevated - left shift)
Neutrophils: 82% (elevated)
CRP: 4.8 (elevated)
Lipase: Normal
BMP: Normal
Lactate: 1.4 (upper normal - early)
```

**INTERPRETATION DC 8**:
- SUCCESS: "Elevated WBC with left shift suggests bacterial infection. Combined with clinical picture, highly concerning for appendicitis."
- PARTIAL: "Some elevated values, could be infection?"
- FAILURE: "Labs look mostly normal" (misses significance)

**CT Abdomen (if ordered)**:
```
FINDINGS: Dilated appendix measuring 12mm with periappendiceal 
fat stranding. No free air. No abscess.

IMPRESSION: Acute uncomplicated appendicitis.
```

**INTERPRETATION DC 6** (imaging is definitive):
- SUCCESS: Confirms appendicitis, can present to attending for surgical consult

---

### Decision Points

**[CRITICAL DECISION: After History & Exam]**

```
What do you do?

[ ] Present to Jimmy: "I think he might actually have something. Can you examine him?"
    (HIERARCHY DC 8 - Appropriate escalation)
    SUCCESS: Jimmy re-examines, agrees, orders CT
    
[ ] Order CT yourself and present with results
    (HIERARCHY DC 12 - Overstepping, but efficient)
    SUCCESS: Faster diagnosis, slight friction with resident
    FAILURE: Jimmy annoyed at being bypassed
    
[ ] Trust Jimmy's initial assessment, do brief exam, discharge
    (WRONG PATH - Patient returns in 24h with perforation)
    
[ ] Document thoroughly and express concerns in chart
    (CYA approach - delays care but creates paper trail)
```

---

### Outcome Branches

**CORRECT: Appendicitis identified, surgery consulted**

**MARCUS**: [as he's wheeled to OR]
You actually listened. You actually... thank you. Everyone else just saw the addict.

**DR. OKONKWO** (if she learns):
> You trusted your exam over the chart's narrative. That's good medicine. Charts carry bias. Bodies carry truth.

**LESSON UNLOCKED: "The Chart Lies"**
*+2 to PHYSICAL_EXAM checks when chart suggests low acuity*
*+1 to ADVOCACY checks when patient has stigmatized history*

**XP**: +40 (correct diagnosis against bias)
**Relationship**: Jimmy +1 (you caught something he missed - initially awkward, then respect)

---

**WRONG: Discharged without diagnosis**

*[24 hours later - Shift start]*

**JIMMY**: [grimly] Remember Marcus Thompson? The guy you saw yesterday?

**YOU**: The abdominal pain?

**JIMMY**: His appendix perforated. He came back by ambulance at 2 AM. Septic. He's in the ICU now.

*Internal Voice - DOUBT: You knew something was wrong. You felt it. And you let them talk you out of it.*

*Internal Voice - COMPOSURE: This is how you learn. This is the cost of learning.*

**ECHO UNLOCKED: "Marcus"**
*A patient who fell through the cracks because of how he was labeled.*
*+1 to INSTINCT when your gut says "look closer"*
*-1 to COMPOSURE when discharge pressure conflicts with clinical concern*

---

### Teaching Points

1. **Anchoring Bias**: Prior visits and labels can blind providers to new presentations
2. **Appendicitis Presentation**: Periumbilical pain → RLQ migration, anorexia, nausea, low-grade fever
3. **Physical Exam Findings**: McBurney's point, Rovsing's sign, psoas sign, rebound tenderness
4. **Lab Patterns**: Leukocytosis with left shift, elevated inflammatory markers
5. **Stigma in Healthcare**: Patients with substance use history are often undertreated for pain and underdiagnosed
6. **Trust Your Exam**: Physical findings trump assumptions

### CPC Coding Elements

**Diagnosis**: K35.80 - Acute appendicitis, unspecified
**Procedure**: 44970 - Laparoscopic appendectomy (if surgery)
**E/M Level**: 99284 - ED visit, high complexity

---

## CASE PC003: "Worst Headache of My Life"

### Patient Data

```yaml
patient:
  id: "PC003"
  name: "Sarah Chen"
  age: 42
  sex: "F"
  
  chief_complaint: "Severe headache"
  
  vitals:
    heart_rate: 88
    blood_pressure: { systolic: 168, diastolic: 95 }  # Elevated
    respiratory_rate: 16
    oxygen_saturation: 98
    temperature: 98.9
  
  allergies: []
  
  medications:
    - "Birth control pills"
    - "Occasional ibuprofen"
  
  past_medical_history:
    - "Migraines (but states this is different)"
    - "Hypertension - undiagnosed, untreated"
  
  social_history:
    smoking: false
    alcohol: "Social, 2-3 drinks/week"
    drugs: "None"
    occupation: "Attorney"
  
  hidden_condition: "Subarachnoid hemorrhage (ruptured berry aneurysm)"
  acuity: 2  # Should be recognized as emergent
```

### The Setup

**Presentation**:
> 42 y/o F, c/o headache x 4 hours. States it came on suddenly while at work. 
> Patient appears uncomfortable but alert and oriented.

**The Trap**: She has a migraine history. It's tempting to assume this is "just another migraine." She's alert and talking, so how bad can it be? The phrase "worst headache of my life" is the critical clue that elevates this beyond migraine.

**The Reality**: She has a subarachnoid hemorrhage from a ruptured aneurysm. Without treatment, she may rebleed and die within hours.

### Critical Dialogue

**[ENTERING ROOM]**

Sarah is lying on the stretcher with the lights dimmed. She's holding a cold pack to her forehead. Her husband David is beside her, looking worried.

**SARAH**: [squinting] Can you turn the lights down more? Everything is too bright.

**DAVID**: She's had migraines before, but she says this one is different. Should I be worried?

---

**[KEY QUESTION - HISTORY DC 6]**

**"Can you describe the headache? When did it start?"**

**SARAH**: I was in a meeting. One second I was fine, and the next... it was like someone hit me in the back of the head with a baseball bat. I've never felt anything like it. I've had migraines for twenty years. This isn't a migraine.

*Internal Voice - INSTINCT: "Thunderclap headache." Sudden onset. Worst of life. Your brain should be screaming right now.*

*Internal Voice - MEMORY: Subarachnoid hemorrhage. SAH. "Worst headache of my life" is the classic phrase. CT head. If negative, lumbar puncture.*

*Internal Voice - DIFFERENTIAL: Yes, it could be migraine. But you can't assume that. Not with this description. SAH is a "can't miss" diagnosis.*

---

**[CRITICAL HISTORY - Must ask these]**

**"Did you pass out or lose consciousness, even briefly?"**
> I felt dizzy for a second when it hit. David said I kind of... zoned out? For maybe ten seconds. I don't remember that part.

*Internal Voice - PATHOPHYSIOLOGY: Brief LOC with thunderclap headache. Blood in subarachnoid space. Increased intracranial pressure. This is real.*

**"Any neck stiffness?"**
> [tries to move neck, winces] Actually, yes. I thought I just slept wrong but it's gotten worse.

**"Any nausea or vomiting?"**
> I threw up in the car on the way here.

**"Any visual changes?"**
> The light sensitivity is worse than usual. And I thought I saw some floaters.

---

### Physical Exam Findings

**Neurological Exam (PHYSICAL_EXAM DC 10)**:

SUCCESS reveals:
- Photophobia (severe light sensitivity)
- Nuchal rigidity (neck stiffness - meningismus)
- Mild confusion (subtle - she's oriented but slower than baseline)
- Equal pupils, reactive (but check for aneurysm-related CN III palsy)

*Internal Voice - PHYSICAL_EXAM: Nuchal rigidity. Blood irritating the meninges. That's not migraine.*

**Fundoscopic Exam (PHYSICAL_EXAM DC 14)**:
- SUCCESS: May see subhyaloid hemorrhages (blood near retina)
- FAILURE: Exam is normal or inconclusive (doesn't rule out SAH)

**Blood Pressure**:
- 168/95 - significantly elevated
- *Internal Voice - PATHOPHYSIOLOGY: The hypertension isn't causing the headache. It might be a response to pain, or she might have underlying HTN that contributed to aneurysm rupture.*

---

### Diagnostic Workup

**CT Head Non-Contrast (MUST ORDER)**:

Sensitivity for SAH: ~95% if within 6 hours, drops after that.

```
FINDINGS: Hyperdensity in the suprasellar cistern and bilateral 
sylvian fissures concerning for subarachnoid hemorrhage.

IMPRESSION: Subarachnoid hemorrhage. Recommend CTA head for 
aneurysm evaluation.
```

**INTERPRETATION DC 10**:
- SUCCESS: Recognize the hyperdensity pattern of acute blood
- The radiologist will also call, but recognizing it yourself is important

*Internal Voice - INTERPRETATION: White in the cisterns. That's blood. That's SAH. Call neurosurgery. Now.*

**If CT is NEGATIVE but suspicion remains**:
- Lumbar puncture required
- Looking for xanthochromia (yellow discoloration) or RBCs that don't clear
- LP timing: ideally 6-12 hours after onset

---

### Time Pressure Element

**[TIMED DECISION - after getting history]**

```
Sarah's headache started 4 hours ago. You have a window.

What do you order?

[ ] CT Head non-contrast STAT
    (CORRECT - Fastest way to diagnose)
    Time: 30 minutes for result
    
[ ] CT Head with contrast
    (WRONG - Contrast obscures acute blood)
    
[ ] MRI Brain
    (WRONG - Takes too long, CT is first-line for acute SAH)
    
[ ] Give migraine medications and observe
    (DANGEROUS - Delays diagnosis)
    
[ ] Lumbar puncture first
    (WRONG ORDER - CT first to rule out mass/increased ICP before LP)
```

**[COMPLICATION - if delayed >2 hours]**

Sarah suddenly becomes more confused. Her headache intensifies.

**SARAH**: David... David, I can't... something's wrong...

*Internal Voice - INSTINCT: She's rebleeding. Move. MOVE.*

**REBLEED EVENT**:
- BP spikes to 200/110
- Becomes obtunded (decreased consciousness)
- Now a critical emergency
- Outcome significantly worse

---

### Outcome Branches

**CORRECT: Rapid CT, SAH identified, Neurosurgery consulted**

**NEUROSURGERY RESIDENT**: Good pickup. She's got a 6mm berry aneurysm at the Acom. We're taking her for coiling tonight. You probably saved her life by not waiting.

**DR. LINDQVIST** (if present):
> The data on SAH is clear: time to treatment directly correlates with outcome. "Worst headache of life" is a phrase that should make you move immediately. You moved. Well done.

**LESSON UNLOCKED: "Thunderclap"**
*"Worst headache of my life" = CT head stat, every time*
*+2 to TRIAGE when patient describes sudden-onset severe headache*

**XP**: +50 (time-critical diagnosis)
**Relationship**: Dr. Lindqvist +2 (she respects evidence-based decision making)

---

**WRONG: Delayed or missed diagnosis**

*[If treated as migraine and discharged]*

You get a call 6 hours into your next shift.

**DR. OKONKWO**: [carefully] The patient you discharged yesterday with headache. Sarah Chen. She collapsed at home. She's being airlifted to the neuro ICU. Massive SAH with rebleed.

*Internal Voice - DOUBT: You heard her say it. "Worst headache of my life." You heard it and you didn't act.*

**ECHO UNLOCKED: "Thunderclap Ignored"**
*A woman who said the words. Who was not believed.*
*Permanent -1 to COMPOSURE when patients describe severe sudden headaches*
*Permanent +2 to TRIAGE for headache - you will never miss this again*

---

### Teaching Points

1. **"Worst headache of my life"**: Always investigate. Never assume migraine without workup.
2. **SAH Presentation**: Thunderclap onset, neck stiffness, nausea/vomiting, photophobia, possible LOC
3. **CT Timing**: Sensitivity decreases after 6 hours - speed matters
4. **LP Indication**: If CT negative but clinical suspicion high, LP is required
5. **Rebleed Risk**: Untreated aneurysms have high rebleed rate, especially in first 24 hours
6. **Hunt-Hess Scale**: Grading system for SAH severity (Grade I-V)

### CPC Coding Elements

**Diagnosis**: I60.7 - Subarachnoid hemorrhage from unspecified intracranial artery
**Secondary**: I67.1 - Cerebral aneurysm, nonruptured (if found but not ruptured)
**Procedure**: 61697 - Aneurysm clipping (if surgical) or 61710 - Endovascular coiling

---

## CASE PC004: "She Won't Stop Crying"

### Patient Data

```yaml
patient:
  id: "PC004"
  name: "Lily Okonkwo"  # No relation to Dr. Okonkwo - different family
  age: 8 months
  sex: "F"
  
  chief_complaint: "Crying, won't stop, not acting right"
  
  vitals:
    heart_rate: 165  # High for age but can be normal with crying
    blood_pressure: { systolic: 75, diastolic: 50 }  # Normal for age
    respiratory_rate: 32
    oxygen_saturation: 98
    temperature: 100.2  # Low-grade fever
  
  allergies: []
  
  medications: []
  
  past_medical_history:
    - "Born full-term, no complications"
    - "Vaccinations up to date"
    - "No prior hospitalizations"
  
  family_history:
    - "No significant family history"
  
  hidden_condition: "Intussusception"
  acuity: 2  # Pediatric emergencies can decompensate fast
```

### The Setup

**Presentation**:
> 8-month-old F brought by parents. Intermittent crying episodes for past 12 hours.
> Parents state baby draws up legs and screams, then becomes quiet and lethargic.

**The Trap**: Parents are anxious first-timers, it's 2 AM, and "won't stop crying" sounds like a baby being a baby. The temptation is to reassure and discharge. The episodic nature of the symptoms is the key clue—intussusception causes paroxysmal colicky pain.

**The Reality**: The baby has intussusception—the bowel is telescoping into itself. Without treatment, it will become ischemic and potentially necrotic.

### Parent Interview

**[ENTERING ROOM]**

Two exhausted young parents—Amara and Kwame—sit with a baby who is currently quiet but listless. Amara is holding Lily, rocking her automatically.

**AMARA**: Please, something is wrong with her. I know everyone thinks first-time parents are crazy, but this isn't normal. She's not herself.

**KWAME**: She was fine yesterday. Then she started these... episodes. She screams like she's in pain, pulls her legs up, and then she just... stops. Goes quiet. Too quiet.

*Internal Voice - INSTINCT: Listen to the parents. They know their child.*

*Internal Voice - TRIAGE: 8 months old. Paroxysmal episodes. Lethargy between. This is sick until proven otherwise.*

---

**[KEY QUESTIONS - HISTORY DC 10 - Peds histories are harder]**

**"Can you describe the crying episodes?"**
> AMARA: She screams. Like, really screams. High-pitched. And she pulls her legs up to her belly. It lasts maybe 5-10 minutes, and then she goes limp. Falls asleep almost. Then 20 minutes later, it starts again.

*Internal Voice - MEMORY: Paroxysmal colicky pain with leg drawing. Intussusception. Classic. Check for currant jelly stool.*

**"Has she had any vomiting?"**
> KWAME: She threw up twice. The second time it looked... greenish? Is that bad?

*Internal Voice - PATHOPHYSIOLOGY: Bilious vomiting in an infant. That's obstruction until proven otherwise. This is surgical.*

**"How are her diapers? Any changes in stool?"**
> AMARA: She hasn't pooped since last night. And the last one was... weird. Kind of dark. Reddish. I thought maybe it was from the new baby food.

*Internal Voice - DIFFERENTIAL: "Currant jelly stool." Blood and mucus. That's intussusception. Order the ultrasound now.*

**"Is she eating normally?"**
> She won't nurse. Just turns her head away. That's not like her.

---

### Physical Exam Findings

**Pediatric Assessment (PHYSICAL_EXAM DC 12 - harder in children)**

General:
- Lethargic, not interested in surroundings
- Not tracking your movements well
- Quiet when she should be fussy (a baby this sick should be crying)

*Internal Voice - TRIAGE: A quiet sick baby is scarier than a screaming sick baby. Crying takes energy.*

Abdominal Exam:
- Distended abdomen
- **SUCCESS DC 14**: Palpable "sausage-shaped mass" in right upper quadrant
- Decreased bowel sounds
- Tender to palpation (baby grimaces, cries weakly)

**"Dance's Sign" (PHYSICAL_EXAM DC 16 - advanced finding)**:
- Empty right lower quadrant on palpation
- Indicates bowel has moved (telescoped)

---

### Diagnostic Workup

**Abdominal X-ray (INTERPRETATION DC 10)**:
```
FINDINGS: Paucity of gas in right lower quadrant. 
Soft tissue mass effect in right upper abdomen.
No free air.

IMPRESSION: Findings concerning for intussusception.
Recommend ultrasound for confirmation.
```

**Ultrasound Abdomen (GOLD STANDARD)**:
```
FINDINGS: "Target sign" / "doughnut sign" in right abdomen 
consistent with ileocolic intussusception. 
Telescoping segment measures approximately 4 cm.
Color Doppler shows maintained blood flow.

IMPRESSION: Ileocolic intussusception. No evidence of ischemia.
```

*Internal Voice - INTERPRETATION: Target sign on ultrasound. That's the bowel inside itself. Call surgery. Or better—call radiology for air enema reduction first.*

---

### Treatment Decision

**[CRITICAL DECISION]**

```
Intussusception confirmed. What's the next step?

[ ] Call Pediatric Surgery for operative reduction
    (APPROPRIATE if: perforation, peritonitis, or failed enema)
    
[ ] Call Interventional Radiology for air enema reduction
    (FIRST-LINE treatment - 80-90% success rate)
    
[ ] Admit for observation and serial exams
    (WRONG - Needs intervention, not observation)
    
[ ] IV fluids and pain management, watch
    (DANGEROUS - Delays definitive treatment)
```

**Correct Path**: Air enema reduction by radiology
- Non-operative
- High success rate if caught early
- Can watch during the procedure

---

### Procedure Scene (if you follow to radiology)

**[OPTIONAL SCENE - builds relationships, teaches]**

**RADIOLOGY TECH**: You can watch from here. We're going to inflate the colon with air and try to push the telescoped bowel back.

On the fluoroscopy screen, you watch the air column advance through the colon. It reaches the obstruction and stops.

**RADIOLOGIST**: Adding more pressure... come on...

The parents grip each other's hands.

Suddenly, air rushes past the obstruction. The "mass" disappears.

**RADIOLOGIST**: There we go. Reduced. She should feel better almost immediately.

From the procedure room, Lily starts crying—a full, healthy, angry cry.

**AMARA**: [sobbing] That's her. That's my baby.

*Internal Voice - HUMANITY: This is why you do this. This moment right here.*

---

### Outcome Branches

**CORRECT: Rapid diagnosis, successful reduction**

**AMARA**: [grabbing your hand] Thank you. You listened to us. You didn't tell us we were just paranoid parents.

**LESSON UNLOCKED: "Listen to Parents"**
*Parents know their child's baseline better than anyone*
*+2 to HISTORY checks when parents say "this isn't normal for them"*

**LESSON UNLOCKED: "Intussusception Triad"**
*Paroxysmal pain + bilious vomiting + currant jelly stool*
*+3 to DIFFERENTIAL for pediatric abdominal complaints*

**XP**: +60 (pediatric emergency, time-sensitive)
**Relationship**: Parents become return patients, remember you

---

**WRONG: Delayed diagnosis or missed**

*[If discharged or significantly delayed]*

**DR. WEBB**: [coldly] The baby you sent home with "colic"? She's in the OR. Perforated bowel. They're resecting necrotic intestine.

*Internal Voice - HUMANITY: Eight months old. Her whole life ahead of her. And you didn't listen.*

**ECHO UNLOCKED: "The Quiet Baby"**
*A child who couldn't tell you what was wrong*
*+2 to TRIAGE for all pediatric patients*
*Permanent weight on COMPOSURE when working with children*

---

### Teaching Points

1. **Pediatric Vital Signs**: Know age-appropriate normals
2. **Intussusception Classic Triad**: Colicky pain, vomiting, currant jelly stool (only 20% have all three)
3. **Physical Exam**: "Sausage-shaped mass," Dance's sign
4. **Imaging**: Ultrasound is gold standard - "target sign"
5. **Treatment**: Air/contrast enema first, surgery if failed or complicated
6. **Listen to Parents**: They know their child's baseline

### CPC Coding Elements

**Diagnosis**: K56.1 - Intussusception
**Procedure**: 74283 - Therapeutic enema, intussusception reduction

---

## CASE PC005: "He's Acting Strange"

### Patient Data

```yaml
patient:
  id: "PC005"
  name: "Robert Hayes"
  age: 68
  sex: "M"
  
  chief_complaint: "Confusion, acting strange"
  
  vitals:
    heart_rate: 102
    blood_pressure: { systolic: 158, diastolic: 88 }
    respiratory_rate: 18
    oxygen_saturation: 97
    temperature: 98.2
  
  allergies: ["Penicillin"]
  
  medications:
    - "Metformin 1000mg twice daily"
    - "Glipizide 10mg twice daily"  # Sulfonylurea - causes hypoglycemia
    - "Lisinopril 20mg daily"
    - "Atorvastatin 40mg daily"
  
  past_medical_history:
    - "Type 2 Diabetes Mellitus"
    - "Hypertension"
    - "Hyperlipidemia"
  
  social_history:
    smoking: false
    alcohol: "None"
    drugs: "None"
    occupation: "Retired teacher"
  
  hidden_condition: "Hypoglycemia"
  acuity: 2  # Altered mental status = emergent
```

### The Setup

**Presentation**:
> 68 y/o M brought by wife. Found at home "acting confused." 
> Wife reports he's been "not himself" for the past hour, slurred speech, unsteady.

**This is the "easy win" case** - designed for early in the game to teach the altered mental status workup and give the player confidence. The diagnosis is straightforward IF you check a blood glucose.

**The Teaching Moment**: Always check glucose in altered mental status. It takes 30 seconds and can be immediately life-saving.

### History

**[ENTERING ROOM]**

Robert is sitting on the stretcher, looking dazed. His wife Dorothy is beside him, worried.

**DOROTHY**: He was fine this morning. Made breakfast and everything. Then around 10, I found him in his study, talking to himself. Didn't recognize me at first.

**ROBERT**: [slurred] I'm fine. Dorothy, tell them I'm fine. I just need... need to...

*Internal Voice - TRIAGE: Altered mental status. What's the first thing you check?*

*Internal Voice - MEMORY: Glucose. Always glucose. "Dextrose" in the altered patient.*

---

**[RAPID HISTORY - HISTORY DC 6]**

**"Has he eaten today?"**
> DOROTHY: He made eggs for breakfast around 7. Took his medications like always. But then he said he wasn't hungry for his mid-morning snack.

*Internal Voice - PHARMACOLOGY: Metformin AND glipizide. Glipizide is a sulfonylurea. Causes hypoglycemia. He skipped food but took his meds.*

**"Is he diabetic? On insulin?"**
> DOROTHY: Diabetic, yes. Pills, not the shots. He's very careful about it usually.

**"Any recent illness?"**
> DOROTHY: He had a stomach bug a few days ago. Wasn't eating much.

*Internal Voice - PATHOPHYSIOLOGY: Decreased intake + continued diabetic medication = hypoglycemia. This is fixable. Check the glucose.*

---

### The Rapid Diagnosis

**[SKILL CHECK: TRIAGE DC 4]** *(Intentionally easy)*

**"Let me check your blood sugar real quick."**

Glucometer: **38 mg/dL**

*Internal Voice - INTERPRETATION: 38. Normal is 70-100. His brain is starving for sugar. Fix it now.*

---

### Treatment

**[DIALOGUE WITH NURSE]**

**YOU**: His glucose is 38. Can we get D50 ready?

**NURSE**: Already on it. You want to give it or should I?

**[CHOICE]**:

→ **"Walk me through it - I want to learn to do this myself"**
   (PROCEDURE DC 6 - IV dextrose administration)
   *Builds skill, nurse respects the learning attitude*

→ **"Please go ahead"**
   (Appropriate, faster, no skill gain)

---

**[IF: You administer D50 - SUCCESS]**

You push the D50 through the IV slowly.

Within two minutes, Robert blinks. Looks around. Focuses on his wife.

**ROBERT**: Dorothy? What... where am I? Why are we at the hospital?

**DOROTHY**: [crying with relief] Oh thank god. Bob. Bob, you scared me.

*Internal Voice - HUMANITY: Two minutes ago he didn't know his wife. Now he's back. Some saves are complicated. Some are this simple.*

---

### Debrief

**JIMMY**: Nice catch. Glucose is the easiest thing to miss and the easiest thing to fix. You'd be amazed how many people forget to check it.

**LESSON UNLOCKED: "Always Check Glucose"**
*In altered mental status, check glucose before anything else*
*+2 to TRIAGE for altered mental status presentations*

**XP**: +25 (straightforward diagnosis)
**Confidence boost**: This one was designed to make you feel competent

---

### Teaching Points

1. **Altered Mental Status Workup**: Glucose, vitals, oxygen are immediate checks
2. **Sulfonylureas**: Can cause prolonged hypoglycemia, may need admission
3. **Hypoglycemia Symptoms**: Confusion, slurred speech, diaphoresis, altered LOC
4. **D50**: 50% dextrose solution, given IV for severe hypoglycemia
5. **Whipple's Triad**: Symptoms of hypoglycemia + low glucose + resolution with glucose

### CPC Coding Elements

**Diagnosis**: E11.649 - Type 2 diabetes mellitus with hypoglycemia without coma
**Procedure**: 96374 - IV push, therapeutic injection
**E/M Level**: 99283 - ED visit, moderate complexity

---

## Additional Cases (Summaries for Development)

### PC006: Maria Gonzalez - Pulmonary Embolism
- 38 F on birth control with sudden-onset dyspnea and pleuritic chest pain
- Teaching: Wells criteria, D-dimer utility, CTPA
- Trap: Appears anxious, could be dismissed as panic attack
- Red flags: Recent long flight, unilateral leg swelling

### PC007: James Wilson - AAA Rupture
- 72 M with sudden severe back/abdominal pain, hypotensive
- Teaching: Vascular emergency, "dissecting/rupturing" triad
- Trap: Could be mistaken for kidney stone
- Time-critical: Dies without emergent surgery

### PC008: Destiny Williams - DKA
- 24 F brought in as "psych eval for panic attack"
- Teaching: Medical causes of psychiatric symptoms, Kussmaul breathing
- Trap: Young + anxious = assumed psychiatric
- Labs: Glucose 480, anion gap metabolic acidosis

### PC009: Frank Morrison - Opioid Overdose
- 45 M found unresponsive, pinpoint pupils, respiratory depression
- Teaching: Narcan, airway management, harm reduction
- Social complexity: Discuss addiction, stigma, resources
- Easy diagnosis, complex disposition

### PC010: Helen Park - Stroke
- 67 F with sudden facial droop, arm weakness, slurred speech
- Teaching: FAST exam, door-to-needle time, tPA criteria
- Trap: Symptoms can be subtle, mimic mimics
- Time-critical: Every minute matters for brain tissue

---

*End of Patient Case Library v1.0*
*Additional cases to be developed based on teaching priorities*
