// src/index.tsx - Conteúdo correto
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // Isso está correto se o arquivo existir

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)