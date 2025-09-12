import React, { useState, useEffect } from 'react';
import { PipelineOverview } from '../components/Pipeline Dashboard/PipelineOverview';
import { OpportunityCards } from '../components/Pipeline Dashboard/OpportunityCards';
import { AIInsightsPanel } from '../components/Pipeline Dashboard/AIInsightsPanel';
import { PipelineStats } from '../components/Pipeline Dashboard/PipelineStats';
import { PipelineFilters } from '../components/Pipeline Dashboard/PipelineFilters';
import ApiService from '../utils/apiConfig';
import '../styles/Pipeline Dashboard/PipelineDashboardPage.css';

export interface Opportunity {
  id: number;
  opportunity_id: string;
  name: string;
  status: string;
  monetary_value: number;
  contact_id?: string;
  pipeline_id?: string;
  pipeline_stage_id?: string;
  pipeline_stage_name?: string;
  assigned_to?: string;
  developer_ref?: string;
  developer_name?: string;
  source?: string;
  session_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  opportunities: Opportunity[];
  totalValue: number;
  averageTimeInStage: number;
  conversionRate: number;
}

export interface PipelineStats {
  totalOpportunities: number;
  totalValue: number;
  averageDealSize: number;
  conversionRate: number;
  averageSalesCycle: number;
  healthScore: number;
}

interface PipelineDashboardPageProps {
  navigateToHome: () => void;
}

