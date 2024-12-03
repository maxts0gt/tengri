"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const portfolioSites = [
  {
    id: 'news-platform',
    name: 'News Publishing Platform',
    url: '/solutions/news-media',
    description: 'Modern news platform built for global scale and real-time engagement',
    image: {
      src: '/images/portfolio/news-platform.webp',
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENrLzMyLi5CRUhOR0FKVkJGTkhaTVFYW1xfXEVPYmBiYFZsb2j/2wBDAR',
      width: 1920,
      height: 1080,
    },
  },
  {
    id: 'enterprise-dashboard',
    name: 'Enterprise Dashboard',
    url: 'https://enterprise-dashboard.com',
    description: 'Transformative analytics platform for data-driven organizations',
    image: {
      src: '/images/portfolio/enterprise-dashboard.jpg',
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENrLzMyLi5CRUhOR0FKVkJGTkhaTVFYW1xfXEVPYmBiYFZsb2j/2wBDAR',
      width: 1920,
      height: 1080,
    },
  },
  {
    id: 'campaign-platform',
    name: 'Campaign Platform',
    url: 'https://campaign-platform.com',
    description: 'Next-generation platform for modern movement building',
    image: {
      src: '/images/portfolio/campaign-platform.jpg',
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENrLzMyLi5CRUhOR0FKVkJGTkhaTVFYW1xfXEVPYmBiYFZsb2j/2wBDAR',
      width: 1920,
      height: 1080,
    },
  }
];

const SolutionsPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSite = portfolioSites[activeIndex];

  return (
    <div className="mt-4 space-y-8">
      <Link 
        href={activeSite.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative h-[280px] rounded-xl overflow-hidden border border-white/10">
          <Image
            src={activeSite.image.src}
            alt={`Preview of ${activeSite.name}`}
            width={activeSite.image.width}
            height={activeSite.image.height}
            quality={90}
            priority={activeIndex === 0}
            placeholder="blur"
            blurDataURL={activeSite.image.blurDataURL}
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
                {activeSite.name}
              </motion.div>
              <motion.div 
                className="text-accent text-sm flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span>Visit Live Site</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>

      <div className="flex justify-center items-center py-4">
        <div className="grid grid-cols-3 gap-8">
          {portfolioSites.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group focus:outline-none w-24 h-12 flex items-center justify-center"
              aria-label={`View ${portfolioSites[index].name}`}
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

export default SolutionsPreview;