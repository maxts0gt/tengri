"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: "Tengri delivered our news platform in just 10 days. The performance and design exceeded our expectations.",
    author: "B. Bat-Erdene",
    role: "Chief Editor",
    company: "Leading News Platform",
    image: "/testimonials/news-platform.jpg",
    stats: {
      "Page Load": "1.2s",
      "Daily Users": "50K+",
      "Uptime": "99.99%"
    }
  },
  {
    id: 2,
    quote: "Their technical expertise and understanding of the Mongolian market made them the perfect partner for our digital transformation.",
    author: "G. Munkh-Erdene",
    role: "CTO",
    company: "Enterprise Solutions Co.",
    image: "/testimonials/enterprise.jpg",
    stats: {
      "Cost Savings": "40%",
      "Performance": "+125%",
      "Time Saved": "60hrs/mo"
    }
  },
  {
    id: 3,
    quote: "The most efficient web development process we've experienced. Professional, fast, and reliable.",
    author: "D. Oyunbileg",
    role: "Marketing Director",
    company: "Global Trade LLC",
    image: "/testimonials/business.jpg",
    stats: {
      "Conversion": "+45%",
      "Traffic": "+85%",
      "ROI": "3.2x"
    }
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-content', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.testimonial-section',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.accent/0.1),transparent_70%)]" />
      </div>

      <div className="tengri-container relative z-10">
        <div className="max-w-2xl mb-20">
          <motion.p 
            className="text-accent uppercase tracking-wider text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Client Success Stories
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-white/60 text-lg">
            See how we're helping organizations across Mongolia transform their digital presence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Testimonial Content */}
          <div className="testimonial-content space-y-8">
            <div className="relative">
              <svg className="absolute -top-8 -left-8 w-16 h-16 text-accent/20" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8v8H6v16h16V16h-8V8h-4zm20 0v8h-4v16h16V16h-8V8h-4z" />
              </svg>
              <blockquote className="text-2xl text-white font-light leading-relaxed">
                {testimonials[activeIndex].quote}
              </blockquote>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10" />
              <div>
                <div className="text-white font-medium">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-white/60">
                  {testimonials[activeIndex].role}
                </div>
                <div className="text-accent text-sm">
                  {testimonials[activeIndex].company}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {Object.entries(testimonials[activeIndex].stats).map(([key, value]) => (
                <div key={key}>
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm text-white/60">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {testimonials.map((testimonial, idx) => (
              <motion.button
                key={testimonial.id}
                className={`w-full p-6 text-left rounded-sm transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'bg-white/10' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setActiveIndex(idx)}
                whileHover={{ x: 10 }}
              >
                <div className="text-white/60 text-sm uppercase tracking-wider mb-2">
                  {testimonial.company}
                </div>
                <div className="text-white font-medium">
                  {testimonial.quote.substring(0, 60)}...
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}