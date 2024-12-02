"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function JourneyModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const journeyPaths = [
    {
      id: 'media',
      icon: '📰',
      title: 'News & Media Platform',
      description: 'Launch or scale your digital media presence',
      examples: ['News Platforms', 'Content Management', 'Revenue Integration']
    },
    {
      id: 'enterprise',
      icon: '🏢',
      title: 'Enterprise Solution',
      description: 'Transform your business infrastructure',
      examples: ['Cloud Migration', 'Digital Transformation', 'Custom Software']
    },
    {
      id: 'movement',
      icon: '🚀',
      title: 'Movement Building',
      description: 'Create impact at scale',
      examples: ['Campaign Infrastructure', 'Community Platforms', 'Digital Strategy']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      projectOverview: formData.get('projectOverview'),
      selectedPath
    };

    try {
      const res = await fetch('/api/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Submission failed');
      }
      
      setStep(2); // Show success state
    } catch (error) {
      console.error('Submission error:', error);
      // Show error in UI
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white"
              >
                ✕
              </button>

              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl text-white mb-2">Start Your Journey</h3>
                      <p className="text-white/60">Choose your path to digital excellence</p>
                    </div>

                    <div className="grid gap-4">
                      {journeyPaths.map((path) => (
                        <motion.button
                          key={path.id}
                          onClick={() => {
                            setSelectedPath(path.id);
                            setStep(1);
                          }}
                          className={`
                            p-6 rounded-xl border text-left
                            ${selectedPath === path.id 
                              ? 'border-[#E63946] bg-[#E63946]/5' 
                              : 'border-white/10 hover:border-white/20'
                            }
                          `}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-2xl">{path.icon}</span>
                            <div>
                              <h4 className="text-white font-medium mb-2">{path.title}</h4>
                              <p className="text-white/60 text-sm mb-4">{path.description}</p>
                              <div className="flex gap-2 flex-wrap">
                                {path.examples.map((example) => (
                                  <span 
                                    key={example}
                                    className="text-xs bg-white/5 text-white/80 px-2 py-1 rounded"
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <button
                        onClick={() => setStep(0)}
                        className="text-[#E63946] flex items-center gap-2 mb-4"
                      >
                        ← Back
                      </button>
                      <h3 className="text-2xl text-white mb-2">Tell Us About Your Vision</h3>
                      <p className="text-white/60">Help us understand your goals better</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-white/60 text-sm block mb-2">Your Name</label>
                        <input 
                          name="name"
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#E63946] focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm block mb-2">Email</label>
                        <input 
                          name="email"
                          type="email"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#E63946] focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm block mb-2">Project Overview</label>
                        <textarea 
                          name="projectOverview"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#E63946] focus:outline-none h-32"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                          w-full py-4 rounded-lg transition-colors
                          ${isSubmitting 
                            ? 'bg-[#E63946]/70 cursor-not-allowed' 
                            : 'bg-[#E63946] hover:bg-[#E63946]/90'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⚡
                            </motion.span>
                            Processing...
                          </span>
                        ) : (
                          'Start Your Journey →'
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl mb-6"
                    >
                      🚀
                    </motion.div>
                    <h3 className="text-2xl text-white">Journey Initiated!</h3>
                    <p className="text-white/60">
                      We'll be in touch within 24 hours to discuss your vision.
                    </p>
                    <motion.button
                      onClick={onClose}
                      className="text-[#E63946] mt-6 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      Close Window
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 