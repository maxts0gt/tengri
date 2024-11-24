"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "Digital News Platform",
    category: "Media Innovation",
    description: "Redefining digital journalism with immersive storytelling",
    image: "/work/news-platform.jpg",
    color: "#1a365d",
    stats: ["500K+ Monthly Readers", "3 Languages", "Real-time Analytics"]
  },
  {
    id: 2,
    title: "Enterprise Portal",
    category: "Digital Infrastructure",
    description: "Transforming business operations through intelligent systems",
    image: "/work/enterprise.jpg",
    color: "#2d3748",
    stats: ["99.99% Uptime", "45% Cost Reduction", "Global Scale"]
  },
  {
    id: 3,
    title: "Government Platform",
    category: "Public Sector",
    description: "Building transparent, accessible digital governance",
    image: "/work/government.jpg",
    color: "#1a202c",
    stats: ["2M+ Citizens Served", "Real-time Data", "Secure Infrastructure"]
  }
];

export default function FeaturedWork() {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Project transition animations
      gsap.fromTo('.project-image',
        { scale: 1.1, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2,
          ease: 'power3.out'
        }
      );

      // Stats animation
      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeProject]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: projects[activeProject].color }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90" />
      </div>

      <div className="tengri-container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Project Details */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="text-accent uppercase tracking-wider text-sm">
                {projects[activeProject].category}
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                {projects[activeProject].title}
              </h2>
              <p className="text-xl text-white/80 max-w-xl">
                {projects[activeProject].description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {projects[activeProject].stats.map((stat, index) => (
                <motion.div 
                  key={stat}
                  className="stat-item flex items-center space-x-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-white/80">{stat}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ x: 10 }}
              className="group flex items-center space-x-3 text-white/60 hover:text-white transition-colors"
            >
              <span className="text-sm uppercase tracking-wider">View Project</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>

          {/* Project Navigation */}
          <div className="relative">
            <div className="project-image aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 left-0 right-0 flex justify-between">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  className={`w-1/3 p-4 text-left transition-all duration-300 ${
                    index === activeProject 
                      ? 'bg-white text-primary' 
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                  onClick={() => setActiveProject(index)}
                >
                  <span className="text-sm uppercase tracking-wider">
                    {`0${index + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}