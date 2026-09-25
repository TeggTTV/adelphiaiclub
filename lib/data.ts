// ─────────────────────────────────────────────────────────────────────────────
// E-Board Members
//
// HOW TO ADD A LINKEDIN PROFILE OR HANDLE:
//   Each member below has a `handles` array.
//   To add a LinkedIn profile, fill in the handle and url:
//     {
//       label: 'LinkedIn',
//       handle: 'username',
//       url: 'https://www.linkedin.com/in/username',
//     }
//   Leave `url: ''` empty if not yet provided. Empty links are automatically hidden.
// ─────────────────────────────────────────────────────────────────────────────

export type MemberHandle = {
	label: string;
	handle?: string;
	url: string;
};

export type EboardMember = {
	id: string;
	name: string;
	role: string;
	bio: string;
	imageUrl: string;
	handles: MemberHandle[];
	order: number;
};

export const eboardMembers: EboardMember[] = [
	{
		id: '1',
		name: 'Santiago Rodriguez',
		role: 'President',
		bio: 'Artificial Intelligence major passionate about exploring emerging technologies to spark new ideas, expand creativity, and drive meaningful progress.',
		imageUrl: '/images/eboard/santiago-rodriguez.svg',
		handles: [
			{
				label: 'LinkedIn',
				handle: 'santiagorodriguezai',
				url: 'https://www.linkedin.com/in/santiagorodriguezai/',
			},
			{
				label: 'Instagram',
				handle: '@_itssantiagox',
				url: 'https://instagram.com/_itssantiagox',
			},
			{
				label: 'Portfolio',
				handle: 'iamsantiago.com',
				url: 'https://iamsantiago.com',
			},
		],
		order: 1,
	},
	{
		id: '2',
		name: 'Doryan Bendezu',
		role: 'Vice President',
		bio: 'Nursing major bringing healthcare perspective to AI applications. Focused on bridging the gap between medical care and artificial intelligence.',
		imageUrl: '/images/eboard/doryan-bendezu.svg',
		handles: [
			{
				label: 'LinkedIn',
				handle: 'doryan-bendezu-chauca',
				url: 'https://www.linkedin.com/in/doryan-bendezu-chauca-935ab62ba/',
			},
			{
				label: 'Instagram',
				handle: '@doctordbd',
				url: 'https://instagram.com/doctordbd',
			},
		],
		order: 2,
	},
	{
		id: '3',
		name: 'Joseph Jazwinski',
		role: 'Senior Software Engineer',
		bio: 'Computer Science major with 7+ years of coding experience, specializing in TypeScript web development and backend systems.',
		imageUrl: '/images/eboard/joseph-jazwinski.svg',
		handles: [
			{
				label: 'LinkedIn',
				handle: 'joeyjedu',
				url: 'https://www.linkedin.com/in/joeyjedu/',
			},
			{
				label: 'Portfolio',
				handle: 'joeyjazwinski.com',
				url: 'https://joeyjazwinski.com',
			},
			{
				label: 'GitHub',
				handle: 'TeggTTV',
				url: 'https://github.com/TeggTTV',
			},
			{
				label: 'Instagram',
				handle: '@teggundrut',
				url: 'https://instagram.com/teggundrut',
			},
		],
		order: 3,
	},
	{
		id: '4',
		name: 'Amy Mathew',
		role: 'Treasurer',
		bio: 'Accounting major managing club finances and budgeting. Exploring the intersection of AI and financial technology.',
		imageUrl: '/images/eboard/amy-mathew.svg',
		handles: [
			{
				label: 'LinkedIn',
				handle: '',
				url: '',
			},
		],
		order: 4,
	},
	{
		id: '5',
		name: 'Rian Fernando',
		role: 'Secretary',
		bio: 'Computer Science major dedicated to supporting the club and advancing AI initiatives.',
		imageUrl: '/images/eboard/rian-fernando.svg',
		handles: [
			{
				label: 'LinkedIn',
				handle: 'rian-fernando',
				url: 'https://www.linkedin.com/in/rian-fernando/',
			},
			{
				label: 'Instagram',
				handle: '@rian._.f',
				url: 'https://instagram.com/rian._.f',
			},
		],
		order: 5,
	},
	{
		id: '6',
		name: 'Julia Abbaticchio',
		role: 'Social Media/Creative Director',
		bio: 'Leads our creative and social media efforts, bringing fresh ideas and vibrant energy to the club.',
		imageUrl: '/images/eboard/julia-abbaticchio.svg',
		handles: [
			{
				label: 'LinkedIn',
				handle: 'juliaabbaticchio',
				url: 'https://www.linkedin.com/in/juliaabbaticchio/',
			},
			{
				label: 'Instagram',
				handle: '@julia.abbs.06',
				url: 'https://instagram.com/julia.abbs.06',
			},
		],
		order: 6,
	},
];

