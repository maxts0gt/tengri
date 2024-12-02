"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ClockIcon, VideoCameraIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Cal, { getCalApi } from "@calcom/embed-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [calReady, setCalReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Cal.com with your custom colors
  useEffect(() => {
    if (!isOpen || !selectedDuration) return;

    (async function initCal() {
      const cal = await getCalApi();
      cal("init", {
        origin: "https://cal.com",
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#292929',
            'cal-brand-emphasis': '#1a1a1a',
          },
          dark: {
            'cal-brand': '#fafafa',
            'cal-brand-emphasis': '#ffffff',
            'cal-bg': '#0A1628',
            'cal-bg-emphasis': '#1a2b44',
            'cal-text': '#ffffff',
            'cal-text-emphasis': '#ffffff',
            'cal-subtle-text': 'rgb(255 255 255 / 0.6)',
            'cal-border': 'rgb(255 255 255 / 0.1)',
            'cal-border-emphasis': 'rgb(255 255 255 / 0.2)',
          }
        }
      });
      setCalReady(true);
    })();
  }, [isOpen, selectedDuration]);

  const meetingTypes = [
    {
      duration: '30min',
      title: 'Discovery Call',
      description: 'Explore how we can help transform your business',
      icon: <ClockIcon className="w-5 h-5" />,
      calLink: 'max-tengri/30min'
    },
    {
      duration: '60min',
      title: 'Strategy Session',
      description: 'Deep dive into your specific needs and solutions',
      icon: <VideoCameraIcon className="w-5 h-5" />,
      calLink: 'max-tengri/60min'
    }
  ];

  const selectedMeeting = meetingTypes.find(type => type.duration === selectedDuration);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Container */}
          <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8">
            <motion.div
              ref={containerRef}
              className="relative bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
              style={{ position: 'relative' }}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 z-10 bg-[#0A1628] p-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    {step === 1 && (
                      <button
                        onClick={() => setStep(0)}
                        className="text-[#fafafa] flex items-center gap-2 hover:text-white/90 transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="ml-auto text-white/60 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      // Meeting Type Selection
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-medium text-white mb-2">Schedule a Meeting</h3>
                          <p className="text-white/60">Choose the type of conversation you'd like to have</p>
                        </div>

                        <div className="grid gap-4">
                          {meetingTypes.map((type) => (
                            <motion.button
                              key={type.duration}
                              onClick={() => {
                                setSelectedDuration(type.duration);
                                setStep(1);
                              }}
                              className={`
                                p-6 rounded-xl border text-left transition-all
                                ${selectedDuration === type.duration 
                                  ? 'border-[#E63946] bg-[#E63946]/5' 
                                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                                }
                              `}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="flex items-start gap-4">
                                <div className="mt-1 text-white/60">{type.icon}</div>
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-white font-medium">{type.title}</h4>
                                    <span className="text-white/60 text-sm">{type.duration}</span>
                                  </div>
                                  <p className="text-white/60 text-sm">{type.description}</p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      // Calendar View
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-2xl font-medium text-white mb-2">Select Your Time</h3>
                          <div className="flex items-center gap-2 text-white/60">
                            <GlobeAltIcon className="w-4 h-4" />
                            <span className="text-sm">Times shown in your timezone</span>
                          </div>
                        </div>

                        <div className="relative bg-white/5 rounded-xl overflow-hidden min-h-[600px]">
                          {selectedMeeting && calReady ? (
                            <Cal
                              calLink={selectedMeeting.calLink}
                              style={{ 
                                width: "100%", 
                                height: "100%",
                                minHeight: "600px",
                                position: 'relative'
                              }}
                              config={{
                                theme: "dark",
                                hideEventTypeDetails: false,
                                layout: "month_view"
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-[600px] text-white/60">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-2 border-[#E63946] border-t-transparent rounded-full"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 