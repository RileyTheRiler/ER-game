// src/components/game/ImagingViewer.tsx
// Medical imaging viewer with educational overlays and annotations

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TYPES
// ============================================

type ImagingModality = 'X-RAY' | 'CT' | 'ULTRASOUND' | 'MRI';
type BodyRegion = 'CHEST' | 'ABDOMEN' | 'HEAD' | 'SPINE' | 'EXTREMITY' | 'CARDIAC';

interface Finding {
  id: string;
  name: string;
  description: string;
  location: { x: number; y: number; width: number; height: number }; // percentages
  severity: 'normal' | 'abnormal' | 'critical';
  educationalNote: string;
  isKey: boolean; // Is this a key finding for the case?
}

interface ImagingStudy {
  id: string;
  modality: ImagingModality;
  region: BodyRegion;
  view: string;
  timestamp: string;
  findings: Finding[];
  impression: string[];
  technique: string;
  comparison?: string;

  // For simulation - we'll use descriptions and generated visuals
  imageDescription: string;
  simulatedImageUrl?: string;
}

interface ImagingViewerProps {
  study: ImagingStudy;
  showFindings?: boolean;
  interactiveMode?: boolean;
  onFindingClick?: (finding: Finding) => void;
  showReport?: boolean;
  quizMode?: boolean;
  onQuizAnswer?: (findingId: string, correct: boolean) => void;
}

// ============================================
// SIMULATED IMAGING COMPONENT
// ============================================

interface SimulatedImageProps {
  study: ImagingStudy;
  findings: Finding[];
  showOverlays: boolean;
  hoveredFinding: string | null;
  selectedFinding: string | null;
  onFindingHover: (id: string | null) => void;
  onFindingClick: (id: string) => void;
  brightness: number;
  contrast: number;
  zoom: number;
}

