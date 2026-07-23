import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './portfolio-enhancements.css';
import AboutPage from './AboutPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AboutPage />
  </React.StrictMode>,
);
