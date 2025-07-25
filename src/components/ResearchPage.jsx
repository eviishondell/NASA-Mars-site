import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import nasaLogo from '../assets/nasa-logo.png';
import darkModeVideo from '../assets/Dark_Mode_V3_Compressed.mp4';

const ResearchPage = () => {
  const location = useLocation();
  
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
        <button className="mobile-menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Page Content */}
      <main className="research-content">
        {/* Primary Research Questions Section */}
        <section className="research-section">
          <h1 className="research-title">Primary Research Questions</h1>
          <p className="research-subtitle">How might we...</p>
          
          <div className="questions-grid">
            <div className="question-card">
              <p className="question-text">Display information relevant to time-sensitive decision making?</p>
            </div>
            <div className="question-card">
              <p className="question-text">Decrease crew's cognitive load when analyzing telemetry related to the off-nominal event?</p>
            </div>
            <div className="question-card">
              <p className="question-text">Help the crew build a mental model of the vehicle?</p>
            </div>
            <div className="question-card">
              <p className="question-text">Help the crew come make sense of the specifics of the off-nominal event?</p>
            </div>
            <div className="question-card">
              <p className="question-text">Make the crew confident in their understanding of the off-nominal event and their initial response plan?</p>
            </div>
          </div>
        </section>

        {/* User Flow Section */}
        <section className="userflow-section">
          <h2 className="userflow-title">User Flow</h2>
          
          <div className="flow-steps">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <p className="step-text">
                  To test our prototypes, we simulated an off-nominal event to populate the dashboard, an 11" iPad, with system-generated widgets from telemetry data - all coded in Swift & XCode.
                </p>
              </div>
            </div>
            
            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <p className="step-text">
                  We brought users to the dashboard from an Apple watch alert and allowed them to navigate through it unmoderated. We recorded their observations, interactions, and questions as they worked through it.
                </p>
              </div>
            </div>
            
            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <p className="step-text">
                  Once the user believed they had an adequate understanding of the scenario, they let us know and then took an 8-question situation awareness quiz on specifics of the scenario.
                </p>
              </div>
            </div>
            
            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <p className="step-text">
                  The quiz asked qualitative and quantitative questions about the user's understanding of the 4 key stages of our scenario, confidence in explaining it to the rest of their astronaut crew, and to explain what their proposed first step would be.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section">
          <h2 className="video-title">User Testing Insights</h2>
          <p className="video-subtitle">Dark Mode V3 Screen Recording</p>
          
          <div className="video-container">
            <video 
              className="video-player" 
              controls 
              poster="/path-to-video-thumbnail.jpg"
            >
              <source src={darkModeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="quotes-section">
            <div className="quote-card">
              <p className="quote-text">"This is pretty easy to navigate. It's not overloaded which is nice."</p>
            </div>
            <div className="quote-card highlight">
              <p className="quote-text">"This is exactly the game you want to play - simplifying [telemetry] for non-experts."</p>
            </div>
          </div>
        </section>

        {/* Final Evaluation Section */}
        <section className="evaluation-section">
          <h2 className="evaluation-title">Final Evaluation</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Users Tested</div>
              <div className="stat-detail">2 EIO heads, UX designer, response engineer, systems engineer</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Success Rate</div>
              <div className="stat-detail">All users successfully relayed accurate event representation</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">16</div>
              <div className="stat-label">Avg Minutes</div>
              <div className="stat-detail">Time-to-understanding (range: 11-20 minutes)</div>
            </div>
          </div>
          
          <div className="key-findings">
            <h3 className="findings-title">Key Findings</h3>
            <ul className="findings-list">
              <li>All users identified Bus 2 power issues and star tracker rerouting</li>
              <li>Successfully identified water pump impeller as potential root cause</li>
              <li>Dashboard design applicable to other off-nominal scenarios</li>
              <li>Schematic and affected components were most valuable cards</li>
            </ul>
          </div>
        </section>

        {/* Research Insights Section */}
        <section className="insights-section">
          <h2 className="insights-title">Primary User Research Insights</h2>
          
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-number">01</div>
              <div className="insight-content">
                <h4 className="insight-heading">Mental Model Formation</h4>
                <p className="insight-text">
                  In an off-nominal situation without ground access, forming a mental model across systems to identify what's wrong is more important than doing so deeply in one system like a flight controller would.
                </p>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-number">02</div>
              <div className="insight-content">
                <h4 className="insight-heading">Attention Management</h4>
                <p className="insight-text">
                  To ensure users rightsize the severity & urgency of off-nominal events while managing their cognitive load, the dashboard should guide their attention towards the most crucial information and hold their focus on it.
                </p>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-number">03</div>
              <div className="insight-content">
                <h4 className="insight-heading">Visual Knowledge Transfer</h4>
                <p className="insight-text">
                  To facilitate better, faster knowledge transfer of off-nominal telemetry, use visual modalities that allow non-experts to understand what happened, where, & when at a glance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proof of Concept Section */}
        <section className="proof-section">
          <h2 className="proof-title">Proof of Concept & Delivery</h2>
          
          <div className="validation-content">
            <div className="validation-block">
              <h3 className="validation-heading">Validated Design Principles</h3>
              <div className="principles-tags">
                <span className="principle-tag">Segmented Controls</span>
                <span className="principle-tag">Progressive Disclosure</span>
                <span className="principle-tag">Selective Attention</span>
                <span className="principle-tag">Glanceability</span>
                <span className="principle-tag">Hands-free Alerts</span>
                <span className="principle-tag">Multi-device Handoffs</span>
              </div>
            </div>
            
            <div className="validation-block">
              <h3 className="validation-heading">Validated Visualizations</h3>
              <ul className="visualizations-list">
                <li>Timeline that moves left to right in chronological order</li>
                <li>Schematic-driven system views</li>
                <li>Manipulable graphs of multiple systems</li>
                <li>Cascading gauge timer</li>
                <li>System lists sorted by criticality and power draw</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResearchPage;