import React, { useState, useEffect } from 'react';
import {
  Settings,
  Search,
  MessageSquareText,
  ChevronRight,
  Edit2,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LandingSalesEvents.css";
import { Page } from '../types';

interface LandingSalesEventsProps {
  onNavigate?: (page: Page) => void;
}

interface UserData {
  name: string;
  phone: string;
  acceptsMarketing: boolean;
}

const LandingSalesEvents: React.FC<LandingSalesEventsProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editErrors, setEditErrors] = useState<{ name?: string; phone?: string }>({});

  const grupoIcavelLogoUrl = "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0EDBeCA1lqADCeUMSQuZmabt961Hif7F405dw";

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
        setEditName(parsedData.name || '');
        setEditPhone(parsedData.phone || '');
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }, []);

  const validateEditForm = () => {
    const errors: { name?: string; phone?: string } = {};

    if (!editName.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!editPhone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(editPhone)) {
      errors.phone = 'Formato inválido (use: (11) 99999-9999)';
    }

    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenEditModal = () => {
    if (userData) {
      setEditName(userData.name);
      setEditPhone(userData.phone);
      setEditErrors({});
      setShowEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditErrors({});
  };

  const handleSaveEdit = () => {
    if (validateEditForm()) {
      const updatedUserData = {
        ...userData,
        name: editName.trim(),
        phone: editPhone.trim(),
        acceptsMarketing: userData?.acceptsMarketing || false
      };
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setShowEditModal(false);
      setEditErrors({});
    }
  };

  const handlePhoneChange = (value: string) => {
    let formatted = value.replace(/\D/g, '');

    if (formatted.length > 0) {
      formatted = `(${formatted.substring(0, 2)}${formatted.length > 2 ? ') ' : ''}${formatted.substring(2)}`;
    }

    if (formatted.length > 10) {
      formatted = `${formatted.substring(0, 10)}-${formatted.substring(10, 14)}`;
    }

    setEditPhone(formatted);
    if (editErrors.phone) {
      setEditErrors({ ...editErrors, phone: undefined });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatClientName = (name: string) => {
    if (!name) return '';
    
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(' ');
    
    if (nameParts.length === 1) {
      return `Seja bem vindo ${trimmedName}`;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
  
    return `Seja bem vindo ${firstName} ${lastName}`;
  };

  return (
    <div className="vw-totem-container">
      <header className="vw-totem-header">
        <div className="vw-header-left">
          <div className="vw-logo-wrapper">
            <img
              src={grupoIcavelLogoUrl}
              alt="GRUPO ICAVEL - Caminhões e Ônibus"
              className="vw-logo-image"
              onError={(e) => {
                console.error('Erro ao carregar logo do Grupo Icavel');
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'vw-brand-fallback';
                fallback.textContent = 'GRUPO ICAVEL';
                e.currentTarget.parentNode?.appendChild(fallback);
              }}
            />
            <span className="vw-sub-brand">Caminhões e Ônibus</span>
          </div>
        </div>

        <div className="vw-header-right">
          {userData ? (
            <div className="client-info-section">
              <div className="client-info-card">
                <div className="client-details">
                  <div className="client-welcome">{formatClientName(userData.name)}</div>
                  <div className="client-phone">{formatPhone(userData.phone)}</div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenEditModal}
                  className="edit-client-btn"
                  aria-label="Editar informações do cliente"
                  title="Editar informações"
                >
                  <Edit2 />
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="logout-btn"
                title="Sair do sistema"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <div className="no-client-info">
              <span>Nenhum cliente registrado</span>
              <button
                onClick={handleLogout}
                className="logout-btn"
                title="Voltar para login"
              >
                <LogOut size={16} />
                <span>Login</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {showEditModal && (
        <div className="edit-modal-overlay" onClick={handleCloseEditModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Editar Informações</h3>
              <button
                onClick={handleCloseEditModal}
                className="edit-modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="edit-modal-body">
              <div className="form-group">
                <label htmlFor="edit-name">Nome completo</label>
                <input
                  id="edit-name"
                  type="text"
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    if (editErrors.name) {
                      setEditErrors({ ...editErrors, name: undefined });
                    }
                  }}
                  className={`edit-modal-input ${editErrors.name ? 'error' : ''}`}
                  placeholder="Digite seu nome"
                />
                {editErrors.name && (
                  <span className="error-message">{editErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="edit-phone">Telefone</label>
                <input
                  id="edit-phone"
                  type="tel"
                  value={editPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`edit-modal-input ${editErrors.phone ? 'error' : ''}`}
                  placeholder="(11) 99999-9999"
                />
                {editErrors.phone && (
                  <span className="error-message">{editErrors.phone}</span>
                )}
              </div>
            </div>

            <div className="edit-modal-footer">
              <button
                onClick={handleCloseEditModal}
                className="edit-modal-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="edit-modal-save"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="vw-main-stage">
        <div
          className="vw-action-card card-configure"
          onClick={() => navigate('/truck-selector')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/truck-selector')}
        >
          <div className="card-bg-image config-bg"></div>
          <div className="card-overlay"></div>

          <div className="card-top-icons">
            <div className="icon-badge">
              <Settings size={24} />
            </div>
          </div>

          <div className="card-content">
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
          onKeyDown={(e) => e.key === 'Enter' && navigate('/recommendation')}
        >
          <div className="card-bg-image discover-bg"></div>
          <div className="card-overlay"></div>
          <div className="card-top-icons">
            <div className="icon-badge highlight">
              <Search size={24} />
            </div>
          </div>

          <div className="card-content">
            <h2>Descubra o Volkswagen perfeito para você</h2>
            <p>Responda algumas perguntas e indicaremos o modelo ideal.</p>
            <span className="cta-link">
              Fazer o teste <ChevronRight />
            </span>
          </div>
        </div>
      </main>

      <footer className="vw-totem-footer">
        <div className="footer-content">
          <div className="footer-title">Outros serviços</div>
        </div>

        <button
          className="footer-btn footer-btn-full"
          onClick={() => navigate('/consultants')}
        >
          <MessageSquareText size={24} />
          <span>Falar com Consultor</span>
        </button>
      </footer>
    </div>
  );
};

export default LandingSalesEvents;