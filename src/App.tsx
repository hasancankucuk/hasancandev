import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './shared/navbar';
import { About } from './pages/about';
import { Projects } from './pages/projects';
import { ArticleDetail } from './pages/projectDetails';
import FingerprintSDK from 'trace-sdk';


function App() {

  const Fingerprint = () => {
    FingerprintSDK().then((result) => {
      console.log('Fingerprint:', result);
    });
  }

  useEffect(() => {
    Fingerprint();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
