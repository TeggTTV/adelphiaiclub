// ─────────────────────────────────────────────────────────────────────────────
// E-Board Members
//
// HOW TO ADD A REAL PROFILE PHOTO:
//   1. Drop the photo in /public/images/eboard/ — recommended: JPG or WebP,
//      at least 800×1000px, portrait orientation (4:5 ratio works great).
//      Name it to match the current imageUrl path, e.g. "santiago-rodriguez.jpg"
//   2. Update imageUrl to the new filename:
//        imageUrl: '/images/eboard/santiago-rodriguez.jpg'
//   3. Set photoReady: true — this hides the "Photo Coming Soon" badge.
//
// Until a real photo is added, the SVG placeholder in /public/images/eboard/
// will be shown automatically (initials + gradient, unique color per person).
// ─────────────────────────────────────────────────────────────────────────────

export const eboardMembers = [
	{
		id: '1',
		name: 'Santiago Rodriguez',
		role: 'President',
		bio: 'Artificial Intelligence major passionate about exploring emerging technologies to spark new ideas, unlock creativity, and drive meaningful progress.',
		imageUrl: '/images/eboard/santiago-rodriguez.svg',
		instagram: 'https://instagram.com/_itssantiagox',
		handles: [
			{
        label: 'Instagram',
        handle: '@_itssantiagox',
        url: 'https://instagram.com/_itssantiagox',
      },
      {
				label: 'Portfolio',
				url: 'https://iamsantiago.com',
			},
      {
        label: 'GitHub',
        url: '',
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
		instagram: 'https://instagram.com/doctordbd',
		handles: [
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
		instagram: 'https://instagram.com/teggundrut',
		handles: [
			{
				label: 'Portfolio',
				url: 'https://joeyjazwinski.com',
			},
			{
				label: 'GitHub',
				url: 'https://github.com/TeggTTV',
			},
      {
        label: 'Instagram',
        handle: '@teggundrut',
        url: 'https://instagram.com/teggundrut',
      }
		],
		order: 3,
	},
	{
		id: '4',
		name: 'Michael Riccio',
		role: 'Treasurer',
		bio: 'Accounting major managing club finances and budgeting. Exploring the intersection of AI and financial technology.',
		imageUrl: '/images/eboard/michael-riccio.svg',
		instagram: 'https://instagram.com/mikecankindacook',
		handles: [
			{
				label: 'Instagram',
				handle: '@mikecankindacook',
				url: 'https://instagram.com/mikecankindacook',
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
		instagram: 'https://instagram.com/rian._.f',
		handles: [
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
		name: 'Cindy',
		role: 'Social Media/Creative Director',
		bio: 'Leads our creative and social media efforts, bringing fresh ideas and vibrant energy to the club.',
		imageUrl: '/images/eboard/cindy.svg',
		instagram: '',
		handles: [
			{
				label: 'Instagram',
				handle: '@att.cindy',
				url: 'https://instagram.com/att.cindy',
			},
		],
		order: 6,
	},
];

export const upcomingEvents = [
  {
    id: "1",
    title: "AI Debate",
    description: "Put a controversial or interesting topic on the board and start the conversation. Others will jump in. Light snacks like cookies and water. Week of April 13th-17th, replaces regular meeting that week.",
    date: new Date("2026-04-15T13:30:00"),
    time: "1:30pm - 2:30pm",
    type: "Event",
    location: "TBD",
    link: "#",
    imageUrl: null,
  },
  {
    id: "2",
    title: "AlphaFold Workshop",
    description: "Hands-on workshop exploring AlphaFold and its impact on protein structure prediction. Open to all skill levels.",
    date: new Date("2026-04-15T18:00:00"),
    time: "6:00pm",
    type: "Workshop",
    location: "UC 213/214",
    link: "#",
    imageUrl: null,
  },
  {
    id: "3",
    title: "AI Hackathon",
    description: "First AI coding hackathon. Use an AI-powered IDE, multiple winners, food (pizza), and prizes (Amazon gift card, AI subscription). Bring your own device or borrow a Chromebook. Topic revealed at the start.",
    date: new Date("2026-04-29T17:45:00"),
    time: "5:45pm - 6:30pm",
    type: "Competition",
    location: "UC or Innovation Center",
    link: "#",
    imageUrl: null,
  },
];

export type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  tags: string[]
  creators: string[]
  status: "Planning" | "Research" | "In Progress" | "Launched"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  featured: boolean
  githubUrl: string
  liveUrl: string
  imageUrl: string | null
  lastUpdated: string
  semester: string
  impact: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Adelphi Course Recommender",
    description: "An AI-powered planner that suggests classes from degree requirements, professor trends, and student interests.",
    techStack: ["Python", "TensorFlow", "Next.js", "MongoDB"],
    tags: ["Recommendation", "Academic Success", "NLP"],
    creators: ["Santiago Rodriguez", "Joseph Jazwinski"],
    status: "In Progress",
    difficulty: "Advanced",
    featured: true,
    githubUrl: "https://github.com/adelphiaisociety",
    liveUrl: "#",
    imageUrl: null,
    lastUpdated: "2026-03-18",
    semester: "Spring 2026",
    impact: "Helps students discover better-fitting course schedules in under 30 seconds.",
  },
  {
    id: "2",
    title: "Campus Navigation Bot",
    description: "A conversational guide that helps new students find classrooms, offices, and event spaces on campus.",
    techStack: ["Node.js", "OpenAI API", "React", "Supabase"],
    tags: ["Chatbot", "Student Experience", "Wayfinding"],
    creators: ["Rian Fernando", "Cindy"],
    status: "Launched",
    difficulty: "Intermediate",
    featured: true,
    githubUrl: "https://github.com/adelphiaisociety",
    liveUrl: "#",
    imageUrl: null,
    lastUpdated: "2026-02-26",
    semester: "Spring 2026",
    impact: "Reduced first-week navigation questions at tabling events by an estimated 40%.",
  },
  {
    id: "3",
    title: "AI Study Buddy",
    description: "Creates practice questions and adaptive study plans from uploaded class notes and slides.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    tags: ["Education", "Productivity", "Generative AI"],
    creators: ["Doryan Bendezu", "Joseph Jazwinski"],
    status: "In Progress",
    difficulty: "Intermediate",
    featured: true,
    githubUrl: "https://github.com/adelphiaisociety",
    liveUrl: "#",
    imageUrl: null,
    lastUpdated: "2026-03-22",
    semester: "Spring 2026",
    impact: "Turns static notes into active recall practice in minutes.",
  },
  {
    id: "4",
    title: "Hackathon Teammate Matcher",
    description: "Matches participants based on skills, interests, and project goals to form balanced teams quickly.",
    techStack: ["React", "Firebase", "Cloud Functions"],
    tags: ["Community", "Matching", "Hackathon"],
    creators: ["Michael Riccio", "Santiago Rodriguez"],
    status: "Research",
    difficulty: "Beginner",
    featured: false,
    githubUrl: "https://github.com/adelphiaisociety",
    liveUrl: "#",
    imageUrl: null,
    lastUpdated: "2026-03-10",
    semester: "Spring 2026",
    impact: "Aims to reduce team-forming friction before club hack nights.",
  },
  {
    id: "5",
    title: "Resume Bullet Optimizer",
    description: "Improves resume project bullet points using role-specific language and measurable outcomes.",
    techStack: ["Next.js", "OpenAI API", "Tailwind CSS"],
    tags: ["Career", "LLM", "Professional Development"],
    creators: ["Cindy", "Rian Fernando"],
    status: "Planning",
    difficulty: "Beginner",
    featured: false,
    githubUrl: "https://github.com/adelphiaisociety",
    liveUrl: "#",
    imageUrl: null,
    lastUpdated: "2026-03-25",
    semester: "Fall 2026",
    impact: "Will help members prepare stronger internship applications.",
  },
  {
    id: "6",
    title: "AI Event Insights Dashboard",
    description: "Analyzes attendance patterns and feedback from events to optimize future workshop planning.",
    techStack: ["TypeScript", "Chart.js", "Prisma", "PostgreSQL"],
    tags: ["Analytics", "Dashboard", "Operations"],
    creators: ["Michael Riccio", "Doryan Bendezu"],
    status: "Launched",
    difficulty: "Advanced",
    featured: true,
    githubUrl: "https://github.com/adelphiaisociety",
    liveUrl: "#",
    imageUrl: null,
    lastUpdated: "2026-03-04",
    semester: "Spring 2026",
    impact: "Provides measurable signals for improving turnout and member engagement.",
  },
]

export const blogPosts = [
  {
    id: "1",
    title: "Welcome to the AI Society",
    slug: "welcome-to-adelphi-ai-society",
    content: "We are thrilled to announce the launch of the AI Society! Our mission is to foster a community of students passionate about artificial intelligence, machine learning, and data science. Stay tuned for upcoming events, workshops, and projects.",
    excerpt: "We are thrilled to announce the launch of the AI Society!",
    author: "Santiago Rodriguez",
    createdAt: new Date("2026-03-01T12:00:00Z"),
    updatedAt: new Date("2026-03-01T12:00:00Z"),
    published: true,
    tags: ["Announcement", "Welcome"],
  },
  {
    id: "2",
    title: "Understanding Large Language Models",
    slug: "understanding-large-language-models",
    content: "Large Language Models (LLMs) have taken the world by storm. In this post, we break down how they work, their architecture, and why they are so powerful. From transformers to attention mechanisms, we cover the basics you need to know.",
    excerpt: "A beginner-friendly guide to understanding how LLMs work.",
    author: "Joseph Jazwinski",
    createdAt: new Date("2026-03-15T10:00:00Z"),
    updatedAt: new Date("2026-03-15T10:00:00Z"),
    published: true,
    tags: ["Education", "LLM", "AI"],
  },
];

export type ArchiveFile = {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: string
  uploadedBy: string
  meeting: string
  tags: string[]
  visibility: "Public" | "Members"
  pinned?: boolean
}

export type ArchiveCategory = {
  id: string
  name: string
  description: string
  files: ArchiveFile[]
}

export const fileCategories: ArchiveCategory[] = [
  {
    id: "cat-1",
    name: "Meeting Notes",
    description: "Agendas, action items, and recap documents from weekly meetings.",
    files: [
      {
        id: "f1",
        name: "Spring 2026 Kickoff Notes.pdf",
        type: "pdf",
        size: 1024 * 500,
        url: "#",
        uploadedAt: "2026-02-05",
        uploadedBy: "Rian Fernando",
        meeting: "General Meeting - Week 1",
        tags: ["meeting", "kickoff", "planning"],
        visibility: "Public",
        pinned: true,
      },
      {
        id: "f2",
        name: "E-Board Meeting 03-10.docx",
        type: "docx",
        size: 1024 * 250,
        url: "#",
        uploadedAt: "2026-03-10",
        uploadedBy: "Michael Riccio",
        meeting: "E-Board Sync - March 10",
        tags: ["finance", "operations", "internal"],
        visibility: "Members",
      },
      {
        id: "f3",
        name: "AI Debate Prep Questions.pdf",
        type: "pdf",
        size: 1024 * 210,
        url: "#",
        uploadedAt: "2026-04-12",
        uploadedBy: "Santiago Rodriguez",
        meeting: "AI Debate Planning",
        tags: ["debate", "discussion", "event"],
        visibility: "Public",
      },
    ],
  },
  {
    id: "cat-2",
    name: "Workshop Slides",
    description: "Decks and teaching assets shared in workshops.",
    files: [
      {
        id: "f4",
        name: "Intro to ML Slides.pptx",
        type: "pptx",
        size: 1024 * 1024 * 2,
        url: "#",
        uploadedAt: "2026-02-20",
        uploadedBy: "Joseph Jazwinski",
        meeting: "Workshop - Intro to ML",
        tags: ["ml", "slides", "beginner"],
        visibility: "Public",
        pinned: true,
      },
      {
        id: "f5",
        name: "Neural Networks 101.pdf",
        type: "pdf",
        size: 1024 * 800,
        url: "#",
        uploadedAt: "2026-03-03",
        uploadedBy: "Doryan Bendezu",
        meeting: "Workshop - Neural Networks",
        tags: ["neural-networks", "education", "reference"],
        visibility: "Public",
      },
      {
        id: "f6",
        name: "AlphaFold Workshop Lab Guide.docx",
        type: "docx",
        size: 1024 * 560,
        url: "#",
        uploadedAt: "2026-04-15",
        uploadedBy: "Santiago Rodriguez",
        meeting: "Workshop - AlphaFold",
        tags: ["biology", "alphafold", "lab"],
        visibility: "Public",
      },
    ],
  },
  {
    id: "cat-3",
    name: "Hackathon Resources",
    description: "Starter kits, API references, and judging resources for competitions.",
    files: [
      {
        id: "f7",
        name: "API Key Guide.txt",
        type: "txt",
        size: 1024 * 10,
        url: "#",
        uploadedAt: "2026-03-28",
        uploadedBy: "Joseph Jazwinski",
        meeting: "Hackathon Prep Session",
        tags: ["api", "setup", "security"],
        visibility: "Members",
      },
      {
        id: "f8",
        name: "Starter Template.zip",
        type: "zip",
        size: 1024 * 1024 * 5,
        url: "#",
        uploadedAt: "2026-03-30",
        uploadedBy: "Rian Fernando",
        meeting: "Hackathon Prep Session",
        tags: ["starter", "template", "nextjs"],
        visibility: "Public",
        pinned: true,
      },
      {
        id: "f9",
        name: "Hackathon Judging Rubric.pdf",
        type: "pdf",
        size: 1024 * 180,
        url: "#",
        uploadedAt: "2026-04-22",
        uploadedBy: "Michael Riccio",
        meeting: "AI Hackathon Logistics",
        tags: ["rubric", "judging", "event"],
        visibility: "Public",
      },
    ],
  },
  {
    id: "cat-4",
    name: "Media + Assets",
    description: "Design assets, announcements, and media shared for community updates.",
    files: [
      {
        id: "f10",
        name: "Spring Hackathon Poster.png",
        type: "png",
        size: 1024 * 760,
        url: "#",
        uploadedAt: "2026-04-02",
        uploadedBy: "Cindy",
        meeting: "Creative Team Sync",
        tags: ["poster", "design", "hackathon"],
        visibility: "Public",
      },
      {
        id: "f11",
        name: "Club Promo Reel Storyboard.pdf",
        type: "pdf",
        size: 1024 * 420,
        url: "#",
        uploadedAt: "2026-03-21",
        uploadedBy: "Cindy",
        meeting: "Social Media Planning",
        tags: ["media", "storyboard", "social"],
        visibility: "Members",
      },
      {
        id: "f12",
        name: "Brand Kit Logos.zip",
        type: "zip",
        size: 1024 * 1024 * 3,
        url: "#",
        uploadedAt: "2026-03-18",
        uploadedBy: "Santiago Rodriguez",
        meeting: "Creative Team Sync",
        tags: ["brand", "logos", "assets"],
        visibility: "Public",
      },
    ],
  },
]
