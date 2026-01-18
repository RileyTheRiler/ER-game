// src/components/game/LabResults.tsx
// Interactive lab results display with educational annotations

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TYPES
// ============================================

interface LabValue {
  name: string;
  value: number | string;
  unit: string;
  normalRange: [number, number] | null; // null for qualitative tests
  category: LabCategory;
  interpretation?: string;
  isAbnormal?: boolean;
  clinicalSignificance?: string;
}

type LabCategory =
  | 'CBC'
  | 'BMP'
  | 'LFT'
  | 'CARDIAC'
  | 'COAGULATION'
  | 'URINALYSIS'
  | 'ABG'
  | 'MISC';

interface LabPanel {
  name: string;
  timestamp: string;
  values: LabValue[];
  status: 'pending' | 'resulted' | 'critical';
}

interface LabResultsProps {
  panels: LabPanel[];
  showEducation?: boolean;
  onValueClick?: (value: LabValue) => void;
  highlightCritical?: boolean;
  animateResults?: boolean;
}

// ============================================
// REFERENCE RANGES
// ============================================

const labReferences: Record<string, { unit: string; range: [number, number]; significance: string }> = {
  // CBC
  'WBC': { unit: 'K/uL', range: [4.5, 11.0], significance: 'White blood cell count. Elevated in infection, inflammation. Low in immunosuppression.' },
  'RBC': { unit: 'M/uL', range: [4.5, 5.5], significance: 'Red blood cell count. Low in anemia, bleeding.' },
  'Hemoglobin': { unit: 'g/dL', range: [12.0, 17.5], significance: 'Oxygen-carrying protein. Low in anemia.' },
  'Hematocrit': { unit: '%', range: [36, 50], significance: 'Percentage of blood that is red cells.' },
  'Platelets': { unit: 'K/uL', range: [150, 400], significance: 'Clotting cells. Low increases bleeding risk.' },

  // BMP
  'Sodium': { unit: 'mEq/L', range: [136, 145], significance: 'Electrolyte balance. Abnormal in dehydration, SIADH, kidney disease.' },
  'Potassium': { unit: 'mEq/L', range: [3.5, 5.0], significance: 'Critical for heart rhythm. High or low can cause arrhythmias.' },
  'Chloride': { unit: 'mEq/L', range: [98, 106], significance: 'Electrolyte. Helps maintain acid-base balance.' },
  'CO2': { unit: 'mEq/L', range: [23, 29], significance: 'Bicarbonate. Reflects acid-base status.' },
  'BUN': { unit: 'mg/dL', range: [7, 20], significance: 'Kidney function marker. Elevated in dehydration, kidney disease.' },
  'Creatinine': { unit: 'mg/dL', range: [0.7, 1.3], significance: 'Kidney function marker. More specific than BUN.' },
  'Glucose': { unit: 'mg/dL', range: [70, 100], significance: 'Blood sugar. High in diabetes, stress. Low causes confusion, seizures.' },
  'Calcium': { unit: 'mg/dL', range: [8.5, 10.5], significance: 'Important for heart, muscles, bones.' },

  // Cardiac
  'Troponin': { unit: 'ng/mL', range: [0, 0.04], significance: 'Cardiac muscle protein. Elevated = myocardial injury (heart attack).' },
  'BNP': { unit: 'pg/mL', range: [0, 100], significance: 'Heart failure marker. Elevated when heart is under strain.' },
  'CK-MB': { unit: 'ng/mL', range: [0, 5], significance: 'Cardiac enzyme. Less specific than troponin.' },

  // Coagulation
  'PT': { unit: 'seconds', range: [11, 13.5], significance: 'Prothrombin time. Monitors warfarin, liver function.' },
  'INR': { unit: '', range: [0.8, 1.1], significance: 'Standardized PT. Target 2-3 for anticoagulation.' },
  'PTT': { unit: 'seconds', range: [25, 35], significance: 'Monitors heparin therapy.' },

  // LFT
  'AST': { unit: 'U/L', range: [10, 40], significance: 'Liver enzyme. Also elevated in muscle damage.' },
  'ALT': { unit: 'U/L', range: [7, 56], significance: 'Liver-specific enzyme.' },
  'AlkPhos': { unit: 'U/L', range: [44, 147], significance: 'Elevated in liver or bone disease.' },
  'Bilirubin': { unit: 'mg/dL', range: [0.1, 1.2], significance: 'Elevated causes jaundice. Liver or hemolysis.' },

  // ABG
  'pH': { unit: '', range: [7.35, 7.45], significance: 'Blood acidity. <7.35 = acidosis, >7.45 = alkalosis.' },
  'pCO2': { unit: 'mmHg', range: [35, 45], significance: 'Carbon dioxide. Reflects ventilation status.' },
  'pO2': { unit: 'mmHg', range: [80, 100], significance: 'Oxygen level. Low = hypoxemia.' },
  'Lactate': { unit: 'mmol/L', range: [0.5, 2.0], significance: 'Elevated in shock, sepsis, poor perfusion.' },

  // Misc
  'D-dimer': { unit: 'ng/mL', range: [0, 500], significance: 'Elevated in clots (PE, DVT). Very sensitive, not specific.' },
  'Lipase': { unit: 'U/L', range: [0, 160], significance: 'Pancreatic enzyme. Elevated in pancreatitis.' },
  'Amylase': { unit: 'U/L', range: [28, 100], significance: 'Digestive enzyme. Elevated in pancreatitis.' },
  'TSH': { unit: 'mIU/L', range: [0.4, 4.0], significance: 'Thyroid function. High in hypothyroid, low in hyperthyroid.' },
  'ProCalcitonin': { unit: 'ng/mL', range: [0, 0.5], significance: 'Bacterial infection marker. Helps differentiate from viral.' },
  'CRP': { unit: 'mg/L', range: [0, 10], significance: 'Inflammation marker. Elevated in infection, inflammation.' },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getValueStatus = (value: number, range: [number, number] | null): 'normal' | 'low' | 'high' | 'critical-low' | 'critical-high' => {
  if (!range) return 'normal';

  const [low, high] = range;
  const criticalMargin = (high - low) * 0.3;

  if (value < low - criticalMargin) return 'critical-low';
  if (value > high + criticalMargin) return 'critical-high';
  if (value < low) return 'low';
  if (value > high) return 'high';
  return 'normal';
};

const statusColors = {
  'normal': 'text-green-400',
  'low': 'text-yellow-400',
  'high': 'text-yellow-400',
  'critical-low': 'text-red-500',
  'critical-high': 'text-red-500',
};

const statusBgColors = {
  'normal': 'bg-green-900/20',
  'low': 'bg-yellow-900/20',
  'high': 'bg-yellow-900/20',
  'critical-low': 'bg-red-900/30',
  'critical-high': 'bg-red-900/30',
};

// ============================================
// LAB VALUE ROW COMPONENT
// ============================================

interface LabValueRowProps {
  labValue: LabValue;
  showEducation: boolean;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

const LabValueRow: React.FC<LabValueRowProps> = ({
  labValue,
  showEducation,
  onClick,
  animate = false,
  delay = 0,
}) => {
  const [expanded, setExpanded] = useState(false);

  const numericValue = typeof labValue.value === 'number' ? labValue.value : parseFloat(labValue.value as string);
  const status = !isNaN(numericValue)
    ? getValueStatus(numericValue, labValue.normalRange)
    : 'normal';

  const reference = labReferences[labValue.name];

  const row = (
    <div
      className={`
        px-4 py-2 grid grid-cols-12 gap-2 items-center cursor-pointer
        hover:bg-gray-700/50 transition-colors
        ${statusBgColors[status]}
      `}
      onClick={() => {
        setExpanded(!expanded);
        onClick?.();
      }}
    >
      {/* Name */}
      <div className="col-span-4">
        <span className="text-gray-300">{labValue.name}</span>
      </div>

      {/* Value */}
      <div className="col-span-3">
        <span className={`font-mono font-bold ${statusColors[status]}`}>
          {labValue.value}
          {status === 'critical-low' || status === 'critical-high' ? ' ⚠️' : ''}
        </span>
      </div>

      {/* Unit */}
      <div className="col-span-2">
        <span className="text-gray-500">{labValue.unit}</span>
      </div>

      {/* Reference Range */}
      <div className="col-span-3">
        {labValue.normalRange && (
          <span className="text-gray-500 text-sm">
            {labValue.normalRange[0]} - {labValue.normalRange[1]}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay * 0.1 }}
        >
          {row}
        </motion.div>
      ) : row}

      {/* Expanded Education Panel */}
      <AnimatePresence>
        {expanded && showEducation && reference && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-800/50 px-4 py-3 border-l-4 border-blue-500"
          >
            <p className="text-sm text-gray-300">{reference.significance}</p>
            {labValue.clinicalSignificance && (
              <p className="text-sm text-yellow-400 mt-2">
                <strong>In this patient:</strong> {labValue.clinicalSignificance}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================
// LAB PANEL COMPONENT
// ============================================

interface LabPanelDisplayProps {
  panel: LabPanel;
  showEducation: boolean;
  onValueClick?: (value: LabValue) => void;
  animate?: boolean;
}

const LabPanelDisplay: React.FC<LabPanelDisplayProps> = ({
  panel,
  showEducation,
  onValueClick,
  animate = false,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const hasCritical = panel.values.some(v => {
    const numVal = typeof v.value === 'number' ? v.value : parseFloat(v.value as string);
    if (isNaN(numVal) || !v.normalRange) return false;
    const status = getValueStatus(numVal, v.normalRange);
    return status.includes('critical');
  });

  return (
    <div className={`
      bg-gray-900 rounded-lg border overflow-hidden
      ${panel.status === 'critical' || hasCritical ? 'border-red-600' : 'border-gray-700'}
    `}>
      {/* Panel Header */}
      <div
        className={`
          px-4 py-3 flex justify-between items-center cursor-pointer
          ${panel.status === 'critical' || hasCritical ? 'bg-red-900/30' : 'bg-gray-800'}
        `}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{panel.name}</span>
          {(panel.status === 'critical' || hasCritical) && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded animate-pulse">
              CRITICAL
            </span>
          )}
          {panel.status === 'pending' && (
            <span className="px-2 py-0.5 bg-yellow-600 text-white text-xs rounded">
              PENDING
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">{panel.timestamp}</span>
          <motion.span
            animate={{ rotate: collapsed ? 0 : 180 }}
            className="text-gray-400"
          >
            ▼
          </motion.span>
        </div>
      </div>

      {/* Panel Values */}
      <AnimatePresence>
        {!collapsed && panel.status !== 'pending' && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            {/* Column Headers */}
            <div className="px-4 py-2 grid grid-cols-12 gap-2 text-xs text-gray-500 uppercase tracking-wider bg-gray-800/50 border-b border-gray-700">
              <div className="col-span-4">Test</div>
              <div className="col-span-3">Value</div>
              <div className="col-span-2">Unit</div>
              <div className="col-span-3">Reference</div>
            </div>

            {/* Values */}
            <div className="divide-y divide-gray-800">
              {panel.values.map((value, i) => (
                <LabValueRow
                  key={value.name}
                  labValue={value}
                  showEducation={showEducation}
                  onClick={() => onValueClick?.(value)}
                  animate={animate}
                  delay={i}
                />
              ))}
            </div>
          </motion.div>
        )}

        {!collapsed && panel.status === 'pending' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-yellow-500">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full"
              />
              <span>Results pending...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// MAIN LAB RESULTS COMPONENT
// ============================================

export const LabResults: React.FC<LabResultsProps> = ({
  panels,
  showEducation = true,
  onValueClick,
  highlightCritical = true,
  animateResults = true,
}) => {
  const [filter, setFilter] = useState<'all' | 'abnormal' | 'critical'>('all');

  const filteredPanels = panels.map(panel => {
    if (filter === 'all') return panel;

    return {
      ...panel,
      values: panel.values.filter(v => {
        const numVal = typeof v.value === 'number' ? v.value : parseFloat(v.value as string);
        if (isNaN(numVal) || !v.normalRange) return false;
        const status = getValueStatus(numVal, v.normalRange);
        if (filter === 'critical') return status.includes('critical');
        return status !== 'normal';
      }),
    };
  }).filter(panel => panel.values.length > 0 || filter === 'all');

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex gap-2">
        {(['all', 'abnormal', 'critical'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
            `}
          >
            {f === 'all' ? 'All Results' : f === 'abnormal' ? 'Abnormal Only' : 'Critical Only'}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="space-y-4">
        {filteredPanels.map((panel) => (
          <LabPanelDisplay
            key={panel.name}
            panel={panel}
            showEducation={showEducation}
            onValueClick={onValueClick}
            animate={animateResults}
          />
        ))}
      </div>

      {filteredPanels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No {filter !== 'all' ? filter : ''} results to display.
        </div>
      )}
    </div>
  );
};

// ============================================
// PRESET LAB PANELS FACTORY
// ============================================

export const createCBC = (overrides: Partial<Record<string, number>> = {}): LabPanel => ({
  name: 'Complete Blood Count (CBC)',
  timestamp: new Date().toLocaleTimeString(),
  status: 'resulted',
  values: [
    { name: 'WBC', value: overrides.WBC ?? 7.5, unit: 'K/uL', normalRange: [4.5, 11.0], category: 'CBC' },
    { name: 'RBC', value: overrides.RBC ?? 4.8, unit: 'M/uL', normalRange: [4.5, 5.5], category: 'CBC' },
    { name: 'Hemoglobin', value: overrides.Hemoglobin ?? 14.2, unit: 'g/dL', normalRange: [12.0, 17.5], category: 'CBC' },
    { name: 'Hematocrit', value: overrides.Hematocrit ?? 42, unit: '%', normalRange: [36, 50], category: 'CBC' },
    { name: 'Platelets', value: overrides.Platelets ?? 250, unit: 'K/uL', normalRange: [150, 400], category: 'CBC' },
  ],
});

export const createBMP = (overrides: Partial<Record<string, number>> = {}): LabPanel => ({
  name: 'Basic Metabolic Panel (BMP)',
  timestamp: new Date().toLocaleTimeString(),
  status: 'resulted',
  values: [
    { name: 'Sodium', value: overrides.Sodium ?? 140, unit: 'mEq/L', normalRange: [136, 145], category: 'BMP' },
    { name: 'Potassium', value: overrides.Potassium ?? 4.0, unit: 'mEq/L', normalRange: [3.5, 5.0], category: 'BMP' },
    { name: 'Chloride', value: overrides.Chloride ?? 102, unit: 'mEq/L', normalRange: [98, 106], category: 'BMP' },
    { name: 'CO2', value: overrides.CO2 ?? 24, unit: 'mEq/L', normalRange: [23, 29], category: 'BMP' },
    { name: 'BUN', value: overrides.BUN ?? 15, unit: 'mg/dL', normalRange: [7, 20], category: 'BMP' },
    { name: 'Creatinine', value: overrides.Creatinine ?? 1.0, unit: 'mg/dL', normalRange: [0.7, 1.3], category: 'BMP' },
    { name: 'Glucose', value: overrides.Glucose ?? 95, unit: 'mg/dL', normalRange: [70, 100], category: 'BMP' },
  ],
});

export const createCardiacPanel = (overrides: Partial<Record<string, number>> = {}): LabPanel => ({
  name: 'Cardiac Markers',
  timestamp: new Date().toLocaleTimeString(),
  status: 'resulted',
  values: [
    {
      name: 'Troponin',
      value: overrides.Troponin ?? 0.02,
      unit: 'ng/mL',
      normalRange: [0, 0.04],
      category: 'CARDIAC',
      clinicalSignificance: overrides.Troponin && overrides.Troponin > 0.04
        ? 'Elevated troponin indicates myocardial injury. In the context of chest pain, this strongly suggests acute coronary syndrome.'
        : undefined,
    },
    { name: 'BNP', value: overrides.BNP ?? 45, unit: 'pg/mL', normalRange: [0, 100], category: 'CARDIAC' },
  ],
});

export const createABG = (overrides: Partial<Record<string, number>> = {}): LabPanel => ({
  name: 'Arterial Blood Gas (ABG)',
  timestamp: new Date().toLocaleTimeString(),
  status: 'resulted',
  values: [
    { name: 'pH', value: overrides.pH ?? 7.40, unit: '', normalRange: [7.35, 7.45], category: 'ABG' },
    { name: 'pCO2', value: overrides.pCO2 ?? 40, unit: 'mmHg', normalRange: [35, 45], category: 'ABG' },
    { name: 'pO2', value: overrides.pO2 ?? 95, unit: 'mmHg', normalRange: [80, 100], category: 'ABG' },
    { name: 'Lactate', value: overrides.Lactate ?? 1.2, unit: 'mmol/L', normalRange: [0.5, 2.0], category: 'ABG' },
  ],
});

// Example: Sepsis labs
export const createSepsisLabs = (): LabPanel[] => [
  createCBC({ WBC: 18.5 }), // Elevated WBC
  createBMP({ Creatinine: 2.1, Glucose: 185 }), // AKI, stress hyperglycemia
  createABG({ pH: 7.28, Lactate: 4.5 }), // Acidosis, elevated lactate
  {
    name: 'Infectious Markers',
    timestamp: new Date().toLocaleTimeString(),
    status: 'resulted',
    values: [
      { name: 'ProCalcitonin', value: 8.5, unit: 'ng/mL', normalRange: [0, 0.5], category: 'MISC', clinicalSignificance: 'Markedly elevated. Strongly suggests bacterial infection.' },
      { name: 'CRP', value: 185, unit: 'mg/L', normalRange: [0, 10], category: 'MISC' },
    ],
  },
];

export default LabResults;
