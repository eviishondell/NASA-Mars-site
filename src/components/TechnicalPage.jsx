import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

const TechnicalPage = () => {
  const location = useLocation();
  
  return (
    <div className="page">
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">
          logo
        </div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/research" className={`nav-link ${location.pathname === '/research' ? 'active' : ''}`}>Research</Link>
          <Link to="/design" className={`nav-link ${location.pathname === '/design' ? 'active' : ''}`}>Design</Link>
          <Link to="/technical" className={`nav-link ${location.pathname === '/technical' ? 'active' : ''}`}>Technical</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
        </div>
        <button className="mobile-menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Page Content */}
      <main className="page-content">
        <div className="page-header">
          <h1 className="page-title">Technical</h1>
          <p className="page-subtitle">Technical Implementation & Architecture</p>
        </div>
        
        <div className="content-placeholder">
          <p>Technical content will go here...</p>
        </div>
      </main>
    </div>
  );
};

export default TechnicalPage;