// src/components/Shared/ChassisLengthSection.tsx
import { useState, useEffect, useMemo } from "react";
import { Ruler, Check, Info, Edit2, Truck, Loader, AlertCircle } from "lucide-react";
import "./ChassisLengthSection.css";
import { ChassisTruckModel } from '../../types/chassisTypes';

interface ChassisLengthSectionProps {
  selectedLength: number;
  onLengthChange: (length: number) => void;
  selectedTruckModel: ChassisTruckModel | null;
}

interface ChassisOption {
  length: number;
  label: string;
  type: string;
  applications: string[];
  image?: string;
}

const CHASSIS_STEP = 100;
const LOADING_DELAY = 300;
const METER_CONVERSION = 1000;

const fallbackConfigs = {
  "constellation": {
    lengths: [3200, 3600, 4200, 4800, 5400, 6000],
    labels: ["3.200m", "3.600m", "4.200m", "4.800m", "5.400m", "6.000m"],
    applications: {
      3200: ["Urbano", "Distribuição", "Baú"],
      3600: ["Regional", "Carga Seca", "Frigorífico"],
      4200: ["Longa distância", "Tanque", "Sider"],
      4800: ["Bitrem", "Especial", "Implementos"],
      5400: ["Rodotrem", "Carga Pesada", "Implementos"],
      6000: ["Extra Longo", "Especial", "Rodotrem"]
    }
  },
  "delivery": {
    lengths: [3000, 3100, 3200, 3300, 3400, 3500, 3600, 4000, 4400, 4600],
    labels: ["3.0m", "3.1m", "3.2m", "3.3m", "3.4m", "3.5m", "3.6m", "4.0m", "4.4m", "4.6m"],
    applications: {
      3000: ["Centros urbanos", "Entregas rápidas", "Manobrabilidade"],
      4000: ["Aplicação específica", "Custo-benefício", "Distribuição"],
      4400: ["Transporte regional", "Carga maior", "Rodovias"],
      4600: ["Longa distância", "Carga máxima", "Regional"]
    }
  },
  "meteor": {
    lengths: [4000, 4500, 5000, 5500, 6000],
    labels: ["4.0m", "4.5m", "5.0m", "5.5m", "6.0m"],
    applications: {
      4000: ["Urbano", "Coleta", "Delivery"],
      4500: ["Distribuição", "Baú", "Refrigerado"],
      5000: ["Carga Seca", "Granel", "Regional"],
      5500: ["Longa distância", "Tanque", "Especial"],
      6000: ["Extra Longo", "Implementos", "Rodotrem"]
    }
  }
};

const formatLength = (length: number, decimalPlaces: number = 3): string => {
  return (length / METER_CONVERSION).toFixed(decimalPlaces).replace('.', ',') + 'm';
};

const validateCustomLength = (length: number, min: number, max: number): boolean => {
  return !isNaN(length) && length >= min && length <= max;
};

const getChassisType = (modelName: string, length: number): string => {
  const model = modelName.toLowerCase();
  
  if (model.includes('delivery')) {
    if (model.includes('express')) return "Compacto Urbano";
    if (model.includes('6.170') || model.includes('11.80 4x4')) return "Configuração Única";
    if (model.includes('9.180') || model.includes('11.180')) {
      return length <= 4000 ? "Urbano" : "Regional";
    }
    if (model.includes('14.180')) {
      if (length === 2955) return "Urbano Compacto";
      if (length === 3305) return "Versátil";
      if (length === 4400) return "Capacidade Máxima";
    }
  } else if (model.includes('constellation')) {
    if (length < 4000) return "Compacto";
    if (length < 5000) return "Médio";
    if (length < 6000) return "Longo";
    return "Extra Longo";
  } else if (model.includes('meteor')) {
    if (length < 4500) return "Compacto";
    if (length < 5500) return "Médio";
    return "Longo";
  }
  
  if (length < 4000) return "Compacto";
  if (length < 5000) return "Curto";
  if (length < 6000) return "Médio";
  if (length < 7000) return "Longo";
  return "Extra Longo";
};

const getChassisApplications = (modelName: string, length: number): string[] => {
  const model = modelName.toLowerCase();
  const category = model.includes('delivery') ? 'delivery' : 
                   model.includes('constellation') ? 'constellation' : 
                   model.includes('meteor') ? 'meteor' : 'generic';
  
  const fallback = fallbackConfigs[category as keyof typeof fallbackConfigs];
  if (fallback && fallback.applications[length as keyof typeof fallback.applications]) {
    return fallback.applications[length as keyof typeof fallback.applications];
  }
  
  if (length < 4000) return ["Urbano", "Distribuição", "Baú"];
  if (length < 5000) return ["Regional", "Carga Seca", "Frigorífico"];
  if (length < 6000) return ["Longa distância", "Tanque", "Sider"];
  return ["Rodotrem", "Implementos", "Especial"];
};

