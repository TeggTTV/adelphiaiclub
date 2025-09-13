"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const patterns = [
  {
    id: 'neural',
    pattern: `
      <pattern id="neural-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
        <circle cx="75" cy="75" r="30" fill="#4F46E5" opacity="0.6" />
        <circle cx="75" cy="75" r="20" fill="#EC4899" opacity="0.6" />
        <circle cx="75" cy="75" r="10" fill="#F59E0B" opacity="0.8" />
        <line x1="75" y1="0" x2="75" y2="150" stroke="#10B981" strokeWidth="4" opacity="0.5" />
        <line x1="0" y1="75" x2="150" y2="75" stroke="#10B981" strokeWidth="4" opacity="0.5" />
        <circle cx="25" cy="25" r="15" fill="#EC4899" opacity="0.4" />
        <circle cx="125" cy="25" r="15" fill="#4F46E5" opacity="0.4" />
        <circle cx="25" cy="125" r="15" fill="#F59E0B" opacity="0.4" />
        <circle cx="125" cy="125" r="15" fill="#10B981" opacity="0.4" />
      </pattern>
    `
  },
  {
    id: 'circuit',
    pattern: `
      <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="none" />
        <circle cx="100" cy="100" r="40" fill="#3B82F6" opacity="0.5" />
        <path d="M100,0 L100,200 M0,100 L200,100" stroke="#F472B6" strokeWidth="6" opacity="0.6" />
        <path d="M0,0 L200,200 M200,0 L0,200" stroke="#10B981" strokeWidth="6" opacity="0.4" />
        <circle cx="0" cy="0" r="20" fill="#F59E0B" opacity="0.6" />
        <circle cx="200" cy="0" r="20" fill="#EC4899" opacity="0.6" />
        <circle cx="0" cy="200" r="20" fill="#4F46E5" opacity="0.6" />
        <circle cx="200" cy="200" r="20" fill="#10B981" opacity="0.6" />
        <circle cx="100" cy="100" r="15" fill="#F472B6" opacity="0.8" />
      </pattern>
    `
  },
  {
    id: 'binary',
    pattern: `
      <pattern id="binary-pattern" x="0" y="0" width="250" height="250" patternUnits="userSpaceOnUse">
        <rect width="250" height="250" fill="none" />
        <g transform="rotate(45, 125, 125)">
          <text x="30" y="60" fill="#4F46E5" fontSize="32" opacity="0.8" fontWeight="bold">10110</text>
          <text x="120" y="120" fill="#EC4899" fontSize="32" opacity="0.8" fontWeight="bold">01001</text>
          <text x="60" y="180" fill="#10B981" fontSize="32" opacity="0.8" fontWeight="bold">11010</text>
          <text x="150" y="240" fill="#F59E0B" fontSize="32" opacity="0.8" fontWeight="bold">00101</text>
        </g>
        <circle cx="125" cy="125" r="50" fill="none" stroke="#F472B6" strokeWidth="4" opacity="0.6" />
        <circle cx="125" cy="125" r="80" fill="none" stroke="#3B82F6" strokeWidth="4" opacity="0.4" />
      </pattern>
    `
  }
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const [mounted, setMounted] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      <svg className="fixed top-0 left-0 w-0 h-0 overflow-hidden">
        <defs>
          {patterns.map((p) => (
            <g key={p.id} dangerouslySetInnerHTML={{ __html: p.pattern }} />
          ))}
        </defs>
      </svg>

      {/* Animated Background Patterns */}
      <div className="absolute inset-0 z-0">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            className="absolute inset-0 w-full h-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentPattern === index ? 1 : 0,
              scale: currentPattern === index ? 1.05 : 1
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <svg className="absolute w-[300%] h-[300%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <rect width="100%" height="100%" fill={`url(#${pattern.id}-pattern)`} />
            </svg>
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/60 z-10" />
      </div>

      {/* Animated Dots Pattern */}
      {mounted && (
        <>
          <motion.div
            className="absolute inset-0 z-20"
            style={{
              y,
              scale,
              backgroundImage: 'radial-gradient(circle at center, #FDB515 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
              filter: 'blur(0.5px)',
            }}
          />
          <motion.div
            className="absolute inset-0 z-20"
            style={{
              y: y2,
              scale,
              backgroundImage: 'radial-gradient(circle at center, #65513C 0.5px, transparent 0.5px)',
              backgroundSize: '32px 32px',
              filter: 'blur(0.5px)',
            }}
          />
        </>
      )}
      
      <div className="relative z-30 flex min-h-screen">
        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-[#65513C] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ opacity: opacity }}
            >
              Welcome to Adelphi AI Club
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ opacity: opacity }}
            >
              Explore the fascinating world of Artificial Intelligence with us. Join our community of students and faculty passionate about machine learning, neural networks, and the future of AI.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ opacity: opacity }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#board"
                className="flex-1 text-center bg-[#65513C] text-white px-8 py-3 rounded-lg hover:bg-[#FDB515] hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Meet the Board
              </a>
              <a
                href="#events"
                className="flex-1 text-center bg-white text-[#65513C] border-2 border-[#65513C] px-8 py-3 rounded-lg hover:bg-[#65513C] hover:text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl"
              >
                View Events
              </a>
            </motion.div>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </section>
  );
};

export default Hero;
