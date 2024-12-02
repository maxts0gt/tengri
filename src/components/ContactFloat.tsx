"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import ScheduleModal from './ScheduleModal';

export default function ContactFloat() {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
        style={{ opacity }}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <motion.div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex items-center gap-3 bg-[#0A1628] border border-white/10 px-6 py-4 rounded-full cursor-pointer hover:bg-[#0A1628]/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
            <span className="text-white font-light">Connect With Us</span>
          </motion.div>

          <motion.div 
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#0A1628] border border-white/10 rounded-2xl overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: isHovered ? 320 : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="p-8 whitespace-nowrap">
              <h4 className="text-[#E63946] text-sm uppercase tracking-wider mb-4">Let's Build Together</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-white/60 text-sm mb-1">Quick Connect</p>
                  <a href="mailto:hello@tengri-consulting.com" className="text-white hover:text-[#E63946] transition-colors flex items-center gap-2">
                    hello@tengri-consulting.com
                    <span className="text-[#E63946]">→</span>
                  </a>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Video Chat</p>
                  <button 
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="text-white hover:text-[#E63946] transition-colors flex items-center gap-2"
                  >
                    Schedule a Video Call
                    <span className="text-[#E63946]">→</span>
                  </button>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-2">Global Presence</p>
                  <div className="flex flex-wrap gap-2">
                    {['NYC', 'LDN', 'SG', 'TYO'].map((city) => (
                      <span key={city} className="text-white/40 text-xs bg-white/5 px-2 py-1 rounded">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScheduleModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </>
  );
} 