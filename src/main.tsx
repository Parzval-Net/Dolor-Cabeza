import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  // <— HashRouter en lugar de BrowserRouter
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
createRoot(container).render(
  <HashRouter>
    <App />
  </HashRouter>
);
