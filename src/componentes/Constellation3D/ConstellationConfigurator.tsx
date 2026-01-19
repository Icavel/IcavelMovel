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
  Ruler,
  Loader2,
  MessageCircle
} from "lucide-react";
import "./ConstellationConfigurator.css";
import type { TruckModel } from '../TruckModelSelector/TruckModelSelector';
import Constellation360Viewer from "../Constellation3D/Constellation360Viewer";
import ChassisLengthSection from "../Shared/ChassisLengthSection";
import { generateProposalPDF, downloadPDF, safeDownloadPDF } from "../../services/pdfService";

interface ImageConfig {
  logoUrl: string;
  viewerIconUrl: string;
}

interface Props {
  selectedModel: TruckModel;
  onBack?: () => void;
  images?: ImageConfig;
}

interface Pintura {
  nome: string;
  colorCode: string;
  categoria: string;
}

interface Pacote {
  codigo: string;
  nome: string;
  icone: any;
  descricao: string[];
  beneficios: string[];
  selecionado: boolean;
  categoria: string;
  disponivel: boolean;
}

interface UserData {
  name: string;
  phone: string;
  acceptsMarketing: boolean;
}

const pacotesConstellation: Pacote[] = [
  {
    codigo: "ROB",
    nome: "Pacote Robust",
    icone: Shield,
    categoria: "robustez",
    descricao: [
      "Para-choque curto colorido com ângulo de ataque agressivo",
      "Interior com bancos em couro sintético",
      "Ar-condicionado de série",
      "Painel com funções básicas e prática operacional",
      "Suspensão reforçada para cargas pesadas",
      "Proteção extra do motor e transmissão"
    ],
    beneficios: [
      "Maior resistência para aplicações urbanas e rodoviárias",
      "Conforto básico e consistência operacional",
      "Maior durabilidade do acabamento interno",
      "Preparado para condições severas"
    ],
    selecionado: false,
    disponivel: true
  },
  {
    codigo: "HLI",
    nome: "Pacote Highline",
    icone: Zap,
    categoria: "premium",
    descricao: [
      "Painel de instrumentos 100% digital (tela de 10 polegadas)",
      "Central multimídia de 7 polegadas com espelhamento",
      "Funções avançadas de conectividade",
      "Mais comodidade e visibilidade para o motorista",
      "Sistema de som premium",
      "Navegação GPS integrada"
    ],
    beneficios: [
      "Tecnologia avançada embarcada",
      "Melhor experiência de uso no dia a dia",
      "Conectividade com smartphone",
      "Painel mais intuitivo com recursos adicionais",
      "Entretenimento em viagens longas"
    ],
    selecionado: false,
    disponivel: true
  },
  {
    codigo: "PRI",
    nome: "Pacote Prime",
    icone: Settings,
    categoria: "conforto",
    descricao: [
      "Volante multifuncional",
      "Banco do motorista premium com ajustes (incluindo lombar)",
      "Suporte para celular no console central",
      "Entradas USB e USB-C",
      "Iluminação ambiente personalizável",
      "Controles de climatização avançados"
    ],
    beneficios: [
      "Conforto superior para o condutor",
      "Ergonomia aprimorada",
      "Melhor organização de cabos e dispositivos",
      "Tecnologia de conectividade embarcada",
      "Ambiente mais agradável"
    ],
    selecionado: false,
    disponivel: true
  },
  {
    codigo: "OFF",
    nome: "Pacote Off-Road",
    icone: Truck,
    categoria: "offroad",
    descricao: [
      "Componentes para operação fora de estrada",
      "Para-choque reforçado e proteção extra",
      "Banco do motorista com cinto integrado",
      "Volante com funções adicionais para terreno difícil",
      "Pneus especiais para terreno irregular",
      "Sistema de tração auxiliar"
    ],
    beneficios: [
      "Maior capacidade de operação em terreno irregular",
      "Proteção adicional dos componentes externos",
      "Maior segurança em operações off-road",
      "Maior conforto em operações severas",
      "Capacidade de superar obstáculos"
    ],
    selecionado: false,
    disponivel: true
  }
];

