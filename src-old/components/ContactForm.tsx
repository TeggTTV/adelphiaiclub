'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ContactForm = () => {
	return (
		<section
			id="connect"
			className="relative py-12 sm:py-16 md:py-20 bg-transparent overflow-hidden"
		>
			{/* Animated Background */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
						backgroundSize: '50px 50px',
						animation:
							'gridMove 25s ease-in-out infinite alternate',
					}}
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
				<div className="max-w-3xl mx-auto">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-8 sm:mb-12"
					>
						<motion.div
							initial={{ scale: 0, rotate: -180 }}
							whileInView={{ scale: 1, rotate: 0 }}
							viewport={{ once: true }}
							transition={{
								type: 'spring',
								stiffness: 200,
								delay: 0.1,
							}}
							className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-white/10"
						>
							<FaExternalLinkAlt className="text-2xl sm:text-3xl text-blue-400" />
						</motion.div>

						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
							Join Us on MyAULife
						</h2>
						<p className="text-white/70 text-sm sm:text-base md:text-lg">
							Become an official member of the AI Society.
							Connect with us, stay updated on events, and be part
							of our community.
						</p>
					</motion.div>

					{/* Call to Action Box */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="glass rounded-2xl p-8 sm:p-12 text-center border border-white/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group"
					>
						<div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors duration-500" />

						<h3 className="text-2xl font-bold text-white mb-6 relative z-10">
							Ready to get involved?
						</h3>

						<motion.a
							href="https://myaulife.adelphi.edu/organization/aisociety"
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all text-lg relative z-10"
						>
							Visit MyAULife Page
							<FaExternalLinkAlt className="ml-2 text-sm" />
						</motion.a>

						<p className="mt-6 text-white/50 text-sm relative z-10">
							Clicking will open a new tab to the official Adelphi
							University organization portal.
						</p>
					</motion.div>

					{/* Alternative Contact Options */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className="mt-12 text-center"
					>
						<p className="text-white/60 text-sm sm:text-base mb-3">
							Prefer email?
						</p>
						<a
							href="mailto:aisociety@adelphi.edu"
							className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base font-medium"
						>
							aisociety@adelphi.edu
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
