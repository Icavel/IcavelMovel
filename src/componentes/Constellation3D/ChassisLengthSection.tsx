// src/components/Constellation/ChassisLengthSection.tsx
import { useState, useEffect } from "react";
import { Ruler, Check, Info, Edit2 } from "lucide-react";

interface ChassisLengthSectionProps {
  selectedLength: number;
  onLengthChange: (length: number) => void;
}

interface ChassisOption {
  length: number;
  label: string;
  type: string;
  applications: string[];
}

export default function ChassisLengthSection({ 
  selectedLength, 
  onLengthChange 
}: ChassisLengthSectionProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLength, setCustomLength] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [selectedLength]);

  const chassisOptions: ChassisOption[] = [
    { length: 4200, label: "4,2m", type: "Compacto", applications: ["Urbano", "Coletor"] },
    { length: 5200, label: "5,2m", type: "Médio", applications: ["Distribuição", "Baú"] },
    { length: 6200, label: "6,2m", type: "Alongado", applications: ["Carga Seca", "Frigorífico"] },
    { length: 7200, label: "7,2m", type: "Extra Longo", applications: ["Bitrem", "Implementos"] }
  ];

  const handleCustomLength = () => {
    const length = parseFloat(customLength);
    if (!isNaN(length) && length >= 3000 && length <= 12000) {
      const roundedLength = Math.round(length);
      onLengthChange(roundedLength);
      setShowCustomInput(false);
      setCustomLength("");
    }
  };

  const getPercentage = (length: number) => {
    const min = 3000;
    const max = 12000;
    return ((length - min) / (max - min)) * 100;
  };

  const getChassisWidth = () => {
    const minWidth = 40; 
    const maxWidth = 85; 
    const percentage = getPercentage(selectedLength);
    return minWidth + (percentage / 100) * (maxWidth - minWidth);
  };

  const getAxleCount = () => {
    if (selectedLength < 5000) return 1;
    if (selectedLength < 7000) return 2;
    if (selectedLength < 9000) return 3;
    return 4;
  };

  const formatLength = (length: number) => {
    return (length / 1000).toFixed(1).replace('.', ',') + "m";
  };

  const getRecommendedApplication = () => {
    if (selectedLength < 5000) return "Urbana";
    if (selectedLength < 7000) return "Regional";
    return "Longa Distância";
  };

  const calculateSpecs = () => {
    const wheelbase = Math.round(selectedLength * 0.7); 
    const usefulArea = Math.round(selectedLength * 0.85); 
    const supportedWeight = Math.round(selectedLength / 100); 
    return { wheelbase, usefulArea, supportedWeight };
  };

  const specs = calculateSpecs();
  const chassisWidth = getChassisWidth();
  const axleCount = getAxleCount();

  const CabinSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="cabinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2d3748' }} />
          <stop offset="100%" style={{ stopColor: '#1a202c' }} />
        </linearGradient>
        <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#63b3ed' }} />
          <stop offset="100%" style={{ stopColor: '#4299e1' }} />
        </linearGradient>
      </defs>
      <rect x="0" y="20" width="100" height="60" rx="8" fill="url(#cabinGrad)" />
      <rect x="10" y="28" width="80" height="25" rx="3" fill="url(#windowGrad)" />
      <rect x="10" y="60" width="80" height="15" rx="2" fill="#1a202c" />
      <rect x="15" y="63" width="12" height="8" rx="1" fill="#fbbf24" />
      <circle cx="85" cy="32" r="3" fill="#cbd5e0" />
      <path d="M5 75 L10 80 L15 75 Z" fill="#2d3748" />
      <path d="M85 75 L90 80 L95 75 Z" fill="#2d3748" />
    </svg>
  );

  const ChassisSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4a5568' }} />
          <stop offset="50%" style={{ stopColor: '#718096' }} />
          <stop offset="100%" style={{ stopColor: '#4a5568' }} />
        </linearGradient>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#2d3748', stopOpacity: 0 }} />
          <stop offset="50%" style={{ stopColor: '#2d3748', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#2d3748', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <rect width="400" height="40" y="10" fill="url(#chassisGrad)" />
      <rect width="400" height="2" y="10" fill="#2d3748" />
      <rect width="400" height="2" y="48" fill="#2d3748" />
      <g opacity="0.3">
        <rect x="50" width="2" height="40" y="10" fill="url(#beamGrad)" />
        <rect x="120" width="2" height="40" y="10" fill="url(#beamGrad)" />
        <rect x="190" width="2" height="40" y="10" fill="url(#beamGrad)" />
        <rect x="260" width="2" height="40" y="10" fill="url(#beamGrad)" />
        <rect x="330" width="2" height="40" y="10" fill="url(#beamGrad)" />
      </g>
    </svg>
  );

  const WheelSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="#1a202c" stroke="#000" strokeWidth="0.5"/>
      <circle cx="8" cy="8" r="4" fill="#4a5568"/>
      <circle cx="8" cy="8" r="2" fill="#cbd5e0"/>
    </svg>
  );

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes chassisStretch {
            0% { transform: scaleX(0.98); }
            50% { transform: scaleX(1.02); }
            100% { transform: scaleX(1); }
          }
          
          @keyframes beamAppear {
            from { 
              opacity: 0;
              transform: translateX(-50%) scaleY(0.5);
            }
            to { 
              opacity: 0.7;
              transform: translateX(-50%) scaleY(1);
            }
          }
          
          @keyframes axleAppear {
            from { 
              opacity: 0;
              transform: translateX(-50%) translateY(10px);
            }
            to { 
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
          
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .option-card-selected {
            animation: fadeIn 0.3s ease-out;
          }
          
          .slider-input {
            transition: all 0.2s ease;
          }
          
          .slider-input:active {
            transform: scale(1.02);
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            <Ruler size={20} style={styles.icon} />
            Comprimento do Chassi
          </h3>
          <p style={styles.subtitle}>
            Selecione ou ajuste o comprimento do chassi para sua aplicação
          </p>
        </div>

        <div style={styles.visualizer}>
          <div style={styles.truckContainer}>
            <div style={styles.cabinWrapper}>
              <CabinSVG />
            </div>
         
            <div 
              style={{
                ...styles.chassisWrapper,
                width: `${chassisWidth}%`,
                animation: isAnimating ? 'chassisStretch 0.3s ease-out' : 'none',
              }}
            >
              <ChassisSVG />
              
              <div style={styles.axlesContainer}>
                {[...Array(axleCount)].map((_, i) => (
                  <div 
                    key={i}
                    style={{
                      ...styles.axle,
                      left: `${(i + 1) * (85 / (axleCount + 1))}%`,
                      animationDelay: `${i * 0.1}s`,
                      animation: isAnimating ? 'axleAppear 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <WheelSVG />
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.measureIndicator}>
              <div style={styles.measureLine} />
              <div style={styles.measureLabel}>
                {formatLength(selectedLength)}
              </div>
              <div style={styles.measureLine} />
            </div>
          </div>
          
          <div style={styles.applicationIndicators}>
            <span style={styles.applicationTag}>
              Aplicação: {getRecommendedApplication()}
            </span>
            <span style={styles.axleTag}>
              Eixos: {axleCount}
            </span>
          </div>
        </div>

        <div style={styles.sliderSection}>
          <div style={styles.sliderHeader}>
            <span style={styles.sliderLabel}>Ajuste o comprimento:</span>
            <span style={styles.sliderValue}>{formatLength(selectedLength)}</span>
          </div>
          
          <div style={styles.sliderTrack}>
            <input
              type="range"
              min="3000"
              max="12000"
              step="100"
              value={selectedLength}
              onChange={(e) => onLengthChange(Number(e.target.value))}
              style={styles.slider}
              className="slider-input"
            />
            <div 
              style={{
                ...styles.sliderFill,
                width: `${getPercentage(selectedLength)}%`
              }}
            />
          </div>
          
          <div style={styles.markers}>
            {chassisOptions.map((option) => (
              <div key={option.length} style={styles.marker}>
                <button
                  onClick={() => onLengthChange(option.length)}
                  style={{
                    ...styles.markerDot,
                    backgroundColor: selectedLength === option.length ? '#0056b3' : '#d1d5db',
                    transform: selectedLength === option.length ? 'scale(1.2)' : 'scale(1)'
                  }}
                  title={`${option.label} - ${option.type}`}
                />
                <span style={styles.markerLabel}>{option.label}</span>
                <span style={styles.markerType}>{option.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.customInputSection}>
          {!showCustomInput ? (
            <button 
              onClick={() => setShowCustomInput(true)}
              style={styles.customButton}
            >
              <Edit2 size={16} />
              <span>Inserir tamanho personalizado</span>
            </button>
          ) : (
            <div style={styles.customInputBox}>
              <div style={styles.customInputWrapper}>
                <input
                  type="number"
                  value={customLength}
                  onChange={(e) => setCustomLength(e.target.value)}
                  placeholder="Ex: 5500"
                  min="3000"
                  max="12000"
                  style={styles.customInput}
                  autoFocus
                />
                <span style={styles.inputUnit}>mm</span>
              </div>
              <div style={styles.customInputButtons}>
                <button 
                  onClick={handleCustomLength}
                  style={styles.applyButton}
                >
                  Aplicar
                </button>
                <button 
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomLength("");
                  }}
                  style={styles.cancelButton}
                >
                  Cancelar
                </button>
              </div>
              <span style={styles.inputHint}>
                * Comprimento entre 3.000mm (3,0m) e 12.000mm (12,0m)
              </span>
            </div>
          )}
        </div>

        <div style={styles.optionsGrid}>
          {chassisOptions.map((option) => {
            const optionChassisWidth = 40 + (getPercentage(option.length) / 100) * 45;
            const optionAxleCount = option.length < 5000 ? 1 : option.length < 7000 ? 2 : option.length < 9000 ? 3 : 4;
            
            return (
              <button
                key={option.length}
                onClick={() => onLengthChange(option.length)}
                style={{
                  ...styles.optionCard,
                  ...(selectedLength === option.length ? styles.optionCardSelected : {})
                }}
                className={selectedLength === option.length ? 'option-card-selected' : ''}
              >
                <div style={styles.optionHeader}>
                  <div style={styles.optionTitle}>
                    <span style={styles.optionLength}>{option.label}</span>
                    <span style={styles.optionType}>{option.type}</span>
                  </div>
                  {selectedLength === option.length && (
                    <div style={styles.checkmark}>
                      <Check size={16} color="white" />
                    </div>
                  )}
                </div>
                
                <div style={styles.applications}>
                  <div style={styles.applicationsHeader}>
                    <Info size={14} />
                    <span>Aplicações:</span>
                  </div>
                  <div style={styles.applicationsTags}>
                    {option.applications.map((app, idx) => (
                      <span key={idx} style={styles.appTag}>{app}</span>
                    ))}
                  </div>
                </div>
             
                <div style={styles.miniVisual}>
                  <div style={styles.miniCabin}></div>
                  <div style={{
                    ...styles.miniChassis,
                    width: `${optionChassisWidth}%`
                  }}>
                    {[...Array(optionAxleCount)].map((_, i) => (
                      <div 
                        key={i}
                        style={{
                          ...styles.miniAxle,
                          left: `${(i + 1) * (100 / (optionAxleCount + 1))}%`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={styles.infoBox}>
          <div style={styles.infoIcon}>
            <Info size={18} color="#0056b3" />
          </div>
          <div style={styles.infoContent}>
            <strong>Chassi Selecionado:</strong> {formatLength(selectedLength)}
            {chassisOptions.find(c => c.length === selectedLength) && (
              <>
                {' - '}
                {chassisOptions.find(c => c.length === selectedLength)?.type}
                <br />
                <span style={styles.infoSubtext}>
                  Ideal para: {chassisOptions.find(c => c.length === selectedLength)?.applications.join(", ")}
                </span>
              </>
            )}
            {!chassisOptions.find(c => c.length === selectedLength) && (
              <>
                <br />
                <span style={styles.infoSubtext}>
                  Tamanho personalizado conforme sua necessidade
                </span>
              </>
            )}
            
            <div style={styles.specsGrid}>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Entre-eixos:</span>
                <strong style={styles.specValue}>~{specs.wheelbase.toLocaleString()}mm</strong>
              </div>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Área útil:</span>
                <strong style={styles.specValue}>~{specs.usefulArea.toLocaleString()}mm</strong>
              </div>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Carga máxima:</span>
                <strong style={styles.specValue}>~{specs.supportedWeight} ton</strong>
              </div>
              <div style={styles.specItem}>
                <span style={styles.specLabel}>Eixos traseiros:</span>
                <strong style={styles.specValue}>{axleCount}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    animation: 'fadeIn 0.4s ease-out forwards',
  },
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    color: '#0056b3',
    fontWeight: 700,
    fontSize: '1.125rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  icon: {
    display: 'inline',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.875rem',
    margin: 0,
  },
  visualizer: {
    background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #e5e7eb',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
  },
  truckContainer: {
    position: 'relative',
    height: '160px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  cabinWrapper: {
    position: 'relative',
    width: '80px',
    height: '80px',
    zIndex: 2,
    marginRight: '-2px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  },
  chassisWrapper: {
    position: 'relative',
    height: '60px',
    marginLeft: '-2px',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
  },
  axlesContainer: {
    position: 'absolute',
    bottom: '-8px',
    left: '0',
    right: '0',
    height: '20px',
  },
  axle: {
    position: 'absolute',
    bottom: '0',
    transform: 'translateX(-50%)',
    opacity: 0,
    animationFillMode: 'forwards',
    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
  },
  measureIndicator: {
    position: 'absolute',
    bottom: '-30px',
    left: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  measureLine: {
    flex: 1,
    height: '2px',
    background: '#0056b3',
  },
  measureLabel: {
    background: '#0056b3',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  applicationIndicators: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderTop: '1px solid #e5e7eb',
  },
  applicationTag: {
    background: 'rgba(0, 86, 179, 0.1)',
    color: '#0056b3',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid rgba(0, 86, 179, 0.2)',
  },
  axleTag: {
    background: 'rgba(45, 55, 72, 0.1)',
    color: '#2d3748',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid rgba(45, 55, 72, 0.2)',
  },
  sliderSection: {
    marginBottom: '2rem',
  },
  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sliderLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
  },
  sliderValue: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#0056b3',
  },
  sliderTrack: {
    position: 'relative',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: '8px',
    opacity: 0,
    cursor: 'pointer',
    zIndex: 2,
  },
  sliderFill: {
    position: 'absolute',
    height: '8px',
    background: 'linear-gradient(to right, #0056b3, #4dabf7)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    pointerEvents: 'none',
  },
  markers: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0.5rem',
  },
  marker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  markerDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    transition: 'all 0.2s',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  markerLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: 600,
  },
  markerType: {
    fontSize: '10px',
    color: '#6b7280',
    marginTop: '2px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  optionCard: {
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'left',
    width: '100%',
  },
  optionCardSelected: {
    borderColor: '#0056b3',
    background: 'rgba(0, 86, 179, 0.05)',
    boxShadow: '0 8px 24px rgba(0, 86, 179, 0.15)',
    transform: 'translateY(-2px)',
  },
  optionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  optionTitle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  optionLength: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#0056b3',
  },
  optionType: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: 600,
  },
  checkmark: {
    width: '28px',
    height: '28px',
    background: '#0056b3',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applications: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  applicationsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  applicationsTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  appTag: {
    background: '#f3f4f6',
    color: '#374151',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  miniVisual: {
    position: 'relative',
    height: '20px',
    marginTop: '10px',
    background: '#f3f4f6',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  miniCabin: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '25px',
    height: '100%',
    background: '#2d3748',
    borderRadius: '4px 0 0 4px',
  },
  miniChassis: {
    position: 'absolute',
    left: '25px',
    top: '0',
    height: '100%',
    background: 'linear-gradient(90deg, #4a5568, #718096)',
    transition: 'width 0.3s ease',
  },
  miniAxle: {
    position: 'absolute',
    bottom: '0',
    width: '4px',
    height: '6px',
    background: '#1a202c',
    borderRadius: '1px',
    transform: 'translateX(-50%)',
  },
  infoBox: {
    display: 'flex',
    gap: '1rem',
    padding: '1.25rem',
    background: '#e8f4ff',
    border: '1px solid #b5ccff',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    color: '#1e3a8a',
  },
  infoIcon: {
    flexShrink: 0,
    marginTop: '2px',
  },
  infoContent: {
    flex: 1,
  },
  infoSubtext: {
    fontSize: '0.8125rem',
    color: '#3b82f6',
    display: 'block',
    marginTop: '4px',
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(0, 86, 179, 0.1)',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  specLabel: {
    fontSize: '11px',
    color: '#6b7280',
  },
  specValue: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#0056b3',
  },
  customInputSection: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  customButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'white',
    border: '2px dashed #0056b3',
    borderRadius: '0.75rem',
    color: '#0056b3',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  customInputBox: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    border: '2px solid #0056b3',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    animation: 'slideDown 0.3s ease-out',
  },
  customInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
  },
  customInput: {
    flex: 1,
    padding: '0.875rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#0056b3',
    outline: 'none',
    transition: 'all 0.2s',
  },
  inputUnit: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#6b7280',
    position: 'absolute',
    right: '1rem',
    pointerEvents: 'none',
  },
  customInputButtons: {
    display: 'flex',
    gap: '0.75rem',
  },
  applyButton: {
    flex: 1,
    padding: '0.75rem',
    background: '#0056b3',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cancelButton: {
    flex: 1,
    padding: '0.75rem',
    background: '#f3f4f6',
    color: '#6b7280',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  inputHint: {
    fontSize: '0.75rem',
    color: '#6b7280',
    textAlign: 'center',
  },
};