const opcionaisPintura: Pintura[] = [
  { nome: "Bege Agata", colorCode: "#e9c793", categoria: "Standard" },
  { nome: "Laranja", colorCode: "#ff5e00ff", categoria: "Metálica" },
  { nome: "Azul Biscay", colorCode: "#0056b3", categoria: "Metálica" },
  { nome: "Vermelho", colorCode: "#c0392b", categoria: "Metálica" },
  { nome: "Amarelo Bem-te-vi", colorCode: "#FFDE21", categoria: "Metálica" },
  { nome: "Cinza MoonStone", colorCode: "#565f6b", categoria: "Metálica" },
  { nome: "Branco Geada", colorCode: "#ffffff", categoria: "Sólida" }
];
export default function ConstellationConfigurator({ 
  selectedModel, 
  onBack, 
  images = {
    logoUrl: 'https://example.com/default-logo.png', 
    viewerIconUrl: 'https://example.com/default-viewer-icon.png'
  }
}: Props) {

  const [currentStep, setCurrentStep] = useState<"chassis" | "cor" | "pacotes" | "resumo">("chassis");
  const [customColor, setCustomColor] = useState<string>('#0056b3');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [viewerMode, setViewerMode] = useState<"static" | "360">("360");
  const [chassisLength, setChassisLength] = useState<number>(5200);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [config, setConfig] = useState<{
    pintura: Pintura;
    pacotes: Pacote[];
  }>({
    pintura: opcionaisPintura[0],
    pacotes: pacotesConstellation.map(p => ({ ...p, selecionado: false }))
  });

  const isPackageAvailableForModel = (packageCode: string, modelId: string): boolean => {
    const modelSpecificRestrictions: Record<string, string[]> = {
      'constellation-14-210-4x2': ['HLI', 'PRI'], 
      'constellation-17-210-4x2-2': ['HLI', 'PRI'], 
      'constellation-18-210-4x2': [],
      'constellation-18-260-4x2': [],
      'constellation-18-320-4x2': [], 
      
    };

    const restrictedPackages = modelSpecificRestrictions[modelId] || [];
    return !restrictedPackages.includes(packageCode);
  };

  const handleSelectPintura = (pintura: Pintura) => {
    setConfig(prev => ({ ...prev, pintura }));
  };

  const handleTogglePacote = (codigo: string) => {
    const pacote = config.pacotes.find(p => p.codigo === codigo);
    if (!pacote || !pacote.disponivel) return;

    setConfig(prev => ({
      ...prev,
      pacotes: prev.pacotes.map(p =>
        p.codigo === codigo ? { ...p, selecionado: !p.selecionado } : p
      )
    }));
  };

  useEffect(() => {
    setConfig({
      pintura: opcionaisPintura[0],
      pacotes: pacotesConstellation.map(p => ({
        ...p,
        selecionado: false,
        disponivel: isPackageAvailableForModel(p.codigo, selectedModel.id)
      }))
    });

    if (selectedModel.chassisConfig && selectedModel.chassisConfig.lengths.length > 0) {
      setChassisLength(selectedModel.chassisConfig.lengths[0]);
    } else {
      setChassisLength(5200);
    }

    setCurrentStep("chassis");
  }, [selectedModel]);

  const handleChassisLengthChange = (length: number) => {
    if (selectedModel.chassisConfig && selectedModel.chassisConfig.lengths.includes(length)) {
      setChassisLength(length);
    } else {
      const defaultLength = selectedModel.chassisConfig?.lengths[0] || 5200;
      setChassisLength(defaultLength);
    }
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
      case "robustez":
        return Shield;
      case "offroad":
        return Truck;
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

  const getUserData = () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return {
          name: parsedData.name || '',
          phone: parsedData.phone || ''
        };
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  };

  const handleGenerateProposal = async () => {
    const userData = getUserData();

    if (!userData || !userData.name || !userData.phone) {
      alert('Dados do cliente não encontrados. Por favor, faça login novamente.');
      if (onBack) onBack();
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const truckData = {
        name: selectedModel.name,
        variant: selectedModel.variant,
        engine: selectedModel.engine,
        power: selectedModel.power,
        torque: selectedModel.torque,
        weight: selectedModel.weight,
        type: selectedModel.type,
      };

      const configuration = {
        chassisLength,
        paint: {
          nome: config.pintura.nome,
          colorCode: config.pintura.colorCode,
        },
        packages: config.pacotes
          .filter(p => p.selecionado)
          .map(p => ({
            codigo: p.codigo,
            nome: p.nome,
            categoria: p.categoria,
          })),
      };

      const pdfBlob = await generateProposalPDF(userData, truckData, configuration);
      const fileName = `Proposta_${selectedModel.name}_${userData.name.replace(/\s+/g, '_')}.pdf`;
      const downloadSuccess = await safeDownloadPDF(pdfBlob, fileName);

      if (!downloadSuccess) {
        const url = URL.createObjectURL(pdfBlob);
        alert(
          '📄 PDF gerado!\n\n' +
          'Para baixar manualmente:\n' +
          '1. Clique no link abaixo\n' +
          '2. Use "Salvar como" no menu do navegador\n\n' +
          `Link: ${url.substring(0, 50)}...`
        );

        window.open(url, '_blank');

        setTimeout(() => URL.revokeObjectURL(url), 30000);
      }

      const message = `Olá ${userData.name}! 🌟

Acabamos de gerar sua proposta para o *${selectedModel.name}* que você configurou!

📋 *Resumo da configuração:*
• Modelo: ${selectedModel.name}
• Cor: ${config.pintura.nome}
• Comprimento do chassi: ${(chassisLength / 1000).toFixed(1)}m
• Pacotes selecionados: ${config.pacotes.filter(p => p.selecionado).length}

📎 O PDF com todos os detalhes está disponível para download.

Agradecemos sua preferência! 🚚

*Equipe Icavel Caminhões & Ônibus*`;

      const encodedMessage = encodeURIComponent(message);
      const cleanPhone = userData.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);

    } catch (error) {
      console.error('Erro ao gerar proposta:', error);

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        alert(
          '⚠️ Dispositivo móvel detectado\n\n' +
          'Para melhor experiência:\n' +
          '1. Use o navegador Chrome\n' +
          '2. Permita pop-ups e downloads\n' +
          '3. Tente novamente\n\n' +
          'Se o problema persistir, entre em contato com nosso suporte.'
        );
      } else {
        alert('❌ Erro ao gerar proposta. Por favor, tente novamente.');
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const ColorPickerModal = () => (
    <div className="color-picker-modal-overlay" onClick={() => setShowColorPicker(false)}>
      <div className="color-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="color-picker-header">
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
          <div className="step-content">
            <ChassisLengthSection
              selectedLength={chassisLength}
              onLengthChange={handleChassisLengthChange}
              selectedTruckModel={{
                name: selectedModel.name,
                chassisConfig: selectedModel.chassisConfig
              }}
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
                {opcionaisPintura.map((p) => (
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
                Pacotes Opcionais - {selectedModel.name}
              </h3>
              <p className="section-subtitle">
                Selecione os pacotes para seu {selectedModel.name}.
                {config.pacotes.some(p => !p.disponivel) && " Alguns pacotes podem não estar disponíveis para este modelo."}
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
                      className={`pacote-card ${pacote.selecionado ? 'selected' : ''} ${!pacote.disponivel ? 'unavailable' : ''}`}
                      onClick={() => pacote.disponivel && handleTogglePacote(pacote.codigo)}
                    >
                      {!pacote.disponivel && (
                        <div className="unavailable-overlay">
                          <span>Indisponível para este modelo</span>
                        </div>
                      )}

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
                          <div className={`pacote-checkbox ${pacote.selecionado ? 'checked' : ''} ${!pacote.disponivel ? 'disabled' : ''}`}>
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
                Resumo da Configuração - {selectedModel.name}
              </h3>
              <p className="section-subtitle">
                Configuração final do seu {selectedModel.name}. Clique em "Gerar Proposta" para enviar por WhatsApp.
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

              <div className="proposal-actions">
                
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
           <h1 className="model-title-premium">CONSTELLATION</h1>
           <p className="model-subtitle">{selectedModel.name}</p>
            </div>

            <div className="viewer-toggle-container">
              
            </div>
          </header>

          <div className="vehicle-container">
            <div className="vehicle-viewer-wrapper" id="vehicle-viewer-wrapper">
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
              {currentStep === 'resumo' ? (
                <button
                  onClick={handleGenerateProposal}
                  disabled={isGeneratingPDF}
                  className="btn-primary btn-sm btn-generar-proposta"
                  style={{
                    backgroundColor: '#25D366',
                    minWidth: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isGeneratingPDF ? (
                    <>
                      <Loader2 className="spinner" size={16} />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={16} />
                      Gerar Proposta
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    const nextSteps: Record<string, string> = {
                      chassis: "cor",
                      cor: "pacotes",
                      pacotes: "resumo",
                      resumo: "chassis"
                    };
                    setCurrentStep(nextSteps[currentStep] as any);
                  }}
                  className="btn-primary btn-sm"
                >
                  {currentStep === 'pacotes' ? 'Ver Resumo' : 'Continuar'}
                  <ChevronRight size={16} className="btn-icon" />
                </button>
              )}

              
              <button
                onClick={() => {
                  setConfig({
                    pintura: opcionaisPintura[0],
                    pacotes: pacotesConstellation.map(p => ({
                      ...p,
                      selecionado: false,
                      disponivel: isPackageAvailableForModel(p.codigo, selectedModel.id)
                    }))
                  });
                  setCurrentStep("chassis");
                  const defaultLength = selectedModel.chassisConfig?.lengths[0] || 5200;
                  setChassisLength(defaultLength);
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