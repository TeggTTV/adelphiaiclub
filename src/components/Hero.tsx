'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitText from './SplitText';
import DarkVeil from './DarkVeil';

const handleAnimationComplete = () => {
	console.log('All letters have animated!');
};

const Hero = () => {
	const heroRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});

	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen overflow-hidden"
		>
			{/* Dark Veil Background */}
			<div className="absolute inset-0 z-0">
				<DarkVeil
					hueShift={0}
					noiseIntensity={0}
					scanlineIntensity={0.15}
					speed={1.5}
					scanlineFrequency={60}
					warpAmount={1}
					resolutionScale={1}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm z-10" />
			</div>

			<div className="relative z-30 flex min-h-screen">
				<div className="w-full flex items-center justify-center px-12">
					<div className="max-w-2xl">
						<motion.div
						// style={{ opacity: opacity }}
						>
							<SplitText
								text={'Welcome to the Adelphi AI Society'}
								className="text-5xl md:text-6xl font-bold text-white mb-6"
								delay={50}
								duration={0.8}
								ease="power4.out"
								splitType="chars"
								from={{ opacity: 0, y: 50, rotateX: -90 }}
								to={{ opacity: 1, y: 0, rotateX: 0 }}
								threshold={0.1}
								rootMargin="-100px"
								onLetterAnimationComplete={
									handleAnimationComplete
								}
							/>
						</motion.div>

						<motion.div
						// style={{ opacity: opacity }}
						>
							<SplitText
								text={
									'Explore the fascinating world of Artificial Intelligence with us. Join our community of students and faculty passionate about machine learning, neural networks, and the future of AI.'
								}
								className="text-xl text-gray-300 mb-12"
								delay={10}
								duration={0.6}
								ease="power3.out"
								splitType="chars"
								from={{ opacity: 0, y: 30 }}
								to={{ opacity: 1, y: 0 }}
								threshold={0.1}
								rootMargin="-100px"
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							// style={{ opacity: opacity }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<a
								href="#board"
								className="flex-1 text-center bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-400 hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								Meet the Board
							</a>
							<a
								href="#events"
								className="flex-1 text-center bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-500 hover:scale-[1.02] transform transition-all duration-300 shadow-md hover:shadow-xl"
							>
								View Events
							</a>
						</motion.div>
					</div>
				</div>
				{/* <div className="w-1/2"></div> */}
			</div>

			{/* Scroll Down Indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-40"
				initial={{ opacity: 0, y: 20 }}
				animate={{
					opacity: 1,
					y: [0, 12, 0],
				}}
				transition={{
					opacity: { duration: 1, delay: 2 },
					y: {
						duration: 2.5,
						repeat: Infinity,
						ease: 'easeInOut',
					},
				}}
				style={{ opacity: opacity }}
				onClick={() => {
					const boardSection = document.getElementById('board');
					if (boardSection) {
						boardSection.scrollIntoView({ behavior: 'smooth' });
					}
				}}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				<div className="flex flex-col items-center group">
					<motion.span
						className="text-white/80 text-sm mb-3 font-medium tracking-wide"
						animate={{ opacity: [0.6, 1, 0.6] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						SCROLL DOWN
					</motion.span>

					{/* Animated Arrow */}
					<motion.div
						className="relative"
						animate={{ y: [0, 6, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<svg
							className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
						</svg>
					</motion.div>

					{/* Pulsing Circle Behind Arrow */}
					<motion.div
						className="absolute inset-0 w-12 h-12 border border-white/20 rounded-full"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0, 0.3],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeOut',
						}}
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
