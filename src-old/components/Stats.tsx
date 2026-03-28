'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaUsers, FaCalendarAlt, FaLaptopCode, FaClock } from 'react-icons/fa';

interface StatItemProps {
	icon: React.ComponentType<{ className?: string }>;
	value: number;
	label: string;
	suffix?: string;
	duration?: number;
}

const AnimatedCounter = ({
	value,
	duration = 2,
}: {
	value: number;
	duration?: number;
}) => {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(0);
	const springValue = useSpring(motionValue, { duration: duration * 1000 });
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	useEffect(() => {
		if (isInView) {
			motionValue.set(value);
		}
	}, [motionValue, isInView, value]);

	useEffect(() => {
		springValue.on('change', (latest) => {
			if (ref.current) {
				ref.current.textContent = Math.floor(latest).toLocaleString();
			}
		});
	}, [springValue]);

	return <span ref={ref}>0</span>;
};

const StatItem = ({
	icon: Icon,
	value,
	label,
	suffix = '',
	duration = 2,
}: StatItemProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30, scale: 0.9 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			whileHover={{ y: -5, transition: { duration: 0.2 } }}
			className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group"
		>
			{/* Hover Glow Effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			{/* Floating Orb */}
			<div className="absolute top-2 right-2 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />

			<div className="relative z-10 text-center">
				{/* Icon */}
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					whileInView={{ scale: 1, rotate: 0 }}
					viewport={{ once: true }}
					transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
					className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-300"
				>
					<Icon className="text-2xl sm:text-3xl text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
				</motion.div>

				{/* Value */}
				<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
					<AnimatedCounter value={value} duration={duration} />
					<span className="text-blue-400">{suffix}</span>
				</div>

				{/* Label */}
				<p className="text-white/70 text-sm sm:text-base md:text-lg font-medium">
					{label}
				</p>
			</div>

			{/* Bottom accent line */}
			<div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500" />
		</motion.div>
	);
};

const Stats = () => {
	const stats = [
		{
			icon: FaUsers,
			value: 150,
			label: 'Active Members',
			suffix: '+',
			duration: 2.5,
		},
		{
			icon: FaCalendarAlt,
			value: 45,
			label: 'Events Hosted',
			suffix: '+',
			duration: 2,
		},
		{
			icon: FaLaptopCode,
			value: 30,
			label: 'Projects Completed',
			suffix: '+',
			duration: 2.2,
		},
		{
			icon: FaClock,
			value: 500,
			label: 'Workshop Hours',
			suffix: '+',
			duration: 2.8,
		},
	];

	return (
		<section className="relative py-12 sm:py-16 md:py-20 bg-black overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
						backgroundSize: '50px 50px',
						animation:
							'gridMove 25s ease-in-out infinite alternate',
					}}
				/>
			</div>

			{/* Floating Orbs */}
			<div className="absolute inset-0 pointer-events-none">
				<motion.div
					className="absolute top-1/4 left-10"
					animate={{
						x: [-50, 50, -50],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[60px]" />
				</motion.div>
				<motion.div
					className="absolute bottom-1/4 right-10"
					animate={{
						x: [50, -50, 50],
						y: [0, -30, 0],
					}}
					transition={{
						duration: 22,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-[250px] h-[250px] rounded-full bg-blue-500/10 blur-[50px]" />
				</motion.div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-8 sm:mb-12"
				>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
						Our Impact in Numbers
					</h2>
					<p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
						Building a vibrant community of AI enthusiasts, one
						event at a time
					</p>
				</motion.div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<StatItem {...stat} />
						</motion.div>
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5 }}
					className="text-center mt-8 sm:mt-12"
				>
					<p className="text-white/60 text-sm sm:text-base mb-4">
						Want to be part of these numbers?
					</p>
					<motion.a
						href="#events"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						Join Our Next Event
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default Stats;
