import React from 'react';
import DeveloperProfile from './DeveloperProfile';
import '../../styles/DeveloperProfileDemo.css';

const DeveloperProfileDemo: React.FC = () => {
    const developers = [
        {
            id: '1',
            name: 'Lamont Evans',
            title: 'Full-Stack Developer & Platform Architect',
            avatar: 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/67dc86c926fbc1001003ab47.png',
            location: 'San Francisco, CA',
            hourlyRate: '$85-140',
            skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL', 'Next.js'],
            experience: '6+ years',
            bio: 'Experienced full-stack developer and platform architect with a passion for building scalable web applications. I specialize in modern JavaScript frameworks, cloud infrastructure, and creating seamless developer experiences. I love working on projects that challenge me to think creatively and solve complex problems.',
            portfolio: 'https://lamontevans.dev',
            github: 'https://github.com/lamontevans',
            linkedin: 'https://linkedin.com/in/lamontevans',
            rating: 4.9,
            completedProjects: 52,
            availability: 'Available' as const,
            languages: ['English'],
            timezone: 'PST (UTC-8)'
        },
        {
            id: '2',
            name: 'Julian Faulkner',
            title: 'Frontend Developer & UI/UX Specialist',
            avatar: 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/68b64887c42c5e181a94f7ea.jpeg',
            location: 'Austin, TX',
            hourlyRate: '$70-110',
            skills: ['React', 'Vue.js', 'TypeScript', 'CSS3', 'Figma', 'Tailwind CSS', 'Storybook', 'Jest'],
            experience: '4+ years',
            bio: 'Creative frontend developer focused on crafting beautiful, accessible, and performant user interfaces. I have a strong eye for design and enjoy collaborating with designers to bring visions to life. My expertise includes modern frontend frameworks, responsive design, and creating intuitive user experiences.',
            portfolio: 'https://julianfaulkner.dev',
            github: 'https://github.com/julianfaulkner',
            linkedin: 'https://linkedin.com/in/julianfaulkner',
            rating: 4.8,
            completedProjects: 38,
            availability: 'Available' as const,
            languages: ['English', 'Spanish'],
            timezone: 'CST (UTC-6)'
        },
        {
            id: '3',
            name: 'Dantee Fluellen',
            title: 'Backend Developer & API Specialist',
            avatar: 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/68b64bb93441c14fdab6a20d.jpeg',
            location: 'Seattle, WA',
            hourlyRate: '$75-125',
            skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
            experience: '5+ years',
            bio: 'Backend developer with expertise in building robust APIs and scalable server-side applications. I specialize in Python frameworks, database design, and cloud infrastructure. I enjoy solving complex backend challenges and creating efficient, maintainable code that powers great user experiences.',
            portfolio: 'https://danteefluellen.dev',
            github: 'https://github.com/danteefluellen',
            linkedin: 'https://linkedin.com/in/danteefluellen',
            rating: 4.7,
            completedProjects: 45,
            availability: 'Available' as const,
            languages: ['English'],
            timezone: 'PST (UTC-8)'
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