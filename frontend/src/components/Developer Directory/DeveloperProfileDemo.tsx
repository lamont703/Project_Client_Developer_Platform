import React from 'react';
import DeveloperProfile from './DeveloperProfile';
import '../../styles/DeveloperProfileDemo.css';

const DeveloperProfileDemo: React.FC = () => {
    const developers = [
        {
            id: '1',
            name: 'Alex Chen',
            title: 'Full-Stack Developer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            location: 'San Francisco, CA',
            hourlyRate: '$75-120',
            skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'],
            experience: '5+ years',
            bio: 'Passionate full-stack developer with expertise in modern web technologies. I specialize in building scalable applications and have a proven track record of delivering high-quality solutions for startups and enterprise clients.',
            portfolio: 'https://alexchen.dev',
            github: 'https://github.com/alexchen',
            linkedin: 'https://linkedin.com/in/alexchen',
            rating: 4.8,
            completedProjects: 47,
            availability: 'Available' as const,
            languages: ['English', 'Mandarin'],
            timezone: 'PST (UTC-8)'
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            title: 'Frontend Specialist',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            location: 'New York, NY',
            hourlyRate: '$60-95',
            skills: ['React', 'Vue.js', 'TypeScript', 'CSS3', 'Figma', 'Webpack'],
            experience: '3+ years',
            bio: 'Creative frontend developer focused on creating beautiful, accessible, and performant user experiences. I love working with modern frameworks and design systems to build intuitive interfaces.',
            portfolio: 'https://sarahjohnson.dev',
            github: 'https://github.com/sarahjohnson',
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            rating: 4.9,
            completedProjects: 32,
            availability: 'Busy' as const,
            languages: ['English', 'Spanish'],
            timezone: 'EST (UTC-5)'
        },
        {
            id: '3',
            name: 'Marcus Rodriguez',
            title: 'DevOps Engineer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            location: 'Austin, TX',
            hourlyRate: '$80-130',
            skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins', 'Linux'],
            experience: '7+ years',
            bio: 'DevOps engineer with extensive experience in cloud infrastructure, CI/CD pipelines, and system administration. I help teams scale their applications and improve their deployment processes.',
            portfolio: 'https://marcusrodriguez.dev',
            github: 'https://github.com/marcusrodriguez',
            linkedin: 'https://linkedin.com/in/marcusrodriguez',
            rating: 4.7,
            completedProjects: 58,
            availability: 'Available' as const,
            languages: ['English', 'Portuguese'],
            timezone: 'CST (UTC-6)'
        }
    ];

    return (
        <div className="developer-profile-demo">
            <div className="developers-grid">
                {developers.map((developer) => (
                    <div key={developer.id} className="developer-card">
                        <DeveloperProfile developer={developer} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeveloperProfileDemo; 