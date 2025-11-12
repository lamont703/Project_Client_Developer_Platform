// Lesson data structure for 10-Day Freelance Kickstart
export interface LessonVideo {
  videoId: string; // YouTube video ID or URL
  title: string;
  description?: string;
}

export interface ChecklistItem {
  text: string;
  completed?: boolean;
}

export interface Lesson {
  day: number;
  title: string;
  description: string;
  theoryVideo: LessonVideo;
  practicalVideos: LessonVideo[];
  learningOutcomes: string[];
  checklistItems: ChecklistItem[];
  resources?: {
    worksheets?: string[];
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
    learningOutcomes: [
      'Define your freelance vision and income goals',
      'Identify target industries and ideal clients',
      'Understand the 3-month and 12-month roadmap'
    ],
    checklistItems: [
      { text: 'Write your "Why" statement' },
      { text: 'Set SMART goals (income + client type + timeline)' },
      { text: 'List your top 3 service ideas' },
      { text: 'Create a simple 3-month action plan' },
      { text: 'Save this document in your GHL workspace' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Understand key AI tools for freelancers (Cursor, ChatGPT, Midjourney, GoHighLevel)',
      'Learn how to integrate tools into daily workflow',
      'Build confidence using AI for creative and technical tasks'
    ],
    checklistItems: [
      { text: 'Create accounts for Cursor, ChatGPT, Midjourney, and GHL' },
      { text: 'Test each tool with a small task (e.g., write copy, generate code, design asset)' },
      { text: 'Note which tools fit your niche best' },
      { text: 'Save login links + credentials securely' },
      { text: 'Build a quick "AI Tools Hub" in Notion or GHL' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Structure your freelance projects with clarity',
      'Use templates to streamline onboarding and communication',
      'Learn documentation best practices'
    ],
    checklistItems: [
      { text: 'Download and customize project brief + onboarding templates' },
      { text: 'Upload templates to your GHL or Drive folder' },
      { text: 'Create a client folder naming convention' },
      { text: 'Prepare a sample "Welcome Packet"' },
      { text: 'Test sending a mock onboarding email' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Write high-converting proposals and service descriptions',
      'Use AI to polish tone, clarity, and benefits',
      'Design a service pitch page or one-pager'
    ],
    checklistItems: [
      { text: 'Define 1–2 core offers (problem + solution + result)' },
      { text: 'Use AI to generate headline variations' },
      { text: 'Write a 3-paragraph proposal template' },
      { text: 'Upload final version to GHL pipeline templates' },
      { text: 'Record a short video pitch (optional)' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Build automated follow-ups using GoHighLevel',
      'Create workflows to nurture leads and clients',
      'Track communications efficiently'
    ],
    checklistItems: [
      { text: 'Create a "Leads" pipeline in GHL' },
      { text: 'Set up 3 pipeline stages (New Lead → Proposal Sent → Client Won)' },
      { text: 'Automate a 2-email follow-up sequence' },
      { text: 'Add reminders for manual follow-ups' },
      { text: 'Test workflow with a dummy contact' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Build a simple, professional portfolio site',
      'Display projects and testimonials effectively',
      'Optimize for conversions'
    ],
    checklistItems: [
      { text: 'Choose a platform (GHL, Framer, Webflow, or Notion)' },
      { text: 'Add bio, photo, and tagline' },
      { text: 'Add 2 sample projects or mock case studies' },
      { text: 'Include contact form or CTA button' },
      { text: 'Publish and test on desktop + mobile' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Learn how to create social media content that attracts clients',
      'Develop a simple weekly posting plan',
      'Use AI to generate ideas and captions'
    ],
    checklistItems: [
      { text: 'Identify 3 content pillars (educate | showcase | personal)' },
      { text: 'Use AI to generate 10 post ideas' },
      { text: 'Schedule 3 posts for this week' },
      { text: 'Create Canva templates for consistency' },
      { text: 'Link social profiles to your portfolio' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Understand pricing psychology and positioning',
      'Learn how to package your offers',
      'Build confidence discussing rates'
    ],
    checklistItems: [
      { text: 'Calculate your base hourly rate & minimum project rate' },
      { text: 'Create 3 tiers of offers (Starter | Growth | Premium)' },
      { text: 'Add pricing table to your proposal template' },
      { text: 'Draft a "scope vs price" matrix for clarity' },
      { text: 'Role-play a pricing conversation with AI (ChatGPT or Cursor)' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Systemize your workflow for scalability',
      'Use automation and analytics for insights',
      'Plan next-level growth steps'
    ],
    checklistItems: [
      { text: 'Identify 2 manual tasks to automate with GHL/Zapier' },
      { text: 'Track conversion rate of your proposals' },
      { text: 'Create a "Client Retention" plan (referrals, follow-ups)' },
      { text: 'Document your repeatable service process' },
      { text: 'List 3 new systems to explore post-Kickstart' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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
    learningOutcomes: [
      'Build relationships with other AI freelancers',
      'Learn how to give/receive referrals',
      'Celebrate progress and map your next step'
    ],
    checklistItems: [
      { text: 'Join the official community (Discord, Circle, etc.)' },
      { text: 'Introduce yourself with your niche & goals' },
      { text: 'Connect with 3 other members' },
      { text: 'Share your biggest win from the 10 days' },
      { text: 'Review your goals from Day 1 and plan next steps' }
    ],
    resources: {
      worksheets: ['https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691501923f869471c31913bf.pdf']
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

