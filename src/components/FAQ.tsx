'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQItemProps {
	question: string;
	answer: string;
	isOpen: boolean;
	onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="glass rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300"
		>
			<button
				onClick={onToggle}
				className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left group"
			>
				<span className="text-white font-semibold text-sm sm:text-base md:text-lg pr-4 group-hover:text-blue-300 transition-colors duration-300">
					{question}
				</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
					className="flex-shrink-0"
				>
					<FaChevronDown className="text-blue-400 text-lg sm:text-xl" />
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
							{answer}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const faqs = [
		{
			question: 'Do I need coding experience to join?',
			answer: 'Not at all! We welcome members of all skill levels, from complete beginners to experienced programmers. Our workshops are designed to accommodate everyone, and we have mentorship programs for those just starting out. All you need is curiosity and enthusiasm for AI!',
		},
		{
			question: "What's the time commitment?",
			answer: "We're flexible! We typically host 2-3 events per month, including workshops, guest speakers, and social gatherings. You can participate as much or as little as you'd like. There's no pressure to attend every event—come to what interests you and fits your schedule.",
		},
		{
			question: 'What majors are club members?',
			answer: 'Our members come from diverse academic backgrounds! While we have many Computer Science and AI majors, we also have members from Nursing, Business, Biology, Psychology, and more. The interdisciplinary nature of AI means everyone brings unique perspectives and all are welcome!',
		},
		{
			question: 'What kind of events do you host?',
			answer: 'We host a variety of events including hands-on coding workshops, guest speaker sessions with industry professionals, hackathons, social gatherings, and collaborative projects.',
		},
		{
			question: 'How can I get more involved?',
			answer: "There are many ways to get involved beyond attending events! You can join our project teams, help organize events, contribute to our blog, become a workshop instructor, or apply for a board position. We're always looking for enthusiastic members who want to help grow our community.",
		},
		{
			question:
				'Can I present my AI and Computer Science projects at a meeting?',
			answer: "Absolutely! We encourage members to share their projects and research. It's a great way to get feedback, practice presenting, and inspire others. Just reach out to any board member, and we'll help you schedule a presentation slot at an upcoming meeting.",
		},
		{
			question: 'Do you offer any certifications or credentials?',
			answer: "While we don't offer formal certifications, active participation in our club looks great on your resume! We can provide letters of recommendation, and you'll gain practical skills, networking opportunities, and real-world project experience that employers value highly.",
		},
	];

	return (
		<section
			id="faq"
			className="relative py-12 sm:py-16 md:py-20 bg-transparent overflow-hidden"
		>
			{/* Animated Background */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
						backgroundSize: '60px 60px',
						animation:
							'gridMove 30s ease-in-out infinite alternate',
					}}
				/>
			</div>

			{/* Floating Orbs */}
			<div className="absolute inset-0 pointer-events-none">
				<motion.div
					className="absolute top-20 left-20"
					animate={{
						x: [-40, 40, -40],
						y: [0, 25, 0],
					}}
					transition={{
						duration: 18,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-[250px] h-[250px] rounded-full bg-blue-500/15 blur-[55px]" />
				</motion.div>
				<motion.div
					className="absolute bottom-20 right-20"
					animate={{
						x: [40, -40, 40],
						y: [0, -25, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<div className="w-[220px] h-[220px] rounded-full bg-purple-500/15 blur-[50px]" />
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
					{/* Icon */}
					<motion.div
						initial={{ scale: 0, rotate: -180 }}
						whileInView={{ scale: 1, rotate: 0 }}
						viewport={{ once: true }}
						transition={{
							type: 'spring',
							stiffness: 200,
							delay: 0.1,
						}}
						className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-white/10"
					>
						<FaQuestionCircle className="text-2xl sm:text-3xl text-blue-400" />
					</motion.div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
						Got questions? We&apos;ve got answers! Here&apos;s
						everything you need to know about joining our AI
						community.
					</p>
				</motion.div>

				{/* FAQ Items */}
				<div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
					{faqs.map((faq, index) => (
						<FAQItem
							key={index}
							question={faq.question}
							answer={faq.answer}
							isOpen={openIndex === index}
							onToggle={() =>
								setOpenIndex(openIndex === index ? null : index)
							}
						/>
					))}
				</div>

				{/* Contact CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="text-center mt-8 sm:mt-12"
				>
					<p className="text-white/60 text-sm sm:text-base mb-4">
						Still have questions?
					</p>
					<motion.a
						href="#connect"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						Get in Touch
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default FAQ;
