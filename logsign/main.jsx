import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import AppRouter from './AppRouter'; // Import your router component

const root = createRoot(document.getElementById('root')); // Create a root
root.render(<AppRouter />); // Render your router component
