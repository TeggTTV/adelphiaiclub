'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
	children: ReactNode;
	className?: string;
	glowColor?: string;
	hoverScale?: number;
	delay?: number;
}

const GlowCard = ({
	children,
	className = '',
	glowColor = '#FDB515',
	hoverScale = 1.02,
	delay = 0,
}: GlowCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.6,
					delay,
					ease: [0.22, 1, 0.36, 1],
				},
			}}
			whileHover={{
				scale: hoverScale,
				boxShadow: `0 0 30px ${glowColor}30`,
				transition: { duration: 0.2 },
			}}
			viewport={{
				once: true,
				amount: 'some',
				margin: '0px 0px -150px 0px',
			}}
			className={`
        bg-white/10 backdrop-blur-md
        rounded-xl p-8
        border border-white/20
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        transition-all duration-300
        hover:border-white/40
        hover:bg-white/20
        relative
        overflow-hidden
        before:absolute before:inset-0
        before:z-[-1]
        before:bg-gradient-to-br
        before:from-white/10
        before:to-white/5
        before:rounded-xl
        ${className}
      `}
		>
			{/* Gradient overlay */}
			<div
				className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
				style={{
					background: `
            radial-gradient(
              circle at var(--x, 50%) var(--y, 50%),
              ${glowColor}10 0%,
              transparent 100%
            )
          `,
				}}
			/>

			{children}
		</motion.div>
	);
};

export default GlowCard;
