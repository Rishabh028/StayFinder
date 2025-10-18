import React from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const SortAndView = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  totalResults,
  currentPage,
  resultsPerPage 
}) => {
  const sortOptions = [
    { value: 'recommended', label: 'Recommended', icon: 'Star' },
    { value: 'price_low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price_high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Guest Rating', icon: 'Heart' },
    { value: 'distance', label: 'Distance from Center', icon: 'MapPin' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Showing {startResult}-{endResult} of {totalResults?.toLocaleString()} properties
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              iconName={currentSort?.icon || 'ArrowUpDown'}
              iconPosition="left"
              className="min-w-[160px] justify-between"
            >
              <span>{currentSort?.label || 'Sort by'}</span>
              <Icon name="ChevronDown" size={16} className="ml-2" />
            </Button>
            
            <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-brand-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-brand z-10">
              <div className="py-2">
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => onSortChange(option?.value)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-brand ${
                      sortBy === option?.value ? 'text-primary font-medium bg-muted' : 'text-popover-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} />
                    <span>{option?.label}</span>
                    {sortBy === option?.value && (
                      <Icon name="Check" size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('list')}
              className={`flex items-center justify-center w-8 h-8 rounded transition-brand ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="List View"
            >
              <Icon name="List" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center justify-center w-8 h-8 rounded transition-brand ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`flex items-center justify-center w-8 h-8 rounded transition-brand ${
                viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Map View"
            >
              <Icon name="Map" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortAndView;