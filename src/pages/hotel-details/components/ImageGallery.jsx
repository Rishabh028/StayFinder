import React, { useState } from 'react';
import Image from '../../../components/Appimage';
import Icon from '../../../components/Appicon';

const ImageGallery = ({ images = [], hotelName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!images?.length) return null;

  return (
    <>
      <div className="relative bg-background rounded-xl overflow-hidden shadow-brand-md">
        {/* Main Image */}
        <div className="relative h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={images?.[currentImageIndex]?.url}
            alt={images?.[currentImageIndex]?.alt}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-brand"
            onClick={() => openLightbox(currentImageIndex)}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-brand shadow-brand-sm"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-brand shadow-brand-sm"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {currentImageIndex + 1} / {images?.length}
          </div>

          {/* 360° Tour Badge */}
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} />
            <span>360° Tour</span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 bg-muted/50">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {images?.slice(0, 8)?.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-brand ${
                  index === currentImageIndex
                    ? 'border-primary shadow-brand-sm'
                    : 'border-transparent hover:border-border'
                }`}
              >
                <Image
                  src={image?.url}
                  alt={image?.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {images?.length > 8 && (
              <button
                onClick={() => openLightbox(0)}
                className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center hover:bg-background transition-brand"
              >
                <span className="text-xs font-medium">+{images?.length - 8}</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-muted transition-brand z-10"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Lightbox Image */}
            <div className="relative bg-background rounded-xl overflow-hidden shadow-brand-lg">
              <Image
                src={images?.[currentImageIndex]?.url}
                alt={images?.[currentImageIndex]?.alt}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Lightbox Navigation */}
              {images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-brand shadow-brand-md"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-brand shadow-brand-md"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </button>
                </>
              )}

              {/* Lightbox Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {currentImageIndex + 1} of {images?.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;