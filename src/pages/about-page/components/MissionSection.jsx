import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/Appicon';

const MissionSection = () => {
  const principles = [
  {
    title: 'Trust Through Transparency',
    description: 'Every review is verified, every price is honest, and every booking is secure. We believe transparency builds the foundation for memorable journeys.',
    icon: 'Shield',
    color: 'blue',
    stats: { label: 'Verified Reviews', value: '500K+' }
  },
  {
    title: 'Choice Through Intelligence',
    description: 'Our AI-powered platform learns your preferences and curates personalized recommendations, turning overwhelming options into perfect matches.',
    icon: 'Brain',
    color: 'purple',
    stats: { label: 'Smart Matches', value: '95%' }
  },
  {
    title: 'Confidence Through Execution',
    description: 'From search to checkout, every interaction is designed for simplicity and reliability. Your perfect stay is just clicks away.',
    icon: 'Zap',
    color: 'green',
    stats: { label: 'Booking Success', value: '99.8%' }
  }];


  const impactAreas = [
  {
    title: 'Travelers',
    description: 'Empowering 2M+ travelers to discover their perfect stays with confidence and ease.',
    icon: 'Users',
    metric: '2M+ Bookings'
  },
  {
    title: 'Hotel Partners',
    description: 'Supporting 50K+ properties worldwide to reach the right guests at the right time.',
    icon: 'Building2',
    metric: '50K+ Partners'
  },
  {
    title: 'Communities',
    description: 'Contributing to local economies by connecting travelers with authentic accommodations.',
    icon: 'MapPin',
    metric: '150+ Cities'
  },
  {
    title: 'Innovation',
    description: 'Pioneering travel technology that makes booking as inspiring as the journey itself.',
    icon: 'Lightbulb',
    metric: '12 Patents'
  }];


  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-primary text-sm font-medium">Our Mission</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            Transforming{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Hotel Booking
            </span>
            <br />
            Into Inspiring{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Journeys
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            We believe that every great journey begins with the perfect stay. Our mission is to make 
            discovering and booking that perfect accommodation as exciting and effortless as the adventure 
            that follows.
          </p>

          {/* Mission Video/Visual */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}>

            <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl overflow-hidden border border-border">
              <img
                src="https://images.unsplash.com/photo-1647249893022-9287c83b8cc3"
                alt="Diverse group of travelers using StayFinder Pro on various devices in an elegant hotel lobby, showcasing the platform's accessibility and user-friendly design"
                className="w-full h-full object-cover" />

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end">
                <div className="p-8 text-white w-full">
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-1">2M+</div>
                      <div className="text-sm opacity-90">Travelers Served</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">150+</div>
                      <div className="text-sm opacity-90">Countries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">99.8%</div>
                      <div className="text-sm opacity-90">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Core Principles</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Three fundamental beliefs that guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles?.map((principle, index) =>
            <motion.div
              key={principle?.title}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}>

                <div className={`w-16 h-16 bg-${principle?.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={principle?.icon} size={28} className={`text-${principle?.color}-600`} />
                </div>

                <h4 className="text-xl font-bold text-foreground mb-4">
                  {principle?.title}
                </h4>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {principle?.description}
                </p>

                <div className={`p-4 bg-${principle?.color}-50 rounded-lg border border-${principle?.color}-100`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {principle?.stats?.label}
                    </span>
                    <span className={`text-lg font-bold text-${principle?.color}-600`}>
                      {principle?.stats?.value}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Impact Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Impact</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We measure success not just in bookings, but in the positive impact we create for 
              travelers, partners, and communities worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas?.map((area, index) =>
            <motion.div
              key={area?.title}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}>

                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={area?.icon} size={24} className="text-primary" />
                </div>

                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {area?.title}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {area?.description}
                </p>

                <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-2 rounded-full">
                  {area?.metric}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          className="mt-24 bg-gradient-to-r from-primary/10 via-purple-600/10 to-green-600/10 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Eye" size={28} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-6">Our Vision for the Future</h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To become the world's most trusted travel companion, where every booking is the beginning of an extraordinary story, and every traveler feels confident they've found their perfect match.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/50 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-foreground">
                Global Reach
              </span>
              <span className="bg-white/50 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-foreground">
                Personal Touch
              </span>
              <span className="bg-white/50 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-foreground">
                Sustainable Travel
              </span>
              <span className="bg-white/50 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-foreground">
                Innovation First
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default MissionSection;