"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#65513C] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Connect With Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <a
              href="https://github.com/adelphiaiclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FDB515] transition-colors text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/adelphiaiclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FDB515] transition-colors text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/adelphiaiclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FDB515] transition-colors text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:aiclub@adelphi.edu"
              className="text-white hover:text-[#FDB515] transition-colors text-2xl"
            >
              <FaEnvelope />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-white/80"
          >
            <p>Adelphi AI Club</p>
            <p>1 South Ave, Garden City, NY 11530</p>
            <p>Science Building, Room 409</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
