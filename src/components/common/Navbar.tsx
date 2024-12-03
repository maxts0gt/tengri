"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import { useRouter, usePathname } from 'next/navigation';
import SolutionsPreview from '../previews/SolutionsPreview';
import TechnologyPreview from '../previews/TechnologyPreview';
import StrategyPreview from '../previews/StrategyPreview';

interface MenuItem {
  title: string;
  preview: {
    heading: string;
    description: string;
    categories: Array<{
      title: string;
      items: Array<string>;
      capability: string;
    }>;
    recentWork?: Array<{
      title: string;
      category: string;
      image: string;
      metrics: string;
    }>;
    featuredWork?: {
      title: string;
      description: string;
      image: string;
      metrics: string;
    }
  }
}

const navigationStructure = [
  {
    title: 'Solutions',
    preview: {
      heading: 'Digital Products & Platforms',
      description: 'Custom digital solutions that solve real business challenges',
      categories: [
        {
          title: 'News & Media',
          items: [
            'News Platform Development',
            'Content Management Systems',
            'Multi-language Publishing',
            'Revenue Integration'
          ],
          capability: 'Build Your Media Business'
        },
        {
          title: 'Business Systems',
          items: [
            'Corporate Websites',
            'E-commerce Solutions',
            'Business Intelligence',
            'Cloud Infrastructure'
          ],
          capability: 'Scale Your Operations'
        }
      ]
    }
  },
  {
    title: 'Technology',
    preview: {
      heading: 'Cloud & Infrastructure',
      description: 'Secure, scalable technology solutions that grow with you',
      categories: [
        {
          title: 'Cloud Services',
          items: [
            'Cloud Migration',
            'Security Implementation',
            'Cost Optimization',
            'Infrastructure Management'
          ],
          capability: 'Optimize Your Tech'
        },
        {
          title: 'Data Solutions',
          items: [
            'Tableau Integration',
            'Analytics Setup',
            'Data Visualization',
            'Performance Monitoring'
          ],
          capability: 'Leverage Your Data'
        }
      ]
    }
  },
  {
    title: 'Strategy',
    preview: {
      heading: 'Digital Transformation',
      description: 'Data-driven strategies for the digital age',
      categories: [
        {
          title: 'Campaign Strategy',
          items: [
            'Marketing Campaigns',
            'Brand Development',
            'Social Media Strategy',
            'Performance Marketing'
          ],
          capability: 'Drive Growth'
        },
        {
          title: 'Political Technology',
          items: [
            'Campaign Infrastructure',
            'Voter Analytics',
            'Digital Movement Building',
            'Strategic Communications'
          ],
          capability: 'Lead Change'
        }
      ],
      featuredWork: {
        title: 'Digital Movement',
        description: 'Building momentum through technology',
        image: '/images/work/campaign.jpg',
        metrics: '→ Measurable Impact'
      }
    }
  }
];

// Move renderPreview outside of component to avoid recreation on each render
const renderPreview = (item: MenuItem) => {
  if (!item?.preview) return null;

  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="space-y-4">
        <h3 className="text-3xl text-white font-light">
          {item.preview.heading}
        </h3>
        <p className="text-white/60 text-lg">
          {item.preview.description}
        </p>
      </div>

      {item.preview.categories && (
        <div className="grid grid-cols-2 gap-12">
          {item.preview.categories.map((category) => (
            <div key={category.title} className="space-y-6">
              <h4 className="text-accent text-sm uppercase tracking-wider">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="text-white/80 hover:text-white transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="text-accent text-sm">
                → {category.capability}
              </div>
            </div>
          ))}
        </div>
      )}

      {item.title === 'Solutions' && <SolutionsPreview />}
      {item.title === 'Technology' && <TechnologyPreview />}
      {item.title === 'Strategy' && <StrategyPreview />}
    </motion.div>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState('Solutions');
  const router = useRouter();
  const pathname = usePathname();

  // Handle mobile detection with proper hydration
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
      }, 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Update the Logo click handler
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (pathname === '/') {
      // On homepage, scroll to top
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      // On other pages, navigate to homepage
      router.push('/');
    }
  };

  return (
    <>
      <motion.header 
        className={`fixed w-full z-50 transition-colors duration-500 ${
          isScrolled ? 'bg-[#0A1628]/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
        initial={false}
      >
        <div className="tengri-container">
          <nav className="flex items-center justify-between h-24" role="navigation" aria-label="Main">
            <Link 
              href="/" 
              className="relative group"
              aria-label="Tengri Home"
              onClick={handleLogoClick}
            >
              <Logo />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex flex-col items-end space-y-2"
              aria-label="Toggle Menu"
            >
              <motion.span 
                className="block h-[2px] bg-white origin-right"
                initial={false}
                animate={{ 
                  width: isMenuOpen ? '24px' : '32px',
                  rotate: isMenuOpen ? 45 : 0 
                }}
              />
              <motion.span 
                className="block h-[2px] bg-white"
                initial={false}
                animate={{ 
                  width: isMenuOpen ? '24px' : '24px',
                  opacity: isMenuOpen ? 0 : 1
                }}
              />
              <motion.span 
                className="block h-[2px] bg-white origin-right"
                initial={false}
                animate={{ 
                  width: isMenuOpen ? '24px' : '16px',
                  rotate: isMenuOpen ? -45 : 0 
                }}
              />
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A1628]"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`h-[100dvh] ${isMobile ? 'overflow-y-auto' : 'overflow-hidden'}`}>
              <div className="tengri-container h-full">
                <div className={`grid ${isMobile ? 'grid-cols-1 pt-24' : 'grid-cols-2'} h-full`}>
                  {/* Left Side - Navigation */}
                  <div className="flex flex-col justify-center">
                    <div className="space-y-6 md:space-y-8">
                      {navigationStructure.map((item) => (
                        <motion.div
                          key={item.title}
                          onClick={() => setActiveItem(item.title)}
                          className="group cursor-pointer"
                        >
                          <h2 className={`
                            text-3xl md:text-5xl font-light 
                            transition-all duration-300
                            ${activeItem === item.title 
                              ? 'text-accent' 
                              : 'text-white/80'
                            }
                          `}>
                            {item.title}
                          </h2>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Preview Content */}
                  <div className={`
                    ${isMobile ? 'mt-8' : 'border-l border-white/10 pl-16'} 
                    flex items-center
                  `}>
                    <AnimatePresence mode="wait">
                      {activeItem && (
                        <motion.div
                          key={activeItem}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.1 }}
                          className="w-full"
                        >
                          {navigationStructure.find(item => item.title === activeItem)?.preview && (
                            renderPreview(navigationStructure.find(item => item.title === activeItem)!)
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}