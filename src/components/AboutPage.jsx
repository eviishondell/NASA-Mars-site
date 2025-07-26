import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import nasaLogo from '../assets/nasa-logo.png';
import riya from '../assets/riya.png';
import julia from '../assets/julia.jpeg';
import carter from '../assets/carter.png';
import evolone from '../assets/evolone.jpeg';
import chance from '../assets/chance.jpeg';
import group from '../assets/group.JPG';
import nasa from '../assets/nasa.svg';
import cmu from '../assets/cmu.png';
const AboutPage = () => {
  const location = useLocation();

  // Team member data - replace with actual images and LinkedIn URLs
  const teamMembers = [
    {
      id: 1,
      name: "Chance Castaneda",
      image: chance, // Replace with actual image import
      linkedinUrl: "https://www.linkedin.com/in/chance-castaneda/"
    },
    {
      id: 2,
      name: "Evolone Layne",
      image: evolone, // Replace with actual image import
      linkedinUrl: "https://www.linkedin.com/in/evolonelayne/"
    },
    {
      id: 3,
      name: "Julia Liu",
      image: julia, // Replace with actual image import
      linkedinUrl: "https://www.linkedin.com/in/liu--julia/"
    },
    {
      id: 4,
      name: "Riya Mody",
      image: riya, // Replace with actual image import
      linkedinUrl: "https://www.linkedin.com/in/riyamody/"
    },
    {
      id: 5,
      name: "Carter Owen",
      image: carter, // Replace with actual image import
      linkedinUrl: "https://www.linkedin.com/in/carterowen-/"
    }
  ];

  return (
    <div className="page">
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">
          <img src={nasaLogo} alt="NASA" className="nasa-logo" />
        </div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/research" className={`nav-link ${location.pathname === '/research' ? 'active' : ''}`}>Research</Link>
          <Link to="/design" className={`nav-link ${location.pathname === '/design' ? 'active' : ''}`}>Design</Link>
          <Link to="/technical" className={`nav-link ${location.pathname === '/technical' ? 'active' : ''}`}>Technical</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
        </div>
        <button className="mobile-menu" aria-label="Navigation Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Page Content */}
      <main className="about-content">
        <div className="about-header">
          <h1 className="about-title">About</h1>
          <p className="about-subtitle">Team Olympus & Our Mission</p>
          
          {/* Mission Statement */}
          <div className="mission-statement">
            <p className="mission-text">
              Team Olympus is dedicated to advancing Mars mission operations through innovative AI-powered 
              training systems. Our M.A.R.S. platform combines cutting-edge technology with human-centered 
              design to prepare astronauts for the challenges of deep space exploration.
            </p>
                        {/* Group Photo */}
                        <div className="group-photo-container">
              <img 
                src={group} 
                alt="Team Olympus Group Photo" 
                className="group-photo"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="team-section">
          <h2 className="team-title">Meet the Team</h2>
          
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                {/* Member Image or Placeholder */}
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="member-image"
                  />
                ) : (
                  <div className="member-placeholder">
                    👤
                  </div>
                )}
                
                {/* Member Info */}
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  
                  {/* LinkedIn Button */}
                  <a 
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-button"
                  >
                    <svg 
                      className="linkedin-icon" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="tech-footer">
          <div className="footer-content">
            <p className="footer-text">©2025 NASA x CMU MHCI, Team Olympus</p>
            <img src={nasa} alt="NASA" className="footer-logo" />
            <img src={cmu} alt="CMU" className="footer-logo" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;