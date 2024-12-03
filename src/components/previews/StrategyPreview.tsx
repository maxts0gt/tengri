"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const campaignShowcases = [
  {
    id: 'digital-movement',
    name: 'Digital Movement Building',
    url: '/solutions/movement',
    description: 'Transforming campaigns through data-driven strategy',
    image: {
      src: '/images/strategy/movement-building.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...'
    }
  },
  {
    id: 'marketing-campaigns',
    name: 'Strategic Communications',
    url: '/solutions/communications',
    description: 'Multi-channel campaigns that drive measurable results',
    image: {
      src: '/images/strategy/marketing-campaign.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...'
    }
  },
  {
    id: 'data-analytics',
    name: 'Audience Intelligence',
    url: '/solutions/intelligence',
    description: 'Deep insights driving targeted engagement strategies',
    image: {
      src: '/images/strategy/data-insights.webp',
      width: 1920,
      height: 1080,
      blurDataURL: '...'
    }
  }
];

const StrategyPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeShowcase = campaignShowcases[activeIndex];

  return (
    <div className="mt-4 space-y-8">
      <Link 
        href={activeShowcase.url}
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative h-[280px] rounded-xl overflow-hidden border border-white/10">
          <Image
            src={activeShowcase.image.src}
            alt={`Preview of ${activeShowcase.name}`}
            width={activeShowcase.image.width}
            height={activeShowcase.image.height}
            quality={90}
            priority={activeIndex === 0}
            placeholder="blur"
            blurDataURL={activeShowcase.image.blurDataURL}
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />

          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/0 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-4 left-4">
              <motion.div 
                className="text-white text-lg mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {activeShowcase.name}
              </motion.div>
              <motion.div 
                className="text-accent text-sm flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span>Explore Strategy</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>

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