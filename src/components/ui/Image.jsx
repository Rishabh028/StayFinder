import React from 'react';

const Image = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
      onError={(e) => {
        e.target.src = '/placeholder-image.jpg';
      }}
    />
  );
};

export default Image;