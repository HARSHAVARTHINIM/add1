import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Create a root element
const rootElement = document.getElementById('root');

// Check if the root element exists
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
