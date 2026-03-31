'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import {
	ArrowRight,
	Calendar,
	Code,
	Users,
	ChevronRight,
	FileCode2,
	User,
} from 'lucide-react';
import { Section } from '@/components/Section';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { format } from 'date-fns';

function TypewriterEffect({ words }: { words: string[] }) {
	const [index, setIndex] = React.useState(0);
	const [text, setText] = React.useState('');
	const [isDeleting, setIsDeleting] = React.useState(false);

	React.useEffect(() => {
		const currentWord = words[index];
		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					setText(currentWord.substring(0, text.length + 1));
					if (text === currentWord) {
						setTimeout(() => setIsDeleting(true), 1500);
					}
				} else {
					setText(currentWord.substring(0, text.length - 1));
					if (text === '') {
						setIsDeleting(false);
						setIndex((prev) => (prev + 1) % words.length);
					}
				}
			},
			isDeleting ? 50 : 100,
		);

		return () => clearTimeout(timeout);
	}, [text, isDeleting, index, words]);

	return (
		<span className="text-gradient font-bold">
			{text}
			<span className="animate-pulse">|</span>
		</span>
	);
}

type HomeEvent = {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	link: string | null;
};

type HomeEboardMember = {
	id: string;
	name: string;
	role: string;
	bio: string | null;
};

type HomeProject = {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	githubUrl: string | null;
};

