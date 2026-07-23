import React from 'react';
import { createRoot } from 'react-dom/client';
import './experimental.css';
import './experimental-ko.css';
import './monochrome.css';
import './readability.css';
import ExperimentalApp from './ExperimentalApp.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExperimentalApp />
  </React.StrictMode>,
);
