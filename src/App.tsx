import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import "./styles/global.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
