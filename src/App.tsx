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

const mockTruckData: TruckModel = {
  id: 'constellation-1', 
  name: 'Constellation 24.280',
  type: 'constellation',
  variant: '24.280 6x2',
  price: 'R$ 350.000',
  image: 'https://images.unsplash.com/photo-1563729142219-14fa8d936a1d?auto=format&fit=crop&w=800',
  imageUrl: 'https://images.unsplash.com/photo-1563729142219-14fa8d936a1d?auto=format&fit=crop&w=800',
  description: 'Caminhão pesado com excelente desempenho e conforto',
  features: [
    'Motor 280cv',
    'Transmissão automatizada',
    'Cabine sleeper',
    'ABS e airbag',
    'Ar condicionado',
    'Direção hidráulica'
  ],
  specs: {
    engine: '6 cilindros, turbo diesel',
    transmission: 'Automática 12 velocidades',
    power: '280 cv',
    torque: '120 kgfm',
    capacity: '24 toneladas'
  },
  transmission: 'Automática 12 velocidades',
  engine: '6 cilindros, turbo diesel',
  power: '280 cv',
  torque: '120 kgfm',
  capacity: '24 toneladas',
  weight: '12.000 kg'
};

const meteorData: TruckModel = {
  id: 'meteor-1',
  name: 'Meteor 31.320',
  type: 'meteor',
  variant: '31.320 6x4',
  price: 'R$ 420.000',
  image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800',
  imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800',
  description: 'Caminhão extra pesado para trabalhos mais exigentes',
  features: [
    'Motor 320cv',
    'Transmissão automatizada',
    'Cabine completa',
    'Suspensão a ar',
    'Freios a disco'
  ],
  specs: {
    engine: '8 cilindros, turbo diesel',
    transmission: 'Automática 16 velocidades',
    power: '320 cv',
    torque: '160 kgfm',
    capacity: '31 toneladas'
  },
  transmission: 'Automática 16 velocidades',
  engine: '8 cilindros, turbo diesel',
  power: '320 cv',
  torque: '160 kgfm',
  capacity: '31 toneladas',
  weight: '15.000 kg'
};

const deliveryData: TruckModel = {
  id: 'delivery-1',
  name: 'Delivery Express 11.180',
  type: 'delivery',
  variant: '11.180 4x2',
  price: 'R$ 185.000',
  image: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?auto=format&fit=crop&w=800',
  imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?auto=format&fit=crop&w=800',
  description: 'Veículo urbano ideal para entregas rápidas',
  features: [
    'Motor 180cv',
    'Transmissão manual',
    'Baú refrigerado opcional',
    'Baixo consumo',
    'Manutenção simples'
  ],
  specs: {
    engine: '4 cilindros, turbo diesel',
    transmission: 'Manual 6 velocidades',
    power: '180 cv',
    torque: '70 kgfm',
    capacity: '11 toneladas'
  },
  transmission: 'Manual 6 velocidades',
  engine: '4 cilindros, turbo diesel',
  power: '180 cv',
  torque: '70 kgfm',
  capacity: '11 toneladas',
  weight: '6.500 kg'
};

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
        
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Fale com um Consultor Volkswagen</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Atendimento Personalizado</h2>
          <p className="text-gray-700 mb-6">
            Nossos consultores especializados estão prontos para entender suas necessidades 
            e indicar a melhor solução Volkswagen para o seu negócio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">📞</div>
              <h3 className="font-bold mb-2">Telefone</h3>
              <p className="text-gray-600">0800 123 4567</p>
              <p className="text-sm text-gray-500">Segunda a Sexta, 8h às 18h</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">✉️</div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">consultoria@volkswagen.com.br</p>
              <p className="text-sm text-gray-500">Resposta em até 24h</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">📍</div>
              <h3 className="font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-600">(11) 98765-4321</p>
              <p className="text-sm text-gray-500">Atendimento ágil</p>
            </div>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full md:w-auto">
            Solicitar Contato de Consultor
          </button>
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

function App() {
  const [selectedTruck, setSelectedTruck] = useState<TruckModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleTruckConfigure = (model: any) => {
    const convertedModel: TruckModel = {
      ...model,
      id: String(model.id),
      specs: typeof model.specs === 'object' && !Array.isArray(model.specs) 
        ? model.specs 
        : undefined
    };
    
    setSelectedTruck(convertedModel);
    
    if (convertedModel.type === 'meteor') {
      window.location.href = '/meteor';
    } else if (convertedModel.type === 'constellation') {
      window.location.href = '/constellation';
    } else if (convertedModel.type === 'delivery') {
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
          
          <Route 
            path="/meteor" 
            element={
              <ProtectedRoute>
                <MeteorConfigurator 
                  selectedModel={(selectedTruck || meteorData) as any} 
                  onBack={() => window.history.back()} 
                />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/constellation" 
            element={
              <ProtectedRoute>
                <ConstellationConfigurator 
                  selectedModel={(selectedTruck || mockTruckData) as any} 
                  onBack={() => window.history.back()} 
                />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/delivery" 
            element={
              <ProtectedRoute>
                <DeliveryConfigurator 
                  selectedModel={(selectedTruck || deliveryData) as any} 
                  onBack={() => window.history.back()} 
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