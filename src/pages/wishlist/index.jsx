import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import Icon from '../../components/Appicon';
import Image from '../../components/Appimage';

const WishlistPage = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items for the logged-in user
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const fetchWishlist = async () => {
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user.id);
      setWishlistItems(data || []);
      setLoading(false);
    };
    fetchWishlist();
  }, [user]);

  // Remove item from wishlist in Supabase and local state
  const removeFromWishlist = async (itemId) => {
    await supabase
      .from('wishlists')
      .delete()
      .eq('id', itemId)
      .eq('user_id', user.id);
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, index) =>
          <Icon key={index} name="Star" size={14} className="text-yellow-400 fill-current" />
        )}
        {hasHalfStar &&
          <Icon name="Star" size={14} className="text-yellow-400 fill-current opacity-50" />
        }
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>
            Wishlist{user?.full_name ? ` - ${user.full_name}` : user?.email ? ` - ${user.email}` : ''} | StayFinder Pro
          </title>
        </Helmet>
        <Header />
        <div className="flex items-center justify-center py-12">
          <Icon name="Loader" size={32} className="animate-spin text-muted-foreground" />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Wishlist{user?.full_name ? ` - ${user.full_name}` : user?.email ? ` - ${user.email}` : ''} | StayFinder Pro
        </title>
      </Helmet>
      <Header />
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {user?.full_name ? `${user.full_name}'s Wishlist` : user?.email ? `${user.email}'s Wishlist` : 'My Wishlist'}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{wishlistItems.length} saved hotels</span>
              <Button variant="ghost" size="sm">
                <Icon name="Share2" size={16} />
                Share List
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {wishlistItems.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistItems.map((item) =>
                <div key={item.id} className="border border-border rounded-lg overflow-hidden hover-lift">
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-48 object-cover" />

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-brand">
                      <Icon name="Heart" size={16} className="text-red-500 fill-current" />
                    </button>
                    {!item.isAvailable &&
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Not Available
                      </div>
                    }
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.hotelName}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {item.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{item.priceFrom}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      {renderStars(item.rating)}
                      <span className="text-xs text-muted-foreground">
                        {item.reviewCount?.toLocaleString()} reviews
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.amenities?.slice(0, 3).map((amenity, index) =>
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                          {amenity}
                        </span>
                      )}
                      {item.amenities?.length > 3 &&
                        <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                          +{item.amenities.length - 3} more
                        </span>
                      }
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Added {formatDate(item.addedDate)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} />
                          View
                        </Button>
                        {item.isAvailable &&
                          <Button variant="default" size="sm">
                            <Icon name="Calendar" size={14} />
                            Book Now
                          </Button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div> :

            <div className="text-center py-12">
              <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Your Wishlist is Empty</h3>
              <p className="text-muted-foreground mb-4">Save hotels you love to book them later!</p>
              <Button variant="default">
                <Icon name="Search" size={16} />
                Explore Hotels
              </Button>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default WishlistPage;