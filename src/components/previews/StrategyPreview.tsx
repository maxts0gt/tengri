"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const campaignShowcases = [
  {
    id: 'digital-movement',
    name: 'Digital Movement Building',
    description: 'Transforming campaigns through data-driven strategy and digital innovation',
    image: {
      src: '/images/strategy/movement-building.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...'
    },
    capabilities: [
      'Voter Analytics',
      'Campaign Infrastructure',
      'Digital Engagement',
      'Real-time Insights'
    ]
  },
  {
    id: 'marketing-campaigns',
    name: 'Strategic Communications',
    description: 'Multi-channel campaigns that drive measurable results',
    image: {
      src: '/images/strategy/marketing-campaign.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...'
    },
    capabilities: [
      'Brand Strategy',
      'Content Strategy',
      'Social Media',
      'Performance Marketing'
    ]
  },
  {
    id: 'data-analytics',
    name: 'Audience Intelligence',
    description: 'Deep insights driving targeted engagement strategies',
    image: {
      src: '/images/strategy/data-insights.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...'
    },
    capabilities: [
      'Audience Analysis',
      'Behavioral Insights',
      'Engagement Metrics',
      'ROI Tracking'
    ]
  }
];

const StrategyPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeShowcase = campaignShowcases[activeIndex];

  return (
    <div className="mt-4 space-y-8">
      <div className="relative h-[320px] rounded-xl overflow-hidden border border-white/10">
        <Image
          src={activeShowcase.image.src}
          alt={activeShowcase.name}
          width={activeShowcase.image.width}
          height={activeShowcase.image.height}
          quality={90}
          priority={activeIndex === 0}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dynamic Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light text-white">
                {activeShowcase.name}
              </h3>
              <p className="text-white/80 text-sm">
                {activeShowcase.description}
              </p>
              
              {/* Capabilities Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {activeShowcase.capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-accent">→</span>
                    <span className="text-white/90 text-sm">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center py-4">
        <div className="grid grid-cols-3 gap-8">
          {campaignShowcases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group focus:outline-none w-24 h-12 flex items-center justify-center"
              aria-label={`View ${campaignShowcases[index].name}`}
            >
              <motion.div
                className={`w-20 h-1 rounded-full ${
                  index === activeIndex 
                    ? 'bg-accent' 
                    : 'bg-white/20 group-hover:bg-white/40'
                }`}
                initial={false}
                animate={{
                  scaleX: index === activeIndex ? 1 : 0.8,
                  opacity: index === activeIndex ? 1 : 0.5
                }}
                whileHover={{ 
                  scaleX: 1, 
                  opacity: 0.8,
                  transition: { duration: 0.2 } 
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 } 
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyPreview;