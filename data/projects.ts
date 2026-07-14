export type ProjectStatus = "Live" | "Completed" | "Professional case study";

export type ProjectCategory =
  | "Power Platform"
  | "Azure & Microsoft 365"
  | "Full-Stack Engineering";

export type Project = {
  id: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
  category: ProjectCategory;
  role: string;
  projectType: "Public project" | "Professional project";
  featured: boolean;
  imageUrl?: string;
  imagePosition?: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  articleUrl?: string;
  overview: string;
  outcomes: string[];
  goals: string[];
  designDecisions: string[];
  techStack: string[];
  challenges: { title: string; solution: string }[];
  learnings: string[];
  confidentialityNote?: string;
};

export const projects: Project[] = [
  {
    id: "power-platform-architect-agent",
    name: "Power Platform Architect Agent",
    shortName: "Architect Agent",
    status: "Completed",
    category: "Power Platform",
    role: "Solution architect and full-stack engineer",
    projectType: "Public project",
    featured: true,
    imageUrl:
      "https://raw.githubusercontent.com/beretests/Power-Platform-Solution-Architect-Agent/main/docs/screenshots/03-overview-readiness.png",
    imagePosition: "top",
    liveUrl:
      "https://player.vimeo.com/progressive_redirect/playback/1201434141/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=97130b8bab10b858ef2e9bde89f33b1d9905277bb1c10f259eda8aa1f24d2228",
    liveLabel: "Watch demo",
    githubUrl:
      "https://github.com/beretests/Power-Platform-Solution-Architect-Agent",
    overview:
      "Designed and built an AI-assisted architecture workspace that converts Power Platform requirements and existing designs into structured solution blueprints, review findings, readiness scores and implementation guidance.",
    outcomes: [
      "Produces consistent architecture outputs covering Dataverse, Power Automate, security, ALM and risk",
      "Makes grounding sources and AI limitations visible to reviewers",
      "Exports implementation-ready Markdown, JSON and Mermaid artifacts",
    ],
    goals: [
      "Accelerate early Power Platform architecture and design reviews",
      "Surface governance, security and production-readiness gaps before delivery",
      "Provide predictable, reviewable outputs instead of unstructured AI responses",
    ],
    designDecisions: [
      "Used Azure OpenAI structured output with Zod validation for predictable rendering",
      "Grounded responses with Foundry IQ and Azure AI Search, with curated local guidance as a fallback",
      "Separated architecture generation and Solution Review Board modes",
      "Included source transparency, responsible-AI notices and a clearly labelled demo mode",
    ],
    techStack: [
      "Power Platform",
      "Next.js",
      "TypeScript",
      "Azure OpenAI",
      "Foundry IQ",
      "Azure AI Search",
      "Zod",
      "Mermaid",
    ],
    challenges: [
      {
        title: "Reliable AI output",
        solution:
          "Defined strict architecture and review schemas, requested JSON-schema output and validated every response before rendering it.",
      },
      {
        title: "Trustworthy grounding",
        solution:
          "Added Foundry IQ retrieval, local knowledge fallback and visible grounding metadata so users can distinguish sourced guidance from demo data.",
      },
    ],
    learnings: [
      "Designing AI features around human review rather than automatic approval",
      "Combining retrieval grounding with structured outputs for enterprise use cases",
      "Translating Power Platform governance standards into reusable architecture checks",
    ],
  },
  {
    id: "m365-governance-platform",
    name: "Microsoft 365 Governance & Access Review Platform",
    shortName: "M365 Governance",
    status: "Professional case study",
    category: "Azure & Microsoft 365",
    role: "Platform engineer and solution designer",
    projectType: "Professional project",
    featured: true,
    overview:
      "Designed an administration platform that brings Teams and SharePoint inventory, governance indicators, reports and access reviews into one Teams-aware experience for administrators.",
    outcomes: [
      "Centralizes visibility into Teams and SharePoint ownership, membership and governance risks",
      "Supports owner-led access review decisions with auditable records",
      "Reduces the need for administrators to assemble governance information manually across tools",
    ],
    goals: [
      "Identify Teams and sites with low or missing ownership and membership",
      "Present interactive inventory, dashboards and reports in one application",
      "Support repeatable access reviews and remediation through Microsoft Graph",
    ],
    designDecisions: [
      "Used Teams SSO for a familiar, tenant-integrated administrator experience",
      "Separated interactive APIs from scheduled inventory collection",
      "Used managed identities for app-only Microsoft Graph and SharePoint access",
      "Prevented overlapping background runs to control cost and protect tenant services",
    ],
    techStack: [
      "Microsoft Teams",
      "SharePoint Online",
      "Microsoft Graph",
      "Azure Functions",
      "Azure Automation",
      "Managed Identity",
      "React",
      "Azure DevOps",
    ],
    challenges: [
      {
        title: "Cross-service inventory correlation",
        solution:
          "Resolved Graph composite site identifiers and correlated site activity, Microsoft 365 groups, owners and members into a consistent inventory model.",
      },
      {
        title: "Least-privilege automation",
        solution:
          "Separated runtime identities and documented the Graph and SharePoint permissions required by each workload.",
      },
    ],
    learnings: [
      "Designing tenant-wide inventory jobs for resilience and predictable cost",
      "Balancing governance coverage with app-only least-privilege access",
      "Making complex Microsoft 365 relationships understandable to administrators",
    ],
    confidentialityNote:
      "This case study is intentionally anonymized. Organization names, tenant identifiers, source code, screenshots and security-sensitive implementation details are not published.",
  },
  {
    id: "event-driven-key-vault-credential-rotation",
    name: "Event-Driven Azure Key Vault Credential Rotation",
    shortName: "Key Vault Rotation",
    status: "Professional case study",
    category: "Azure & Microsoft 365",
    role: "Azure solutions engineer",
    projectType: "Professional project",
    featured: true,
    articleUrl:
      "/blog/resilient-event-driven-key-vault-credential-rotation",
    overview:
      "Designed and implemented event-driven Azure Functions that rotate Microsoft Entra application secrets and synchronize new Key Vault certificate versions, with controlled credential overlap and timer-driven reconciliation for missed work.",
    outcomes: [
      "Automates credential rotation from Key Vault lifecycle events without embedding service credentials in the Function App",
      "Keeps previous credentials available during a configurable overlap window before safe retirement",
      "Adds locking, idempotency, audit state, reconciliation, dead-lettering, alerts and operational notifications",
    ],
    goals: [
      "Reduce expiry risk and recurring manual credential handoffs",
      "Process duplicate and retried Event Grid deliveries safely",
      "Recover from missed events and partial failures without creating hidden credential drift",
      "Deploy repeatably through Azure Pipelines with least-privilege managed identity access",
    ],
    designDecisions: [
      "Used Event Grid as the primary trigger and a six-hour timer as an independent reconciliation path",
      "Applied per-application locks and idempotency records in Table Storage",
      "Separated credential activation from retirement through delayed overlap cleanup",
      "Added a compensating Microsoft Graph removal when a newly created password cannot be written to Key Vault",
      "Kept Teams notifications best effort so notification failures do not invalidate successful rotation work",
    ],
    techStack: [
      "Azure Functions",
      "PowerShell",
      "Azure Key Vault",
      "Azure Event Grid",
      "Microsoft Graph",
      "Microsoft Entra ID",
      "Managed Identity",
      "Azure Table Storage",
      "Azure Pipelines",
      "Teams Workflows",
    ],
    challenges: [
      {
        title: "At-least-once event delivery",
        solution:
          "Combined a bounded idempotency window with expiring per-application locks so repeated and concurrent deliveries do not create duplicate credentials.",
      },
      {
        title: "Cross-service partial failure",
        solution:
          "Implemented compensating cleanup when Graph creates a password but the Key Vault write fails, and recorded explicit run states for operator follow-up.",
      },
      {
        title: "Missed rotation work",
        solution:
          "Built a capped timer-triggered reconciliation scan that detects expiring secrets, certificate drift and delayed cleanup, then routes the work through the same rotation handler.",
      },
      {
        title: "Safe credential retirement",
        solution:
          "Kept old passwords and certificates during a configurable grace period and removed them only after a valid replacement was active.",
      },
    ],
    learnings: [
      "Designing event-driven automation around duplicate and missed delivery",
      "Using compensation and explicit state to manage distributed partial failure",
      "Separating credential activation, adoption and retirement into safe operational stages",
      "Treating audit, alerting and reconciliation as core architecture rather than add-ons",
    ],
    confidentialityNote:
      "This case study is based on work maintained in a private Azure DevOps repository. Tenant, vault, application, pipeline and organization identifiers—as well as source code and security-sensitive configuration—are not published.",
  },
  {
    id: "dataverse-azure-secure-integration",
    name: "Secure Dataverse-to-Azure Integration",
    shortName: "Dataverse + Azure",
    status: "Professional case study",
    category: "Power Platform",
    role: "Power Platform engineer",
    projectType: "Professional project",
    featured: true,
    overview:
      "Implemented a secure integration pattern for synchronous Dataverse operations that need Azure-hosted secrets and services without embedding credentials in plugins or client applications.",
    outcomes: [
      "Establishes a reusable identity-based integration pattern for Dataverse extensions",
      "Keeps environment-specific values outside source code and solution components",
      "Supports governed deployment through Power Platform and Azure DevOps ALM pipelines",
    ],
    goals: [
      "Use managed identity instead of stored application credentials",
      "Return synchronous results through a Dataverse Custom API",
      "Move the solution safely across development, test and production environments",
    ],
    designDecisions: [
      "Registered a C# plug-in package as the Custom API message handler",
      "Used Azure Key Vault as the protected secret source",
      "Kept an Azure Function integration option for workloads better suited to an external service boundary",
      "Parameterised connection references and environment-specific configuration for deployment",
    ],
    techStack: [
      "Dataverse",
      "Power Platform Custom API",
      "C#",
      "Managed Identity",
      "Azure Key Vault",
      "Azure Functions",
      "Azure DevOps",
      "Power Platform ALM",
    ],
    challenges: [
      {
        title: "Production identity binding",
        solution:
          "Worked through assembly signing and certificate requirements so the plug-in package could use a production-appropriate managed identity binding.",
      },
      {
        title: "Environment portability",
        solution:
          "Separated deployable solution components from environment-specific values and documented the configuration required after import.",
      },
    ],
    learnings: [
      "Designing synchronous Dataverse integrations around platform execution constraints",
      "Applying managed identity and certificate requirements to Power Platform extensions",
      "Building ALM processes that account for both Dataverse and Azure resources",
    ],
    confidentialityNote:
      "This professional case study omits organization-specific endpoints, identities, certificates, environment names and source code.",
  },
  {
    id: "family-chore-hub",
    name: "Family Chore Hub",
    shortName: "Family Chore Hub",
    status: "Completed",
    category: "Full-Stack Engineering",
    role: "Product designer and full-stack engineer",
    projectType: "Public project",
    featured: true,
    githubUrl: "https://github.com/beretests/family-management-app",
    overview:
      "Built a private, mobile-first family management application for shared schedules, fair chore assignments, child-friendly task submissions, parent reviews, rewards and reminders.",
    outcomes: [
      "Delivers the complete MVP through authentication, schedules, chores, evidence review, points and rewards",
      "Protects family and child data with row-level security and private storage",
      "Runs on free-tier-friendly Supabase and Vercel services by default",
    ],
    goals: [
      "Give each family member an understandable view of the household schedule",
      "Distribute chores fairly while respecting age, preferences and workload",
      "Make the experience engaging for children and useful for parents",
    ],
    designDecisions: [
      "Used separate parent authentication and child profile-switching experiences",
      "Applied Supabase row-level security to family-scoped data",
      "Stored task evidence privately and added scheduled evidence cleanup",
      "Built iteratively with phase-specific branches, worktrees, tests and review gates",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase Auth",
      "PostgreSQL",
      "Row-Level Security",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
      "Vercel",
    ],
    challenges: [
      {
        title: "Safe child access",
        solution:
          "Designed Kid Mode around server-controlled profile switching rather than giving every child a separate external identity.",
      },
      {
        title: "Fair assignment rules",
        solution:
          "Represented household, age, workload and preference constraints explicitly so assignment behaviour remains understandable and testable.",
      },
    ],
    learnings: [
      "Turning family routines into clear product and data rules",
      "Using RLS and private storage as core design boundaries",
      "Keeping a multi-phase application approachable for future contributors",
    ],
  },
  {
    id: "funstats-sports-platform",
    name: "FunStats Sports Platform",
    shortName: "FunStats",
    status: "Live",
    category: "Full-Stack Engineering",
    role: "Full-stack software engineer",
    projectType: "Public project",
    featured: true,
    imageUrl:
      "https://raw.githubusercontent.com/beretests/funstats-next-complete/main/public/images/hero.jpg",
    imagePosition: "center",
    liveUrl: "https://funstats.online",
    liveLabel: "View live",
    githubUrl: "https://github.com/beretests/funstats-next-complete",
    overview:
      "Built and evolved a sports statistics platform where young athletes can record performance, manage seasons and teams, and compare progress with friends.",
    outcomes: [
      "Supports season-aware game, team, tournament, award and player-stat workflows",
      "Combines relational data modelling with a responsive, child-friendly interface",
      "Uses resilient authentication and deployment workflows for a production application",
    ],
    goals: [
      "Make detailed sports statistics approachable for young athletes",
      "Support meaningful comparisons across games, seasons and friends",
      "Build a maintainable full-stack application with secure authentication",
    ],
    designDecisions: [
      "Modelled seasons, teams, games, tournaments and awards as relational domains",
      "Used Supabase Auth session and refresh handling across the application boundary",
      "Separated UI state, API access and domain data to support continued refactoring",
      "Automated production deployment and process reloads through CI/CD",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "MUI",
      "Zustand",
      "Supabase Auth",
      "Knex.js",
      "PostgreSQL",
      "CI/CD",
    ],
    challenges: [
      {
        title: "Reliable authentication",
        solution:
          "Improved session refresh, API error handling and forced logout behaviour so expired credentials fail safely and predictably.",
      },
      {
        title: "Evolving a rich data model",
        solution:
          "Introduced clear relationships for seasons, teams, friends, tournaments and awards while preserving existing player-stat workflows.",
      },
    ],
    learnings: [
      "Evolving a capstone into a longer-lived product",
      "Designing relational models for sports and social features",
      "Diagnosing authentication and deployment issues across the full stack",
    ],
  },
  {
    id: "childcare-operations-platform",
    name: "Childcare Operations Administration Platform",
    shortName: "Childcare Operations",
    status: "Professional case study",
    category: "Full-Stack Engineering",
    role: "Backend and DevOps engineer",
    projectType: "Professional project",
    featured: false,
    overview:
      "Contributed backend services and delivery automation to a childcare marketplace administration platform covering providers, bookings, subscriptions, verification and payment operations.",
    outcomes: [
      "Added administrator workflows for users, reviews, bookings, subscriptions and provider verification",
      "Implemented a reliable one-time daily-pass payment path, including zero-dollar checkout handling",
      "Maintained automated deployment and process-management workflows for the hosted application",
    ],
    goals: [
      "Give administrators one place to manage marketplace operations",
      "Handle paid and fully discounted checkout paths reliably",
      "Keep deployment repeatable across frontend and backend services",
    ],
    designDecisions: [
      "Used Firebase Authentication with Express authorization boundaries",
      "Modelled verification records separately from provider summary flags",
      "Used Stripe webhooks as the source for final subscription state",
      "Automated VPS deployment and PM2 reloads through GitHub Actions",
    ],
    techStack: [
      "Express.js",
      "MySQL",
      "Firebase Auth",
      "Stripe",
      "GitHub Actions",
      "PM2",
      "REST APIs",
    ],
    challenges: [
      {
        title: "Zero-dollar checkout",
        solution:
          "Used a SetupIntent path when a one-time coupon reduced the charge to zero, while keeping webhook-driven subscription updates consistent.",
      },
      {
        title: "Verification consistency",
        solution:
          "Kept detailed criminal-record and child-abuse checks in dedicated tables and synchronized provider-level verification indicators.",
      },
    ],
    learnings: [
      "Designing payment flows for both charged and fully discounted outcomes",
      "Maintaining data consistency across webhooks and administrative actions",
      "Supporting product delivery across backend development and operations",
    ],
    confidentialityNote:
      "This case study describes my contribution at a high level and excludes client data, private source code and internal operational details.",
  },
  {
    id: "choir-repertoire",
    name: "Church Choir Repertoire Manager",
    shortName: "Choir Repertoire",
    status: "Live",
    category: "Full-Stack Engineering",
    role: "Full-stack software engineer",
    projectType: "Public project",
    featured: false,
    liveUrl: "https://ctk-songs.beretesting.com/",
    liveLabel: "View live",
    githubUrl: "https://github.com/beretests/choir-repertoire",
    overview:
      "Built a responsive repertoire manager so choir members can find scheduled songs, recordings and notes from any device.",
    outcomes: [
      "Centralizes repertoire and rehearsal recordings",
      "Organizes schedules through year, month, date and song relationships",
      "Supports convenient browser-based audio playback",
    ],
    goals: [
      "Replace scattered repertoire links and recordings with one searchable experience",
      "Make weekly preparation easier on mobile devices",
    ],
    designDecisions: [
      "Mirrored the choir schedule hierarchy in the database and navigation",
      "Used Supabase for relational data, authentication and media storage",
      "Built the interface with responsive Next.js and Material UI components",
    ],
    techStack: ["Next.js", "TypeScript", "Material UI", "Supabase", "PostgreSQL"],
    challenges: [
      {
        title: "Predictable schedule navigation",
        solution:
          "Aligned database relationships and route structure so members can move naturally from a service date to its songs and recordings.",
      },
    ],
    learnings: [
      "Designing hierarchical content around a real community workflow",
      "Managing media-backed content with Supabase",
    ],
  },
  {
    id: "leetcode-discord-bot",
    name: "LeetCode Daily Challenge Discord Bot",
    shortName: "Discord Challenge Bot",
    status: "Completed",
    category: "Full-Stack Engineering",
    role: "Python developer",
    projectType: "Public project",
    featured: false,
    githubUrl:
      "https://github.com/beretests/Useful-python-scripts/blob/discord-leetcode-bot/discord-leetcode/discord-leetcode-db.py",
    overview:
      "Created a Discord bot that posts a daily coding challenge, starts an organized discussion thread and prevents questions from being repeated.",
    outcomes: [
      "Automates daily challenge delivery for a peer-learning community",
      "Keeps challenge history and discussion organized",
      "Uses persistent state to prevent duplicate posts",
    ],
    goals: [
      "Encourage consistent interview-practice habits",
      "Build practical experience with asynchronous Python and AWS services",
    ],
    designDecisions: [
      "Used Discord threads to keep each challenge and its discussion together",
      "Stored question state in DynamoDB",
      "Split long problem descriptions safely around Discord message limits",
    ],
    techStack: ["Python", "Discord.py", "AWS DynamoDB", "Boto3", "LeetScrape"],
    challenges: [
      {
        title: "Discord message limits",
        solution:
          "Split long question descriptions into readable messages without losing their formatting or sequence.",
      },
    ],
    learnings: [
      "Asynchronous bot development",
      "Scheduling background work with persistent cloud state",
    ],
  },
];
