'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem('cookie-consent');
		if (!consent) {
			// Show banner after a short delay for better UX
			const timer = setTimeout(() => {
				setShowBanner(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	const acceptCookies = () => {
		localStorage.setItem('cookie-consent', 'accepted');
		setShowBanner(false);
		
		// Initialize analytics if user accepts
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('consent', 'update', {
				analytics_storage: 'granted'
			});
		}
	};

	const declineCookies = () => {
		localStorage.setItem('cookie-consent', 'declined');
		setShowBanner(false);
		
		// Deny analytics if user declines
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('consent', 'update', {
				analytics_storage: 'denied'
			});
		}
	};

	return (
		<AnimatePresence>
			{showBanner && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/20 shadow-2xl z-[100] p-4"
				>
					<div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
						<div className="flex-1">
							<div className="flex items-center space-x-3 mb-2">
								<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
								<h3 className="text-white font-semibold text-sm">Cookie Consent</h3>
							</div>
							<p className="text-sm text-white/70 leading-relaxed">
								We use cookies to enhance your experience and
								analyze site usage. By continuing to use this
								site, you agree to our{' '}
								<a
									href="/privacy"
									className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors"
								>
									Privacy Policy
								</a>
								.
							</p>
						</div>
						<div className="flex gap-3">
							<motion.button
								onClick={declineCookies}
								className="px-4 py-2 text-sm text-white/70 hover:text-white border border-white/20 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Decline
							</motion.button>
							<motion.button
								onClick={acceptCookies}
								className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-400 hover:to-purple-400 shadow-lg hover:shadow-xl transition-all duration-300"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Accept
							</motion.button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
