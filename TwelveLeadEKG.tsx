// src/components/game/TwelveLeadEKG.tsx
// Interactive 12-lead EKG display with educational annotations

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TYPES
// ============================================

interface EKGFindings {
  rhythm: string;
  rate: number;
  intervals: {
    pr: number;  // ms
    qrs: number; // ms
    qt: number;  // ms
  };
  axis: string;
  stChanges: STChange[];
  interpretation: string[];
  isNormal: boolean;
}

interface STChange {
  lead: string;
  type: 'elevation' | 'depression' | 'normal';
  magnitude: number; // mm
}

interface TwelveLeadProps {
  findings: EKGFindings;
  showAnnotations?: boolean;
  showInterpretation?: boolean;
  highlightAbnormalities?: boolean;
  onLeadClick?: (lead: string) => void;
  interactiveMode?: boolean;
}

type LeadName = 'I' | 'II' | 'III' | 'aVR' | 'aVL' | 'aVF' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';

// ============================================
// EKG WAVEFORM GENERATION
// ============================================

interface WaveformParams {
  pHeight: number;
  qDepth: number;
  rHeight: number;
  sDepth: number;
  stElevation: number; // positive = elevation, negative = depression
  tHeight: number;
  qrsWidth: number; // multiplier
}

const defaultParams: WaveformParams = {
  pHeight: 0.15,
  qDepth: 0.1,
  rHeight: 1.0,
  sDepth: 0.2,
  stElevation: 0,
  tHeight: 0.3,
  qrsWidth: 1,
};

// Lead-specific modifications for normal morphology
const leadModifiers: Record<LeadName, Partial<WaveformParams>> = {
  'I':   { rHeight: 0.8 },
  'II':  { rHeight: 1.0 },  // Standard calibration
  'III': { rHeight: 0.6, pHeight: 0.1 },
  'aVR': { rHeight: -0.5, tHeight: -0.2, pHeight: -0.1 }, // Inverted
  'aVL': { rHeight: 0.4, pHeight: 0.1 },
  'aVF': { rHeight: 0.7 },
  'V1':  { rHeight: 0.3, sDepth: 0.8 }, // rS pattern
  'V2':  { rHeight: 0.5, sDepth: 0.6 },
  'V3':  { rHeight: 0.7, sDepth: 0.4 },
  'V4':  { rHeight: 0.9, sDepth: 0.3 },
  'V5':  { rHeight: 1.0, sDepth: 0.15 },
  'V6':  { rHeight: 0.9, sDepth: 0.1 },
};

// Generate a single PQRST complex
const generateLeadWaveform = (
  t: number, 
  heartRate: number, 
  lead: LeadName,
  stChange: STChange | undefined
): number => {
  const cycleLength = 60 / heartRate;
  const phase = (t % cycleLength) / cycleLength;
  
  const baseParams = { ...defaultParams };
  const modifier = leadModifiers[lead] || {};
  const params: WaveformParams = { ...baseParams, ...modifier };
  
  // Apply ST changes if present
  if (stChange) {
    if (stChange.type === 'elevation') {
      params.stElevation = stChange.magnitude * 0.1;
    } else if (stChange.type === 'depression') {
      params.stElevation = -stChange.magnitude * 0.1;
    }
  }
  
  // P wave (0.0 - 0.08)
  if (phase < 0.08) {
    const p = phase / 0.08;
    return params.pHeight * Math.sin(p * Math.PI);
  }
  
  // PR segment (0.08 - 0.12)
  if (phase < 0.12) {
    return 0;
  }
  
  // QRS complex (0.12 - 0.20) - width affected by qrsWidth param
  const qrsEnd = 0.12 + 0.08 * params.qrsWidth;
  
  // Q wave
  if (phase < 0.12 + 0.02 * params.qrsWidth) {
    const q = (phase - 0.12) / (0.02 * params.qrsWidth);
    return -params.qDepth * Math.sin(q * Math.PI);
  }
  
  // R wave
  if (phase < 0.12 + 0.05 * params.qrsWidth) {
    const r = (phase - 0.12 - 0.02 * params.qrsWidth) / (0.03 * params.qrsWidth);
    return params.rHeight * Math.sin(r * Math.PI);
  }
  
  // S wave
  if (phase < qrsEnd) {
    const s = (phase - 0.12 - 0.05 * params.qrsWidth) / (0.03 * params.qrsWidth);
    return -params.sDepth * Math.sin(s * Math.PI);
  }
  
  // ST segment (qrsEnd - 0.35) - includes elevation/depression
  if (phase < 0.35) {
    return params.stElevation;
  }
  
  // T wave (0.35 - 0.50)
  if (phase < 0.50) {
    const tw = (phase - 0.35) / 0.15;
    return params.stElevation + params.tHeight * Math.sin(tw * Math.PI);
  }
  
  // Baseline
  return 0;
};

