// src/components/game/VitalSignsMonitor.tsx
// A realistic medical monitor with procedurally generated waveforms

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TYPES
// ============================================

interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  respiratoryRate: number;
  oxygenSaturation: number;
  temperature: number;
}

interface MonitorProps {
  vitals: VitalSigns;
  patientName?: string;
  roomNumber?: string;
  rhythm?: CardiacRhythm;
  isAlarming?: boolean;
  showTrends?: boolean;
  compactMode?: boolean;
  onAlarmAcknowledge?: () => void;
}

type CardiacRhythm = 
  | 'normal_sinus'
  | 'sinus_tachycardia'
  | 'sinus_bradycardia'
  | 'atrial_fibrillation'
  | 'ventricular_tachycardia'
  | 'ventricular_fibrillation'
  | 'asystole'
  | 'pea';

interface WaveformConfig {
  color: string;
  label: string;
  unit: string;
  getValue: (vitals: VitalSigns) => number;
  getNormalRange: () => [number, number];
  generateWaveform: (t: number, vitals: VitalSigns, rhythm: CardiacRhythm) => number;
}

// ============================================
// WAVEFORM GENERATION ALGORITHMS
// ============================================

// ECG Waveform Generation based on cardiac rhythm
const generateECGPoint = (t: number, heartRate: number, rhythm: CardiacRhythm): number => {
  const cycleLength = 60 / heartRate; // seconds per beat
  const phase = (t % cycleLength) / cycleLength; // 0-1 within each heartbeat
  
  switch (rhythm) {
    case 'normal_sinus':
    case 'sinus_tachycardia':
    case 'sinus_bradycardia':
      return generateNormalSinusECG(phase);
    
    case 'atrial_fibrillation':
      return generateAFibECG(phase, t);
    
    case 'ventricular_tachycardia':
      return generateVTachECG(phase);
    
    case 'ventricular_fibrillation':
      return generateVFibECG(t);
    
    case 'asystole':
      return generateAsystoleECG(t);
    
    case 'pea':
      return generatePEA_ECG(phase);
    
    default:
      return generateNormalSinusECG(phase);
  }
};

// Normal Sinus Rhythm - PQRST complex
const generateNormalSinusECG = (phase: number): number => {
  // P wave (0.0 - 0.1)
  if (phase < 0.1) {
    const p = phase / 0.1;
    return 0.15 * Math.sin(p * Math.PI);
  }
  // PR segment (0.1 - 0.15)
  if (phase < 0.15) {
    return 0;
  }
  // Q wave (0.15 - 0.17)
  if (phase < 0.17) {
    const q = (phase - 0.15) / 0.02;
    return -0.1 * Math.sin(q * Math.PI);
  }
  // R wave (0.17 - 0.22)
  if (phase < 0.22) {
    const r = (phase - 0.17) / 0.05;
    return 1.0 * Math.sin(r * Math.PI);
  }
  // S wave (0.22 - 0.26)
  if (phase < 0.26) {
    const s = (phase - 0.22) / 0.04;
    return -0.2 * Math.sin(s * Math.PI);
  }
  // ST segment (0.26 - 0.4)
  if (phase < 0.4) {
    return 0;
  }
  // T wave (0.4 - 0.55)
  if (phase < 0.55) {
    const tw = (phase - 0.4) / 0.15;
    return 0.3 * Math.sin(tw * Math.PI);
  }
  // Baseline
  return 0;
};

// Atrial Fibrillation - irregular rhythm, no P waves, fibrillatory baseline
const generateAFibECG = (phase: number, t: number): number => {
  // Add irregular fibrillatory waves to baseline
  const fibrillation = 0.05 * (
    Math.sin(t * 47) + 
    Math.sin(t * 63) + 
    Math.sin(t * 89)
  );
  
  // Irregular QRS (skip P wave)
  if (phase > 0.15 && phase < 0.17) {
    return -0.1 * Math.sin(((phase - 0.15) / 0.02) * Math.PI) + fibrillation;
  }
  if (phase > 0.17 && phase < 0.22) {
    return 1.0 * Math.sin(((phase - 0.17) / 0.05) * Math.PI) + fibrillation;
  }
  if (phase > 0.22 && phase < 0.26) {
    return -0.2 * Math.sin(((phase - 0.22) / 0.04) * Math.PI) + fibrillation;
  }
  if (phase > 0.4 && phase < 0.55) {
    return 0.3 * Math.sin(((phase - 0.4) / 0.15) * Math.PI) + fibrillation;
  }
  
  return fibrillation;
};

