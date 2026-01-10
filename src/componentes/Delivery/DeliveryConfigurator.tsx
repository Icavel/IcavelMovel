// src/components/Delivery/DeliveryConfigurator.tsx
import { useState } from "react";
import { 
  ChevronRight, 
  Check, 
  RotateCcw, 
  Share2, 
  FileText, 
  Palette,
  Package,
  Truck,
  Settings,
  Shield,
  Zap
} from "lucide-react";
import "./DeliveryPage.css";
import Delivery360Viewer from "./Delivery360Viewer";

interface TruckModel {
  id: string;
  name: string;
  type: 'constellation' | 'meteor' | 'delivery';
  variant: string;
  specs: Array<{ label: string; value: string }>;
  features: string[];
  transmission: string;
  engine: string;
  power: string;
  torque: string;
  weight: string;
  imageUrl: string;
  isBestSeller?: boolean;
  salesRank?: number;
}

interface Props {
  selectedModel?: TruckModel;
  onBack?: () => void;
}

interface Config {
  pintura: Pintura;
  pacotes: Pacote[];
}

interface Pacote {
  codigo: string;
  nome: string;
  icone: any;
  descricao: string[];
  beneficios: string[];
  selecionado: boolean;
  categoria: string;
}

interface Pintura {
  nome: string;
  colorCode: string;
  categoria: string;
}

const pacotesFechados: Pacote[] = [
  {
    codigo: "PCO",
    nome: "Pacote Conforto",
    icone: Settings,
    categoria: "conforto",
    descricao: [
      "Ar-condicionado digital",
      "Sistema de som premium",
      "Assento ergonômico com ajuste lombar",
      "Vidros elétricos dianteiros",
      "Trava elétrica",
      "Direção hidráulica"
    ],
    beneficios: [
      "Conforto em longas jornadas",
      "Produtividade aumentada",
      "Redução da fadiga",
      "Climatização otimizada"
    ],
    selecionado: false
  },
  {
    codigo: "PSE",
    nome: "Pacote Segurança",
    icone: Shield,
    categoria: "segurança",
    descricao: [
      "ABS + EBD",
      "Controle de estabilidade",
      "Sensores de estacionamento",
      "Câmera de ré",
      "Alarme perimétrico",
      "GPS rastreador"
    ],
    beneficios: [
      "Proteção da carga e veículo",
      "Monitoramento 24h",
      "Redução de roubos",
      "Maior controle operacional"
    ],
    selecionado: false
  },
  {
    codigo: "PPE",
    nome: "Pacote Performance",
    icone: Zap,
    categoria: "performance",
    descricao: [
      "Motor turbo intercooler",
      "Transmissão sincronizada",
      "Suspensão reforçada",
      "Freios a disco ventilados",
      "Pneus radiais de alta durabilidade",
      "Tanque de combustível extra"
    ],
    beneficios: [
      "Melhor desempenho em subidas",
      "Economia de combustível",
      "Maior durabilidade",
      "Menor custo de manutenção"
    ],
    selecionado: false
  },
  {
    codigo: "PLO",
    nome: "Pacote Logístico",
    icone: Package,
    categoria: "logística",
    descricao: [
      "Empilhadeira integrada",
      "Rampa hidráulica",
      "Sistema de amarração",
      "Iluminação interna LED",
      "Divisórias modulares",
      "Piso antiderrapante"
    ],
    beneficios: [
      "Carga/descarga mais rápida",
      "Organização otimizada",
      "Versatilidade operacional",
      "Segurança da carga"
    ],
    selecionado: false
  }
];

const opcionais = {
  pintura: [
    { nome: "Azul Biscay", colorCode: "#0056b3", categoria: "Sólida" },
    { nome: "Branco Gelo", colorCode: "#ffffff", categoria: "Sólida" },
    { nome: "Cinza Moonstone", colorCode: "#565F6B", categoria: "Metálica" },
    { nome: "Vermelho Coca-Cola", colorCode: "#F40009", categoria: "Metálica" },
    { nome: "Verde Limão", colorCode: "#32CD32", categoria: "Metálica" },
    { nome: "Amarelo Bem-te-vi", colorCode: "#fdd835", categoria: "Sólida" },
    { nome: "Laranja Safety", colorCode: "#fb8c00", categoria: "Sólida" },
    { nome: "Prata Pyrit", colorCode: "#757575", categoria: "Metálica" },
    { nome: "Preto Universal", colorCode: "#212121", categoria: "Sólida" },
  ],
};

