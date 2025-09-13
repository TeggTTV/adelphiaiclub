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
	},
  {
    name: 'Doryan Bendezu',
    role: 'Vice President',
    description:
      'Nursing major bringing healthcare perspective to AI applications. Focused on bridging the gap between medical care and artificial intelligence.',
  },
	{
		name: 'Joseph Jazwinski',
		role: 'Senior Software Engineer',
		description:
			'Computer Science major with 7+ years of coding experience, specializing in TypeScript web development and backend systems',
	},
	{
		name: 'Michael Riccio',
		role: 'Treasurer',
		description:
			'Accounting major managing club finances and budgeting. Exploring the intersection of AI and financial technology.',
	},
	{
		name: 'Ann-lyse Joseph',
		role: 'Secretary',
		description:
			'Health Science major documenting our journey and coordinating club activities. Interested in AI applications in healthcare and wellness.',
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
										<motion.h3
											className="text-2xl sm:text-3xl font-bold text-white mb-2 relative"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2 }}
										>
											{boardMembers[currentIndex].name}
											<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400" />
										</motion.h3>
										
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
								<motion.h3
									className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white mb-1 xl:mb-2 relative"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									{member.name}
									<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
								</motion.h3>
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