export type ClubEvent = {
	id: string;
	title: string;
	description: string;
	date: Date | null;
	time?: string;
	type?: string;
	location: string;
	link?: string;
	imageUrl?: string | null;
};

export const upcomingEvents: ClubEvent[] = [
	{
		id: '1',
		title: 'AI Debate',
		description:
			'An interactive debate where students will explore different perspectives on current AI-related topics. Participants will be divided into teams, given positions to defend, and challenged to develop arguments and respond to opposing viewpoints. The goal is to encourage critical thinking and discussion around the broader impact of AI.',
		date: new Date('2026-09-14T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Debate',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '2',
		title: 'AI vs. Human',
		description:
			'An interactive competition where students will complete a series of creative and problem-solving challenges without using AI, while the AI Society secretly generates its own responses using the same instructions and time limits. The human and AI responses will then be compared, giving participants a fun way to explore where humans and AI perform differently.',
		date: new Date('2026-09-21T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Competition',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '3',
		title: 'Build Your Own AI App',
		description:
			'A hands-on building session where students will use Google AI Studio to create their own AI-powered applications, with no prior coding experience required. We will demonstrate how AI can be used to build software, provide starter prompts and ideas, and have AI Society members available to help participants develop and improve their projects. Students will have the opportunity to showcase what they build at the end of the session.',
		date: new Date('2026-09-28T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Hands-on Workshop',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '4',
		title: 'From Student to Startup Founder: Guest Speaker Prayag',
		description:
			'Guest Speaker: Prayag, an Adelphi CS graduate and startup founder, will share his journey from being a student to working at an AI startup and eventually leaving his job to pursue his own company full-time. His product has grown to more than 1,000 users, and he will discuss how he identified a problem, built and tested his product, found his first users, and grew the startup. The event will also include a live look at his startup and an interactive Q&A.',
		date: new Date('2026-10-05T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Guest Speaker',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '5',
		title: 'The AI Game Show',
		description:
			'An interactive AI-themed game show inspired by Jeopardy, where teams will compete across categories including AI history, major AI companies, AI movies, neural networks, prompt engineering, unusual AI facts, and the future of AI. Questions will use a variety of formats, including multiple choice, rapid-fire questions, visual identification, and other interactive challenges. The event will be presented through a custom game-show interface to make it feel like a competition rather than a traditional presentation.',
		date: new Date('2026-10-19T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Interactive',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '6',
		title: 'AI United Nations',
		description:
			'An interactive simulation where each team represents a different country with its own economic situation, technological capabilities, priorities, and political interests. Teams will negotiate a proposed global framework for AI while dealing with issues such as AI access, misinformation, labor displacement, surveillance, algorithmic discrimination, and control of advanced AI. Unexpected developments may be introduced throughout the simulation, forcing teams to adapt their strategies and negotiate with other countries.',
		date: new Date('2026-10-26T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Simulation',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '7',
		title: 'Create Your Own Professional Website Workshop',
		description:
			"A hands-on workshop where students will learn how to create and deploy their own professional personal website using AI, even without advanced coding experience. We will demonstrate how a website can showcase a student's education, projects, research, experience, skills, and résumé, then walk through using AI to build and customize the site. Students will work on their own websites with guidance from the AI Society and learn how to publish them using GitHub and Vercel. A representative from the Business School may also be invited to provide additional perspective on professional branding and career development.",
		date: new Date('2026-11-02T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Workshop',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '8',
		title: 'AI Survival Guide',
		description:
			'An interactive workshop focused on helping students use AI more effectively for college. We will introduce a selection of useful AI tools and explain what each is best suited for rather than simply listing different platforms. Students will then apply what they learn through practical challenges, such as using a course syllabus to create a study plan, research strategy, or presentation workflow. The goal is for students to leave with practical strategies they can immediately use in their classes.',
		date: new Date('2026-11-09T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Workshop',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '9',
		title: 'AI Hackathon',
		description:
			'A full-day flagship AI Society event where students will have approximately eight hours to turn an idea into a working AI-powered project. The hackathon will be open to both beginners and experienced students, with participants able to compete individually or in teams of 2-4. Participants will have access to food, drinks, starter templates, useful prompts, and AI Society members who can provide guidance throughout the event. After the submission deadline, judges will select a group of finalists to present their projects, followed by the announcement of the winners and prizes for the top five projects. Date and exact schedule TBD.',
		date: null,
		time: 'Full Day (8 Hours, Schedule TBD)',
		type: 'Flagship Hackathon',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '10',
		title: 'Applying Machine Learning to the Housing Market',
		description:
			"A beginner-friendly hands-on workshop where students will use a real-world housing dataset to explore how machine learning can be used to predict property prices. Participants will start with a pre-built baseline model and then experiment with features, model parameters, and other approaches to see how their changes affect performance. The workshop will also explore which characteristics of a property, such as size, location, and number of rooms, have the greatest influence on the model's predictions.",
		date: new Date('2026-11-30T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Workshop',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
	{
		id: '11',
		title: 'AI Society End-of-Semester Party',
		description:
			"A relaxed final event celebrating the AI Society's activities and accomplishments throughout the semester. The event will include food, music, socializing, and a short recap featuring photos, projects, events, and memorable moments from the semester. Members will also have the opportunity to share ideas for future events, speakers, and activities they would like to see from the society next semester.",
		date: new Date('2026-12-07T13:00:00'),
		time: '1:00pm - 2:00pm',
		type: 'Social Celebration',
		location: 'Adelphi University',
		link: '#',
		imageUrl: null,
	},
];

export type Project = {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	tags: string[];
	creators: string[];
	status: 'Planning' | 'Research' | 'In Progress' | 'Launched';
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
	featured: boolean;
	githubUrl: string;
	liveUrl: string;
	imageUrl: string | null;
	lastUpdated: string;
	semester: string;
	impact: string;
};

export const projects: Project[] = [
	{
		id: '1',
		title: 'Adelphi Course Recommender',
		description:
			'An AI-powered planner that suggests classes from degree requirements, professor trends, and student interests.',
		techStack: ['Python', 'TensorFlow', 'Next.js', 'MongoDB'],
		tags: ['Recommendation', 'Academic Success', 'NLP'],
		creators: ['Santiago Rodriguez', 'Joseph Jazwinski'],
		status: 'In Progress',
		difficulty: 'Advanced',
		featured: true,
		githubUrl: '',
		liveUrl: '#',
		imageUrl: null,
		lastUpdated: '2026-03-18',
		semester: 'Spring 2026',
		impact: 'Helps students discover better-fitting course schedules in under 30 seconds.',
	},
	{
		id: '2',
		title: 'Campus Navigation Bot',
		description:
			'A conversational guide that helps new students find classrooms, offices, and event spaces on campus.',
		techStack: ['Node.js', 'OpenAI API', 'React', 'Supabase'],
		tags: ['Chatbot', 'Student Experience', 'Wayfinding'],
		creators: ['Rian Fernando', 'Cindy'],
		status: 'Launched',
		difficulty: 'Intermediate',
		featured: true,
		githubUrl: '',
		liveUrl: '#',
		imageUrl: null,
		lastUpdated: '2026-02-26',
		semester: 'Spring 2026',
		impact: 'Reduced first-week navigation questions at tabling events by an estimated 40%.',
	},
	{
		id: '3',
		title: 'AI Study Buddy',
		description:
			'Creates practice questions and adaptive study plans from uploaded class notes and slides.',
		techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
		tags: ['Education', 'Productivity', 'Generative AI'],
		creators: ['Doryan Bendezu', 'Joseph Jazwinski'],
		status: 'In Progress',
		difficulty: 'Intermediate',
		featured: true,
		githubUrl: '',
		liveUrl: '#',
		imageUrl: null,
		lastUpdated: '2026-03-22',
		semester: 'Spring 2026',
		impact: 'Turns static notes into active recall practice in minutes.',
	},
	{
		id: '4',
		title: 'Hackathon Teammate Matcher',
		description:
			'Matches participants based on skills, interests, and project goals to form balanced teams quickly.',
		techStack: ['React', 'Firebase', 'Cloud Functions'],
		tags: ['Community', 'Matching', 'Hackathon'],
		creators: ['Michael Riccio', 'Santiago Rodriguez'],
		status: 'Research',
		difficulty: 'Beginner',
		featured: false,
		githubUrl: '',
		liveUrl: '#',
		imageUrl: null,
		lastUpdated: '2026-03-10',
		semester: 'Spring 2026',
		impact: 'Aims to reduce team-forming friction before club hack nights.',
	},
	{
		id: '5',
		title: 'Resume Bullet Optimizer',
		description:
			'Improves resume project bullet points using role-specific language and measurable outcomes.',
		techStack: ['Next.js', 'OpenAI API', 'Tailwind CSS'],
		tags: ['Career', 'LLM', 'Professional Development'],
		creators: ['Cindy', 'Rian Fernando'],
		status: 'Planning',
		difficulty: 'Beginner',
		featured: false,
		githubUrl: '',
		liveUrl: '#',
		imageUrl: null,
		lastUpdated: '2026-03-25',
		semester: 'Fall 2026',
		impact: 'Will help members prepare stronger internship applications.',
	},
	{
		id: '6',
		title: 'AI Event Insights Dashboard',
		description:
			'Analyzes attendance patterns and feedback from events to optimize future workshop planning.',
		techStack: ['TypeScript', 'Chart.js', 'Prisma', 'PostgreSQL'],
		tags: ['Analytics', 'Dashboard', 'Operations'],
		creators: ['Michael Riccio', 'Doryan Bendezu'],
		status: 'Launched',
		difficulty: 'Advanced',
		featured: true,
		githubUrl: '',
		liveUrl: '#',
		imageUrl: null,
		lastUpdated: '2026-03-04',
		semester: 'Spring 2026',
		impact: 'Provides measurable signals for improving turnout and member engagement.',
	},
];

export const blogPosts = [
	{
		id: '1',
		title: 'Welcome to the AI Society',
		slug: 'welcome-to-adelphi-ai-society',
		content:
			'We are thrilled to announce the launch of the AI Society! Our mission is to foster a community of students passionate about artificial intelligence, machine learning, and data science. Stay tuned for upcoming events, workshops, and projects.',
		excerpt: 'We are thrilled to announce the launch of the AI Society!',
		author: 'Santiago Rodriguez',
		createdAt: new Date('2026-03-01T12:00:00Z'),
		updatedAt: new Date('2026-03-01T12:00:00Z'),
		published: true,
		tags: ['Announcement', 'Welcome'],
	},
	{
		id: '2',
		title: 'Understanding Large Language Models',
		slug: 'understanding-large-language-models',
		content:
			'Large Language Models (LLMs) have taken the world by storm. In this post, we break down how they work, their architecture, and why they are so powerful. From transformers to attention mechanisms, we cover the basics you need to know.',
		excerpt: 'A beginner-friendly guide to understanding how LLMs work.',
		author: 'Joseph Jazwinski',
		createdAt: new Date('2026-03-15T10:00:00Z'),
		updatedAt: new Date('2026-03-15T10:00:00Z'),
		published: true,
		tags: ['Education', 'LLM', 'AI'],
	},
];

export type ArchiveFile = {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	uploadedAt: string;
	uploadedBy: string;
	meeting: string;
	tags: string[];
	visibility: 'Public' | 'Members';
	pinned?: boolean;
};

export type ArchiveCategory = {
	id: string;
	name: string;
	description: string;
	files: ArchiveFile[];
};

export const fileCategories: ArchiveCategory[] = [
	{
		id: 'cat-1',
		name: 'Meeting Notes',
		description:
			'Agendas, action items, and recap documents from weekly meetings.',
		files: [
			{
				id: 'f1',
				name: 'Spring 2026 Kickoff Notes.pdf',
				type: 'pdf',
				size: 1024 * 500,
				url: '#',
				uploadedAt: '2026-02-05',
				uploadedBy: 'Rian Fernando',
				meeting: 'General Meeting - Week 1',
				tags: ['meeting', 'kickoff', 'planning'],
				visibility: 'Public',
				pinned: true,
			},
			{
				id: 'f2',
				name: 'E-Board Meeting 03-10.docx',
				type: 'docx',
				size: 1024 * 250,
				url: '#',
				uploadedAt: '2026-03-10',
				uploadedBy: 'Michael Riccio',
				meeting: 'E-Board Sync - March 10',
				tags: ['finance', 'operations', 'internal'],
				visibility: 'Members',
			},
			{
				id: 'f3',
				name: 'AI Debate Prep Questions.pdf',
				type: 'pdf',
				size: 1024 * 210,
				url: '#',
				uploadedAt: '2026-04-12',
				uploadedBy: 'Santiago Rodriguez',
				meeting: 'AI Debate Planning',
				tags: ['debate', 'discussion', 'event'],
				visibility: 'Public',
			},
		],
	},
	{
		id: 'cat-2',
		name: 'Workshop Slides',
		description: 'Decks and teaching assets shared in workshops.',
		files: [
			{
				id: 'f4',
				name: 'Intro to ML Slides.pptx',
				type: 'pptx',
				size: 1024 * 1024 * 2,
				url: '#',
				uploadedAt: '2026-02-20',
				uploadedBy: 'Joseph Jazwinski',
				meeting: 'Workshop - Intro to ML',
				tags: ['ml', 'slides', 'beginner'],
				visibility: 'Public',
				pinned: true,
			},
			{
				id: 'f5',
				name: 'Neural Networks 101.pdf',
				type: 'pdf',
				size: 1024 * 800,
				url: '#',
				uploadedAt: '2026-03-03',
				uploadedBy: 'Doryan Bendezu',
				meeting: 'Workshop - Neural Networks',
				tags: ['neural-networks', 'education', 'reference'],
				visibility: 'Public',
			},
			{
				id: 'f6',
				name: 'AlphaFold Workshop Lab Guide.docx',
				type: 'docx',
				size: 1024 * 560,
				url: '#',
				uploadedAt: '2026-04-15',
				uploadedBy: 'Santiago Rodriguez',
				meeting: 'Workshop - AlphaFold',
				tags: ['biology', 'alphafold', 'lab'],
				visibility: 'Public',
			},
		],
	},
	{
		id: 'cat-3',
		name: 'Hackathon Resources',
		description:
			'Starter kits, API references, and judging resources for competitions.',
		files: [
			{
				id: 'f7',
				name: 'API Key Guide.txt',
				type: 'txt',
				size: 1024 * 10,
				url: '#',
				uploadedAt: '2026-03-28',
				uploadedBy: 'Joseph Jazwinski',
				meeting: 'Hackathon Prep Session',
				tags: ['api', 'setup', 'security'],
				visibility: 'Members',
			},
			{
				id: 'f8',
				name: 'Starter Template.zip',
				type: 'zip',
				size: 1024 * 1024 * 5,
				url: '#',
				uploadedAt: '2026-03-30',
				uploadedBy: 'Rian Fernando',
				meeting: 'Hackathon Prep Session',
				tags: ['starter', 'template', 'nextjs'],
				visibility: 'Public',
				pinned: true,
			},
			{
				id: 'f9',
				name: 'Hackathon Judging Rubric.pdf',
				type: 'pdf',
				size: 1024 * 180,
				url: '#',
				uploadedAt: '2026-04-22',
				uploadedBy: 'Michael Riccio',
				meeting: 'AI Hackathon Logistics',
				tags: ['rubric', 'judging', 'event'],
				visibility: 'Public',
			},
		],
	},
	{
		id: 'cat-4',
		name: 'Media + Assets',
		description:
			'Design assets, announcements, and media shared for community updates.',
		files: [
			{
				id: 'f10',
				name: 'Spring Hackathon Poster.png',
				type: 'png',
				size: 1024 * 760,
				url: '#',
				uploadedAt: '2026-04-02',
				uploadedBy: 'Cindy',
				meeting: 'Creative Team Sync',
				tags: ['poster', 'design', 'hackathon'],
				visibility: 'Public',
			},
			{
				id: 'f11',
				name: 'Club Promo Reel Storyboard.pdf',
				type: 'pdf',
				size: 1024 * 420,
				url: '#',
				uploadedAt: '2026-03-21',
				uploadedBy: 'Cindy',
				meeting: 'Social Media Planning',
				tags: ['media', 'storyboard', 'social'],
				visibility: 'Members',
			},
			{
				id: 'f12',
				name: 'Brand Kit Logos.zip',
				type: 'zip',
				size: 1024 * 1024 * 3,
				url: '#',
				uploadedAt: '2026-03-18',
				uploadedBy: 'Santiago Rodriguez',
				meeting: 'Creative Team Sync',
				tags: ['brand', 'logos', 'assets'],
				visibility: 'Public',
			},
		],
	},
];
