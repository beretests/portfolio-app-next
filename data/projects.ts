export const projects = [
  {
    id: "d128fb21-4477-4126-b47b-cfebacad9e94",
    name: "Church Choir Repertoire Management App",
    status: "Live",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    liveUrl: "https://ctk-songs.beretesting.com/",
    githubUrl: "https://github.com/beretests/choir-repertoire",
    background:
      "I started with intermediate knowledge of React and Next.js and basic understanding of TypeScript and Tailwind CSS. I was also familiar with responsive web design principles and had xperience with RESTful API design and implementation as well as basic knowledge of database design and management",
    objectives: [
      "To create a centralized, easily accessible platform for choir members to access their repertoire",
      "To streamline the process of managing and distributing song recordings",
      "To learn and implement the latest Next.js features, particularly the App Router",
      "To gain hands-on experience with TypeScript in a full-stack application",
      "To explore Supabase as a backend solution for real-time data management",
    ],
    assumptions: [
      "Choir members would primarily access the app on various devices, including mobile phones",
      "The repertoire would be organized hierarchically by year, month, and date",
      "Users would need to play audio directly in the browser and download recordings",
      "The app would need to handle a potentially large number of songs and recordings",
    ],
    designChoices: [
      "Implemented a responsive design using Tailwind CSS for consistent styling across devices",
      "Used Next.js App Router for improved routing and server-side rendering capabilities",
      "Designed a hierarchical navigation structure (year > month > date > songs > recordings)",
      "Integrated an audio player component for in-browser playback of recordings",
      "",
    ],
    techStack: [
      "Next.js: Chosen for its powerful features like App Router and server-side rendering",
      "TypeScript: For enhanced type safety and improved developer experience",
      "Tailwind CSS: For rapid UI development and responsive design",
      "Supabase: As a backend-as-a-service for real-time database and file storage solutions",
      "React Audio Player: For seamless audio playback integration",
      "SWR (Stale-While-Revalidate): For efficient data fetching and caching",
    ],
    // techStackReasoning: "I chose this tech stack because...",
    challenges: [
      {
        title: "Challenge 1",
        solution:
          "Resolved issues with audio playback on different browsers and devices Fixed performance bottlenecks when loading large sets of recordings Addressed challenges with maintaining state across the hierarchical navigation",
      },
      {
        title: "Challenge 2",
        solution:
          "Improved error handling for network requests and data fetching Resolved TypeScript type issues, particularly with Supabase integration",
      },
    ],
    learnings: [
      "Gained deep insights into Next.js App Router and its advantages over traditional routing",
      "Improved understanding of TypeScript's advanced features in a full-stack context",
      "Enhanced skills in creating responsive and accessible designs using Tailwind CSS",
      "Learned effective strategies for integrating and managing audio content in web applications",
      "Developed better practices for structuring and querying hierarchical data",
      "Improved ability to work with real-time databases and file storage using Supabase",
      "Enhanced understanding of state management in complex, multi-level navigation structures",
      "Gained experience in optimizing performance for applications with large datasets",
      "Learned techniques for implementing and customizing audio playback features in web apps",
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
    background:
      "I had just completed my diploma in software engineering from a bootcamp, and was applying for jobs as a software developer. It became immediately apparent that most  dev jobs required applicants to complete coding challenges and these coding challenges were similar if not the same as Leetcode challenges. I found those questions difficult to complete on my own so I decided to make solving them more interactive sending a Leetcode question a day to a thread in the Discord channel I shared with other graduates in my cohort. I had basic knowledge of Python and none of discord bot development.I was familiar with AWS DynamoDB (for data storage) and understood basic web scraping techniques.",
    objectives: [
      "To create an automated system for sharing daily LeetCode challenges in a Discord community",
      "To enhance coding practice and engagement among Discord server members",
      "To learn more about integrating various technologies like Discord API, AWS services, and web scraping",
      "To automate the process of curating and sharing coding challenges, saving time for community managers",
    ],
    assumptions: [
      "Discord users would be interested in daily coding challenges",
      "A 24-hour interval between challenges would be suitable for most users",
      "Users would prefer challenges to be posted in threaded discussions for better organization",
    ],
    designChoices: [
      "Discord's thread feature to organize challenges and discussions",
      "Implemented a DynamoDB table to track posted and unposted questions",
      "Web scraping to extract question details from LeetCode with LeetScrape API",
      "Developed a message splitting function to handle long challenge descriptions given Discord's 2000 character limit",
      "Implemented a scheduled task to post challenges at regular intervals",
      "Used environment variables for sensitive information like API tokens",
    ],
    techStack: [
      "Python: Chosen for its simplicity and rich ecosystem of libraries",
      "Discord.py: For easy integration with Discord's API",
      "Boto3: To interact with AWS services, specifically DynamoDB",
      "LeetScrape: A custom module for scraping LeetCode questions",
      "AWS DynamoDB: For efficient and scalable storage of question data",
      "dotenv: For managing environment variables securely",
    ],
    // techStackReasoning: "I chose this tech stack because...",
    challenges: [
      {
        title: "Challenge 1",
        solution: "I solved this by...",
      },
      {
        title: "Challenge 2",
        solution: "I addressed this issue by...",
      },
    ],
    learnings: [
      "Gained deeper understanding of asynchronous programming in Python",
      "Improved skills in integrating multiple services (Discord, AWS, web scraping)",
      "Learned techniques for handling and formatting large text content for Discord chat messages",
      "Enhanced understanding of scheduled tasks and background processes in bots",
      "Developed strategies for maintaining data consistency between external sources and local database",
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
    background:
      "I started with Basic knowledge of React and Express.js. Familiarity with relational databases and SQL. Understanding of RESTful API design principles. Experience with user authentication and authorization in web applications. Basic knowledge of cloud storage solutions like Cloudinary.",
    objectives: [
      "To create a user-friendly platform for athletes to track and compare their performance stats.",
      "To deepen my understanding of full-stack web development using React and Express.",
      "To explore integration of third-party services like Cloudinary for file storage.",
      "To challenge myself in creating a feature-rich application with social elements.",
      "To learn about comparison features in web applications.",
    ],
    assumptions: [
      "Users would primarily access the app through web browsers",
      "Athletes would want to track and compare stats across different seasons",
      "Social features like adding friends and comparing stats would increase user engagement",
      "Secure storage and handling of user data, including profile pictures, would be crucial",
    ],
    designChoices: [
      "Implemented a component-based architecture in React for better code organization",
      "Used SASS for styling to leverage advanced CSS features and maintain cleaner stylesheets",
      "Designed RESTful API endpoints in Express for seamless communication between frontend and backend",
      "Utilized Knex.js as a query builder for more flexible and maintainable database operations",
      "Implemented JWT for secure user authentication and session management",
      "Used Cloudinary for efficient storage, retrieval and transformation of user profile pictures",
      "Designed a relational database schema to effectively store user profiles, stats, and relationships",
    ],
    techStack: [
      "React: Chosen for its component-based architecture and large ecosystem",
      "SASS: For enhanced CSS features and better stylesheet organization",
      "Express.js: As a minimal and flexible Node.js web application framework",
      "MySQL: For a robust and scalable relational database solution",
      "Knex.js: As a SQL query builder for easier database interactions and migrations",
      "Cloudinary: For efficient cloud-based image storage and manipulation",
      "JSON Web Tokens (JWT): For secure authentication and authorization",
    ],
    // techStackReasoning: "I chose this tech stack because...",
    challenges: [
      {
        title: "Challenge 1",
        solution:
          "Resolved issues with state management in React, particularly with updating friend lists. Fixed performance bottlenecks when fetching and comparing large sets of stats. Addressed security vulnerabilities in the authentication process. Corrected inconsistencies in stat calculations and comparisons. Improved error handling for failed Cloudinary uploads and database operations.",
      },
      {
        title: "Challenge 2",
        solution: "I addressed this issue by...",
      },
    ],
    learnings: [
      "Enhanced understanding of full-stack application architecture and data flow",
      "Gained experience in implementing social features and data comparison functionalities",
      "Developed better practices for secure user authentication and data protection",
      "Learned effective strategies for integrating third-party services like Cloudinary",
      "Gained deeper understanding of React's state management and component lifecycle",
      "Improved skills in designing and implementing RESTful APIs with Express",
      "Enhanced knowledge of relational database design and optimization with MySQL",
      "Improved ability to create responsive and intuitive user interfaces using SASS",
      "Improved skills in debugging and troubleshooting across the full stack",
    ],
  },
  {
    id: "15c4b285-82be-4978-b434-fee1e4f5679f",
    name: "Funstats App - Refactored Project",
    status: "WIP",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    // liveUrl: "https://example.com/project1",
    githubUrl: "https://github.com/beretests/funstats-next-app",
    background: "I started with...",
    objectives: ["The goal of this project was to..."],
    assumptions: ["Assumption 1", "Assumption 2"],
    designChoices: ["I chose to..."],
    techStack: ["React", "Node.js", "MongoDB"],
    // techStackReasoning: "I chose this tech stack because...",
    challenges: [
      {
        title: "Challenge 1",
        solution: "I solved this by...",
      },
      {
        title: "Challenge 2",
        solution: "I addressed this issue by...",
      },
    ],
    learnings: ["Learning 1", "Learning 2"],
  },
  {
    id: "3a591773-aa65-4e87-9ed7-a9df5ff5aec0",
    name: "Funstats App Mobile",
    status: "Not Started",
    gifUrl:
      "https://res.cloudinary.com/dsspeyssh/image/upload/t_Thumbnail/v1731782768/portfolio-logo-darkblue_tp7pao.png",
    // liveUrl: "https://funstats.online",
    // githubUrl: "https://github.com/beretests/brainstation-capstone-funstats",
    background:
      "asic knowledge of React Native and TypeScript amiliarity with Supabase as a backend service Understanding of authentication flows and user management Experience with form handling and data validation in React applications",
    objectives: [
      "To create a comprehensive solution for athletes to track their performance across seasons and games",
      "To learn and implement modern mobile app development practices using React Native",
      "To explore real-time database capabilities and authentication services provided by Supabase",
      "To challenge myself in creating a complex, multi-feature application with a focus on user experience.",
    ],
    assumptions: [
      "Users would primarily access the app on mobile devices",
      "Athletes would want to track stats across multiple seasons and games",
      "The app would need to support multiple sports with varying stat types",
      "Real-time updates and offline capabilities would be crucial for user engagement",
      "User authentication and data privacy would be essential features",
    ],
    designChoices: [
      "I chose to Implemented a component-based architecture for better code organization and reusability",
      "Used React Navigation for seamless routing and navigation within the app",
      "Designed a flexible database schema to accommodate various sports and stat types",
      "Implemented form validation using Zod for type-safe schema validation",
      "Created a responsive UI using Tailwind CSS for consistent styling across devices",
      "Utilized Supabase's real-time capabilities for live updates of stats and user data",
    ],
    techStack: ["React Native", "Node.js", "Supabase"],
    techStackReasoning:
      "Chosen for cross-platform development and large community support TypeScript: For enhanced type safety and improved developer experience Tailwind CSS: For rapid UI development and consistent styling Supabase: As a backend-as-a-service for real-time database, authentication, and storage solutions Expo: To simplify the development and deployment process for React Native React Hook Form: For efficient form handling and validation Zod: For runtime type checking and schema validation",
    challenges: [
      {
        title: "Challenge 1",
        solution:
          "Resolved issues with real-time updates not reflecting immediately on the UI Fixed authentication state persistence problems across app restarts Addressed performance issues when loading large datasets of user stats Corrected inconsistencies in stat calculations across different sports",
      },
      {
        title: "Challenge 2",
        solution: "I addressed this issue by...",
      },
    ],
    learnings: [
      "Gained deep insights into state management in complex React Native applications",
      "Improved understanding of TypeScript's advanced features for type-safe development",
      "Learned to implement and manage real-time database connections using Supabase",
      "Enhanced skills in creating responsive and accessible mobile UIs",
      "Developed strategies for handling offline data synchronization and conflict resolution",
      "Improved ability to design and implement complex data models for multi-sport applications",
      "Gained experience in implementing social features like friend connections within an app",
    ],
  },
];
