# Eberechi Omeje — Engineering Portfolio

Portfolio website for Eberechi Omeje, presenting selected work across Power
Platform engineering, Microsoft Azure solutions architecture and full-stack
software engineering.

## Portfolio structure

- **Home**: professional positioning and the three connected engineering focus
  areas.
- **Projects**: featured case studies plus smaller supporting projects.
- **Project case studies**: problem, role, outcomes, architecture decisions,
  challenges and learnings.
- **Resume**: experience, education, skills and certifications.
- **About**: professional background and personal interests.
- **Blog**: longer-form technical writing.

Professional case studies are deliberately anonymized. Organization names,
tenant identifiers, private code, internal screenshots and security-sensitive
configuration are not published.

## Tech stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS and Material UI
- Supabase for blog, resume and administrator-backed content
- Cloudflare Pages deployment tooling

Project case-study content is versioned in `data/projects.ts`. This keeps public
portfolio claims reviewable through Git history and prevents runtime content
from silently overriding the approved case-study copy.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Some Supabase-backed features require the environment values used by the
deployed site. The homepage and project case studies use source-controlled data
and can be reviewed without Supabase credentials.

## Validation

Generate Next.js route types and run TypeScript checks:

```bash
npm run typecheck
```

Create a production build:

```bash
npm run build
```

## Deployment

The repository contains Cloudflare Pages tooling:

```bash
npm run pages:build
npm run preview
npm run deploy
```

Deployment environment variables and credentials must be configured in the
hosting platform. Never commit `.env` files, Supabase keys or administrator
credentials.

## Updating project content

1. Add or update a project in `data/projects.ts`.
2. Use only supportable claims and measurements.
3. Anonymize professional projects before committing.
4. Add public source or demo links only when they are safe to share.
5. Run `npm run typecheck` and `npm run build`.
6. Submit the change through a pull request.
