"use client";

import { motion } from 'framer-motion';

export default function LogoSquare() {
  return (
    <div className="w-[400px] h-[400px] bg-[#0A1628] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {/* Modern Tengri Logotype */}
        <h1 className="text-6xl tracking-tighter text-white">
          <span className="font-light">ten</span>
          <span className="font-bold">gri</span>
          <span className="text-[#E63946]">.</span>
        </h1>
      </motion.div>
    </div>
  );
} 