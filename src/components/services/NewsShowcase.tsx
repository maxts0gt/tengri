"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const features = [
  {
    id: 'ai',
    title: 'AI-Powered Content',
    description: 'Smart content management with AI assistance',
    icon: '🤖',
    color: '#DC2626'
  },
  {
    id: 'analytics',
    title: 'Real-time Analytics',
    description: 'Live insights and performance metrics',
    icon: '📊',
    color: '#2563EB'
  },
  {
    id: 'distribution',
    title: 'Multi-platform Distribution',
    description: 'Reach audiences across all channels',
    icon: '🌐',
    color: '#059669'
  }
];

export default function NewsShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="grid grid-cols-2 gap-24">
      <div className="space-y-12">
        {/* Service Info */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-[350] leading-tight">
            News Platforms
          </h2>
          <p className="text-xl font-light leading-relaxed opacity-80">
            Enterprise-grade news systems with AI-powered content management
          </p>
        </motion.div>

        {/* Interactive Features */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="relative group cursor-none"
              onMouseEnter={() => setActiveFeature(index)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`
                absolute left-0 h-full w-1 bg-gradient-to-b
                transition-all duration-300
                ${activeFeature === index ? 'opacity-100' : 'opacity-0'}
              `} style={{ backgroundColor: feature.color }} />
              
              <div className="pl-8 py-4 transition-all duration-300">
                <h3 className="text-2xl font-light mb-2">{feature.title}</h3>
                <p className="text-lg font-light opacity-60">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Preview */}
      <div className="relative">
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundColor: features[activeFeature].color + '10'
          }}
        >
          {/* Add interactive preview here */}
        </motion.div>
      </div>
    </div>
  );
}