"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const services = [
  {
    id: 1,
    number: "01",
    title: "News Platforms",
    description: "Enterprise-grade news systems with AI-powered content management",
    stat: "500M+",
    statText: "Monthly Page Views",
    color: "#DC2626"
  },
  {
    id: 2,
    number: "02",
    title: "Digital Products",
    description: "Custom websites and applications that drive business growth",
    stat: "98%",
    statText: "Client Satisfaction",
    color: "#2563EB"
  },
  {
    id: 3,
    number: "03",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and digital transformation",
    stat: "40%",
    statText: "Cost Reduction",
    color: "#059669"
  },
  {
    id: 4,
    number: "04",
    title: "Political Tech",
    description: "Digital strategies and platforms for political campaigns",
    stat: "25M+",
    statText: "Voter Reach",
    color: "#7C3AED"
  }
];

export default function Hero() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Background with dynamic color based on active service */}
      <div className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: services[activeService].color + '10' }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary via-primary to-[#000B1F] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--highlight),transparent_70%)]" />
      </div>
      
      <div className="tengri-container relative z-10">
        <div className="max-w-[90vw] md:max-w-[76rem] mx-auto">
          {/* Service Number */}
          <motion.p 
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-[15px] tracking-wider mb-16 font-light"
          >
            <span className="text-white/60">service</span>
            <span className="text-white ml-2">{services[activeService].number}</span>
          </motion.p>

          {/* Main Content */}
          <div className="grid grid-cols-2 gap-24">
            <div>
              <motion.div
                key={activeService + "title"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                className="space-y-8"
              >
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-[350] leading-tight text-white">
                  {services[activeService].title}
                </h2>
                <p className="text-white/60 text-xl font-light leading-relaxed">
                  {services[activeService].description}
                </p>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center">
              <motion.div
                key={activeService + "stat"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center"
              >
                <div className="text-[clamp(3rem,8vw,6rem)] font-[350] text-white mb-4">
                  {services[activeService].stat}
                </div>
                <div className="text-white/60 text-xl font-light">
                  {services[activeService].statText}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Service Navigation */}
          <div className="absolute bottom-16 left-0 right-0">
            <div className="flex justify-center gap-4">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`w-16 h-[2px] transition-all duration-500 ${
                    index === activeService ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}