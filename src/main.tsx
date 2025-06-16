import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const base = import.meta.env.PROD
  ? '/Dolor-Cabeza/'
  : '/';

const container = document.getElementById('root')!;
createRoot(container).render(
  <BrowserRouter basename={base}>
    <App />
  </BrowserRouter>
);
