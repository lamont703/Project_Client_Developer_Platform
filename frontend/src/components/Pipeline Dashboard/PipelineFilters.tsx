import React from 'react';
import '../../styles/Pipeline Dashboard/PipelineFilters.css';

interface PipelineFiltersProps {
  filters: {
    stage: string;
    assignee: string;
    dateRange: string;
    valueRange: string;
  };
  onFilterChange: (filters: any) => void;
}

export const PipelineFilters: React.FC<PipelineFiltersProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      stage: '',
      assignee: '',
      dateRange: '',
      valueRange: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="pipeline-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label" htmlFor="stage-filter">Pipeline Stage</label>
          <select 
            id="stage-filter"
            className="filter-select"
            value={filters.stage}
            onChange={(e) => handleFilterChange('stage', e.target.value)}
          >
            <option value="">All Stages</option>
            <option value="discovery">Discovery Call</option>
            <option value="qualified">Qualified Lead</option>
            <option value="proposal">Proposal Sent</option>
            <option value="contract">Contract Review</option>
            <option value="closed-won">Closed Won</option>
            <option value="closed-lost">Closed Lost</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="assignee-filter">Assigned To</label>
          <select 
            id="assignee-filter"
            className="filter-select"
            value={filters.assignee}
            onChange={(e) => handleFilterChange('assignee', e.target.value)}
          >
            <option value="">All Assignees</option>
            <option value="me">Assigned to Me</option>
            <option value="unassigned">Unassigned</option>
            <option value="team">Team Members</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="date-filter">Date Range</label>
          <select 
            id="date-filter"
            className="filter-select"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label" htmlFor="value-filter">Value Range</label>
          <select 
            id="value-filter"
            className="filter-select"
            value={filters.valueRange}
            onChange={(e) => handleFilterChange('valueRange', e.target.value)}
          >
            <option value="">All Values</option>
            <option value="0-5000">$0 - $5,000</option>
            <option value="5000-15000">$5,000 - $15,000</option>
            <option value="15000-50000">$15,000 - $50,000</option>
            <option value="50000+">$50,000+</option>
          </select>
        </div>
      </div>

      <div className="quick-filters">
        <button 
          className={`quick-filter ${filters.stage === 'discovery' ? 'active' : ''}`}
          onClick={() => handleFilterChange('stage', filters.stage === 'discovery' ? '' : 'discovery')}
        >
          🔍 Discovery
        </button>
        <button 
          className={`quick-filter ${filters.stage === 'proposal' ? 'active' : ''}`}
          onClick={() => handleFilterChange('stage', filters.stage === 'proposal' ? '' : 'proposal')}
        >
          📄 Proposals
        </button>
        <button 
          className={`quick-filter ${filters.assignee === 'me' ? 'active' : ''}`}
          onClick={() => handleFilterChange('assignee', filters.assignee === 'me' ? '' : 'me')}
        >
          👤 My Opportunities
        </button>
        <button 
          className={`quick-filter ${filters.valueRange === '50000+' ? 'active' : ''}`}
          onClick={() => handleFilterChange('valueRange', filters.valueRange === '50000+' ? '' : '50000+')}
        >
          💎 High Value
        </button>
      </div>
    </div>
  );
}; 