import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import nasaLogo from '../assets/nasa-logo.png';
import placeholderMulti from '../assets/late-pair.png';
import watch from '../assets/late-watch.png';
import schematic from '../assets/mid-schematic.png';
import earlyCar from '../assets/early-car.png';
import midWidget from '../assets/mid-widget.png';
import lateCharts from '../assets/late-charts.png';
import lateCollapse from '../assets/late-collapse.png';
import latePair from '../assets/late-pair.png';
import scenariokit from '../assets/scenariokit.png';

const AnimatedNumber = ({ endValue, duration = 2000, label }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const numberRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumber();
        }
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => {
      if (numberRef.current) {
        observer.unobserve(numberRef.current);
      }
    };
  }, [isVisible]);

  const animateNumber = () => {
    const startTime = Date.now();
    const startValue = 0;

    const updateNumber = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeOutCubic);

      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setCurrentValue(endValue);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  return (
    <div className="stat-item" ref={numberRef}>
      <div className={`stat-number ${isVisible ? 'animate' : ''}`}>
        {currentValue}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const PrototypingStats = () => {
  return (
    <div className="prototyping-stats">
      <AnimatedNumber endValue={9} label="Prototype Rounds" />
      <AnimatedNumber endValue={33} label="Test Participants" />
      <AnimatedNumber endValue={11} label="Deep Space Experts" />
    </div>
  );
};

const PrototypeCarousel = () => {
  const prototypeImages = [
    {
      id: 1,
      image: earlyCar,
      title: 'Early Wireframes',
      description: 'Initial concept sketches and user flow mapping'
    },
    {
      id: 2,
      image: midWidget,
      title: 'Mid-Fidelity Prototype 1',
      description: 'First interactive SwiftUI prototype focusing on watch interface'
    },
    {
      id: 3,
      image: schematic,
      title: 'Mid-Fidelity Prototype 2',
      description: 'iPad dashboard with basic system schematics'
    },
    {
      id: 4,
      image: lateCharts,
      title: 'User Testing Session',
      description: 'Testing with deep space experts and collecting feedback'
    },
    {
      id: 5,
      image: lateCollapse,
      title: 'High-Fidelity Prototype',
      description: 'Refined interface with improved information hierarchy'
    },
    {
      id: 6,
      image: latePair,
      title: 'Final Design System',
      description: 'Complete multi-device experience with attention guidance'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % prototypeImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + prototypeImages.length) % prototypeImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="prototype-carousel">
      <div className="carousel-content">
        <div className="carousel-image-container">
          {prototypeImages[currentSlide].image ? (
            <img
              src={prototypeImages[currentSlide].image}
              alt={prototypeImages[currentSlide].title}
              className="carousel-image"
            />
          ) : (
            <div className="placeholder-image">
              <div className="placeholder-content">
                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Prototype Image</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="carousel-info">
          <h4 className="carousel-title">{prototypeImages[currentSlide].title}</h4>
          <p className="carousel-description">{prototypeImages[currentSlide].description}</p>
          <div className="slide-counter">
            {currentSlide + 1} of {prototypeImages.length}
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="carousel-pagination">
        {prototypeImages.map((_, index) => (
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

const DesignPage = () => {
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
      <main className="design-content">
        {/* Page Header */}
        <section className="design-header">
          <h1 className="design-title">Design</h1>
          <p className="design-subtitle">Multi-device situational awareness for autonomous Mars missions</p>
        </section>

        {/* Main Design Overview */}
        <section className="design-overview">
          <div className="overview-image-container">
            <img src={placeholderMulti} alt="Olympus Dashboard Overview" className="overview-image" />
            <p className="image-caption">The Olympus dashboard spans Apple Watch and iPad to guide astronaut attention during off-nominal events</p>
          </div>
          
          <div className="overview-content">
            <p className="overview-text">
              The Olympus dashboard was designed to help a small, non-expert crew onboard a Mars-bound vehicle build situational awareness during off-nominal events—without immediate help from ground. Unlike Mission Control, where 22 disciplines monitor telemetry across hundreds of displays, our system had to enable 4–6 astronauts to make sense of distributed system data quickly, confidently, and independently.
            </p>
            
            <p className="overview-text">
              To meet this challenge, we designed a multi-device attention guidance system that spans an Apple Watch and an iPad. Alerts begin on the watch, using a structured summary modeled after MCC callouts—failure, impact, workaround, and time-to-effect—before directing the user to the tablet, where they can explore a timeline, system schematics, and sensor data. This pairing balances immediacy with depth.
            </p>
          </div>
        </section>

        {/* Multi-Device System */}
        <section className="multi-device-section">
          <h2 className="section-title">Multi-Device Attention Guidance</h2>
          <div className="device-flow">
            <div className="device-step">
              <div className="device-image-container">
                <img src={watch} alt="Apple Watch Alert Interface" className="device-image" />
              </div>
              <div className="device-content">
                <h3 className="device-title">Apple Watch: Immediate Alert</h3>
                <p className="device-description">
                  Structured summary using MCC callout format: failure, impact, workaround, and time-to-effect. Haptic feedback ensures attention without overwhelming crew during nominal operations.
                </p>
              </div>
            </div>
            
            <div className="device-step">
              <div className="device-image-container">
                <img src={schematic} alt="iPad Dashboard Interface" className="device-image" />
              </div>
              <div className="device-content">
                <h3 className="device-title">iPad: Deep Investigation</h3>
                <p className="device-description">
                  Interactive timeline, system schematics, and sensor data enable detailed analysis. Optimized for touch interaction during high-stress scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prototyping Process */}
        <section className="prototyping-section">
          <h2 className="section-title">Iterative Prototyping & Testing</h2>
          
          <PrototypingStats />
          
          {/* Replace the static image with the carousel */}
          <div className="prototyping-image-container">
            <PrototypeCarousel />
          </div>
          
          <p className="prototyping-description">
            We conducted nine rounds of prototyping—six mid-fidelity and three high-fidelity coded in SwiftUI—and tested with 33 participants, including 11 deep space experts. From these tests, several core design principles emerged:
          </p>
        </section>

        {/* Design Principles */}
        <section className="principles-section">
          <h2 className="section-title">Core Design Principles</h2>
          
          <div className="principles-grid">
            <div className="principle-card">
              <h3 className="principle-title">Information Scaffolding</h3>
              <p className="principle-description">
                We segmented the experience into a high-level summary view and a deeper affected systems view to mirror users' information-foraging patterns.
              </p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title">Time Salience and System Grouping</h3>
              <p className="principle-description">
                We prioritized display order based on urgency (e.g., an overload in 52 minutes appears above a depletion in six days) and grouped data by system to reduce cognitive load.
              </p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title">Schematic Abstraction</h3>
              <p className="principle-description">
                Instead of raw engineering schematics, we presented simplified system models that preserved critical relationships without overwhelming the user.
              </p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title">Integrated Data Views</h3>
              <p className="principle-description">
                We layered telemetry with shared time axes and interactions like scrubbing, so users could correlate data across multiple subsystems and see causal chains unfold.
              </p>
            </div>
          </div>
          
          <div className="principles-image-container">
            <img src={scenariokit} alt="Information Scaffolding Design" className="principles-image" />
            <p className="image-caption">Information scaffolding approach: high-level summary to detailed system analysis</p>
          </div>
        </section>

        {/* Current State */}
        <section className="current-state-section">
          <h2 className="section-title">Current State & Future Challenges</h2>
          
          <p className="current-state-text">
            What's left today is a synthesized dashboard experience that prioritizes clarity over coverage. The interface groups telemetry by affected systems and presents relevant schematics and data in collapsible "system cards," allowing users to scan critical subsystems first, then dive deeper into root causes as time and attention allow. This approach preserves the mental model of distributed system monitoring while making it digestible in a high-stakes, time-constrained environment.
          </p>
          
          <p className="current-state-text">
            That said, we're still early in the design phase. Our current prototype was scoped around a single, simplified scenario with just nine components across two systems. Real off-nominal events could involve dozens of subsystems and hundreds of interdependent variables. Scaling our design to support that level of complexity—without overwhelming the crew—is an open challenge.
          </p>
          
          <div className="key-questions">
            <h3 className="questions-title">Key Questions Remain:</h3>
            <ul className="questions-list">
              <li>How can the system triage and prioritize cascading failures across multiple domains in real time?</li>
              <li>How do we prevent critical context from being buried, while still avoiding information overload?</li>
              <li>Can we shift from exploratory dashboards to a more dynamic, narrative structure—where the system itself guides the crew through the timeline, cause, and possible interventions?</li>
            </ul>
          </div>
          
          <p className="current-state-text">
            These questions mark the beginning of our design journey, not the end. Our work this summer establishes a foundation: a functional, multi-device framework that orients the crew, directs attention, and enables investigation. But the path to a robust, scalable, autonomy-ready interface will require continued iteration, deeper integration of intelligent systems, and ongoing collaboration between design, engineering, and operations.
          </p>
        </section>

        {/* Design Tensions */}
        <section className="tensions-section">
          <h2 className="section-title">Navigating Design Tensions</h2>
          
          <div className="tensions-intro">
            <p className="tensions-text">
              Throughout our prototyping and testing, we encountered several recurring tensions—tradeoffs that shaped nearly every design decision. We believe these tensions will continue to define the design space for autonomous situational awareness systems:
            </p>
          </div>
          
          <div className="tensions-grid">
            <div className="tension-card">
              <h3 className="tension-title">Detect → Diagnose → Act vs. Anticipate → Attend → Analyze</h3>
              <p className="tension-description">
                We initially scoped our system around "understanding," not action. But test after test made one thing clear: separating understanding from action is artificial. Users consistently disengaged unless they had a clear goal or constraint. Exploration without stakes felt hollow.
              </p>
              <p className="tension-description">
                Even when we introduced a situational awareness questionnaire as a stand-in evaluation metric, it failed to reflect what mattered most: did the user understand the scenario fast enough to take the right action? Action, or at least a clear path to it, remains essential to engagement and design evaluation.
              </p>
            </div>
            
            <div className="tension-card">
              <h3 className="tension-title">Broad Vehicle Monitorability vs. Focused Anomaly Resolution</h3>
              <p className="tension-description">
                We began by sketching interfaces that could support routine, broad-scope monitoring (e.g. verifying system responses to planned procedures). But we quickly realized that designing for an anomaly—where failure may cascade quickly across systems—demanded a narrower and more synthesized experience. There simply isn't time to browse.
              </p>
              <p className="tension-description">
                Still, we believe these modes are not mutually exclusive. Future designs will likely include both: an everyday monitor and a high-stakes anomaly view, working in concert under a unified design system.
              </p>
            </div>
            
            <div className="tension-card">
              <h3 className="tension-title">Open Exploration vs. Directed Attention</h3>
              <p className="tension-description">
                As scenario complexity increased, so did the need for the interface to direct user attention. But with that direction came risk: directing attention toward something also means pulling it away from something else.
              </p>
              <p className="tension-description">
                Experts in our testing (e.g., flight controllers) preferred open exploration—jumping across telemetry, schematics, and timelines to build their own diagnoses. Novices, on the other hand, asked for more structure, often requesting "just tell me what to look at first."
              </p>
              <p className="tension-description">
                We hypothesize that deeper expertise increases tolerance for exploration, while lower expertise (and higher stress) requires clearer synthesis and scaffolding. Given astronauts' jack-of-all-trades profiles, it remains unclear exactly where they fall on this spectrum.
              </p>
            </div>
            
            <div className="tension-card">
              <h3 className="tension-title">Low vs. High System Intelligence and Reliance</h3>
              <p className="tension-description">
                A more intelligent system can take on more cognitive load for the user. But high reliance demands high accuracy—and in a context like deep space, a single mistake can be fatal. If the system fails to detect an anomaly, or wrongly classifies something as irrelevant, users may never even know what they're missing.
              </p>
              <p className="tension-description">
                Directed attention thus creates a paradox: it improves speed and interpretability, but risks hiding false negatives. This places a premium on transparency. Users must be able to interrogate system reasoning, validate data sources, and spot when the system might be wrong.
              </p>
            </div>
            
            <div className="tension-card">
              <h3 className="tension-title">Charts and Logs vs. Schematics and Causality</h3>
              <p className="tension-description">
                Text-based logs and line graphs may offer precision, but can be cognitively demanding. Our users, particularly non-experts, responded better to simplified schematics with clear system relationships and cascading visual effects. Yet we also saw how interpretability suffered when too much abstraction hid meaningful causal chains.
              </p>
              <p className="tension-description">
                This again reveals a tension: how much should the system explain, and how much should the user discover? Misinterpretation risk rises with open exploration, but so does adaptability.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="design-footer">
          <p className="footer-text">Design research conducted in collaboration with NASA Ames Human-Computer Interaction team</p>
        </section>
      </main>
    </div>
  );
};

export default DesignPage;