// src/components/Delivery/DeliveryConfigurator.tsx
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
  Settings,
  Shield,
  Zap,
  Ruler,
  MessageCircle,
  Loader2
} from "lucide-react";
import "./DeliveryPage.css";
import Delivery360Viewer from "./Delivery360Viewer";
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

const UPLOADTHING_IMAGES = {
  LOGO: "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr03T9lgKNcujJtS6L1nNTlORwF5girxpQAhDe4",
  TEXT_BRAND: "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0nskeXaZqjhFbPT5JVCkQ1myXAniRBrY3a2xc"
};

const deliveryModelsConfig = {
  "delivery-express": {
    name: "Delivery Express",
    chassisLengths: [3000, 3600],
    minLength: 3000,
    maxLength: 3600,
    step: 100,
    defaultLength: 3300
  },
  "delivery-6170": {
    name: "6.170",
    chassisLengths: [4000],
    minLength: 4000,
    maxLength: 4000,
    step: 100,
    defaultLength: 4000
  },
  "delivery-9180": {
    name: "9.180",
    chassisLengths: [3400, 4000, 4400, 4600],
    minLength: 3400,
    maxLength: 4600,
    step: 100,
    defaultLength: 4000
  },
  "delivery-11180": {
    name: "11.180",
    chassisLengths: [3400, 4000, 4400, 4600],
    minLength: 3400,
    maxLength: 4600,
    step: 100,
    defaultLength: 4000
  },
  "delivery-1180-4x4": {
    name: "11.80 4x4",
    chassisLengths: [4000],
    minLength: 4000,
    maxLength: 4000,
    step: 100,
    defaultLength: 4000
  },
  "delivery-14180": {
    name: "14.180",
    chassisLengths: [2955, 3305, 4400],
    minLength: 2955,
    maxLength: 4400,
    step: 100,
    defaultLength: 3305
  }
};

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
    selecionado: false,
    disponivel: true
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
    selecionado: false,
    disponivel: true
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
    selecionado: false,
    disponivel: true
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
    selecionado: false,
    disponivel: true
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
  const [currentStep, setCurrentStep] = useState<"chassis" | "cor" | "pacotes" | "resumo">("chassis");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [chassisLength, setChassisLength] = useState<number>(4000);

  const [config, setConfig] = useState<Config>({
    pintura: opcionais.pintura[0],
    pacotes: pacotesFechados.map(p => ({ ...p, selecionado: false })),
    chassisLength: 4000
  });

  const getModelConfig = () => {
    if (!selectedModel?.id) {
      return {
        lengths: [4000, 4500, 5000, 5500, 6000],
        minLength: 4000,
        maxLength: 6000,
        step: 100,
        defaultLength: 4500,
        isSingleOption: false
      };
    }

    const modelKey = selectedModel.id.toLowerCase();
    const modelConfig = deliveryModelsConfig[modelKey as keyof typeof deliveryModelsConfig];

    if (modelConfig) {
      return {
        lengths: modelConfig.chassisLengths,
        minLength: modelConfig.minLength,
        maxLength: modelConfig.maxLength,
        step: modelConfig.step,
        defaultLength: modelConfig.defaultLength,
        isSingleOption: modelConfig.chassisLengths.length === 1
      };
    }

    return {
      lengths: selectedModel?.chassisConfig?.lengths || [4000, 4500, 5000, 5500, 6000],
      minLength: selectedModel?.chassisConfig?.minLength || 4000,
      maxLength: selectedModel?.chassisConfig?.maxLength || 6000,
      step: selectedModel?.chassisConfig?.step || 100,
      defaultLength: selectedModel?.chassisConfig?.recommendedLength || 4500,
      isSingleOption: (selectedModel?.chassisConfig?.lengths?.length || 0) === 1
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
      case "segurança": return Shield;
      case "performance": return Zap;
      case "logística": return Package;
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
        name: selectedModel?.name || 'Delivery',
        variant: selectedModel?.variant || 'Baú Standard',
        engine: selectedModel?.engine || '',
        power: selectedModel?.power || '',
        torque: selectedModel?.torque || '',
        weight: selectedModel?.weight || '',
        type: selectedModel?.type || 'delivery',
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
      const fileName = `Proposta_${selectedModel?.name || 'Delivery'}_${userData.name.replace(/\s+/g, '_')}.pdf`;
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

Acabamos de gerar sua proposta para o *${selectedModel?.name || 'Delivery'}* que você configurou!

📋 *Resumo da configuração:*
• Modelo: ${selectedModel?.name || 'Delivery'}
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
                {selectedModel ? `Selecione o comprimento do chassi para seu ${selectedModel.name}.` : "Selecione o comprimento do chassi do seu Delivery."}
              </p>
            </div>

            <div className="step-content">
              <ChassisLengthSection
                selectedLength={chassisLength}
                onLengthChange={handleChassisLengthChange}
                selectedTruckModel={{
                  id: selectedModel?.id || '',
                  name: selectedModel?.name || 'Delivery',
                  variant: selectedModel?.variant || '',
                  chassisConfig: {
                    lengths: modelConfig.lengths,
                    labels: modelConfig.lengths.map(l => `${(l / 1000).toFixed(3).replace('.', ',')}m`),
                    minLength: modelConfig.minLength,
                    maxLength: modelConfig.maxLength,
                    step: modelConfig.step,
                    isSingleOption: modelConfig.isSingleOption
                  }
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
                Configuração final do seu {selectedModel?.name || 'Delivery'}. Clique em "Gerar Proposta" para enviar por WhatsApp.
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
                    <strong>{selectedModel?.name || 'Delivery'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Versão</span>
                    <strong>{selectedModel?.variant || 'Standard'}</strong>
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
    <div className="delivery-configurator">
      <div className="configurator-content">
        <div className="viewer-container">

          <header className="viewer-header">
  <div className="brand-section">
    <div className="brand-top" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <img 
        src={UPLOADTHING_IMAGES.LOGO} 
        alt="Volkswagen" 
        style={{
          width: '50px',  
          height: '60px',
          objectFit: 'contain',
          display: 'block'
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.style.display = 'none';
          document.querySelector('.brand-top')!.innerHTML += 
            '<div style="width: 80px; height: 80px; background: #1F4E79; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900;">VW</div>';
        }}
      />
      
      
      
      <img 
        src={UPLOADTHING_IMAGES.TEXT_BRAND} 
        alt="Caminhões e Ônibus" 
        style={{
          height: '40px', 
          width: 'auto',
          maxWidth: '500px', 
          objectFit: 'contain',
          display: 'block'
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.style.display = 'none';
          // Fallback simples
          document.querySelector('.brand-top')!.innerHTML += 
            '<span style="font-size: 1.4rem; font-weight: 600; color: #1F4E79; letter-spacing: 0.05em;">Caminhões e Ônibus</span>';
        }}
      />
    </div>
    
    <h1 className="model-title" style={{ marginTop: '0.5rem' }}>DELIVERY</h1>
    <p className="model-subtitle">
      {selectedModel ? selectedModel.name : 'Delivery 6.170'}
    </p>
  </div>
</header>

          <div className="vehicle-container">
            <div className="vehicle-viewer-wrapper">
              <Delivery360Viewer
                model={selectedModel?.name || "Delivery"}
                color={config.pintura.colorCode}
                chassisLength={chassisLength}
              />
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
                    pintura: opcionais.pintura[0],
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