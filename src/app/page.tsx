"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentChapter, setCurrentChapter] = useState(-1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Enhanced chapters with numbers
  const chapters = [
    {
      number: "01",
      title: "Build.",
      product: "News & Media Platforms",
      description: "Launch your digital media empire",
      features: [
        "Custom CMS Solutions",
        "Multi-language Support",
        "Revenue Integration",
        "Real-time Analytics"
      ],
      color: "text-[#E63946]",
      metrics: "50M+ Monthly Readers"
    },
    {
      number: "02",
      title: "Scale.",
      product: "Enterprise Solutions",
      description: "Future-proof your business infrastructure",
      features: [
        "Cloud Migration",
        "Security Implementation",
        "Performance Optimization",
        "24/7 Support"
      ],
      color: "text-[#E63946]",
      metrics: "99.99% Uptime"
    },
    {
      number: "03",
      title: "Transform.",
      product: "Digital Strategy",
      description: "Data-driven decisions that matter",
      features: [
        "Market Analysis",
        "User Behavior Tracking",
        "Conversion Optimization",
        "Growth Strategy"
      ],
      color: "text-[#E63946]",
      metrics: "3x Revenue Growth"
    },
    {
      number: "04",
      title: "Lead.",
      product: "Movement Building",
      description: "Create impact at scale",
      features: [
        "Campaign Infrastructure",
        "Audience Engagement",
        "Strategic Communications",
        "Performance Tracking"
      ],
      color: "text-[#E63946]",
      metrics: "10M+ People Reached"
    }
  ];
  const lineHeight = currentChapter >= 0 
    ? `${((currentChapter + 1) * 100) / chapters.length}%` 
    : "0%";
  return (
    <main 
      ref={containerRef} 
      className="relative bg-[#0A1628] snap-y snap-mandatory h-screen overflow-y-scroll"
    >
      {/* Hero Section */}
      <section 
        className="h-screen w-full flex items-center snap-start snap-always"
        ref={(node) => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setCurrentChapter(-1); // Reset to intro state
              }
            },
            { threshold: 0.5 }
          );
          if (node) observer.observe(node);
        }}
      >
        <div className="tengri-container">
          <div className="grid grid-cols-12 gap-8">
            <motion.div 
              className="col-span-8 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[8vw] font-bold leading-none">
                <span className="text-white">We build technology</span>
                <br />
                <span className="text-[#E63946]">that moves millions.</span>
              </h1>
              <p className="text-2xl text-white/60 max-w-2xl">
                From grassroots movements to global media platforms, 
                we create digital solutions that drive real change.
              </p>
              <motion.div 
                className="text-[#E63946] text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                → Scroll to explore our journey
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The journey lines with chapter numbers - only visible after intro */}
      <motion.div 
        className="fixed left-[5vw] top-0 h-screen z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentChapter >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Primary line */}
        <motion.div 
          className="absolute left-0 w-[2px] bg-[#E63946] origin-top"
          initial={{ height: "0%" }}
          animate={{ height: lineHeight }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Secondary line */}
        <motion.div 
          className="absolute left-[6px] w-[2px] bg-[#E63946] origin-top"
          initial={{ height: "0%" }}
          animate={{ height: lineHeight }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {chapters.map((chapter, index) => {
        const sectionRef = useRef(null);
        const isInView = useInView(sectionRef, { amount: 0.5 });
        
        useEffect(() => {
          if (isInView) {
            setCurrentChapter(index);
          }
        }, [isInView, index]);

        return (
          <section 
            key={chapter.title}
            ref={sectionRef}
            className="h-screen w-full flex items-center snap-start snap-always"
          >
            <div className="tengri-container">
              <div className="grid grid-cols-12 gap-8">
                {/* Left side with chapter number */}
                <motion.div 
                  className="col-span-5 relative pl-[5vw]"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20% 0px" }}
                >
                  {/* Chapter markers with number */}
                  <motion.div 
                    className="absolute left-[5vw] -translate-x-[calc(50%+1px)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                  >
                    <div className="w-2 h-2 bg-[#E63946] rounded-full" />
                    <div className="absolute top-0 left-[6px] w-2 h-2 bg-[#E63946] rounded-full" />
                    <div className="absolute -left-8 -top-8 text-[#E63946] text-2xl font-mono">
                      {chapter.number}
                    </div>
                  </motion.div>

                  <h2 className={`text-8xl font-bold ${chapter.color} mb-6`}>
                    {chapter.title}
                  </h2>
                  <h3 className="text-4xl text-white mb-4">{chapter.product}</h3>
                  <p className="text-xl text-white/60 mb-8">{chapter.description}</p>
                  <div className="text-2xl text-accent">{chapter.metrics}</div>
                </motion.div>

                {/* Right side - Features and capabilities */}
                <motion.div 
                  className="col-span-7 pl-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20% 0px" }}
                >
                  <div className="grid grid-cols-2 gap-8">
                    {chapter.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="bg-white/5 p-6 rounded-lg backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="text-accent mb-2">→</div>
                        <div className="text-white text-lg">{feature}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}