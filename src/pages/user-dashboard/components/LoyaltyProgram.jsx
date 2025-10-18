import React from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const LoyaltyProgram = () => {
  const loyaltyData = {
    currentTier: "Gold",
    currentPoints: 2450,
    nextTier: "Platinum",
    pointsToNextTier: 1550,
    totalPointsForNextTier: 4000,
    memberSince: "2023-03-15",
    benefits: [
      "Free room upgrades (subject to availability)",
      "Late checkout until 2 PM",
      "Complimentary breakfast",
      "Priority customer support",
      "Earn 2x points on all bookings"
    ],
    nextTierBenefits: [
      "Free room upgrades guaranteed",
      "Late checkout until 4 PM",
      "Complimentary breakfast & dinner",
      "Dedicated concierge service",
      "Earn 3x points on all bookings",
      "Access to exclusive properties"
    ],
    recentActivity: [
      {
        id: 1,
        type: "earned",
        points: 180,
        description: "Booking at Grand Plaza Hotel",
        date: "2025-10-12"
      },
      {
        id: 2,
        type: "earned",
        points: 95,
        description: "Review bonus points",
        date: "2025-10-08"
      },
      {
        id: 3,
        type: "redeemed",
        points: -500,
        description: "Room upgrade voucher",
        date: "2025-10-05"
      }
    ]
  };

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'bronze':
        return 'text-amber-600 bg-amber-50';
      case 'silver':
        return 'text-gray-600 bg-gray-50';
      case 'gold':
        return 'text-yellow-600 bg-yellow-50';
      case 'platinum':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'bronze':
        return 'Award';
      case 'silver':
        return 'Medal';
      case 'gold':
        return 'Crown';
      case 'platinum':
        return 'Gem';
      default:
        return 'Star';
    }
  };

  const progressPercentage = (loyaltyData?.currentPoints / loyaltyData?.totalPointsForNextTier) * 100;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Loyalty Program</h2>
          <Button variant="ghost" size="sm">
            <Icon name="Gift" size={16} />
            Redeem Points
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Current Status */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTierColor(loyaltyData?.currentTier)}`}>
                <Icon name={getTierIcon(loyaltyData?.currentTier)} size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{loyaltyData?.currentTier} Member</h3>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(loyaltyData.memberSince)?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{loyaltyData?.currentPoints?.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Points Available</p>
            </div>
          </div>

          {/* Progress to Next Tier */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress to {loyaltyData?.nextTier}</span>
              <span className="text-sm text-muted-foreground">
                {loyaltyData?.pointsToNextTier?.toLocaleString()} points needed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Benefits */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center">
              <Icon name="CheckCircle" size={20} className="mr-2 text-green-600" />
              Your {loyaltyData?.currentTier} Benefits
            </h4>
            <div className="space-y-2">
              {loyaltyData?.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Tier Benefits */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center">
              <Icon name="Star" size={20} className="mr-2 text-purple-600" />
              Unlock {loyaltyData?.nextTier} Benefits
            </h4>
            <div className="space-y-2">
              {loyaltyData?.nextTierBenefits?.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="Star" size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-4">Recent Points Activity</h4>
          <div className="space-y-3">
            {loyaltyData?.recentActivity?.map((activity) => (
              <div key={activity?.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity?.type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Icon 
                      name={activity?.type === 'earned' ? 'Plus' : 'Minus'} 
                      size={14} 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(activity?.date)}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  activity?.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {activity?.type === 'earned' ? '+' : ''}{activity?.points?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" fullWidth>
              <Icon name="History" size={16} />
              View Full Points History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;