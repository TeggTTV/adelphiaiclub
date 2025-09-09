'use client';

import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
	return (
		<footer className="bg-[#1a1a1a] text-white py-12">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl font-semibold mb-4">
							Adelphi AI Club
						</h3>
						<p className="text-white/70">
							Exploring the future of AI technology together at
							Adelphi University.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
					>
						<h3 className="text-xl font-semibold mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#about"
									className="text-white/70 hover:text-[#FDB515] transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#board"
									className="text-white/70 hover:text-[#FDB515] transition-colors"
								>
									Board Members
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="text-white/70 hover:text-[#FDB515] transition-colors"
								>
									Contact
								</a>
							</li>
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
					>
						<h3 className="text-xl font-semibold mb-4">
							Connect With Us
						</h3>
						<div className="flex space-x-4">
							<a
								href="https://instagram.com/adelphiaiclub"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/70 hover:text-[#FDB515] transition-colors"
							>
								<FaInstagram size={24} />
							</a>
							<a
								href="https://myaulife.adelphi.edu/organization/aiclub"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/70 hover:text-[#FDB515] transition-colors"
							>
								<img
									src="/adelphi-icon.png"
									alt="MyAULife"
									className="w-6 h-6"
								/>
							</a>
						</div>
					</motion.div>
				</div>

				<div className="border-t border-white/10 mt-8 pt-8 text-center">
					<p className="text-white/50">
						© {new Date().getFullYear()} Adelphi AI Club. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
