// WLFI Token Service for Developer Bounties
export interface WLFITokenData {
  balance: number;
  staked: number;
  totalEarned: number;
  walletAddress?: string;
  isConnected: boolean;
}

export interface BountyData {
  id: string;
  title: string;
  description: string;
  reward: number; // WLFI tokens
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'Documentation' | 'Testing';
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
  createdBy: string;
  createdAt: string;
  deadline?: string;
  requirements: string[];
  skills: string[];
  estimatedHours: number;
}

export interface BountySubmission {
  id: string;
  bountyId: string;
  developerId: string;
  submissionUrl: string;
  description: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  reviewerNotes?: string;
}

export interface WLFITransaction {
  id: string;
  type: 'Reward' | 'Stake' | 'Unstake' | 'Transfer' | 'Purchase';
  amount: number;
  timestamp: string;
  description: string;
  status: 'Completed' | 'Pending' | 'Failed';
  txHash?: string;
}

class WLFIService {
  private static instance: WLFIService;
  private tokenData: WLFITokenData = {
    balance: 0,
    staked: 0,
    totalEarned: 0,
    isConnected: false
  };

  private bounties: BountyData[] = [
    {
      id: '1',
      title: 'Implement Dark Mode Toggle',
      description: 'Add a dark mode toggle to the main navigation component with smooth transitions and user preference persistence.',
      reward: 150,
      difficulty: 'Easy',
      category: 'Frontend',
      status: 'Open',
      createdBy: 'Platform Team',
      createdAt: '2024-01-15',
      deadline: '2024-02-15',
      requirements: ['React', 'CSS', 'Local Storage'],
      skills: ['React', 'CSS', 'JavaScript'],
      estimatedHours: 4
    },
    {
      id: '2',
      title: 'Create API Documentation',
      description: 'Generate comprehensive API documentation for the backend endpoints using OpenAPI/Swagger.',
      reward: 300,
      difficulty: 'Medium',
      category: 'Documentation',
      status: 'Open',
      createdBy: 'Backend Team',
      createdAt: '2024-01-14',
      deadline: '2024-02-20',
      requirements: ['OpenAPI', 'Swagger', 'API Design'],
      skills: ['Documentation', 'API Design', 'OpenAPI'],
      estimatedHours: 8
    },
    {
      id: '3',
      title: 'Optimize Database Queries',
      description: 'Analyze and optimize slow database queries in the analytics service to improve performance.',
      reward: 500,
      difficulty: 'Hard',
      category: 'Backend',
      status: 'Open',
      createdBy: 'DevOps Team',
      createdAt: '2024-01-13',
      deadline: '2024-02-25',
      requirements: ['SQL', 'Performance Analysis', 'Database Optimization'],
      skills: ['SQL', 'Database', 'Performance'],
      estimatedHours: 12
    },
    {
      id: '4',
      title: 'Design Mobile UI Components',
      description: 'Create responsive mobile-first UI components for the gamification dashboard.',
      reward: 400,
      difficulty: 'Medium',
      category: 'Design',
      status: 'Open',
      createdBy: 'Design Team',
      createdAt: '2024-01-12',
      deadline: '2024-02-18',
      requirements: ['Figma', 'Mobile Design', 'Responsive Design'],
      skills: ['UI/UX', 'Mobile Design', 'Figma'],
      estimatedHours: 10
    }
  ];

  private submissions: BountySubmission[] = [];
  private transactions: WLFITransaction[] = [];

  static getInstance(): WLFIService {
    if (!WLFIService.instance) {
      WLFIService.instance = new WLFIService();
    }
    return WLFIService.instance;
  }

