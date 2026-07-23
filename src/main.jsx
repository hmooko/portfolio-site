import React from 'react';
import { createRoot } from 'react-dom/client';
import './liftoff.css';
import './liftoff-fixes.css';
import LiftoffApp from './LiftoffApp.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiftoffApp />
  </React.StrictMode>,
);
