import React from 'react';
import { 
  ArrowRight, 
  Settings, 
  Search, 
  CalendarDays, 
  MessageSquareText, 
  ChevronRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LandingSalesEvents.css";
import { Page } from '../types';

interface LandingSalesEventsProps {
  onNavigate?: (page: Page) => void;
}

const LandingSalesEvents: React.FC<LandingSalesEventsProps> = ({ onNavigate }) => {
  const navigate = useNavigate();

  return (
    <div className="vw-totem-container">
      <header className="vw-totem-header">
        <div className="vw-logo-wrapper">
          <span className="vw-brand">GRUPO ICAVEL</span>
          <span className="vw-sub-brand">Caminhões e Ônibus</span>
        </div>
      </header>

      <main className="vw-main-stage">
        
        <div 
          className="vw-action-card card-configure" 
          onClick={() => navigate('/truck-selector')}
          role="button"
          tabIndex={0}
        >
          <div className="card-bg-image config-bg"></div>
          <div className="card-overlay"></div>
          <div className="card-content">
            <div className="icon-badge">
              <Settings size={32} />
            </div>
            <h2>Configure seu caminhão</h2>
            <p>Escolha cabine, motorização e acessórios sob medida.</p>
            <span className="cta-link">
              Começar agora <ChevronRight />
            </span>
          </div>
        </div>

      
        <div 
          className="vw-action-card card-discover" 
          onClick={() => navigate('/recommendation')} 
          role="button"
          tabIndex={0}
        >
          <div className="card-bg-image discover-bg"></div>
          <div className="card-overlay"></div>
          <div className="card-content">
            <div className="icon-badge highlight">
              <Search size={32} />
            </div>
            <h2>Descubra o Volkswagen perfeito para você</h2>
            <p>Responda algumas perguntas e indicaremos o modelo ideal.</p>
            <span className="cta-link">
              Fazer o teste <ChevronRight />
            </span>
          </div>
        </div>

      </main>

      <footer className="vw-totem-footer">
        <div className="footer-title">Outros serviços</div>
        <div className="footer-grid">
          <button className="footer-btn" onClick={() => navigate('/events')}>
            <CalendarDays size={24} />
            <span>Eventos e Feiras</span>
          </button>
          
          <button className="footer-btn" onClick={() => navigate('/consultants')}>
            <MessageSquareText size={24} />
            <span>Falar com Consultor</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingSalesEvents;