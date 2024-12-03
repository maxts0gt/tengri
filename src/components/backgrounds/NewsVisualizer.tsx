"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
export default function NewsVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    // Create floating news cards
    const cards: THREE.Mesh[] = [];
    const createCard = (x: number, y: number, z: number) => {
      const geometry = new THREE.PlaneGeometry(1, 0.6);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color("#ffffff") }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          
          void main() {
            float alpha = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
            gl_FragColor = vec4(color, alpha * 0.3);
          }
        `,
        transparent: true
      });
      const card = new THREE.Mesh(geometry, material);
      card.position.set(x, y, z);
      scene.add(card);
      cards.push(card);
      
      // Animate card
      gsap.to(card.position, {
        y: y + 0.2,
        duration: 2 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    };
    // Create grid of cards
    for (let i = -5; i < 5; i++) {
      for (let j = -3; j < 3; j++) {
        createCard(i * 1.5, j * 1.2, -10 + Math.random() * 5);
      }
    }
    // Add particles for data flow visualization
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#ffffff',
      transparent: true,
      opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    // Camera position
    camera.position.z = 5;
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.y += 0.001;
      
      // Update cards
      cards.forEach(card => {
        if (card.material instanceof THREE.ShaderMaterial) {
          card.material.uniforms.time.value += 0.05;
        }
      });
      renderer.render(scene, camera);
    };
    animate();
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary"
    />
  );
}