const SimulatedImage: React.FC<SimulatedImageProps> = ({
  study,
  findings,
  showOverlays,
  hoveredFinding,
  selectedFinding,
  onFindingHover,
  onFindingClick,
  brightness,
  contrast,
  zoom,
}) => {
  // Generate a procedural "image" based on the study type
  const generateGradient = useCallback(() => {
    const baseColor = study.modality === 'X-RAY' ? '20, 20, 25'
      : study.modality === 'CT' ? '15, 15, 20'
        : study.modality === 'ULTRASOUND' ? '10, 10, 15'
          : '25, 25, 30';

    return `radial-gradient(ellipse at 50% 40%, 
      rgba(${baseColor}, 0.7) 0%, 
      rgba(${baseColor}, 0.9) 50%, 
      rgba(0, 0, 0, 1) 100%)`;
  }, [study.modality]);

  const severityColors = {
    normal: 'border-green-500 bg-green-500/10',
    abnormal: 'border-yellow-500 bg-yellow-500/10',
    critical: 'border-red-500 bg-red-500/20 animate-pulse',
  };

  return (
    <div
      className="relative w-full aspect-square bg-black overflow-hidden"
      style={{
        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
        transform: `scale(${zoom})`,
      }}
    >
      {/* Simulated medical image background */}
      <div
        className="absolute inset-0"
        style={{ background: generateGradient() }}
      >
        {/* Simulated anatomical structures based on region */}
        {study.region === 'CHEST' && (
          <>
            {/* Lung fields */}
            <div className="absolute left-[15%] top-[20%] w-[30%] h-[50%] rounded-[40%] bg-gray-800/30" />
            <div className="absolute right-[15%] top-[20%] w-[30%] h-[50%] rounded-[40%] bg-gray-800/30" />
            {/* Heart shadow */}
            <div className="absolute left-[35%] top-[30%] w-[25%] h-[35%] rounded-[50%] bg-gray-600/40" />
            {/* Ribs suggestion */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[2px] bg-gray-500/30"
                style={{
                  left: '10%',
                  right: '10%',
                  top: `${20 + i * 7}%`,
                  transform: `rotate(${-5 + i * 0.5}deg)`,
                }}
              />
            ))}
            {/* Spine */}
            <div className="absolute left-[47%] top-[15%] w-[6%] h-[70%] bg-gray-500/30" />
          </>
        )}

        {study.region === 'HEAD' && (
          <>
            {/* Skull outline */}
            <div className="absolute left-[20%] top-[15%] w-[60%] h-[70%] rounded-[50%] border-2 border-gray-500/30" />
            {/* Brain tissue */}
            <div className="absolute left-[25%] top-[20%] w-[50%] h-[55%] rounded-[50%] bg-gray-600/30" />
            {/* Ventricles */}
            <div className="absolute left-[35%] top-[35%] w-[30%] h-[15%] bg-gray-800/50 rounded-full" />
          </>
        )}

        {study.region === 'ABDOMEN' && (
          <>
            {/* Liver */}
            <div className="absolute right-[15%] top-[10%] w-[35%] h-[25%] rounded-lg bg-gray-600/30" />
            {/* Spleen */}
            <div className="absolute left-[15%] top-[15%] w-[15%] h-[15%] rounded-full bg-gray-600/30" />
            {/* Kidneys */}
            <div className="absolute left-[20%] top-[40%] w-[12%] h-[20%] rounded-[40%] bg-gray-500/30" />
            <div className="absolute right-[20%] top-[40%] w-[12%] h-[20%] rounded-[40%] bg-gray-500/30" />
            {/* Bowel */}
            <div className="absolute left-[25%] top-[55%] w-[50%] h-[30%] bg-gray-700/30" />
            {/* Spine */}
            <div className="absolute left-[47%] top-[5%] w-[6%] h-[90%] bg-gray-500/30" />
          </>
        )}

        {/* Modality-specific overlay */}
        {study.modality === 'ULTRASOUND' && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
        )}

        {/* Noise/texture overlay for realism */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Finding overlays */}
      {showOverlays && findings.map((finding) => (
        <motion.div
          key={finding.id}
          className={`
            absolute border-2 rounded cursor-pointer transition-all
            ${severityColors[finding.severity]}
            ${hoveredFinding === finding.id || selectedFinding === finding.id ? 'opacity-100' : 'opacity-60'}
          `}
          style={{
            left: `${finding.location.x}%`,
            top: `${finding.location.y}%`,
            width: `${finding.location.width}%`,
            height: `${finding.location.height}%`,
          }}
          onMouseEnter={() => onFindingHover(finding.id)}
          onMouseLeave={() => onFindingHover(null)}
          onClick={() => onFindingClick(finding.id)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
        >
          {/* Finding label */}
          <div className={`
            absolute -top-6 left-0 px-2 py-0.5 rounded text-xs whitespace-nowrap
            ${finding.severity === 'critical' ? 'bg-red-600 text-white' :
              finding.severity === 'abnormal' ? 'bg-yellow-600 text-black' :
                'bg-green-600 text-white'}
          `}>
            {finding.name}
          </div>

          {/* Key finding indicator */}
          {finding.isKey && (
            <div className="absolute -top-6 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              ★
            </div>
          )}
        </motion.div>
      ))}

      {/* Image metadata overlay */}
      <div className="absolute top-2 left-2 text-green-400 text-xs font-mono space-y-1 bg-black/50 p-2 rounded">
        <div>{study.modality} - {study.region}</div>
        <div>{study.view}</div>
        <div>{study.timestamp}</div>
      </div>

      {/* Scale/orientation markers */}
      <div className="absolute top-2 right-2 text-green-400 text-xs font-mono">
        {study.modality === 'X-RAY' && 'R →'}
        {study.modality === 'CT' && 'A →'}
      </div>
    </div>
  );
};

// ============================================
// FINDING DETAIL PANEL
// ============================================

interface FindingDetailProps {
  finding: Finding | null;
  onClose: () => void;
}

const FindingDetail: React.FC<FindingDetailProps> = ({ finding, onClose }) => {
  if (!finding) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-white font-medium">{finding.name}</h4>
          <span className={`
            text-xs px-2 py-0.5 rounded
            ${finding.severity === 'critical' ? 'bg-red-600 text-white' :
              finding.severity === 'abnormal' ? 'bg-yellow-600 text-black' :
                'bg-green-600 text-white'}
          `}>
            {finding.severity.toUpperCase()}
          </span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
      </div>

      <p className="text-gray-300 text-sm mb-3">{finding.description}</p>

      <div className="bg-blue-900/30 border border-blue-700 rounded p-3">
        <h5 className="text-blue-400 text-xs uppercase tracking-wider mb-2">Educational Note</h5>
        <p className="text-gray-300 text-sm">{finding.educationalNote}</p>
      </div>

      {finding.isKey && (
        <div className="mt-3 flex items-center gap-2 text-yellow-400 text-sm">
          <span>★</span>
          <span>This is a key finding for this case</span>
        </div>
      )}
    </motion.div>
  );
};

