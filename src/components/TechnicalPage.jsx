import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import swiftLogo from '../assets/swift.png';
import xcodeLogo from '../assets/xcode.png';
import ipadPreview from '../assets/ipad-preview.png';
import anthropicIcon from '../assets/anthropic.png';
import placeholderMulti from '../assets/late-pair.png';
import nasaLogo from '../assets/nasa-logo.png';
import scenariokit from '../assets/scenariokit.png';
import nasa from '../assets/nasa.svg';
import cmu from '../assets/cmu.png';

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
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (currentIndex < jsonCode.length && !isComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + jsonCode[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 25);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= jsonCode.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, jsonCode, isComplete]);

  const innerLines =
    displayedText.length > 2
      ? displayedText.slice(1, -1).split('\n').slice(1, -1)
      : [];

  return (
    <div className="json-code-block">
      <div className="code-header">
        <div className="code-window-controls">
          <div className="code-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="code-title">scenario_generator.json</span>
          <div className="code-actions">
            <button
              type="button"
              className="read-full-btn"
              onClick={() => setShowFull((s) => !s)}
              aria-expanded={showFull}
              aria-label={showFull ? 'Hide full JSON request' : 'Show full JSON request'}
            >
              {showFull ? 'Hide full request' : 'Read full request'}
            </button>
          </div>
        </div>
      </div>

      <div className="code-editor" aria-label="Example Claude API request (visual representation)">
        <div className="line-numbers" aria-hidden="true">
          {displayedText.split('\n').map((_, index) => (
            <span key={index} className="line-number">
              {index + 1}
            </span>
          ))}
        </div>

        <pre className="code-content">
          <code>
            <span className="json-brace">{'{'}</span>
            {innerLines.map((line, index) => {
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
              } else if (['[', ']', '],'].includes(trimmedLine)) {
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
            {!isComplete && <span className="typing-cursor" aria-hidden="true">|</span>}
          </code>
        </pre>
      </div>

      {showFull && (
        <div className="full-json-container">
          <h3 className="sr-only">Complete API Request JSON</h3>
          <pre className="full-json">
            <code>{jsonCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

const TechnicalPage = () => {
  const location = useLocation();

  return (
    <div className="page">
      <nav className="nav" role="navigation" aria-label="Primary Navigation">
        <div className="logo" aria-hidden="false">
          <img src={nasaLogo} alt="NASA wordmark" className="nasa-logo" />
        </div>

        <div className="nav-links" role="menubar" aria-label="Site sections">
          <Link to="/" role="menuitem" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/research" role="menuitem" className={`nav-link ${location.pathname === '/research' ? 'active' : ''}`}>
            Research
          </Link>
          <Link to="/design" role="menuitem" className={`nav-link ${location.pathname === '/design' ? 'active' : ''}`}>
            Design
          </Link>
          <Link to="/technical" role="menuitem" className={`nav-link ${location.pathname === '/technical' ? 'active' : ''}`}>
            Technical
          </Link>
          <Link to="/about" role="menuitem" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
        </div>

        <button className="mobile-menu" aria-label="Navigation Menu" aria-expanded="false">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <main id="main" className="technical-content" role="main" tabIndex={-1}>
        <section className="tech-section" role="region" aria-labelledby="tech-title">
          <h1 id="tech-title" className="tech-title">Development Architecture</h1>
          <p className="tech-subtitle">Native iOS development with AI-powered scenario generation</p>

          <div className="tech-icons" aria-hidden="false">
            <div className="tech-icon">
              <img src={swiftLogo} alt="Swift logo" className="icon-image" />
              <span className="icon-label">Swift 5.9</span>
            </div>
            <div className="tech-icon">
              <img src={xcodeLogo} alt="Xcode logo" className="icon-image" />
              <span className="icon-label">Xcode 15</span>
            </div>
          </div>
        </section>

        <section className="scenariokit-section" role="region" aria-labelledby="scenariokit-title">
          <h2 id="scenariokit-title" className="scenariokit-title">ScenarioKit Framework</h2>
          <p className="scenariokit-subtitle">Custom Swift framework for dynamic scenario generation and telemetry simulation</p>

          <div className="scenariokit-features">
            <div className="feature-grid">
              <article className="feature-card" aria-labelledby="feature-1">
                <h4 id="feature-1" className="feature-title">Scenario Generation Engine</h4>
                <p className="feature-description">
                  Built a custom Swift framework that interfaces with Claude's API to generate realistic Mars mission scenarios. The system uses structured prompts to create coherent off-nominal events with accurate timelines, system interactions, and cascading effects.
                </p>
              </article>

              <article className="feature-card" aria-labelledby="feature-2">
                <h4 id="feature-2" className="feature-title">Time-to-Effect Controls</h4>
                <p className="feature-description">
                  Implemented dynamic time compression allowing users to set scenario urgency from 15 minutes to 60 minutes. The slider interface controls how quickly events escalate, affecting crew decision-making pressure and system response requirements.
                </p>
              </article>

              <article className="feature-card" aria-labelledby="feature-3">
                <h4 id="feature-3" className="feature-title">Multi-System Anomaly Types</h4>
                <p className="feature-description">
                  Created categorized anomaly generators for Power Systems, Thermal Management, Atmospheric Control, Hardware Failures, and Resource Degradation. Each category has specific telemetry patterns and downstream impact models.
                </p>
              </article>
            </div>
          </div>

          <div className="scenariokit-images" aria-hidden="false">
            <div className="image-row">
              <figure className="scenario-image">
                <img src={scenariokit} alt="Scenario generation interface" className="scenario-img" style={{ border: 'none', boxShadow: 'none' }} />
                <figcaption className="image-caption">Dynamic scenario generation with time-to-effect slider and anomaly type selection</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="ai-dashboard-section" role="region" aria-labelledby="ai-title">
          <h2 id="ai-title" className="ai-title">AI-Powered Dashboard Population</h2>
          <p className="ai-subtitle">Claude LLM integration for intelligent scenario simulation and telemetry generation</p>

          <div className="dashboard-container">
  <figure className="dashboard-figure">
    <img 
      src={ipadPreview} 
      alt="Mission anomaly response dashboard" 
      className="dashboard-image" 
    />
    <figcaption className="image-caption">
      iPad dashboard interface showing telemetry charts, alert widgets, and scenario timeline
    </figcaption>
  </figure>
</div>

          <div className="ai-integration-details">
            <article className="integration-block" aria-labelledby="int-1">
              <h4 id="int-1" className="integration-title">Real-Time Scenario Processing</h4>
              <p className="integration-desc">
                When users configure a scenario using our generation interface, the system sends structured prompts to Claude's API. The LLM generates realistic telemetry data, timeline progressions, and system interaction models that populate dashboard widgets in real-time.
              </p>
            </article>

            <article className="integration-block" aria-labelledby="int-2">
              <h4 id="int-2" className="integration-title">Intelligent Widget Arrangement</h4>
              <p className="integration-desc">
                Claude analyzes the scenario complexity and automatically arranges dashboard widgets by priority. Critical systems appear prominently while secondary information is contextually organized for optimal cognitive load management.
              </p>
            </article>

            <article className="integration-block" aria-labelledby="int-3">
              <h4 id="int-3" className="integration-title">Dynamic Telemetry Simulation</h4>
              <p className="integration-desc">
                The AI generates mathematically accurate telemetry curves, system interdependencies, and failure cascades. Each data point follows realistic spacecraft system behavior patterns derived from NASA operational data and mission protocols.
              </p>
            </article>
          </div>
        </section>

        <section className="scenario-config-section" role="region" aria-labelledby="config-title">
          <h2 id="config-title" className="config-title">Scenario Configuration System</h2>
          <p className="config-subtitle">Intuitive controls for generating diverse off-nominal situations</p>

          <div className="config-features">
            <div className="config-row">
              <div className="config-card" role="group" aria-labelledby="slider-title">
                <h4 id="slider-title" className="config-card-title">Time-to-Effect Slider</h4>

                <div className="slider-demo" role="group" aria-label="Time to effect demonstration">
                  <div className="slider-track" role="presentation" aria-hidden="true">
                    <div className="slider-progress" style={{ width: '49%' }} aria-hidden="true" />
                    <div
                      className="slider-thumb"
                      style={{ left: 'calc(49% - 8px)' }}
                      role="slider"
                      tabIndex={0}
                      aria-valuemin={15}
                      aria-valuemax={60}
                      aria-valuenow={37}
                      aria-label="Time to effect slider example"
                    />
                  </div>

                  <div className="slider-labels" aria-hidden="false">
                    <span>15 min</span>
                    <span className="current-value" aria-live="polite">37 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                <p className="config-desc">Controls scenario urgency and crew decision-making pressure. Shorter timeframes create high-stress training scenarios while longer durations allow for detailed analysis and systematic troubleshooting practice.</p>
              </div>

              <div className="config-card" role="group" aria-labelledby="anomaly-title">
                <h4 id="anomaly-title" className="config-card-title">Anomaly Type Selection</h4>

                <div className="anomaly-types" role="toolbar" aria-label="Anomaly type selection">
                  <button className="anomaly-chip selected" aria-pressed="true">⚡ Power System</button>
                  <button className="anomaly-chip" aria-pressed="false">🌡️ Thermal</button>
                  <button className="anomaly-chip" aria-pressed="false">💨 Atmospheric</button>
                  <button className="anomaly-chip" aria-pressed="false">🔧 Hardware</button>
                  <button className="anomaly-chip" aria-pressed="false">📦 Resource</button>
                </div>

                <p className="config-desc">Each anomaly type generates unique system interactions and failure patterns. Power anomalies affect multiple subsystems, while atmospheric issues focus on life support and environmental controls.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="charts-section" role="region" aria-labelledby="charts-title">
          <h2 id="charts-title" className="charts-title">SwiftUI Framework Implementation</h2>
          <p className="charts-description">Built using modern SwiftUI declarative syntax with real-time data binding and interactive chart components. The framework leverages Swift Charts for telemetry visualization, Combine for reactive data flows, and custom view modifiers for consistent Mars mission theming throughout the interface.</p>

          <div className="chart-tags" role="list" aria-label="Related technologies">
            <a href="https://developer.apple.com/swift/" target="_blank" rel="noopener noreferrer" className="chart-tag" role="listitem">Swift</a>
            <a href="https://developer.apple.com/xcode/swiftui/" target="_blank" rel="noopener noreferrer" className="chart-tag" role="listitem">SwiftUI</a>
            <a href="https://developer.apple.com/documentation/charts" target="_blank" rel="noopener noreferrer" className="chart-tag" role="listitem">Charts</a>
            <a href="https://developer.apple.com/documentation/combine" target="_blank" rel="noopener noreferrer" className="chart-tag" role="listitem">Combine</a>
          </div>
        </section>

        <section className="api-section" role="region" aria-labelledby="api-title">
          <div className="api-icon" aria-hidden="false">
            <img src={anthropicIcon} alt="Anthropic logo" className="anthropic-image" />
          </div>

          <h2 id="api-title" className="api-title">Claude API Integration Architecture</h2>
          <p className="api-description">Leveraging Claude-3 Sonnet's advanced reasoning capabilities to generate realistic Mars mission scenarios. Our system uses structured prompts, streaming responses, and custom post-processing to create coherent, scientifically-accurate off-nominal events that challenge astronaut decision-making skills.</p>

          <div style={{ textAlign: 'center', width: '100%', margin: '2rem 0' }}>
            <a href="https://docs.anthropic.com/en/api/getting-started" target="_blank" rel="noopener noreferrer" className="anthropic-docs-button" style={{ display: 'inline-block' }}>
              View API Documentation (opens in a new tab)
            </a>
          </div>

          <div className="api-workflow" role="list" aria-label="API workflow steps">
            <div className="workflow-step" role="listitem">
              <div className="step-icon">1</div>
              <div className="step-content">
                <h4>Scenario Parameters</h4>
                <p>User selects anomaly type, time-to-effect, and affected systems through the ScenarioKit interface</p>
              </div>
            </div>

            <div className="workflow-step" role="listitem">
              <div className="step-icon">2</div>
              <div className="step-content">
                <h4>Structured Prompt Generation</h4>
                <p>Swift backend constructs detailed prompts with mission context, system specifications, and realism constraints</p>
              </div>
            </div>

            <div className="workflow-step" role="listitem">
              <div className="step-icon">3</div>
              <div className="step-content">
                <h4>Claude API Processing</h4>
                <p>Streaming API responses provide real-time scenario generation with telemetry data, timeline events, and system interactions</p>
              </div>
            </div>

            <div className="workflow-step" role="listitem">
              <div className="step-icon">4</div>
              <div className="step-content">
                <h4>Dashboard Population</h4>
                <p>Parsed JSON data dynamically populates dashboard widgets, charts, and alert systems for immediate crew interaction</p>
              </div>
            </div>
          </div>

          <div className="json-placeholder" aria-hidden="false">
            <JsonTypingAnimation />
          </div>
        </section>

        <section className="performance-section" role="region" aria-labelledby="performance-title">
          <h2 id="performance-title" className="performance-title">Design & Optimization</h2>

          <div className="performance-metrics" role="list" aria-label="Performance and optimization highlights">
            <div className="metric-card" role="listitem">
              <div className="metric-number">11"</div>
              <div className="metric-label">iPad Pro Optimized</div>
              <div className="metric-desc">Interface designed specifically for 11-inch iPad Pro display</div>
            </div>

            <div className="metric-card" role="listitem">
              <div className="metric-number">Dark Mode</div>
              <div className="metric-label">Mission Environment</div>
              <div className="metric-desc">Reduces eye strain during extended Mars mission simulations</div>
            </div>

            <div className="metric-card" role="listitem">
              <div className="metric-number">Touch First</div>
              <div className="metric-label">Gesture Controls</div>
              <div className="metric-desc">Intuitive multi-touch interactions for high-pressure scenarios</div>
            </div>
          </div>
        </section>

        <footer className="tech-footer" role="contentinfo" aria-label="Footer">
          <div className="footer-content">
            <p className="footer-text">©2025 NASA x CMU MHCI, Team Olympus</p>
            <img src={nasa} alt="NASA logo" className="footer-logo" />
            <img src={cmu} alt="Carnegie Mellon University logo" className="footer-logo" />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default TechnicalPage;