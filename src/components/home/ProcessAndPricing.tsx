"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    id: 1,
    title: "Quick Start",
    description: "Launch your platform in days, not months",
    timeline: "Days 1-3",
    features: [
      "Pre-built components",
      "Ghost CMS setup",
      "Design customization",
      "Content strategy"
    ],
    icon: "🚀"
  },
  {
    id: 2,
    title: "Development",
    description: "Rapid development with proven tech stack",
    timeline: "Days 4-7",
    features: [
      "Custom features",
      "SEO optimization",
      "Performance tuning",
      "Security setup"
    ],
    icon: "⚡"
  },
  {
    id: 3,
    title: "Launch",
    description: "Go live with full support",
    timeline: "Days 8-10",
    features: [
      "Domain setup",
      "Cloud deployment",
      "Analytics integration",
      "24/7 support"
    ],
    icon: "🎯"
  }
];

const packages = [
  {
    id: 1,
    name: "News Platform",
    price: "$2,999",
    description: "Complete news platform with Ghost CMS",
    features: [
      "Ghost CMS Pro",
      "Custom theme",
      "Multi-language support",
      "Content syndication",
      "Analytics dashboard",
      "SEO optimization",
      "Cloud hosting setup",
      "1 month support"
    ],
    popular: true
  },
  {
    id: 2,
    name: "Business Website",
    price: "$999",
    description: "Professional business presence",
    features: [
      "Modern design",
      "CMS integration",
      "Mobile responsive",
      "Contact forms",
      "Google Analytics",
      "SEO basics",
      "Cloud hosting",
      "2 weeks support"
    ],
    popular: false
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    description: "Tailored digital solutions",
    features: [
      "Custom development",
      "Advanced integrations",
      "High performance",
      "Security compliance",
      "Load balancing",
      "24/7 support",
      "SLA guarantee",
      "Dedicated team"
    ],
    popular: false
  }
];

export default function ProcessAndPricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Process cards animation
      gsap.from('.process-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      // Pricing cards animation
      gsap.from('.pricing-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.pricing-section',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-surface overflow-hidden">
      {/* Process Section */}
      <div className="process-section tengri-container mb-32">
        <div className="max-w-2xl mb-20">
          <motion.p 
            className="text-accent uppercase tracking-wider text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Rapid Deployment
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Launch Faster Than Ever
          </h2>
          <p className="text-primary/60 text-lg">
            Our proven process gets you to market in days, not months.
            Built on battle-tested technologies and frameworks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {processes.map((process) => (
            <motion.div
              key={process.id}
              className="process-card group bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-6">{process.icon}</div>
              <div className="text-accent text-sm uppercase tracking-wider mb-2">
                {process.timeline}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {process.title}
              </h3>
              <p className="text-primary/60 mb-6">
                {process.description}
              </p>
              <ul className="space-y-3">
                {process.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-primary/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pricing-section tengri-container">
        <div className="max-w-2xl mb-20">
          <motion.p 
            className="text-accent uppercase tracking-wider text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Transparent Pricing
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Choose Your Solution
          </h2>
          <p className="text-primary/60 text-lg">
            Professional solutions at competitive prices.
            No hidden fees, just clear value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`pricing-card relative bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 
                ${pkg.popular ? 'border-2 border-accent' : ''}`}
              whileHover={{ y: -5 }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-primary mb-2">
                {pkg.name}
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                {pkg.price !== "Custom" && (
                  <span className="text-primary/60 ml-2">/ platform</span>
                )}
              </div>
              <p className="text-primary/60 mb-8">
                {pkg.description}
              </p>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-primary/80">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 text-sm uppercase tracking-wider transition-colors
                ${pkg.popular 
                  ? 'bg-accent text-white hover:bg-accent/90' 
                  : 'bg-primary/5 text-primary hover:bg-primary/10'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}