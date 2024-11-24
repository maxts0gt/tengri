"use client";

import { useRef, useEffect } from 'react';

interface Props {
  src: string;
  isActive: boolean;
}

export default function VideoBackground({ src, isActive }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover opacity-40"
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
    </div>
  );
}