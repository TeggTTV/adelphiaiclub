'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
	ArrowRight,
	BookOpen,
	Calendar,
	MessageSquare,
	Search,
	Sparkles,
} from 'lucide-react';

type BlogPost = {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	createdAt: string;
	authorName: string;
	contactEmail?: string | null;
	tags: string[];
};

const BlogDisclaimer = () => (
	<p className="mt-12 text-center text-sm text-[color:var(--muted-foreground)] opacity-70">
		Some club posts may include AI-assisted clarity improvements. If you
		have questions about a post, please reach out to the author or club
		officers for more details.
	</p>
);

export default function BlogPage() {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState('');
	const [posts, setPosts] = React.useState<BlogPost[]>([]);

	React.useEffect(() => {
		fetch('/api/blog/posts', { credentials: 'include' })
			.then((response) => response.json())
			.then((data) => {
				setPosts(data.posts || []);
			})
			.catch(() => setError('Unable to load blog posts'))
			.finally(() => setLoading(false));
	}, []);

	const featuredPost = posts[0];

	const filteredPosts = posts.filter((post) => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return true;

		const text = [
			post.title,
			post.excerpt || '',
			post.authorName,
			...post.tags,
		]
			.join(' ')
			.toLowerCase();
		return text.includes(query);
	});

	const otherPosts = filteredPosts.filter(
		(post) => post.id !== featuredPost?.id,
	);

	return (
		<section className="relative min-h-screen overflow-hidden px-4 py-16 sm:px-6 md:px-8">
			<div className="absolute right-0 top-0 -z-10 h-[540px] w-[540px] rounded-full bg-gradient-to-bl from-[color:var(--primary)]/20 via-cyan-500/10 to-transparent blur-3xl" />
			<div className="absolute bottom-0 left-0 -z-10 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-blue-500/10 to-transparent blur-3xl" />

			<motion.div
				className="mx-auto mb-14 max-w-3xl text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<motion.span
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-1.5 text-sm font-semibold text-[color:var(--primary)]"
				>
					<BookOpen className="h-4 w-4" />
					Club Insights
				</motion.span>

				<h1 className="text-4xl font-black tracking-tight md:text-6xl">
					The <span className="text-gradient">Blog</span>
				</h1>
				<p className="mt-5 text-lg text-[color:var(--muted-foreground)]">
					Tutorials, event recaps, and AI project notes from AI
					Society members.
				</p>

				<div className="mx-auto mt-8 max-w-xl">
					<div className="relative">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
						<input
							type="text"
							value={searchTerm}
							onChange={(event) =>
								setSearchTerm(event.target.value)
							}
							placeholder="Search posts..."
							className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] pl-10 pr-4 text-sm outline-none transition focus:border-[color:var(--primary)]"
						/>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
					<Link
						href="/blog/submit"
						className="inline-flex h-10 items-center rounded-full bg-[color:var(--primary)] px-5 text-sm font-bold text-[color:var(--primary-foreground)]"
					>
						Submit an Article
					</Link>
				</div>
			</motion.div>

			<div className="mx-auto max-w-7xl">
				{loading && (
					<p className="text-center text-[color:var(--muted-foreground)]">
						Loading blog posts...
					</p>
				)}
				{error && <p className="text-center text-red-400">{error}</p>}

				{!loading && featuredPost && filteredPosts.length > 0 && (
					<article className="group relative mb-14">
						<div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[color:var(--primary)] via-cyan-500 to-emerald-500 opacity-20 blur transition-opacity duration-500 group-hover:opacity-40" />
						<div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 md:p-10">
							<div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
								<span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--primary)] px-3 py-1 font-bold text-[color:var(--primary-foreground)]">
									<Sparkles className="h-3.5 w-3.5" />{' '}
									Featured
								</span>
								<span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--muted-foreground)]">
									<span className="inline-flex items-center gap-1">
										<Calendar className="h-3.5 w-3.5" />
										{new Date(
											featuredPost.createdAt,
										).toLocaleDateString()}
									</span>
								</span>
							</div>

							<h2 className="text-3xl font-black tracking-tight md:text-4xl">
								<Link
									href={`/blog/${featuredPost.slug}`}
									className="transition-colors hover:text-[color:var(--primary)]"
								>
									{featuredPost.title}
								</Link>
							</h2>
							<p className="mt-4 max-w-3xl text-[color:var(--muted-foreground)]">
								{featuredPost.excerpt ||
									'Read the latest article from the club.'}
							</p>
							<Link
								href={`/blog/${featuredPost.slug}`}
								className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-5 py-2.5 text-sm font-bold text-[color:var(--primary-foreground)]"
							>
								Read Article
								<ArrowRight className="h-4 w-4" />
							</Link>
							{featuredPost.contactEmail && (
								<p className="mt-3 text-sm text-[color:var(--muted-foreground)]">Contact: <a href={`mailto:${featuredPost.contactEmail}`} className="font-semibold text-[color:var(--primary)]">{featuredPost.contactEmail}</a></p>
							)}
						</div>
					</article>
				)}

				{!loading && filteredPosts.length > 0 && (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{otherPosts.map((post, index) => (
							<motion.article
								key={post.id}
								className="group overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]"
							>
								<div className="h-1 bg-gradient-to-r from-[color:var(--primary)] via-cyan-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
								<div className="p-5">
									<p className="mb-3 text-xs text-[color:var(--muted-foreground)]">
										{new Date(
											post.createdAt,
										).toLocaleDateString()}{' '}
										• {post.authorName}
										{post.contactEmail && (
											<span className="ml-2">• <a href={`mailto:${post.contactEmail}`} className="text-[color:var(--primary)]">{post.contactEmail}</a></span>
										)}
									</p>
									<h3 className="line-clamp-2 text-xl font-bold">
										<Link
											href={`/blog/${post.slug}`}
											className="transition-colors hover:text-[color:var(--primary)]"
										>
											{post.title}
										</Link>
									</h3>
									<p className="mt-3 line-clamp-3 text-sm text-[color:var(--muted-foreground)]">
										{post.excerpt || 'No excerpt.'}
									</p>
									<div className="mt-4 flex flex-wrap gap-2">
										{post.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-0.5 text-xs text-[color:var(--primary)]"
											>
												{tag}
											</span>
										))}
									</div>
									<Link
										href={`/blog/${post.slug}`}
										className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--primary)]"
									>
										Read more{' '}
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</motion.article>
						))}
					</div>
				)}

				{!loading && filteredPosts.length === 0 && (
					<div className="py-20 text-center">
						<MessageSquare className="mx-auto mb-3 h-16 w-16 text-[color:var(--muted-foreground)] opacity-40" />
						<h3 className="text-2xl font-bold">
							No blog posts found
						</h3>
						<p className="mt-2 text-[color:var(--muted-foreground)]">
							Try a different search or submit a new article.
						</p>
					</div>
				)}

				<BlogDisclaimer />
			</div>
		</section>
	);
}