export default function Home() {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 500], [0, 150]);
	const [events, setEvents] = React.useState<HomeEvent[]>([]);
	const [members, setMembers] = React.useState<HomeEboardMember[]>([]);
	const [featuredProjects, setFeaturedProjects] = React.useState<
		HomeProject[]
	>([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		let cancelled = false;

		const loadHomeData = async () => {
			setLoading(true);
			try {
				const response = await fetch('/api/home', {
					credentials: 'include',
				});
				if (!response.ok) {
					throw new Error('Unable to fetch home data');
				}

				const payload = (await response.json()) as {
					events?: HomeEvent[];
					members?: HomeEboardMember[];
					projects?: HomeProject[];
				};

				if (cancelled) {
					return;
				}

				setEvents(payload.events ?? []);
				setMembers(payload.members ?? []);
				setFeaturedProjects(payload.projects ?? []);
			} catch (error) {
				console.error('Failed to load landing page data', error);
			} finally {
				setLoading(false);
			}
		};

		loadHomeData();

		return () => {
			cancelled = true;
		};
	}, []);

	const upcomingEvents = React.useMemo(() => {
		const now = Date.now();
		return events
			.filter((e) => {
				const t = new Date(e.date).getTime();
				return !Number.isNaN(t) && t >= now;
			})
			.sort(
				(a, b) =>
					new Date(a.date).getTime() - new Date(b.date).getTime(),
			)
			.slice(0, 3);
	}, [events]);

	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/* Hero Section */}
			<section className="relative -mt-24 pt-24 min-h-[calc(100vh+6rem)] flex items-center justify-center overflow-hidden bg-[color:var(--background)]">
				{/* Animated Background */}
				<div className="absolute inset-0 z-0">
					<div className="absolute inset-0 hero-cinematic-gradient" />
					<div className="absolute inset-0 hero-energy-rings opacity-70" />
					<div className="absolute inset-0 hero-scanlines opacity-25" />
					<div className="absolute inset-0 hero-vignette" />

					<motion.div
						className="absolute -top-40 -left-24 h-[26rem] w-[26rem] rounded-full hero-orb-gold"
						animate={{
							x: [0, 48, -20, 0],
							y: [0, 36, -16, 0],
							scale: [1, 1.08, 0.94, 1],
						}}
						transition={{
							duration: 24,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>

					<motion.div
						className="absolute -bottom-44 -right-28 h-[30rem] w-[30rem] rounded-full hero-orb-cyan"
						animate={{
							x: [0, -60, 20, 0],
							y: [0, -26, 16, 0],
							scale: [1, 0.92, 1.1, 1],
						}}
						transition={{
							duration: 28,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>

					<motion.div
						style={{ y }}
						className="absolute inset-0 opacity-25 dark:opacity-35"
						animate={{
							backgroundPosition: ['0% 0%', '100% 100%'],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.4)_0%,transparent_56%)] blur-[100px] opacity-25" />
						<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
						<div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
						<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
					</motion.div>

					{[...Array(12)].map((_, i) => (
						<motion.span
							key={i}
							className="absolute block rounded-full bg-indigo-300/70 shadow-[0_0_16px_rgba(129,140,248,0.45)]"
							style={{
								width: `${(i % 3) + 2}px`,
								height: `${(i % 3) + 2}px`,
								left: `${8 + ((i * 8) % 84)}%`,
								top: `${10 + ((i * 13) % 78)}%`,
							}}
							animate={{
								y: [0, -28 - (i % 4) * 6, 0],
								x: [0, i % 2 === 0 ? 10 : -10, 0],
								opacity: [0.15, 0.85, 0.15],
							}}
							transition={{
								duration: 5 + (i % 6),
								repeat: Infinity,
								ease: 'easeInOut',
								delay: i * 0.2,
							}}
						/>
					))}
				</div>

				<div className="container relative z-20 mx-auto px-4 md:px-6 text-center flex flex-col items-center gap-8">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-[color:var(--primary)] mb-4"
					>
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--primary)] opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--primary)]"></span>
						</span>
						Adelphi University&apos;s Premier Tech Organization
					</motion.div>

					<h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter max-w-4xl leading-tight">
						We{' '}
						<TypewriterEffect
							words={['Innovate.', 'Create.', 'Explore.']}
						/>
					</h1>

					<p className="text-lg md:text-xl text-[color:var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
						Join our community in the exploration of Artificial
						Intelligence as a way to amplify innovation, creativity,
						and growth.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
						<Link
							href="/join"
							className="px-8 py-4 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-2 w-full sm:w-auto justify-center"
						>
							Join Us <ArrowRight className="w-5 h-5" />
						</Link>
						<Link
							href="/events"
							className="px-8 py-4 rounded-full glass glass-hover font-bold text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
						>
							View Events <Calendar className="w-5 h-5" />
						</Link>
					</div>
				</div>
			</section>

			{/* About Blurb */}
			<Section className="bg-[color:var(--muted)]/30">
				<div className="container mx-auto px-4 md:px-6">
					<div className="glass p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-center relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[color:var(--primary)] to-transparent opacity-50" />
						<h2 className="text-2xl md:text-3xl font-bold mb-6">
							Shaping the Future Together
						</h2>
						<p className="text-lg text-[color:var(--muted-foreground)] mb-8 leading-relaxed">
							The AI Society is dedicated to demystifying
							artificial intelligence and providing students with
							hands-on experience in machine learning, data
							science, and software engineering. Whether
							you&apos;re a beginner or an expert, there&apos;s a
							place for you here.
						</p>
						<Link
							href="/about"
							className="inline-flex items-center gap-2 text-[color:var(--primary)] font-bold hover:underline underline-offset-4"
						>
							Learn More About Us{' '}
							<ChevronRight className="w-4 h-4" />
						</Link>
					</div>
				</div>
			</Section>

			{/* Upcoming Events Preview */}
			<Section>
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
								Upcoming Events
							</h2>
							<p className="text-[color:var(--muted-foreground)]">
								Don&apos;t miss out on our latest workshops and
								meetups.
							</p>
						</div>
						<Link
							href="/events"
							className="inline-flex items-center gap-2 text-[color:var(--primary)] font-bold hover:underline underline-offset-4"
						>
							View All Events <ArrowRight className="w-4 h-4" />
						</Link>
					</div>

					{loading ? (
						<div className="mt-4">
							<SkeletonGrid count={3} />
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{upcomingEvents.length === 0 ? (
								<div className="md:col-span-2 lg:col-span-3 glass rounded-2xl p-8 text-center text-[color:var(--muted-foreground)]">
									Upcoming events will appear here once they are
									added in the dashboard.
								</div>
							) : (
								upcomingEvents.map((event, i) => (
									<motion.div
										key={event.id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1 }}
										className="glass glass-hover rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group"
									>
										<div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
											<Calendar className="w-24 h-24 text-[color:var(--primary)]" />
										</div>
										<div className="text-sm font-bold text-[color:var(--primary)] mb-2">
											{format(new Date(event.date), 'MMM d, yyyy • h:mm a')}
										</div>
										<h3 className="text-xl font-bold mb-3 relative z-10">{event.title}</h3>
										<p className="text-[color:var(--muted-foreground)] text-sm mb-6 flex-grow relative z-10">
											{event.description}
										</p>
										<div className="flex items-center justify-between mt-auto relative z-10">
											<span className="text-xs font-medium px-3 py-1 rounded-full bg-[color:var(--muted)]">
												{event.location}
											</span>
											<Link
												href={`/events`}
												className="p-2 rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-[color:var(--primary-foreground)] transition-colors"
											>
												<ArrowRight className="w-4 h-4" />
											</Link>
										</div>
									</motion.div>
								))
							)}
						</div>
					)}
				</div>
			</Section>

			{/* Stats Row */}
			{/* <Section className="bg-[color:var(--primary)]/5 border-y border-[color:var(--primary)]/10 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Members", value: "150+" },
              { label: "Events Held", value: "24" },
              { label: "Projects Built", value: "12" },
              { label: "Lines of Code", value: "100k+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="text-4xl md:text-5xl font-black text-gradient">{stat.value}</div>
                <div className="text-sm font-medium text-[color:var(--muted-foreground)] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section> */}

			{/* Featured E-Board */}
			<Section>
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
							Meet the Executive Board
						</h2>
						<p className="text-[color:var(--muted-foreground)] max-w-2xl mx-auto">
							The dedicated team driving the vision and operations
							of the AI Society.
						</p>
					</div>

					{loading ? (
						<SkeletonGrid count={3} />
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{members.map((member, i) => (
								<motion.div
									key={member.id}
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="glass rounded-2xl p-6 text-center flex flex-col items-center gap-4 group hover:border-[color:var(--primary)] transition-colors"
								>
									<div className="w-24 h-24 rounded-full bg-[color:var(--muted)] flex items-center justify-center border-2 border-[color:var(--border)] group-hover:border-[color:var(--primary)] transition-colors">
										<User className="w-10 h-10 text-[color:var(--muted-foreground)] group-hover:text-[color:var(--primary)] transition-colors" />
									</div>
									<div>
										<h3 className="text-lg font-bold">
											{member.name}
										</h3>
										<p className="text-sm font-medium text-[color:var(--primary)]">
											{member.role}
										</p>
										<p className="text-xs text-[color:var(--muted-foreground)]">
											{member.bio ?? ''}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					)}

					<div className="text-center mt-10">
						<Link
							href="/eboard"
							className="inline-flex items-center gap-2 text-[color:var(--primary)] font-bold hover:underline underline-offset-4"
						>
							Get to know the team{' '}
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</div>
			</Section>

			{/* Projects Showcase */}
			<Section className="bg-[color:var(--muted)]/30">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
								Featured Projects
							</h2>
							<p className="text-[color:var(--muted-foreground)]">
								See what our members have been building.
							</p>
						</div>
						<Link
							href="/projects"
							className="inline-flex items-center gap-2 text-[color:var(--primary)] font-bold hover:underline underline-offset-4"
						>
							View All Projects <ArrowRight className="w-4 h-4" />
						</Link>
					</div>

					{loading ? (
						<div className="mt-4">
							<SkeletonGrid count={2} />
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{featuredProjects.length === 0 ? (
								<div className="md:col-span-2 glass rounded-3xl p-10 text-center text-[color:var(--muted-foreground)]">
									Featured projects will appear here once approved
									projects are published.
								</div>
							) : (
								featuredProjects.map((project, i) => (
									<motion.div
										key={project.id}
										initial={{
											opacity: 0,
											x: i % 2 === 0 ? -20 : 20,
										}}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										className="glass rounded-3xl overflow-hidden group"
									>
										<div className="h-48 bg-[color:var(--muted)] flex items-center justify-center border-b border-[color:var(--border)] relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
											<FileCode2 className="w-16 h-16 text-[color:var(--muted-foreground)] group-hover:text-[color:var(--primary)] transition-colors duration-500 group-hover:scale-110" />
										</div>
										<div className="p-8">
											<h3 className="text-2xl font-bold mb-3">
												{project.title}
											</h3>
											<p className="text-[color:var(--muted-foreground)] mb-6 line-clamp-2">
												{project.description}
											</p>
											<div className="flex flex-wrap gap-2 mb-6">
												{project.techStack.map((tech) => (
													<span
														key={tech}
														className="text-xs font-medium px-3 py-1 rounded-full bg-[color:var(--background)] border border-[color:var(--border)]"
													>
														{tech}
													</span>
												))}
											</div>
											<div className="flex items-center gap-4">
												{project.githubUrl && (
													<a
														href={project.githubUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm font-bold flex items-center gap-2 hover:text-[color:var(--primary)] transition-colors"
													>
														<Code className="w-4 h-4" /> Source Code
													</a>
												)}
											</div>
										</div>
									</motion.div>
								))
							)}
						</div>
					)}
				</div>
			</Section>

			{/* Join CTA Banner */}
			<section className="py-24 relative overflow-hidden">
				<div className="absolute inset-0 bg-[color:var(--primary)]/10" />
				<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[color:var(--primary)] to-transparent" />
				<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[color:var(--primary)] to-transparent" />

				<div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6">
						Ready to shape the future of AI?
					</h2>
					<p className="text-xl text-[color:var(--muted-foreground)] mb-10 max-w-2xl mx-auto">
						Join a community of forward-thinking students building
						the next generation of intelligent applications.
					</p>
					<Link
						href="/join"
						className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-black text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(99,102,241,0.3)]"
					>
						Join the Society <Users className="w-6 h-6" />
					</Link>
				</div>
			</section>
		</div>
	);
}
