import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
      title: 'Mission Anomaly Response System',
      description: 'Real-time monitoring dashboard for Mars mission critical events and system anomalies.',
      buttonText: 'Explore Dashboard',
      navigationPath: '/design'
    },
    {
      id: 2,
      image: scenariokit,
      title: 'ScenarioKit',
      description: 'LLM-powered scenario generation tool for simulating mission anomalies.',
      buttonText: 'Explore ScenarioKit',
      navigationPath: '/technical'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % prototypes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + prototypes.length) % prototypes.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleExploreClick = () => {
    const currentPrototype = prototypes[currentSlide];
    if (currentPrototype.navigationPath) {
      navigate(currentPrototype.navigationPath);
    }
  };

  return (
    <div className="prototype-slider" aria-label="Product showcase carousel">
      <div className="slider-content">
        <div className="prototype-image-container">
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
            className="prototype-explore-btn"
            onClick={handleExploreClick}
            disabled={!prototypes[currentSlide].navigationPath}
          >
            {prototypes[currentSlide].buttonText}
          </button>
        </div>
      </div>
      
      <div className="slider-controls">
        <button
          className="slider-arrow slider-arrow-left"
          onClick={prevSlide}
          aria-label="Previous prototype"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          className="slider-arrow slider-arrow-right"
          onClick={nextSlide}
          aria-label="Next prototype"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="slider-pagination">
        {prototypes.map((prototype, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`View ${prototype.title}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="homepage">
      {/* Skip link helps screen reader and keyboard users jump to main content */}
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

      {/* Navigation */}
      <nav className="nav" id="primary-navigation" aria-label="Primary Navigation">
        <div className="logo">
          <img src={nasaLogo} alt="NASA" className="nasa-logo" />
        </div>
        <div className="nav-links" role="menubar" aria-label="Site sections">
          <Link to="/" className="nav-link" role="menuitem">Home</Link>
          <Link to="/research" className="nav-link" role="menuitem">Research</Link>
          <Link to="/design" className="nav-link" role="menuitem">Design</Link>
          <Link to="/technical" className="nav-link" role="menuitem">Technical</Link>
          <Link to="/about" className="nav-link" role="menuitem">About</Link>
        </div>
        <button
          className="mobile-menu"
          aria-label="Navigation Menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((s) => !s)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">Mission Anomaly Response System</h1>
          <p className="hero-subtitle">Team Olympus</p>
          
          {/* Mars Image */}
{/* Mars Image */}
<div className="mars-container">
  <figure className="mars-figure">
    <img 
      src={marsImage} 
      alt="Mars surface terrain" 
      className="mars-image" 
    />
    {/* <figcaption className="mars-caption">
      Close-up photo of Mars surface with visible terrains
    </figcaption> */}
  </figure>
</div>
        </div>
      </section>

      {/* Mission Statement */}
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

      {/* Gradient Background Section */}
      <section className="gradient-section" aria-labelledby="features-title">
        {/* <h2 id="features-title" className="features-title">Features</h2> */}
        {/* Feature Cards */}
        <div className="cards-container" role="list" aria-label="Feature cards">
          <Link to="/research" className="card" role="listitem" aria-label="Research">
            <div className="card-image">
              <img src={researchImage} alt="Research: people collaborating around design artifacts" className="card-img" />
            </div>
            <h4 className="card-title">Research</h4>
          </Link>

          <Link to="/design" className="card" role="listitem" aria-label="Design">
            <div className="card-image">
              <img src={designImage} alt="Design: interface wireframes on a table" className="card-img" />
            </div>
            <h4 className="card-title">Design</h4>
          </Link>

          <Link to="/technical" className="card" role="listitem" aria-label="Technical">
            <div className="card-image">
              <img src={technicalImage} alt="Technical: code and system architecture" className="card-img" />
            </div>
            <h4 className="card-title">Technical</h4>
          </Link>
        </div>
      </section>

      {/* Our Product Section */}
      <section className="product-section" aria-labelledby="product-title">
        <div className="product-content">
          <h2 id="product-title" className="product-title">Our Product</h2>
          <PrototypeSlider />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer" role="contentinfo">
        <div className="footer-content">
          <p className="footer-text">©2025 NASA x CMU MHCI, Team Olympus</p>
          <img src={nasa} alt="NASA logo" className="footer-logo" />
          <img src={cmu} alt="CMU" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
};

/* focus-on-route helper: focuses main on navigation change to aid screen readers */
const FocusMainOnRouteChange = () => {
  const location = useLocation();
  useEffect(() => {
    const main = document.getElementById('main');
    if (main) {
      main.focus();
    }
  }, [location]);
  return null;
};

const App = () => {
  return (
    <Router>
      <FocusMainOnRouteChange />
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