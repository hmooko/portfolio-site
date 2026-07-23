import React from 'react';
import { createRoot } from 'react-dom/client';
import './editorial.css';
import EditorialApp from './EditorialApp.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditorialApp />
  </React.StrictMode>,
);
