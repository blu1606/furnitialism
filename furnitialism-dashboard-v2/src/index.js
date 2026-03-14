import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { App } from './App';
import { I18nProvider } from './i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <I18nProvider>
      <App />
    </I18nProvider>
  </BrowserRouter>
);