// ============================================
// RADIOLOGY REPORT COMPONENT
// ============================================

interface RadiologyReportProps {
  study: ImagingStudy;
}

const RadiologyReport: React.FC<RadiologyReportProps> = ({ study }) => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 font-mono text-sm">
      <div className="text-center border-b border-gray-700 pb-3 mb-3">
        <div className="text-white font-bold">RADIOLOGY REPORT</div>
        <div className="text-gray-400">{study.modality} {study.region}</div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-gray-500 uppercase text-xs">Exam</div>
          <div className="text-white">{study.modality} {study.region} - {study.view}</div>
        </div>

        <div>
          <div className="text-gray-500 uppercase text-xs">Technique</div>
          <div className="text-gray-300">{study.technique}</div>
        </div>

        {study.comparison && (
          <div>
            <div className="text-gray-500 uppercase text-xs">Comparison</div>
            <div className="text-gray-300">{study.comparison}</div>
          </div>
        )}

        <div>
          <div className="text-gray-500 uppercase text-xs">Findings</div>
          <div className="text-gray-300 whitespace-pre-line">{study.imageDescription}</div>
        </div>

        <div className="border-t border-gray-700 pt-3">
          <div className="text-gray-500 uppercase text-xs">Impression</div>
          <ol className="text-white list-decimal list-inside space-y-1">
            {study.impression.map((item, i) => (
              <li key={i} className={item.includes('URGENT') || item.includes('CRITICAL') ? 'text-red-400' : ''}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-700 text-gray-500 text-xs">
        <div>Electronically signed: {study.timestamp}</div>
        <div>Radiologist: AI-Simulated Report</div>
      </div>
    </div>
  );
};

// ============================================
// IMAGE CONTROLS COMPONENT
// ============================================

interface ImageControlsProps {
  brightness: number;
  contrast: number;
  zoom: number;
  onBrightnessChange: (v: number) => void;
  onContrastChange: (v: number) => void;
  onZoomChange: (v: number) => void;
  onReset: () => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({
  brightness,
  contrast,
  zoom,
  onBrightnessChange,
  onContrastChange,
  onZoomChange,
  onReset,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-3 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Window/Level</span>
        <button
          onClick={onReset}
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-gray-500 text-xs">Brightness</label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="text-gray-500 text-xs">Contrast</label>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={(e) => onContrastChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="text-gray-500 text-xs">Zoom</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN IMAGING VIEWER COMPONENT
// ============================================

export const ImagingViewer: React.FC<ImagingViewerProps> = ({
  study,
  showFindings = true,
  interactiveMode = true,
  onFindingClick,
  showReport = false,
  quizMode = false,
  onQuizAnswer,
}) => {
  const [hoveredFinding, setHoveredFinding] = useState<string | null>(null);
  const [selectedFinding, setSelectedFinding] = useState<string | null>(null);
  const [showOverlays, setShowOverlays] = useState(showFindings && !quizMode);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [showReportPanel, setShowReportPanel] = useState(showReport);

  // Quiz mode state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const [quizComplete, setQuizComplete] = useState(false);

  const handleFindingClick = (id: string) => {
    if (quizMode) {
      // In quiz mode, clicking reveals the finding
      setQuizAnswers(prev => ({ ...prev, [id]: true }));
      onQuizAnswer?.(id, true);
    } else {
      setSelectedFinding(id === selectedFinding ? null : id);
      const foundFinding = study.findings.find(f => f.id === id);
      if (foundFinding) {
        onFindingClick?.(foundFinding);
      }
    }
  };

  const selectedFindingData = study.findings.find(f => f.id === selectedFinding);

  const resetControls = () => {
    setBrightness(100);
    setContrast(100);
    setZoom(1);
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">{study.modality} - {study.region}</span>
          <span className="text-gray-400 text-sm">{study.view}</span>
          {study.findings.some(f => f.severity === 'critical') && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded animate-pulse">
              CRITICAL FINDING
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!quizMode && (
            <button
              onClick={() => setShowOverlays(!showOverlays)}
              className={`px-3 py-1 text-sm rounded ${showOverlays ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {showOverlays ? 'Hide' : 'Show'} Findings
            </button>
          )}
          <button
            onClick={() => setShowReportPanel(!showReportPanel)}
            className={`px-3 py-1 text-sm rounded ${showReportPanel ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 grid grid-cols-3 gap-4">
        {/* Image Viewer */}
        <div className="col-span-2 space-y-4">
          <SimulatedImage
            study={study}
            findings={quizMode ? study.findings.filter(f => quizAnswers[f.id]) : study.findings}
            showOverlays={showOverlays || quizMode}
            hoveredFinding={hoveredFinding}
            selectedFinding={selectedFinding}
            onFindingHover={setHoveredFinding}
            onFindingClick={handleFindingClick}
            brightness={brightness}
            contrast={contrast}
            zoom={zoom}
          />

          <ImageControls
            brightness={brightness}
            contrast={contrast}
            zoom={zoom}
            onBrightnessChange={setBrightness}
            onContrastChange={setContrast}
            onZoomChange={setZoom}
            onReset={resetControls}
          />
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Quiz Mode Instructions */}
          {quizMode && !quizComplete && (
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">🔍 Find the Abnormalities</h4>
              <p className="text-gray-300 text-sm">
                Click on the image where you see abnormal findings.
                Found: {Object.keys(quizAnswers).length} / {study.findings.filter(f => f.severity !== 'normal').length}
              </p>
              {Object.keys(quizAnswers).length === study.findings.filter(f => f.severity !== 'normal').length && (
                <button
                  onClick={() => {
                    setQuizComplete(true);
                    setShowOverlays(true);
                  }}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
                >
                  Review All Findings
                </button>
              )}
            </div>
          )}

          {/* Finding Detail or Findings List */}
          {!quizMode && (
            <AnimatePresence mode="wait">
              {selectedFinding ? (
                <FindingDetail
                  finding={selectedFindingData || null}
                  onClose={() => setSelectedFinding(null)}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <h4 className="text-white font-medium mb-3">Findings ({study.findings.length})</h4>
                  <div className="space-y-2">
                    {study.findings.map((finding) => (
                      <div
                        key={finding.id}
                        className={`
                          p-2 rounded cursor-pointer transition-colors
                          ${hoveredFinding === finding.id ? 'bg-gray-700' : 'bg-gray-800/50'}
                          ${finding.severity === 'critical' ? 'border-l-4 border-red-500' :
                            finding.severity === 'abnormal' ? 'border-l-4 border-yellow-500' :
                              'border-l-4 border-green-500'}
                        `}
                        onMouseEnter={() => setHoveredFinding(finding.id)}
                        onMouseLeave={() => setHoveredFinding(null)}
                        onClick={() => handleFindingClick(finding.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">{finding.name}</span>
                          {finding.isKey && <span className="text-yellow-400">★</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Report Panel */}
          {showReportPanel && (
            <RadiologyReport study={study} />
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// PRESET IMAGING STUDIES FACTORY
// ============================================

export const createNormalChestXray = (): ImagingStudy => ({
  id: 'cxr-normal-001',
  modality: 'X-RAY',
  region: 'CHEST',
  view: 'PA and Lateral',
  timestamp: new Date().toLocaleTimeString(),
  technique: 'Standard PA and lateral chest radiograph obtained.',
  comparison: 'None available.',
  imageDescription: `
    Heart size is normal. Mediastinal contours are unremarkable.
    Lungs are clear bilaterally without focal consolidation, effusion, or pneumothorax.
    No acute osseous abnormalities.
    Visualized upper abdomen is unremarkable.
  `,
  findings: [
    {
      id: 'heart',
      name: 'Normal heart size',
      description: 'Cardiothoracic ratio < 0.5',
      location: { x: 35, y: 30, width: 25, height: 30 },
      severity: 'normal',
      educationalNote: 'Normal cardiothoracic ratio is less than 50%. Enlargement suggests cardiomegaly.',
      isKey: false,
    },
    {
      id: 'lungs',
      name: 'Clear lung fields',
      description: 'No infiltrates or effusions',
      location: { x: 15, y: 20, width: 70, height: 45 },
      severity: 'normal',
      educationalNote: 'Normal lung parenchyma appears dark/black due to air content. White areas suggest fluid, consolidation, or mass.',
      isKey: false,
    },
  ],
  impression: [
    'No acute cardiopulmonary abnormality.',
  ],
});

export const createPneumoniaChestXray = (): ImagingStudy => ({
  id: 'cxr-pneumonia-001',
  modality: 'X-RAY',
  region: 'CHEST',
  view: 'PA and Lateral',
  timestamp: new Date().toLocaleTimeString(),
  technique: 'Standard PA and lateral chest radiograph obtained.',
  comparison: 'None available.',
  imageDescription: `
    Heart size is normal. 
    There is patchy airspace opacity in the right lower lobe consistent with consolidation.
    Air bronchograms are present within the opacity.
    No pleural effusion identified.
    Left lung is clear.
    No pneumothorax.
  `,
  findings: [
    {
      id: 'rll-consolidation',
      name: 'RLL Consolidation',
      description: 'Patchy airspace opacity with air bronchograms',
      location: { x: 55, y: 45, width: 25, height: 25 },
      severity: 'abnormal',
      educationalNote: 'Air bronchograms (dark branching airways within white consolidation) indicate alveolar filling process, classic for pneumonia.',
      isKey: true,
    },
    {
      id: 'heart',
      name: 'Normal heart size',
      description: 'Cardiothoracic ratio normal',
      location: { x: 35, y: 30, width: 25, height: 30 },
      severity: 'normal',
      educationalNote: 'Heart size is important to assess - cardiomegaly with infiltrates might suggest CHF rather than pneumonia.',
      isKey: false,
    },
  ],
  impression: [
    'Right lower lobe pneumonia.',
    'No pleural effusion.',
  ],
});

export const createCTHeadSAH = (): ImagingStudy => ({
  id: 'ct-head-sah-001',
  modality: 'CT',
  region: 'HEAD',
  view: 'Non-contrast',
  timestamp: new Date().toLocaleTimeString(),
  technique: 'Non-contrast CT head performed.',
  comparison: 'None.',
  imageDescription: `
    High-attenuation material is present within the suprasellar cistern, 
    bilateral sylvian fissures, and the interhemispheric fissure, 
    consistent with acute subarachnoid hemorrhage.
    
    No intraparenchymal hemorrhage or mass effect.
    No hydrocephalus.
    Ventricles are normal in size.
  `,
  findings: [
    {
      id: 'sah-suprasellar',
      name: 'SAH - Suprasellar cistern',
      description: 'Hyperdensity in suprasellar cistern',
      location: { x: 40, y: 50, width: 20, height: 15 },
      severity: 'critical',
      educationalNote: 'Fresh blood appears white (hyperdense) on CT. Suprasellar location suggests circle of Willis aneurysm.',
      isKey: true,
    },
    {
      id: 'sah-sylvian',
      name: 'SAH - Sylvian fissures',
      description: 'Bilateral sylvian fissure blood',
      location: { x: 25, y: 35, width: 50, height: 10 },
      severity: 'critical',
      educationalNote: 'Blood in the sylvian fissures can be seen with MCA aneurysm rupture or extension from other locations.',
      isKey: true,
    },
  ],
  impression: [
    '*** CRITICAL FINDING ***',
    'Acute subarachnoid hemorrhage.',
    'RECOMMEND URGENT CTA HEAD FOR ANEURYSM EVALUATION.',
    'Neurosurgery consultation recommended.',
  ],
});

export const createCTAbdomenAppendicitits = (): ImagingStudy => ({
  id: 'ct-abd-appy-001',
  modality: 'CT',
  region: 'ABDOMEN',
  view: 'With IV contrast',
  timestamp: new Date().toLocaleTimeString(),
  technique: 'CT abdomen and pelvis with IV contrast.',
  comparison: 'None.',
  imageDescription: `
    The appendix is dilated, measuring 12mm in diameter (normal <6mm).
    There is periappendiceal fat stranding and inflammatory changes.
    No appendicolith identified.
    No free air to suggest perforation.
    No drainable abscess.
    Remainder of bowel is unremarkable.
  `,
  findings: [
    {
      id: 'dilated-appendix',
      name: 'Dilated Appendix',
      description: 'Appendix measures 12mm, dilated',
      location: { x: 55, y: 65, width: 15, height: 10 },
      severity: 'critical',
      educationalNote: 'Normal appendix is <6mm. Dilation >10mm with fat stranding is highly specific for acute appendicitis.',
      isKey: true,
    },
    {
      id: 'fat-stranding',
      name: 'Periappendiceal inflammation',
      description: 'Fat stranding around the appendix',
      location: { x: 50, y: 60, width: 25, height: 20 },
      severity: 'abnormal',
      educationalNote: 'Fat stranding appears as haziness in the normally dark fat. Indicates inflammation extending beyond the organ.',
      isKey: true,
    },
  ],
  impression: [
    'Acute uncomplicated appendicitis.',
    'No perforation or abscess.',
    'Surgical consultation recommended.',
  ],
});

export default ImagingViewer;
