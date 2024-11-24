"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NewsMetrics() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-[8rem] font-light">
            {count.toString().padStart(2, '0')}
          </div>
          <div className="text-xl font-light opacity-60">
            Active News Sites
          </div>
        </div>
      </div>
    </motion.div>
  );
}