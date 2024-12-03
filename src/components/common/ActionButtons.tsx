"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ActionButtonsProps {
  className?: string;
  onJourneyClick: () => void;
}

export default function ActionButtons({ className = '', onJourneyClick }: ActionButtonsProps) {
  return (
    <div className={`flex gap-6 ${className}`}>
      <motion.button
        onClick={onJourneyClick}
        className="inline-flex items-center px-8 py-4 bg-[#E63946] text-white rounded-lg hover:bg-[#E63946]/90 transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg font-medium">Start Your Journey</span>
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </motion.button>

      <motion.div>
        <Link 
          href="/our-work"
          className="inline-flex items-center px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors group"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <span className="text-lg font-medium">Explore Our Work</span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
} 