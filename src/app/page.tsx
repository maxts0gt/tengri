"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const transformWords = [
    {
      word: "Transform.",
      description: "Digital excellence that sets new standards",
      color: "text-[#E63946]"
    },
    {
      word: "Strategize.",
      description: "Digital excellence that builds tomorrow",
      color: "text-[#E63946]"
    },
    {
      word: "Digitalize.",
      description: "Future-proof infrastructure that scales",
      color: "text-[#E63946]"
    }
  ];

  return (
    <main ref={containerRef} className="relative bg-[#0A1628]">
      {/* Continuous red line that follows scroll */}
      <motion.div 
        className="fixed left-24 top-0 w-1 bg-[#E63946]"
        style={{
          height: useTransform(
            scrollYProgress,
            [0, 1],
            ["0%", "100vh"]
          ),
        }}
      />

      {/* Sections that appear as we scroll */}
      {transformWords.map((item, index) => (
        <section 
          key={index}
          className="h-screen flex items-center"
        >
          <div className="tengri-container">
            <motion.div
              className="relative pl-24" // Aligned with the red line
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
            >
              {/* Main text */}
              <h2 className={`text-9xl font-bold ${item.color}`}>
                {item.word}
              </h2>

              {/* Description */}
              <motion.p
                className="text-white/60 text-2xl mt-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          </div>
        </section>
      ))}
    </main>
  );
}