// Ventricular Tachycardia - wide, bizarre QRS complexes
const generateVTachECG = (phase: number): number => {
  // Wide, monomorphic QRS
  if (phase < 0.4) {
    const wide = phase / 0.4;
    return Math.sin(wide * Math.PI * 2) * (1 - wide * 0.5);
  }
  return 0;
};

// Ventricular Fibrillation - chaotic, no organized rhythm
const generateVFibECG = (t: number): number => {
  return 0.8 * (
    Math.sin(t * 23) * 0.5 +
    Math.sin(t * 37) * 0.3 +
    Math.sin(t * 53) * 0.2 +
    Math.sin(t * 79) * 0.4 +
    Math.sin(t * 97) * 0.3
  ) * (0.5 + 0.5 * Math.sin(t * 3));
};

// Asystole - flatline with occasional artifact
const generateAsystoleECG = (t: number): number => {
  // Mostly flat with very rare, tiny artifacts
  if (Math.random() < 0.001) {
    return (Math.random() - 0.5) * 0.1;
  }
  return 0;
};

// PEA - looks like normal rhythm but patient has no pulse
const generatePEA_ECG = (phase: number): number => {
  // Looks normal but may be slower/weaker
  return generateNormalSinusECG(phase) * 0.7;
};

// Respiratory waveform (plethysmograph-style)
const generateRespiratoryWaveform = (t: number, respRate: number): number => {
  const cycleLength = 60 / respRate;
  const phase = (t % cycleLength) / cycleLength;
  
  // Inspiration is faster than expiration (roughly 1:2 ratio)
  if (phase < 0.33) {
    // Inspiration
    return Math.sin((phase / 0.33) * Math.PI / 2);
  } else {
    // Expiration
    return Math.cos(((phase - 0.33) / 0.67) * Math.PI / 2);
  }
};

// SpO2 Plethysmograph waveform
const generatePlethWaveform = (t: number, heartRate: number): number => {
  const cycleLength = 60 / heartRate;
  const phase = (t % cycleLength) / cycleLength;
  
  // Dicrotic notch included
  if (phase < 0.3) {
    return Math.sin((phase / 0.3) * Math.PI);
  } else if (phase < 0.4) {
    // Dicrotic notch
    return 0.3 + 0.2 * Math.sin(((phase - 0.3) / 0.1) * Math.PI);
  } else {
    return 0.3 * (1 - (phase - 0.4) / 0.6);
  }
};

// ============================================
// VITAL SIGN VALIDATION
// ============================================

const getVitalStatus = (value: number, normalRange: [number, number]): 'normal' | 'warning' | 'critical' => {
  const [low, high] = normalRange;
  const warningMargin = (high - low) * 0.2;
  
  if (value < low - warningMargin || value > high + warningMargin) {
    return 'critical';
  }
  if (value < low || value > high) {
    return 'warning';
  }
  return 'normal';
};

const statusColors = {
  normal: '#22c55e',   // Green
  warning: '#f59e0b',  // Amber
  critical: '#ef4444', // Red
};

// ============================================
// WAVEFORM CANVAS COMPONENT
// ============================================

interface WaveformCanvasProps {
  width: number;
  height: number;
  color: string;
  generatePoint: (t: number) => number;
  speed?: number; // pixels per second
  lineWidth?: number;
}

