'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Particles from './bits/Particles';
import { useState, useEffect } from 'react';

const AvatarSVG = ({ initial, context = 'default' }: { initial: string; context?: string }) => {
	const gradientId = `gradient-${initial}-${context}-${Math.random().toString(36).substr(2, 9)}`;
	
	return (
		<svg
			viewBox="0 0 100 100"
			className="w-full h-full"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					id={gradientId}
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop offset="0%" stopColor="#3B82F6" />
					<stop offset="100%" stopColor="#9333EA" />
				</linearGradient>
			</defs>
			<circle
				cx="50"
				cy="50"
				r="50"
				fill={`url(#${gradientId})`}
				className="drop-shadow-lg"
			/>
			<text
				x="50"
				y="50"
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize="40"
				fontWeight="bold"
				fill="white"
				className="select-none font-sans"
			>
				{initial}
			</text>
		</svg>
	);
};

const boardMembers = [
	{
		name: 'Santiago Rodriguez',
		role: 'President',
		description:
			'Artificial Intelligence major dedicated to improving lives through AI awareness and education. Leading initiatives to help students and faculty harness the power of AI tools.',
		instagram: 'https://instagram.com/santiagorodriguez', // Replace with actual Instagram handle
	},
  {
    name: 'Doryan Bendezu',
    role: 'Vice President',
    description:
      'Nursing major bringing healthcare perspective to AI applications. Focused on bridging the gap between medical care and artificial intelligence.',
		instagram: 'https://instagram.com/doryanbendezu', // Replace with actual Instagram handle
  },
	{
		name: 'Joseph Jazwinski',
		role: 'Senior Software Engineer',
		description:
			'Computer Science major with 7+ years of coding experience, specializing in TypeScript web development and backend systems.',
		instagram: 'https://instagram.com/teggundrut', // Replace with actual Instagram handle
	},
	{
		name: 'Michael Riccio',
		role: 'Treasurer',
		description:
			'Accounting major managing club finances and budgeting. Exploring the intersection of AI and financial technology.',
		instagram: 'https://instagram.com/michaelriccio', // Replace with actual Instagram handle
	},
	{
		name: 'Ann-lyse Joseph',
		role: 'Secretary',
		description:
			'Health Science major documenting our journey and coordinating club activities. Interested in AI applications in healthcare and wellness.',
		instagram: 'https://instagram.com/annlysejoseph', // Replace with actual Instagram handle
	},
];

