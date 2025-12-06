export type Post = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  date: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "cutting-edge-tools",
    tag: "Engineering",
    title: "Revolutionizing software development with cutting-edge tools",
    description:
      "Workflow automation, dependable testing, and observability are converging. Here’s how I’m approaching the next wave of shipping faster without breaking things.",
    image: "https://picsum.photos/800/450?random=1",
    date: "July 14, 2024",
    body: `
Shipping fast and safely is no longer about a single tool. It’s about a pipeline where testing, feature flags, and observability work together.

In this post I break down how I pair smoke tests with contract tests, wire feature flags into rollout plans, and use tracing to validate the work in production.`,
  },
  {
    slug: "shipping-lean",
    tag: "Product",
    title: "Shipping lean: feature flags, feedback loops, and fast rollbacks",
    description:
      "Lessons learned from iterative delivery and how to de-risk bold changes with flags, metrics, and rollback plans.",
    image: "https://picsum.photos/800/450?random=2",
    date: "June 02, 2024",
    body: `
Lean shipping hinges on feedback loops. Feature flags let you decouple deploy from release.

I cover the rollback checklist I use, the metrics that matter, and how to keep stakeholders aligned when you ship in small slices.`,
  },
  {
    slug: "resilient-accessible-design",
    tag: "Design",
    title: "Designing for resilience and accessibility",
    description:
      "High contrast, calm animation, and predictable states make interfaces usable for everyone. A practical checklist.",
    image: "https://picsum.photos/800/450?random=3",
    date: "May 18, 2024",
    body: `
Accessibility and resilience are linked—predictable states reduce cognitive load and support screen readers.

Here’s a short checklist I use to validate contrast, motion, and focus handling before shipping UI work.`,
  },
  {
    slug: "performance-testing-in-ci",
    tag: "Engineering",
    title: "Performance testing in CI without slowing teams down",
    description:
      "Using k6 and sensible budgets to catch regressions early—without blocking every merge request.",
    image: "https://picsum.photos/800/450?random=4",
    date: "April 30, 2024",
    body: `
Performance tests don’t have to be heavy. Start with budget checks on core flows and run heavier suites nightly.

This post walks through k6 scripting, thresholds, and how to surface results where developers already look.`,
  },
  {
    slug: "cloud-guardrails",
    tag: "Cloud",
    title: "Cloud-native guardrails that keep velocity high",
    description:
      "From IaC linting to runtime policies, here are the guardrails that let teams ship safely in distributed systems.",
    image: "https://picsum.photos/800/450?random=5",
    date: "April 10, 2024",
    body: `
Guardrails beat gates. IaC linting, policy-as-code, and good defaults let teams move quickly without surprises.

I share a starter set of policies and how to roll them out incrementally.`,
  },
  {
    slug: "mentoring-junior-engineers",
    tag: "Career",
    title: "What I learned mentoring junior engineers",
    description:
      "Practical ways to build confidence, code quality, and ownership as a mentor while keeping projects moving.",
    image: "https://picsum.photos/800/450?random=6",
    date: "March 22, 2024",
    body: `
Mentorship is a multiplier. Pairing, small wins, and clear checklists keep momentum high.

Here’s how I structure mentorship plans without derailing delivery timelines.`,
  },
];

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);
