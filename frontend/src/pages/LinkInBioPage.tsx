import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LinkInBio/LinkInBioPage.css';
import LinkButton from '../components/LinkInBio/LinkButton';

interface LinkInBioPageProps {
  navigateToHome?: () => void;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  external?: boolean;
}

const LinkInBioPage: React.FC<LinkInBioPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Update page title
    document.title = 'Lamont Evans - Link in Bio';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lamont Evans - I help freelancers use AI to get high paying clients without platforms like Fiverr and UPWork');
    }
  }, []);

  const links: LinkItem[] = [
    {
      id: 'webinar-workshop',
      title: 'Webinar Workshop',
      url: '/webinar-workshop',
      icon: '🎓',
      external: false
    },
    {
      id: '10day-kickstart',
      title: '10 Day Freelance Kickstart',
      url: '/10Day-Freelance-Kickstart',
      icon: '🚀',
      external: false
    },
    {
      id: 'blueprint-book',
      title: 'Blueprint to Freelance Freedom',
      url: '/blueprint-to-freelance-freedom',
      icon: '📚',
      external: false
    },
    {
      id: 'support-network',
      title: 'AI Freelance Support Network',
      url: '/ai-community-member',
      icon: '🤝',
      external: false
    },
    {
      id: 'youtube',
      title: 'YouTube',
      url: 'https://www.youtube.com/@XRBlockDev', // Update with actual YouTube URL
      icon: '▶️',
      external: true
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      url: 'https://www.tiktok.com/@xrblockdev', // Update with actual TikTok URL
      icon: '🎵',
      external: true
    }
  ];

  const handleLinkClick = (link: LinkItem) => {
    if (link.external) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link.url);
    }
  };

  return (
    <div className="link-in-bio-page">
      <div className="link-in-bio-container">
        <div className="link-in-bio-header">
          <div className="header-logo-container">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Lamont Evans Logo" 
              className="header-logo"
            />
          </div>
          <h1 className="header-title">Lamont Evans</h1>
          <p className="header-subtitle">I help freelancers use AI to get high paying clients without platforms like Fiverr and UPWork</p>
        </div>

        <div className="links-container">
          {links.map((link) => (
            <LinkButton
              key={link.id}
              title={link.title}
              icon={link.icon}
              onClick={() => handleLinkClick(link)}
              external={link.external}
            />
          ))}
        </div>

        <div className="link-in-bio-footer">
          <p className="footer-text">© {new Date().getFullYear()} Lamont Evans. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LinkInBioPage;



