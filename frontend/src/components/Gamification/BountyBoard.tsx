import React, { useState, useEffect } from 'react';
import WLFIService, { BountyData } from '../../utils/wlfiService';
import BountyCard from './BountyCard';
import '../../styles/Gamification/BountyBoard.css';

const BountyBoard: React.FC = () => {
  const [bounties, setBounties] = useState<BountyData[]>([]);
  const [filteredBounties, setFilteredBounties] = useState<BountyData[]>([]);
  const [filters, setFilters] = useState({
    category: 'All',
    difficulty: 'All',
    status: 'All',
    search: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBounties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bounties, filters]);

  const loadBounties = async () => {
    setIsLoading(true);
    try {
      const wlfiService = WLFIService.getInstance();
      const bountyData = wlfiService.getBounties();
      setBounties(bountyData);
    } catch (error) {
      console.error('Failed to load bounties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bounties];

    if (filters.category !== 'All') {
      filtered = filtered.filter(bounty => bounty.category === filters.category);
    }

    if (filters.difficulty !== 'All') {
      filtered = filtered.filter(bounty => bounty.difficulty === filters.difficulty);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(bounty => bounty.status === filters.status);
    }

    if (filters.search) {
      filtered = filtered.filter(bounty => 
        bounty.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        bounty.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        bounty.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    setFilteredBounties(filtered);
  };

  const handleApply = (bountyId: string) => {
    // TODO: Implement bounty application logic
    console.log('Applying to bounty:', bountyId);
  };

  const handleViewDetails = (bountyId: string) => {
    // TODO: Implement bounty details view
    console.log('Viewing details for bounty:', bountyId);
  };

  const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Design', 'Documentation', 'Testing'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];
  const statuses = ['All', 'Open', 'In Progress', 'Completed', 'Cancelled'];

  if (isLoading) {
    return (
      <div className="bounty-board">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading bounties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bounty-board">
      <div className="bounty-board-header">
        <h2 className="board-title">Available Bounties</h2>
        <p className="board-subtitle">Complete tasks and earn WLFI tokens</p>
      </div>

      <div className="bounty-filters">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search bounties..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="filter-select"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bounty-stats">
        <div className="stat-item">
          <span className="stat-number">{filteredBounties.length}</span>
          <span className="stat-label">Available Bounties</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredBounties.reduce((sum, bounty) => sum + bounty.reward, 0)}
          </span>
          <span className="stat-label">Total WLFI Rewards</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredBounties.filter(b => b.status === 'Open').length}
          </span>
          <span className="stat-label">Open Bounties</span>
        </div>
      </div>

      <div className="bounty-grid">
        {filteredBounties.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">��</div>
            <h3>No bounties found</h3>
            <p>Try adjusting your filters or check back later for new opportunities.</p>
          </div>
        ) : (
          filteredBounties.map(bounty => (
            <BountyCard
              key={bounty.id}
              bounty={bounty}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BountyBoard; 