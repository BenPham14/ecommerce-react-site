import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import React from 'react';
import New from './pages/new';
import Men from './pages/men';
import Women from './pages/women';
import Other from './pages/other';
import Cart from './pages/cart';
import Details from './pages/details';
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import { AppContextProvider } from "./context/AppContext.js";

function App() {

  return (
    <AppContextProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />
          <Route path='/other' element={<Other />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/confirmation' element={<Confirmation />} />
        </Routes>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
