import React, { useState } from 'react';
import { ChevronLeft, Truck, Check, ArrowRight } from 'lucide-react';
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
  model: string;
  series: string;
  description: string;
  engine: string;
  capacity: string;
  features: string[];
  imageUrl: string;
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
      max: 10000,
      step: 100,
      unit: 'km'
    },
    {
      id: 'cargoType',
      text: 'Que tipo de carga você transporta?',
      type: 'select',
      options: ['Grãos/Cereais', 'Carga Seca', 'Líquidos/Tanque', 'Carga Viva', 'Contêineres', 'Materiais de Construção', 'Outros']
    },
    {
      id: 'cargoWeight',
      text: 'Qual o peso médio da sua carga?',
      type: 'range',
      min: 1,
      max: 40,
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
      options: ['Rodovias (asfalto)', 'Estradas rurais', 'Cidade/Urbano', 'Misto (cidade e estrada)', 'Terreno acidentado']
    },
    {
      id: 'features',
      text: 'Quais características são importantes para você?',
      type: 'multi',
      options: ['Economia de combustível', 'Conforto na cabine', 'Potência do motor', 'Baixa manutenção', 'Tecnologia embarcada', 'Segurança', 'Capacidade de carga']
    }
  ];

  const truckModels: TruckRecommendation[] = [
    {
      model: 'Constellation',
      series: '17.220',
      description: 'Ideal para transporte regional de cargas secas e grãos',
      engine: '6.6L - 220 cv',
      capacity: 'Até 17 toneladas',
      features: ['Cabine confortável', 'Econômico', 'Manutenção simplificada'],
      imageUrl: 'https://images.unsplash.com/photo-1611068806186-89ae6a72f7b1?auto=format&fit=crop&w=800'
    },
    {
      model: 'Meteor',
      series: '29.440',
      description: 'Para longas distâncias e cargas pesadas',
      engine: '10.3L - 440 cv',
      capacity: 'Até 29 toneladas',
      features: ['Motor potente', 'Cabine sleeper', 'Sistema de segurança avançado'],
      imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800'
    },
    {
      model: 'Delivery',
      series: '11.180',
      description: 'Perfeito para distribuição urbana e entregas',
      engine: '3.0L - 180 cv',
      capacity: 'Até 11 toneladas',
      features: ['Ágil no trânsito', 'Baixo consumo', 'Facilidade de manobra'],
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800'
    },
    {
      model: 'Constellation',
      series: '25.280',
      description: 'Versátil para diversos tipos de carga',
      engine: '6.6L - 280 cv',
      capacity: 'Até 25 toneladas',
      features: ['Versátil', 'Boa relação custo-benefício', 'Robusto'],
      imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800'
    }
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
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
    const profile = answers.profile;

    if (profile?.includes('Autônomo') && cargoWeight <= 15 && monthlyKm <= 5000) {
      return truckModels[0];
    } else if (cargoWeight > 20 || monthlyKm > 7000) {
      return truckModels[1];
    } else if (terrain?.includes('Cidade') || profile?.includes('distribuição')) {
      return truckModels[2];
    } else {
      return truckModels[3];
    }
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputValue(value);
    
    if (value !== '') {
      handleAnswer('monthlyKm', Number(value));
    }
  };

  const handleManualInputBlur = (min: number, max: number) => {
    let num = Number(inputValue);
    
    if (isNaN(num) || num < min) {
      num = min;
    }
    
    if (num > max) {
      num = max;
    }
    
    setInputValue(num.toString());
    handleAnswer('monthlyKm', num);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'manual-input':
        const minValue = question.min || 1000;
        const maxValue = question.max || 10000;
        const stepValue = question.step || 100;
        const currentValue = Number(inputValue);
        
        return (
          <div className="manual-input-container">
            <div className="input-with-slider">
              <div className="manual-input-wrapper">
                <input
                  type="text"
                  inputMode="numeric"
                  value={inputValue}
                  onChange={handleManualInputChange}
                  onBlur={() => handleManualInputBlur(minValue, maxValue)}
                  className="manual-input"
                  placeholder={`Digite entre ${minValue} e ${maxValue}`}
                />
                <span className="input-unit">{question.unit || ''}</span>
              </div>
              
              <div className="slider-reference">
                <input
                  type="range"
                  min={minValue}
                  max={maxValue}
                  step={stepValue}
                  value={currentValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    handleAnswer(question.id, Number(value));
                  }}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>{minValue} {question.unit || ''}</span>
                  <span>{maxValue} {question.unit || ''}</span>
                </div>
              </div>
              
              <div className="current-value-display">
                <span className="current-value-label">Quilometragem mensal:</span>
                <span className="current-value">
                  {currentValue.toLocaleString('pt-BR')} {question.unit || ''}
                </span>
              </div>
              
              <p className="input-help-text">
                Digite o valor exato ou use o controle deslizante
              </p>
            </div>
          </div>
        );

      case 'range':
        const rangeMin = question.min || 0;
        const rangeMax = question.max || 100;
        const rangeStep = question.step || 1;
        const rangeValue = answers[question.id] || rangeMin;
        
        return (
          <div className="range-input-container">
            <input
              type="range"
              min={rangeMin}
              max={rangeMax}
              step={rangeStep}
              value={rangeValue}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="range-slider"
            />
            <div className="range-value">
              <span className="value-display">
                {rangeValue} {question.unit || ''}
              </span>
            </div>
            <div className="range-labels">
              <span>{rangeMin} {question.unit || ''}</span>
              <span>{rangeMax} {question.unit || ''}</span>
            </div>
          </div>
        );

      case 'select':
        return (
          <select
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="select-input"
          >
            <option value="">Selecione uma opção</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="radio-group">
            {question.options?.map((option, index) => (
              <label key={index} className="radio-option">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="radio-text">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multi':
        const currentValues = answers[question.id] || [];
        return (
          <div className="multi-group">
            {question.options?.map((option, index) => (
              <label key={index} className="multi-option">
                <input
                  type="checkbox"
                  checked={currentValues.includes(option)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleAnswer(question.id, newValues);
                  }}
                />
                <span className="multi-custom">
                  {currentValues.includes(option) && <Check size={14} />}
                </span>
                <span className="multi-text">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (recommendation) {
    return (
      <div className="recommendation-container">
        <header className="recommendation-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <ChevronLeft size={24} />
            Voltar
          </button>
          <div className="header-logo">
            <span className="brand">VOLKSWAGEN</span>
            <span className="sub-brand">Caminhões</span>
          </div>
        </header>

        <main className="recommendation-result">
          <div className="result-header">
            <div className="result-icon">
              <Truck size={48} />
            </div>
            <h1>Encontramos o Volkswagen perfeito para você!</h1>
            <p className="result-subtitle">
              Baseado nas suas respostas, recomendamos:
            </p>
          </div>

          <div className="truck-card">
            <div className="truck-image" style={{ backgroundImage: `url(${recommendation.imageUrl})` }}></div>
            <div className="truck-info">
              <div className="truck-model">
                <h2>{recommendation.model}</h2>
                <span className="truck-series">{recommendation.series}</span>
              </div>
              <p className="truck-description">{recommendation.description}</p>
              
              <div className="spec-grid">
                <div className="spec-item">
                  <span className="spec-label">Motor</span>
                  <span className="spec-value">{recommendation.engine}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Capacidade</span>
                  <span className="spec-value">{recommendation.capacity}</span>
                </div>
              </div>

              <div className="features-list">
                <h3>Características principais:</h3>
                <ul>
                  {recommendation.features.map((feature, index) => (
                    <li key={index}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="action-buttons">
                <button className="btn-primary" onClick={() => navigate('/truck-selector')}>
                  Configurar este modelo
                  <ArrowRight size={20} />
                </button>
                <button className="btn-secondary" onClick={() => navigate('/consultants')}>
                  Falar com consultor
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="recommendation-container">
      <header className="recommendation-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ChevronLeft size={24} />
          Voltar
        </button>
        <div className="header-logo">
          <span className="brand">VOLKSWAGEN</span>
          <span className="sub-brand">Caminhões</span>
        </div>
      </header>

      <main className="recommendation-content">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentStep + 1} de {questions.length}
          </span>
        </div>

        <div className="question-container">
          <h1 className="question-title">{currentQuestion.text}</h1>
          <div className="question-input">
            {renderQuestion(currentQuestion)}
          </div>
        </div>

        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button className="btn-secondary" onClick={handleBack}>
              Voltar
            </button>
          )}
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={
              !answers[currentQuestion.id] || 
              (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)
            }
          >
            {currentStep === questions.length - 1 ? 'Ver resultado' : 'Próxima'}
            <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default RecommendationPage;