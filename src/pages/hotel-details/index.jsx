import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/Appicon';
import { Button } from '../../components/ui/Button';
import ImageGallery from './components/ImageGallery';
import BookingWidget from './components/BookingWidget';
import PropertyInfo from './components/PropertyInfo';
import ReviewsSection from './components/ReviewsSection';
import NeighborhoodGuide from './components/NeighborhoodGuide';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient'; // Import Supabase client

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Define error state
  const [showShareModal, setShowShareModal] = useState(false);

  // --- Mock data (will be replaced by fetched data) ---
  // Mock images data
  const images = [
    {
      url: "https://images.unsplash.com/photo-1660268528493-961cb8550b2c",
      alt: 'Luxurious hotel lobby with marble floors, crystal chandeliers, and elegant seating areas'
    },
    {
      url: "https://images.unsplash.com/photo-1630142346495-8c0aa0c87842",
      alt: 'Modern hotel room with king bed, city view windows, and contemporary furnishings'
    },
    {
      url: "https://images.unsplash.com/photo-1552152798-574e5018a0d9",
      alt: 'Rooftop infinity pool overlooking Manhattan skyline at sunset'
    },
    {
      url: "https://images.unsplash.com/photo-1662472460736-e26f7a49e90a",
      alt: 'Elegant hotel restaurant with fine dining setup and ambient lighting'
    },
    {
      url: "https://images.unsplash.com/photo-1580407573078-75c6d2d174eb",
      alt: 'Spacious hotel bathroom with marble vanity, soaking tub, and premium amenities'
    },
    {
      url: "https://images.unsplash.com/photo-1721394749382-223a18ce8bb9",
      alt: 'Modern fitness center with cardio equipment and floor-to-ceiling windows'
    },
    {
      url: "https://images.unsplash.com/photo-1721394749120-9ecece150e64",
      alt: 'Tranquil spa treatment room with massage table and calming decor'
    },
    {
      url: "https://images.unsplash.com/photo-1663816627397-f284e6bfe57d",
      alt: 'Hotel bar area with craft cocktails, modern seating, and city views'
    }];
  // Mock rooms data
  const rooms = [
    { id: 1, name: 'Deluxe City View', price: 299, /* ... */ },
    {
      id: 1,
      name: 'Deluxe City View',
      description: 'Spacious room with panoramic city views and modern amenities',
      price: 299,
      maxGuests: 2,
      size: '350 sq ft',
      bedType: 'King Bed'
    },
    {
      id: 2,
      name: 'Executive Suite',
      description: 'Luxurious suite with separate living area and premium amenities',
      price: 499,
      maxGuests: 4,
      size: '650 sq ft',
      bedType: 'King Bed + Sofa Bed'
    },
    {
      id: 3,
      name: 'Premium Corner Room',
      description: 'Corner room with floor-to-ceiling windows and enhanced city views',
      price: 399,
      maxGuests: 2,
      size: '400 sq ft',
      bedType: 'King Bed'
    },
    {
      id: 4,
      name: 'Presidential Suite',
      description: 'Ultimate luxury with private terrace and personalized service',
      price: 899,
      maxGuests: 6,
      size: '1200 sq ft',
      bedType: 'King Bed + Queen Bed'
    }];
  // Mock reviews data
  const reviews = [
    { id: 1, name: 'Sarah Johnson', /* ... */ },
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: "https://images.unsplash.com/photo-1683203438694-b428d712b8da",
      avatarAlt: 'Professional headshot of blonde woman in business attire smiling at camera',
      rating: 5,
      date: '2024-10-10',
      comment: `Absolutely exceptional experience at The Grand Manhattan! From the moment we walked into the stunning lobby, we knew this was going to be special. Our room had breathtaking city views, and the attention to detail was remarkable. The concierge team went above and beyond to help us secure last-minute Broadway tickets. The rooftop pool area is simply magical at sunset. Will definitely be returning on our next NYC trip!`,
      roomType: 'Executive Suite',
      stayDuration: '3 nights',
      verified: true,
      helpful: 24,
      images: [
        {
          url: "https://images.unsplash.com/photo-1541922633525-b39c46b1b219",
          alt: 'Guest photo of rooftop pool area with city skyline view at golden hour'
        },
        {
          url: "https://images.unsplash.com/photo-1619292585355-ab0e3fd509fe",
          alt: 'Guest photo of hotel room interior showing bed and city view through large windows'
        }],

      hotelResponse: {
        date: '2024-10-11',
        message: 'Dear Sarah, thank you so much for this wonderful review! We\'re thrilled that you enjoyed your stay and that our team could help make your Broadway experience memorable. We look forward to welcoming you back to The Grand Manhattan soon!'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: "https://images.unsplash.com/photo-1629272039203-7d76fdaf1324",
      avatarAlt: 'Professional headshot of Asian man in navy suit with friendly smile',
      rating: 4,
      date: '2024-10-08',
      comment: `Great location and solid service overall. The room was clean and comfortable, though slightly smaller than expected for the price point. The fitness center is well-equipped and the staff was very helpful with restaurant recommendations. The only minor issue was some noise from the street, but the blackout curtains helped. Would recommend for business travelers looking for a central location.`,
      roomType: 'Deluxe City View',
      stayDuration: '2 nights',
      verified: true,
      helpful: 18,
      images: []
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: "https://images.unsplash.com/photo-1587110107796-1acdcd466b58",
      avatarAlt: 'Casual photo of Hispanic woman with long dark hair wearing denim jacket',
      rating: 5,
      date: '2024-10-05',
      comment: `This hotel exceeded all expectations! Celebrating our anniversary here was perfect. The spa treatments were incredibly relaxing, and the restaurant\'s tasting menu was outstanding. Our room was beautifully appointed with thoughtful touches like fresh flowers and champagne upon arrival. The staff remembered it was our special occasion throughout our stay. Truly a five-star experience that we\'ll treasure forever.`,
      roomType: 'Premium Corner Room', stayDuration: '4 nights',
      verified: true,
      helpful: 31,
      images: [
        {
          url: "https://images.unsplash.com/photo-1726973018865-4d28cd1c0c55", alt: 'Guest photo of anniversary dinner setup with candles and flowers in hotel restaurant'
        }],

      hotelResponse: {
        date: '2024-10-06', message: 'Dear Emily, congratulations on your anniversary! We\'re so honored that you chose The Grand Manhattan for this special celebration. Thank you for sharing your experience - it means the world to our team to know we made your stay memorable.'
      }
    },
    {
      id: 4,
      name: 'David Thompson',
      avatar: "https://images.unsplash.com/photo-1735181094336-7fa757df9622",
      avatarAlt: 'Professional headshot of middle-aged man with gray beard in dark suit',
      rating: 4,
      date: '2024-10-02',
      comment: `Solid business hotel with excellent meeting facilities. The conference rooms are well-equipped and the business center staff was very accommodating for our corporate event. Rooms are comfortable and the location is perfect for accessing clients downtown. The executive lounge breakfast was a nice touch. Only minor complaint is that the WiFi could be faster in some areas of the building.`,
      roomType: 'Executive Suite',
      stayDuration: '5 nights',
      verified: true,
      helpful: 12,
      images: []
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: "https://images.unsplash.com/photo-1676083192960-2a4873858487",
      avatarAlt: 'Smiling Asian woman with short black hair wearing casual sweater',
      rating: 5,
      date: '2024-09-28',
      comment: `Family vacation perfection! The kids loved the pool area and the staff was so accommodating with extra towels and pool toys. Our connecting rooms were perfect for our family of five. The location made it easy to walk to many attractions, and the concierge helped us plan our daily activities. The room service was prompt and the kids\' menu had great options. Highly recommend for families visiting NYC!`,
      roomType: 'Deluxe City View', stayDuration: '6 nights',
      verified: true,
      helpful: 27,
      images: [
        {
          url: "https://images.unsplash.com/photo-1696862024934-5f3d42c4a1f3", alt: 'Family photo at hotel pool with children playing in water and city skyline background'
        }]

    }];
  // --- End of Mock Data ---

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!id) {
        navigate('/404');
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError || !data) {
          throw fetchError || new Error('Hotel not found');
        }

        setHotel(data);
      } catch (e) {
        console.error('Failed to fetch hotel details:', e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel?.name,
        text: `Check out this amazing hotel: ${hotel?.name}`,
        url: window.location?.href
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    alert('Link copied to clipboard!');
    setShowShareModal(false);
  };

  if (isLoading) {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <p>Loading hotel details...</p>
        </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Hotel Not Found</h1>
        <p className="text-muted-foreground">{error || 'Could not load details for this hotel. It might have been removed.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/homepage')}
                className="text-muted-foreground hover:text-foreground transition-brand">

                Home
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <button
                onClick={() => navigate('/search-results')}
                className="text-muted-foreground hover:text-foreground transition-brand">

                Search Results
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">{hotel?.name}</span>
            </nav>
          </div>
        </div>

        {/* Hotel Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) =>
                  <Icon
                    key={star}
                    name="Star"
                    size={18}
                    className={star <= Math.round(hotel?.rating) ? 'text-amber-400 fill-current' : 'text-border'} />

                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {hotel?.rating} ({hotel?.review_count || 0} reviews)
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">{hotel?.name}</h1>
              
              <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{hotel?.address}</span>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Verified Property</span>
                </div>
                <div className="flex items-center space-x-1 text-primary">
                  <Icon name="Award" size={16} />
                  <span>Top Rated</span>
                </div>
                <div className="flex items-center space-x-1 text-accent">
                  <Icon name="Zap" size={16} />
                  <span>Instant Booking</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Users" size={16} />
                  <span>Booked 47 times today</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleShare} iconName="Share" iconPosition="left">
                Share
              </Button>
              <Button variant="outline" iconName="Heart" iconPosition="left">
                Save
              </Button>
              <Button variant="outline" iconName="Camera" iconPosition="left">
                Photos
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <ImageGallery images={hotel.gallery_images || images} hotelName={hotel?.name} />

              {/* Property Information */}
              <PropertyInfo hotel={hotel} />

              {/* Reviews Section */}
              <ReviewsSection
                reviews={reviews}
                overallRating={hotel?.rating}
                totalReviews={hotel?.review_count} />


              {/* Neighborhood Guide */}
              <NeighborhoodGuide location={hotel.location} />
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget hotel={hotel} rooms={rooms} />
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal &&
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card rounded-xl shadow-brand-lg border border-border p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Share this hotel</h3>
                <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-brand">

                  <Icon name="X" size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <button
                onClick={() => copyToClipboard(window.location?.href)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-brand text-left">

                  <Icon name="Link" size={20} />
                  <span className="text-foreground">Copy link</span>
                </button>

                <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out ${hotel?.name}&url=${window.location?.href}`, '_blank')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-brand text-left">

                  <Icon name="Twitter" size={20} />
                  <span className="text-foreground">Share on Twitter</span>
                </button>

                <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location?.href}`, '_blank')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-brand text-left">

                  <Icon name="Facebook" size={20} />
                  <span className="text-foreground">Share on Facebook</span>
                </button>

                <button
                onClick={() => window.open(`mailto:?subject=Check out ${hotel?.name}&body=I found this amazing hotel: ${window.location?.href}`, '_blank')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-brand text-left">

                  <Icon name="Mail" size={20} />
                  <span className="text-foreground">Share via email</span>
                </button>
              </div>
            </div>
          </div>
        }
      </main>
    </div>);

};

export default HotelDetails;