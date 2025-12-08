import React from 'react';

interface Bottleneck {
  type?: string;
  description?: string;
}

interface CoreBottleneckSectionProps {
  bottleneck?: Bottleneck;
}

const CoreBottleneckSection: React.FC<CoreBottleneckSectionProps> = ({ bottleneck }) => {
  const defaultBottleneck: Bottleneck = {
    type: 'Fulfillment Consumption',
    description: 'You must "pause" scaling when you acquire a client, making you feel slow and less capable than a full agency during fulfillment. This prevents predictable income growth.'
  };

  const finalBottleneck = bottleneck || defaultBottleneck;

  const getBottleneckDetails = (type?: string) => {
    switch (type) {
      case 'Fulfillment Consumption':
        return {
          title: 'Fulfillment Consumption',
          explanation: 'You must "pause" scaling when you acquire a client, making you feel slow and less capable than a full agency during fulfillment. This systemic bottleneck prevents the transition to predictable, scalable income.',
          impact: 'Every new client acquisition requires you to stop marketing and focus entirely on delivery, creating a feast-or-famine cycle that prevents growth.'
        };
      case 'System-Driven Automation Gap':
        return {
          title: 'System-Driven Automation Gap',
          explanation: 'The absence of CRM or automations for tasks like follow-ups and referrals creates manual bottlenecks that limit your capacity to scale.',
          impact: 'Without automated systems, you\'re trading time for money instead of building scalable processes that generate predictable income.'
        };
      case 'System-Driven Automation Gap & Acquisition Clarity':
        return {
          title: 'System-Driven Automation Gap & Acquisition Clarity',
          explanation: 'You currently handle all leads, follow-ups, contract generation, and scope definition manually. The absence of a systematic closing process results in client scope creep, where requirements change frequently after work begins ("Can you do this? Can you do this?"). This manual effort prevents the transition from a side hustle to a scalable business with predictable income.',
          impact: 'Every client interaction requires manual effort, and the lack of a formal closing process leads to scope creep that erodes profitability. Without systematic automation and clear acquisition processes, you cannot scale beyond your current capacity or achieve the goal of two clients every other month.'
        };
      default:
        return {
          title: finalBottleneck.type || 'Scaling Bottleneck',
          explanation: finalBottleneck.description || 'A critical gap in your system prevents predictable income growth.',
          impact: 'This bottleneck must be addressed to achieve scalable, predictable income.'
        };
    }
  };

  const details = getBottleneckDetails(finalBottleneck.type);

  return (
    <section className="pf-bottleneck-section">
      <div className="pf-section-container">
        <h2 className="pf-section-title">
          The Core Scaling Bottleneck
        </h2>

        <div className="pf-bottleneck-visual">
          <div className="pf-bottleneck-x-mark">❌</div>
          <div className="pf-bottleneck-label">{details.title}</div>
        </div>

        <div className="pf-bottleneck-content">
          <div className="pf-bottleneck-problem">
            <h3 className="pf-bottleneck-subtitle">The Problem</h3>
            <p className="pf-bottleneck-text">
              {details.explanation}
            </p>
          </div>

          <div className="pf-bottleneck-impact">
            <h3 className="pf-bottleneck-subtitle">The Impact</h3>
            <p className="pf-bottleneck-text">
              {details.impact}
            </p>
          </div>

          <div className="pf-bottleneck-urgency">
            <p className="pf-bottleneck-urgency-text">
              <strong>This is the single biggest systemic bottleneck</strong> that prevents your transition 
              to a scalable business with predictable income. Addressing this bottleneck is the critical 
              first step in your STAR Method roadmap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBottleneckSection;

