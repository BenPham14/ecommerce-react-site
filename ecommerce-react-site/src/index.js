import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import New from './pages/new';
import Men from './pages/men'
import Women from './pages/women';
import Kids from './pages/kids';
import Cart from './pages/cart'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/new' element={<New />} />
      <Route path='/men' element={<Men />} />
      <Route path='/women' element={<Women />} />
      <Route path='/kids' element={<Kids />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  </BrowserRouter>
);