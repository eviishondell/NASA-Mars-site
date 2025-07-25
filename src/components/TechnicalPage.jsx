import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import swiftLogo from '../assets/swift.png';
import xcodeLogo from '../assets/xcode.png';
import ipadPreview from '../assets/ipad-preview.png';
import anthropicIcon from '../assets/anthropic.png';
import placeholderMulti from '../assets/placeholder-multi.png';
import nasaLogo from '../assets/nasa-logo.png';
import scenariokit from '../assets/scenariokit.png';
const JsonTypingAnimation = () => {
  const jsonCode = `{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 2048,
  "messages": [
    {
      "role": "system",
      "content": "You are a Mars mission scenario generator. Generate realistic off-nominal events with accurate telemetry data, timeline progression, and system interactions."
    },
    {
      "role": "user", 
      "content": "Generate a power system anomaly scenario with 30-minute time-to-effect, affecting Bus 2 systems including star tracker rerouting and thermal impacts."
    }
  ],
  "temperature": 0.7,
  "stream": true
}`;

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (currentIndex < jsonCode.length && !isComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + jsonCode[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 25);
      
      return () => clearTimeout(timeout);
    } else if (currentIndex >= jsonCode.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, jsonCode, isComplete]);

  return (
    <div className="json-code-block">
      <div className="code-header">
        <div className="code-window-controls">
          <div className="code-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="code-title">scenario_generator.json</span>
          <div className="code-actions">
            <span className="code-action">×</span>
          </div>
        </div>
      </div>
      <div className="code-editor">
        <div className="line-numbers">
          {displayedText.split('\n').map((_, index) => (
            <span key={index} className="line-number">{index + 1}</span>
          ))}
        </div>
        <pre className="code-content">
          <code>
            <span className="json-brace">{'{'}</span>
            {displayedText.slice(1, -1).split('\n').slice(1, -1).map((line, index) => {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('"') && trimmedLine.includes(':')) {
                const [key, ...valueParts] = trimmedLine.split(':');
                const value = valueParts.join(':').trim();
                return (
                  <div key={index} className="code-line">
                    <span className="json-key">{key}</span>
                    <span className="json-colon">:</span>
                    <span className="json-value">{value}</span>
                  </div>
                );
              } else if (trimmedLine === '{' || trimmedLine === '}') {
                return (
                  <div key={index} className="code-line">
                    <span className="json-brace">{trimmedLine}</span>
                  </div>
                );
              } else if (trimmedLine === '[' || trimmedLine === ']' || trimmedLine === '],') {
                return (
                  <div key={index} className="code-line">
                    <span className="json-bracket">{trimmedLine}</span>
                  </div>
                );
              }
              return (
                <div key={index} className="code-line">
                  {trimmedLine}
                </div>
              );
            })}
            <span className="json-brace">{'}'}</span>
            {!isComplete && <span className="typing-cursor">|</span>}
          </code>
        </pre>
      </div>
    </div>
  );
};

