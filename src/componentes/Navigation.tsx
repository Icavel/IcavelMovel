import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Truck, Settings, Search, LayoutGrid, Menu } from 'lucide-react';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  // Função auxiliar para verificar link ativo
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Top Bar) --- */}
      <nav className="vw-nav-desktop">
        <div className="vw-nav-container">
          <Link to="/" className="vw-brand">
            <div className="brand-icon">
              <Truck size={24} color="white" />
            </div>
            <div className="brand-text">
              <h1>Volkswagen</h1>
              <span>Caminhões e Ônibus</span>
            </div>
          </Link>

          <div className="vw-nav-links">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/discover" className={`nav-link ${isActive('/discover')}`}>
              Descobrir
            </Link>
            <Link to="/customize" className={`nav-link ${isActive('/customize')}`}>
              Personalizar
            </Link>
          </div>

          <div className="vw-nav-actions">
            <Link to="/truck-selector" className="vw-cta-button">
              Configurador
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MOBILE NAVIGATION (Bottom Tab Bar) --- */}
      <nav className="vw-nav-mobile">
        <Link to="/" className={`mobile-tab ${isActive('/')}`}>
          <Home size={24} />
          <span>Início</span>
        </Link>

        <Link to="/discover" className={`mobile-tab ${isActive('/discover')}`}>
          <Search size={24} />
          <span>Buscar</span>
        </Link>

        {/* Botão Central de Destaque (Configurador) */}
        <Link to="/truck-selector" className="mobile-tab-highlight">
          <div className="highlight-circle">
            <Truck size={24} />
          </div>
          <span>Modelos</span>
        </Link>

        <Link to="/customize" className={`mobile-tab ${isActive('/customize')}`}>
          <Settings size={24} />
          <span>Configurar</span>
        </Link>

        <Link to="/menu" className={`mobile-tab ${isActive('/menu')}`}>
          <LayoutGrid size={24} />
          <span>Menu</span>
        </Link>
      </nav>
    </>
  );
};

export default Navigation;