const BoardMembers = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);
	const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

	// Auto-play functionality
	useEffect(() => {
		if (!autoPlay) return;
		
		const interval = setInterval(() => {
			setDirection(1);
			setCurrentIndex((prev) => (prev + 1) % boardMembers.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [autoPlay]);

	const nextMember = () => {
		setDirection(1);
		setCurrentIndex((prev) => (prev + 1) % boardMembers.length);
		setAutoPlay(false);
	};

	const prevMember = () => {
		setDirection(-1);
		setCurrentIndex((prev) => (prev - 1 + boardMembers.length) % boardMembers.length);
		setAutoPlay(false);
	};

	const goToMember = (index: number) => {
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
		setAutoPlay(false);
	};

	return (
		<section
			id="board"
			className="w-full relative py-16 sm:py-20 md:py-24 bg-black min-h-screen flex items-center overflow-hidden"
		>
			{/* Animated Background Grid */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
				<div 
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px',
						animation: 'gridMove 20s ease-in-out infinite alternate'
					}}
				/>
			</div>

			{/* Animated Particles */}
			<div className="absolute inset-0 pointer-events-none">
				<Particles />
			</div>

			<div className="w-full container mx-auto px-4 sm:px-6 relative z-10">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4"
				>
					Meet Our Board
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-blue-200 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-4"
				>
					The brilliant minds driving innovation and fostering AI education at Adelphi University
				</motion.p>

				{/* Mobile Carousel (hidden on lg+) */}
				<div className="lg:hidden relative max-w-4xl mx-auto">
					{/* Main Featured Card */}
					<div className="relative h-[400px] sm:h-[450px] flex items-center justify-center mb-8 overflow-hidden">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
								transition={{ 
									duration: 0.5, 
									ease: [0.25, 0.46, 0.45, 0.94]
								}}
								className="w-full max-w-md absolute"
							>
								<div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 relative shadow-2xl group">
									{/* Enhanced Glow Effect */}
									<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									
									{/* Floating Orbs */}
									<div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse" />
									<div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400/50 rounded-full animate-ping" />

									<div className="relative z-10 text-center">
										{/* Large Avatar */}
										<motion.div 
											className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 overflow-hidden rounded-full shadow-2xl relative"
											animate={{
												y: [0, -5, 0],
												rotate: [0, 3, -3, 0]
											}}
											transition={{
												duration: 6,
												repeat: Infinity,
												ease: "easeInOut"
											}}
										>
											{/* Avatar Glow Ring */}
											<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm animate-pulse" />
											
											<motion.div
												className="relative z-10 w-full h-full"
												whileHover={{ 
													scale: 1.1,
													transition: { duration: 0.3 }
												}}
											>
												<AvatarSVG initial={boardMembers[currentIndex].name[0]} context="carousel" />
											</motion.div>
										</motion.div>

										{/* Member Info */}
										<motion.a
											href={boardMembers[currentIndex].instagram}
											target="_blank"
											rel="noopener noreferrer"
											className="text-2xl sm:text-3xl font-bold text-white mb-2 relative hover:text-blue-300 transition-colors duration-300 cursor-pointer group/name"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2 }}
										>
											{boardMembers[currentIndex].name}
											<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover/name:from-blue-300 group-hover/name:to-purple-300 transition-colors duration-300" />
											{/* Instagram icon indicator */}
											<svg 
												className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2 opacity-0 group-hover/name:opacity-100 transition-opacity duration-300"
												fill="currentColor" 
												viewBox="0 0 24 24"
											>
												<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
											</svg>
										</motion.a>
										
										<motion.p 
											className="text-blue-400 font-semibold text-lg sm:text-xl mb-4"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3 }}
										>
											{boardMembers[currentIndex].role}
										</motion.p>
										
										<motion.p 
											className="text-gray-200 text-sm sm:text-base leading-relaxed"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.4 }}
										>
											{boardMembers[currentIndex].description}
										</motion.p>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation Arrows */}
					<button
						onClick={prevMember}
						className="absolute left-0 sm:-left-12 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
						aria-label="Previous member"
					>
						<motion.div
							whileHover={{ scale: 1.1, x: -2 }}
							transition={{ duration: 0.2 }}
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</motion.div>
					</button>

					<button
						onClick={nextMember}
						className="absolute right-0 sm:-right-12 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
						aria-label="Next member"
					>
						<motion.div
							whileHover={{ scale: 1.1, x: 2 }}
							transition={{ duration: 0.2 }}
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</motion.div>
					</button>

					{/* Dot Indicators */}
					<div className="flex justify-center space-x-3 mt-8">
						{boardMembers.map((_, index) => (
							<button
								key={index}
								onClick={() => goToMember(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentIndex 
										? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125' 
										: 'bg-white/30 hover:bg-white/50'
								}`}
								aria-label={`Go to member ${index + 1}`}
							/>
						))}
					</div>

					{/* Auto-play Indicator */}
					{autoPlay && (
						<div className="absolute top-0 right-0 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-green-500/30">
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
								<span className="text-green-400 text-xs font-medium">Auto</span>
							</div>
						</div>
					)}
				</div>

				{/* Desktop Grid (hidden on mobile/tablet) */}
				<motion.div 
					className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.15,
								delayChildren: 0.1
							}
						}
					}}
				>
					{boardMembers.map((member, index) => (
						<motion.div
							key={member.name}
							className="bg-white/5 backdrop-blur-md rounded-xl p-6 xl:p-8 2xl:p-10 border border-white/10 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group flex flex-col"
							variants={{
								hidden: { 
									opacity: 0, 
									y: 60,
									rotateX: -15 
								},
								visible: { 
									opacity: 1, 
									y: 0,
									rotateX: 0,
									transition: {
										duration: 0.6,
										ease: "easeOut"
									}
								}
							}}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 }
							}}
						>
							{/* Card Glow Effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							
							{/* Floating Orbs in Card */}
							<div className="absolute top-2 right-2 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
							<div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" 
								 style={{ animationDelay: `${index * 0.5}s` }} />

							<div className="flex flex-col items-center text-center relative z-10 flex-1">
								<motion.div 
									className="w-24 h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 mx-auto mb-4 xl:mb-6 overflow-hidden rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-500 relative"
									animate={{
										y: [0, -3, 0],
										rotate: [0, 2, -2, 0]
									}}
									transition={{
										duration: 6 + index * 0.3,
										repeat: Infinity,
										ease: "easeInOut",
										delay: index * 0.2
									}}
								>
									<motion.div
										className="relative z-10"
										transition={{
											duration: 0.8,
											ease: "easeOut"
										}}
									>
										<AvatarSVG initial={member.name[0]} context={`grid-${index}`} />
									</motion.div>
								</motion.div>
								<motion.a
									href={member.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white mb-1 xl:mb-2 relative hover:text-blue-300 transition-colors duration-300 cursor-pointer group/name block"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									{member.name}
									<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full group-hover/name:from-blue-300 group-hover/name:to-purple-300 transition-all duration-300" />
									{/* Instagram icon indicator */}
									<svg 
										className="inline-block w-4 h-4 xl:w-5 xl:h-5 ml-2 opacity-0 group-hover/name:opacity-100 transition-opacity duration-300"
										fill="currentColor" 
										viewBox="0 0 24 24"
									>
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
									</svg>
								</motion.a>
								<p className="text-blue-400 font-semibold text-base xl:text-lg 2xl:text-xl mb-3 xl:mb-4">
									{member.role}
								</p>
								<p className="text-gray-200 text-sm xl:text-base 2xl:text-lg leading-relaxed flex-1 flex items-center justify-center">
									{member.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default BoardMembers;
