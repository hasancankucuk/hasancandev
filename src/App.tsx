import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home';
import Navbar from './shared/navbar';
import { About } from './pages/about';
import { Projects } from './pages/projects';
import {ArticleDetail} from './pages/projectDetails';

function App() {
  return (
<BrowserRouter>
<Navbar/>
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ArticleDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
