import { createRoot } from 'react-dom/client';
import '@/assets/css/main.css';
import App from './App.tsx';
// import { StrictMode } from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
   <App />,
   // </StrictMode>,
);
