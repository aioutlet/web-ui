import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeAppInsights } from './telemetry';

// Initialize Application Insights for browser telemetry
// Connection string is injected at build time via REACT_APP_APPINSIGHTS_CONNECTION_STRING
initializeAppInsights();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
