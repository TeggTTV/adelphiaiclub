"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="connect" className="relative bg-black py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 25s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10"
          animate={{ 
            x: [-50, 50, -50],
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[60px]" />
        </motion.div>
        <motion.div 
          className="absolute bottom-10 right-10"
          animate={{ 
            x: [50, -50, 50],
            y: [0, -40, 0] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[50px]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Connect With Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base md:text-lg px-4"
          >
            Join our community and stay updated with the latest in AI
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-8 sm:mb-10 md:mb-12"
          >
            {[
              { icon: FaGithub, href: "https://github.com/adelphiaisociety", label: "GitHub" },
              { icon: FaInstagram, href: "https://instagram.com/adelphiaisociety", label: "Instagram" },
              { icon: FaLinkedin, href: "https://linkedin.com/company/adelphiaisociety", label: "LinkedIn" },
              { icon: FaEnvelope, href: "mailto:aiclub@adelphi.edu", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : undefined}
                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group relative"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
                
                {/* Icon container */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300">
                  <social.icon className="text-xl sm:text-2xl text-white/70 group-hover:text-white transition-colors duration-300" />
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/10 mb-6 sm:mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Organization</h3>
                <p className="text-white/70 text-xs sm:text-sm">Adelphi AI Society</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Location</h3>
                <p className="text-white/70 text-xs sm:text-sm">1 South Ave, Garden City, NY 11530</p>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Meeting Room</h3>
                <p className="text-white/70 text-xs sm:text-sm">Science Building, Room 409</p>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-white/50 text-xs sm:text-sm"
          >
            <p>© 2025 Adelphi AI Society. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
