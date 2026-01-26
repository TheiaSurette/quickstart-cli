export const generateAgentsMd = (params) => {
    const { config, features } = params;
    const packages = [];
    if (features.ui)
        packages.push('ui/ (React + Vite)');
    if (features.api)
        packages.push('api/ (FastAPI + Python)');
    if (features.db)
        packages.push('db/ (PostgreSQL + SQLAlchemy)');
    const packageList = packages.map(p => `│   ├── ${p}`).join('\n');
    const validationCommands = [];
    validationCommands.push('make lint           # Run all linters');
    validationCommands.push('make test           # Run all tests');
    validationCommands.push('pnpm type-check     # TypeScript type checking');
    if (features.api) {
        validationCommands.push('make lint:api       # Python linting (ruff + mypy)');
        validationCommands.push('make test:api       # Python tests (pytest)');
    }
    if (features.ui) {
        validationCommands.push('make lint:ui        # TypeScript/React linting');
        validationCommands.push('make test:ui        # React tests (Vitest)');
    }
    const techStack = [];
    techStack.push('- **Build**: Turborepo (monorepo orchestration)');
    if (features.ui) {
        techStack.push('- **Frontend**: React 19, Vite, TanStack Router/Query, Tailwind CSS');
    }
    if (features.api) {
        techStack.push('- **Backend**: FastAPI, Pydantic v2, uvicorn');
    }
    if (features.db) {
        techStack.push('- **Database**: PostgreSQL, SQLAlchemy 2.0 (async), Alembic');
    }
    techStack.push('- **Infrastructure**: Docker Compose, Helm charts');
    return `# Agent Guidelines

## Project Overview

**${config.name}** - A Turborepo monorepo${features.ui ? ' with React frontend' : ''}${features.api ? ', FastAPI backend' : ''}${features.db ? ', and PostgreSQL database' : ''}.

## Tech Stack

${techStack.join('\n')}

## Architecture

\`\`\`
${config.name}/
├── packages/
${packageList}
│   └── configs/          # Shared ESLint, Prettier, Ruff configs
├── deploy/helm/          # Kubernetes Helm charts
├── compose.yml           # Local development containers
├── turbo.json            # Turborepo configuration
└── Makefile              # Development commands
\`\`\`

## Commands

**Never run dev servers or production builds.** Assume dev servers are running. Use these for validation:

\`\`\`bash
${validationCommands.join('\n')}
\`\`\`

## Package Managers

- **Node.js packages**: \`pnpm\`
- **Python packages**: \`uv\`
- **Root commands**: \`make\` or \`pnpm\` (delegates to Turbo)

## Conventions

${features.ui ? `### Frontend (packages/ui/)
- React Function Components with TypeScript
- TanStack Router for file-based routing
- TanStack Query for server state
- Tailwind CSS + shadcn/ui components

` : ''}${features.api ? `### Backend (packages/api/)
- FastAPI with async/await patterns
- Pydantic v2 for validation
- Type hints on all functions
- Ruff for linting/formatting, mypy for type checking

` : ''}${features.db ? `### Database (packages/db/)
- SQLAlchemy 2.0 async ORM
- Alembic for migrations
- Models in \`src/models/\`, schemas in \`src/schemas/\`

` : ''}### Git
- Conventional commits (feat:, fix:, refactor:, test:, docs:, chore:)
- Small, focused PRs

## Detailed Rules

See \`.claude/rules/\` and \`.cursor/rules/\` for comprehensive guides.
`;
};
