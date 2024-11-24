"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Our story chapters - each representing a key service/capability
  const chapters = [
    {
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

  return (
    <main ref={containerRef} className="relative bg-[#0A1628]">
      {/* The journey line - always visible, grows as you scroll */}
      <motion.div 
        className="fixed left-[10vw] top-0 w-[2px] bg-[#E63946] origin-top"
        style={{
          height: useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]),
          opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
        }}
      />

      {chapters.map((chapter, index) => (
        <section 
          key={chapter.title}
          className="min-h-screen flex items-center relative"
        >
          <div className="tengri-container">
            <div className="grid grid-cols-12 gap-8">
              {/* Left side - Chapter title and description */}
              <motion.div 
                className="col-span-5 relative pl-[10vw]"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20% 0px" }}
              >
                {/* Chapter marker on the line */}
                <motion.div 
                  className="absolute left-[10vw] w-3 h-3 bg-[#E63946] rounded-full -translate-x-[calc(50%+1px)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                />

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
      ))}
    </main>
  );
}