import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabaseClient';
import Icon from '../../../components/Appicon';
import { Button } from '../../../components/ui/Button';
import Image from '../../../components/ui/Image'; // NEW: Import for the Image component

const WishlistSection = () => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // UPDATED: The fetch function now gets more details from the hotels table
    const fetchWishlist = async () => {
        if (!user) {
            setLoading(false);
            return;
        };
        setLoading(true);
        const { data, error } = await supabase
            .from('wishlists')
            .select(`
                id,
                created_at,
                hotel_id,
                hotels (
                    id,
                    name,
                    location,
                    image_url,
                    price_per_night,
                    rating,
                    reviews_count,
                    amenities,
                    is_available
                )
            `)
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching wishlist:', error);
        } else {
            setWishlist(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWishlist();
    }, [user]);

    // This function correctly deletes the item from the database
    const removeFromWishlist = async (wishlistId) => {
        const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('id', wishlistId);

        if (error) {
            alert(error.message);
        } else {
            // Refresh the list after deleting
            fetchWishlist();
        }
    };

    // NEW: Helper function to format dates
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    // NEW: Helper function to render star ratings
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
        return <div className="text-center p-12">Loading your wishlist...</div>;
    }

    // UPDATED: This is the new, more detailed UI from your second file
    return (
        <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">My Wishlist</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{wishlist.length} saved hotels</span>
                        <Button variant="ghost" size="sm">
                            <Icon name="Share2" size={16} />
                            Share List
                        </Button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wishlist.map((item) => (
                            <div key={item.id} className="border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="relative">
                                    <Image
                                        src={item.hotels.image_url}
                                        alt={item.hotels.name}
                                        className="w-full h-48 object-cover" />

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
                                        <Icon name="Heart" size={16} className="text-red-500 fill-current" />
                                    </button>
                                    {!item.hotels.is_available && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                            Not Available
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{item.hotels.name}</h3>
                                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                                                <Icon name="MapPin" size={14} className="mr-1" />
                                                {item.hotels.location}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-foreground">${item.hotels.price_per_night}</p>
                                            <p className="text-xs text-muted-foreground">per night</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        {renderStars(item.hotels.rating)}
                                        <span className="text-xs text-muted-foreground">
                                            {item.hotels.reviews_count?.toLocaleString()} reviews
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {item.hotels.amenities?.slice(0, 3).map((amenity, index) => (
                                            <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                                                {amenity}
                                            </span>
                                        ))}
                                        {item.hotels.amenities?.length > 3 && (
                                            <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                                                +{item.hotels.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Added {formatDate(item.created_at)}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Icon name="Eye" size={14} />
                                                View
                                            </Button>
                                            {item.hotels.is_available && (
                                                <Button variant="default" size="sm">
                                                    <Icon name="Calendar" size={14} />
                                                    Book Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">Your Wishlist is Empty</h3>
                        <p className="text-muted-foreground mb-4">Save hotels you love to book them later!</p>
                        <Button variant="default">
                            <Icon name="Search" size={16} />
                            Explore Hotels
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistSection;
