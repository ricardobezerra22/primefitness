import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { preventBrowserConflicts } from './utils/ethereum-fix';
import App from './App.tsx';
import './index.css';

// Prevent browser extension conflicts and handle Lucide icon loading issues
preventBrowserConflicts();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
