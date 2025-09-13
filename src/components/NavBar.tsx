'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const NavBar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			setScrolled(isScrolled);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<motion.nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Subtle glow effect */}
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-50" />

			<div className="container mx-auto px-6 py-4 relative">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="text-2xl font-bold text-white group relative"
					>
						<motion.span
							className=""
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							Adelphi AI Society
						</motion.span>
						<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
					</Link>

					<div className="hidden md:flex space-x-8 items-center">
						{[
							{ href: '#events', label: 'Events' },
							{ href: '#board', label: 'Board Members' },
							{ href: '#contact', label: 'Contact' },
						].map((item, index) => (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
							>
								<Link
									href={item.href}
									className="text-white/80 hover:text-white transition-all duration-300 relative group font-medium"
								>
									<span className="relative z-10">
										{item.label}
									</span>
									<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
									<motion.div
										className="absolute inset-0 bg-white/5 rounded-lg -m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										whileHover={{ scale: 1.05 }}
									/>
								</Link>
							</motion.div>
						))}
					</div>

					{/* Mobile menu button (you can expand this later) */}
					<div className="md:hidden">
						<button className="text-white/80 hover:text-white transition-colors">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default NavBar;
