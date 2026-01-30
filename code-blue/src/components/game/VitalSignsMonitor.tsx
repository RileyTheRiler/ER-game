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
  const animationRef = useRef<number | undefined>(undefined);
  const dataRef = useRef<number[]>([]);
  const timeRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const generatePointRef = useRef(generatePoint);

  // Update ref when prop changes to avoid resetting the animation loop
  useEffect(() => {
    generatePointRef.current = generatePoint;
  }, [generatePoint]);

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
        dataRef.current.push(generatePointRef.current(t));
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines (optional, transparent in new design)
      // keeping clean for "glass" look

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
  }, [width, height, color, speed, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded bg-transparent"
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
      <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1" style={{ color }}>{label}</span>
      <div className="flex items-baseline gap-2">
        <motion.span
          className={`font-mono font-bold tracking-tighter leading-none ${sizeClasses[size]}`}
          style={{ color: statusColors[status], textShadow: `0 0 10px ${statusColors[status]}40` }}
          animate={status === 'critical' ? { opacity: [1, 0.5, 1] } : {}}
          transition={status === 'critical' ? { duration: 0.5, repeat: Infinity } : {}}
        >
          {value}
        </motion.span>
        <span className="text-xs text-gray-600 font-mono font-bold leading-none">{unit}</span>
      </div>
    </div >
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
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: new () => AudioContext }).webkitAudioContext)();
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
      relative bg-black 
      rounded-xl overflow-hidden
      border-[6px] border-gray-800 shadow-2xl
      ${hasCritical ? 'ring-4 ring-red-500/50 ring-offset-2 ring-offset-black' : 'ring-1 ring-gray-700/50'}
    `}>
      {/* Screen Bezel Reflection */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 rounded-lg"></div>

      {/* Monitor Header */}
      <div className="bg-gray-900/80 px-4 py-2 flex justify-between items-center border-b border-gray-800 backdrop-blur-sm z-10 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-gray-400 text-xs font-mono tracking-widest">BED {roomNumber}</span>
          </div>
          <span className="text-gray-200 font-bold uppercase tracking-wider text-sm">{patientName}</span>
        </div>

        <div className="flex items-center gap-3">
          {hasCritical && (
            <motion.button
              className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold tracking-wider rounded-sm hover:bg-red-700 uppercase"
              onClick={() => {
                setAlarmMuted(!alarmMuted);
                onAlarmAcknowledge?.();
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {alarmMuted ? 'UNMUTE ALARM' : 'SILENCE ALARM'}
            </motion.button>
          )}
          <span className="text-gray-500 text-xs font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Main Display Grid */}
      <div className="p-4 grid grid-cols-12 gap-0 h-[400px]">
        {/* Left Column - Waveforms */}
        <div className="col-span-8 flex flex-col justify-between pr-4 border-r border-gray-800/50">
          {/* ECG Waveform */}
          <div className="flex-1 flex flex-col justify-end relative">
            <div className="absolute top-2 left-2 flex gap-4">
              <span className="text-green-500 text-xs font-bold">II</span>
              <span className="text-green-500 text-xs font-mono">{rhythm.replace('_', ' ').toUpperCase()}</span>
            </div>
            <WaveformCanvas
              width={500}
              height={120}
              color="#22c55e"
              generatePoint={ecgGenerator}
              speed={75}
            />
          </div>

          {/* SpO2 Pleth Waveform */}
          <div className="flex-1 flex flex-col justify-end relative">
            <div className="absolute top-2 left-2">
              <span className="text-blue-500 text-xs font-bold">PLETH</span>
            </div>
            <WaveformCanvas
              width={500}
              height={80}
              color="#3b82f6"
              generatePoint={plethGenerator}
              speed={75}
            />
          </div>

          {/* Respiratory Waveform */}
          <div className="flex-1 flex flex-col justify-end relative">
            <div className="absolute top-2 left-2">
              <span className="text-yellow-500 text-xs font-bold">RESP</span>
            </div>
            <WaveformCanvas
              width={500}
              height={80}
              color="#fbbf24"
              generatePoint={respGenerator}
              speed={25}
            />
          </div>
        </div>

        {/* Right Column - Numeric Values */}
        <div className="col-span-4 pl-4 flex flex-col gap-6 justify-center">
          {/* Heart Rate */}
          <div className="flex justify-between items-start">
            <VitalValue
              label="HR"
              value={vitals.heartRate}
              unit="BPM"
              color="#22c55e"
              status={hrStatus}
              size="lg"
            />
          </div>

          {/* SpO2 */}
          <div className="flex justify-between items-start">
            <VitalValue
              label="SpO2"
              value={vitals.oxygenSaturation}
              unit="%"
              color="#3b82f6"
              status={spo2Status}
              size="lg"
            />
          </div>

          {/* Blood Pressure */}
          <div className="flex justify-between items-start">
            <VitalValue
              label="NIBP"
              value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
              unit="mmHg"
              color="#ef4444"
              status={bpStatus}
              size="md"
            />
          </div>

          {/* Resp / Temp Split */}
          <div className="grid grid-cols-2 gap-2">
            <VitalValue
              label="RESP"
              value={vitals.respiratoryRate}
              unit="/min"
              color="#fbbf24"
              status={rrStatus}
              size="md"
            />
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

      {/* Alarm Bar Overlay */}
      <AnimatePresence>
        {hasCritical && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-red-900/90 border-t-2 border-red-600 px-4 py-1 z-30"
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
              <span className="text-white font-bold tracking-widest text-sm animate-pulse">
                CRITICAL ALARM - CHECK PATIENT
              </span>
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// ============================================
// EKG STRIP COMPONENT
// ============================================

interface EKGStripProps {
  rhythm: CardiacRhythm;
  heartRate: number;
  label?: string;
  duration?: number; // seconds to display
}

export const EKGStrip: React.FC<EKGStripProps> = ({
  rhythm,
  heartRate,
  label = 'Lead II',
  duration = 6,
}) => {
  const ecgGenerator = useCallback(
    (t: number) => generateECGPoint(t, heartRate, rhythm),
    [heartRate, rhythm]
  );

  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden relative h-32 w-full">
      <div className="absolute top-2 left-2 flex gap-4 z-10">
        <span className="text-green-500 text-xs font-bold">{label}</span>
        <span className="text-gray-500 text-xs font-mono">{heartRate} BPM</span>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="h-full w-full flex items-center">
        <WaveformCanvas
          width={800} // Fixed width for strip usually, or use 100% via container? Canvas needs px
          height={128}
          color="#22c55e"
          generatePoint={ecgGenerator}
          speed={50}
          lineWidth={1.5}
        />
      </div>
    </div>
  );
};

// ============================================
// RHYTHM QUIZ COMPONENT
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
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const options: { id: CardiacRhythm; label: string }[] = [
    { id: 'normal_sinus', label: 'Normal Sinus Rhythm' },
    { id: 'sinus_tachycardia', label: 'Sinus Tachycardia' },
    { id: 'sinus_bradycardia', label: 'Sinus Bradycardia' },
    { id: 'atrial_fibrillation', label: 'Atrial Fibrillation' },
    { id: 'ventricular_tachycardia', label: 'Ventricular Tachycardia' },
    { id: 'ventricular_fibrillation', label: 'Ventricular Fibrillation' },
    { id: 'asystole', label: 'Asystole' },
  ];

  // Shuffle options and pick 4 including correct one
  // simplified for now, just show fixed list or random subset
  const quizOptions = options; // Show all for now

  const handleGuess = (id: string) => {
    if (answered) return;

    const correct = id === correctRhythm;
    setAnswered(true);
    setSelected(id);
    setIsCorrect(correct);
    onAnswer(correct);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-visible p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Identify the Rhythm</h3>
        {answered && (
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {isCorrect ? 'CORRECT' : 'INCORRECT'}
          </span>
        )}
      </div>

      <EKGStrip rhythm={correctRhythm} heartRate={heartRate} label="Unknown Rhythm" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quizOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleGuess(opt.id)}
            disabled={answered}
            className={`
              p-3 rounded-lg text-sm font-bold transition-all
              ${answered && opt.id === correctRhythm ? 'bg-green-600 text-white ring-2 ring-green-400' : ''}
              ${answered && selected === opt.id && opt.id !== correctRhythm ? 'bg-red-600 text-white' : ''}
              ${!answered ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : ''}
              ${answered && opt.id !== correctRhythm && selected !== opt.id ? 'opacity-50 bg-gray-800' : ''}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {answered && showHint && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400">
          <p>
            <strong>Explanation:</strong> {correctRhythm.replace('_', ' ').toUpperCase()} is characterized by...
            (Medical explanation placeholder)
          </p>
        </div>
      )}
    </div>
  );
};

export default VitalSignsMonitor;

