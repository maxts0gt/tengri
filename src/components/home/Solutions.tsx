"use client";

import { motion } from 'framer-motion';
import { useRef } from 'react';

const solutions = [
  {
    id: 1,
    title: "News Platforms",
    description: "Ready-to-launch news websites with Ghost CMS. Multi-language support and content syndication built-in.",
    features: [
      "Ghost CMS Integration",
      "Content Syndication",
      "Multi-language Support",
      "SEO Optimized",
      "Analytics Dashboard"
    ],
    price: "Starting from $2,999",
    icon: "📰"
  },
  {
    id: 2,
    title: "Business Websites",
    description: "Professional websites for businesses of all sizes. From simple landing pages to complex corporate sites.",
    features: [
      "Modern Design",
      "Mobile Responsive",
      "CMS Integration",
      "SEO Ready",
      "Analytics Integration"
    ],
    price: "Starting from $999",
    icon: "💼"
  },
  {
    id: 3,
    title: "Cloud Solutions",
    description: "Enterprise-grade cloud infrastructure setup and management. AWS expertise with security focus.",
    features: [
      "AWS Setup",
      "Security Compliance",
      "Cost Optimization",
      "24/7 Support",
      "Performance Monitoring"
    ],
    price: "Custom Pricing",
    icon: "☁️"
  }
];

export default function Solutions() {
  return (
    <section className="relative py-32 bg-surface overflow-hidden" id="solutions">
      <div className="tengri-container">
        <div className="max-w-2xl mb-20">
          <motion.p 
            className="text-accent uppercase tracking-wider text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Ready-to-Deploy Solutions
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Launch Your Digital Presence
          </h2>
          <p className="text-primary/60 text-lg">
            Professional, scalable solutions designed for the Mongolian market and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <motion.div
              key={solution.id}
              className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-6">{solution.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {solution.title}
              </h3>
              <p className="text-primary/60 mb-6">
                {solution.description}
              </p>
              
              <div className="space-y-4 mb-8">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-primary/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-accent font-semibold">
                  {solution.price}
                </span>
                <button className="text-sm text-primary hover:text-accent transition-colors uppercase tracking-wider">
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}