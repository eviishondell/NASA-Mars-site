import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
    <div className="prototype-slider">
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
        <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="slider-pagination">
        {prototypes.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="nav">
      <div className="logo">
          <img src={nasaLogo} alt="NASA" className="nasa-logo" />
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
          <h1 className="hero-title">Mission Anomaly Response System</h1>
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
          <Link to="/research" className="card">
            <div className="card-image">
              <img src={researchImage} alt="Research" className="card-img" />
            </div>
            <h4 className="card-title">Research</h4>
          </Link>

          <Link to="/design" className="card">
            <div className="card-image">
              <img src={designImage} alt="Design" className="card-img" />
            </div>
            <h4 className="card-title">Design</h4>
          </Link>

          <Link to="/technical" className="card">
            <div className="card-image">
              <img src={technicalImage} alt="Technical" className="card-img" />
            </div>
            <h4 className="card-title">Technical</h4>
          </Link>
        </div>
      </section>


      {/* Our Product Section */}
      <section className="product-section">
        <div className="product-content">
          <h2 className="product-title">Our Product</h2>
          <PrototypeSlider />
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