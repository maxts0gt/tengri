"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NewsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

    // Add Fantasy.co style animated particles
    // ... (WebGL implementation)

    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}