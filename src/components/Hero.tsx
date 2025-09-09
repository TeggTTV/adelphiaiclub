'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const patterns = [
		// Neural Network Pattern
		<svg
			key="pattern1"
			className="w-full h-full"
			viewBox="0 0 1000 1000"
			preserveAspectRatio="xMidYMid slice"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					id="grad1-neural"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%"
				>
					<stop offset="0%" stopColor="#f0f4ff" />
					<stop offset="100%" stopColor="#e0e7ff" />
				</linearGradient>
			</defs>
			<rect width="1000" height="1000" fill="url(#grad1-neural)" />
			{/* Pre-calculated nodes and connections for better visibility */}
			<g stroke="#FDB515" strokeWidth="2">
				<circle cx="200" cy="200" r="8" fill="#FDB515" opacity="0.8" />
				<circle cx="800" cy="300" r="8" fill="#FDB515" opacity="0.8" />
				<circle cx="500" cy="500" r="8" fill="#FDB515" opacity="0.8" />
				<circle cx="300" cy="700" r="8" fill="#FDB515" opacity="0.8" />
				<circle cx="700" cy="800" r="8" fill="#FDB515" opacity="0.8" />
				<path d="M200,200 L500,500 L800,300" opacity="0.5" />
				<path d="M300,700 L500,500 L700,800" opacity="0.5" />
				<path d="M200,200 L300,700" opacity="0.5" />
				<path d="M800,300 L700,800" opacity="0.5" />
			</g>
		</svg>,
		// Circuit Board Pattern
		<svg
			key="pattern2"
			className="w-full h-full"
			viewBox="0 0 1000 1000"
			preserveAspectRatio="xMidYMid slice"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					id="grad2-circuit"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="0%"
				>
					<stop offset="0%" stopColor="#fff5f5" />
					<stop offset="100%" stopColor="#ffe0e0" />
				</linearGradient>
			</defs>
			<rect width="1000" height="1000" fill="url(#grad2-circuit)" />
			<g stroke="#FDB515" strokeWidth="3" fill="none">
				<path d="M100,300 H800 V700 H500 V900" strokeOpacity="0.7" />
				<path d="M900,300 V100 H400 V300" strokeOpacity="0.7" />
				<path d="M500,100 H200 V700" strokeOpacity="0.7" />
				<circle cx="100" cy="300" r="20" fill="#FDB515" opacity="0.8" />
				<circle cx="900" cy="300" r="20" fill="#FDB515" opacity="0.8" />
				<circle cx="500" cy="100" r="20" fill="#FDB515" opacity="0.8" />
				<circle cx="500" cy="900" r="20" fill="#FDB515" opacity="0.8" />
			</g>
		</svg>,
		// Data Flow Pattern
		<svg
			key="pattern3"
			className="w-full h-full"
			viewBox="0 0 1000 1000"
			preserveAspectRatio="xMidYMid slice"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					id="grad3-data"
					x1="0%"
					y1="100%"
					x2="100%"
					y2="0%"
				>
					<stop offset="0%" stopColor="#f0fff4" />
					<stop offset="100%" stopColor="#dcfce7" />
				</linearGradient>
			</defs>
			<rect width="1000" height="1000" fill="url(#grad3-data)" />
			<g stroke="#FDB515" fill="none">
				<path
					d="M0,200 Q500,0 1000,200"
					strokeWidth="4"
					strokeOpacity="0.7"
				/>
				<path
					d="M0,500 Q500,300 1000,500"
					strokeWidth="4"
					strokeOpacity="0.8"
				/>
				<path
					d="M0,800 Q500,600 1000,800"
					strokeWidth="4"
					strokeOpacity="0.9"
				/>
				<circle cx="250" cy="200" r="25" fill="#FDB515" opacity="0.8" />
				<circle cx="750" cy="500" r="25" fill="#FDB515" opacity="0.8" />
				<circle cx="500" cy="800" r="25" fill="#FDB515" opacity="0.8" />
			</g>
		</svg>,
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % patterns.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [patterns.length]);

	return (
		<div className="relative h-screen w-full overflow-hidden">
			{/* Background Slideshow */}
			<div className="absolute inset-0">
				{patterns.map((pattern, index) => (
					<div
						key={index}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							currentSlide === index ? 'opacity-100' : 'opacity-0'
						}`}
					>
						{pattern}
					</div>
				))}
				{/* Subtle overlay for better contrast */}
				<div className="absolute inset-0 bg-[#65513C]/5"></div>
			</div>

			{/* Content */}
			<div className="relative z-20 h-full flex items-center">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-2xl"
					>
						<h1 className="text-5xl md:text-6xl font-bold text-[#65513C] mb-6">
							Welcome to the AI Club of Adelphi
						</h1>
						<p className="text-xl text-gray-600 mb-8">
							Exploring the frontiers of artificial intelligence
							through collaboration, learning, and innovation.
						</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-[#65513C] hover:bg-[#65513C]/90 text-white px-8 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition-all"
						>
							Join Us
						</motion.button>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
