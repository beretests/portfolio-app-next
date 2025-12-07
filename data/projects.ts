export type Project = {
  id: string;
  name: string;
  status: "Live" | "WIP" | "Not Started";
  gifUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  goals: string[];
  designDecisions: string[];
  techStack: string[];
  challenges: { title: string; solution: string }[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    id: "d128fb21-4477-4126-b47b-cfebacad9e94",
    name: "Church Choir Repertoire Management App",
    status: "Live",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    liveUrl: "https://ctk-songs.beretesting.com/",
    githubUrl: "https://github.com/beretests/choir-repertoire",
    overview:
      "Built a repertoire manager for a church choir so members can access songs, recordings, and notes on any device. Used it to practice Next.js App Router, TypeScript, and Supabase for real-time data.",
    goals: [
      "Centralize songs/recordings with easy access for choir members",
      "Streamline upload/distribution of recordings",
      "Practice modern Next.js (App Router) with TypeScript + Supabase",
    ],
    designDecisions: [
      "Responsive UI with Tailwind for quick iteration across devices",
      "Hierarchical navigation (year → month → date → songs → recordings)",
      "Built-in audio player for browser playback",
      "Supabase for storage and database to simplify real-time updates",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "React Audio Player", "SWR"],
    challenges: [
      {
        title: "Handling large sets of recordings",
        solution:
          "Optimized Supabase queries and paging, cached with SWR, and tuned audio loading to avoid blocking the UI.",
      },
      {
        title: "Keeping navigation state predictable",
        solution:
          "Modeled the hierarchy in the DB and UI to mirror each other; added guards and defaults to reduce 404s and dead-ends.",
      },
    ],
    learnings: [
      "App Router patterns for data fetching and caching with SWR",
      "Structuring hierarchical data for predictable navigation",
      "Tuning Supabase storage/DB for media-heavy workloads",
    ],
  },
  {
    id: "db8d898d-5c9a-435d-84f4-c049417e5f49",
    name: "LeetCode Daily Challenge Discord Bot",
    status: "Live",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    githubUrl:
      "https://github.com/beretests/Useful-python-scripts/blob/discord-leetcode-bot/discord-leetcode/discord-leetcode-db.py",
    overview:
      "After finishing my software engineering diploma, many developer roles required LeetCode-style assessments. To stay consistent—and encourage peers—I built a Discord bot that automatically posts a daily LeetCode challenge. It was also a chance to deepen Python skills and integrate external APIs and AWS services.",
    goals: [
      "Automate posting of daily LeetCode challenges to a Discord community",
      "Improve engagement and consistency in coding practice",
      "Learn Discord bot development and strengthen AWS/web scraping skills",
    ],
    designDecisions: [
      "Discord threads to keep each challenge and discussion organized",
      "DynamoDB to store posted/unposted questions and prevent duplicates",
      "LeetScrape API to retrieve LeetCode question content",
      "Message splitting to handle Discord’s 2,000-character limit",
      "Scheduled tasks to post challenges every 24 hours",
      "Environment variables to keep tokens and credentials secure",
    ],
    techStack: ["Python", "Discord.py", "AWS DynamoDB (Boto3)", "LeetScrape", "dotenv"],
    challenges: [
      {
        title: "Handling large question text within Discord limits",
        solution:
          "Implemented a splitter that breaks long descriptions into smaller messages without breaking formatting to stay under 2,000 characters.",
      },
      {
        title: "Preventing duplicate posts",
        solution:
          "Tracked posted/unposted questions in DynamoDB and always fetched the next unposted item before posting.",
      },
    ],
    learnings: [
      "Practical asynchronous programming in Python",
      "Building Discord bots that integrate AWS and external scraping APIs",
      "Formatting and delivering long content in chat environments",
      "Scheduling background tasks while maintaining data integrity across systems",
    ],
  },
  {
    id: "14b93b54-cecd-4f28-8a32-42036f9a95aa",
    status: "Live",
    name: "Funstats App",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    liveUrl: "https://funstats.online",
    githubUrl: "https://github.com/beretests/brainstation-capstone-funstats",
    overview:
      "Built a sports stats tracker so athletes can log and compare performance. Used it to deepen full-stack skills with React/Express, relational DB design, and Cloudinary for media.",
    goals: [
      "Create an intuitive interface for athletes to track/compare stats",
      "Practice full-stack development with React + Express + SQL",
      "Integrate third-party media storage (Cloudinary) for profile images",
    ],
    designDecisions: [
      "Component-based React UI with SASS for styling flexibility",
      "Express API with JWT auth for secure access",
      "Relational schema for users, stats, relationships; Knex.js for queries",
      "Cloudinary for efficient media storage and transformation",
    ],
    techStack: ["React", "SASS", "Express.js", "MySQL", "Knex.js", "Cloudinary", "JWT"],
    challenges: [
      {
        title: "Managing performance with growing data",
        solution:
          "Optimized queries, added indexes, and tuned API responses to keep comparisons fast even with larger datasets.",
      },
      {
        title: "Keeping authentication secure",
        solution:
          "Hardened JWT handling, tightened middleware, and improved error handling around auth flows.",
      },
    ],
    learnings: [
      "Relational modeling for comparison features and social elements",
      "JWT-based auth patterns in Express",
      "Cloudinary integration and secure media handling",
      "Debugging and performance tuning across React + Express + MySQL",
    ],
  },
  {
    id: "15c4b285-82be-4978-b434-fee1e4f5679f",
    name: "Funstats App - Refactored Project",
    status: "WIP",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    githubUrl: "https://github.com/beretests/funstats-next-app",
    overview: "Refactoring Funstats into a Next.js stack with improved DX.",
    goals: [
      "Migrate to Next.js for better DX and performance",
      "Refine data model and UI for comparisons",
      "Tighten authentication and API patterns",
    ],
    designDecisions: [
      "Next.js App Router for routing/data fetching",
      "TypeScript-first components for safer refactors",
      "API rework for clearer domain boundaries",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase"],
    challenges: [],
    learnings: [],
  },
  {
    id: "3a591773-aa65-4e87-9ed7-a9df5ff5aec0",
    name: "Funstats App Mobile",
    status: "Not Started",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    overview:
      "Mobile version of Funstats to track athlete performance with a modern React Native + Supabase stack.",
    goals: [
      "Deliver a mobile-first experience for athletes",
      "Support multi-sport stat tracking with real-time updates",
      "Strengthen mobile auth and offline-friendly patterns",
    ],
    designDecisions: [
      "React Navigation for mobile routing",
      "Flexible schema to accommodate multiple sports and stat types",
      "Zod/form validation for reliable input handling",
      "Tailwind-style utility classes for consistent styling",
      "Supabase real-time for live stat updates",
    ],
    techStack: ["React Native", "Node.js", "Supabase", "Zod"],
    challenges: [
      {
        title: "Real-time updates on mobile",
        solution:
          "Tuned Supabase subscriptions and minimized payloads to keep UI responsive on slower connections.",
      },
      {
        title: "Authentication state persistence",
        solution:
          "Improved token handling and rehydration so sessions survive app restarts.",
      },
    ],
    learnings: [
      "State management in complex React Native apps",
      "Supabase real-time usage on mobile",
      "Designing flexible schemas for multi-sport stats",
    ],
  },
];
