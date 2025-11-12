// Lesson data structure for 10-Day Freelance Kickstart
export interface LessonVideo {
  videoId: string; // YouTube video ID or URL
  title: string;
  description?: string;
}

export interface Lesson {
  day: number;
  title: string;
  description: string;
  theoryVideo: LessonVideo;
  practicalVideos: LessonVideo[];
  resources?: {
    worksheets?: string[];
    checklists?: string[];
  };
}

// Lesson data for 10-Day Freelance Kickstart
export const lessons: Lesson[] = [
  {
    day: 1,
    title: 'Blueprint to Success — Your Goal-Setting Master Plan',
    description: 'Establish clear goals and create a roadmap for your freelance journey. Learn how to set actionable objectives and track your progress with our goal-setting checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY1_THEORY',
      title: 'Goal-Setting Fundamentals',
      description: 'Learn the core concepts of setting clear, achievable goals for your freelance business'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY1_PRACTICAL_1',
        title: 'Creating Your Goal-Setting Checklist',
        description: 'Watch how to create and use a goal-setting checklist to maintain clarity in your freelance journey'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day1-goal-setting-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day1-goal-setting-checklist.pdf']
    }
  },
  {
    day: 2,
    title: 'AI Arsenal Unleashed — Master Your Tool Skills',
    description: 'Discover the AI tools that can transform your freelance workflow. Get hands-on demonstrations and learn which tools to master with our tool skills checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY2_THEORY',
      title: 'AI Tools Overview',
      description: 'Understanding the AI tools available and how they can enhance your freelance work'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY2_PRACTICAL_1',
        title: 'AI Tools Demonstration',
        description: 'Live screen share showing how to use various AI tools effectively'
      },
      {
        videoId: 'PLACEHOLDER_DAY2_PRACTICAL_2',
        title: 'Building Your Tool Skills Checklist',
        description: 'Step-by-step guide to creating your personalized tool skills checklist'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day2-ai-tools-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day2-tool-skills-checklist.pdf']
    }
  },
  {
    day: 3,
    title: 'Client Command Center — Professional Management Templates',
    description: 'Learn how to manage client relationships professionally with proven templates and systems. Get organized with our client management checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY3_THEORY',
      title: 'Client Management Best Practices',
      description: 'Core principles and strategies for managing client relationships effectively'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY3_PRACTICAL_1',
        title: 'Client Management Templates',
        description: 'Live demonstration of using templates and checklists to manage clients'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day3-client-management-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day3-client-management-checklist.pdf']
    }
  },
  {
    day: 4,
    title: 'The Perfect Pitch — Crafting Irresistible Offers',
    description: 'Create compelling offers that convert leads into clients. Learn how to structure and present your services with our offer presentation checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY4_THEORY',
      title: 'Creating Winning Offers',
      description: 'Understanding how to craft offers that attract and convert leads'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY4_PRACTICAL_1',
        title: 'Building Your Offer Presentation',
        description: 'Step-by-step guide to creating and presenting offers to leads'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day4-offer-creation-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day4-offer-presentation-checklist.pdf']
    }
  },
  {
    day: 5,
    title: 'Pipeline Powerhouse — Follow-Up Management System',
    description: 'Master the art of follow-up management with a systematic pipeline process. Keep track of leads and opportunities with our follow-up checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY5_THEORY',
      title: 'Pipeline and Follow-Up Fundamentals',
      description: 'Core concepts of managing a sales pipeline and effective follow-up strategies'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY5_PRACTICAL_1',
        title: 'Setting Up Your Follow-Up Pipeline',
        description: 'Live demonstration of creating and managing your follow-up process'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day5-pipeline-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day5-follow-up-checklist.pdf']
    }
  },
  {
    day: 6,
    title: 'Portfolio Perfection — Build Your Showcase Site',
    description: 'Build a professional portfolio site that showcases your work and attracts clients. Follow our checklist to create an impressive online presence.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY6_THEORY',
      title: 'Portfolio Site Essentials',
      description: 'Understanding what makes an effective portfolio site and how to structure it'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY6_PRACTICAL_1',
        title: 'Building Your Portfolio Site',
        description: 'Step-by-step guide to creating your professional portfolio site'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day6-portfolio-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day6-portfolio-checklist.pdf']
    }
  },
  {
    day: 7,
    title: 'Content Creation Command — Your Production Strategy',
    description: 'Develop a content production strategy that builds your brand and attracts clients. Learn how to create consistent, valuable content with our strategy checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY7_THEORY',
      title: 'Content Strategy Fundamentals',
      description: 'Core principles of creating a content production strategy for your freelance business'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY7_PRACTICAL_1',
        title: 'Creating Your Content Strategy',
        description: 'Live demonstration of building and implementing your content production strategy'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day7-content-strategy-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day7-content-production-checklist.pdf']
    }
  },
  {
    day: 8,
    title: 'Price Point Pro — Pricing & Packaging Mastery',
    description: 'Master the art of pricing and packaging your services. Learn how to structure your offerings and price them competitively with our comprehensive guide and checklist.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY8_THEORY',
      title: 'Pricing and Packaging Principles',
      description: 'Understanding how to price and package your freelance services effectively'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY8_PRACTICAL_1',
        title: 'Creating Your Pricing Structure',
        description: 'Step-by-step guide to pricing and packaging your services'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day8-pricing-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day8-pricing-packaging-checklist.pdf']
    }
  },
  {
    day: 9,
    title: 'Elite Optimization — Advanced Business Strategies',
    description: 'Explore advanced strategies to optimize your freelance business operations and maximize your efficiency and profitability.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY9_THEORY',
      title: 'Advanced Business Strategies',
      description: 'Advanced concepts for optimizing and scaling your freelance business'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY9_PRACTICAL_1',
        title: 'Implementing Advanced Strategies',
        description: 'Live demonstration of advanced techniques and optimizations'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day9-advanced-strategies-worksheet.pdf'],
      checklists: ['https://example.com/pdfs/day9-optimization-checklist.pdf']
    }
  },
  {
    day: 10,
    title: 'Network & Conquer — Community Mastery & Journey Summary',
    description: 'Join the private freelancer networking community and learn how to leverage connections for growth. Get your networking checklist and a comprehensive summary of your 10-day journey.',
    theoryVideo: {
      videoId: 'PLACEHOLDER_DAY10_THEORY',
      title: 'Networking and Community Building',
      description: 'Understanding the value of community and how to network effectively as a freelancer'
    },
    practicalVideos: [
      {
        videoId: 'PLACEHOLDER_DAY10_PRACTICAL_1',
        title: 'Your Networking Checklist & Journey Summary',
        description: 'Complete your networking checklist and review your 10-day kickstart journey'
      }
    ],
    resources: {
      worksheets: ['https://example.com/pdfs/day10-networking-worksheet.pdf'],
      checklists: [
        'https://example.com/pdfs/day10-networking-checklist.pdf',
        'https://example.com/pdfs/day10-journey-summary-checklist.pdf'
      ]
    }
  }
];

// Helper function to get lesson by day number
export const getLessonByDay = (day: number): Lesson | undefined => {
  return lessons.find(lesson => lesson.day === day);
};

// Helper function to get next/previous lesson
export const getNextLesson = (currentDay: number): Lesson | null => {
  const nextDay = currentDay + 1;
  return nextDay <= 10 ? getLessonByDay(nextDay) || null : null;
};

export const getPreviousLesson = (currentDay: number): Lesson | null => {
  const prevDay = currentDay - 1;
  return prevDay >= 1 ? getLessonByDay(prevDay) || null : null;
};

