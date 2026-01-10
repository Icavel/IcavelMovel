// src/components/Meteor/MeteorPage.tsx
import React from "react";
import MeteorConfigurator from "./MeteorConfigurator";
import "./MeteorPage.css";

export default function MeteorPage() {
  return (
    <div className="meteor-page">
      <header className="page-header">
        <div className="header-container">
          <div className="header-brand">
            <div className="logo-container">
              <div className="vw-logo">k</div>
              <div className="brand-info">
                <h1 className="brand-title">Volkswagen Caminhões e Ônibus</h1>
                <p className="brand-subtitle">Configurador Meteor</p>
              </div>
            </div>
            
            <nav className="navigation">
              <a href="/" className="nav-link">Início</a>
              <a href="/modelos" className="nav-link">Modelos</a>
              <a href="/configurador" className="nav-link active">Configurador</a>
              <a href="/contato" className="nav-link">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="page-content">
        <MeteorConfigurator />
      </main>

      <footer className="page-footer">
        <div className="footer-container">
          <p>© 2024 Volkswagen Caminhões e Ônibus. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="/privacidade">Política de Privacidade</a>
            <a href="/termos">Termos de Uso</a>
            <a href="/contato">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}