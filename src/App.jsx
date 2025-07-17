import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import marsImage from './assets/mars.webp';
import ipadPreview from './assets/ipad-preview.png';
import ResearchPage from './components/ResearchPage';
import DesignPage from './components/DesignPage';
import TechnicalPage from './components/TechnicalPage';
import AboutPage from './components/AboutPage';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">
          logo
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/research" className="nav-link">Research</Link>
          <Link to="/design" className="nav-link">Design</Link>
          <Link to="/technical" className="nav-link">Technical</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        <button className="mobile-menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Whatever we call it</h1>
          <p className="hero-subtitle">Team Olympus</p>
          
          {/* Mars Image */}
          <div className="mars-container">
            <img 
              src={marsImage} 
              alt="Mars"
              className="mars-image"
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission">
        <div className="mission-content">
          <h2 className="mission-title">Creating Situational Awareness</h2>
          <h3 className="mission-subtitle">for Mars-Bound Crews</h3>
          <p className="mission-description">
            A dynamic design system allowing astronauts to<br />
            monitor the progression of off nominal events
          </p>
        </div>
      </section>

      {/* Gradient Background Section */}
      <section className="gradient-section">
        {/* Feature Cards */}
        <div className="cards-container">
          <div className="card">
            <div className="card-image">
              <div className="placeholder">□</div>
            </div>
            <h4 className="card-title">Research</h4>
          </div>

          <div className="card">
            <div className="card-image">
              <div className="placeholder">□</div>
            </div>
            <h4 className="card-title">Design</h4>
          </div>

          <div className="card">
            <div className="card-image">
              <div className="placeholder">□</div>
            </div>
            <h4 className="card-title">Technical</h4>
          </div>
        </div>
      </section>

      {/* iPad Dashboard Preview */}
      <section className="dashboard-preview">
        <div className="ipad-container">
          <img 
            src={ipadPreview}
            alt="iPad Dashboard Preview"
            className="ipad-image"
          />
        </div>
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route path="/technical" element={<TechnicalPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;