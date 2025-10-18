import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import Image from '../../../components/Appimage';

const NeighborhoodGuide = ({ neighborhood = {} }) => {
  const [activeCategory, setActiveCategory] = useState('attractions');

  const categories = [
  { id: 'attractions', label: 'Attractions', icon: 'MapPin' },
  { id: 'restaurants', label: 'Dining', icon: 'UtensilsCrossed' },
  { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
  { id: 'transport', label: 'Transport', icon: 'Car' }];


  const mockData = {
    attractions: [
    {
      id: 1,
      name: 'Central Park',
      description: 'Iconic urban park with lakes, walking paths, and recreational activities',
      distance: '0.3 miles',
      walkTime: '5 min walk',
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1585806111075-58e5153ad672",
      imageAlt: 'Aerial view of Central Park with green lawns, trees, and walking paths in Manhattan',
      category: 'Park',
      openHours: '6:00 AM - 1:00 AM'
    },
    {
      id: 2,
      name: 'Times Square',
      description: 'Bustling commercial intersection known for bright lights and Broadway shows',
      distance: '0.8 miles',
      walkTime: '12 min walk',
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1610145903393-ae538cf364d9",
      imageAlt: 'Bright neon billboards and crowded streets of Times Square at night',
      category: 'Entertainment',
      openHours: '24/7'
    },
    {
      id: 3,
      name: 'Empire State Building',
      description: 'Art Deco skyscraper with observation decks offering panoramic city views',
      distance: '1.2 miles',
      walkTime: '18 min walk',
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1582140388172-5651e808ab45",
      imageAlt: 'Empire State Building towering against blue sky with Manhattan skyline',
      category: 'Landmark',
      openHours: '8:00 AM - 2:00 AM'
    }],

    restaurants: [
    {
      id: 1,
      name: 'Le Bernardin',
      description: 'Michelin-starred French seafood restaurant with elegant atmosphere',
      distance: '0.4 miles',
      walkTime: '6 min walk',
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560130934-590b85fc08e7",
      imageAlt: 'Elegant fine dining restaurant interior with white tablecloths and modern lighting',
      category: 'Fine Dining',
      priceRange: '$$$$',
      cuisine: 'French Seafood'
    },
    {
      id: 2,
      name: 'Joe\'s Pizza',
      description: 'Classic New York slice joint serving authentic thin-crust pizza',
      distance: '0.2 miles',
      walkTime: '3 min walk',
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1650126036934-be74ff633fff",
      imageAlt: 'Fresh pizza slice with melted cheese and tomato sauce on paper plate',
      category: 'Casual Dining',
      priceRange: '$',
      cuisine: 'Italian'
    },
    {
      id: 3,
      name: 'Katz\'s Delicatessen',
      description: 'Historic Jewish deli famous for pastrami sandwiches since 1888',
      distance: '1.5 miles',
      walkTime: '22 min walk',
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1574737273449-3538c56cce40",
      imageAlt: 'Traditional deli counter with hanging salamis and vintage signage',
      category: 'Deli',
      priceRange: '$$',
      cuisine: 'Jewish Deli'
    }],

    shopping: [
    {
      id: 1,
      name: 'Fifth Avenue',
      description: 'Luxury shopping street with flagship stores and designer boutiques',
      distance: '0.6 miles',
      walkTime: '9 min walk',
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1656689687062-a8b3aaf855b5",
      imageAlt: 'Busy Fifth Avenue street with luxury storefronts and pedestrians shopping',
      category: 'Luxury Shopping',
      openHours: '10:00 AM - 9:00 PM'
    },
    {
      id: 2,
      name: 'SoHo District',
      description: 'Trendy neighborhood with boutique shops, art galleries, and cafes',
      distance: '2.1 miles',
      walkTime: '8 min subway',
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1710233384399-05779c22a927",
      imageAlt: 'Cobblestone street in SoHo with cast-iron buildings and boutique storefronts',
      category: 'Boutique Shopping',
      openHours: '11:00 AM - 8:00 PM'
    }],

    transport: [
    {
      id: 1,
      name: '59th St-Columbus Circle Station',
      description: 'Major subway hub with access to multiple lines',
      distance: '0.1 miles',
      walkTime: '2 min walk',
      lines: ['A', 'B', 'C', 'D', '1'],
      image: "https://images.unsplash.com/photo-1480394396104-055872e8066e",
      imageAlt: 'Modern subway station platform with train arriving and passengers waiting',
      category: 'Subway'
    },
    {
      id: 2,
      name: 'Penn Station',
      description: 'Major transportation hub for trains to Long Island, New Jersey, and beyond',
      distance: '1.8 miles',
      walkTime: '25 min walk',
      lines: ['LIRR', 'NJ Transit', 'Amtrak'],
      image: "https://images.unsplash.com/photo-1570692042076-da1f59c3698d",
      imageAlt: 'Busy train station concourse with departure boards and travelers with luggage',
      category: 'Train Station'
    }]

  };

  const currentData = mockData?.[activeCategory] || [];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) =>
        <Icon
          key={star}
          name="Star"
          size={14}
          className={star <= Math.round(rating) ? 'text-amber-400 fill-current' : 'text-border'} />

        )}
        <span className="text-sm text-muted-foreground ml-1">{rating}</span>
      </div>);

  };

  return (
    <div className="bg-card rounded-xl shadow-brand-sm border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">Explore the Neighborhood</h3>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide space-x-1">
          {categories?.map((category) =>
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-brand ${
            activeCategory === category?.id ?
            'bg-primary text-primary-foreground' :
            'text-muted-foreground hover:text-foreground hover:bg-muted'}`
            }>

              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {currentData?.map((item) =>
          <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-brand-sm transition-brand">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                  src={item?.image}
                  alt={item?.imageAlt}
                  className="w-20 h-20 rounded-lg object-cover" />

                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground truncate">{item?.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {item?.category}
                        </span>
                        {item?.rating && renderStars(item?.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item?.description}
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="MapPin" size={14} className="text-primary" />
                      <span className="text-muted-foreground">{item?.distance}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item?.walkTime}</span>
                    </div>
                    
                    {item?.openHours &&
                  <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Clock" size={14} className="text-primary" />
                        <span className="text-muted-foreground">{item?.openHours}</span>
                      </div>
                  }
                    
                    {item?.priceRange &&
                  <div className="flex items-center space-x-2 text-sm">
                        <Icon name="DollarSign" size={14} className="text-primary" />
                        <span className="text-muted-foreground">{item?.priceRange}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{item?.cuisine}</span>
                      </div>
                  }
                    
                    {item?.lines &&
                  <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Train" size={14} className="text-primary" />
                        <div className="flex space-x-1">
                          {item?.lines?.map((line, index) =>
                      <span
                        key={index}
                        className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs font-medium">

                              {line}
                            </span>
                      )}
                        </div>
                      </div>
                  }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map View */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Area Map</h4>
            <button className="text-sm text-primary hover:text-primary/80 transition-brand">
              View larger map
            </button>
          </div>
          
          <div className="h-64 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Neighborhood Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7589,-73.9851&z=15&output=embed"
              className="w-full h-full" />

          </div>
        </div>

        {/* Walk Score */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground mb-1">Walk Score</h4>
              <p className="text-sm text-muted-foreground">Most errands can be accomplished on foot</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">92</div>
              <div className="text-sm text-muted-foreground">Walker's Paradise</div>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">95</div>
              <div className="text-xs text-muted-foreground">Transit Score</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">78</div>
              <div className="text-xs text-muted-foreground">Bike Score</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">88</div>
              <div className="text-xs text-muted-foreground">Food Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default NeighborhoodGuide;