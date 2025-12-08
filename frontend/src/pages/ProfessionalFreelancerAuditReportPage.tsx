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
  bottleneck?: {
    type: 'Fulfillment Consumption' | 'System-Driven Automation Gap' | string;
    description: string;
  };
  foundationalStrengths?: {
    platform: boolean;
    showcase: boolean;
    retention: boolean;
  };
  starRoadmap?: Array<{
    phase: 'Showcase' | 'Tools' | 'Acquisition' | 'Retention';
    requiredFocus: string;
    implementationGoal: string;
    benefit: string;
  }>;
}

interface ProfessionalFreelancerAuditReportPageProps {
  navigateToHome?: () => void;
  reportData?: AuditReportData;
}

const ProfessionalFreelancerAuditReportPage: React.FC<ProfessionalFreelancerAuditReportPageProps> = ({ 
  navigateToHome,
  reportData 
}) => {
  const [activeSection, setActiveSection] = useState<string>('header');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Default report data (can be replaced with API data)
  const defaultReportData: AuditReportData = {
    clientName: 'John Doe',
    clientNiche: 'Web Development',
    overallScore: 72,
    bottleneck: {
      type: 'Fulfillment Consumption',
      description: 'You must "pause" scaling when you acquire a client, making you feel slow and less capable than a full agency during fulfillment. This prevents predictable income growth.'
    },
    foundationalStrengths: {
      platform: true,
      showcase: true,
      retention: true
    },
    starRoadmap: [
      {
        phase: 'Showcase',
        requiredFocus: 'High-Performing Metrics & Portfolio',
        implementationGoal: 'Build a compelling portfolio that demonstrates value through case studies, testimonials, and measurable results',
        benefit: 'Establish authority and attract premium clients by showcasing proven results and expertise'
      },
      {
        phase: 'Tools',
        requiredFocus: 'Maximize Enhanced Efficiency',
        implementationGoal: 'Use AI tools (Cursor, Vercel, Supabase) to accelerate development and free up fulfillment time',
        benefit: 'Reduce fulfillment time by 60%, enabling simultaneous client acquisition'
      },
      {
        phase: 'Acquisition',
        requiredFocus: 'Frictionless Client Closing',
        implementationGoal: 'Implement GoHighLevel CRM for automated follow-ups and lead nurturing',
        benefit: 'Increase conversion rate by 40% while reducing manual outreach time'
      },
      {
        phase: 'Retention',
        requiredFocus: 'Predictable Revenue Systems',
        implementationGoal: 'Build recurring revenue streams through hosting, maintenance, and retainer agreements',
        benefit: 'Create stable income foundation that supports scaling efforts'
      }
    ]
  };

  const finalReportData = reportData || defaultReportData;

  useEffect(() => {
    document.title = `Professional Freelancer Audit Report: ${finalReportData.clientName || 'Your Learning Path'}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Your personalized Professional Freelancer Audit Report. Discover your scaling bottleneck and receive a customized STAR Method roadmap to predictable income.`);
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
  }, [finalReportData.clientName]);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            clientName={finalReportData.clientName}
            clientNiche={finalReportData.clientNiche}
          />
        </div>

        {/* Section 1: Audit Summary & Foundational Strengths */}
        <div 
          ref={(el) => { sectionRefs.current['summary'] = el; }}
          className="pf-report-section"
        >
          <AuditSummarySection 
            overallScore={finalReportData.overallScore}
            foundationalStrengths={finalReportData.foundationalStrengths}
          />
        </div>

        {/* Section 2: The Core Scaling Bottleneck */}
        <div 
          ref={(el) => { sectionRefs.current['bottleneck'] = el; }}
          className="pf-report-section"
        >
          <CoreBottleneckSection 
            bottleneck={finalReportData.bottleneck}
          />
        </div>

        {/* Section 3: Customized Learning Path (STAR Roadmap) */}
        <div 
          ref={(el) => { sectionRefs.current['roadmap'] = el; }}
          className="pf-report-section"
        >
          <STARRoadmapSection 
            starRoadmap={finalReportData.starRoadmap}
          />
        </div>

        {/* Section 4: Next Steps & Implementation Options */}
        <div 
          ref={(el) => { sectionRefs.current['next-steps'] = el; }}
          className="pf-report-section"
        >
          <NextStepsSection />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalFreelancerAuditReportPage;

