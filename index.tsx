
// --- START OF API KEY INJECTION ---
// Este bloco tenta capturar a chave de API das variáveis de ambiente
// que o sistema de build do Vercel deve substituir, e a torna disponível globalmente.
// Deve ser uma das primeiras coisas a executar.
if (typeof window !== 'undefined') {
  // Assegura que SKILLMAP_CONFIG exista, embora deva ser inicializado no index.html
  (window as any).SKILLMAP_CONFIG = (window as any).SKILLMAP_CONFIG || {};

  const apiKeyVal = process.env.NEXT_PUBLIC_API_KEY || 
                    process.env.VITE_API_KEY || 
                    process.env.REACT_APP_API_KEY || 
                    process.env.API_KEY; // Último fallback, geralmente para desenvolvimento local

  if (apiKeyVal && typeof apiKeyVal === 'string' && apiKeyVal.trim() !== '') {
    (window as any).SKILLMAP_CONFIG.API_KEY = apiKeyVal;
    // Log para debug no console do navegador
    console.log("API Key injector (index.tsx): Chave encontrada e definida em window.SKILLMAP_CONFIG.API_KEY. (Valor omitido por segurança)");
  } else {
    console.warn("API Key injector (index.tsx): Nenhuma chave de API encontrada nas variações de process.env (NEXT_PUBLIC_API_KEY, VITE_API_KEY, etc.).");
  }
}
// --- END OF API KEY INJECTION ---

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);