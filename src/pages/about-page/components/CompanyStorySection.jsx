import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/Appicon';

const CompanyStorySection = () => {
  const milestones = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Founded with a simple mission: make hotel booking as inspiring as the journey itself.',
    icon: 'Rocket',
    color: 'blue'
  },
  {
    year: '2020',
    title: 'First 10K Users',
    description: 'Reached our first 10,000 travelers despite global challenges, proving the need for better booking experiences.',
    icon: 'Users',
    color: 'green'
  },
  {
    year: '2021',
    title: 'AI Integration',
    description: 'Launched intelligent recommendation engine, personalizing hotel discovery for every traveler.',
    icon: 'Brain',
    color: 'purple'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded to 50+ countries with partnerships across 25,000+ properties worldwide.',
    icon: 'Globe',
    color: 'orange'
  },
  {
    year: '2023',
    title: 'Innovation Awards',
    description: 'Recognized as "Travel Technology Innovation of the Year" for our seamless booking experience.',
    icon: 'Award',
    color: 'yellow'
  },
  {
    year: '2024',
    title: 'The Future',
    description: 'Continuing to revolutionize travel with cutting-edge technology and unmatched user experience.',
    icon: 'Star',
    color: 'pink'
  }];


  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span className="text-primary text-sm font-medium">Our Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Story Behind{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              StayFinder Pro
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born from a frustration with impersonal booking experiences, we set out to create 
            something different—a platform where technology serves wanderlust, and every search 
            becomes a step toward discovery.
          </p>
        </motion.div>

        {/* Founding Story */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              It Started with a Simple Question
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                "Why does booking a hotel feel like a chore instead of the exciting first step of an adventure?"
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Our founders, seasoned travelers and technology enthusiasts, noticed that while travel itself 
                had become more accessible, the booking experience remained frustratingly impersonal. 
                Endless options without guidance, generic recommendations without context, and transactions 
                without trust.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                We believed travelers deserved better. They deserved a platform that understood their unique 
                preferences, respected their time, and transformed the booking process from a necessary 
                evil into an inspiring preview of their upcoming journey.
              </p>
            </div>

            {/* Core Values Preview */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Heart" size={20} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">Passion</h4>
                <p className="text-xs text-muted-foreground mt-1">For travel & discovery</p>
              </div>
              
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={20} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">Trust</h4>
                <p className="text-xs text-muted-foreground mt-1">Through transparency</p>
              </div>
              
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={20} className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">Innovation</h4>
                <p className="text-xs text-muted-foreground mt-1">In every detail</p>
              </div>
            </div>
          </div>

          {/* Founder Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd"
                alt="StayFinder Pro founding team in modern office space, collaborating around a table with laptops and travel magazines, representing the entrepreneurial spirit behind the platform"
                className="w-full h-full object-cover" />

              
              {/* Overlay with quote */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-8 text-white">
                  <blockquote className="text-lg font-medium mb-2">
                    "Every great journey begins with a single step. We wanted that step to be extraordinary."
                  </blockquote>
                  <cite className="text-sm opacity-90">— Sarah Chen, Co-Founder & CEO</cite>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white shadow-lg rounded-lg p-4 border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}>

              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2M+</div>
                <div className="text-xs text-muted-foreground">Happy Travelers</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-lg p-4 border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-xs text-muted-foreground">Partner Hotels</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Milestones</h3>
            <p className="text-lg text-muted-foreground">
              From startup to scale, every step has been guided by our commitment to better travel experiences
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500"></div>

            <div className="space-y-12">
              {milestones?.map((milestone, index) =>
              <motion.div
                key={milestone?.year}
                className={`flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'}`
                }
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}>

                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg bg-${milestone?.color}-100 flex-shrink-0`}>
                          <Icon name={milestone?.icon} size={20} className={`text-${milestone?.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                              {milestone?.year}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {milestone?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {milestone?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full shadow-sm"></div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default CompanyStorySection;