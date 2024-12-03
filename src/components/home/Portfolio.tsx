"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Digital Transformation",
    description: "Enterprise solutions that drive growth",
    image: "/images/portfolio/enterprise.jpg",
    link: "/our-work/enterprise"
  },
  {
    title: "Media Platforms",
    description: "Next-gen publishing solutions",
    image: "/images/portfolio/media.jpg",
    link: "/our-work/media"
  },
  // Add more projects as needed
];

export default function Portfolio() {
  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Work</h2>
          <p className="text-white/60">Transforming businesses through technology</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <a href={project.link} className="block">
                <div className="relative overflow-hidden rounded-lg aspect-video bg-white/5">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60">{project.description}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}