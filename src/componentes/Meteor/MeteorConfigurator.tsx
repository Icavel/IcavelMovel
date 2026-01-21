// src/components/Meteor/MeteorConfigurator.tsx
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Check,
  RotateCcw,
  Share2,
  FileText,
  Palette,
  Package,
  Shield,
  Settings,
  Zap,
  Truck,
  Ruler,
  MessageCircle,
  Loader2
} from "lucide-react";
import "./MeteorConfigurator.css";
import Meteor360Viewer from "../../../Meteor360Viewer";
import ChassisLengthSection from "../Shared/ChassisLengthSection";
import { generateProposalPDF, safeDownloadPDF } from "../../services/pdfService";

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
  chassisConfig?: {
    lengths: number[];
    minLength?: number;
    maxLength?: number;
    step?: number;
    unit?: string;
    recommendedLength?: number;
  };
}

interface Props {
  selectedModel?: TruckModel;
  onBack?: () => void;
}

interface Config {
  pintura: Pintura;
  pacotes: Pacote[];
  chassisLength?: number;
}

interface Pacote {
  codigo: string;
  nome: string;
  icone: any;
  descricao: string[];
  beneficios: string[];
  selecionado: boolean;
  categoria: string;
  disponivel?: boolean;
}

interface Pintura {
  nome: string;
  colorCode: string;
  categoria: string;
}

interface UserData {
  name: string;
  phone: string;
  acceptsMarketing: boolean;
}

const meteorModelsConfig = {
  "meteor-29-530": {
    name: "Meteor 29.530 6x4",
    chassisLengths: [3200, 3400, 3600],
    minLength: 3200,
    maxLength: 3600,
    step: 200,
    defaultLength: 3400
  },
  "meteor-26-430": {
    name: "Meteor 26.430 6x2",
    chassisLengths: [3200, 3400, 3600],
    minLength: 3200,
    maxLength: 3600,
    step: 200,
    defaultLength: 3400
  },
  "meteor-33-540": {
    name: "Meteor 33.540 8x4",
    chassisLengths: [3200, 3400, 3600, 3800],
    minLength: 3200,
    maxLength: 3800,
    step: 200,
    defaultLength: 3600
  }
};

const pacotesFechados: Pacote[] = [
  {
    codigo: "PCO",
    nome: "Pacote Conforto",
    icone: Settings,
    categoria: "conforto",
    descricao: [
      "Preparação para tomada de força na transmissão",
      "Bomba hidráulica/hidráulica/eletrica",
      "Banco na cabine lado esquerdo com apoio lombar",
      "Porta-copos com 2 unidades",
      "Cortinas com fixação",
      "Extintor de incêndio 2kg",
      "Buzina eletropneumática",
      "Carregamento sem fio",
      "Predictive Cruise Control",
      "Conectividade RIO Box",
      "Revestimento dos bancos em vinil"
    ],
    beneficios: [
      "Maior conforto em longas viagens",
      "Produtividade aumentada",
      "Segurança adicional",
      "Tecnologia de ponta"
    ],
    selecionado: false,
    disponivel: true
  },
  {
    codigo: "PHL",
    nome: "Pacote Highline",
    icone: Zap,
    categoria: "premium",
    descricao: [
      "Todas as características do Pacote Conforto",
      "Geladeira integrada",
      "Sistema de retenção para carga",
      "Porta bagagem painel traseiro",
      "Controle elétrico ao lado da cama",
      "Iluminação inteligente"
    ],
    beneficios: [
      "Conforto máximo para o motorista",
      "Armazenamento otimizado",
      "Organização superior do espaço",
      "Tecnologia avançada"
    ],
    selecionado: false,
    disponivel: true
  },
  {
    codigo: "PRE",
    nome: "Pacote Retarder + Eixo 3,40:1",
    icone: Truck,
    categoria: "performance",
    descricao: [
      "Retarder integrado",
      "Relação de transmissão do eixo traseiro 3,40:1",
      "Frenagem auxiliar eficiente",
      "Maior durabilidade dos freios principais"
    ],
    beneficios: [
      "Segurança em descidas",
      "Economia de pastilhas e discos",
      "Performance otimizada em rodovias",
      "Conforto na frenagem"
    ],
    selecionado: false,
    disponivel: true
  },
  {
    codigo: "PUC",
    nome: "Unidade de Comando Central",
    icone: Shield,
    categoria: "tecnologia",
    descricao: [
      "Sistema de retenção para carga avançado",
      "Controle elétrico multifuncional",
      "Gerenciamento de iluminação",
      "Portas USB integradas",
      "Sistema de armazenamento inteligente"
    ],
    beneficios: [
      "Controle centralizado",
      "Segurança da carga",
      "Conectividade total",
      "Organização inteligente"
    ],
    selecionado: false,
    disponivel: true
  }
];

