// src/LoginScreen.tsx
import React, { useState } from 'react';
import { User, Phone, Mail, Check, ArrowRight } from 'lucide-react';
import './LoginScreen.css';

interface LoginScreenProps {
  onLoginSuccess: (userData: UserData) => void;
}

interface UserData {
  name: string;
  phone: string;
  acceptsMarketing: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    phone: '',
    acceptsMarketing: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido (use: (11) 99999-9999)';
    }

    if (!formData.acceptsMarketing) {
      newErrors.acceptsMarketing = 'Você precisa aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = `(${value.substring(0, 2)}${value.length > 2 ? ') ' : ''}${value.substring(2)}`;
    }
    
    if (value.length > 10) {
      value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
    }
    
    setFormData({ ...formData, phone: value });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('lastLogin', new Date().toISOString());
      onLoginSuccess(formData);
    }
  };

  const handleInputChange = (field: keyof UserData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'acceptsMarketing' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="icavel-logo">
            <span className="logo-text">ICAVEL</span>
            <span className="logo-subtext">Caminhões & Ônibus</span>
          </div>
          <h1 className="login-title">Comece sua experiência Icavel</h1>
          <p className="login-subtitle">
            Preencha seus dados para acessar nosso configurador personalizado
          </p>
        </div>

        <div className="login-image-section">
          <div 
            className="login-image"
            style={{
              backgroundImage: `url('https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0vadapbltWkVFrLscwKlaUoY8B9eZHm2yDpz0')`
            }}
          >
            <div className="image-overlay">
              <div className="welcome-text">
                <span className="welcome-icon">🚚</span>
                <h3>Inicie sua experiência Icavel por aqui</h3>
                <p>Sua jornada para encontrar o caminhão perfeito começa agora</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="input-label">
              <User size={20} />
              <span>Nome completo*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Digite seu nome completo"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="input-label">
              <Phone size={20} />
              <span>Telefone*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="input-label">
              <Mail size={20} />
              <span>E-mail*</span>
            </label>
            

          </div>

          <div className="checkbox-group">
            <label className={`checkbox-label ${errors.acceptsMarketing ? 'error' : ''}`}>
              <input
                type="checkbox"
                checked={formData.acceptsMarketing}
                onChange={handleInputChange('acceptsMarketing')}
                className="checkbox-input"
              />
              <span className="checkbox-custom">
                {formData.acceptsMarketing && <Check size={14} />}
              </span>
              <span className="checkbox-text">
                Aceito receber novas ofertas, promoções e atualizações da Icavel por e-mail e WhatsApp
              </span>
            </label>
            {errors.acceptsMarketing && (
              <span className="error-message">{errors.acceptsMarketing}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Iniciar Experiência
            <ArrowRight size={20} />
          </button>

          <p className="privacy-text">
            *Campos obrigatórios. Ao continuar, você concorda com nossos{' '}
            <a href="#" className="privacy-link">Termos de Uso</a> e{' '}
            <a href="#" className="privacy-link">Política de Privacidade</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;