const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  width,
  height,
  color,
  generatePoint,
  speed = 50,
  lineWidth = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dataRef = useRef<number[]>([]);
  const timeRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize data array
    const dataPoints = Math.ceil(width);
    dataRef.current = new Array(dataPoints).fill(0);

    const animate = (timestamp: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      const deltaTime = (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;

      timeRef.current += deltaTime;

      // Shift data left and add new points
      const newPoints = Math.ceil(speed * deltaTime);
      for (let i = 0; i < newPoints; i++) {
        dataRef.current.shift();
        const t = timeRef.current + (i / speed);
        dataRef.current.push(generatePoint(t));
      }

      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = '#1a1a2e';
      ctx.lineWidth = 0.5;
      const gridSpacing = 20;
      
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw waveform
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
      ctx.beginPath();

      const centerY = height / 2;
      const amplitude = height * 0.4;

      for (let i = 0; i < dataRef.current.length; i++) {
        const x = i;
        const y = centerY - dataRef.current[i] * amplitude;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, color, generatePoint, speed, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded"
    />
  );
};

// ============================================
// VITAL VALUE DISPLAY COMPONENT
// ============================================

interface VitalValueProps {
  label: string;
  value: string | number;
  unit: string;
  color: string;
  status: 'normal' | 'warning' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  trend?: 'up' | 'down' | 'stable';
}

const VitalValue: React.FC<VitalValueProps> = ({
  label,
  value,
  unit,
  color,
  status,
  size = 'md',
  trend,
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1">
        <motion.span
          className={`font-mono font-bold ${sizeClasses[size]}`}
          style={{ color: statusColors[status] }}
          animate={status === 'critical' ? { opacity: [1, 0.5, 1] } : {}}
          transition={status === 'critical' ? { duration: 0.5, repeat: Infinity } : {}}
        >
          {value}
        </motion.span>
        <span className="text-sm text-gray-400">{unit}</span>
        {trend && (
          <span className={`text-sm ${trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-blue-400' : 'text-gray-400'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================
// MAIN MONITOR COMPONENT
// ============================================

export const VitalSignsMonitor: React.FC<MonitorProps> = ({
  vitals,
  patientName = 'Patient',
  roomNumber = '--',
  rhythm = 'normal_sinus',
  isAlarming = false,
  showTrends = false,
  compactMode = false,
  onAlarmAcknowledge,
}) => {
  const [alarmActive, setAlarmActive] = useState(isAlarming);
  const [alarmMuted, setAlarmMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Check if any vital is critical
  const hrStatus = getVitalStatus(vitals.heartRate, [60, 100]);
  const bpStatus = getVitalStatus(vitals.bloodPressure.systolic, [90, 140]);
  const rrStatus = getVitalStatus(vitals.respiratoryRate, [12, 20]);
  const spo2Status = getVitalStatus(vitals.oxygenSaturation, [95, 100]);
  const tempStatus = getVitalStatus(vitals.temperature, [97.8, 99.5]);

  const hasCritical = [hrStatus, bpStatus, rrStatus, spo2Status, tempStatus].includes('critical');

  // Alarm sound effect
  useEffect(() => {
    if (alarmActive && !alarmMuted && hasCritical) {
      // Create alarm beep
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const playBeep = () => {
        if (!audioContextRef.current || alarmMuted) return;
        
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        
        oscillator.frequency.value = 880; // A5 note
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);
        
        oscillator.start(audioContextRef.current.currentTime);
        oscillator.stop(audioContextRef.current.currentTime + 0.2);
      };

      const interval = setInterval(playBeep, 1000);
      return () => clearInterval(interval);
    }
  }, [alarmActive, alarmMuted, hasCritical]);

  // Generate waveform functions with current vitals
  const ecgGenerator = useCallback(
    (t: number) => generateECGPoint(t, vitals.heartRate, rhythm),
    [vitals.heartRate, rhythm]
  );

  const plethGenerator = useCallback(
    (t: number) => generatePlethWaveform(t, vitals.heartRate),
    [vitals.heartRate]
  );

  const respGenerator = useCallback(
    (t: number) => generateRespiratoryWaveform(t, vitals.respiratoryRate),
    [vitals.respiratoryRate]
  );

  if (compactMode) {
    return (
      <div className="bg-black rounded-lg p-3 border border-gray-800 font-mono">
        <div className="grid grid-cols-5 gap-2 text-center">
          <VitalValue label="HR" value={vitals.heartRate} unit="bpm" color="#22c55e" status={hrStatus} size="sm" />
          <VitalValue label="BP" value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`} unit="mmHg" color="#ef4444" status={bpStatus} size="sm" />
          <VitalValue label="RR" value={vitals.respiratoryRate} unit="/min" color="#fbbf24" status={rrStatus} size="sm" />
          <VitalValue label="SpO2" value={vitals.oxygenSaturation} unit="%" color="#3b82f6" status={spo2Status} size="sm" />
          <VitalValue label="Temp" value={vitals.temperature.toFixed(1)} unit="°F" color="#a855f7" status={tempStatus} size="sm" />
        </div>
      </div>
    );
  }

  return (
    <div className={`
      bg-gradient-to-b from-gray-900 to-black 
      rounded-xl border-4 border-gray-700 
      shadow-2xl overflow-hidden
      ${hasCritical ? 'ring-2 ring-red-500 ring-opacity-50' : ''}
    `}>
      {/* Monitor Header */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-gray-300 text-sm font-mono">ROOM {roomNumber}</span>
          </div>
          <span className="text-white font-medium">{patientName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {hasCritical && (
            <motion.button
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              onClick={() => {
                setAlarmMuted(!alarmMuted);
                onAlarmAcknowledge?.();
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {alarmMuted ? 'UNMUTE' : 'SILENCE'}
            </motion.button>
          )}
          <span className="text-gray-500 text-xs">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Main Display Grid */}
      <div className="p-4 grid grid-cols-3 gap-4">
        {/* Left Column - Waveforms */}
        <div className="col-span-2 space-y-4">
          {/* ECG Waveform */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-green-500 text-xs font-mono">II ECG</span>
              <span className="text-green-500 text-xs font-mono">{rhythm.replace('_', ' ').toUpperCase()}</span>
            </div>
            <WaveformCanvas
              width={400}
              height={80}
              color="#22c55e"
              generatePoint={ecgGenerator}
              speed={75}
            />
          </div>

          {/* SpO2 Pleth Waveform */}
          <div className="space-y-1">
            <span className="text-blue-500 text-xs font-mono">PLETH</span>
            <WaveformCanvas
              width={400}
              height={60}
              color="#3b82f6"
              generatePoint={plethGenerator}
              speed={75}
            />
          </div>

          {/* Respiratory Waveform */}
          <div className="space-y-1">
            <span className="text-yellow-500 text-xs font-mono">RESP</span>
            <WaveformCanvas
              width={400}
              height={50}
              color="#fbbf24"
              generatePoint={respGenerator}
              speed={25}
            />
          </div>
        </div>

        {/* Right Column - Numeric Values */}
        <div className="space-y-4">
          {/* Heart Rate */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <VitalValue
              label="HR"
              value={vitals.heartRate}
              unit="BPM"
              color="#22c55e"
              status={hrStatus}
              size="lg"
            />
          </div>

          {/* Blood Pressure */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <VitalValue
              label="NIBP"
              value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
              unit="mmHg"
              color="#ef4444"
              status={bpStatus}
              size="md"
            />
            <span className="text-xs text-gray-500">
              MAP: {Math.round((vitals.bloodPressure.systolic + 2 * vitals.bloodPressure.diastolic) / 3)}
            </span>
          </div>

          {/* SpO2 */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <VitalValue
              label="SpO2"
              value={vitals.oxygenSaturation}
              unit="%"
              color="#3b82f6"
              status={spo2Status}
              size="lg"
            />
          </div>

          {/* Respiratory Rate */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <VitalValue
              label="RESP"
              value={vitals.respiratoryRate}
              unit="/min"
              color="#fbbf24"
              status={rrStatus}
              size="md"
            />
          </div>

          {/* Temperature */}
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <VitalValue
              label="TEMP"
              value={vitals.temperature.toFixed(1)}
              unit="°F"
              color="#a855f7"
              status={tempStatus}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Alarm Bar */}
      <AnimatePresence>
        {hasCritical && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-900/50 border-t border-red-700 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <span className="text-red-400 font-mono text-sm">
                *** VITAL SIGN ALERT ***
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// EKG STRIP COMPONENT (for review/education)
// ============================================

interface EKGStripProps {
  rhythm: CardiacRhythm;
  heartRate: number;
  duration?: number; // seconds to display
  label?: string;
  showGrid?: boolean;
}

export const EKGStrip: React.FC<EKGStripProps> = ({
  rhythm,
  heartRate,
  duration = 6,
  label,
  showGrid = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 600;
  const height = 150;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with EKG paper background
    ctx.fillStyle = '#1a0a0a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    if (showGrid) {
      // Small squares (1mm = ~0.04s, ~0.1mV)
      ctx.strokeStyle = '#331111';
      ctx.lineWidth = 0.5;
      const smallGrid = 10;
      
      for (let x = 0; x < width; x += smallGrid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += smallGrid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Large squares (5mm = 0.2s, 0.5mV)
      ctx.strokeStyle = '#442222';
      ctx.lineWidth = 1;
      const largeGrid = 50;
      
      for (let x = 0; x < width; x += largeGrid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += largeGrid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Draw waveform
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 2;
    ctx.beginPath();

    const centerY = height / 2;
    const amplitude = height * 0.35;
    const pixelsPerSecond = width / duration;

    for (let x = 0; x < width; x++) {
      const t = x / pixelsPerSecond;
      const value = generateECGPoint(t, heartRate, rhythm);
      const y = centerY - value * amplitude;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Draw label
    if (label) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#00ff00';
      ctx.font = '14px monospace';
      ctx.fillText(label, 10, 20);
    }

    // Draw rate
    ctx.fillText(`${heartRate} BPM`, width - 80, 20);

  }, [rhythm, heartRate, duration, label, showGrid]);

  return (
    <div className="bg-black rounded-lg p-2 border border-gray-800">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

// ============================================
// RHYTHM IDENTIFICATION QUIZ COMPONENT
// ============================================

interface RhythmQuizProps {
  correctRhythm: CardiacRhythm;
  heartRate: number;
  onAnswer: (correct: boolean) => void;
  showHint?: boolean;
}

export const RhythmQuiz: React.FC<RhythmQuizProps> = ({
  correctRhythm,
  heartRate,
  onAnswer,
  showHint = false,
}) => {
  const [selected, setSelected] = useState<CardiacRhythm | null>(null);
  const [revealed, setRevealed] = useState(false);

  const rhythmOptions: { value: CardiacRhythm; label: string }[] = [
    { value: 'normal_sinus', label: 'Normal Sinus Rhythm' },
    { value: 'sinus_tachycardia', label: 'Sinus Tachycardia' },
    { value: 'sinus_bradycardia', label: 'Sinus Bradycardia' },
    { value: 'atrial_fibrillation', label: 'Atrial Fibrillation' },
    { value: 'ventricular_tachycardia', label: 'Ventricular Tachycardia' },
    { value: 'ventricular_fibrillation', label: 'Ventricular Fibrillation' },
    { value: 'asystole', label: 'Asystole' },
  ];

  const handleSubmit = () => {
    if (!selected) return;
    setRevealed(true);
    onAnswer(selected === correctRhythm);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Identify the Rhythm</h3>
      
      <EKGStrip rhythm={correctRhythm} heartRate={heartRate} label="Lead II" />

      {showHint && (
        <div className="text-sm text-gray-400 italic">
          Hint: Look at the regularity, P waves, and QRS width.
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {rhythmOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => !revealed && setSelected(option.value)}
            disabled={revealed}
            className={`
              p-3 rounded-lg text-left transition-all
              ${selected === option.value 
                ? revealed
                  ? option.value === correctRhythm
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-blue-600 text-white'
                : revealed && option.value === correctRhythm
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
              ${revealed ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {!revealed ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      ) : (
        <div className={`p-4 rounded-lg ${selected === correctRhythm ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
          <p className={selected === correctRhythm ? 'text-green-400' : 'text-red-400'}>
            {selected === correctRhythm 
              ? '✓ Correct!' 
              : `✗ Incorrect. The correct answer is: ${rhythmOptions.find(r => r.value === correctRhythm)?.label}`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default VitalSignsMonitor;
