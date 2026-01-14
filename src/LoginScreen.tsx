// src/LoginScreen.tsx
import React, { useState } from 'react';
import { User, Phone, Check, ArrowRight } from 'lucide-react';
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
    acceptsMarketing: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>(
    {}
  );

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome obrigatório';

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido';
    }

    if (!formData.acceptsMarketing) {
      newErrors.acceptsMarketing = 'Aceite os termos';
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem('userData', JSON.stringify(formData));
    onLoginSuccess(formData);
  };

  return (
    <div className="login-container">
      <div className="login-card landscape">

        <aside className="login-side">
          <div className="brand">
            <h1>ICAVEL</h1>
            <span>Caminhões & Ônibus</span>
          </div>

          <div className="side-content">
            <h2>Bem-vindo ao configurador Icavel</h2>
            <p>
              Uma experiência inteligente para encontrar o caminhão ideal para
              o seu negócio.
            </p>
          </div>
        </aside>

        <section className="login-main">
          <h3>Identifique-se para continuar</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <User size={20} /> Nome completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={errors.name ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label>
                <Phone size={20} /> Telefone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(45) 99999-9999"
                className={errors.phone ? 'error' : ''}
              />
            </div>

            <label className={`checkbox ${errors.acceptsMarketing ? 'error' : ''}`}>
              <input
                type="checkbox"
                checked={formData.acceptsMarketing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    acceptsMarketing: e.target.checked,
                  })
                }
              />
              <span>
                <Check size={14} />
              </span>
              Aceito receber comunicações da Icavel
            </label>

            <button type="submit">
              Iniciar experiência
              <ArrowRight />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginScreen;
