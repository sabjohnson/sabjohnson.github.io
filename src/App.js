import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Landing from './Landing/Landing';
import Background from './Background/Background';
import Projects from './Projects/Projects';
import Experience from './Experience/Experience';
import VerticalEmail from './VerticalEmail/VerticalEmail';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo">
            <a href="#about">
            <img src="/assets/logo-sab.png" alt="Sabrina J." className="logo-image" />
            </a>
          </div>
          <ul>
            <li><a href="#background"><span>01.</span> About</a></li>
            <li><a href="#projects"><span>02.</span> Projects</a></li>
            <li><a href="#experience"><span>03.</span> Experience</a></li>
            <li>
              <a href="/resume-general.pdf" target="_blank" rel="noopener noreferrer">
                <span>04.</span> Resume
              </a>
            </li>
          </ul>
        </nav>

        <Sidebar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<Background />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>

          <Background />
          <Projects />
          <Experience />
          <small>Built and designed by Sabrina Johnson.</small>
        </div>
      </div>
    </Router>
  );
}

export default App;