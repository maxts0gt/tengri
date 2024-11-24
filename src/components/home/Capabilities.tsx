"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const capabilities = [
  {
    id: 1,
    title: "Digital Systems",
    description: "We build platforms that transform organizations and drive change",
    areas: [
      "News Platforms",
      "Business Systems",
      "Digital Infrastructure",
      "Cloud Solutions"
    ],
    image: "/capabilities/systems.jpg",
    color: "#1a365d"
  },
  {
    id: 2,
    title: "Strategic Vision",
    description: "We shape digital strategies that define the future",
    areas: [
      "Digital Transformation",
      "Technology Strategy",
      "Platform Innovation",
      "Growth Architecture"
    ],
    image: "/capabilities/strategy.jpg",
    color: "#2d3748"
  },
  {
    id: 3,
    title: "Global Impact",
    description: "We create solutions that scale across borders",
    areas: [
      "International Reach",
      "Cultural Integration",
      "Multilingual Systems",
      "Global Standards"
    ],
    image: "/capabilities/impact.jpg",
    color: "#1a202c"
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate capabilities on scroll
      gsap.from('.capability-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.capabilities-grid',
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate areas with stagger
      gsap.from('.area-item', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.areas-list',
          start: 'top center+=200',
          toggleActions: 'play none none reverse'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-surface overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
          style={{ opacity, scale }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.accent/0.1),transparent_70%)]" />
      </div>

      <div className="tengri-container relative z-10">
        {/* Header */}
        <motion.div 
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-primary mb-8">
            We Shape
            <span className="block text-accent">Digital Future</span>
          </h2>
          <p className="text-xl text-primary/60">
            Building transformative digital systems that drive change and define tomorrow.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid grid lg:grid-cols-3 gap-8 mb-32">
          {capabilities.map((capability) => (
            <motion.div
              key={capability.id}
              className="capability-card group bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {capability.title}
                </h3>
                <p className="text-primary/60">
                  {capability.description}
                </p>
              </div>

              <div className="areas-list space-y-3">
                {capability.areas.map((area) => (
                  <motion.div
                    key={area}
                    className="area-item flex items-center space-x-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-primary/80">{area}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <button className="group px-8 py-4 bg-primary text-white overflow-hidden relative">
            <span className="relative z-10 text-sm uppercase tracking-wider">
              Start Your Transformation
            </span>
            <div className="absolute inset-0 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}