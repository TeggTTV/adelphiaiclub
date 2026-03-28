'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Particles from './bits/Particles';
import { useState, useEffect, useRef } from 'react';

const AvatarSVG = ({
	initial,
	context = 'default',
}: {
	initial: string;
	context?: string;
}) => {
	const gradientId = `gradient-${initial}-${context}-${Math.random()
		.toString(36)
		.substr(2, 9)}`;

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
            'Aritifical Intelligence major passionate about exploring emerging technologies to spark new ideas, unlock creativity, and drive meaningful progress.',
        instagram: 'https://santiagorodriguez.dev', // Updated to personal website
    },
	{
		name: 'Doryan Bendezu',
		role: 'Vice President',
		description:
			'Nursing major bringing healthcare perspective to AI applications. Focused on bridging the gap between medical care and artificial intelligence.',
		instagram: 'https://instagram.com/doctordbd', // Replace with actual Instagram handle
	},
    {
        name: 'Joseph Jazwinski',
        role: 'Senior Software Engineer',
        description:
            'Computer Science major with 7+ years of coding experience, specializing in TypeScript web development and backend systems.',
        instagram: 'https://josephjazwinski.com', // Updated to personal website
    },
	{
		name: 'Michael Riccio',
		role: 'Treasurer',
		description:
			'Accounting major managing club finances and budgeting. Exploring the intersection of AI and financial technology.',
		instagram: 'https://instagram.com/mikecankindacook', // Replace with actual Instagram handle
	},
	{
		name: 'Rian Fernando',
		role: 'Secretary',
		description:
			'Computer Science major dedicated to supporting the club and advancing AI initiatives.',
		instagram: '', // Add website or social if available
	},
	{
		name: 'Cindy',
		role: 'Social Media/Creative Director',
		description:
			'Leads our creative and social media efforts, bringing fresh ideas and vibrant energy to the club.',
		instagram: '', // Add website or social if available
	},
];

const BoardMembers = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);

	// ...existing code for mobile carousel and logic...

	// Desktop carousel ping-pong auto-scroll state
	const carouselRef = useRef<HTMLDivElement>(null);
	const [direction, setDirection] = useState(1); // 1 = right, -1 = left
	useEffect(() => {
		const carousel = carouselRef.current;
		if (!carousel) return;
		let frame: number;
		let lastTs: number | null = null;
		let scrollSpeed = 0.25; // px per ms
		let running = true;	
		function step(ts: number) {
			if (!running) return;
			if (lastTs === null) lastTs = ts;
			const dt = ts - lastTs;
			lastTs = ts;
			carousel.scrollLeft += direction * scrollSpeed * dt;
			// At either end, reverse direction
			if (carousel.scrollLeft <= 0) {
				carousel.scrollLeft = 0;
				setDirection(1);
			} else if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
				carousel.scrollLeft = carousel.scrollWidth - carousel.offsetWidth;
				setDirection(-1);
			}
			frame = requestAnimationFrame(step);
		}
		frame = requestAnimationFrame(step);
		return () => {
			running = false;
			cancelAnimationFrame(frame);
		};
	}, [direction]);

	return (
		<section
			id="board"
			className="w-full relative py-20 sm:py-32 bg-transparent min-h-screen flex items-center overflow-hidden"
		>
			{/* ...existing background and mobile carousel code... */}
			{/* Desktop Carousel (hidden on mobile/tablet) */}
			<div
				ref={carouselRef}
				className="hidden lg:flex overflow-x-hidden space-x-6 xl:space-x-8 py-4 no-scrollbar select-none pointer-events-none relative"
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				{boardMembers.map((member, index) => (
					<motion.div
						key={member.name + '-' + index}
						className="min-w-[320px] max-w-xs glass rounded-xl p-6 xl:p-8 2xl:p-10 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group flex flex-col flex-shrink-0"
						style={{ pointerEvents: 'none' }}
					>
						{/* Card Glow Effect */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						{/* Floating Orbs in Card */}
						<div className="absolute top-2 right-2 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
						<div
							className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"
							style={{ animationDelay: `${index * 0.5}s` }}
						/>

						<div className="flex flex-col items-center text-center relative z-10 flex-1">
							<motion.div
								className="w-24 h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 mx-auto mb-4 xl:mb-6 overflow-hidden rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-500 relative"
								animate={{
									y: [0, -3, 0],
									rotate: [0, 2, -2, 0],
								}}
								transition={{
									duration: 6 + index * 0.3,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: index * 0.2,
								}}
							>
								<motion.div
									className="relative z-10"
									transition={{
										duration: 0.8,
										ease: 'easeOut',
									}}
								>
									<AvatarSVG
										initial={member.name[0]}
										context={`carousel-${index}`}
									/>
								</motion.div>
							</motion.div>
							<motion.a
								href={member.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white mb-1 xl:mb-2 relative hover:text-blue-300 transition-colors duration-300 cursor-pointer group/name block"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
								style={{ pointerEvents: 'auto' }}
							>
								{member.name}
								<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full group-hover/name:from-blue-300 group-hover/name:to-purple-300 transition-all duration-300" />
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
			</div>
		</section>
	);
}

export default BoardMembers;
