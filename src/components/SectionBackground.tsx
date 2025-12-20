'use client';

import { motion } from 'framer-motion';

const SectionBackground = () => {
	return (
		<>
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
						backgroundSize: '60px 60px',
						animation:
							'gridMove 30s ease-in-out infinite alternate',
					}}
				/>
			</div>

			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<motion.div
					className="absolute top-20 left-20"
					animate={{
						x: [-50, 50, -50],
						y: [0, 50, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[80px]" />
				</motion.div>
				<motion.div
					className="absolute bottom-20 right-20"
					animate={{
						x: [50, -50, 50],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px]" />
				</motion.div>
			</div>
		</>
	);
};

export default SectionBackground;
