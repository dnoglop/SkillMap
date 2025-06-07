// --- START OF API KEY INJECTION (VITE-COMPATIBLE) ---

// Este bloco captura a chave de API da forma como o Vite a fornece
// e a torna disponível globalmente para o resto da aplicação.
if (typeof window !== "undefined") {
  // Assegura que o objeto global exista
  (window as any).SKILLMAP_CONFIG = (window as any).SKILLMAP_CONFIG || {};

  // O jeito Vite de acessar variáveis de ambiente: import.meta.env
  // Usamos a chave que definimos nos Secrets do Replit.
  const apiKeyVal = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKeyVal && typeof apiKeyVal === "string" && apiKeyVal.trim() !== "") {
    (window as any).SKILLMAP_CONFIG.API_KEY = apiKeyVal;
    // Log para debug no console do navegador
    console.log(
      "API Key injector (index.tsx): Chave encontrada via import.meta.env e definida em window.SKILLMAP_CONFIG.API_KEY.",
    );
  } else {
    // Esta mensagem agora será muito mais clara se o problema persistir.
    console.error(
      "API Key injector (index.tsx): Nenhuma chave de API encontrada em import.meta.env.VITE_GEMINI_API_KEY. Verifique se o Secret 'VITE_GEMINI_API_KEY' está configurado corretamente no Replit.",
    );
  }
}
// --- END OF API KEY INJECTION ---

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
