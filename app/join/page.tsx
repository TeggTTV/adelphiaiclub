'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Section } from '@/components/Section';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function JoinPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<section className="py-24 md:py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-[100px]" />
				<div className="container mx-auto px-4 md:px-6 text-center relative z-10">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
					>
						Join the <span className="text-gradient">Society</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
					>
						Become a part of Adelphi&apos;s premier tech organization.
						Open to all majors and skill levels.
					</motion.p>
				</div>
			</section>

			<Section className="bg-[color:var(--muted)]/30">
				<div className="container mx-auto px-4 md:px-6 max-w-5xl">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<h2 className="text-3xl font-bold tracking-tight mb-6">
								Why Join Us?
							</h2>

							<ul className="space-y-6">
								{[
									{
										title: 'Hands-on Experience',
										desc: 'Work on real-world AI projects and build your portfolio.',
									},
									{
										title: 'Networking',
										desc: 'Connect with like-minded students, alumni, and industry professionals.',
									},
									{
										title: 'Skill Development',
										desc: 'Learn the latest in machine learning, data science, and software engineering.',
									},
									{
										title: 'Exclusive Events',
										desc: 'Get priority access to workshops, hackathons, and guest speaker sessions.',
									},
								].map((item, i) => (
									<li
										key={i}
										className="flex items-start gap-4"
									>
										<div className="mt-1 p-1 rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)] shrink-0">
											<CheckCircle2 className="w-5 h-5" />
										</div>
										<div>
											<h3 className="font-bold text-lg mb-1">
												{item.title}
											</h3>
											<p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed">
												{item.desc}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>

						<div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden text-center">
							<div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10" />

							<h2 className="text-3xl font-bold tracking-tight mb-6 relative z-10">
								Ready to start?
							</h2>
							<p className="text-[color:var(--muted-foreground)] mb-10 relative z-10">
								Membership is free and open to all currently
								enrolled Adelphi University students.
							</p>

							<div className="space-y-4 relative z-10">
								<a
									href="https://myaulife.adelphi.edu/organization/aisociety"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full px-8 py-4 rounded-xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
								>
									Join via MyAULife{' '}
									<ArrowRight className="w-5 h-5" />
								</a>
								<a
									href="https://instagram.com/adelphiaisociety_"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full px-8 py-4 rounded-xl glass glass-hover font-bold text-lg flex items-center justify-center gap-2"
								>
									Follow our Instagram
								</a>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
}