const getAxleCount = (modelName: string, length: number): number => {
  const model = modelName.toLowerCase();
  
  if (model.includes('delivery')) {
    return 2; 
  } else if (model.includes('constellation')) {
    if (length < 4500) return 2;
    if (length < 6000) return 3;
    if (length < 7500) return 4;
    return 5;
  } else if (model.includes('meteor')) {
    if (length < 5000) return 2;
    if (length < 6500) return 3;
    return 4;
  }
  
  if (length < 4500) return 2;
  if (length < 6000) return 3;
  if (length < 7500) return 4;
  return 5;
};

export default function ChassisLengthSection({ 
  selectedLength, 
  onLengthChange,
  selectedTruckModel
}: ChassisLengthSectionProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLength, setCustomLength] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chassisOptions = useMemo(() => {
    if (!selectedTruckModel || !selectedTruckModel.chassisConfig) {
      console.warn('Modelo sem configuração de chassi:', selectedTruckModel?.name);
      return [];
    }

    const { chassisConfig } = selectedTruckModel;
    
    return chassisConfig.lengths.map((length, index) => {
      const label = chassisConfig.labels?.[index] || formatLength(length, 3);
      const image = chassisConfig.images?.[index] || '';
      
      return {
        length,
        label,
        type: getChassisType(selectedTruckModel.name, length),
        applications: getChassisApplications(selectedTruckModel.name, length),
        image
      };
    });
  }, [selectedTruckModel]);

  useEffect(() => {
    if (chassisOptions.length > 0 && selectedLength === 0) {
      const initialLength = chassisOptions[0].length;
      onLengthChange(initialLength);
    }
  }, [chassisOptions, selectedLength, onLengthChange]);

  const { min, max } = useMemo(() => {
    if (chassisOptions.length > 0) {
      const lengths = chassisOptions.map(opt => opt.length);
      return {
        min: Math.min(...lengths),
        max: Math.max(...lengths)
      };
    }
    return { min: 3000, max: 12000 };
  }, [chassisOptions]);

  const selectedOption = useMemo(() => {
    return chassisOptions.find(opt => opt.length === selectedLength);
  }, [chassisOptions, selectedLength]);

  const axleCount = useMemo(() => {
    if (!selectedTruckModel) return 0;
    return getAxleCount(selectedTruckModel.name, selectedLength);
  }, [selectedTruckModel, selectedLength]);

  const handleLengthChange = (length: number) => {
    setIsLoading(true);
    onLengthChange(length);
    
    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DELAY);
  };

  const handleCustomLength = () => {
    const length = parseFloat(customLength);
    if (validateCustomLength(length, min, max)) {
      const roundedLength = Math.round(length / CHASSIS_STEP) * CHASSIS_STEP;
      handleLengthChange(roundedLength);
      setShowCustomInput(false);
      setCustomLength("");
    }
  };

  const getPercentage = (length: number) => {
    if (max === min) return 50;
    return ((length - min) / (max - min)) * 100;
  };

  const isSingleOption = chassisOptions.length === 1;

  if (chassisOptions.length === 0) {
    return (
      <div className="chassis-container">
        <div className="chassis-header">
          <div className="model-badge">
            <Truck size={18} />
            <span>{selectedTruckModel?.name || "Modelo não selecionado"}</span>
          </div>
          <h2 className="chassis-main-title">Comprimento do Chassi</h2>
          <p className="chassis-subtitle">Configurações técnicas não disponíveis</p>
        </div>
        
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h4>Configuração em desenvolvimento</h4>
          <p>
            As especificações técnicas para <strong>{selectedTruckModel?.name}</strong> 
            estão sendo finalizadas. Entre em contato com nossa equipe para mais informações.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="chassis-container">
      <div className="chassis-header">
        <div className="model-badge">
          <Truck size={18} />
          <span>{selectedTruckModel?.name || "Modelo"}</span>
        </div>
        <h2 className="chassis-main-title">Comprimento do Chassi</h2>
        <p className="chassis-subtitle">Selecione a configuração ideal para sua aplicação</p>
      </div>

      {isSingleOption ? (
        <div className="single-option-card">
          <div className="single-option-content">
            <div className="single-option-badge">
              <Check size={24} />
              <span>Configuração Padrão</span>
            </div>
            <div className="single-option-display">
              <div className="single-option-length">
                {formatLength(chassisOptions[0].length, 3)}
              </div>
              <div className="single-option-label">{chassisOptions[0].label}</div>
            </div>
            <div className="single-option-info">
              <h4>Aplicações recomendadas:</h4>
              <div className="applications-tags">
                {chassisOptions[0].applications.map((app, idx) => (
                  <div key={idx} className="app-tag">
                    {app}
                  </div>
                ))}
              </div>
              <p className="single-option-note">
                Esta é a única configuração disponível para este modelo. 
                Clique em "Continuar" para prosseguir.
              </p>
            </div>
          </div>
        </div>
      ) : (
 
        <>
          <div className="quick-select-section">
            <div className="quick-select-grid">
              {chassisOptions.map((option) => (
                <button
                  key={option.length}
                  onClick={() => handleLengthChange(option.length)}
                  className={`quick-select-button ${selectedLength === option.length ? 'active' : ''}`}
                  disabled={isLoading}
                >
                  <div className="quick-select-label">{option.label}</div>
                  <div className="quick-select-type">{option.type}</div>
                  {selectedLength === option.length && (
                    <div className="check-icon">
                      <Check size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="info-header">
              <Info size={18} />
              <span className="info-title">Configuração selecionada</span>
            </div>
            
            {isLoading && (
              <div className="loading-indicator">
                <Loader size={16} className="spinner" />
                <span>Atualizando configuração...</span>
              </div>
            )}
            
            {!isLoading && selectedOption && (
              <div className="specs-display">
                <div className="specs-row">
                  <div className="spec-item">
                    <span className="spec-label">Comprimento</span>
                    <span className="spec-value">
                      {formatLength(selectedLength, 3)}
                      <span className="spec-value-secondary">({selectedLength.toLocaleString()}mm)</span>
                    </span>
                  </div>
                  <div className="spec-divider" />
                  <div className="spec-item">
                    <span className="spec-label">Configuração</span>
                    <span className="spec-value">{selectedOption.type}</span>
                  </div>
                  {axleCount > 0 && (
                    <>
                      <div className="spec-divider" />
                      <div className="spec-item">
                        <span className="spec-label">Eixos</span>
                        <span className="spec-value">{axleCount}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {chassisOptions.length > 1 && (
            <div className="slider-card">
              <div className="slider-header">
                <span className="slider-label">Ajuste fino do comprimento</span>
                <div className="slider-value">
                  {formatLength(selectedLength, 3)}
                  <span className="slider-value-mm">{selectedLength.toLocaleString()}mm</span>
                </div>
              </div>
              
              <div className="slider-track">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step="100"
                  value={selectedLength}
                  onChange={(e) => handleLengthChange(Number(e.target.value))}
                  className="slider-input"
                  disabled={isLoading}
                />
                <div 
                  className="slider-fill"
                  style={{ width: `${getPercentage(selectedLength)}%` }}
                />
              </div>
              
              <div className="slider-markers">
                {chassisOptions.map((option) => (
                  <button
                    key={option.length}
                    onClick={() => handleLengthChange(option.length)}
                    className={`marker-button ${selectedLength === option.length ? 'active' : ''}`}
                    disabled={isLoading}
                  >
                    <div className="marker-dot" />
                    <span className="marker-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedOption && (
            <div className="applications-card">
              <div className="applications-header">
                <Info size={18} />
                <span className="applications-title">Aplicações recomendadas</span>
              </div>
              <div className="applications-tags">
                {selectedOption.applications.map((app, idx) => (
                  <div key={idx} className="app-tag">
                    {app}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="custom-section">
            {!showCustomInput ? (
              <button 
                onClick={() => setShowCustomInput(true)}
                className="custom-button"
                disabled={isLoading}
              >
                <Edit2 size={18} />
                <span>Comprimento personalizado</span>
              </button>
            ) : (
              <div className="custom-input-card">
                <div className="custom-input-header">
                  <span className="custom-input-title">Comprimento personalizado</span>
                  <button 
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomLength("");
                    }}
                    className="close-button"
                    disabled={isLoading}
                  >
                    ✕
                  </button>
                </div>
                <div className="custom-input-wrapper">
                  <input
                    type="number"
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    placeholder={`Entre ${min.toLocaleString()} e ${max.toLocaleString()}`}
                    min={min}
                    max={max}
                    className="custom-input"
                    disabled={isLoading}
                  />
                  <span className="input-unit">mm</span>
                </div>
                <button 
                  onClick={handleCustomLength}
                  disabled={!customLength || isLoading}
                  className="apply-button"
                >
                  {isLoading ? "Aplicando..." : "Aplicar"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}