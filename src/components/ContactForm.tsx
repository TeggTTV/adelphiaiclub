'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		category: 'general',
		message: '',
	});
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');
	const [message, setMessage] = useState('');

	const categories = [
		{ value: 'general', label: 'General Inquiry' },
		{ value: 'sponsorship', label: 'Sponsorship Opportunity' },
		{ value: 'speaker', label: 'Speaker Proposal' },
		{ value: 'collaboration', label: 'Collaboration Request' },
		{ value: 'membership', label: 'Membership Question' },
	];

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('loading');

		// TODO: Replace with actual API endpoint or email service
		// For now, simulate API call
		setTimeout(() => {
			if (formData.name && formData.email && formData.message) {
				setStatus('success');
				setMessage(
					"Thanks for reaching out! We'll get back to you within 24-48 hours."
				);

				// Reset form
				setFormData({
					name: '',
					email: '',
					category: 'general',
					message: '',
				});

				// Reset status after 5 seconds
				setTimeout(() => {
					setStatus('idle');
					setMessage('');
				}, 5000);
			} else {
				setStatus('error');
				setMessage('Please fill in all required fields.');
				setTimeout(() => {
					setStatus('idle');
					setMessage('');
				}, 3000);
			}
		}, 1500);
	};

	return (
		<section
			id="connect"
			className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-black via-blue-900/10 to-black overflow-hidden"
		>
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

			<div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
				<div className="max-w-2xl mx-auto">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-8 sm:mb-12"
					>
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
							<FaPaperPlane className="text-2xl sm:text-3xl text-blue-400" />
						</motion.div>

						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
							Get in Touch
						</h2>
						<p className="text-white/70 text-sm sm:text-base md:text-lg">
							Have a question or want to collaborate? We&apos;d
							love to hear from you!
						</p>
					</motion.div>

					{/* Form */}
					<motion.form
						onSubmit={handleSubmit}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6"
					>
						{/* Name */}
						<div>
							<label
								htmlFor="name"
								className="block text-white font-semibold mb-2 text-sm sm:text-base"
							>
								Name <span className="text-red-400">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								disabled={status === 'loading'}
								required
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50"
								placeholder="John Doe"
							/>
						</div>

						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-white font-semibold mb-2 text-sm sm:text-base"
							>
								Email <span className="text-red-400">*</span>
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								disabled={status === 'loading'}
								required
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50"
								placeholder="john@example.com"
							/>
						</div>

						{/* Category */}
						<div>
							<label
								htmlFor="category"
								className="block text-white font-semibold mb-2 text-sm sm:text-base"
							>
								Inquiry Type
							</label>
							<select
								id="category"
								name="category"
								value={formData.category}
								onChange={handleChange}
								disabled={status === 'loading'}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50"
							>
								{categories.map((cat) => (
									<option
										key={cat.value}
										value={cat.value}
										className="bg-gray-900"
									>
										{cat.label}
									</option>
								))}
							</select>
						</div>

						{/* Message */}
						<div>
							<label
								htmlFor="message"
								className="block text-white font-semibold mb-2 text-sm sm:text-base"
							>
								Message <span className="text-red-400">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								disabled={status === 'loading'}
								required
								rows={6}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50"
								placeholder="Tell us what's on your mind..."
							/>
						</div>

						{/* Submit Button */}
						<motion.button
							type="submit"
							disabled={
								status === 'loading' || status === 'success'
							}
							whileHover={{
								scale:
									status === 'idle' || status === 'error'
										? 1.02
										: 1,
							}}
							whileTap={{
								scale:
									status === 'idle' || status === 'error'
										? 0.98
										: 1,
							}}
							className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
						>
							{status === 'loading' ? (
								<span className="flex items-center justify-center">
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Sending...
								</span>
							) : status === 'success' ? (
								<span className="flex items-center justify-center">
									<FaCheckCircle className="mr-2" />
									Message Sent!
								</span>
							) : (
								<span className="flex items-center justify-center">
									<FaPaperPlane className="mr-2" />
									Send Message
								</span>
							)}
						</motion.button>

						{/* Status Message */}
						{message && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className={`text-center text-sm sm:text-base ${
									status === 'success'
										? 'text-green-400'
										: 'text-red-400'
								}`}
							>
								{message}
							</motion.div>
						)}
					</motion.form>

					{/* Alternative Contact Options */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className="mt-8 text-center"
					>
						<p className="text-white/60 text-sm sm:text-base mb-3">
							Prefer email directly?
						</p>
						<a
							href="mailto:aiclub@adelphi.edu"
							className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base font-medium"
						>
							aiclub@adelphi.edu
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
