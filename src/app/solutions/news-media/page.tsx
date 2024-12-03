"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ContactFloat from '@/components/ContactFloat';
import ActionButtons from '@/components/common/ActionButtons';
import JourneyModal from '@/components/JourneyModal';
import VerticalLines from '@/components/common/VerticalLines';
import FullPageSection from '@/components/common/FullPageSection';

export default function NewsMediaSolution() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      const sections = document.querySelectorAll('.full-page-section');
      const currentSection = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      });

      if (currentSection !== -1) {
        const nextSection = sections[currentSection + delta];
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <main className="bg-[#0A1628] text-white">
      <VerticalLines 
        pageTheme="newsMedia"
        width="1px"
      />

      {/* Hero Section */}
      <FullPageSection>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <motion.div 
            className="text-accent text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            → News & Media Solutions
          </motion.div>
          
          <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight mb-8">
            Empower Your
            <span className="block">Journalism</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Break free from technical constraints. Own your platform, control your content, 
            and focus on what matters most – telling stories that move millions.
          </p>
        </motion.div>
      </FullPageSection>

      {/* Value Proposition */}
      <FullPageSection>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-12 gap-16"
        >
          <div className="col-span-7 space-y-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">
                The Modern Newsroom
                <span className="block text-accent font-medium">Without Technical Barriers</span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                In today's fast-paced media landscape, waiting for developers to implement changes 
                isn't just inconvenient – it's a competitive disadvantage. Your newsroom needs 
                the freedom to move fast and adapt quickly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { value: '60%', label: 'Faster Publishing' },
                { value: '100%', label: 'Platform Ownership' },
                { value: '24/7', label: 'Content Control' },
                { value: '0', label: 'Developer Dependencies' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-6 border border-white/10 hover:border-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl font-light">{stat.value}</div>
                  <div className="text-white/60 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            {/* Premium visual content here */}
          </div>
        </motion.div>
      </FullPageSection>

      {/* Solution Details */}
      <FullPageSection>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-12 gap-16"
        >
          <div className="col-span-6 space-y-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">
                Your Platform,
                <span className="block text-accent font-medium">Your Control</span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                We build your platform on Ghost CMS, the world's most powerful open-source 
                publishing platform. Once launched, you have complete control – no recurring 
                developer costs, no technical limitations, just pure creative freedom.
              </p>
            </div>

            <div className="space-y-8">
              {[
                'Custom-built on your infrastructure',
                'Full ownership of code and content',
                'Seamless content management',
                'Zero technical dependencies'
              ].map((feature, i) => (
                <motion.div 
                  key={feature}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </FullPageSection>

      {/* Call to Action */}
      <FullPageSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-12 text-center"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight">
            Ready to Move
            <span className="block text-accent">Millions Together?</span>
          </h2>
          <p className="text-xl text-white/70">
            Join leading newsrooms worldwide in the future of digital publishing.
          </p>
          <ActionButtons 
            className="justify-center"
            onJourneyClick={() => setIsJourneyModalOpen(true)}
          />
        </motion.div>
      </FullPageSection>

      {/* Contact Float */}
      <ContactFloat />

      {/* Journey Modal */}
      <JourneyModal 
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
      />
    </main>
  );
} 