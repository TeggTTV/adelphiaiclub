'use client';

import { motion } from 'framer-motion';
import SectionBackground from './SectionBackground';

const CTA = () => {
	return (
		<section className="py-20 relative bg-transparent overflow-hidden">
			<SectionBackground />
			<div className="absolute inset-0 bg-blue-600/5" />
			<div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-10 sm:p-14 rounded-3xl backdrop-blur-xl"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
						Ready to Shape the Future?
					</h2>
					<p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
						Join a community of innovators, creators, and future
						tech leaders. No experience required—just bring your
						curiosity.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<motion.a
							href="https://myaulife.adelphi.edu/organization/aisociety"
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors"
						>
							Join the Club
						</motion.a>
						<motion.a
							href="#events"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
						>
							See Upcoming Events
						</motion.a>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CTA;
