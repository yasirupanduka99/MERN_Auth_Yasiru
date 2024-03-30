import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ItemContextProvider } from './context/ItemContext';
import { AuthContextProvider } from './context/AuthContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
