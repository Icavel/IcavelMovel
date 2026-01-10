// src/components/Constellation/ConstellationConfigurator.tsx
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Check,
  RotateCcw,
  Share2,
  FileText,
  Palette,
  Package,
  Truck,
  Shield,
  Settings,
  Zap,
  Gauge,
  Weight,
  Image as ImageIcon,
  Ruler
} from "lucide-react";
import "./ConstellationConfigurator.css";
import {
  modelOptionsMap,
  type ModelOptions
} from "../data/truckConfigData";

import type { TruckModel } from '../TruckModelSelector/TruckModelSelector';
import Constellation360Viewer from "../Constellation3D/Constellation360Viewer";
import ChassisLengthSection from "./ChassisLengthSection"; 
interface Props {
  selectedModel: TruckModel;
  onBack?: () => void;
}

interface Pintura {
  nome: string;
  colorCode: string;
  categoria: string;
}

interface Pacote {
  codigo: string;
  nome: string;
  descricao: string[];
  beneficios: string[];
  selecionado: boolean;
  categoria: string;
  disponivel: boolean;
  icone?: any;
}

export default function ConstellationConfigurator({ selectedModel }: Props) {
  const [currentStep, setCurrentStep] = useState<"chassis" | "cor" | "pacotes" | "resumo">("chassis");
  const [customColor, setCustomColor] = useState<string>('#0056b3');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [viewerMode, setViewerMode] = useState<"static" | "360">("360");
  const [chassisLength, setChassisLength] = useState<number>(5200);

  const getModelOptions = (modelId: string): ModelOptions => {
    return modelOptionsMap[modelId] || getDefaultModelOptions();
  };

  const getDefaultModelOptions = (): ModelOptions => ({
    pintura: [
      { nome: "Bege Agata", colorCode: "#e9c793", categoria: "Standard" },
      { nome: "Laranja", colorCode: "#ff5e00ff", categoria: "Metálica" },
      { nome: "Azul Biscay", colorCode: "#0056b3", categoria: "Metálica" },
      { nome: "Vermelho", colorCode: "#c0392b", categoria: "Metálica" },
      { nome: "Amarelo Bem-te-vi", colorCode: "#FFDE21", categoria: "Metálica" },
      { nome: "Cinza MoonStone", colorCode: "#565f6b", categoria: "Metálica" }
    ],
    pacotes: []
  });

  const getDefaultPintura = (): Pintura => ({
    nome: "Branco Polar",
    colorCode: "#ffffff",
    categoria: "Standard"
  });

  const modelOptions = getModelOptions(selectedModel.id);
  const pacotesComIcones: Pacote[] = modelOptions.pacotes.map(pacote => ({
    ...pacote,
    icone: getCategoriaIcon(pacote.categoria)
  }));

  const [config, setConfig] = useState<{
    pintura: Pintura;
    pacotes: Pacote[];
  }>({
    pintura: modelOptions.pintura[0] || getDefaultPintura(),
    pacotes: pacotesComIcones
  });

  useEffect(() => {
    const newModelOptions = getModelOptions(selectedModel.id);

    setConfig({
      pintura: newModelOptions.pintura[0] || getDefaultPintura(),
      pacotes: newModelOptions.pacotes.map(p => ({
        ...p,
        icone: getCategoriaIcon(p.categoria)
      }))
    });
    setCurrentStep("chassis");
    setChassisLength(5200); 
  }, [selectedModel]);

  const handleSelectPintura = (pintura: Pintura) => {
    setConfig(prev => ({ ...prev, pintura }));
  };

  const handleTogglePacote = (codigo: string) => {
    setConfig(prev => ({
      ...prev,
      pacotes: prev.pacotes.map(p =>
        p.codigo === codigo ? { ...p, selecionado: !p.selecionado } : p
      )
    }));
  };

  const handleChassisLengthChange = (length: number) => {
    setChassisLength(length);
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case "conforto":
        return Settings;
      case "segurança":
      case "seguranca":
        return Shield;
      case "tecnologia":
        return Zap;
      case "performance":
        return Truck;
      case "premium":
        return Zap;
      case "urbano":
        return Settings;
      default:
        return Package;
    }
  };

  const addCustomColor = (color: string) => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      const customColorOption: Pintura = {
        nome: `Personalizado (${color})`,
        colorCode: color,
        categoria: "Personalizada",
      };
      setConfig(prev => ({ ...prev, pintura: customColorOption }));
      setCustomColor(color);
      setShowColorPicker(false);
    }
  };

  const ColorPickerModal = () => (
    <div className="color-picker-modal-overlay" onClick={() => setShowColorPicker(false)}>
      <div className="color-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="color-picker-header">
          <h3></h3>
          <button onClick={() => setShowColorPicker(false)} className="close-btn">×</button>
        </div>
        <div className="color-picker-content">
          <div className="current-color-display">
            <div
              className="color-preview-large"
              style={{ backgroundColor: customColor }}
            />
            <span className="color-hex">{customColor}</span>
          </div>

          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="color-input-native"
          />

          <div className="color-input-manual">
            <label>Código HEX:</label>
            <div className="input-with-btn">
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value.toUpperCase())}
                placeholder="#000000"
                maxLength={7}
                className="hex-input"
              />
              <button
                onClick={() => addCustomColor(customColor)}
                className="apply-btn"
              >
                Aplicar
              </button>
            </div>
          </div>

          <div className="quick-colors">
            <h4>Cores Sugeridas</h4>
            <div className="quick-colors-grid">
              {[
                '#0056b3', '#1a5fb4', '#2c3e50', '#ffffff', '#c0392b',
                '#556B2F', '#E67E22', '#1a1a1a', '#7F8C8D', '#D4AF37'
              ].map(color => (
                <button
                  key={color}
                  className="quick-color-btn"
                  style={{ backgroundColor: color }}
                  onClick={() => setCustomColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="color-picker-footer">
          <button onClick={() => addCustomColor(customColor)} className="btn-primary">
            Usar esta Cor
          </button>
          <button onClick={() => setShowColorPicker(false)} className="btn-outline">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  const renderControls = () => {
    switch (currentStep) {
      case "chassis":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <Ruler size={20} className="section-icon" />
                Configuração do Chassi
              </h3>
              <p className="section-subtitle">
                Defina as dimensões do chassi para o seu {selectedModel.name}.
              </p>
            </div>

            <div className="step-content">
              <ChassisLengthSection 
                selectedLength={chassisLength}
                onLengthChange={handleChassisLengthChange}
              />
            </div>
          </div>
        );

      case "cor":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <Palette size={20} className="section-icon" />
                Personalização Exterior - {selectedModel.name}
              </h3>
              <p className="section-subtitle">Selecione a cor do seu {selectedModel.name}.</p>
            </div>

            <div className="step-content">
              <div className="color-header">
                <label className="color-label">Pintura e Acabamento</label>
                <span className="color-current">
                  Cor selecionada: <strong>{config.pintura.nome}</strong>
                </span>
              </div>
              <div className="color-grid">
                {modelOptions.pintura.map((p) => (
                  <button
                    key={p.nome}
                    onClick={() => handleSelectPintura(p)}
                    className="color-option"
                  >
                    <div
                      className={`color-swatch ${config.pintura.nome === p.nome ? 'selected' : ''}`}
                      style={{ backgroundColor: p.colorCode }}
                    >
                      {config.pintura.nome === p.nome && (
                        <Check className={`color-check ${p.colorCode === '#ffffff' ? 'text-black' : 'text-white'}`} size={20} />
                      )}
                    </div>
                    <div className="color-info">
                      <div className={`color-name ${config.pintura.nome === p.nome ? "color-name-selected" : ""}`}>
                        {p.nome}
                      </div>
                      <div className="color-category">{p.categoria}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowColorPicker(true)}
                  className="text-constellation-blue hover:text-blue-700 font-medium flex items-center gap-2 mx-auto"
                >
                </button>
              </div>
            </div>
          </div>
        );

      case "pacotes":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <Package size={20} className="section-icon" />
                Pacotes Opcionais
              </h3>
              <p className="section-subtitle">Selecione os pacotes para seu {selectedModel.name}.</p>
            </div>

            <div className="step-content">
              <div className="pacotes-grid">
                {config.pacotes.map((pacote) => {
                  const Icone = pacote.icone;
                  const CategoriaIcon = getCategoriaIcon(pacote.categoria);
                  return (
                    <div
                      key={pacote.codigo}
                      className={`pacote-card ${pacote.selecionado ? 'selected' : ''}`}
                      onClick={() => handleTogglePacote(pacote.codigo)}
                    >
                      <div className="pacote-header">
                        <div className="pacote-cabecalho">
                          <div className="pacote-icon-container">
                            <Icone size={20} className="pacote-icon" />
                          </div>
                          <div className="pacote-titulo-container">
                            <div className="pacote-codigo-badge">{pacote.codigo}</div>
                            <h4 className="pacote-nome">{pacote.nome}</h4>
                            <div className="pacote-categoria">
                              <CategoriaIcon size={12} />
                              <span>{pacote.categoria.charAt(0).toUpperCase() + pacote.categoria.slice(1)}</span>
                            </div>
                          </div>
                          <div className={`pacote-checkbox ${pacote.selecionado ? 'checked' : ''}`}>
                            {pacote.selecionado && <Check size={14} />}
                          </div>
                        </div>
                      </div>

                      <div className="pacote-conteudo">
                        <div className="pacote-descricao">
                          <h5 className="descricao-titulo">Especificações:</h5>
                          <ul className="descricao-lista">
                            {pacote.descricao.slice(0, 4).map((item, index) => (
                              <li key={index} className="descricao-item">
                                <Check size={10} className="item-check" />
                                <span>{item}</span>
                              </li>
                            ))}
                            {pacote.descricao.length > 4 && (
                              <li className="descricao-item mais-itens">
                                + {pacote.descricao.length - 4} itens adicionais
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="pacote-beneficios">
                          <h5 className="beneficios-titulo">Benefícios:</h5>
                          <div className="beneficios-tags">
                            {pacote.beneficios.map((beneficio, index) => (
                              <span key={index} className="beneficio-tag">
                                {beneficio}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "resumo":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <FileText size={20} className="section-icon" />
                Resumo da Configuração
              </h3>
              <p className="section-subtitle">
                Configuração final do seu {selectedModel.name}.
              </p>
            </div>

            <div className="summary-grid">
              <div className="summary-box">
                <div className="summary-box-header">
                  <Truck size={16} />
                  <span>Dados do Modelo</span>
                </div>
                <div className="summary-list">
                  <div className="summary-item">
                    <span>Modelo</span>
                    <strong>{selectedModel.name}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Versão</span>
                    <strong>{selectedModel.variant}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Motor</span>
                    <strong>{selectedModel.engine}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Comprimento do Chassi</span>
                    <strong>{(chassisLength / 1000).toFixed(1)}m</strong>
                  </div>
                </div>
              </div>

              <div className="summary-box summary-box-full">
                <div className="summary-box-header">
                  <Package size={16} />
                  <span>Pacotes Selecionados</span>
                </div>
                {config.pacotes.some(p => p.selecionado) ? (
                  <ul className="summary-package-list">
                    {config.pacotes
                      .filter(p => p.selecionado)
                      .map(p => (
                        <li key={p.codigo}>
                          <Check size={14} />
                          <div>
                            <strong>{p.nome}</strong>
                            <span>{p.codigo}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div className="summary-empty">
                    Configuração padrão de fábrica (sem opcionais).
                  </div>
                )}
              </div>

              <div className="summary-box">
                <div className="summary-box-header">
                  <Gauge size={16} />
                  <span>Especificações Técnicas</span>
                </div>
                <div className="summary-list">
                  <div className="summary-item">
                    <span>Potência</span>
                    <strong>{selectedModel.power}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Torque</span>
                    <strong>{selectedModel.torque}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Peso Bruto</span>
                    <strong>{selectedModel.weight}</strong>
                  </div>
                </div>
              </div>

              <div className="summary-disclaimer">
                <Shield size={18} />
                <p>
                  Esta ficha é apenas uma referência técnica. Para valores, prazos e
                  disponibilidade, consulte a concessionária.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="constellation-configurator">
      {showColorPicker && <ColorPickerModal />}

      <div className="configurator-content">
        <div className="viewer-container">
          <header className="viewer-header">
            <div className="brand-section">
              <div className="brand-top">
                <div className="vw-logo-small">W</div>
                <div className="separator"></div>
                <span className="brand-subtitle-small">Caminhões e Ônibus</span>
              </div>
              <h1 className="model-title">CONSTELLATION</h1>
              <p className="model-subtitle">{selectedModel.name}</p>
            </div>

            <div className="viewer-toggle-container">
              <button
                className={`viewer-toggle-btn ${viewerMode === "360" ? "active" : ""}`}
                onClick={() => setViewerMode("360")}
                title="Visualizador 360°"
              >
                <ImageIcon size={18} />
                <span>360°</span>
              </button>
            </div>
          </header>

          <div className="vehicle-container">
            <div className="vehicle-viewer-wrapper">
              <Constellation360Viewer
                color={config.pintura.nome}
                model={selectedModel.id}
              />
            </div>
          </div>

          <div className="current-model-info">
            <div className="current-model-card">
              <div className="model-specs-overview">
                <div className="spec-item">
                  <Zap size={14} />
                  <span>{selectedModel.power}</span>
                </div>
                <div className="spec-item">
                  <Gauge size={14} />
                  <span>{selectedModel.torque}</span>
                </div>
                <div className="spec-item">
                  <Weight size={14} />
                  <span>{selectedModel.weight}</span>
                </div>
                <div className="spec-item">
                  <Ruler size={14} />
                  <span>{(chassisLength / 1000).toFixed(1)}m</span>
                </div>
              </div>
              <div className="current-color-indicator">
                <div
                  className="color-preview-small"
                  style={{ backgroundColor: config.pintura.colorCode }}
                />
                <span>{config.pintura.nome}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="config-panel">
          <div className="tabs-container">
            {[
              { id: "chassis" as const, label: "01. Chassi", icon: Ruler },
              { id: "cor" as const, label: "02. Cor", icon: Palette },
              { id: "pacotes" as const, label: "03. Pacote", icon: Package },
              { id: "resumo" as const, label: "04. Resumo", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentStep(tab.id)}
                className={`tab-button ${currentStep === tab.id ? "active" : ""}`}
              >
                <div className="tab-content">
                  <tab.icon size={18} className="tab-icon" />
                  <span className="tab-label">{tab.label.split(". ")[1]}</span>
                </div>
                {currentStep === tab.id && <div className="tab-indicator"></div>}
              </button>
            ))}
          </div>

          <div className="config-content custom-scrollbar">
            {renderControls()}
          </div>

          <div className="config-footer">
            <div className="action-buttons action-buttons-sm">
              <button
                onClick={() => {
                  const nextSteps: Record<string, string> = {
                    chassis: "cor",
                    cor: "pacotes",
                    pacotes: "resumo",
                    resumo: "chassis"
                  };

                  if (currentStep === 'resumo') {
                    alert(`🚀 Proposta para ${selectedModel.name} gerada com sucesso!\n\nComprimento do chassi: ${(chassisLength / 1000).toFixed(1)}m\nUm consultor entrará em contato em até 24 horas.`);
                  } else {
                    setCurrentStep(nextSteps[currentStep] as any);
                  }
                }}
                className="btn-primary btn-sm"
              >
                {currentStep === 'resumo' ? 'Finalizar Proposta' : 'Continuar'}
                <ChevronRight size={16} className="btn-icon" />
              </button>

              <button className="btn-secondary btn-sm">
                <Share2 size={14} className="btn-icon" /> Compartilhar
              </button>
              <button
                onClick={() => {
                  const newModelOptions = getModelOptions(selectedModel.id);

                  setConfig({
                    pintura: newModelOptions.pintura[0] || getDefaultPintura(),
                    pacotes: newModelOptions.pacotes.map(p => ({
                      ...p,
                      icone: getCategoriaIcon(p.categoria)
                    }))
                  });
                  setCurrentStep("chassis");
                  setChassisLength(5200);
                }}
                className="btn-outline btn-sm"
              >
                <RotateCcw size={14} className="btn-icon" /> Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}