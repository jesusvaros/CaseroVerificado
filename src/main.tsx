import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-11-30',
} as const

// Inicializar PostHog
const posthogClient = posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, options);

// Asignar PostHog al window para que esté disponible globalmente
(window).posthog = posthogClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthogClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>
);