export default function DeliveryConfigurator({ selectedModel }: Props) {
  const [currentStep, setCurrentStep] = useState<"cor" | "pacotes" | "resumo">("cor");
  const [config, setConfig] = useState<Config>({
    pintura: opcionais.pintura[0],
    pacotes: pacotesFechados.map(p => ({ ...p, selecionado: false }))
  });

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

  const getCategoriaIcon = (categoria: string) => {
    switch(categoria) {
      case "conforto": return Settings;
      case "segurança": return Shield;
      case "performance": return Zap;
      case "logística": return Package;
      default: return Package;
    }
  };

  const renderControls = () => {
    switch (currentStep) {
      case "cor":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <Palette size={20} className="section-icon" />
                Personalização Exterior
              </h3>
              <p className="section-subtitle">
                {selectedModel ? `Selecione a cor do seu ${selectedModel.name}.` : "Selecione a cor do seu Delivery."}
              </p>
            </div>

            <div className="step-content">
              <div className="color-header">
                <label className="color-label">Pintura e Acabamento</label>
                <span className="color-current">
                  Cor selecionada: <strong>{config.pintura.nome}</strong>
                </span>
              </div>
              <div className="color-grid">
                {opcionais.pintura.map((p) => (
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
              <p className="section-subtitle">
                {selectedModel ? `Selecione os pacotes para seu ${selectedModel.name}.` : "Selecione os pacotes para seu Delivery."}
              </p>
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
                          <h5 className="descricao-titulo">Inclui:</h5>
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
                Visão geral técnica do seu {selectedModel?.name || 'Delivery'} configurado.
              </p>
            </div>

            <div className="summary-grid">
              <div className="summary-box">
                <div className="summary-box-header">
                  <Truck size={16} />
                  <span>Dados do Veículo</span>
                </div>

                <div className="summary-list">
                  <div className="summary-item">
                    <span>Modelo</span>
                    <strong>{selectedModel?.name || 'Delivery 9-170'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Versão</span>
                    <strong>{selectedModel?.variant || 'Baú 30m³'}</strong>
                  </div>
                  {selectedModel?.engine && (
                    <div className="summary-item">
                      <span>Motor</span>
                      <strong>{selectedModel.engine}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="summary-box">
                <div className="summary-box-header">
                  <Palette size={16} />
                  <span>Exterior</span>
                </div>

                <div className="summary-list">
                  <div className="summary-item">
                    <span>Acabamento</span>
                    <strong>{config.pintura.categoria}</strong>
                  </div>

                  <div className="summary-item color-item">
                    <span>Cor</span>
                    <div className="color-inline">
                      <div
                        className="color-dot-sm"
                        style={{ backgroundColor: config.pintura.colorCode }}
                      />
                      <strong>{config.pintura.nome}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="summary-box summary-box-full">
                <div className="summary-box-header">
                  <Package size={16} />
                  <span>Pacotes Incluídos</span>
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

              {selectedModel && (
                <div className="summary-box">
                  <div className="summary-box-header">
                    <Zap size={16} />
                    <span>Especificações Técnicas</span>
                  </div>
                  <div className="summary-list">
                    {selectedModel.power && (
                      <div className="summary-item">
                        <span>Potência</span>
                        <strong>{selectedModel.power}</strong>
                      </div>
                    )}
                    {selectedModel.torque && (
                      <div className="summary-item">
                        <span>Torque</span>
                        <strong>{selectedModel.torque}</strong>
                      </div>
                    )}
                    {selectedModel.weight && (
                      <div className="summary-item">
                        <span>Peso Bruto</span>
                        <strong>{selectedModel.weight}</strong>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
    <div className="delivery-configurator">

      
      <div className="configurator-content">
        <div className="viewer-container">
          <div className="vehicle-container">
            <div className="vehicle-viewer-wrapper">
              <Delivery360Viewer 
                model={selectedModel?.name || "Delivery"} 
                color={config.pintura.colorCode}
              />
            </div>
          </div>
        </div>

        <div className="config-panel">
          <div className="tabs-container">
            {[
              { id: "cor" as const, label: "01. Cor", icon: Palette },
              { id: "pacotes" as const, label: "02. Pacotes", icon: Package },
              { id: "resumo" as const, label: "03. Resumo", icon: FileText },
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
                  const nextSteps: Record<typeof currentStep, typeof currentStep | null> = {
                    cor: "pacotes",
                    pacotes: "resumo",
                    resumo: null
                  };

                  if (currentStep === 'resumo') {
                    const modelName = selectedModel?.name || 'Delivery';
                    alert(`🚚 Proposta para ${modelName} gerada com sucesso!\n\nUm consultor entrará em contato em até 24 horas.`);
                  } else {
                    const nextStep = nextSteps[currentStep];
                    if (nextStep) setCurrentStep(nextStep);
                  }
                }}
                className="btn-primary btn-sm"
              >
                {currentStep === 'resumo' ? 'Finalizar' : 'Continuar'}
                <ChevronRight size={16} className="btn-icon" />
              </button>

              <button className="btn-secondary btn-sm">
                <Share2 size={14} className="btn-icon" /> Compartilhar
              </button>
              <button
                onClick={() => {
                  setConfig({
                    pintura: opcionais.pintura[0],
                    pacotes: pacotesFechados.map(p => ({ ...p, selecionado: false }))
                  });
                  setCurrentStep("cor");
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