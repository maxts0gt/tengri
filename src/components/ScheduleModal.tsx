"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Cal component with ssr disabled
const Cal = dynamic(
  () => import('@calcom/embed-react').then((mod) => mod.default),
  { ssr: false }
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [calendarReady, setCalendarReady] = useState(false);

  const meetingTypes = [
    {
      duration: '30min',
      title: 'Quick Discovery Call',
      description: 'Brief introduction and project overview'
    },
    {
      duration: '60min',
      title: 'Deep Dive Session',
      description: 'Detailed discussion about your vision and requirements'
    }
  ];

  useEffect(() => {
    // Only load Cal.com script on client side
    import('@calcom/embed-react').then(({ getCalApi }) => {
      getCalApi().then((cal) => {
        cal.on({
          action: "bookingSuccessful",
          callback: () => {
            onClose();
          },
        });
        setCalendarReady(true);
      });
    });
  }, [onClose]);

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
            className="relative bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden"
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
                      <h3 className="text-2xl text-white mb-2">Schedule a Meeting</h3>
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
                            p-6 rounded-xl border text-left
                            ${selectedDuration === type.duration 
                              ? 'border-[#E63946] bg-[#E63946]/5' 
                              : 'border-white/10 hover:border-white/20'
                            }
                          `}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-medium">{type.title}</h4>
                            <span className="text-white/60">{type.duration}</span>
                          </div>
                          <p className="text-white/60 text-sm">{type.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
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
                      <h3 className="text-2xl text-white mb-2">Select Your Preferred Time</h3>
                      <p className="text-white/60">Choose a time that works best for you</p>
                    </div>

                    <div className="h-[400px] bg-white/5 rounded-xl overflow-hidden">
                      {calendarReady ? (
                        <Cal
                          calLink="your-org/discovery" // Replace with your Cal.com link
                          style={{width: "100%", height: "100%"}}
                          config={{
                            name: "Tengri Consulting",
                            theme: "dark",
                            hideEventTypeDetails: false,
                            layout: "month_view"
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-white/60">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            ⚡
                          </motion.span>
                          Loading calendar...
                        </div>
                      )}
                    </div>
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