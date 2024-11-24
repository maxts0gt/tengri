"use client";

import { motion } from 'framer-motion';
import NewsVisualizer from '../backgrounds/NewsVisualizer';

export default function NewsSection() {
  return (
    <section className="relative w-screen h-screen flex-shrink-0">
      {/* Dynamic Background */}
      <NewsVisualizer />
      
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-2 gap-24">
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <span className="text-sm text-white/60 tracking-wider">service 01</span>
              <h1 className="text-7xl font-light mt-6">News Platforms</h1>
              <p className="text-xl text-white/70 mt-6 leading-relaxed">
                Enterprise-grade news systems with AI-powered content management
              </p>
            </div>

            {/* Interactive Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Monthly Views', value: '500M+' },
                { label: 'Content Growth', value: '245%' },
                { label: 'User Retention', value: '3x' },
                { label: 'Time Saved', value: '60%' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-6 border border-white/10 hover:border-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl font-light">{stat.value}</div>
                  <div className="text-white/60 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-6">
              <button className="px-8 py-4 bg-accent text-white hover:bg-accent/90 transition-colors">
                Schedule Demo
              </button>
              <button className="px-8 py-4 border border-white/20 hover:bg-white/5 transition-colors">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}