"use client";

import { motion } from 'framer-motion';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 cursor-pointer"
      onClick={onClick}
    >
      {/* Modern Tengri Logotype */}
      <h1 className="text-2xl tracking-tighter text-white">
        <span className="font-light">ten</span>
        <span className="font-bold">gri</span>
        <span className="text-accent">.</span>
      </h1>
      
      {/* Hover Effect */}
      <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}