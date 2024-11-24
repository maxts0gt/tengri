"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// This will be replaced with real data
const impactData = [
  {
    region: "Asia Pacific",
    metrics: {
      projects: 24,
      users: "2.5M+",
      uptime: "99.99%",
      dataProcessed: "15TB"
    },
    highlights: [
      "Cloud Infrastructure Modernization",
      "Political Campaign Platforms",
      "Enterprise Data Analytics"
    ]
  },
  {
    region: "North America",
    metrics: {
      projects: 18,
      users: "1.8M+",
      uptime: "99.98%",
      dataProcessed: "12TB"
    },
    highlights: [
      "Real-time Analytics Platforms",
      "Digital Transformation",
      "Security Infrastructure"
    ]
  },
  {
    region: "Europe",
    metrics: {
      projects: 15,
      users: "1.2M+",
      uptime: "99.99%",
      dataProcessed: "8TB"
    },
    highlights: [
      "GDPR-Compliant Systems",
      "Media Platform Development",
      "Data Privacy Solutions"
    ]
  }
];

export default function GlobalImpact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState("Asia Pacific");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate metrics on region change
      gsap.from('.metric-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Animate map elements
      gsap.from('.map-element', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.map-container',
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeRegion]);

  return (
    <section ref={containerRef} className="relative py-32 bg-surface overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute w-full h-[1px] top-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="tengri-container relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <motion.p 
            className="text-accent uppercase tracking-wider text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Global Impact
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Transforming Organizations Worldwide
          </h2>
          <p className="text-primary/60 text-lg">
            Delivering enterprise-grade solutions across continents with unmatched technical excellence.
          </p>
        </div>

        {/* Interactive Map and Metrics */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Map Visualization - Will be replaced with interactive WebGL map */}
          <div className="map-container relative aspect-square bg-primary/5 rounded-sm">
            <div className="absolute inset-0 flex items-center justify-center text-primary/20">
              [Interactive Map Coming Soon]
            </div>
          </div>

          {/* Metrics and Impact Data */}
          <div className="space-y-12">
            {/* Region Selector */}
            <div className="flex space-x-6 border-b border-primary/10">
              {impactData.map((data) => (
                <button
                  key={data.region}
                  className={`pb-4 text-sm uppercase tracking-wider relative ${
                    activeRegion === data.region 
                      ? 'text-accent' 
                      : 'text-primary/60 hover:text-primary'
                  }`}
                  onClick={() => setActiveRegion(data.region)}
                >
                  {data.region}
                  {activeRegion === data.region && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      layoutId="activeRegion"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Active Region Metrics */}
            {impactData.map((data) => data.region === activeRegion && (
              <motion.div
                key={data.region}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(data.metrics).map(([key, value]) => (
                    <div key={key} className="metric-item">
                      <p className="text-4xl font-bold text-primary mb-2">{value}</p>
                      <p className="text-sm text-primary/60 uppercase tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm text-primary/60 uppercase tracking-wider">
                    Regional Highlights
                  </h4>
                  <div className="space-y-3">
                    {data.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                        <p className="text-primary/80">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}