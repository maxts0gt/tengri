"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] bg-white/20 z-50 origin-left"
      style={{ scaleX }}
    >
      <motion.div 
        className="absolute top-0 right-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent to-accent"
        style={{ opacity: scrollYProgress }}
      />
    </motion.div>
  );
}