const opcionais = {
  pintura: [
    { nome: "Prata Pyrit", colorCode: "#c0c0c0", categoria: "Metálica" },
    { nome: "Azul Biscay", colorCode: "#29406d", categoria: "Especial" },
    { nome: "Vermelho Rubi", colorCode: "#9B111E", categoria: "Metálica" },
    { nome: "Preto Universal", colorCode: "#1a1a1a", categoria: "Sólida" },
    { nome: "Branco Gelo", colorCode: "#ffffff", categoria: "Sólida" },
    { nome: "Bege Agata", colorCode: "#e4c18b", categoria: "Metálica" },
    { nome: "Verde Turquesa", colorCode: "#40E0D0", categoria: "Metálica" },
    { nome: "Amarelo Bem-te-vi", colorCode: "#FFFF00", categoria: "Sólida" },
    { nome: "Cinza Moonstone", colorCode: "#B6B9AE", categoria: "Sólida" },
    { nome: "Azul Unique", colorCode: "#3C5C87", categoria: "Perolizada" },
  ],
};

export default function MeteorConfigurator({ selectedModel }: Props) {
  const [currentStep, setCurrentStep] = useState<"chassis" | "exterior" | "pacotes" | "summary">("chassis");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [chassisLength, setChassisLength] = useState<number>(3400);

  const [config, setConfig] = useState<Config>({
    pintura: opcionais.pintura[4],
    pacotes: pacotesFechados.map(p => ({ ...p, selecionado: false })),
    chassisLength: 3400
  });

  const getModelConfig = () => {
    if (!selectedModel?.id) {
      return {
        lengths: [3200, 3400, 3600],
        minLength: 3200,
        maxLength: 3600,
        step: 200,
        defaultLength: 3400
      };
    }

    const modelKey = selectedModel.id.toLowerCase();
    const modelConfig = meteorModelsConfig[modelKey as keyof typeof meteorModelsConfig];

    if (modelConfig) {
      return {
        lengths: modelConfig.chassisLengths,
        minLength: modelConfig.minLength,
        maxLength: modelConfig.maxLength,
        step: modelConfig.step,
        defaultLength: modelConfig.defaultLength
      };
    }

    return {
      lengths: selectedModel?.chassisConfig?.lengths || [3200, 3400, 3600],
      minLength: selectedModel?.chassisConfig?.minLength || 3200,
      maxLength: selectedModel?.chassisConfig?.maxLength || 3600,
      step: selectedModel?.chassisConfig?.step || 200,
      defaultLength: selectedModel?.chassisConfig?.recommendedLength || 3400
    };
  };

  useEffect(() => {
    const modelConfig = getModelConfig();
    const defaultLength = modelConfig.defaultLength || modelConfig.lengths[0];

    setChassisLength(defaultLength);
    setConfig(prev => ({
      ...prev,
      chassisLength: defaultLength
    }));
  }, [selectedModel]);

  const handleSelectPintura = (pintura: Pintura) => {
    setConfig(prev => ({ ...prev, pintura }));
  };

  const handleTogglePacote = (codigo: string) => {
    const pacote = config.pacotes.find(p => p.codigo === codigo);
    if (!pacote || (pacote.disponivel === false)) return;

    setConfig(prev => ({
      ...prev,
      pacotes: prev.pacotes.map(p =>
        p.codigo === codigo ? { ...p, selecionado: !p.selecionado } : p
      )
    }));
  };

  const handleChassisLengthChange = (length: number) => {
    const modelConfig = getModelConfig();

    if (length >= modelConfig.minLength && length <= modelConfig.maxLength) {
      setChassisLength(length);
      setConfig(prev => ({ ...prev, chassisLength: length }));
    } else {
      const clampedLength = Math.max(modelConfig.minLength, Math.min(modelConfig.maxLength, length));
      setChassisLength(clampedLength);
      setConfig(prev => ({ ...prev, chassisLength: clampedLength }));
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "conforto": return Settings;
      case "premium": return Zap;
      case "performance": return Truck;
      case "tecnologia": return Shield;
      default: return Package;
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
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const modelConfig = getModelConfig();

      const truckData = {
        name: selectedModel?.name || 'Meteor',
        variant: selectedModel?.variant || 'Extra Heavy Duty',
        engine: selectedModel?.engine || '',
        power: selectedModel?.power || '',
        torque: selectedModel?.torque || '',
        weight: selectedModel?.weight || '',
        type: selectedModel?.type || 'meteor',
      };

      const configuration = {
        chassisLength: config.chassisLength || modelConfig.defaultLength,
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
      const fileName = `Proposta_${selectedModel?.name || 'Meteor'}_${userData.name.replace(/\s+/g, '_')}.pdf`;
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

Acabamos de gerar sua proposta para o *${selectedModel?.name || 'Meteor'}* que você configurou!

📋 *Resumo da configuração:*
• Modelo: ${selectedModel?.name || 'Meteor'}
• Cor: ${config.pintura.nome}
• Comprimento do chassi: ${(chassisLength / 1000).toFixed(3)}m
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

  const renderControls = () => {
    const modelConfig = getModelConfig();

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
                {selectedModel ? `Selecione o comprimento do chassi para seu ${selectedModel.name}.` : "Selecione o comprimento do chassi do seu Meteor."}
              </p>
            </div>

            <div className="step-content">
              <ChassisLengthSection
                selectedLength={chassisLength}
                onLengthChange={handleChassisLengthChange}
                selectedTruckModel={{
                  id: selectedModel?.id || '',
                  name: selectedModel?.name || 'Meteor',
                  chassisConfig: {
                    lengths: modelConfig.lengths,
                    labels: modelConfig.lengths.map(l => `${(l / 1000).toFixed(3).replace('.', ',')}m`)
                  }
                }}
              />
            </div>
          </div>
        );

      case "exterior":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <Palette size={20} className="section-icon" />
                Personalização Exterior
              </h3>
              <p className="section-subtitle">
                {selectedModel ? `Selecione a cor do seu ${selectedModel.name}.` : "Selecione a cor do seu Meteor."}
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
                {selectedModel ? `Selecione os pacotes para seu ${selectedModel.name}.` : "Selecione os pacotes para seu Meteor."}
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
                      className={`pacote-card ${pacote.selecionado ? 'selected' : ''} ${pacote.disponivel === false ? 'unavailable' : ''}`}
                      onClick={() => pacote.disponivel !== false && handleTogglePacote(pacote.codigo)}
                    >
                      {pacote.disponivel === false && (
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
                          <div className={`pacote-checkbox ${pacote.selecionado ? 'checked' : ''} ${pacote.disponivel === false ? 'disabled' : ''}`}>
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

      case "summary":
        return (
          <div className="step-container">
            <div className="section-header">
              <h3 className="section-title">
                <FileText size={20} className="section-icon" />
                Resumo da Configuração
              </h3>
              <p className="section-subtitle">
                Configuração final do seu {selectedModel?.name || 'Meteor'}. Clique em "Gerar Proposta" para enviar por WhatsApp.
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
                    <strong>{selectedModel?.name || 'Meteor 29.530 6x4'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Versão</span>
                    <strong>{selectedModel?.variant || 'Extra Heavy Duty'}</strong>
                  </div>
                  {selectedModel?.engine && (
                    <div className="summary-item">
                      <span>Motor</span>
                      <strong>{selectedModel.engine}</strong>
                    </div>
                  )}
                  <div className="summary-item">
                    <span>Comprimento do Chassi</span>
                    <strong>{(chassisLength / 1000).toFixed(3)}m</strong>
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

  const modelConfig = getModelConfig();

  return (
    <div className="meteor-configurator">
      <div className="configurator-content">
        <div className="viewer-container">
          <header className="viewer-header">
            <div className="brand-section">
              <div className="brand-top">
                <div className="vw-logo-small">W</div>
                <div className="separator"></div>
                <span className="brand-subtitle-small">Caminhões e Ônibus</span>
              </div>
              <h1 className="model-title">METEOR</h1>
              <p className="model-subtitle">
                {selectedModel ? selectedModel.name : 'Extra Heavy Duty Line'}
              </p>
            </div>
          </header>

          <div className="vehicle-container">
            <div className="vehicle-viewer-wrapper">
              <Meteor360Viewer 
                scale={1.5} 
                color={config.pintura.nome}
                chassisLength={chassisLength}
              />
            </div>
          </div>
        </div>

        <div className="config-panel">
          <div className="tabs-container">
            {[
              { id: "chassis" as const, label: "01. Chassi", icon: Ruler },
              { id: "exterior" as const, label: "02. Cor", icon: Palette },
              { id: "pacotes" as const, label: "03. Pacotes", icon: Package },
              { id: "summary" as const, label: "04. Resumo", icon: FileText },
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
              {currentStep === 'summary' ? (
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
                      chassis: "exterior",
                      exterior: "pacotes",
                      pacotes: "summary",
                      summary: "chassis"
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
                    pintura: opcionais.pintura[4],
                    pacotes: pacotesFechados.map(p => ({ ...p, selecionado: false })),
                    chassisLength: modelConfig.defaultLength
                  });
                  setCurrentStep("chassis");
                  setChassisLength(modelConfig.defaultLength);
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