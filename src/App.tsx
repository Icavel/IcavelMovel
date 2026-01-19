// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { Page, TruckModel } from './types';
import TruckModelSelector from './componentes/TruckModelSelector/TruckModelSelector';
import MeteorConfigurator from './componentes/Meteor/MeteorConfigurator';
import ConstellationConfigurator from './componentes/Constellation3D/ConstellationConfigurator';
import DeliveryConfigurator from './componentes/Delivery/DeliveryConfigurator';
import LandingSalesEvents from './componentes/LandingSalesEvents';
import RecommendationPage from './RecommendationPage';
import LoginScreen from './LoginScreen';

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 mb-8 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">Eventos e Feiras Volkswagen</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-sm text-blue-600 font-semibold mb-2">PRÓXIMO EVENTO</div>
            <h3 className="text-xl font-bold mb-2">Feira Internacional de Logística</h3>
            <p className="text-gray-600 mb-4">15-18 de Novembro, 2024</p>
            <p className="text-gray-700">Conheça nossa linha completa de caminhões e soluções de transporte.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-sm text-blue-600 font-semibold mb-2">LANÇAMENTO</div>
            <h3 className="text-xl font-bold mb-2">Nova Linha 2025</h3>
            <p className="text-gray-600 mb-4">10 de Dezembro, 2024</p>
            <p className="text-gray-700">Descubra as novidades e tecnologias dos nossos novos modelos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConsultantsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="consultants-container">
      <div className="consultants-content">
        <button
          onClick={() => navigate('/')}
          className="back-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para Home
        </button>

        <div className="consultants-header">
          <h1>Fale com um Consultor Icavel</h1>
          <p>Especialistas prontos para encontrar a solução ideal para o seu negócio</p>
        </div>

        <div className="consultants-card">
          <h2>Atendimento Personalizado</h2>
          <p className="subtitle">
            Nossos consultores especializados estão prontos para entender suas necessidades
            e indicar a melhor solução Volkswagen para o seu negócio.
          </p>

          <div className="contact-methods-grid">
            <div className="contact-method">
              <div className="icon">📞</div>
              <h3>Telefone</h3>
              <p className="contact-info">0800 019 3333</p>
              <p className="contact-details">Segunda a Sexta, 8h às 18h</p>
            </div>

            <div className="contact-method">
              <div className="icon">✉️</div>
              <h3>Email</h3>
              <p className="contact-info">recepcao@icavel.com</p>
              <p className="contact-details">Resposta em até 24 horas</p>
            </div>

            <div className="contact-method whatsapp">
              <div className="icon">💬</div>
              <h3>WhatsApp</h3>
              <p className="contact-info"> 0800 019 3333</p>
              <p className="contact-details">Atendimento rápido e ágil</p>
            </div>
          </div>

          <div className="qrcode-container">
            <h3 className="qrcode-title">Escaneie o QR Code para WhatsApp</h3>
            <p className="qrcode-subtitle">
              Converse diretamente com nossos consultores pelo WhatsApp
            </p>

            <div className="qrcode-image-wrapper">
              <img
                src="https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0y1hUNpDSwAKxFhk9eiYJvqRu1LOf3TZtnjdI"
                alt="QR Code para WhatsApp Icavel"
                className="qrcode-image"
              />
            </div>

            <div className="qrcode-instructions">
              <div className="instruction-item">
                <div className="instruction-icon">📱</div>
                <p>Abra a câmera do seu celular</p>
              </div>
              <div className="instruction-item">
                <div className="instruction-icon">🎯</div>
                <p>Aponte para o QR Code acima</p>
              </div>
              <div className="instruction-item">
                <div className="instruction-icon">💬</div>
                <p>Toque no link para iniciar a conversa</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Página não encontrada</h1>
      <p className="text-gray-600 mb-8 text-center">
        A página que você está procurando não existe ou foi movida.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Voltar para Home
      </button>
    </div>
  );
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userData = localStorage.getItem('userData');

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Componente para guardar o estado do caminhão selecionado
const TruckConfiguratorWrapper: React.FC<{
  type: 'constellation' | 'meteor' | 'delivery';
  onBack: () => void;
}> = ({ type, onBack }) => {
  const [selectedTruck, setSelectedTruck] = useState<TruckModel | null>(null);
  const navigate = useNavigate();

  // Recuperar o caminhão do localStorage ao montar
  useEffect(() => {
    const savedTruck = localStorage.getItem('selectedTruck');
    if (savedTruck) {
      try {
        const truckData = JSON.parse(savedTruck);
        setSelectedTruck(truckData);
      } catch (error) {
        console.error('Erro ao carregar caminhão selecionado:', error);
        navigate('/truck-selector');
      }
    } else {
      // Se não houver caminhão salvo, voltar para seleção
      navigate('/truck-selector');
    }
  }, [navigate]);

  // Renderizar o configurador correto baseado no tipo
  if (!selectedTruck) {
    return <div>Carregando configuração...</div>;
  }

  switch (type) {
    case 'constellation':
      return (
        <ConstellationConfigurator
          selectedModel={selectedTruck as any}
          onBack={onBack}
        />
      );
    case 'meteor':
      return (
        <MeteorConfigurator
          selectedModel={selectedTruck as any}
          onBack={onBack}
        />
      );
    case 'delivery':
      return (
        <DeliveryConfigurator
          selectedModel={selectedTruck as any}
          onBack={onBack}
        />
      );
    default:
      return <Navigate to="/truck-selector" replace />;
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleTruckConfigure = (model: any) => {
    // Salvar o caminhão selecionado no localStorage
    localStorage.setItem('selectedTruck', JSON.stringify(model));
    
    // Navegar para o configurador correto usando window.location
    // (mantendo compatibilidade com o código existente)
    if (model.type === 'meteor') {
      window.location.href = '/meteor';
    } else if (model.type === 'constellation') {
      window.location.href = '/constellation';
    } else if (model.type === 'delivery') {
      window.location.href = '/delivery';
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setIsAuthenticated(true);
    window.location.href = '/';
  };

  const handleNavigate = (page: string) => {
    window.location.href = `/${page}`;
  };

  // Função para voltar corretamente
  const handleBackFromConfigurator = () => {
    // Remover o caminhão salvo
    localStorage.removeItem('selectedTruck');
    // Voltar para o seletor
    window.location.href = '/truck-selector';
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginScreen onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <LandingSalesEvents onNavigate={handleNavigate as (page: Page) => void} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/recommendation"
            element={
              <ProtectedRoute>
                <RecommendationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/truck-selector"
            element={
              <ProtectedRoute>
                <TruckModelSelector onConfigure={handleTruckConfigure} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultants"
            element={
              <ProtectedRoute>
                <ConsultantsPage />
              </ProtectedRoute>
            }
          />

          {/* Configuradores com estado mantido */}
          <Route
            path="/meteor"
            element={
              <ProtectedRoute>
                <TruckConfiguratorWrapper 
                  type="meteor" 
                  onBack={handleBackFromConfigurator} 
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/constellation"
            element={
              <ProtectedRoute>
                <TruckConfiguratorWrapper 
                  type="constellation" 
                  onBack={handleBackFromConfigurator} 
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery"
            element={
              <ProtectedRoute>
                <TruckConfiguratorWrapper 
                  type="delivery" 
                  onBack={handleBackFromConfigurator} 
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <Navigate to="/recommendation" replace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customize"
            element={
              <ProtectedRoute>
                <Navigate to="/truck-selector" replace />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;