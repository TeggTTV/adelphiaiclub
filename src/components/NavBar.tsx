'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { trackNavigation } from '@/lib/analytics';

const NavBar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 20;
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
		{ href: '#faq', label: 'FAQ' },
		// { href: '#connect', label: 'Connect' },
	];

	return (
		<motion.nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
				scrolled
					? 'glass-nav border-white/5 py-3'
					: 'bg-transparent border-transparent py-5'
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="flex items-center space-x-3 group"
						onClick={handleLinkClick('/')}
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
							className="relative flex items-center justify-center"
						>
							<div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<Image
								src="/TRANSPARENT ICON.png"
								alt="Adelphi AI Society Logo"
								width={48}
								height={48}
								className="w-10 h-10 sm:w-12 sm:h-12 relative z-10"
								priority
							/>
						</motion.div>
						<span className="text-lg sm:text-xl font-bold text-white tracking-tight hidden sm:block">
							<span className="text-blue-400">AI Society</span>
						</span>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						{menuItems.map((item, index) => (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1 + 0.2,
								}}
							>
								<Link
									href={item.href}
									className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:tracking-wide"
									onClick={handleLinkClick(item.href)}
								>
									{item.label}
								</Link>
							</motion.div>
						))}

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.5 }}
						>
							<a
								href="https://myaulife.adelphi.edu/organization/aisociety"
								target="_blank"
								rel="noopener noreferrer"
								className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/40"
							>
								Join Now
							</a>
						</motion.div>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							className="text-white hover:text-blue-400 transition-colors p-2"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle mobile menu"
						>
							<div className="space-y-1.5 cursor-pointer">
								<motion.span
									animate={
										mobileMenuOpen
											? { rotate: 45, y: 8 }
											: { rotate: 0, y: 0 }
									}
									className="block w-6 h-0.5 bg-current"
								/>
								<motion.span
									animate={
										mobileMenuOpen
											? { opacity: 0 }
											: { opacity: 1 }
									}
									className="block w-6 h-0.5 bg-current"
								/>
								<motion.span
									animate={
										mobileMenuOpen
											? { rotate: -45, y: -8 }
											: { rotate: 0, y: 0 }
									}
									className="block w-6 h-0.5 bg-current"
								/>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="md:hidden overflow-hidden glass rounded-b-2xl mt-2"
						>
							<div className="flex flex-col p-4 space-y-4">
								{menuItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all font-medium"
										onClick={handleLinkClick(item.href)}
									>
										{item.label}
									</Link>
								))}
								<a
									href="https://myaulife.adelphi.edu/organization/aisociety"
									target="_blank"
									rel="noopener noreferrer"
									className="text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20"
								>
									Join Now
								</a>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
};

export default NavBar;
