import { NextResponse } from 'next/server';
import { SubmissionStatus } from '@prisma/client';
import prisma from '@/lib/prisma';
import { decryptFromStorage } from '@/lib/crypto';
import {
	eboardMembers as staticEboard,
	upcomingEvents as staticUpcomingEvents,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const now = new Date();

		const [events, projects] = await Promise.all([
			prisma.event.findMany({
				where: {
					date: {
						gte: now,
					},
				},
				orderBy: {
					date: 'asc',
				},
				take: 3,
			}),
			prisma.project.findMany({
				where: {
					status: SubmissionStatus.APPROVED,
				},
				orderBy: [{ featured: 'desc' }, { updatedAt: 'desc' }],
				take: 2,
				select: {
					id: true,
					title: true,
					description: true,
					encryptedDescription: true,
					techStack: true,
					githubUrl: true,
				},
			}),
		]);

		const membersPayload = staticEboard.slice(0, 6).map((m) => ({
			id: m.id,
			name: m.name,
			role: m.role,
			bio: m.bio,
			imageUrl: m.imageUrl,
			instagram: m.instagram,
		}));

		// Map DB events to payload
		const dbEventsPayload = events.map((event) => ({
			id: event.id,
			title: event.title,
			description: event.description,
			date: event.date.toISOString(),
			location: event.location,
			link: event.link,
		}));

		// If DB has fewer than 3 upcoming events, supplement from static data
		const nowTs = new Date().getTime();
		const staticFuture = staticUpcomingEvents
			.filter((e) => {
				const t =
					e.date instanceof Date
						? e.date.getTime()
						: new Date(e.date).getTime();
				return !Number.isNaN(t) && t >= nowTs;
			})
			.map((e) => ({
				id: `static-${e.id}`,
				title: e.title,
				description: e.description,
				date: (e.date instanceof Date
					? e.date
					: new Date(e.date)
				).toISOString(),
				location: e.location,
				link: e.link,
			}));

		const combinedEvents: Array<any> = [];
		// prefer DB events first (already ordered asc)
		for (const ev of dbEventsPayload) {
			if (combinedEvents.length >= 3) break;
			combinedEvents.push(ev);
		}
		for (const ev of staticFuture) {
			if (combinedEvents.length >= 3) break;
			// avoid duplicates by title+date
			const exists = combinedEvents.some(
				(c) => c.title === ev.title && c.date === ev.date,
			);
			if (!exists) combinedEvents.push(ev);
		}

		return NextResponse.json({
			events: combinedEvents,
			members: membersPayload,
			projects: projects.map((project) => ({
				id: project.id,
				title: project.title,
				description:
					project.description ||
					decryptFromStorage(project.encryptedDescription),
				techStack: project.techStack,
				githubUrl: project.githubUrl,
			})),
		});
	} catch (error) {
		console.error('Failed to load landing page data', error);
		return NextResponse.json(
			{ error: 'Unable to load landing page data' },
			{ status: 500 },
		);
	}
}
