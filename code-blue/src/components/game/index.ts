// src/components/game/index.ts
// Central export for game components

// Medical Equipment (from prototypes)
export { VitalSignsMonitor, EKGStrip } from './VitalSignsMonitor';
export { LabResults, createCBC, createBMP, createCardiacPanel, createABG, createSepsisLabs } from './LabResults';
export { ImagingViewer, createNormalChestXray, createPneumoniaChestXray, createCTHeadSAH, createCTAbdomenAppendicitits } from './ImagingViewer';
export { TwelveLeadEKG, createNormalEKG, createInferiorSTEMI, createAnteriorSTEMI, createLateralSTEMI } from './TwelveLeadEKG';

// Core Game Components
export { SkillCheckDisplay } from './SkillCheckDisplay';
export type { SkillCheckDisplayProps } from './SkillCheckDisplay';

export { DialogueBox } from './DialogueBox';
export type { DialogueBoxProps } from './DialogueBox';

export { InternalVoicePanel, FloatingVoice } from './InternalVoicePanel';
export type { InternalVoicePanelProps, FloatingVoiceProps } from './InternalVoicePanel';

// Board System
export { BoardEntry } from './BoardEntry';
export type { BoardEntryProps } from './BoardEntry';

export { BoardEntryDetail } from './BoardEntryDetail';
export type { BoardEntryDetailProps } from './BoardEntryDetail';

export { DiagnosticBoard } from './DiagnosticBoard';
export type { DiagnosticBoardProps } from './DiagnosticBoard';

// Patient System
export { PatientChart } from './PatientChart';
export type { PatientChartProps } from './PatientChart';

export { PatientEncounter } from './PatientEncounter';
export type { PatientEncounterProps } from './PatientEncounter';

// NPC & Relationships
export { RelationshipPanel, NPCCard, NPCDetail } from './RelationshipPanel';
export type { RelationshipPanelProps, NPCCardProps } from './RelationshipPanel';

// Shift System
export { ShiftStartScreen } from './ShiftStartScreen';
export type { ShiftStartScreenProps } from './ShiftStartScreen';

export { ShiftEndScreen } from './ShiftEndScreen';
export type { ShiftEndScreenProps } from './ShiftEndScreen';

export { ShiftHUD } from './ShiftHUD';
export type { ShiftHUDProps } from './ShiftHUD';

export { CaseQueue } from './CaseQueue';
export type { CaseQueueProps } from './CaseQueue';

export { ShiftManager } from './ShiftManager';
export type { ShiftManagerProps } from './ShiftManager';

// Main Menu & System
export { MainMenu } from './MainMenu';
export type { MainMenuProps } from './MainMenu';

export { SettingsScreen } from './SettingsScreen';
export type { SettingsScreenProps } from './SettingsScreen';


export { DemoEndScreen } from './DemoEndScreen';
export type { DemoEndScreenProps } from './DemoEndScreen';

export { CPCMode } from './CPCMode';
export type { CPCModeProps } from './CPCMode';

export { GameContainer } from './GameContainer';

