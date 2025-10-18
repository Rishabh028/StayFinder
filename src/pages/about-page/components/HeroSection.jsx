import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/Appicon';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1597731181247-37f730e0e829"
          alt="Luxury hotel lobby with elegant architecture, marble floors, and sophisticated lighting representing StayFinder Pro's premium hospitality partners"
          className="w-full h-full object-cover" />

      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }} />

        <motion.div
          className="absolute top-40 right-16 w-6 h-6 bg-white/15 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }} />

        <motion.div
          className="absolute bottom-32 left-20 w-3 h-3 bg-white/25 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }} />

      </div>
      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}>

            <Icon name="Award" size={16} className="text-white" />
            <span className="text-white text-sm font-medium">Trusted by 2M+ Travelers Worldwide</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}>

            Where{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Wanderlust
            </span>
            <br />
            Meets{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Reliability
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}>

            Transforming hotel booking into inspiring journeys of discovery. 
            Every destination tells a story, and we're here to help you write yours.
          </motion.p>

          {/* Video Play Button */}
          <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}>

            <button
              onClick={handlePlayVideo}
              className="group relative flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110">

              <Icon
                name="Play"
                size={28}
                className="text-white ml-1 group-hover:scale-110 transition-transform duration-300" />

              
              {/* Ripple Effect */}
              <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping"></div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </button>

            <p className="text-white/80 text-sm">Watch Our Story</p>
          </motion.div>

          {/* Key Values */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Trust Through Transparency</h3>
              <p className="text-white/70 text-sm">Honest reviews, verified properties, and secure transactions</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
                <Icon name="Search" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Choice Through Intelligence</h3>
              <p className="text-white/70 text-sm">AI-powered recommendations tailored to your preferences</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Confidence Through Execution</h3>
              <p className="text-white/70 text-sm">Seamless booking experience from search to stay</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Video Modal */}
      {isVideoPlaying &&
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}>

          <div className="relative w-full max-w-4xl mx-4">
            <button
            onClick={() => setIsVideoPlaying(false)}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">

              <Icon name="X" size={24} />
            </button>
            
            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
              <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="StayFinder Pro Company Story"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
            </div>
          </div>
        </motion.div>
      }
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}>

        <div className="flex flex-col items-center space-y-2">
          <p className="text-white/60 text-xs">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>

            <Icon name="ChevronDown" size={20} className="text-white/60" />
          </motion.div>
        </div>
      </motion.div>
    </section>);

};

export default HeroSection;