// ============================================
// SINGLE LEAD CANVAS COMPONENT
// ============================================

interface LeadCanvasProps {
  lead: LeadName;
  heartRate: number;
  stChange?: STChange;
  width: number;
  height: number;
  duration?: number;
  highlight?: boolean;
  onClick?: () => void;
}

const LeadCanvas: React.FC<LeadCanvasProps> = ({
  lead,
  heartRate,
  stChange,
  width,
  height,
  duration = 2.5,
  highlight = false,
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, width, height);

    // Grid (EKG paper style)
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    const gridSize = 10;
    
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Major grid
    ctx.strokeStyle = '#2a2a4e';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += gridSize * 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize * 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Waveform
    ctx.strokeStyle = highlight 
      ? (stChange?.type === 'elevation' ? '#ef4444' : stChange?.type === 'depression' ? '#f59e0b' : '#22c55e')
      : '#22c55e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const centerY = height / 2;
    const amplitude = height * 0.35;
    const pixelsPerSecond = width / duration;

    for (let x = 0; x < width; x++) {
      const t = x / pixelsPerSecond;
      const value = generateLeadWaveform(t, heartRate, lead, stChange);
      const y = centerY - value * amplitude;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Lead label
    ctx.fillStyle = highlight ? '#ef4444' : '#888';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(lead, 5, 15);

    // ST change indicator
    if (stChange && stChange.type !== 'normal') {
      ctx.fillStyle = stChange.type === 'elevation' ? '#ef4444' : '#f59e0b';
      ctx.font = '10px monospace';
      const label = stChange.type === 'elevation' 
        ? `↑${stChange.magnitude}mm` 
        : `↓${stChange.magnitude}mm`;
      ctx.fillText(label, width - 40, 15);
    }

  }, [lead, heartRate, stChange, width, height, duration, highlight]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`rounded ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-blue-500' : ''}`}
      onClick={onClick}
    />
  );
};

// ============================================
// MAIN 12-LEAD EKG COMPONENT
// ============================================

