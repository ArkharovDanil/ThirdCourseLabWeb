import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './components/MainPage';
import CreateTrack from './components/CreateTrack';

function App() {
  return (
    <div className="App">
      <h1>Клуб любителей современных Бардов</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/create' element={<CreateTrack />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
