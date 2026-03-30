'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Section } from '@/components/Section';
import {
	CalendarDays,
	GraduationCap,
	Sparkles,
	Users,
	ArrowRight,
} from 'lucide-react';

const clubFacts = [
	{
		title: 'Who We Are',
		body: 'AI Society is a student-led organization focused on practical AI learning, creative experimentation, and interdisciplinary collaboration.',
		icon: Users,
	},
	{
		title: 'Who Joins',
		body: 'Members come from Computer Science, Artificial Intelligence, Nursing, Accounting, and other majors. Different academic backgrounds make our projects stronger.',
		icon: GraduationCap,
	},
	{
		title: 'How We Learn',
		body: 'We run workshops, build projects, host challenges, and discuss real AI tools. Learning by doing is a core part of our culture.',
		icon: Sparkles,
	},
];

export default function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<section className="py-24 md:py-32 relative overflow-hidden border-b border-[color:var(--border)]/50">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.32)_0%,transparent_55%)] blur-[100px]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.18)_0%,transparent_60%)]" />
				<div className="container mx-auto px-4 md:px-6 text-center relative z-10">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
					>
						About{' '}
						<span className="text-gradient">
							AI Society
						</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
					>
						A student community where people from different majors
						explore AI through projects, events, and hands-on
						collaboration.
					</motion.p>
				</div>
			</section>

			<Section className="bg-[color:var(--muted)]/25">
				<div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
						{clubFacts.map((fact, index) => (
							<motion.article
								key={fact.title}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.08 }}
								className="glass rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300"
							>
								<div className="w-full px-5 sm:px-6 py-5 sm:py-6 text-left group">
									<div className="flex items-start justify-between gap-4">
										<h2 className="text-white font-semibold text-base md:text-lg pr-4 group-hover:text-blue-300 transition-colors duration-300">
											{fact.title}
										</h2>
										<div className="flex-shrink-0 text-blue-400">
											<fact.icon className="w-5 h-5" />
										</div>
									</div>
									<div className="text-[color:var(--muted-foreground)] text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4 mt-4">
										{fact.body}
									</div>
								</div>
							</motion.article>
						))}
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
						<motion.article
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="glass rounded-2xl p-6 md:p-8"
						>
							<div className="flex items-center gap-3 mb-4">
								<CalendarDays className="w-5 h-5 text-[color:var(--primary)]" />
								<h3 className="text-2xl font-bold tracking-tight">
									Why Students Choose This Club
								</h3>
							</div>
							<p className="text-[color:var(--muted-foreground)] leading-relaxed mb-6">
								Our members join for practical growth, strong
								community support, and real opportunities to build
								projects they can be proud of.
							</p>
							<div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)]/35 px-5 py-5">
								<ul className="space-y-3 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
									<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
										A welcoming environment for beginners and experienced builders.
									</li>
									<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
										Opportunities to collaborate with students from many majors.
									</li>
									<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
										Hands-on project work that helps build technical confidence.
									</li>
                  <li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
                    Regular workshops, events, and challenges to keep learning about AI fun and engaging.
                  </li>
                  <li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
                    A supportive community that celebrates creativity, curiosity, and growth in AI.
                  </li>
								</ul>
							</div>
						</motion.article>

						<motion.article
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="glass rounded-2xl p-6 md:p-8"
						>
							<h3 className="text-2xl font-bold tracking-tight mb-4">
								How To Get Involved
							</h3>
							<ul className="space-y-3 text-[color:var(--muted-foreground)] leading-relaxed">
								<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
									Attend a meeting and introduce yourself.
								</li>
								<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
									Join a workshop even if you are aren&apos;t
									a CS or AI major.
								</li>
								<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
									Contribute to club projects, demos, and
									event planning.
								</li>
								<li className="rounded-lg border border-[color:var(--border)] px-4 py-3">
									Present your own projects to the community
									so we can show it off to all members and
									more.
								</li>
							</ul>

							<div className="mt-6 pt-6 border-t border-[color:var(--border)]">
								<p className="text-sm text-[color:var(--muted-foreground)] mb-4">
									Ready to join the next meeting or event?
								</p>
								<div className="flex flex-col sm:flex-row gap-3">
									<Link
										href="/join"
										className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 font-bold text-[color:var(--primary-foreground)] hover:opacity-90 transition-opacity"
									>
										Join the Club{' '}
										<ArrowRight className="w-4 h-4" />
									</Link>
									<Link
										href="/events"
										className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[color:var(--border)] px-5 py-3 font-semibold hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] transition-colors"
									>
										View Events
									</Link>
								</div>
							</div>
						</motion.article>
					</div>

					<motion.article
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="glass rounded-2xl p-6 md:p-8"
					>
						<div className="flex items-center gap-3 mb-4">
							<Users className="w-5 h-5 text-[color:var(--primary)]" />
							<h3 className="text-2xl font-bold tracking-tight">
								Club Culture
							</h3>
						</div>
						<p className="text-[color:var(--muted-foreground)] text-base md:text-lg leading-relaxed">
							We keep a low-barrier, high-growth environment.
							Beginners are supported, advanced members are
							challenged, and everyone is encouraged to build, ask
							questions, and share ideas.
						</p>
					</motion.article>
				</div>
			</Section>
		</div>
	);
}
