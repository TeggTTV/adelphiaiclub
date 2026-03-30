'use client';

import { motion } from 'framer-motion';
import PlaceholderImage from './PlaceholderImage';
import SectionBackground from './SectionBackground';

const testimonials = [
	{
		id: 1,
		name: 'Nataly Gutierrez',
		role: 'Member',
		quote: 'The AI Society club is an innovative and engaging group at our school, offering a fantastic opportunity to dive into artificial intelligence. Overall, the AI Society club equips students with essential skills for the future and sparks a passion for technology and innovation.',
	},
	{
		id: 2,
		name: 'Dimitri Moutopoulos',
		role: 'Member',
		quote: 'Having an AI club is simple but valuable—a place to learn, question, and figure things out as technology keeps evolving.',
	},
	{
		id: 3,
		name: 'David Chen',
		role: 'Data Science Major',
		quote: 'I loved the hackathons! Building real projects with a team helped me build confidence in my coding skills.',
	},
];

const Testimonials = () => {
	return (
		<section className="py-16 sm:py-24 bg-transparent relative overflow-hidden">
			<SectionBackground />
			<div className="container mx-auto px-4 sm:px-6 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Hear from our Members
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						See how the AI Society is impacting
						students&apos; lives and careers.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="glass p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center text-center"
						>
							{/* <div className="w-20 h-20 mb-6 rounded-full overflow-hidden">
								<PlaceholderImage text="User" />
							</div> */}
							<p className="text-gray-300 italic mb-6">
								&quot;{testimonial.quote}&quot;
							</p>
							<div>
								<h4 className="text-white font-semibold text-lg">
									{testimonial.name}
								</h4>
								<span className="text-blue-400 text-sm">
									{testimonial.role}
								</span>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