  // Token Management
  async connectWallet(): Promise<boolean> {
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.tokenData.isConnected = true;
      this.tokenData.walletAddress = '0x1234...5678';
      this.tokenData.balance = 1250;
      this.tokenData.staked = 500;
      this.tokenData.totalEarned = 3200;
      return true;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return false;
    }
  }

  async disconnectWallet(): Promise<void> {
    this.tokenData.isConnected = false;
    this.tokenData.walletAddress = undefined;
  }

  getTokenData(): WLFITokenData {
    return { ...this.tokenData };
  }

  async getBalance(): Promise<number> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.tokenData.balance;
  }

  async stakeTokens(amount: number): Promise<boolean> {
    if (amount > this.tokenData.balance) return false;
    
    this.tokenData.balance -= amount;
    this.tokenData.staked += amount;
    
    this.addTransaction({
      id: Date.now().toString(),
      type: 'Stake',
      amount,
      timestamp: new Date().toISOString(),
      description: `Staked ${amount} WLFI tokens`,
      status: 'Completed'
    });
    
    return true;
  }

  async unstakeTokens(amount: number): Promise<boolean> {
    if (amount > this.tokenData.staked) return false;
    
    this.tokenData.staked -= amount;
    this.tokenData.balance += amount;
    
    this.addTransaction({
      id: Date.now().toString(),
      type: 'Unstake',
      amount,
      timestamp: new Date().toISOString(),
      description: `Unstaked ${amount} WLFI tokens`,
      status: 'Completed'
    });
    
    return true;
  }

  // Bounty Management
  getBounties(): BountyData[] {
    return [...this.bounties];
  }

  getBountyById(id: string): BountyData | undefined {
    return this.bounties.find(bounty => bounty.id === id);
  }

  async submitBounty(bountyId: string, submission: Omit<BountySubmission, 'id' | 'bountyId' | 'submittedAt' | 'status'>): Promise<boolean> {
    const bounty = this.getBountyById(bountyId);
    if (!bounty || bounty.status !== 'Open') return false;

    const newSubmission: BountySubmission = {
      ...submission,
      id: Date.now().toString(),
      bountyId,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    };

    this.submissions.push(newSubmission);
    
    // Update bounty status
    bounty.status = 'In Progress';
    
    return true;
  }

  getSubmissions(): BountySubmission[] {
    return [...this.submissions];
  }

  async approveSubmission(submissionId: string): Promise<boolean> {
    const submission = this.submissions.find(s => s.id === submissionId);
    const bounty = this.bounties.find(b => b.id === submission?.bountyId);
    
    if (!submission || !bounty) return false;

    submission.status = 'Approved';
    bounty.status = 'Completed';
    
    // Award WLFI tokens
    this.tokenData.balance += bounty.reward;
    this.tokenData.totalEarned += bounty.reward;
    
    this.addTransaction({
      id: Date.now().toString(),
      type: 'Reward',
      amount: bounty.reward,
      timestamp: new Date().toISOString(),
      description: `Bounty reward: ${bounty.title}`,
      status: 'Completed'
    });
    
    return true;
  }

  // Transaction History
  getTransactions(): WLFITransaction[] {
    return [...this.transactions].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  private addTransaction(transaction: WLFITransaction): void {
    this.transactions.push(transaction);
  }

  // Analytics
  getEarningsAnalytics(): { period: string; earnings: number }[] {
    return [
      { period: 'Jan 2024', earnings: 800 },
      { period: 'Dec 2023', earnings: 1200 },
      { period: 'Nov 2023', earnings: 600 },
      { period: 'Oct 2023', earnings: 400 },
      { period: 'Sep 2023', earnings: 200 }
    ];
  }

  getTopEarners(): { developer: string; earnings: number; avatar: string }[] {
    return [
      { developer: 'Alex Chen', earnings: 4500, avatar: '👨‍💻' },
      { developer: 'Sarah Johnson', earnings: 3800, avatar: '👩‍💻' },
      { developer: 'Mike Rodriguez', earnings: 3200, avatar: '👨‍💻' },
      { developer: 'Emma Wilson', earnings: 2800, avatar: '👩‍💻' },
      { developer: 'David Kim', earnings: 2400, avatar: '👨‍💻' }
    ];
  }
}

export default WLFIService; 