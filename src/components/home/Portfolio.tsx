"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "Modern News Platform",
    category: "Media",
    description: "High-performance news platform with real-time updates and multi-language support.",
    image: "/portfolio/news-platform.jpg",
    stats: {
      "Daily Users": "50K+",
      "Load Time": "1.2s",
      "Languages": "3"
    },
    tags: ["Ghost CMS", "React", "AWS"]
  },
  // Add more projects...
];

export default function Portfolio() {
  // Implementation coming in next message due to length...