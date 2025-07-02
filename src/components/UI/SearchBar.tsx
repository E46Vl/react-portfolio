import React, { useState } from 'react';
import Icon from './Icon';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  showFilters?: boolean;
  filters?: {
    author?: string;
    dateRange?: string;
    sortBy?: string;
  };
  onFilterChange?: (filters: any) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  onClear,
  showFilters = false,
  filters = {},
  onFilterChange,
  className = '',
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const handleFilterChange = (key: string, value: string) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  return (
    <div className={`search-container ${className}`}>
      {/* Main Search Input */}
      <div className="input-group">
        <span className="input-group-text bg-transparent border-end-0">
          <Icon name="FiSearch" />
        </span>
        <input
          type="search"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search"
        />
        {value && (
          <button
            className="btn btn-outline-secondary border-start-0"
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <Icon name="FiX" />
          </button>
        )}
        {showFilters && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            aria-label="Toggle filters"
          >
            <Icon name="FiFilter" />
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && showAdvancedFilters && (
        <div className="card mt-3">
          <div className="card-body">
            <h6 className="card-title mb-3">
              <Icon name="FiFilter" className="me-1" />
              Advanced Filters
            </h6>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label small">Author</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Filter by author..."
                  value={filters.author || ''}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">Date Range</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.dateRange || ''}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                >
                  <option value="">All time</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                  <option value="year">This year</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small">Sort By</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.sortBy || ''}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="">Relevance</option>
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title A-Z</option>
                  <option value="author">Author A-Z</option>
                </select>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  if (onFilterChange) {
                    onFilterChange({});
                  }
                }}
              >
                Clear Filters
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 