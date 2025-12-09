"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Replace with actual API endpoint (Mailchimp, ConvertKit, etc.)
    // For now, simulate API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email for confirmation.');
        setEmail('');
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage('Please enter a valid email address.');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      }
    }, 1000);
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10"
          animate={{ 
            x: [-30, 30, -30],
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[200px] h-[200px] rounded-full bg-blue-500/15 blur-[50px]" />
        </motion.div>
        <motion.div 
          className="absolute bottom-10 right-10"
          animate={{ 
            x: [30, -30, 30],
            y: [0, -20, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[180px] h-[180px] rounded-full bg-purple-500/15 blur-[45px]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-white/10"
          >
            <FaEnvelope className="text-2xl sm:text-3xl text-blue-400" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Stay in the Loop
          </h2>
          
          <p className="text-white/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-4">
            Get the latest AI news, event updates, and exclusive resources delivered straight to your inbox. 
            Join our community of innovators!
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === 'loading'}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: status === 'idle' || status === 'error' ? 1.05 : 1 }}
                whileTap={{ scale: status === 'idle' || status === 'error' ? 0.95 : 1 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {status === 'loading' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Subscribed!
                  </span>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </div>
          </form>

          {/* Status Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-sm sm:text-base ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.div>
          )}

          <p className="text-white/40 text-xs sm:text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
