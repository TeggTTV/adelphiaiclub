'use client';

import { motion } from 'framer-motion';
import { BoardMember } from '@/types';
import GlowCard from './bits/GlowCard';
import Orb from './bits/Orb';
import ParticleConnections from './bits/ParticleConnection';
import Particles from './bits/Particles';

const AvatarSVG = ({ initial }: { initial: string }) => (
	<svg
		className="w-full h-full"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
				<stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
			</linearGradient>
			<pattern
				id="avatarPattern"
				x="0"
				y="0"
				width="20"
				height="20"
				patternUnits="userSpaceOnUse"
			>
				<path
					d="M0 0h20v20h-20z"
					fill="none"
					stroke="rgba(255,255,255,0.3)"
					strokeWidth="0.5"
				/>
				<circle cx="10" cy="10" r="1" fill="rgba(59,130,246,0.5)" />
			</pattern>
		</defs>
		<circle cx="50" cy="50" r="45" fill="url(#avatarGrad)" />
		<circle
			cx="50"
			cy="50"
			r="45"
			fill="url(#avatarPattern)"
			fillOpacity="0.3"
		/>
		<text
			x="50"
			y="50"
			dominantBaseline="middle"
			textAnchor="middle"
			fill="#60A5FA"
			fontSize="40"
			fontFamily="sans-serif"
		>
			{initial}
		</text>
	</svg>
);

const boardMembers: BoardMember[] = [
	{
		name: 'Santiago Rodriguez',
		role: 'President',
		description:
			'Artificial Intelligence major dedicated to improving lives through AI awareness and education. Leading initiatives to help students and faculty harness the power of AI tools.',
	},
	{
		name: 'Doyan Bendezu',
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
	// {
	//   name: "Sixia Chen",
	//   role: "Faculty Advisor",
	//   description: "Assistant Professor of Mathematics and Computer Science at Adelphi University"
	// }
];

const BoardMembers = () => {
	return (
		<section
			id="board"
			className="w-full h-full relative py-20 bg-black min-h-screen flex items-center overflow-hidden"
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

			{/* Light Orbs */}
			{/* <div className="absolute inset-0 -top-[50vh] -bottom-[50vh] pointer-events-none">
				<motion.div 
					className="absolute top-0 left-0 -translate-x-1/2"
					animate={{ 
						x: [-200, 200, -200],
						y: [0, 100, 0] 
					}}
					transition={{ 
						duration: 25, 
						repeat: Infinity, 
						ease: "easeInOut" 
					}}
				>
					<div className="w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-[100px]" />
				</motion.div>
				<motion.div 
					className="absolute top-0 right-0 translate-x-1/2"
					animate={{ 
						x: [200, -100, 200],
						y: [0, 150, 0] 
					}}
					transition={{ 
						duration: 30, 
						repeat: Infinity, 
						ease: "easeInOut" 
					}}
				>
					<div className="w-[500px] h-[500px] rounded-full bg-purple-500/15 blur-[80px]" />
				</motion.div>
				<motion.div 
					className="absolute bottom-0 left-0 -translate-x-1/3"
					animate={{ 
						x: [-100, 150, -100],
						y: [0, -100, 0] 
					}}
					transition={{ 
						duration: 20, 
						repeat: Infinity, 
						ease: "easeInOut" 
					}}
				>
					<div className="w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[60px]" />
				</motion.div>
				<motion.div 
					className="absolute bottom-0 right-0 translate-x-1/2"
					animate={{ 
						x: [100, -200, 100],
						y: [0, -50, 0] 
					}}
					transition={{ 
						duration: 35, 
						repeat: Infinity, 
						ease: "easeInOut" 
					}}
				>
					<div className="w-[450px] h-[450px] rounded-full bg-violet-500/15 blur-[70px]" />
				</motion.div>
			</div> */}

			<div className="w-full container mx-auto px-4 absolute left-0 right-0 z-10">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl font-bold text-white text-center mb-3"
				>
					Meet Our Board
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-blue-200 text-center max-w-2xl mx-auto mb-8"
				>
					The brilliant minds driving innovation and fostering AI
					education at Adelphi University
				</motion.p>

				<motion.div 
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.2
							}
						}
					}}
				>
					{boardMembers.map((member, index) => (
						<motion.div
							key={member.name}
							className="w-full h-full bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
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
							// animate={{
							// 	y: [0, -5, 0],
							// }}
							transition={{
								duration: 4 + index * 0.5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: index * 0.5
							}}
						>
							{/* Card Glow Effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							
							{/* Floating Orbs in Card */}
							<div className="absolute top-2 right-2 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
							<div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" 
								 style={{ animationDelay: `${index * 0.5}s` }} />

							<div className="group relative z-10">
								<motion.div 
									className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-500 relative"
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
									{/* Avatar Glow Ring */}
									{/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm group-hover:from-blue-400/40 group-hover:to-purple-400/40 transition-all duration-500" /> */}
									
									<motion.div
										className="relative z-10"
										// whileHover={{ 
										// 	scale: 1.1,
										// 	rotate: 360 
										// }}
										transition={{
											duration: 0.8,
											ease: "easeOut"
										}}
									>
										<AvatarSVG initial={member.name[0]} />
									</motion.div>
								</motion.div>
								<motion.h3
									className="text-xl font-bold text-white text-center mb-1 relative"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									{member.name}
									<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
								</motion.h3>
								<p className="text-blue-400 font-semibold text-base text-center mb-2">
									{member.role}
								</p>
								<p className="text-gray-200 text-center text-sm leading-relaxed">
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
