import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';
import { Button } from '../../../components/ui/Button';

const ReviewsSection = ({ reviews = [], overallRating = 0, totalReviews = 0 }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 65 },
    { stars: 4, count: 48, percentage: 20 },
    { stars: 3, count: 24, percentage: 10 },
    { stars: 2, count: 7, percentage: 3 },
    { stars: 1, count: 5, percentage: 2 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={star <= rating ? 'text-amber-400 fill-current' : 'text-border'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-brand-sm border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Guest Reviews</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(overallRating), 20)}
                <span className="text-2xl font-bold text-foreground">{overallRating?.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-background focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-background focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {filterOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Rating Distribution */}
        <div className="mb-8">
          <h4 className="font-medium text-foreground mb-4">Rating Breakdown</h4>
          <div className="space-y-2">
            {ratingDistribution?.map((item) => (
              <div key={item?.stars} className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground w-8">{item?.stars} ★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{item?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews?.map((review) => (
            <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start space-x-4">
                <Image
                  src={review?.avatar}
                  alt={review?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-foreground">{review?.name}</h5>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review?.rating)}
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review?.date)}
                        </span>
                      </div>
                    </div>
                    
                    {review?.verified && (
                      <div className="flex items-center space-x-1 text-success text-sm mt-2 sm:mt-0">
                        <Icon name="CheckCircle" size={16} />
                        <span>Verified Stay</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <p className="text-foreground leading-relaxed">{review?.comment}</p>
                  </div>

                  {review?.images && review?.images?.length > 0 && (
                    <div className="flex space-x-2 mb-3 overflow-x-auto">
                      {review?.images?.map((image, index) => (
                        <Image
                          key={index}
                          src={image?.url}
                          alt={image?.alt}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-brand"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Room: {review?.roomType}</span>
                      <span>Stay: {review?.stayDuration}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-brand">
                        <Icon name="ThumbsUp" size={16} />
                        <span>{review?.helpful}</span>
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-foreground transition-brand">
                        Report
                      </button>
                    </div>
                  </div>

                  {review?.hotelResponse && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Building2" size={16} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">Hotel Response</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review?.hotelResponse?.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review?.hotelResponse?.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {reviews?.length > 3 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews?.length} Reviews`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;