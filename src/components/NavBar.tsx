"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const NavBar = () => {
	return (
		<motion.nav
			className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="text-2xl font-bold text-black">
						Adelphi AI Club
					</Link>

					<div className="hidden md:flex space-x-8">
						<Link
							href="#events"
							className="text-black hover:text-[#FDB515] transition-colors"
						>
							Events
						</Link>
						<Link
							href="#board"
							className="text-black hover:text-[#FDB515] transition-colors"
						>
							Board Members
						</Link>
						<Link
							href="#contact"
							className="text-black hover:text-[#FDB515] transition-colors"
						>
							Contact
						</Link>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default NavBar;
