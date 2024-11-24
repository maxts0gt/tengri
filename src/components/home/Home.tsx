"use client";

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('./Hero'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary" />
  ),
});

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}