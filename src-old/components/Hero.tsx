// Hero section updated with glassmorphism
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitText from './SplitText';
import DarkVeil from './DarkVeil';

const Hero = () => {
	const heroRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const y = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

	const stats = [
		{ label: 'Active Members', value: '150+' },
		{ label: 'Events Hosted', value: '25+' },
		{ label: 'Projects Built', value: '10+' },
	];

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
		>
			{/* Background Layers */}
			<div className="absolute inset-0 z-0">
				<DarkVeil
					hueShift={0}
					noiseIntensity={0.2}
					scanlineIntensity={0.2}
					speed={0.8}
					scanlineFrequency={100}
					warpAmount={0.5}
					resolutionScale={1}
				/>
				{/* Gradient Overlay for Depth */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/50 z-10" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent z-10" />
			</div>

			<div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
				{/* Pre-heading Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium backdrop-blur-sm"
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
					</span>
					Recruiting New Members for Spring 2026
				</motion.div>

				{/* Main Heading */}
				<motion.div style={{ opacity, y }} className="mb-6 max-w-4xl">
					<SplitText
						text="Adelphi AI Society"
						className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-2"
						delay={50}
						duration={1}
						ease="power4.out"
						splitType="chars"
						from={{ opacity: 0, scale: 0.8, y: 100 }}
						to={{ opacity: 1, scale: 1, y: 0 }}
						threshold={0.1}
					/>
					<h2 className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-light tracking-wide mt-2">
						Empowering Minds, Shaping Futures
					</h2>
				</motion.div>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 1 }}
					className="text-base sm:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
				>
					Join the premier student organization dedicated to the
					exploration of Artificial Intelligence. We build, we learn,
					and we innovate together to shape the future of technology.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
				>
					<a
						href="https://myaulife.adelphi.edu/organization/aisociety"
						target="_blank"
						rel="noopener noreferrer"
						className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
					>
						Become a Member
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							></path>
						</svg>
					</a>
					<a
						href="#events"
						className="px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-semibold text-lg hover:scale-105 transition-all border border-white/10 flex items-center justify-center"
					>
						Explore Events
					</a>
				</motion.div>

				{/* Stats Section */}
				{/* <motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.2, duration: 0.8 }}
					className="grid grid-cols-3 gap-8 sm:gap-16 border-t border-white/10 pt-8"
				>
					{stats.map((stat, i) => (
						<div key={i} className="flex flex-col items-center">
							<span className="text-3xl sm:text-4xl font-bold text-white mb-1">
								{stat.value}
							</span>
							<span className="text-sm text-gray-500 uppercase tracking-wider">
								{stat.label}
							</span>
						</div>
					))}
				</motion.div> */}
			</div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, y: [0, 10, 0] }}
				transition={{ delay: 2, duration: 2, repeat: Infinity }}
				onClick={() => {
					document
						.getElementById('board')
						?.scrollIntoView({ behavior: 'smooth' });
				}}
			>
				<div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
					<motion.div
						className="w-1.5 h-1.5 bg-blue-500 rounded-full"
						animate={{ y: [0, 12, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