const PipelineDashboardPage: React.FC<PipelineDashboardPageProps> = ({ navigateToHome }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([]);
  const [stats, setStats] = useState<PipelineStats>({
    totalOpportunities: 0,
    totalValue: 0,
    averageDealSize: 0,
    conversionRate: 0,
    averageSalesCycle: 0,
    healthScore: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    stage: '',
    assignee: '',
    dateRange: '',
    valueRange: ''
  });

  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the existing ApiService to fetch opportunities
      const data = await ApiService.getOpportunities();
      
      if (data.success) {
        console.log('Opportunities fetched:', data.opportunities);
        setOpportunities(data.opportunities);
        processPipelineData(data.opportunities);
      } else {
        throw new Error(data.error || 'Failed to fetch opportunities');
      }
    } catch (err) {
      setError('Error loading pipeline data. Please try again later.');
      console.error('Error fetching pipeline data:', err);
      
      // If API fails, use mock data for demonstration
      console.log('Using mock data for demonstration...');
      const mockOpportunities = generateMockOpportunities();
      setOpportunities(mockOpportunities);
      processPipelineData(mockOpportunities);
    } finally {
      setLoading(false);
    }
  };

  const generateMockOpportunities = (): Opportunity[] => {
    return [
      {
        id: 1,
        opportunity_id: 'opp-001',
        name: 'E-commerce AI Chatbot',
        status: 'open',
        monetary_value: 25000,
        pipeline_stage_name: 'Discovery Call',
        assigned_to: 'John Doe',
        developer_name: 'Sarah Wilson',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-20T14:30:00Z'
      },
      {
        id: 2,
        opportunity_id: 'opp-002',
        name: 'Mobile App Development',
        status: 'open',
        monetary_value: 45000,
        pipeline_stage_name: 'Proposal Sent',
        assigned_to: 'Jane Smith',
        developer_name: 'Mike Johnson',
        created_at: '2024-01-10T09:00:00Z',
        updated_at: '2024-01-18T16:45:00Z'
      },
      {
        id: 3,
        opportunity_id: 'opp-003',
        name: 'Data Analytics Dashboard',
        status: 'open',
        monetary_value: 18000,
        pipeline_stage_name: 'Qualified Lead',
        assigned_to: 'Bob Brown',
        developer_name: 'Emily Davis',
        created_at: '2024-01-12T11:30:00Z',
        updated_at: '2024-01-19T13:20:00Z'
      },
      {
        id: 4,
        opportunity_id: 'opp-004',
        name: 'Blockchain Integration',
        status: 'open',
        monetary_value: 35000,
        pipeline_stage_name: 'Contract Review',
        assigned_to: 'Alice Green',
        developer_name: 'Tom Wilson',
        created_at: '2024-01-08T08:15:00Z',
        updated_at: '2024-01-17T10:10:00Z'
      },
      {
        id: 5,
        opportunity_id: 'opp-005',
        name: 'Cloud Migration Project',
        status: 'open',
        monetary_value: 28000,
        pipeline_stage_name: 'Discovery Call',
        assigned_to: 'Charlie Black',
        developer_name: 'Lisa White',
        created_at: '2024-01-14T15:45:00Z',
        updated_at: '2024-01-21T09:30:00Z'
      }
    ];
  };

  const processPipelineData = (opportunities: Opportunity[]) => {
    // Group opportunities by pipeline stage
    const stageMap = new Map<string, Opportunity[]>();
    
    opportunities.forEach(opp => {
      const stageName = opp.pipeline_stage_name || 'Unknown Stage';
      if (!stageMap.has(stageName)) {
        stageMap.set(stageName, []);
      }
      stageMap.get(stageName)!.push(opp);
    });

    // Create pipeline stages with metrics
    const stages: PipelineStage[] = Array.from(stageMap.entries()).map(([name, opps]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      opportunities: opps,
      totalValue: opps.reduce((sum, opp) => sum + opp.monetary_value, 0),
      averageTimeInStage: calculateAverageTimeInStage(opps),
      conversionRate: calculateConversionRate(name, opps)
    }));

    setPipelineStages(stages);

    // Calculate overall stats
    const totalValue = opportunities.reduce((sum, opp) => sum + opp.monetary_value, 0);
    const averageDealSize = opportunities.length > 0 ? totalValue / opportunities.length : 0;
    
    setStats({
      totalOpportunities: opportunities.length,
      totalValue,
      averageDealSize,
      conversionRate: calculateOverallConversionRate(stages),
      averageSalesCycle: calculateAverageSalesCycle(opportunities),
      healthScore: calculateHealthScore(stages, opportunities)
    });
  };

  const calculateAverageTimeInStage = (opportunities: Opportunity[]): number => {
    // Simplified calculation - in real implementation, you'd track stage entry/exit times
    return Math.floor(Math.random() * 30) + 5; // Placeholder: 5-35 days
  };

  const calculateConversionRate = (stageName: string, opportunities: Opportunity[]): number => {
    // Simplified calculation - in real implementation, you'd track actual conversions
    return Math.floor(Math.random() * 40) + 20; // Placeholder: 20-60%
  };

  const calculateOverallConversionRate = (stages: PipelineStage[]): number => {
    if (stages.length === 0) return 0;
    const totalRate = stages.reduce((sum, stage) => sum + stage.conversionRate, 0);
    return totalRate / stages.length;
  };

  const calculateAverageSalesCycle = (opportunities: Opportunity[]): number => {
    // Simplified calculation - in real implementation, you'd track actual cycle times
    return Math.floor(Math.random() * 60) + 30; // Placeholder: 30-90 days
  };

  const calculateHealthScore = (stages: PipelineStage[], opportunities: Opportunity[]): number => {
    // Simplified health score calculation
    const avgConversionRate = calculateOverallConversionRate(stages);
    const velocityScore = opportunities.length > 0 ? Math.min(100, (opportunities.length / 10) * 100) : 0;
    const valueScore = stats.totalValue > 0 ? Math.min(100, (stats.totalValue / 100000) * 100) : 0;
    
    return Math.floor((avgConversionRate + velocityScore + valueScore) / 3);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleOpportunityUpdate = (opportunityId: string, updates: Partial<Opportunity>) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.opportunity_id === opportunityId 
          ? { ...opp, ...updates, updated_at: new Date().toISOString() }
          : opp
      )
    );
    // Re-process data after update
    processPipelineData(opportunities);
  };

  if (loading) {
    return (
      <div className="pipeline-dashboard-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading pipeline dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pipeline-dashboard-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchPipelineData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pipeline-dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <button onClick={navigateToHome} className="back-button">
            ← Back to Home
          </button>
          <div className="header-title">
            <h1>Pipeline Control Center</h1>
            <p>Your mission control for opportunity management and client progression</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Pipeline Stats */}
          <div className="stats-section">
            <PipelineStats stats={stats} />
          </div>

          {/* Pipeline Overview */}
          <div className="overview-section">
            <PipelineOverview 
              stages={pipelineStages}
              onOpportunityMove={handleOpportunityUpdate}
            />
          </div>

          {/* AI Insights Panel */}
          <div className="insights-section">
            <AIInsightsPanel 
              opportunities={opportunities}
              stages={pipelineStages}
              stats={stats}
            />
          </div>

          {/* Opportunity Cards */}
          <div className="opportunities-section">
            <PipelineFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <OpportunityCards 
              opportunities={opportunities}
              onOpportunityUpdate={handleOpportunityUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineDashboardPage; 