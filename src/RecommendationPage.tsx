import React, { useState } from 'react';
import { ChevronLeft, Truck, Check, ArrowRight, Gauge, Weight, Settings, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RecommendationPage.css';

interface Question {
  id: string;
  text: string;
  type: 'radio' | 'range' | 'select' | 'multi' | 'manual-input';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface TruckRecommendation {
  id: string;
  name: string;
  series: string;
  description: string;
  engine: string;
  power: string;
  capacity: string;
  features: string[];
  imageUrl: string;
  transmission: string;
  weight: string;
  variant: string;
}

const RecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [recommendation, setRecommendation] = useState<TruckRecommendation | null>(null);
  const [inputValue, setInputValue] = useState<string>('1000');

  const questions: Question[] = [
    {
      id: 'monthlyKm',
      text: 'Quantos quilômetros você dirige por mês?',
      type: 'manual-input',
      min: 1000,
      max: 50000,
      step: 100,
      unit: 'km'
    },
    {
      id: 'cargoType',
      text: 'Que tipo de carga você transporta?',
      type: 'select',
      options: ['Grãos/Cereais', 'Carga Seca', 'Líquidos/Tanque', 'Carga Viva', 'Contêineres', 'Materiais de Construção', 'Produtos Alimentícios', 'Distribuição Urbana', 'Outros']
    },
    {
      id: 'cargoWeight',
      text: 'Qual o peso médio da sua carga?',
      type: 'range',
      min: 1,
      max: 75,
      step: 1,
      unit: 'toneladas'
    },
    {
      id: 'profile',
      text: 'Você é:',
      type: 'radio',
      options: ['Autônomo (Proprietário)', 'Responsável por frota', 'Transportador contratado', 'Empresa própria']
    },
    {
      id: 'terrain',
      text: 'Em que tipo de terreno você mais roda?',
      type: 'radio',
      options: ['Rodovias (asfalto)', 'Estradas rurais', 'Cidade/Urbano', 'Misto (cidade e estrada)', 'Terreno acidentado/Off-road']
    },
    {
      id: 'features',
      text: 'Quais características são importantes para você?',
      type: 'multi',
      options: ['Economia de combustível', 'Conforto na cabine', 'Potência do motor', 'Baixa manutenção', 'Tecnologia embarcada', 'Segurança', 'Capacidade de carga', 'Tração 4x4', 'Automação']
    }
  ];

  const truckModels: TruckRecommendation[] = [
    {
      id: 'delivery-express',
      name: 'Delivery Express',
      series: '4x2',
      description: 'Ideal para entregas urbanas e distribuição de mercadorias leves',
      engine: 'F1C 3.0L',
      power: '156 cv',
      capacity: 'Até 3.500 kg',
      features: ['Programa eletrônico de estabilização (ESP)', 'Airbag duplo', 'Faróis com DRL LED', 'Computador de bordo'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ePk8lqCEbxGi5NQcAgOoz90UWutYymLdphqX',
      transmission: 'Manual 6 velocidades',
      weight: '3.500 kg',
      variant: '4x2'
    },
    {
      id: 'delivery-6-170',
      name: 'Delivery 6.170',
      series: '4x2',
      description: 'Perfeito para distribuição urbana e entregas de médio porte',
      engine: 'F1C 3.0L',
      power: '156 cv',
      capacity: 'Até 5.850 kg',
      features: ['Suspensão pneumática do motorista', 'Tacógrafo eletrônico', 'Tomadas 12V', 'Assistente de partida em rampa'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0fD9j1qS8dNBEODjo52CpMcs0WRQFlmkGPrt7',
      transmission: 'Manual 6 velocidades',
      weight: '5.850 kg',
      variant: '4x2'
    },
    {
      id: 'delivery-express-9-180',
      name: 'Delivery Express 9.180',
      series: '4x2',
      description: 'Para transporte urbano e regional de cargas médias',
      engine: 'Cummins ISF 3.8L',
      power: '175 cv',
      capacity: 'Até 9.200 kg',
      features: ['ESP com ABS + EBD', 'Transmissão automatizada', 'Cluster digital', 'LED diurno'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06EBv3nUySarjJxgwdi6tRWoLNCunz7hEPy5X',
      transmission: 'Automatizada/Manual 6 marchas',
      weight: '9.200 kg',
      variant: '4x2'
    },
    {
      id: 'delivery-11-180',
      name: 'Delivery 11.180',
      series: '4x2',
      description: 'Versátil para distribuição e transporte regional',
      engine: 'MWM 4.12 TCE 4.8L',
      power: '175 cv',
      capacity: 'Até 10.800 kg',
      features: ['Painel 100% digital 10"', 'Central multimídia 7"', 'Bancos premium', 'Controle de estabilidade'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0kwrktDQIKn0CQqhr7l92dotMaSPiW5byLcpR',
      transmission: 'Manual 6 velocidades',
      weight: '10.800 kg',
      variant: '4x2'
    },
    {
      id: 'delivery-11-1804x4',
      name: 'Delivery 11.180 4x4',
      series: '4x4',
      description: 'Para terrenos difíceis e acesso a locais remotos',
      engine: 'Cummins ISF 3.8L',
      power: '175 cv',
      capacity: 'Até 10.800 kg',
      features: ['Tração 4x4', 'Bloqueio diferencial', 'ESP completo', 'Preparado para off-road'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IeRlcF52vLeKVUf0JkMdWSb6n8psEYyOBH7R',
      transmission: 'Manual 6 velocidades',
      weight: '10.800 kg',
      variant: '4x4'
    },
    {
      id: 'delivery-14-180',
      name: 'Delivery 14.180',
      series: '6x2',
      description: 'Para distribuição urbana com maior capacidade',
      engine: 'Cummins ISF 3.8L',
      power: '175 cv',
      capacity: 'Até 14.000 kg',
      features: ['Ar-condicionado', 'Rádio Bluetooth', 'Suspensão pneumática', 'Lanternas LED'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0UxbSsCOBPWOC41hMj5dRwYcy7HAZL98apmGg',
      transmission: 'Manual 6 velocidades',
      weight: '14.000 kg',
      variant: '6x2'
    },
    {
      id: 'constellation-14-210-4x2',
      name: 'Constellation 14.210',
      series: '4x2',
      description: 'Ideal para transporte regional de cargas secas e grãos',
      engine: 'MAN D0834LF08',
      power: '205 cv',
      capacity: 'Até 14.500 kg',
      features: ['Cabine Standard', 'Ar condicionado', 'Direção hidráulica', 'Econômico'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IqzjTM52vLeKVUf0JkMdWSb6n8psEYyOBH7R',
      transmission: 'Manual 6 velocidades',
      weight: '14.500 kg',
      variant: '4x2'
    },
    {
      id: 'constellation-17-210-4x2-2',
      name: 'Constellation 17.210',
      series: '4x2',
      description: 'Para transporte intermunicipal de carga média',
      engine: 'MAN D0834LF08',
      power: '205 cv',
      capacity: 'Até 16.000 kg',
      features: ['Robusto', 'Baixa manutenção', 'Boa dirigibilidade', 'Confortável'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr097GilQOveFS8kwitsCaZn02EN6hB7IAdWGbY',
      transmission: 'Manual 6 velocidades',
      weight: '16.000 kg',
      variant: '4x2'
    },
    {
      id: 'constellation-18-210-4x2',
      name: 'Constellation 18.210',
      series: '4x2',
      description: 'Versátil para diversos tipos de carga regional',
      engine: 'MAN D0834LF08',
      power: '205 cv',
      capacity: 'Até 16.000 kg',
      features: ['Cabine Estendida', 'ABS', 'Controle de Tração', 'Versátil'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZmrmLOPmOr0ft81hy9vdqW5DlbXnFYAw2K3N',
      transmission: 'Manual/Automática 8v',
      weight: '16.000 kg',
      variant: '4x2'
    },
    {
      id: 'constellation-18-260',
      name: 'Constellation 18.260',
      series: '4x2',
      description: 'Para rotas regionais com maior exigência',
      engine: 'MAN D0836LF18',
      power: '260 cv',
      capacity: 'Até 16.000 kg',
      features: ['Cabine Leito', 'Airbag', 'Controle de Estabilidade', 'Conforto'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IqzjTM52vLeKVUf0JkMdWSb6n8psEYyOBH7R',
      transmission: 'Automatizada 12 velocidades',
      weight: '16.000 kg',
      variant: '4x2'
    },
    {
      id: 'constellation-26-260-4x2',
      name: 'Constellation 26.260',
      series: '6x2',
      description: 'Para transporte de carga pesada em rodovias',
      engine: 'MAN D0836LF18',
      power: '260 cv',
      capacity: 'Até 23.000 kg',
      features: ['Mais capacidade', 'Estabilidade', 'Conforto', 'Segurança'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0y1EJebDSwAKxFhk9eiYJvqRu1LOf3TZtnjdI',
      transmission: 'Manual',
      weight: '23.000 kg',
      variant: '6x2'
    },
    {
      id: 'constellation-27-260-6x4',
      name: 'Constellation 27.260',
      series: '6x4',
      description: 'Ideal para construção civil e terrenos difíceis',
      engine: 'MAN D0836LF18',
      power: '260 cv',
      capacity: 'Até 23.000 kg',
      features: ['Tração 6x4', 'Robusto', 'Versátil', 'Força'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05ebHifAogYsJSVxeRWa64uM89yBcTbjmdDhr',
      transmission: 'Manual 9 velocidades',
      weight: '23.000 kg',
      variant: '6x4'
    },
    {
      id: 'constellation-33-260-8x4',
      name: 'Constellation 33.260',
      series: '8x4',
      description: 'Para transporte de cargas muito pesadas',
      engine: 'MAN D0836LF18',
      power: '260 cv',
      capacity: 'Até 29.000 kg',
      features: ['Máxima capacidade', 'Força', 'Estabilidade', 'Segurança'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JDGBgaWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk',
      transmission: 'Manual',
      weight: '29.000 kg',
      variant: '8x4'
    },
    {
      id: 'constellation-18-320-4x4',
      name: 'Constellation 18.320',
      series: '4x2',
      description: 'Para longas distâncias com alta performance',
      engine: 'MAN D2676LF21',
      power: '315 cv',
      capacity: 'Até 16.000 kg',
      features: ['Cabine Mega Space', 'GPS', 'Câmera de Ré', 'Conforto premium'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr09772zXyveFS8kwitsCaZn02EN6hB7IAdWGbY',
      transmission: 'Manual/V-Tronic',
      weight: '16.000 kg',
      variant: '4x2'
    },
    {
      id: 'constellation-19-380-4x2',
      name: 'Constellation 19.380',
      series: '4x2',
      description: 'Alta potência para transporte pesado',
      engine: 'Cummins ISL',
      power: '375 cv',
      capacity: 'Até 45.000 kg',
      features: ['Cabine Leito', 'Teto Alto', 'Conforto', 'Potência'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr01g3HdAGTWwkoFOpDL1INPn4h7MSZ6H3CAmXf',
      transmission: 'Automatizado',
      weight: '45.000 kg',
      variant: '4x2'
    },
    {
      id: 'constellation-26-320-6x2',
      name: 'Constellation 26.320',
      series: '6x2',
      description: 'Para transporte interestadual eficiente',
      engine: 'MAN D08 6.9L',
      power: '315 cv',
      capacity: 'Até 23.000 kg',
      features: ['Cabine Leito', 'Teto Alto', 'Computador de bordo', 'Conforto'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr00L1oQmRbO8krQC41Wm7UyuKdScnNgI2FRzqx',
      transmission: 'Automatizado 12 velocidades',
      weight: '23.000 kg',
      variant: '6x2'
    },
    {
      id: 'constellation-27-320-6x4',
      name: 'Constellation 27.320',
      series: '6x4',
      description: 'Para operações pesadas em qualquer terreno',
      engine: 'MAN D08 6.9L',
      power: '315 cv',
      capacity: 'Até 36.000 kg',
      features: ['Tração 6x4', 'Força', 'Estabilidade', 'Conforto'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06CLoYrySarjJxgwdi6tRWoLNCunz7hEPy5XZ',
      transmission: 'Manual 9 velocidades',
      weight: '36.000 kg',
      variant: '6x4'
    },
    {
      id: 'constellation-32-380-6x4',
      name: 'Constellation 32.380',
      series: '6x4',
      description: 'Alta produtividade para carga pesada',
      engine: 'Cummins ISL',
      power: '375 cv',
      capacity: 'Até 23.000 kg',
      features: ['Cabine Leito', 'Teto Alto', 'Conforto', 'Performance'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uoIfTgCVtqGATQO1zXaIh2VKYlx7DMoRfPJ8',
      transmission: 'Automatizado',
      weight: '23.000 kg',
      variant: '6x4'
    },
    {
      id: 'meteor-28-480-6x2',
      name: 'Meteor Highline 28.480HD',
      series: '6x2',
      description: 'Premium para transporte de longa distância',
      engine: 'MAN D2676LF28',
      power: '480 cv',
      capacity: 'Até 58.500 kg',
      features: ['Cabine Leito completa', 'Geladeira', 'Painel Digital', 'Volante multifuncional', 'Carregador por indução', 'Controle de tração'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0O1LgoMnvcwPrSGyJalpdfEL2MBU7zV39HXiT',
      transmission: 'V-Tronic 12 marchas',
      weight: '23.000 kg',
      variant: '6x2'
    },
    {
      id: 'meteor-29-530-8x4',
      name: 'Meteor Highline 29.530',
      series: '6x4',
      description: 'Máximo conforto e performance para frota premium',
      engine: 'MAN D26 13L',
      power: '530 cv',
      capacity: 'Até 74.000 kg',
      features: ['Cabine Presidential', 'Duas Camas', 'Escritório', 'Wi-Fi', 'Totalmente equipado'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02JRlo6qdKFseCcpqzHrUtMBAR9VumY4aWDIh',
      transmission: 'V-Tronic',
      weight: '100.000 kg',
      variant: '6x4'
    },
    {
      id: 'constellation-33-480-6x4',
      name: 'Constellation 33.480',
      series: '6x4',
      description: 'Alta capacidade para operações pesadas',
      engine: 'MAN D2676LFAG',
      power: '475 cv',
      capacity: 'Até 74.000 kg',
      features: ['Cabine Mega Space', 'GPS', 'Câmera de Ré', 'Alta performance'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0a3HJUc92Ef5jZGDo3qKrlIzbBVkWYh7mnUJ1',
      transmission: 'Automatizado',
      weight: '74.000 kg',
      variant: '6x4'
    },
    {
      id: 'constellation-25-480HD-6x2',
      name: 'Constellation 25.480HD',
      series: '6x2',
      description: 'Alta potência para transporte pesado em rodovias',
      engine: 'MAN D2676LFAG',
      power: '475 cv',
      capacity: 'Até 58.500 kg',
      features: ['Cabine Leito', 'Teto Alto', 'Conforto', 'Performance máxima'],
      imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0moAt0fcU2NqYFwnbK1XkBThMDtGQVo9vzI5a',
      transmission: 'Automatizado',
      weight: '58.500 kg',
      variant: '6x2'
    }
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const recommendedTruck = calculateRecommendation();
      setRecommendation(recommendedTruck);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateRecommendation = (): TruckRecommendation => {
    const monthlyKm = answers.monthlyKm || 3000;
    const cargoWeight = answers.cargoWeight || 10;
    const terrain = answers.terrain;
    const cargoType = answers.cargoType;
    const profile = answers.profile;
    const features = answers.features || [];

    if (cargoWeight <= 5 && (terrain?.includes('Cidade') || cargoType?.includes('Distribuição'))) {
      if (features.includes('Tração 4x4') || terrain?.includes('acidentado')) {
        return truckModels.find(t => t.id === 'delivery-11-1804x4') || truckModels[4];
      } else if (cargoWeight <= 3.5) {
        return truckModels.find(t => t.id === 'delivery-express') || truckModels[0];
      } else if (cargoWeight <= 6) {
        return truckModels.find(t => t.id === 'delivery-6-170') || truckModels[1];
      } else if (cargoWeight <= 9) {
        return truckModels.find(t => t.id === 'delivery-express-9-180') || truckModels[2];
      } else if (cargoWeight <= 11) {
        return truckModels.find(t => t.id === 'delivery-11-180') || truckModels[3];
      } else {
        return truckModels.find(t => t.id === 'delivery-14-180') || truckModels[5];
      }
    } else if (cargoWeight <= 20 && monthlyKm <= 10000) {
      if (profile?.includes('Autônomo') || features.includes('Economia')) {
        if (cargoWeight <= 15) {
          return truckModels.find(t => t.id === 'constellation-14-210-4x2') || truckModels[6];
        } else {
          return truckModels.find(t => t.id === 'constellation-17-210-4x2-2') || truckModels[7];
        }
      } else if (features.includes('Conforto') || monthlyKm > 5000) {
        return truckModels.find(t => t.id === 'constellation-18-260') || truckModels[9];
      } else if (features.includes('Automação') || features.includes('Tecnologia')) {
        return truckModels.find(t => t.id === 'constellation-18-210-4x2') || truckModels[8];
      } else {
        return truckModels.find(t => t.id === 'constellation-26-260-4x2') || truckModels[10];
      }
    } else if (cargoWeight > 20 || monthlyKm > 10000) {
      if (cargoWeight > 50 || cargoType?.includes('Contêineres')) {
        if (features.includes('Conforto') || profile?.includes('frota')) {
          return truckModels.find(t => t.id === 'meteor-29-530-8x4') || truckModels[28];
        } else if (cargoWeight > 70) {
          return truckModels.find(t => t.id === 'constellation-33-480-6x4') || truckModels[29];
        } else {
          return truckModels.find(t => t.id === 'constellation-25-480HD-6x2') || truckModels[30];
        }
      } else if (cargoWeight > 30 || terrain?.includes('rural')) {
        if (terrain?.includes('acidentado')) {
          return truckModels.find(t => t.id === 'constellation-27-260-6x4') || truckModels[11];
        } else if (features.includes('Potência')) {
          return truckModels.find(t => t.id === 'constellation-19-380-4x2') || truckModels[15];
        } else {
          return truckModels.find(t => t.id === 'constellation-27-320-6x4') || truckModels[20];
        }
      } else if (monthlyKm > 15000 || features.includes('Conforto')) {
        if (features.includes('Conforto premium')) {
          return truckModels.find(t => t.id === 'meteor-28-480-6x2') || truckModels[27];
        } else if (features.includes('Potência')) {
          return truckModels.find(t => t.id === 'constellation-18-320-4x4') || truckModels[16];
        } else {
          return truckModels.find(t => t.id === 'constellation-26-320-6x2') || truckModels[19];
        }
      } else {
        return truckModels.find(t => t.id === 'constellation-32-380-6x4') || truckModels[21];
      }
    } else if (cargoWeight > 40 || cargoType?.includes('Construção')) {
      return truckModels.find(t => t.id === 'constellation-33-260-8x4') || truckModels[12];
    } else {
      return truckModels.find(t => t.id === 'constellation-17-210-4x2-2') || truckModels[7];
    }
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputValue(value);
    if (value !== '') handleAnswer('monthlyKm', Number(value));
  };

  const handleManualInputBlur = (min: number, max: number) => {
    let num = Number(inputValue);
    if (isNaN(num) || num < min) num = min;
    if (num > max) num = max;
    setInputValue(num.toString());
    handleAnswer('monthlyKm', num);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'manual-input':
        const minV = question.min || 1000;
        const maxV = question.max || 50000;
        const currentV = Number(inputValue);
        return (
          <div className="input-group manual-input-group">
            <div className="digital-display">
              <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleManualInputChange}
                onBlur={() => handleManualInputBlur(minV, maxV)}
                className="big-number-input"
              />
              <span className="unit-label">{question.unit}</span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min={minV}
                max={maxV}
                step={question.step || 100}
                value={currentV}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleAnswer(question.id, Number(e.target.value));
                }}
                className="custom-range"
              />
              <div className="range-limit-labels">
                <span>{minV.toLocaleString()} {question.unit}</span>
                <span>{maxV.toLocaleString()} {question.unit}</span>
              </div>
            </div>
          </div>
        );

      case 'range':
        const rMin = question.min || 0;
        const rMax = question.max || 75;
        const rVal = answers[question.id] || rMin;
        const percent = ((rVal - rMin) / (rMax - rMin)) * 100;
        
        return (
          <div className="input-group range-group">
            <div className="range-display-value" style={{ left: `calc(${percent}% + (${8 - percent * 0.15}px))` }}>
              {rVal} {question.unit}
            </div>
            <input
              type="range"
              min={rMin}
              max={rMax}
              step={question.step || 1}
              value={rVal}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="custom-range"
            />
            <div className="range-limit-labels">
              <span>{rMin} {question.unit}</span>
              <span>{rMax} {question.unit}</span>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="input-group select-group">
            <select
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="custom-select"
            >
              <option value="">Selecione uma opção...</option>
              {question.options?.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="select-arrow"><ChevronLeft className="rotate-down" /></div>
          </div>
        );

      case 'radio':
        return (
          <div className="input-grid radio-grid">
            {question.options?.map((option, index) => {
              const isSelected = answers[question.id] === option;
              return (
                <label key={index} className={`card-option ${isSelected ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={isSelected}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  />
                  <div className="card-content">
                    <span className="card-indicator"></span>
                    <span className="card-text">{option}</span>
                  </div>
                </label>
              );
            })}
          </div>
        );

      case 'multi':
        const currentVals = answers[question.id] || [];
        return (
          <div className="input-grid multi-grid">
            {question.options?.map((option, index) => {
              const isChecked = currentVals.includes(option);
              return (
                <label key={index} className={`card-option multi ${isChecked ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      const newVals = e.target.checked
                        ? [...currentVals, option]
                        : currentVals.filter((v: string) => v !== option);
                      handleAnswer(question.id, newVals);
                    }}
                  />
                  <div className="card-content">
                    <div className="checkbox-indicator">
                      {isChecked && <Check size={14} color="white" />}
                    </div>
                    <span className="card-text">{option}</span>
                  </div>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  if (recommendation) {
    return (
      <div className="app-container result-mode">
        <header className="app-header">
          <div className="brand-area">
            <span className="brand-main">VOLKSWAGEN</span>
            <span className="brand-sub">Caminhões</span>
          </div>
        </header>

        <main className="result-main">
          <div className="result-intro">
            <div className="success-badge"><Check size={24} /></div>
            <h1>Configuração Ideal Encontrada</h1>
            <p>Com base no seu perfil, este é o caminhão que vai levar seu negócio adiante.</p>
          </div>

          <div className="truck-showcase">
            <div className="truck-visual">
              <div className="truck-tags">
                <span className="tag-series">{recommendation.series}</span>
                <span className="tag-variant">{recommendation.variant}</span>
              </div>
              <img 
                src={recommendation.imageUrl} 
                alt={recommendation.name} 
                className="hero-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/800x450/001E50/FFFFFF?text=${encodeURIComponent(recommendation.name)}`;
                }}
              />
            </div>

            <div className="truck-info">
              <div className="info-header">
                <h2>{recommendation.name}</h2>
                <p className="info-desc">{recommendation.description}</p>
              </div>

              <div className="specs-grid">
                <div className="spec-card">
                  <Gauge className="spec-icon" />
                  <div>
                    <label>Potência</label>
                    <strong>{recommendation.power}</strong>
                  </div>
                </div>
                <div className="spec-card">
                  <Weight className="spec-icon" />
                  <div>
                    <label>Capacidade</label>
                    <strong>{recommendation.capacity}</strong>
                  </div>
                </div>
                <div className="spec-card">
                  <Settings className="spec-icon" />
                  <div>
                    <label>Transmissão</label>
                    <strong>{recommendation.transmission}</strong>
                  </div>
                </div>
                <div className="spec-card">
                   <Info className="spec-icon" />
                   <div>
                    <label>Peso Bruto</label>
                    <strong>{recommendation.weight}</strong>
                   </div>
                </div>
              </div>

              <div className="features-list">
                <h3>Destaques</h3>
                <ul>
                  {recommendation.features.map((feat, i) => (
                    <li key={i}><Check size={16} className="feat-check" /> {feat}</li>
                  ))}
                </ul>
              </div>

              <div className="result-actions">
                <button className="btn-primary full-width" onClick={() => navigate('/truck-selector')}>
                  Configurar este modelo <ArrowRight size={20} />
                </button>
                <button className="btn-secondary full-width" onClick={() => navigate('/consultants')}>
                  Falar com consultor
                </button>
              </div>
            </div>
          </div>
          <div className="back-home-container">
            <button className="text-link-button" onClick={() => navigate('/')}>
              <ChevronLeft size={20} /> Voltar para o início
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isNextDisabled = !answers[currentQuestion.id] || 
    (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0);

  return (
    <div className="app-container quiz-mode">
      <header className="app-header">
        <div className="brand-area">
          <span className="brand-main">VOLKSWAGEN</span>
          <span className="brand-sub">Caminhões</span>
        </div>
        <div className="step-counter">
          Passo {currentStep + 1} de {questions.length}
        </div>
      </header>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <main className="quiz-main">
        <div className="question-wrapper">
          <h1 className="question-text">{currentQuestion.text}</h1>
          <div className="input-area">
            {renderQuestion(currentQuestion)}
          </div>
        </div>

        <div className="quiz-footer">
          <button 
            className={`nav-btn prev ${currentStep === 0 ? 'hidden' : ''}`} 
            onClick={handleBack}
          >
            <ChevronLeft size={20} /> Voltar
          </button>

          <button 
            className="nav-btn next" 
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            {currentStep === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="back-home-container-footer">
          <button className="text-link-button" onClick={() => navigate('/')}>
            <ChevronLeft size={16} /> Voltar ao início
          </button>
        </div>
      </main>
    </div>
  );
};

export default RecommendationPage;