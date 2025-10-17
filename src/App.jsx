import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './index.css';
import nasaLogo from './assets/nasa-logo.png';
import marsImage from './assets/mars.webp';
import ipadPreview from './assets/ipad-preview.png';
import ResearchPage from './components/ResearchPage';
import DesignPage from './components/DesignPage';
import TechnicalPage from './components/TechnicalPage';
import AboutPage from './components/AboutPage';
import researchImage from './assets/research.jpg';
import designImage from './assets/design.jpg';
import technicalImage from './assets/technical.jpg';
import scenariokit from './assets/scenariokit.png';
import nasa from './assets/nasa.svg';
import cmu from './assets/cmu.png';

const PrototypeSlider = () => {
  const navigate = useNavigate();
  const prototypes = [
    {
      id: 1,
      image: ipadPreview,
      title: 'Mission Anomaly Response System — dashboard preview',
      description: 'Real-time monitoring dashboard for Mars mission critical events and system anomalies.',
      buttonText: 'Explore Dashboard',
      navigationPath: '/design'
    },
    {
      id: 2,
      image: scenariokit,
      title: 'ScenarioKit — scenario generation',
      description: 'LLM-powered scenario generation tool for simulating mission anomalies.',
      buttonText: 'Explore ScenarioKit',
      navigationPath: '/technical'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % prototypes.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + prototypes.length) % prototypes.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const handleExploreClick = () => {
    const current = prototypes[currentSlide];
    if (current.navigationPath) navigate(current.navigationPath);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'Enter') {
      const btn = document.getElementById(`prototype-explore-btn-${currentSlide}`);
      if (btn) btn.focus();
    }
  };

  return (
    <div
      className="prototype-slider"
      role="region"
      aria-label="Prototype carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
      >
        {`${prototypes[currentSlide].title}. ${prototypes[currentSlide].description}`}
      </div>

      <div className="slider-content">
        <div className="prototype-image-container" id={`prototype-image-${prototypes[currentSlide].id}`}>
          <img
            src={prototypes[currentSlide].image}
            alt={prototypes[currentSlide].title}
            className="prototype-image"
          />
        </div>

        <div className="prototype-info">
          <h3 className="prototype-title">{prototypes[currentSlide].title}</h3>
          <p className="prototype-description">{prototypes[currentSlide].description}</p>
          <button
            id={`prototype-explore-btn-${currentSlide}`}
            className="prototype-explore-btn"
            onClick={handleExploreClick}
            disabled={!prototypes[currentSlide].navigationPath}
            aria-disabled={!prototypes[currentSlide].navigationPath}
            style={{
              opacity: prototypes[currentSlide].navigationPath ? 1 : 0.6,
              cursor: prototypes[currentSlide].navigationPath ? 'pointer' : 'default'
            }}
          >
            {prototypes[currentSlide].buttonText}
          </button>
        </div>
      </div>

      <div className="slider-controls">
        <button
          className="slider-arrow slider-arrow-left"
          onClick={prevSlide}
          aria-label="Previous slide"
          aria-controls={`prototype-image-${prototypes[currentSlide].id}`}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="slider-arrow slider-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
          aria-controls={`prototype-image-${prototypes[currentSlide].id}`}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="slider-pagination" role="tablist" aria-label="Slide selection">
        {prototypes.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}${index === currentSlide ? ', current slide' : ''}`}
            aria-pressed={index === currentSlide}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="homepage">
      <a
        href="#main"
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden'
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '8px';
          e.currentTarget.style.top = '8px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.padding = '8px';
          e.currentTarget.style.zIndex = 1000;
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-10000px';
        }}
      >
        Skip to content
      </a>

      <header>
        <nav className="nav" aria-label="Primary Navigation">
          <div className="logo">
            <img src={nasaLogo} alt="NASA wordmark" className="nasa-logo" />
          </div>
          <div className="nav-links">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/research" className="nav-link">Research</NavLink>
            <NavLink to="/design" className="nav-link">Design</NavLink>
            <NavLink to="/technical" className="nav-link">Technical</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
          </div>
          <button className="mobile-menu" aria-label="Navigation Menu" aria-expanded="false">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <h1 id="hero-title" className="hero-title">Mission Anomaly Response System</h1>
            <p className="hero-subtitle">Team Olympus</p>

            <div className="mars-container">
              <img
                src={marsImage}
                alt="Close-up photo of Mars surface with visible terrains"
                className="mars-image"
              />
            </div>
          </div>
        </section>

        <section className="mission" aria-labelledby="mission-title">
          <div className="mission-content">
            <h2 id="mission-title" className="mission-title">Creating Situational Awareness</h2>
            <h3 className="mission-subtitle">for Mars-Bound Crews</h3>
            <p className="mission-description">
              A dynamic design system allowing astronauts to<br />
              monitor the progression of off-nominal events
            </p>
          </div>
        </section>

        <section className="gradient-section" aria-labelledby="features-title">
          <h2 id="features-title" className="visually-hidden">Features</h2>
          <div className="cards-container">
            <NavLink to="/research" className="card" aria-label="Research">
              <div className="card-image">
                <img src={researchImage} alt="Research: people collaborating around design artifacts" className="card-img" />
              </div>
              <h4 className="card-title">Research</h4>
            </NavLink>

            <NavLink to="/design" className="card" aria-label="Design">
              <div className="card-image">
                <img src={designImage} alt="Design: interface wireframes on a table" className="card-img" />
              </div>
              <h4 className="card-title">Design</h4>
            </NavLink>

            <NavLink to="/technical" className="card" aria-label="Technical">
              <div className="card-image">
                <img src={technicalImage} alt="Technical: code and system architecture" className="card-img" />
              </div>
              <h4 className="card-title">Technical</h4>
            </NavLink>
          </div>
        </section>

        <section className="product-section" aria-labelledby="product-title">
          <div className="product-content">
            <h2 id="product-title" className="product-title">Our Product</h2>
            <PrototypeSlider />
          </div>
        </section>
      </main>

      <footer className="home-footer" role="contentinfo">
        <div className="footer-content">
          <p className="footer-text">©2025 NASA x CMU MHCI, Team Olympus</p>
          <img src={nasa} alt="NASA logo" className="footer-logo" />
          <img src={cmu} alt="Carnegie Mellon University logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
};

const App = () => (
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

export default App;