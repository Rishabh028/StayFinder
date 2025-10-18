import React from 'react';

import {Button} from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalResults, 
  resultsPerPage, 
  onPageChange 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing {startResult?.toLocaleString()}-{endResult?.toLocaleString()} of {totalResults?.toLocaleString()} results
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          {/* Page Numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {getVisiblePages()?.map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`dots-${index}`} className="px-3 py-2 text-muted-foreground">
                    ...
                  </span>
                );
              }
              
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-brand ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          {/* Mobile Page Info */}
          <div className="sm:hidden flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
      {/* Results per page selector */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <span className="text-sm text-muted-foreground">Results per page:</span>
          <div className="flex items-center space-x-2">
            {[12, 24, 48]?.map((count) => (
              <button
                key={count}
                onClick={() => {
                  // This would trigger a results per page change
                  // For now, we'll just show the UI
                }}
                className={`px-3 py-1 rounded text-sm transition-brand ${
                  resultsPerPage === count
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;