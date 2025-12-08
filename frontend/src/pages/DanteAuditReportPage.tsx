import React, { useEffect, useState, useRef } from 'react';
import '../styles/Professional Freelancer Audit/ProfessionalFreelancerAuditReportPage.css';
import ReportHeader from '../components/Professional Freelancer Audit/ReportHeader';
import AuditSummarySection from '../components/Professional Freelancer Audit/AuditSummarySection';
import CoreBottleneckSection from '../components/Professional Freelancer Audit/CoreBottleneckSection';
import STARRoadmapSection from '../components/Professional Freelancer Audit/STARRoadmapSection';
import NextStepsSection from '../components/Professional Freelancer Audit/NextStepsSection';
import ReportSidebar from '../components/Professional Freelancer Audit/ReportSidebar';

interface AuditReportData {
  clientName?: string;
  clientNiche?: string;
  overallScore?: number;
  overallScoreLabel?: string;
  bottleneck?: {
    type: string;
    description: string;
  };
  foundationalStrengths?: {
    platform?: boolean;
    showcase?: boolean;
    disciplinedToolStack?: boolean;
    retention?: boolean;
  };
  starRoadmap?: Array<{
    phase: 'Showcase' | 'Tools' | 'Acquisition' | 'Retention';
    requiredFocus: string;
    implementationGoal: string;
    benefit: string;
  }>;
}

interface DanteAuditReportPageProps {
  navigateToHome?: () => void;
}

const DanteAuditReportPage: React.FC<DanteAuditReportPageProps> = ({ 
  navigateToHome
}) => {
  const [activeSection, setActiveSection] = useState<string>('header');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Dante's specific report data
  const danteReportData: AuditReportData = {
    clientName: 'Dante',
    clientNiche: 'Back-End Software Developer / AI Systems Integrator',
    overallScore: 3.5,
    overallScoreLabel: '3.5 / 5',
    bottleneck: {
      type: 'System-Driven Automation Gap & Acquisition Clarity',
      description: 'Dante currently handles all leads, follow-ups, contract generation, and scope definition manually. The absence of a systematic closing process results in client scope creep, where requirements change frequently after work begins ("Can you do this? Can you do this?"). This manual effort prevents the transition from a side hustle to a scalable business with predictable income.'
    },
    foundationalStrengths: {
      platform: true,
      showcase: true,
      disciplinedToolStack: true,
      retention: true
    },
    starRoadmap: [
      {
        phase: 'Showcase',
        requiredFocus: 'Systematic Content Cadence',
        implementationGoal: 'Transition content creation from sporadic demos and passion projects to a consistent daily distribution strategy focused on attracting high-value software clients.',
        benefit: 'Establish consistent presence and attract qualified leads through systematic content distribution'
      },
      {
        phase: 'Tools',
        requiredFocus: 'Maximize Enhanced Efficiency in Documentation',
        implementationGoal: 'Leverage your existing fixed stack (Vercel, Supabase, Google) to automate the generation of documentation, final work orders, and scope confirmations. This eliminates the scope creep bottleneck identified during client projects.',
        benefit: 'Eliminate scope creep by automating documentation and scope confirmation processes'
      },
      {
        phase: 'Acquisition',
        requiredFocus: 'Frictionless Client Closing System',
        implementationGoal: 'Implement the C.L.O.S.E. Method to create a formal 3-step closing process, protecting scope and securing payment before work begins. This requires a dedicated CRM pipeline.',
        benefit: 'Protect scope and secure payment before work begins, eliminating scope creep'
      },
      {
        phase: 'Retention',
        requiredFocus: 'System-Driven Automation (A.U.T.O. Method)',
        implementationGoal: 'Implement GoHighLevel (GHL) automations for passive tasks. This ensures you convert one-time projects into long-term retainer agreements and systematically collect referrals, allowing you to hit your goal of two clients every other month without constant manual outreach.',
        benefit: 'Achieve goal of two clients every other month through automated retention and referral systems'
      }
    ]
  };

  useEffect(() => {
    document.title = `Professional Freelancer Audit Report: ${danteReportData.clientName || 'Dante'}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Dante's personalized Professional Freelancer Audit Report. Discover your scaling bottleneck and receive a customized STAR Method roadmap to predictable income.`);
    }

    // Load booking calendar script
    const scriptUrl = 'https://link.msgsndr.com/js/form_embed.js';
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }

    // Handle scroll to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      let currentSection = 'header';
      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Dante's custom strength descriptions
  const danteStrengthDescriptions = {
    platform: {
      title: 'No Platform Dependency',
      description: 'You correctly avoid low-margin environments like Fiverr and Upwork. This positioning is crucial to retaining full income control and escaping the <strong>"Platform Trap"</strong>, where <strong>70% of freelancers make less than $100/month</strong>.'
    },
    showcase: {
      title: 'High-Performing Metrics',
      description: 'You rely on tracking <strong>Comments and Direct Messages (DMs)</strong>, which are correctly identified as the strongest indicator of interest and the easiest path to booking calls.'
    },
    disciplinedToolStack: {
      title: 'Disciplined Tool Stack',
      description: 'You have defined a stable, fixed AI development stack of <strong>Vercel, Supabase, and Google</strong>. This focus on consistency and <strong>Workflow Fit</strong> minimizes AI fatigue, which ultimately kills productivity.'
    },
    retention: {
      title: 'Basic Retention Model Proof',
      description: 'You successfully implemented recurring revenue once by charging a client for hosting. This demonstrates early awareness of predictable income principles.'
    }
  };

  return (
    <div className="pf-report-page">
      <div className="pf-circuit-pattern"></div>
      
      {/* Sidebar Navigation */}
      <ReportSidebar 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Main Content */}
      <div className="pf-report-main-content">
        {/* Header Section */}
        <div 
          ref={(el) => { sectionRefs.current['header'] = el; }}
          className="pf-report-section"
        >
          <ReportHeader 
            clientName={danteReportData.clientName}
            clientNiche={danteReportData.clientNiche}
          />
        </div>

        {/* Section 1: Audit Summary & Foundational Strengths */}
        <div 
          ref={(el) => { sectionRefs.current['summary'] = el; }}
          className="pf-report-section"
        >
          <AuditSummarySection 
            overallScore={danteReportData.overallScore}
            overallScoreLabel={danteReportData.overallScoreLabel}
            foundationalStrengths={danteReportData.foundationalStrengths}
            strengthDescriptions={danteStrengthDescriptions}
          />
        </div>

        {/* Section 2: The Core Scaling Bottleneck */}
        <div 
          ref={(el) => { sectionRefs.current['bottleneck'] = el; }}
          className="pf-report-section"
        >
          <CoreBottleneckSection 
            bottleneck={danteReportData.bottleneck}
          />
        </div>

        {/* Section 3: Customized Learning Path (STAR Roadmap) */}
        <div 
          ref={(el) => { sectionRefs.current['roadmap'] = el; }}
          className="pf-report-section"
        >
          <STARRoadmapSection 
            starRoadmap={danteReportData.starRoadmap}
          />
        </div>

        {/* Section 4: Next Steps & Implementation Options */}
        <div 
          ref={(el) => { sectionRefs.current['next-steps'] = el; }}
          className="pf-report-section"
        >
          <NextStepsSection 
            pathADescription="Using this report alone carries the risk of inconsistency and falling victim to AI fatigue, which you already identified as a challenge. Without structured guidance, the manual effort required to implement these systems can prevent you from achieving your goal of two clients every other month."
            pathBDescription="This program provides the hands-on 'how' to immediately implement the systematic acquisition and retention systems required to achieve your goal of predictable client volume."
          />
        </div>
      </div>
    </div>
  );
};

export default DanteAuditReportPage;