export const TwelveLeadEKG: React.FC<TwelveLeadProps> = ({
  findings,
  showAnnotations = true,
  showInterpretation = true,
  highlightAbnormalities = true,
  onLeadClick,
  interactiveMode = false,
}) => {
  const [selectedLead, setSelectedLead] = useState<LeadName | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const leads: LeadName[] = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

  const getSTChange = (lead: string): STChange | undefined => {
    return findings.stChanges.find(st => st.lead === lead);
  };

  const handleLeadClick = (lead: LeadName) => {
    if (interactiveMode) {
      setSelectedLead(lead === selectedLead ? null : lead);
    }
    onLeadClick?.(lead);
  };

  // Determine which leads to highlight based on ST changes
  const hasAbnormality = (lead: LeadName): boolean => {
    const st = getSTChange(lead);
    return st ? st.type !== 'normal' : false;
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold">12-Lead ECG</span>
          <span className="text-gray-400 text-sm">{findings.rate} BPM</span>
          {!findings.isNormal && (
            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded animate-pulse">
              ABNORMAL
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-400 hover:text-white text-sm"
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </button>
        </div>
      </div>

      {/* Help Panel */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-blue-900/20 border-b border-blue-800 px-4 py-3"
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Limb Leads</h4>
                <ul className="text-gray-300 space-y-1">
                  <li><span className="text-green-400">I, aVL:</span> Lateral wall</li>
                  <li><span className="text-green-400">II, III, aVF:</span> Inferior wall</li>
                  <li><span className="text-green-400">aVR:</span> Right atrium (usually inverted)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Precordial Leads</h4>
                <ul className="text-gray-300 space-y-1">
                  <li><span className="text-green-400">V1-V2:</span> Septal wall</li>
                  <li><span className="text-green-400">V3-V4:</span> Anterior wall</li>
                  <li><span className="text-green-400">V5-V6:</span> Lateral wall</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EKG Grid */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1: I, aVR, V1, V4 */}
          {['I', 'aVR', 'V1', 'V4'].map((lead) => (
            <LeadCanvas
              key={lead}
              lead={lead as LeadName}
              heartRate={findings.rate}
              stChange={getSTChange(lead)}
              width={150}
              height={80}
              highlight={highlightAbnormalities && hasAbnormality(lead as LeadName)}
              onClick={() => handleLeadClick(lead as LeadName)}
            />
          ))}

          {/* Row 2: II, aVL, V2, V5 */}
          {['II', 'aVL', 'V2', 'V5'].map((lead) => (
            <LeadCanvas
              key={lead}
              lead={lead as LeadName}
              heartRate={findings.rate}
              stChange={getSTChange(lead)}
              width={150}
              height={80}
              highlight={highlightAbnormalities && hasAbnormality(lead as LeadName)}
              onClick={() => handleLeadClick(lead as LeadName)}
            />
          ))}

          {/* Row 3: III, aVF, V3, V6 */}
          {['III', 'aVF', 'V3', 'V6'].map((lead) => (
            <LeadCanvas
              key={lead}
              lead={lead as LeadName}
              heartRate={findings.rate}
              stChange={getSTChange(lead)}
              width={150}
              height={80}
              highlight={highlightAbnormalities && hasAbnormality(lead as LeadName)}
              onClick={() => handleLeadClick(lead as LeadName)}
            />
          ))}
        </div>

        {/* Long Lead II Strip */}
        <div className="mt-4">
          <LeadCanvas
            lead="II"
            heartRate={findings.rate}
            stChange={getSTChange('II')}
            width={630}
            height={100}
            duration={6}
            highlight={highlightAbnormalities && hasAbnormality('II')}
          />
        </div>
      </div>

      {/* Measurements */}
      {showAnnotations && (
        <div className="px-4 pb-4">
          <div className="bg-gray-800 rounded-lg p-3 grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Rate:</span>
              <span className="text-white ml-2">{findings.rate} BPM</span>
            </div>
            <div>
              <span className="text-gray-500">PR:</span>
              <span className="text-white ml-2">{findings.intervals.pr} ms</span>
            </div>
            <div>
              <span className="text-gray-500">QRS:</span>
              <span className="text-white ml-2">{findings.intervals.qrs} ms</span>
            </div>
            <div>
              <span className="text-gray-500">QT:</span>
              <span className="text-white ml-2">{findings.intervals.qt} ms</span>
            </div>
          </div>
        </div>
      )}

      {/* Interpretation */}
      {showInterpretation && (
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
          <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Interpretation</h4>
          <ul className="space-y-1">
            {findings.interpretation.map((finding, i) => (
              <li key={i} className={`text-sm ${findings.isNormal ? 'text-green-400' : 'text-yellow-400'}`}>
                • {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Lead Detail */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedLead(null)}
          >
            <div 
              className="bg-gray-900 rounded-xl p-6 max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Lead {selectedLead}</h3>
              <LeadCanvas
                lead={selectedLead}
                heartRate={findings.rate}
                stChange={getSTChange(selectedLead)}
                width={500}
                height={200}
                duration={4}
                highlight={hasAbnormality(selectedLead)}
              />
              <div className="mt-4 text-gray-300">
                <LeadExplanation lead={selectedLead} stChange={getSTChange(selectedLead)} />
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// LEAD EXPLANATION COMPONENT
// ============================================

interface LeadExplanationProps {
  lead: LeadName;
  stChange?: STChange;
}

const LeadExplanation: React.FC<LeadExplanationProps> = ({ lead, stChange }) => {
  const explanations: Record<LeadName, string> = {
    'I': 'Lead I views the heart from the left arm perspective. It sees the lateral wall of the left ventricle.',
    'II': 'Lead II is the most commonly monitored lead. It views the heart from the inferior perspective and shows the clearest P waves.',
    'III': 'Lead III views the inferior wall of the heart. ST changes here, along with II and aVF, suggest inferior MI.',
    'aVR': 'Lead aVR views the heart from the right shoulder. It\'s normally inverted. ST elevation here can indicate left main occlusion.',
    'aVL': 'Lead aVL views the high lateral wall. ST changes here may indicate lateral or high lateral MI.',
    'aVF': 'Lead aVF views the inferior wall directly. With II and III, it forms the inferior lead group.',
    'V1': 'Lead V1 sits over the right ventricle and septum. It normally has a small R wave and deep S wave.',
    'V2': 'Lead V2 views the septum. ST changes here with V1 suggest septal MI. Also watch for posterior MI (ST depression).',
    'V3': 'Lead V3 is a transition zone lead. The R and S waves are usually roughly equal here.',
    'V4': 'Lead V4 sits over the apex. ST elevation in V3-V4 suggests anterior MI (LAD territory).',
    'V5': 'Lead V5 views the lateral wall. Together with V6, I, and aVL, it represents lateral territory.',
    'V6': 'Lead V6 views the lateral wall. Normal pattern is tall R wave with small S wave.',
  };

  return (
    <div className="space-y-2">
      <p>{explanations[lead]}</p>
      {stChange && stChange.type !== 'normal' && (
        <p className={stChange.type === 'elevation' ? 'text-red-400' : 'text-yellow-400'}>
          <strong>Finding:</strong> ST {stChange.type} of {stChange.magnitude}mm detected. 
          {stChange.type === 'elevation' 
            ? ' This may indicate acute myocardial injury (STEMI) in the territory this lead represents.'
            : ' This may indicate ischemia or reciprocal changes from injury elsewhere.'}
        </p>
      )}
    </div>
  );
};

// ============================================
// PRESET EKG FINDINGS FACTORY
// ============================================

export const createNormalEKG = (rate: number = 75): EKGFindings => ({
  rhythm: 'Normal Sinus Rhythm',
  rate,
  intervals: { pr: 160, qrs: 88, qt: 400 },
  axis: 'Normal',
  stChanges: [],
  interpretation: ['Normal sinus rhythm', 'No ST changes', 'Normal intervals'],
  isNormal: true,
});

export const createInferiorSTEMI = (rate: number = 85): EKGFindings => ({
  rhythm: 'Normal Sinus Rhythm',
  rate,
  intervals: { pr: 160, qrs: 92, qt: 420 },
  axis: 'Normal',
  stChanges: [
    { lead: 'II', type: 'elevation', magnitude: 3 },
    { lead: 'III', type: 'elevation', magnitude: 4 },
    { lead: 'aVF', type: 'elevation', magnitude: 3 },
    { lead: 'I', type: 'depression', magnitude: 1 },
    { lead: 'aVL', type: 'depression', magnitude: 2 },
  ],
  interpretation: [
    'ST elevation in II, III, aVF (inferior leads)',
    'Reciprocal ST depression in I, aVL',
    'Consistent with ACUTE INFERIOR STEMI',
    'Likely RCA occlusion',
  ],
  isNormal: false,
});

export const createAnteriorSTEMI = (rate: number = 95): EKGFindings => ({
  rhythm: 'Sinus Tachycardia',
  rate,
  intervals: { pr: 150, qrs: 94, qt: 380 },
  axis: 'Normal',
  stChanges: [
    { lead: 'V1', type: 'elevation', magnitude: 2 },
    { lead: 'V2', type: 'elevation', magnitude: 4 },
    { lead: 'V3', type: 'elevation', magnitude: 5 },
    { lead: 'V4', type: 'elevation', magnitude: 4 },
    { lead: 'II', type: 'depression', magnitude: 1 },
    { lead: 'III', type: 'depression', magnitude: 1 },
    { lead: 'aVF', type: 'depression', magnitude: 1 },
  ],
  interpretation: [
    'ST elevation in V1-V4 (anterior leads)',
    'Reciprocal ST depression in inferior leads',
    'Consistent with ACUTE ANTERIOR STEMI',
    'Likely LAD occlusion - HIGH RISK',
  ],
  isNormal: false,
});

export const createLateralSTEMI = (rate: number = 80): EKGFindings => ({
  rhythm: 'Normal Sinus Rhythm',
  rate,
  intervals: { pr: 165, qrs: 90, qt: 410 },
  axis: 'Normal',
  stChanges: [
    { lead: 'I', type: 'elevation', magnitude: 2 },
    { lead: 'aVL', type: 'elevation', magnitude: 3 },
    { lead: 'V5', type: 'elevation', magnitude: 2 },
    { lead: 'V6', type: 'elevation', magnitude: 2 },
    { lead: 'III', type: 'depression', magnitude: 1 },
  ],
  interpretation: [
    'ST elevation in I, aVL, V5, V6 (lateral leads)',
    'Reciprocal ST depression in III',
    'Consistent with ACUTE LATERAL STEMI',
    'Likely circumflex or diagonal occlusion',
  ],
  isNormal: false,
});

export default TwelveLeadEKG;
