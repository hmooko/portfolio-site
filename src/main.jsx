import React from 'react';
import { createRoot } from 'react-dom/client';
import './cleanroom.css';
import CleanroomApp from './CleanroomApp.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CleanroomApp />
  </React.StrictMode>,
);
