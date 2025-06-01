import { createRoot } from 'react-dom/client';
import '@/assets/css/main.css';
import App from './App.tsx';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <App />,
   </StrictMode>,
);
