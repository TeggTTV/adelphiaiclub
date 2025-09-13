'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { trackNavigation } from '@/lib/analytics';

const NavBar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			setScrolled(isScrolled);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLinkClick = (href?: string) => {
		return () => {
			setMobileMenuOpen(false);
			if (href) {
				trackNavigation(href);
			}
		};
	};

	const menuItems = [
		{ href: '#board', label: 'Board Members' },
		{ href: '#events', label: 'Events' },
		{ href: '#connect', label: 'Connect' },
	];

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

			<div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 relative">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="text-lg sm:text-xl md:text-2xl font-bold text-white group relative"
						onClick={handleLinkClick('/')}
					>
						<motion.span
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							Adelphi AI Society
						</motion.span>
						<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
						{menuItems.map((item, index) => (
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
									className="text-white/80 hover:text-white transition-all duration-300 relative group font-medium text-sm lg:text-base"
									onClick={handleLinkClick(item.href)}
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

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button 
							className="text-white/80 hover:text-white transition-colors p-2 -mr-2"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle mobile menu"
						>
							<motion.div
								animate={mobileMenuOpen ? "open" : "closed"}
								className="w-6 h-6 flex flex-col justify-center items-center"
							>
								<motion.span
									className="w-6 h-0.5 bg-current block"
									variants={{
										closed: { rotate: 0, y: 0 },
										open: { rotate: 45, y: 2 }
									}}
									transition={{ duration: 0.2 }}
								/>
								<motion.span
									className="w-6 h-0.5 bg-current block mt-1"
									variants={{
										closed: { opacity: 1 },
										open: { opacity: 0 }
									}}
									transition={{ duration: 0.2 }}
								/>
								<motion.span
									className="w-6 h-0.5 bg-current block mt-1"
									variants={{
										closed: { rotate: 0, y: 0 },
										open: { rotate: -45, y: -10 }
									}}
									transition={{ duration: 0.2 }}
								/>
							</motion.div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="md:hidden mt-4 pt-4 border-t border-white/10"
						>
							<div className="flex flex-col space-y-4">
								{menuItems.map((item, index) => (
									<motion.div
										key={item.href}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ 
											duration: 0.3, 
											delay: index * 0.1 
										}}
									>
										<Link
											href={item.href}
											className="text-white/80 hover:text-white transition-all duration-300 relative group font-medium text-lg py-2 block"
											onClick={handleLinkClick(item.href)}
										>
											<span className="relative z-10">
												{item.label}
											</span>
											<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
};

export default NavBar;
