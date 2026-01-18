// src/app/demo/medical-equipment/page.tsx
// Demo page showcasing all virtual medical equipment components

'use client';

import React, { useState } from 'react';
import { VitalSignsMonitor, EKGStrip, RhythmQuiz } from '@/components/game/VitalSignsMonitor';
import { TwelveLeadEKG, createInferiorSTEMI, createNormalEKG, createAnteriorSTEMI } from '@/components/game/TwelveLeadEKG';
import { LabResults, createCBC, createBMP, createCardiacPanel, createSepsisLabs } from '@/components/game/LabResults';
import { ImagingViewer, createNormalChestXray, createPneumoniaChestXray, createCTHeadSAH, createCTAbdomenAppendicitits } from '@/components/game/ImagingViewer';

export default function MedicalEquipmentDemo() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'ekg' | 'labs' | 'imaging'>('monitor');
  
  // Demo vital signs that change based on scenario
  const [scenario, setScenario] = useState<'normal' | 'tachycardia' | 'hypotensive' | 'critical'>('normal');
  
  const vitalsByScenario = {
    normal: {
      heartRate: 78,
      bloodPressure: { systolic: 122, diastolic: 78 },
      respiratoryRate: 16,
      oxygenSaturation: 98,
      temperature: 98.6,
    },
    tachycardia: {
      heartRate: 128,
      bloodPressure: { systolic: 142, diastolic: 88 },
      respiratoryRate: 22,
      oxygenSaturation: 95,
      temperature: 101.2,
    },
    hypotensive: {
      heartRate: 112,
      bloodPressure: { systolic: 82, diastolic: 54 },
      respiratoryRate: 24,
      oxygenSaturation: 91,
      temperature: 99.8,
    },
    critical: {
      heartRate: 145,
      bloodPressure: { systolic: 68, diastolic: 40 },
      respiratoryRate: 32,
      oxygenSaturation: 84,
      temperature: 103.1,
    },
  };

  const rhythmByScenario = {
    normal: 'normal_sinus' as const,
    tachycardia: 'sinus_tachycardia' as const,
    hypotensive: 'sinus_tachycardia' as const,
    critical: 'ventricular_tachycardia' as const,
  };

  // EKG scenarios
  const [ekgScenario, setEkgScenario] = useState<'normal' | 'inferior_stemi' | 'anterior_stemi'>('normal');
  const ekgFindings = {
    normal: createNormalEKG(75),
    inferior_stemi: createInferiorSTEMI(85),
    anterior_stemi: createAnteriorSTEMI(105),
  };

  // Lab scenarios
  const [labScenario, setLabScenario] = useState<'normal' | 'cardiac' | 'sepsis'>('normal');
  const labPanels = {
    normal: [createCBC(), createBMP()],
    cardiac: [createCBC(), createBMP(), createCardiacPanel({ Troponin: 0.85, BNP: 450 })],
    sepsis: createSepsisLabs(),
  };

  // Imaging scenarios
  const [imagingScenario, setImagingScenario] = useState<'normal_cxr' | 'pneumonia' | 'sah' | 'appendicitis'>('normal_cxr');
  const imagingStudies = {
    normal_cxr: createNormalChestXray(),
    pneumonia: createPneumoniaChestXray(),
    sah: createCTHeadSAH(),
    appendicitis: createCTAbdomenAppendicitits(),
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Virtual Medical Equipment Demo</h1>
        <p className="text-gray-400 mb-8">
          Interactive medical equipment components for CODE BLUE. All values and waveforms are procedurally generated.
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'monitor', label: '📊 Vital Signs Monitor' },
            { id: 'ekg', label: '💓 12-Lead EKG' },
            { id: 'labs', label: '🧪 Lab Results' },
            { id: 'imaging', label: '🔬 Imaging Viewer' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* VITAL SIGNS MONITOR TAB */}
        {activeTab === 'monitor' && (
          <div className="space-y-6">
            {/* Scenario Selector */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Select Patient Scenario</h3>
              <div className="flex gap-2">
                {[
                  { id: 'normal', label: 'Stable Patient', color: 'green' },
                  { id: 'tachycardia', label: 'Febrile / Tachycardic', color: 'yellow' },
                  { id: 'hypotensive', label: 'Hypotensive / Sepsis', color: 'orange' },
                  { id: 'critical', label: 'Critical / Coding', color: 'red' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScenario(s.id as any)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors
                      ${scenario === s.id 
                        ? `bg-${s.color}-600 text-white` 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Monitor Display */}
            <VitalSignsMonitor
              vitals={vitalsByScenario[scenario]}
              patientName="Demo Patient"
              roomNumber="12"
              rhythm={rhythmByScenario[scenario]}
              isAlarming={scenario === 'critical'}
            />

            {/* Additional Components */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rhythm Strip</h3>
                <EKGStrip 
                  rhythm={rhythmByScenario[scenario]} 
                  heartRate={vitalsByScenario[scenario].heartRate}
                  label="Lead II"
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Compact Mode</h3>
                <VitalSignsMonitor
                  vitals={vitalsByScenario[scenario]}
                  compactMode={true}
                />
              </div>
            </div>

            {/* Rhythm Quiz */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">🎓 Rhythm Identification Quiz</h3>
              <RhythmQuiz
                correctRhythm="atrial_fibrillation"
                heartRate={95}
                onAnswer={(correct) => console.log('Answer:', correct)}
                showHint={true}
              />
            </div>
          </div>
        )}

        {/* 12-LEAD EKG TAB */}
        {activeTab === 'ekg' && (
          <div className="space-y-6">
            {/* Scenario Selector */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Select EKG Pattern</h3>
              <div className="flex gap-2">
                {[
                  { id: 'normal', label: 'Normal Sinus Rhythm' },
                  { id: 'inferior_stemi', label: 'Inferior STEMI' },
                  { id: 'anterior_stemi', label: 'Anterior STEMI' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setEkgScenario(s.id as any)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors
                      ${ekgScenario === s.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 12-Lead Display */}
            <TwelveLeadEKG
              findings={ekgFindings[ekgScenario]}
              showAnnotations={true}
              showInterpretation={true}
              highlightAbnormalities={true}
              interactiveMode={true}
            />

            {/* Educational Note */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">📚 Learning Mode</h4>
              <p className="text-gray-300 text-sm">
                Click on any lead to see it enlarged with educational annotations. 
                Leads with ST changes are highlighted in red (elevation) or yellow (depression).
                The contiguous leads principle: ST elevation in adjacent leads suggests STEMI in that territory.
              </p>
              <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
                <li><strong>Inferior:</strong> II, III, aVF → RCA territory</li>
                <li><strong>Anterior:</strong> V1-V4 → LAD territory</li>
                <li><strong>Lateral:</strong> I, aVL, V5, V6 → Circumflex territory</li>
              </ul>
            </div>
          </div>
        )}

        {/* LAB RESULTS TAB */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            {/* Scenario Selector */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Select Lab Pattern</h3>
              <div className="flex gap-2">
                {[
                  { id: 'normal', label: 'Normal Labs' },
                  { id: 'cardiac', label: 'Acute MI (Elevated Troponin)' },
                  { id: 'sepsis', label: 'Sepsis Pattern' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setLabScenario(s.id as any)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors
                      ${labScenario === s.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lab Results Display */}
            <LabResults
              panels={labPanels[labScenario]}
              showEducation={true}
              highlightCritical={true}
              animateResults={true}
            />

            {/* Educational Note */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">📚 Learning Mode</h4>
              <p className="text-gray-300 text-sm">
                Click on any lab value to see educational information about that test.
                Values are color-coded: 
                <span className="text-green-400 ml-2">Normal</span>
                <span className="text-yellow-400 ml-2">Abnormal</span>
                <span className="text-red-400 ml-2">Critical</span>
              </p>
            </div>
          </div>
        )}

        {/* IMAGING TAB */}
        {activeTab === 'imaging' && (
          <div className="space-y-6">
            {/* Scenario Selector */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Select Imaging Study</h3>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'normal_cxr', label: 'Normal Chest X-Ray' },
                  { id: 'pneumonia', label: 'Pneumonia (CXR)' },
                  { id: 'sah', label: 'SAH (CT Head)' },
                  { id: 'appendicitis', label: 'Appendicitis (CT Abdomen)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setImagingScenario(s.id as any)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors
                      ${imagingScenario === s.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Imaging Viewer */}
            <ImagingViewer
              study={imagingStudies[imagingScenario]}
              showFindings={true}
              interactiveMode={true}
              showReport={false}
            />

            {/* Educational Note */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">📚 Learning Mode</h4>
              <p className="text-gray-300 text-sm">
                Hover over highlighted areas to see finding labels. Click to see detailed explanations.
                Use the brightness/contrast sliders to simulate windowing.
                Toggle "Show Findings" to test yourself before revealing annotations.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>All medical data is simulated for educational purposes only.</p>
          <p>CODE BLUE - Virtual Medical Equipment System v1.0</p>
        </div>
      </div>
    </div>
  );
}
