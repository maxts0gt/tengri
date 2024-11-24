"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const techShowcases = [
  {
    id: 'cloud-architecture',
    name: 'Cloud Infrastructure',
    description: 'Secure, scalable AWS architecture with automated DevOps pipeline',
    image: {
      src: '/images/tech/cloud-architecture.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...' // Add blur data
    },
    features: [
      'Multi-region deployment',
      'Auto-scaling infrastructure',
      'Security compliance',
      'Cost optimization'
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data Intelligence Platform',
    description: 'Real-time analytics and visualization with Tableau integration',
    image: {
      src: '/images/tech/data-platform.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...' // Add blur data
    },
    features: [
      'Real-time dashboards',
      'Custom visualizations',
      'Automated reporting',
      'Data security'
    ]
  }
];

const TechnologyPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeShowcase = techShowcases[activeIndex];

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
          className="object-cover"
        />
        
        {/* Interactive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
            <h3 className="text-2xl font-light text-white">
              {activeShowcase.name}
            </h3>
            <p className="text-white/80">
              {activeShowcase.description}
            </p>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {activeShowcase.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-accent">→</span>
                  <span className="text-white/90 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Updated Navigation Controls to match Solutions style */}
      <div className="flex justify-center items-center py-4">
        <div className="grid grid-cols-2 gap-8">
          {techShowcases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group focus:outline-none w-24 h-12 flex items-center justify-center"
              aria-label={`View ${techShowcases[index].name}`}
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

export default TechnologyPreview;