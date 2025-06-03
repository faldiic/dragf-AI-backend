import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import About from './routes/About';
import Contact from './routes/Contact';
import Support from './routes/Support';
import Analysis from './routes/Analysis';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/support" element={<Support />} />
      <Route path="/analysis" element={<Analysis />} />
    </Routes>
  );
}

export default App;
