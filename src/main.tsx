// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { printConsoleBanner } from './printConsoleBanner';
import 'lenis/dist/lenis.css';
import './index.css';

// Module top level, not an effect: printed once per page load, StrictMode does not repeat it
printConsoleBanner();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
