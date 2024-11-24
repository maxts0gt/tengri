"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function ThreeWrapper({ children }) {
  return (
    <Suspense fallback={<div className="h-[300px] bg-white/5" />}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Canvas>
    </Suspense>
  );
}