const TechnicalPage = () => {
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
      <main className="technical-content">
        {/* Development Stack Section */}
        <section className="tech-section">
          <h1 className="tech-title">Development Architecture</h1>
          <p className="tech-subtitle">Native iOS development with AI-powered scenario generation</p>
          
          <div className="tech-icons">
            <div className="tech-icon">
              <img src={swiftLogo} alt="Swift" className="icon-image" />
              <span className="icon-label">Swift 5.9</span>
            </div>
            <div className="tech-icon">
              <img src={xcodeLogo} alt="Xcode" className="icon-image" />
              <span className="icon-label">Xcode 15</span>
            </div>
          </div>
        </section>

        {/* ScenarioKit Framework Section */}
        <section className="scenariokit-section">
          <h2 className="scenariokit-title">ScenarioKit Framework</h2>
          <p className="scenariokit-subtitle">Custom Swift framework for dynamic scenario generation and telemetry simulation</p>
          
          <div className="scenariokit-features">
            <div className="feature-grid">
              <div className="feature-card">
                <h4 className="feature-title">Scenario Generation Engine</h4>
                <p className="feature-description">
                  Built a custom Swift framework that interfaces with Claude's API to generate realistic Mars mission scenarios. 
                  The system uses structured prompts to create coherent off-nominal events with accurate timelines, system interactions, and cascading effects.
                </p>
              </div>
              
              <div className="feature-card">
                <h4 className="feature-title">Time-to-Effect Controls</h4>
                <p className="feature-description">
                  Implemented dynamic time compression allowing users to set scenario urgency from 15 minutes to 8 hours. 
                  The slider interface controls how quickly events escalate, affecting crew decision-making pressure and system response requirements.
                </p>
              </div>
              
              <div className="feature-card">
                <h4 className="feature-title">Multi-System Anomaly Types</h4>
                <p className="feature-description">
                  Created categorized anomaly generators for Power Systems, Thermal Management, Atmospheric Control, Hardware Failures, and Resource Degradation. 
                  Each category has specific telemetry patterns and downstream impact models.
                </p>
              </div>
            </div>
          </div>
          
          <div className="scenariokit-images">
            <div className="image-row">
              <div className="scenario-image">
                <img src={scenariokit} alt="Scenario Generation Interface" className="scenario-img" />
                <p className="image-caption">Dynamic scenario generation with time-to-effect slider and anomaly type selection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Platform Development Section */}
        <section className="platform-section">
          <h2 className="platform-title">Multi-Platform Development</h2>
          <p className="platform-subtitle">Seamless handoffs across Apple ecosystem for mission-critical operations</p>
          
          <div className="devices-container">
            <img src={placeholderMulti} alt="Apple Devices" className="devices-image" />
          </div>
          
          <div className="platform-details">
            <div className="platform-feature">
              <h4 className="platform-feature-title">Apple Watch Integration</h4>
              <p className="platform-feature-desc">
                Initial alert system triggers on astronaut's Apple Watch with haptic feedback and critical system status. 
                Designed for immediate attention without overwhelming crew during nominal operations.
              </p>
            </div>
            
            <div className="platform-feature">
              <h4 className="platform-feature-title">iPad Dashboard Hub</h4>
              <p className="platform-feature-desc">
                Primary interface for detailed analysis featuring interactive schematics, real-time telemetry graphs, 
                and AI-generated scenario progression. Optimized for touch interaction during high-stress situations.
              </p>
            </div>
            
            <div className="platform-feature">
              <h4 className="platform-feature-title">iPhone Quick Actions</h4>
              <p className="platform-feature-desc">
                Companion app for rapid system checks and crew communication. Features voice-to-text logging 
                and streamlined emergency procedures accessible during EVA operations.
              </p>
            </div>
          </div>
        </section>

        {/* AI-Powered Dashboard Views */}
        <section className="ai-dashboard-section">
          <h2 className="ai-title">AI-Powered Dashboard Population</h2>
          <p className="ai-subtitle">Claude LLM integration for intelligent scenario simulation and telemetry generation</p>
          
          <div className="dashboard-container">
            <img src={ipadPreview} alt="Dashboard Interface" className="dashboard-image" />
          </div>
          
          <div className="ai-integration-details">
            <div className="integration-block">
              <h4 className="integration-title">Real-Time Scenario Processing</h4>
              <p className="integration-desc">
                When users configure a scenario using our generation interface, the system sends structured prompts to Claude's API. 
                The LLM generates realistic telemetry data, timeline progressions, and system interaction models that populate dashboard widgets in real-time.
              </p>
            </div>
            
            <div className="integration-block">
              <h4 className="integration-title">Intelligent Widget Arrangement</h4>
              <p className="integration-desc">
                Claude analyzes the scenario complexity and automatically arranges dashboard widgets by priority. 
                Critical systems appear prominently while secondary information is contextually organized for optimal cognitive load management.
              </p>
            </div>
            
            <div className="integration-block">
              <h4 className="integration-title">Dynamic Telemetry Simulation</h4>
              <p className="integration-desc">
                The AI generates mathematically accurate telemetry curves, system interdependencies, and failure cascades. 
                Each data point follows realistic spacecraft system behavior patterns derived from NASA operational data and mission protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Scenario Configuration Interface */}
        <section className="scenario-config-section">
          <h2 className="config-title">Scenario Configuration System</h2>
          <p className="config-subtitle">Intuitive controls for generating diverse off-nominal situations</p>
          
          <div className="config-features">
            <div className="config-row">
              <div className="config-card">
                <h4 className="config-card-title">Time-to-Effect Slider</h4>
                <div className="slider-demo">
                  <div className="slider-track">
                    <div className="slider-progress" style={{width: '60%'}}></div>
                    <div className="slider-thumb"></div>
                  </div>
                  <div className="slider-labels">
                    <span>15 min</span>
                    <span className="current-value">30 min</span>
                    <span>8 hours</span>
                  </div>
                </div>
                <p className="config-desc">
                  Controls scenario urgency and crew decision-making pressure. Shorter timeframes create high-stress training scenarios 
                  while longer durations allow for detailed analysis and systematic troubleshooting practice.
                </p>
              </div>
              
              <div className="config-card">
                <h4 className="config-card-title">Anomaly Type Selection</h4>
                <div className="anomaly-types">
                  <div className="anomaly-chip selected">⚡ Power System</div>
                  <div className="anomaly-chip">🌡️ Thermal</div>
                  <div className="anomaly-chip">💨 Atmospheric</div>
                  <div className="anomaly-chip">🔧 Hardware</div>
                  <div className="anomaly-chip">📦 Resource</div>
                </div>
                <p className="config-desc">
                  Each anomaly type generates unique system interactions and failure patterns. Power anomalies affect multiple subsystems, 
                  while atmospheric issues focus on life support and environmental controls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SwiftUI Framework Implementation */}
        <section className="charts-section">
          <h2 className="charts-title">SwiftUI Framework Implementation</h2>
          <p className="charts-description">
            Built using modern SwiftUI declarative syntax with real-time data binding and interactive chart components. 
            The framework leverages Swift Charts for telemetry visualization, Combine for reactive data flows, 
            and custom view modifiers for consistent Mars mission theming throughout the interface.
          </p>
          
          <div className="chart-tags">
            <a 
              href="https://developer.apple.com/swift/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="chart-tag"
              onClick={(e) => {
                console.log('Swift link clicked');
                window.open('https://developer.apple.com/swift/', '_blank');
              }}
            >
              Swift
            </a>
            <a 
              href="https://developer.apple.com/xcode/swiftui/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="chart-tag"
              onClick={(e) => {
                console.log('SwiftUI link clicked');
                window.open('https://developer.apple.com/xcode/swiftui/', '_blank');
              }}
            >
              SwiftUI
            </a>
            <a 
              href="https://developer.apple.com/documentation/charts" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="chart-tag"
              onClick={(e) => {
                console.log('Charts link clicked');
                window.open('https://developer.apple.com/documentation/charts', '_blank');
              }}
            >
              Charts
            </a>
            <a 
              href="https://developer.apple.com/documentation/combine" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="chart-tag"
              onClick={(e) => {
                console.log('Combine link clicked');
                window.open('https://developer.apple.com/documentation/combine', '_blank');
              }}
            >
              Combine
            </a>
          </div>
        </section>

        {/* Claude API Integration Section */}
        <section className="api-section">
          <div className="api-icon">
            <img src={anthropicIcon} alt="Anthropic" className="anthropic-image" />
          </div>
          <h2 className="api-title">Claude API Integration Architecture</h2>
          <p className="api-description">
            Leveraging Claude-3 Sonnet's advanced reasoning capabilities to generate realistic Mars mission scenarios. 
            Our system uses structured prompts, streaming responses, and custom post-processing to create coherent, 
            scientifically-accurate off-nominal events that challenge astronaut decision-making skills.
          </p>
          
          <div className="api-workflow">
            <div className="workflow-step">
              <div className="step-icon">1</div>
              <div className="step-content">
                <h4>Scenario Parameters</h4>
                <p>User selects anomaly type, time-to-effect, and affected systems through the ScenarioKit interface</p>
              </div>
            </div>
            
            <div className="workflow-step">
              <div className="step-icon">2</div>
              <div className="step-content">
                <h4>Structured Prompt Generation</h4>
                <p>Swift backend constructs detailed prompts with mission context, system specifications, and realism constraints</p>
              </div>
            </div>
            
            <div className="workflow-step">
              <div className="step-icon">3</div>
              <div className="step-content">
                <h4>Claude API Processing</h4>
                <p>Streaming API responses provide real-time scenario generation with telemetry data, timeline events, and system interactions</p>
              </div>
            </div>
            
            <div className="workflow-step">
              <div className="step-icon">4</div>
              <div className="step-content">
                <h4>Dashboard Population</h4>
                <p>Parsed JSON data dynamically populates dashboard widgets, charts, and alert systems for immediate crew interaction</p>
              </div>
            </div>
          </div>
          
          <a 
            href="https://docs.anthropic.com/en/api/getting-started" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="anthropic-docs-button"
            onClick={(e) => {
              console.log('Anthropic API docs link clicked');
              window.open('https://docs.anthropic.com/en/api/getting-started', '_blank');
            }}
          >
            View API Documentation
          </a>
          
          <div className="json-placeholder">
            <JsonTypingAnimation />
          </div>
        </section>

        {/* Performance & Optimization */}
        <section className="performance-section">
          <h2 className="performance-title">Performance & Optimization</h2>
          
          <div className="performance-metrics">
            <div className="metric-card">
            <div className="metric-number">&lt;200ms</div>
              <div className="metric-label">API Response Time</div>
              <div className="metric-desc">Streaming responses ensure rapid dashboard updates</div>
            </div>
            
            <div className="metric-card">
              <div className="metric-number">60 FPS</div>
              <div className="metric-label">Chart Animation</div>
              <div className="metric-desc">Smooth telemetry visualization with Core Animation</div>
            </div>
            
            <div className="metric-card">
              <div className="metric-number">99.9%</div>
              <div className="metric-label">Offline Capability</div>
              <div className="metric-desc">Local scenario caching for mission-critical reliability</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="tech-footer">
          <p className="footer-text">Integrated with Linear for agile development tracking</p>
        </section>
      </main>
    </div>
  );
};

export default TechnicalPage;