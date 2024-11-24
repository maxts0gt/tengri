"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface MegaMenuProps {
  data: {
    title: string;
    items: any[];
  };
}

export default function MegaMenu({ data }: MegaMenuProps) {
  const renderProducts = () => (
    <div className="grid grid-cols-3 gap-12 py-16 px-24">
      <div className="col-span-1">
        <h3 className="text-sm font-medium uppercase tracking-wider text-white/40 mb-8">
          Our Products
        </h3>
        <p className="text-white/80 text-lg leading-relaxed">
          Launch your digital presence with our battle-tested solutions. 
          Enterprise-grade technology, delivered fast.
        </p>
      </div>
      
      <div className="col-span-2 grid grid-cols-2 gap-12">
        {data.items.map((item) => (
          <Link 
            href={item.href} 
            key={item.title}
            className="group"
          >
            <h4 className="text-xl text-white group-hover:text-accent transition-colors duration-300">
              {item.title}
            </h4>
            <p className="mt-3 text-white/60 leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderSolutions = () => (
    <div className="grid grid-cols-4 gap-12 py-16 px-24">
      {data.items.map((item) => (
        <Link 
          href={item.href} 
          key={item.title}
          className="group"
        >
          <span className="text-accent text-sm uppercase tracking-wider">
            {item.category}
          </span>
          <h4 className="mt-4 text-xl text-white group-hover:text-accent transition-colors duration-300">
            {item.title}
          </h4>
          <p className="mt-3 text-white/60 leading-relaxed">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );

  const renderServices = () => (
    <div className="grid grid-cols-3 gap-12 py-16 px-24">
      {data.items.map((item) => (
        <div key={item.title}>
          <h4 className="text-xl text-white mb-6">
            {item.title}
          </h4>
          <ul className="space-y-4">
            {item.services.map((service: string) => (
              <li key={service}>
                <Link 
                  href="#"
                  className="text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderWork = () => (
    <div className="grid grid-cols-2 gap-16 py-16 px-24">
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-white/40 mb-8">
          Featured Work
        </h3>
        <div className="space-y-8">
          {data.items[0].featured.map((work: any) => (
            <Link 
              href="#" 
              key={work.title}
              className="block group"
            >
              <h4 className="text-xl text-white group-hover:text-accent transition-colors duration-300">
                {work.title}
              </h4>
              <p className="mt-2 text-white/60">
                {work.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-white/40 mb-8">
          Case Studies
        </h3>
        <div className="space-y-6">
          {data.items[0].cases.map((study: any) => (
            <Link 
              href="#" 
              key={study.title}
              className="flex items-center justify-between group"
            >
              <span className="text-white group-hover:text-accent transition-colors duration-300">
                {study.title}
              </span>
              <span className="text-white/40">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      className="absolute top-full left-0 right-0 bg-primary border-t border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {data.title === 'Products' && renderProducts()}
      {data.title === 'Solutions' && renderSolutions()}
      {data.title === 'Services' && renderServices()}
      {data.title === 'Work' && renderWork()}
    </motion.div>
  );
}