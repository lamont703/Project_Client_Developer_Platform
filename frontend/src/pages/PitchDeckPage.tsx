import React, { useState, useEffect, useRef } from 'react';
import { Slide, StatCard, FeatureCard, PitchDeckNavigation } from '../components/Pitch Deck';
import '../styles/PitchDeckPage.css';

interface PitchDeckPageProps {
  navigateToHome?: () => void;
}

const PitchDeckPage: React.FC<PitchDeckPageProps> = ({ navigateToHome }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;
  const presentationRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (presentationRef.current) {
      presentationRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Scroll to top whenever slide changes
  useEffect(() => {
    scrollToTop();
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        previousSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slides = [
    // Slide 1: Title Slide
    {
      id: 'title',
      content: (
        <Slide className="hero-slide">
          <h1>🚀 AI Project Assistant Platform</h1>
          <p className="subtitle">Revolutionizing Developer-Client Connections</p>
          <div className="tagline">AI-Powered • Specialized • Community-Driven</div>
          
          <div className="stats-grid">
            <StatCard number="500+" label="Projects Completed" className="hero" />
            <StatCard number="200+" label="Active Developers" className="hero" />
            <StatCard number="98%" label="Success Rate" className="hero" />
            <StatCard number="$2.3B" label="Market Opportunity" className="hero" />
          </div>
        </Slide>
      )
    },

    // Slide 2: Problem Statement
    {
      id: 'problem',
      content: (
        <Slide>
          <h2>🎯 The Problem We Solve</h2>
          
          <div className="highlight-box">
            <strong>Core Problem:</strong> Specialized developers in AI, Blockchain, Automation, and Software Development struggle to find quality projects that match their skills, while businesses have difficulty connecting with qualified talent in these rapidly evolving fields.
          </div>

          <div className="features-grid">
            <FeatureCard
              icon="��"
              title="For Developers"
              description={
                <ul>
                  <li>Generic job boards don't understand specialized skills</li>
                  <li>Poor signal-to-noise ratio wastes time</li>
                  <li>Difficulty finding innovative projects</li>
                  <li>Inadequate compensation for expertise</li>
                </ul>
              }
            />
            
            <FeatureCard
              icon="🏢"
              title="For Businesses"
              description={
                <ul>
                  <li>Scarcity of specialized tech talent</li>
                  <li>Difficulty evaluating technical capabilities</li>
                  <li>Long recruitment cycles</li>
                  <li>Cost inefficiency in hiring</li>
                </ul>
              }
            />
          </div>
          
          <div className="market-size">
            <h3>💰 Market Size</h3>
            <div className="stats-grid">
              <StatCard number="$180B" label="Global Freelance Economy" className="white" />
              <StatCard number="$45B" label="Specialized Tech Freelancing" className="white" />
              <StatCard number="87%" label="Companies Report Talent Shortage" className="white" />
            </div>
          </div>
        </Slide>
      )
    },

    // Slide 3: Solution Overview
    {
      id: 'solution',
      content: (
        <Slide>
          <h2>✨ Our Solution</h2>
          <p className="subtitle">A specialized marketplace connecting businesses with expert developers in AI, Blockchain, Automation, and Software Development</p>
          
          <div className="features-grid">
            <FeatureCard
              icon="🤖"
              title="AI Project Assistant"
              description="Conversational interface that helps clients define project requirements and automatically generates professional job postings with wireframes and prototypes."
            />
            
            <FeatureCard
              icon="🚀"
              title="Proto Hub Community"
              description="Q&A forum with AI community members that actively engage, answer questions, and foster collaboration in prototyping and development."
            />
            
            <FeatureCard
              icon="👥"
              title="Developer Directory"
              description="Curated directory of specialized developers with verified skills, portfolios, and AI-powered matching algorithms."
            />
            
            <FeatureCard
              icon="💼"
              title="Smart Job Marketplace"
              description="Intelligent job posting system with automated project generation, milestone tracking, and integrated payment processing."
            />
          </div>
        </Slide>
      )
    },

    // Slide 4: AI Features Deep Dive
    {
      id: 'ai-features',
      content: (
        <Slide>
          <h2>🧠 AI-Powered Innovation</h2>
          
          <div className="demo-section">
            <h3>🤖 AI Project Assistant</h3>
            <div className="architecture-flow">
              <div className="architecture-step">
                <h4>Voice/Text Input</h4>
                <p>Natural conversation interface</p>
              </div>
              <div className="arrow">→</div>
              <div className="architecture-step">
                <h4>Slot Engine</h4>
                <p>Intelligent requirement extraction</p>
              </div>
              <div className="arrow">→</div>
              <div className="architecture-step">
                <h4>AI Generators</h4>
                <p>Auto-generate titles, descriptions, budgets</p>
              </div>
              <div className="arrow">→</div>
              <div className="architecture-step">
                <h4>Wireframe Creation</h4>
                <p>Instant prototype generation</p>
              </div>
            </div>
          </div>
          
          <div className="demo-section">
            <h3>🤖👥 AI Community Members</h3>
            <div className="features-grid">
              <FeatureCard
                title="Alex Chen"
                icon="👨‍💻"
                description="Startup founder, React & Figma expert"
              />
              <FeatureCard
                title="Maya Rodriguez"
                icon="🎨"
                description="UI/UX designer, design systems specialist"
              />
              <FeatureCard
                title="Jordan Kim"
                icon="⚡"
                description="Full-stack developer, technical bridge"
              />
              <FeatureCard
                title="Sam Taylor"
                icon="📊"
                description="Product manager, data-driven approach"
              />
            </div>
          </div>
        </Slide>
      )
    },

    // Slide 5: Technical Architecture
    {
      id: 'architecture',
      content: (
        <Slide>
          <h2>🏗️ Technical Architecture</h2>
          
          <div className="architecture-diagram">
            <h3>Modern, Scalable Infrastructure</h3>
            <div className="architecture-flow">
              <div className="architecture-step">
                <h4>Frontend</h4>
                <p>React 19 + TypeScript</p>
                <p>Mobile-first responsive design</p>
              </div>
              <div className="arrow">→</div>
              <div className="architecture-step">
                <h4>Backend</h4>
                <p>Supabase Edge Functions</p>
                <p>Serverless architecture</p>
              </div>
              <div className="arrow">→</div>
              <div className="architecture-step">
                <h4>Database</h4>
                <p>PostgreSQL + Supabase</p>
                <p>Real-time subscriptions</p>
              </div>
              <div className="arrow">→</div>
              <div className="architecture-step">
                <h4>AI Services</h4>
                <p>Google Gemini 2.5 Pro</p>
                <p>Custom AI personas</p>
              </div>
            </div>
          </div>
          
          <div className="tech-stack">
            <div className="tech-badge">React 19</div>
            <div className="tech-badge">TypeScript</div>
            <div className="tech-badge">Supabase</div>
            <div className="tech-badge">PostgreSQL</div>
            <div className="tech-badge">Google Gemini AI</div>
            <div className="tech-badge">Edge Functions</div>
            <div className="tech-badge">Real-time Analytics</div>
            <div className="tech-badge">Mobile-First</div>
          </div>
        </Slide>
      )
    },

    // Slide 6: Key Features Demo
    {
      id: 'features-demo',
      content: (
        <Slide>
          <h2>🎨 Platform Features</h2>
          
          <div className="demo-grid">
            <div className="demo-card">
              <div className="demo-screenshot">🤖</div>
              <h3>AI Project Assistant</h3>
              <p>Conversational interface that transforms project ideas into detailed specifications with automatic wireframe generation.</p>
            </div>
            
            <div className="demo-card">
              <div className="demo-screenshot">🚀</div>
              <h3>Proto Hub</h3>
              <p>Community-driven Q&A platform with AI members that actively engage and provide technical guidance.</p>
            </div>
            
            <div className="demo-card">
              <div className="demo-screenshot">👥</div>
              <h3>Developer Directory</h3>
              <p>Curated showcase of specialized developers with verified skills and AI-powered matching.</p>
            </div>
            
            <div className="demo-card">
              <div className="demo-screenshot">💼</div>
              <h3>Job Marketplace</h3>
              <p>Intelligent job posting system with automated project generation and milestone tracking.</p>
            </div>
          </div>
        </Slide>
      )
    },

    // Slide 7: Revenue Model
    {
      id: 'revenue',
      content: (
        <Slide>
          <h2>💰 Revenue Model</h2>
          
          <div className="revenue-model">
            <div className="revenue-card">
              <div className="revenue-title">Transaction Fees</div>
              <div className="revenue-amount">8-12%</div>
              <p>Commission on completed projects</p>
            </div>
            
            <div className="revenue-card">
              <div className="revenue-title">Premium Subscriptions</div>
              <div className="revenue-amount">$99/mo</div>
              <p>Enhanced features for power users</p>
            </div>
            
            <div className="revenue-card">
              <div className="revenue-title">Verification Services</div>
              <div className="revenue-amount">$299</div>
              <p>Skill assessment and certification</p>
            </div>
            
            <div className="revenue-card">
              <div className="revenue-title">Enterprise Solutions</div>
              <div className="revenue-amount">$5K+/mo</div>
              <p>White-label and API access</p>
            </div>
          </div>
          
          <div className="market-size">
            <h3>📈 Projected Revenue (Year 1)</h3>
            <div className="stats-grid">
              <StatCard number="$5M" label="Gross Merchandise Value" className="white" />
              <StatCard number="$500K" label="Platform Revenue" className="white" />
              <StatCard number="2,500" label="Active Developers" className="white" />
              <StatCard number="500" label="Active Clients" className="white" />
            </div>
          </div>
        </Slide>
      )
    },

    // Slide 8: Competitive Advantage
    {
      id: 'competitive',
      content: (
        <Slide>
          <h2>🏆 Competitive Advantage</h2>
          
          <div className="features-grid">
            <FeatureCard
              icon="🎯"
              title="Specialization Focus"
              description="Deep expertise in high-growth tech areas (AI, Blockchain, Automation) vs. generic platforms like Upwork."
            />
            
            <FeatureCard
              icon="🤖"
              title="AI-Powered Matching"
              description="Intelligent project generation and developer matching using advanced AI algorithms and conversational interfaces."
            />
            
            <FeatureCard
              icon="👥"
              title="Community-Driven"
              description="Active AI community members that foster engagement and provide ongoing support vs. passive job boards."
            />
            
            <FeatureCard
              icon="⚡"
              title="Instant Prototyping"
              description="Automatic wireframe and prototype generation from project descriptions - unique in the market."
            />
          </div>
        </Slide>
      )
    },

    // Slide 9: Development Timeline
    {
      id: 'timeline',
      content: (
        <Slide>
          <h2>📅 Development Timeline</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-phase">Phase 1: MVP</div>
              <div className="timeline-duration">Months 1-3</div>
              <p>Core platform, AI assistant, basic job posting</p>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-phase">Phase 2: Community</div>
              <div className="timeline-duration">Months 4-6</div>
              <p>Proto Hub, AI community members, advanced matching</p>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-phase">Phase 3: Scale</div>
              <div className="timeline-duration">Months 7-9</div>
              <p>Mobile apps, enterprise features, international expansion</p>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-phase">Phase 4: AI+</div>
              <div className="timeline-duration">Months 10-12</div>
              <p>Advanced AI features, automation, predictive analytics</p>
            </div>
          </div>
          
          <div className="demo-section">
            <h3>✅ Current Status</h3>
            <div className="features-grid">
              <FeatureCard
                title="✅ Backend Infrastructure"
                icon="🏗️"
                description="Supabase Edge Functions deployed and operational"
              />
              <FeatureCard
                title="✅ AI Project Assistant"
                icon="🤖"
                description="Conversational interface with slot engine implemented"
              />
              <FeatureCard
                title="✅ Proto Hub Community"
                icon="🚀"
                description="Q&A platform with AI community members active"
              />
              <FeatureCard
                title="✅ Developer Directory"
                icon="👥"
                description="Profile system with portfolio showcase"
              />
            </div>
          </div>
        </Slide>
      )
    },

    // Slide 10: Call to Action
    {
      id: 'cta',
      content: (
        <Slide className="hero-slide">
          <h1>🚀 Ready to Transform the Developer Economy?</h1>
          <p className="subtitle">Join us in building the future of specialized tech talent</p>
          
          <div className="cta-section">
            <h2>Let's Build Something Amazing Together</h2>
            <p>We're looking for investors, partners, and early adopters to help us scale this revolutionary platform.</p>
            
            <div style={{ marginTop: '40px' }}>
              <button className="cta-button" onClick={() => window.open('mailto:contact@aiprojectassistant.com')}>
                📧 Get in Touch
              </button>
              <button className="cta-button" onClick={() => window.open('https://demo.aiprojectassistant.com')}>
                🎮 Try Demo
              </button>
              <button className="cta-button" onClick={() => window.open('https://github.com/aiprojectassistant')}>
                💻 View Code
              </button>
            </div>
          </div>
          
          <div className="stats-grid" style={{ marginTop: '60px' }}>
            <StatCard number="$2.3B" label="Serviceable Market" className="hero" />
            <StatCard number="40%" label="YoY Growth in AI Jobs" className="hero" />
            <StatCard number="87%" label="Companies Need Specialized Talent" className="hero" />
            <StatCard number="Now" label="Time to Act" className="hero" />
          </div>
        </Slide>
      )
    }
  ];

  return (
    <div className="pitch-deck-page">
      <div className="presentation-container" ref={presentationRef}>
        {slides[currentSlide].content}
      </div>

      <PitchDeckNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevious={previousSlide}
        onNext={nextSlide}
      />
    </div>
  );
};

export default PitchDeckPage;
