"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ClockIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import Cal, { getCalApi } from "@calcom/embed-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [calReady, setCalReady] = useState(false);

  // Initialize Cal.com
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
          className="fixed inset-0 z-50 flex items-center justify-center"
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
          <motion.div
            className="relative bg-[#0A1628] rounded-2xl w-full max-w-xl mx-4 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                {step === 1 ? (
                  <button
                    onClick={() => setStep(0)}
                    className="text-white/60 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div>
                    <h2 className="text-2xl font-medium text-white">Schedule a Meeting</h2>
                    <p className="text-gray-400 mt-1">Choose the type of conversation you'd like to have</p>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                /* Meeting Types */
                <motion.div
                  key="meeting-types"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="px-6 py-4 space-y-3"
                >
                  {meetingTypes.map((type) => (
                    <motion.button
                      key={type.duration}
                      onClick={() => {
                        setSelectedDuration(type.duration);
                        setStep(1);
                      }}
                      className="w-full p-4 rounded-xl bg-[#0F2132] hover:bg-[#162939] transition-colors text-left"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400">
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="text-white font-medium">{type.title}</h3>
                            <span className="text-gray-400 text-sm">{type.duration}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                /* Calendar View */
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-h-[calc(90vh-120px)] overflow-y-auto"
                  style={{ 
                    position: 'relative',
                    WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
                  }}
                >
                  {selectedMeeting && calReady ? (
                    <Cal
                      calLink={selectedMeeting.calLink}
                      style={{ 
                        width: "100%", 
                        minHeight: "680px", // Taller to show more of the calendar
                        position: 'relative'
                      }}
                      config={{
                        theme: "dark",
                        hideEventTypeDetails: false,
                        layout: "month_view"
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[680px]">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full"
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 