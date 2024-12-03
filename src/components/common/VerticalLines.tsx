"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Color palette based on page themes
export const LINE_COLORS = {
  // Main brand color - used for homepage journey
  home: "#E63946",      // Strong red - represents leadership & impact
  
  // Solution-specific colors
  newsMedia: "#00A6FB", // Electric blue - represents digital media & fast-paced news
  enterprise: "#3CCF91", // Emerald green - represents growth & stability
  movement: "#9747FF",  // Royal purple - represents transformation & influence
  campaign: "#F7B32B",  // Amber gold - represents value & results
  
  // Utility colors
  default: "#E63946"    // Fallback to brand color
} as const;

type PageTheme = keyof typeof LINE_COLORS;

interface VerticalLinesProps {
  className?: string;
  pageTheme?: PageTheme;
  width?: string;
  spacing?: number;
  initialOpacity?: number;
  animate?: boolean;
  progress?: number;
}

export default function VerticalLines({ 
  className = '',
  pageTheme = 'default',
  width = "2px",
  spacing = 6,
  initialOpacity = 0,
  animate = true,
  progress
}: VerticalLinesProps) {
  const { scrollYProgress } = useScroll();
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    if (!progress && animate) {
      const unsubscribe = scrollYProgress.on("change", value => {
        setCurrentProgress(value);
      });
      return () => unsubscribe();
    }
  }, [scrollYProgress, progress, animate]);

  const lineHeight = `${((progress ?? currentProgress) * 100)}%`;
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [initialOpacity, 1]
  );

  // Get color based on page theme
  const color = LINE_COLORS[pageTheme];

  return (
    <motion.div 
      className={`fixed left-[5vw] top-0 h-screen z-[9999] ${className}`}
      initial={{ opacity: initialOpacity }}
      animate={{ opacity: 1 }}
      style={{ opacity: animate ? opacity : 1 }}
    >
      {/* Primary line */}
      <motion.div 
        className="absolute left-0 origin-top"
        initial={{ height: "0%" }}
        animate={{ height: animate ? lineHeight : "100%" }}
        transition={{ duration: 0.5 }}
        style={{
          width,
          backgroundColor: color
        }}
      />
      
      {/* Secondary line */}
      <motion.div 
        className="absolute origin-top"
        initial={{ height: "0%" }}
        animate={{ height: animate ? lineHeight : "100%" }}
        transition={{ duration: 0.5 }}
        style={{
          left: `${spacing}px`,
          width,
          backgroundColor: color
        }}
      />
    </motion.div>
  );
} 